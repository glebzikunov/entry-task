import { When, Then } from "@wdio/cucumber-framework"

import { assert } from "chai"
import SearchItemPage from "../page-objects/searchItemPage.js"

Then(/^Item page is opened$/, async () => {
  assert.isTrue(await SearchItemPage.isPageOpened(), "Item page isn't opened")
})

Then(/^Item info is correct for selected filters '(.*)', '(.*)' and '(.*)'$/, async (gameName, heroName, rarityType) => {
  assert.isTrue(await SearchItemPage.isItemInfoCorrect(gameName, heroName, rarityType), "Item info isn't correct")
})
