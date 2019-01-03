import * as azure from "azure-storage";
import { TableServiceAsync, User } from "../schema";
import { createTableServiceAsync } from "../storage";
import * as uuidv1 from "uuid/v1";
import * as jwt_decode from "jwt-decode";

export async function checkOrCreateUser(accessToken: string, idToken: string, email: string): Promise<User> {
    const ats: TableServiceAsync = createTableServiceAsync(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY);
    try {
        await ats.createTableIfNotExistsAsync("user");
    }
    catch(e) {
        return Promise.reject(`Error creating table.`);
    }
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
            accessToken: accessToken,
            email: email,
            name: (<any>jwt_decode(idToken)).name
        };
        try {
            const inserted = await ats.insertOrReplaceEntityAsync("user", user, { echoContent: true });
            return Promise.resolve(
                {
                    key: (<User><any>inserted).PartitionKey,
                    accessToken: accessToken,
                    email: email,
                    name: (<any>jwt_decode(idToken)).name
                }
            );
        }
        catch(e) {
            return Promise.reject(e);
        }
    }
}
