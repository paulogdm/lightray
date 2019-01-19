import * as azure from "azure-storage";
import { promisify } from "./util";
import { TableServiceAsync } from "./schema";

export function createTableServiceAsync(): TableServiceAsync {
    const tableService = azure.createTableService(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY);
    return {
        createTableIfNotExistsAsync: promisify(tableService, tableService.createTableIfNotExists),
        deleteTableIfExistsAsync: promisify(tableService, tableService.deleteTableIfExists),
        retrieveEntityAsync: promisify(tableService, tableService.retrieveEntity),
        queryEntitiesAsync: promisify(tableService, tableService.queryEntities),
        doesTableExistAsync: promisify(tableService, tableService.doesTableExist),
        insertOrReplaceEntityAsync: promisify(tableService, tableService.insertOrReplaceEntity),
        replaceEntityAsync: promisify(tableService, tableService.replaceEntity),
        deleteEntityAsync: promisify(tableService, tableService.deleteEntity)
    } as TableServiceAsync;
}

export async function getOrCreateTable(ats: TableServiceAsync, table: string): Promise<azure.TableService.TableResult> {
    try {
        return await ats.createTableIfNotExistsAsync(table);
    }
    catch(e) {
        return Promise.reject(`Error creating table: ${table}.`);
    }
}

export async function insertOrReplaceItem<T>(ats: TableServiceAsync, tableName: string, item: T): Promise<boolean> {
    try {
        const inserted = await ats.insertOrReplaceEntityAsync(tableName, item);
        if(!inserted[".metadata"]) {
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    }
    catch(e) {
        return Promise.reject(e);
    }
}
