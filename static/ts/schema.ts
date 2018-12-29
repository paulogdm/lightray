
export interface Project {
    Business?: string;
    Platform?: string;
    Name: string;
    ColorKey: string;
    DateStart?: Date;
    DateEnd?: Date;
}

export interface Person {
    Name: string;
    Title: string;
    Position: string;
    Skills?: string[];
}

export interface Event {
    Name: string;
    Project: string;
    Person: string;
    DateStart?: Date;
    DateEnd?: Date;
}
