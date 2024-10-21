import { Button, Dropdown, Label } from "../../framework/elements/index.js"
import BasePage from "../../framework/page/BasePage.js"

class CommunityMarketPage extends BasePage {
  constructor() {
    super(new Label("//h1[@class='market_header']", "Community Market Header"), "Community Market Page")

    this.advancedOptionsButton = new Button("//div[contains(@class, 'advanced_button')]", "Advanced Options Button")
    this.advancedSearchWindow = new Label("//div[@id='market_advancedsearch_dialog']", "Advanced Search Window")
    this.searchButton = new Button("//div[contains(@onclick, 'submit')]", "Search Button")

    this.gameSelect = new Button("//div[@id='market_advancedsearch_appselect']", "Game Select")
    this.gameOption = (gameName) => new Label(`//div[contains(@class, 'popup_menu')]//span[contains(., '${gameName}')]`, "Game Option")
    this.heroSelect = new Dropdown("//select[contains(@name, 'Hero')]", "Hero Select")
    this.rarityCheckbox = (rarityType) => new Label(`//label[contains(@for, 'Rarity_${rarityType}')]`, "Rarity Checkbox")

    this.searchResultsTable = new Label("//div[@id='searchResultsRows']", "Search Results Table")
    this.firstSearchItem = new Label("//a[@id='resultlink_0']", "First Search Item")
    this.searchTags = new Label(`//div[contains(@class, 'search_results_header')]//div`, "Search Tags")
    this.sortPriceButton = new Button("//div[@data-sorttype='price']", "Sort Price Button")
  }

  async showAdvancedOptions() {
    this.advancedOptionsButton.click()
  }

  async isAdvancedOptionsWindowOpened() {
    return await this.advancedSearchWindow.state().waitForDisplayed()
  }

  async selectGameForSearch(gameName) {
    await this.gameSelect.click()
    await this.gameOption(gameName).moveTo()
    await this.gameOption(gameName).click()
  }

  async selectHeroForSearch(heroName) {
    await this.heroSelect.selectOptionByText(heroName)
  }

  async selectRarityForSearch(rarityType) {
    await this.rarityCheckbox(rarityType).click()
  }

  async clickSearchButton() {
    await this.searchButton.click()
  }

  async isSearchResultsTableDisplayed() {
    return await this.searchResultsTable.state().isDisplayed()
  }

  async areSearchTagsCorrect(expectedTags) {
    const tagElementsArray = await this.searchTags.findAll(Label, "//a", "searchTag")
    const searchTagArray = []

    for await (let tagElement of tagElementsArray) {
      const searchTagText = await tagElement.getText()
      searchTagArray.push(searchTagText)
    }

    for (const tag of expectedTags) {
      if (!searchTagArray.includes(tag)) {
        return false
      }
    }

    return true
  }

  async clickOnFirstItem() {
    await this.firstSearchItem.click()
  }

  async sortItems() {
    await this.sortPriceButton.click()
  }

  async areItemsSorted(order = "ascending") {
    const searchItemsArray = await this.searchResultsTable.findAll(Label, "//span[@class='normal_price']", "searchItem")
    const searchItemsPrices = []

    for await (let searchItem of searchItemsArray) {
      const searchItemText = await searchItem.getText()
      searchItemsPrices.push(parseFloat(searchItemText.replace("$", "")))
    }

    if (order === "ascending") {
      return searchItemsPrices.every((price, index) => index === 0 || searchItemsPrices[index - 1] <= price)
    } else if (order === "descending") {
      return searchItemsPrices.every((price, index) => index === 0 || searchItemsPrices[index - 1] >= price)
    }
  }
}

export default new CommunityMarketPage()
