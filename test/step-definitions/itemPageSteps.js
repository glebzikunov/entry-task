import { Then } from "@wdio/cucumber-framework";
import { assert } from "chai";
import SearchItemPage from "../page-objects/SearchItemPage.js";

Then(/^Item page is opened$/, async () => {
  assert.isTrue(await SearchItemPage.isPageOpened(), "Item page isn't opened");
});

Then(/^Item info is correct for selected filters '(.*)', '(.*)' and '(.*)'$/, async (gameName, heroName, rarityType) => {
  const searchItemInfo = await SearchItemPage.getItemInfo();
  const expectedItemInfo = [gameName, heroName, rarityType];

  for (let i = 0; i < expectedItemInfo.length; i++) {
    assert.include(searchItemInfo[i], expectedItemInfo[i], "Item info is not correct");
  }
});
