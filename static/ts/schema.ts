
export interface User {
    PartitionKey?: string;
    RowKey?: string;
    AccessToken: string;
    Email: string;
    Name: string;
    Skills?: string[];
    Team?: string;
}

export interface Project {
    PartitionKey?: string;
    RowKey?: string;
    Business?: string;
    Platform?: string;
    Name: string;
    ColorKey: string;
    DateStart?: Date;
    DateEnd?: Date;
}

export interface Team {
    PartitionKey?: string;
    RowKey?: string;
    Name: string;
    Users?: string[];
}

export interface Person {
    PartitionKey?: string;
    RowKey?: string;
    Name: string;
    Title: string;
    Position: string;
    Skills?: string[];
}

export interface Event {
    PartitionKey?: string;
    RowKey?: string;
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
