import { describe, expect, it } from "vitest";
import { getBreadcrumbs, getFormattedDate } from "./format";

describe("formatting utils", () => {
    it("getFormattedDate", () => {
        const date = "2021-01-01";
        const expected = "1/1/2021";
        const actual = getFormattedDate(date);
        expect(actual).toBe(expected);
    });
    it("getFormattedDate months and days in IE order", () => {
        const date = "2021-12-31";
        const expected = "31/12/2021";
        const actual = getFormattedDate(date);
        expect(actual).toBe(expected);
    });
    it("getBreadcrumbs", () => {
        const path = "https://www.domain.com/u/weird/path?with=query#and-hash";
        const expected = ["www.domain.com", "u", "weird", "path?with=query#and-hash"];
        const actual = getBreadcrumbs(path);
        expect(actual).to.deep.equal(expected);
    });
    it("getBreadcrumbs no path", () => {
        const path = null;
        const actual = getBreadcrumbs(path);
        expect(actual).to.deep.equal([]);
    });
    it("getBreadcrumbs bad path", () => {
        const path = "hteeteep:garbade/bag";
        const actual = getBreadcrumbs(path);
        expect(actual).to.deep.equal([]);
    });
})