import * as restify from "restify";
import * as jwt from "jsonwebtoken";
import * as jwt_decode from "jwt-decode";

function verify(idToken: string): boolean {
    const decoded = jwt_decode(idToken);
    const jwks = require("../data/jwks.json");
    try {
        jwt.verify(idToken, jwks.keys[0].x5c[0],
            {
                algorithms: jwks.keys[0].alg,
                issuer: (<any>decoded).iss,
                audience: (<any>decoded).aud
            }
        );
    }
    catch(e) {
        return false;
    }
    return true;
}

export function auth(idToken: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        try {
            if(verify(idToken)) {
                resolve(true);
            }
            else {
                throw new Error("The token is invalid.");
            }
        }
        catch(e) {
            reject(e);
        }
    });
}

export function getUser(req: restify.Request): string {
    if(process.env.ENV !== "DEV") {
        const jwt: string = req.headers.authorization.split(" ")[1];
        const decoded = jwt_decode(jwt);
        return (<any>decoded).email;
    }
    return "michael@szul.us";
}
