//@ts-check

const assert =  require("assert");
const { expect } = require("chai");
const { config } = require("dotenv");
const { TableUtilities } = require("azure-storage");
const { createTableServiceAsync, getOrCreateTable, insertOrReplaceItem } = require("../api/storage");
const { bootstrap } = require("../api/util");
const { getOrCreateUser, getUser } = require("../api/models/user");
const { saveEvent, getEvents } = require("../api/models/event");
const { saveSkill, getSkills } = require("../api/models/skills");

config();

describe("Azure Table Storage tests", () => {
    it("should create async table storage", async () => {
        const ats = createTableServiceAsync();
        assert.notEqual(ats, null);
    });
    it("should get or create a test table", async () => {
        const ats = createTableServiceAsync();
        const t = await getOrCreateTable(ats, "test");
        assert.notEqual(t, null);
    });
    it("should insert or replace an item", async () => {
        const ats = createTableServiceAsync();
        const e = TableUtilities.entityGenerator;
        const r = {
            PartitionKey: e.String("1"),
            RowKey: e.String("1"),
            Name: e.String("Test"),
        };
        const i = await insertOrReplaceItem(ats, "test", r);
        assert.equal(i, true);
    });
});

describe("Table storage bootstrap tests", () => {
    it("should bootstrap application tables", async () => {
        var f = async function() {
            await bootstrap()
        };
        expect(f).to.not.throw();
    });
});

describe("Table storage user tests", () => {
    it("should get or create a user", async () => {
        const user = await getOrCreateUser("0", "0", "test@lightray.app");
        assert.notEqual(user, null);
        assert.notEqual(user.PartitionKey, undefined);
    });
    it("should get a user", async () => {
        const user = await getUser("test@lightray.app");
        assert.notEqual(user, null);
        assert.notEqual(user.PartitionKey, undefined);
    });
});

describe("Table storage event tests", () => {
    it("should save an event", async () => {
        const event = await saveEvent("Name of event", "Test Project", "Michael Szul", new Date(), new Date());
        assert.notEqual(event, null);
        assert.notEqual(event.PartitionKey, undefined);
    });
    it("should get a list of events by project", async () => {
        const events = await getEvents("Test Project");
        assert.notEqual(events, null);
        assert.notEqual(events.length, 0);
    });
});

describe("Table storage skill tests", () => {
    it("should save a skill", async () => {
        const skill = await saveSkill("testing@lightray.app", "resource management");
        assert.notEqual(skill, null);
        assert.notEqual(skill.PartitionKey, undefined);
    });
    it("should get a list of skills by user", async () => {
        const skills = await getSkills("test@lightray.app");
        assert.notEqual(skills, null);
        assert.notEqual(skills.length, 0);
    });
});
