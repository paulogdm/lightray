import * as azure from "azure-storage";
import { TableServiceAsync, Skill } from "../schema";
import { createTableServiceAsync } from "../storage";

export async function getSkills(email?: string): Promise<Skill[]> {
    const ats: TableServiceAsync = createTableServiceAsync(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY);
    try {
        await ats.createTableIfNotExistsAsync("skill");
    }
    catch(e) {
        return Promise.reject(`Error creating table.`);
    }
    const query = (email !== null) ? new azure.TableQuery().where('PartitionKey eq ?', email) : new azure.TableQuery();
    const r = await ats.queryEntitiesAsync("skill", query);
    if(r.entries != null) {
        return Promise.resolve(r.entries as Skill[]);
    }
    return Promise.resolve([]);
}
