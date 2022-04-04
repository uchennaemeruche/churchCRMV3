"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async find(columns = ["name", "slug", "id"]) {
    const result = await strapi
      .query("natural-group")
      .model.fetchAll({ columns });
    return result?.toJSON();
  },
};
