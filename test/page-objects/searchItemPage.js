import { Label } from "../../framework/elements/index.js"
import BasePage from "../../framework/page/BasePage.js"

class searchItemPage extends BasePage {
  constructor() {
    super(new Label("//h1[@id='largeiteminfo_item_name']", "Item Label"), "Item Label")

    this.itemGameName = new Label("//div[@id='largeiteminfo_game_name']")
    this.itemHero = new Label("//div[@class='descriptor' and contains(., 'Used By')]")
    this.itemType = new Label("//div[@id='largeiteminfo_item_type']")
  }

  async isItemInfoCorrect(gameName, heroName, rarityType) {
    const itemGame = await this.itemGameName.getText()
    const itemHero = await this.itemHero.getText()
    const itemType = await this.itemType.getText()

    if (!gameName === itemGame || !itemHero.includes(heroName) || !itemType.includes(rarityType)) return false

    return true
  }
}

export default new searchItemPage()
