//@ts-check

const assert =  require("assert");
const { config } = require("dotenv");
const { createTableServiceAsync, getOrCreateTable, insertOrReplaceItem } = require("../api/storage");

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
});
