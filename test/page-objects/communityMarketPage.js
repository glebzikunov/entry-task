import Browser from "../../framework/browser/Browser.js";
import { Button, Dropdown, Label } from "../../framework/elements/index.js";
import BasePage from "../../framework/page/BasePage.js";

class CommunityMarketPage extends BasePage {
  constructor() {
    super(new Label("//h1[@class='market_header']", "Community Market Header"), "Community Market Page");

    this.advancedOptionsButton = new Button("//div[contains(@class, 'advanced_button')]", "Advanced Options Button");
    this.advancedSearchWindow = new Label("//div[@id='market_advancedsearch_dialog']", "Advanced Search Window");
    this.searchButton = new Button("//div[contains(@onclick, 'submit')]", "Search Button");

    this.gameSelect = new Button("//div[@id='market_advancedsearch_appselect']", "Game Select");
    this.gameOption = (gameName) => new Label(`//div[contains(@class, 'popup_menu')]//span[contains(., '${gameName}')]`, "Game Option");
    this.heroSelect = new Dropdown("//select[contains(@name, 'Hero')]", "Hero Select");
    this.rarityCheckbox = (rarityType) => new Label(`//label[contains(@for, 'Rarity_${rarityType}')]`, "Rarity Checkbox");

    this.searchResultsTable = new Label("//div[@id='searchResultsRows']", "Search Results Table");
    this.firstSearchItem = new Label("//a[@id='resultlink_0']", "First Search Item");
    this.searchTags = new Label("//div[contains(@class, 'search_results_header')]//div", "Search Tags");
    this.sortPriceButton = new Button("//div[@data-sorttype='price']", "Sort Price Button");
  }

  async showAdvancedOptions() {
    await this.advancedOptionsButton.click();
  }

  isAdvancedOptionsWindowOpened() {
    return this.advancedSearchWindow.state().waitForDisplayed();
  }

  async selectGameForSearch(gameName) {
    await this.gameSelect.click();
    await this.gameOption(gameName).moveTo();
    await this.gameOption(gameName).click();
  }

  async selectHeroForSearch(heroName) {
    await this.heroSelect.selectOptionByText(heroName);
  }

  async selectRarityForSearch(rarityType) {
    await this.rarityCheckbox(rarityType).click();
  }

  async clickSearchButton() {
    await this.searchButton.click();
  }

  isSearchResultsTableDisplayed() {
    return this.searchResultsTable.state().isDisplayed();
  }

  async getSearchTags() {
    const tagElementsArray = await this.searchTags.findAll(Label, "//a", "searchTag");
    const searchTagsArray = tagElementsArray.slice(0, -1).map(async (tagElement) => await tagElement.getText());

    return await Promise.all(searchTagsArray);
  }

  async clickOnFirstItem() {
    await this.firstSearchItem.click();
  }

  async sortItems() {
    await this.sortPriceButton.quickClick();
  }

  async areItemsSorted(order = "ascending") {
    await Browser.waitForDelay(3000);

    const searchItemsArray = await this.searchResultsTable.findAll(Label, "//span[@class='normal_price']", "searchItem");
    const searchItemsPrices = [];

    for (let searchItem of searchItemsArray) {
      const searchItemText = await searchItem.getText();
      searchItemsPrices.push(parseFloat(searchItemText.replace("$", "")));
    }

    if (order === "ascending") {
      return searchItemsPrices.every((price, index) => index === 0 || searchItemsPrices[index - 1] <= price);
    } else if (order === "descending") {
      return searchItemsPrices.every((price, index) => index === 0 || searchItemsPrices[index - 1] >= price);
    }
  }
}

export default new CommunityMarketPage();
