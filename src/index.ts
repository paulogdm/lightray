import * as restify from "restify";
import { config } from "dotenv";
import { User, Event } from "./schema";
import { auth, getUser } from "./auth";
import { checkOrCreateUser } from "./models/user";
import { getEvents, saveEvent } from "./models/event";
import * as jwt_decode from "jwt-decode";

config();

const server: restify.Server = restify.createServer();

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(verifyAuth);

async function verifyAuth(req: restify.Request, res: restify.Response, next: Function): Promise<void> {
    if(req.getPath() !== "/api/auth" || process.env.ENV !== "DEV") {
        try {
            const jwt: string = req.headers.authorization.split(" ")[1];
            const isValid: boolean = await auth(jwt);
            if(isValid) {
                const decoded = jwt_decode(jwt);
                if(decoded == null || (<any>decoded).email == null) {
                    next(new Error("Authentication failed."));
                }
            }
            else {
                next(new Error("Validation failed."));
            }
        }
        catch(e) {
            next(new Error(e));
        }
    }
    next();
}

server.post("/api/auth", async (req: restify.Request, res: restify.Response) => {
    const { accessToken, idToken, email } = req.body;
    const isValid: boolean = await auth(idToken);
    if (isValid) {
        const user: User = await checkOrCreateUser(accessToken, idToken, email);
        res.send(
            {
                isValid: isValid,
                user: user
            }
        );
    }
});

server.get("/api/event", async (req: restify.Request, res: restify.Response) => {
    const email = getUser(req);
    const events: Event[] = await getEvents(email);
    res.send(events);
});

server.post("/api/event", async (req: restify.Request, res: restify.Response) => {
    const { name, project, person, dateStart, dateEnd } = req.body;
    const event: Event = await saveEvent(name, project, person, dateStart, dateEnd);
    res.send(event);
});

server.listen(3000, () => {
    console.log(`Server listening at ${server.url}`);
});