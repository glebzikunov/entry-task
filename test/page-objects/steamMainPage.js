import { Label } from "../../framework/elements/index.js";
import BasePage from "../../framework/page/BasePage.js";

class SteamMainPage extends BasePage {
  constructor() {
    super(new Label("//h2[contains(.,'Featured')]", "Featured & Recommended Label"), "Steam Main Page");

    this.navigationLink = (navigationLinkName) => new Label(`//a[contains(., "${navigationLinkName.toUpperCase()}")]`, "Navigation Link");
    this.submenuLink = (submenuLinkName) => new Label(`//div[@class='supernav_content']//a[contains(., '${submenuLinkName}')]`, "Submenu Link");
  }

  async navigateToSubmenuLink(navigationLinkName, submenuLinkName) {
    await this.navigationLink(navigationLinkName).moveTo();
    await this.submenuLink(submenuLinkName).click();
  }
}

export default new SteamMainPage();
