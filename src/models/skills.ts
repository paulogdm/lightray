import * as azure from "azure-storage";
import { TableServiceAsync, Skill, User } from "../schema";
import { getUser } from "./user";
import { getOrCreateTable, insertOrReplaceItem } from "../storage";
import * as uuidv1 from "uuid/v1";

export async function getSkills(email?: string): Promise<Skill[]> {
    const ats: TableServiceAsync = await getOrCreateTable("skill");
    const query = (email !== null) ? new azure.TableQuery().where('PartitionKey eq ?', email) : new azure.TableQuery();
    const r = await ats.queryEntitiesAsync("skill", query);
    if(r.entries != null) {
        return Promise.resolve(r.entries as Skill[]);
    }
    return Promise.resolve([]);
}

export async function saveSkill(email: string, skill: string): Promise<Skill> {
    const ats: TableServiceAsync = await getOrCreateTable("skill");
    const query = new azure.TableQuery().where('PartitionKey eq ?', skill);
    const r = await ats.queryEntitiesAsync("skill", query);
    if(r.entries != null && r.entries.length > 0) {
        const sk = r.entries[0] as Skill;
        const users: User[] = JSON.parse((<any>sk).Users);
        const v: User = users.find((e) => {
            return (<User><any>e).Email == email
        });
        if(v === undefined) { //User wasn't in Skill
            if(!saveUserInSkill(ats, <Skill>sk, email)) {
                throw new Error(`Could not save ${email} in ${skill}.`);
            };
            if(!saveSkillInUser(ats, skill, email)) {
                throw new Error(`Could not save ${skill} for ${email}.`);
            };
        }
    }
    else {
        const e = azure.TableUtilities.entityGenerator;
        const sk = {
            PartitionKey: e.String(skill),
            RowKey: e.String(uuidv1()),
            Name: e.String(skill),
            Users: e.String(JSON.stringify([ getUser(email) ]))
        };
        try {
            const inserted = await ats.insertOrReplaceEntityAsync("skill", sk, { echoContent: true });
            if(saveSkillInUser(ats, skill, email)) {
                return Promise.resolve(<Skill><any>inserted);
            }
            return Promise.reject(`Could not save ${skill} for ${email}.`);
        }
        catch(e) {
            return Promise.reject(e);
        }
    }
}

async function saveSkillInUser(ats: TableServiceAsync, skill: string, email: string): Promise<boolean> {
    const user: User = await getUser(email);
    if(user != null) {
        const skills: string[] = user.Skills;
        skills.push(skill);
        user.Skills = skills;
        return await insertOrReplaceItem<User>(ats, "user", user);
    }
    return Promise.resolve(false);
}

async function saveUserInSkill(ats: TableServiceAsync, skill: Skill, email: string): Promise<boolean> {
    const user: User = await getUser(email);
    if(user != null) {
        const users: string[] = JSON.parse((<any>skill).Users);
        users.push(user.Email);
        skill.Users = users;
        return await insertOrReplaceItem<Skill>(ats, "skill", skill);
    }
    return Promise.resolve(false);
}
