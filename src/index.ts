import * as restify from "restify";
import { config } from "dotenv";
import { auth } from "./auth";

config();

const server: restify.Server = restify.createServer();

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.post('/auth', async (req, res, next) => {
    const { accessToken, idToken, email } = req.body;
    const isValid = await auth(accessToken, idToken, email);
    if (isValid) {
        res.send({ isValid: isValid });
    }
});

server.listen(3000, () => {
    console.log(`Server listening at ${server.url}`);
});
