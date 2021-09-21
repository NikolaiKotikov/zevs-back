"use strict";

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Retrieve the record.
   *
   * @return {Object}
   */

  async find(ctx) {
    const entity = await strapi.services.content.find();
    const content = sanitizeEntity(entity, { model: strapi.models.content });

    for (const section of content.sections) {
      if (section.__component === "section.section-catalog") {
        const newItems = await Promise.all(
          section.items.map(async (element) => {
            const id = element.category.id;
            const title = element.title;
            const thumbs = element.category?.thumbs;
            const products = await strapi.services.product.find({
              "category.id": id,
            });
            if (products.length) {
              for (const product of products) {
                delete product?.created_by;
                delete product?.updated_by;
                delete product?.published_at;
                delete product?.created_at;
                delete product?.updated_at;
                delete product?.category;
              }
            }
            return { title, thumbs, products };
          })
        );
        section.items = newItems;
      }
    }

    return content;
  },
};
