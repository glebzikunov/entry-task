import { Given, When, Then } from "@wdio/cucumber-framework";
import { assert } from "chai";
import { mainConfig } from "../../framework/configs/main.wdio.conf.js";
import Browser from "../../framework/browser/Browser.js";
import SteamMainPage from "../page-objects/SteamMainPage.js";

Given(/^I am on the main page$/, async () => {
  await Browser.openUrl(mainConfig.baseUrl);
});

When(/^I hover over '(.*)' and click on '(.*)'$/, async (navigationLinkName, submenuLinkName) => {
  await SteamMainPage.navigateToSubmenuLink(navigationLinkName, submenuLinkName);
});

Then(/^Main page should be opened$/, async () => {
  assert.isTrue(await SteamMainPage.isPageOpened(), "Main page isn't opened");
});
