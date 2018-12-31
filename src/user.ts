import * as azure from "azure-storage";
import { TableServiceAsync, User } from "./schema";
import { createTableServiceAsync } from "./storage";

export async function checkOrCreateUser(accessToken: string, email: string): Promise<User> {
    const ats: TableServiceAsync = createTableServiceAsync(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY);
    try {
        var result: azure.TableService.TableResult = await ats.createTableIfNotExistsAsync("user");
    }
    catch(e) {
        console.log(`Error creating `);
        return null;
    }
    //Check or create the user account.
    return Promise.resolve(
        {
            id: null,
            accessToken: accessToken,
            email: email,
            name: null
        }
    );
}
