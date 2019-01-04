import * as azure from "azure-storage";
import { TableServiceAsync, Event } from "../schema";
import { getOrCreateTable } from "../storage";

export async function getEvents(email: string): Promise<Event[]> {
    const ats: TableServiceAsync = await getOrCreateTable("event");
    const query = new azure.TableQuery().where('PartitionKey eq ?', email);
    const r = await ats.queryEntitiesAsync("event", query);
    if(r.entries != null) {
        return Promise.resolve(r.entries as Event[]);
    }
    return Promise.resolve([]);
}
