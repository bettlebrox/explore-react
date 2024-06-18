import { screen, render } from "@testing-library/react";
import { Dashboard } from "./Dashboard";
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from "react-router-dom";
describe("has headings", async () => {
    it("has the right headings", async () =>{
        render(<Dashboard />, {wrapper: BrowserRouter});
        const headings = await screen.getAllByRole("heading");
        const heading_texts = headings.map((heading) => {return heading.innerHTML;})
        expect(
            heading_texts,"Headings should be present and correct"
        ).toEqual(["Top Themes","Recent Themes"])

    })
        
})