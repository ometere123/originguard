import {test,expect} from "@playwright/test";
test("the app renders navigation and an honest public-feed state",async({page})=>{
 await page.goto("/");
 await expect(page.getByText("Verify the source.")).toBeVisible();
 await page.getByTestId("nav-developers").click();
 await expect(page.getByText("Reproduce every claim")).toBeVisible();
 await page.getByTestId("nav-verify").click();
 await expect(page.getByText("Look up an entity by key")).toBeVisible();
 await page.getByTestId("nav-publish").click();
 await expect(page.getByRole("button",{name:"Connect MetaMask"})).toBeVisible();
 await expect(page.getByRole("button",{name:/Sign and publish on Arkiv/})).toBeDisabled();
});
