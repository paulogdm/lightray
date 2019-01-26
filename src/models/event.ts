import * as azure from "azure-storage";
import { TableServiceAsync, Event } from "../schema";
import { createTableServiceAsync } from "../storage";
import * as uuidv1 from "uuid/v1";

export async function getEvents(project: string): Promise<Event[]> {
    const ats: TableServiceAsync = createTableServiceAsync();
    const query = new azure.TableQuery().where('PartitionKey eq ?', project);
    const r = await ats.queryEntitiesAsync("event", query);
    if(r.entries != null) {
        return Promise.resolve(r.entries as Event[]);
    }
    return Promise.resolve([]);
}

export async function saveEvent(name: string, project: string, person: string, dateStart: Date, dateEnd?: Date): Promise<Event> {
    const ats: TableServiceAsync =  createTableServiceAsync();
    const e = azure.TableUtilities.entityGenerator;
    const event = {
        PartitionKey: e.String(project),
        RowKey: e.String(uuidv1()),
        Name: e.String(name),
        Project: e.String(project),
        Person: e.String(person),
        DateStart: e.DateTime(dateStart),
        DateEnd: e.DateTime(dateEnd)
    };
    try {
        const inserted = await ats.insertOrReplaceEntityAsync("event", event, { echoContent: true });
        return Promise.resolve(<Event><any>inserted);
    }
    catch(e) {
        return Promise.reject(e);
    }
}
