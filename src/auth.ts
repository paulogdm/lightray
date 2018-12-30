import * as jwt from "jsonwebtoken";

function verify(idToken: string): boolean {
    //jwt.verify(idToken);
    //https://octobercodes.auth0.com/.well-known/jwks.json
    return true;
}

export function auth(accessToken: string, idToken: string, email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        try {
            //is the user in the system? true/false
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
