import * as restify from "restify";
import { config } from "dotenv";
import { User } from "./schema";
import { auth } from "./auth";
import { checkOrCreateUser } from "./user";
import * as jwt_decode from "jwt-decode";

config();

const server: restify.Server = restify.createServer();

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

function verifyAuth(req: restify.Request, res: restify.Response, next: Function): void {
    try {
        const jwt: string = req.headers.authorization.split(" ")[1];
        //verify...
        const decoded = jwt_decode(jwt);
        if(decoded != null && (<any>decoded).email != null) {
            next();
        }
        else {
            next(new Error("Authentication failed."));
        }
    }
    catch(e) {
        next(new Error(e));
    }
}

server.post("/api/auth", async (req: restify.Request, res: restify.Response, next: Function) => {
    const { accessToken, idToken, email } = req.body;
    const isValid = await auth(accessToken, idToken, email);
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

server.listen(3000, () => {
    console.log(`Server listening at ${server.url}`);
});
