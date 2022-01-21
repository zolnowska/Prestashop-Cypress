// https://stackoverflow.com/questions/59460321/where-to-store-selectors-in-cypress-io

export var topMenu = {
  contactUsBtn: '[id="contact-link"] a',
  languageBtn: '[class="hidden-sm-down btn-unstyle"] span',
  firstLanguageDropDown:
    '[class="dropdown-menu hidden-sm-down"] li:nth-child(1) a',
  secondLanguageDropDown:
    '[class="dropdown-menu hidden-sm-down"] li:nth-child(2) a',
  signInBtn: '[title="Log in to your customer account"] span',
  basketBtn: ".cart-preview",
  basketText: 'div[class="header"] span[class="hidden-sm-down"]',
  basketproductsCountText: ".cart-products-count",
};

export var navigation = {
  clothesBtn: '[id="category-3"] [data-depth="0"]',
  womenBtn: '[id="category-5"] [data-depth="1"]',
  menBtn: '[id="category-4"] [data-depth="1"]',
  accessoriesBtn: '[id="category-6"] [data-depth="0"]',
  stationeryBtn: '[id="category-7"] [data-depth="1"]',
  homeAccessoriesBtn: '[id="category-8"] [data-depth="1"]',
  artBtn: '[id="category-9"] [data-depth="0"]',
  searchInput: 'input[aria-label="Search"]',
};

export var banner = {
  section: '[class="carousel-inner"]',
  titleText: '[class="display-1 text-uppercase"]',
  nextBtn: '[class="icon-next"] i',
  previousBtn: '[class="icon-prev hidden-xs"] i',
};

export var newsletter = {
  emailInput: '[name="email"]',
  subscribeBtn: '[value="Subscribe"]',
  alertText: '[class="alert alert-danger block_newsletter_alert"]',
};

export var popularProducts = {
  tshirtHummingbirdImageBtn:
    '[data-id-product="1"] [class="thumbnail product-thumbnail"]',
  tshirtHummingbirTitleBtn: '[data-id-product="1"] [itemprop="url"]',
  sweaterHummingbirdImageBtn:
    '[data-id-product="2"] [class="thumbnail product-thumbnail"]',
  sweaterHummingbirdTitleBtn: '[data-id-product="2"] [itemprop="url"]',
  framePosterTheBestImageBtn:
    '[data-id-product="3"] [class="thumbnail product-thumbnail"]',
  framePosterTheBestTitleBtn: '[data-id-product="3"] [itemprop="url"]',
  framePosterAdventureImageBtn:
    '[data-id-product="4"] [class="thumbnail product-thumbnail"]',
  framePosterAdventureTitleBtn: '[data-id-product="4"] [itemprop="url"]',
  framePosterTodayImageBtn:
    '[data-id-product="5"] [class="thumbnail product-thumbnail"]',
  framePosterTodayTitleBtn: '[data-id-product="5"] [itemprop="url"]',
  mugTheBestImageBtn:
    '[data-id-product="6"] [class="thumbnail product-thumbnail"]',
  mugTheBestTitleBtn: '[data-id-product="6"] [itemprop="url"]',
  mugAdventureImageBtn:
    '[data-id-product="7"] [class="thumbnail product-thumbnail"]',
  mugAdventureTitleBtn: '[data-id-product="7"] [itemprop="url"]',
  mugTodayImageBtn:
    '[data-id-product="8"] [class="thumbnail product-thumbnail"]',
  mugTodayTitleBtn: '[data-id-product="8"] [itemprop="url"]',
};

//There will be some selectors on homepage without special category,
//like this button in the middle of screen
export var homepage = {
  allProductsBtn: '[class="all-product-link float-xs-left float-md-right h4"]',
};

export var contactUs = {
  messageInput: "textarea",
};

export var loginIn = {
  createAccountBtn: '[class="no-account"] a',
};

export var men = {
  menText: "h1",
};

export var allProducts = {
  homeText: "h1",
};

export var searchResult = {
  hummingbridPrintedSweaterText:
    '[data-id-product="2"] [class="h3 product-title"] a',
  regularPriceText: '[class="regular-price"]',
  priceText: '[class="price"]',
};
