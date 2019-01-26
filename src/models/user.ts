import * as azure from "azure-storage";
import { TableServiceAsync, User } from "../schema";
import { createTableServiceAsync } from "../storage";
import * as uuidv1 from "uuid/v1";
import * as jwt_decode from "jwt-decode";

export async function getOrCreateUser(accessToken: string, idToken: string, email: string): Promise<User> {
    const ats: TableServiceAsync =createTableServiceAsync();
    const query = new azure.TableQuery().where('PartitionKey eq ?', email);
    const r = await ats.queryEntitiesAsync("user", query);
    if(r.entries != null && r.entries.length > 0) {
        return Promise.resolve(r.entries[0] as User);
    }
    else {
        const e = azure.TableUtilities.entityGenerator;
        const user = {
            PartitionKey: e.String(`${email}`),
            RowKey: e.String(uuidv1()),
            AccessToken: accessToken,
            Email: email,
            Name: (<any>jwt_decode(idToken)).name
        };
        try {
            const inserted = await ats.insertOrReplaceEntityAsync("user", user, { echoContent: true });
            return Promise.resolve(
                {
                    PartitionKey: (<User><any>inserted).PartitionKey,
                    AccessToken: accessToken,
                    Email: email,
                    Name: (<any>jwt_decode(idToken)).name
                }
            );
        }
        catch(e) {
            return Promise.reject(e);
        }
    }
}

export async function getUser(email: string): Promise<User> {
    const ats: TableServiceAsync = createTableServiceAsync();
    const query = new azure.TableQuery().where('PartitionKey eq ?', email);
    const r = await ats.queryEntitiesAsync("user", query);
    if(r.entries != null && r.entries.length > 0) {
        return Promise.resolve(r.entries[0] as User);
    }
    return Promise.reject(`User ${email} not found.`);
}
