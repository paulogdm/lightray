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

export function auth(accessToken: string, idToken: string, email: string): Promise<boolean> {
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
