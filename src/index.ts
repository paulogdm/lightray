import * as restify from "restify";
import { config } from "dotenv";
import { User } from "./schema";
import { auth } from "./auth";
import { checkOrCreateUser } from "./user";

config();

const server: restify.Server = restify.createServer();

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.post('/api/auth', async (req, res, next) => {
    const { accessToken, idToken, email } = req.body;
    const isValid = await auth(accessToken, idToken, email);
    if (isValid) {
        const user: User = await checkOrCreateUser(accessToken, email);
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
