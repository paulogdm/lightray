import * as azure from "azure-storage";

export interface TableServiceAsync extends azure.TableService {
    createTableIfNotExistsAsync(table: string): Promise<azure.TableService.TableResult>;
    deleteTableIfExistsAsync(table: string): Promise<boolean>;
    retrieveEntityAsync<T>(table: string, partitionKey: string, rowKey: string, options: any): Promise<T>;
    queryEntitiesAsync<T>(table: string, query: azure.TableQuery, options?: any): Promise<azure.TableService.QueryEntitiesResult<T>>;
    doesTableExistAsync(table: string): Promise<azure.TableService.TableResult>;
    replaceEntityAsync<T>(table: string, entityDescriptor: T): Promise<azure.TableService.EntityMetadata>;
    insertOrReplaceEntityAsync<T>(table: string, entityDescriptor: T, options?: any): Promise<azure.TableService.EntityMetadata>;
    deleteEntityAsync<T>(table: string, entityDescriptor: T): Promise<void>;
}

export interface User {
    PartitionKey?: string;
    AccessToken: string;
    Email: string;
    Name: string;
    Skills?: string[];
    Team?: string;
}

export interface Project {
    Business?: string;
    Platform?: string;
    Name: string;
    ColorKey: string;
    DateStart?: Date;
    DateEnd?: Date;
}

export interface Team {
    PartitionKey?: string;
    Name: string;
    Users?: string[];
}

export interface Person {
    Name: string;
    Title: string;
    Position: string;
    Skills?: string[];
}

export interface Event {
    PartitionKey?: string;
    Name: string;
    Project: string;
    Person: string;
    DateStart?: Date;
    DateEnd?: Date;
}

export interface Skill {
    PartitionKey?: string;
    RowKey?: string;
    Name: string;
    Description?: string;
    Users?: string[];
}
