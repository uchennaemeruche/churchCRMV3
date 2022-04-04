"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async find(columns = ["name", "slug", "id"]) {
    const result = await strapi.query("department").model.fetchAll({ columns });
    console.log("Deprt Result", result.toJSON());
    return result?.toJSON();
  },
};
