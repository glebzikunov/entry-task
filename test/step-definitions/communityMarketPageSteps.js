import { When, Then } from "@wdio/cucumber-framework";
import { assert, expect, use } from "chai";
import chaiSorted from "chai-sorted";
import CommunityMarketPage from "../page-objects/CommunityMarketPage.js";

use(chaiSorted);

When(/^I click on show advanced options$/, async () => {
  await CommunityMarketPage.showAdvancedOptions();
});

When(/^I select game '(.*)', hero '(.*)' and rarity '(.*)'$/, async (gameName, heroName, rarityType) => {
  await CommunityMarketPage.selectGameForSearch(gameName);
  await CommunityMarketPage.selectHeroForSearch(heroName);
  await CommunityMarketPage.selectRarityForSearch(rarityType);
});

When(/^Click on search button$/, async () => {
  await CommunityMarketPage.clickSearchButton();
});

When(/^I click on first item$/, async () => {
  await CommunityMarketPage.clickOnFirstItem();
});

When(/^I sort price by ascending order$/, async () => {
  await CommunityMarketPage.sortItems();
});

When(/^I sort price by descending order$/, async () => {
  await CommunityMarketPage.sortItems();
});

Then(/^Community market page should be opened$/, async () => {
  assert.isTrue(await CommunityMarketPage.isPageOpened(), "Community market page isn't opened");
});

Then(/^Advanced options window should be opened$/, async () => {
  assert.isTrue(await CommunityMarketPage.isAdvancedOptionsWindowOpened(), "Advanced options window isn't opened");
});

Then(/^Table with results is loaded$/, async () => {
  assert.isTrue(await CommunityMarketPage.isSearchResultsTableDisplayed(), "Search results table isn't loaded");
});

Then(/^Tags '(.*)', '(.*)', '(.*)' in "Showing results for" are displayed$/, async (gameName, heroName, rarityType) => {
  const searchTags = await CommunityMarketPage.getSearchTags();
  assert.deepEqual(searchTags, [gameName, heroName, rarityType], "Search tags are not correct");
});

Then(/^Prices are sorted in ascending order$/, async () => {
  expect(await CommunityMarketPage.getSearchedItemsPrices(), "Prices are not sorted in ascending order").to.be.sorted();
});

Then(/^Prices are sorted in descending order$/, async () => {
  expect(await CommunityMarketPage.getSearchedItemsPrices(), "Prices are not sorted in descending order").to.be.sorted({ descending: true });
});
