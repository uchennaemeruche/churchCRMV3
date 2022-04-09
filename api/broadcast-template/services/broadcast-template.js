"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async find(columns = ["message", "category"]) {
    const result = await strapi
      .query("broadcast-template")
      .model.fetchAll({ columns });
    return result.toJSON();
  },
};
