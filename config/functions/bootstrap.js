"use strict";
const pluralize = require("pluralize");

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = () => {
  pluralize.addPluralRule("category", "категории");
  pluralize.addPluralRule("product", "продукты");
  pluralize.addPluralRule("link", "ссылки");
  pluralize.addPluralRule("feedback", "обратная связь");
  pluralize.addSingularRule("setting", "pages");
};
