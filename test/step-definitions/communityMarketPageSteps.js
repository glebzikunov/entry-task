import { When, Then } from "@wdio/cucumber-framework"

import { assert } from "chai"
import CommunityMarketPage from "../page-objects/communityMarketPage.js"

When(/^I click on show advanced options$/, async () => {
  await CommunityMarketPage.showAdvancedOptions()
})

When(/^I select game '(.*)', hero '(.*)' and rarity '(.*)'$/, async (gameName, heroName, rarityType) => {
  await CommunityMarketPage.selectGameForSearch(gameName)
  await CommunityMarketPage.selectHeroForSearch(heroName)
  await CommunityMarketPage.selectRarityForSearch(rarityType)
})

When(/^Click on search button$/, async () => {
  await CommunityMarketPage.clickSearchButton()
})

When(/^I click on first item$/, async () => {
  await CommunityMarketPage.clickOnFirstItem()
})

When(/^I sort price by ascending order$/, async () => {
  await CommunityMarketPage.sortItems()
})

When(/^I sort price by descending order$/, async () => {
  await CommunityMarketPage.sortItems()
})

Then(/^Community market page should be opened$/, async () => {
  assert.isTrue(await CommunityMarketPage.isPageOpened(), "Community market page isn't opened")
})

Then(/^Advanced options window should be opened$/, async () => {
  assert.isTrue(await CommunityMarketPage.isAdvancedOptionsWindowOpened(), "Advanced options window isn't opened")
})

Then(/^Table with results is loaded$/, async () => {
  assert.isTrue(await CommunityMarketPage.isSearchResultsTableDisplayed(), "Search results table isn't loaded")
})

Then(/^Tags '(.*)', '(.*)', '(.*)' in "Showing results for" are displayed$/, async (gameName, heroName, rarityType) => {
  assert.isTrue(await CommunityMarketPage.areSearchTagsCorrect([gameName, heroName, rarityType]), "Search tags are not correct")
})

Then(/^Prices are sorted in ascending order$/, async () => {
  assert.isTrue(await CommunityMarketPage.areItemsSorted(), "Prices are not sorted in ascending order")
})

Then(/^Prices are sorted in descending order$/, async () => {
  assert.isTrue(await CommunityMarketPage.areItemsSorted("descending"), "Prices are not sorted in descending order")
})
