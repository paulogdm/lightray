import * as azure from "azure-storage";
import { promisify } from "./util";
import { TableServiceAsync } from "./schema";

export function createTableServiceAsync(storageAccountOrConnectionString: string, storageAccessKey: string): TableServiceAsync {
    const tableService = azure.createTableService(storageAccountOrConnectionString, storageAccessKey);
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

export async function getOrCreateTable(table: string): Promise<TableServiceAsync> {
    const ats: TableServiceAsync = createTableServiceAsync(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY);
    try {
        await ats.createTableIfNotExistsAsync(table);
    }
    catch(e) {
        return Promise.reject(`Error creating table: ${table}.`);
    }
}
