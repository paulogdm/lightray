import * as azure from "azure-storage";
import { TableServiceAsync, Event } from "../schema";
import { createTableServiceAsync } from "../storage";

export async function getEvents(email: string): Promise<Event[]> {
    const ats: TableServiceAsync = createTableServiceAsync(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY);
    try {
        await ats.createTableIfNotExistsAsync("event");
    }
    catch(e) {
        return Promise.reject(`Error creating table.`);
    }
    const query = new azure.TableQuery().where('PartitionKey eq ?', email);
    const r = await ats.queryEntitiesAsync("event", query);
    if(r.entries != null) {
        return Promise.resolve(r.entries as Event[]);
    }
    return Promise.resolve([]);
}
