Feature: Steam market handling

  Background:
    Given I am on the main page
    Then Main page should be opened

  Scenario Outline: As a user I can search items on community market
    When I hover over '<navigation_link>' and click on '<submenu_link>'
    Then Community market page should be opened
    When I click on show advanced options
    Then Advanced options window should be opened
    When I select game '<game_name>', hero '<hero_name>' and rarity '<rarity_type>'
    And Click on search button
    Then Table with results is loaded
    And Tags '<game_name>', '<hero_name>', '<rarity_type>' in "Showing results for" are displayed
    When I click on first item
    Then Item page is opened
    And Item info is correct for selected filters '<game_name>', '<hero_name>' and '<rarity_type>'

    Examples:
      | navigation_link | submenu_link | game_name | hero_name        | rarity_type |
      | Community       | Market       | Dota 2    | Phantom Assassin | Rare        |

  Scenario Outline: As a user I can sort items by price
    When I hover over '<navigation_link>' and click on '<submenu_link>'
    Then Community market page should be opened
    When I click on show advanced options
    Then Advanced options window should be opened
    When I select game '<game_name>', hero '<hero_name>' and rarity '<rarity_type>'
    And Click on search button
    Then Table with results is loaded
    And Tags '<game_name>', '<hero_name>', '<rarity_type>' in "Showing results for" are displayed
    When I sort price by ascending order
    Then Prices are sorted in ascending order
    When I sort price by descending order
    Then Prices are sorted in descending order

    Examples:
      | navigation_link | submenu_link | game_name | hero_name | rarity_type |
      | Community       | Market       | Dota 2    | Anti-Mage | Uncommon    |
