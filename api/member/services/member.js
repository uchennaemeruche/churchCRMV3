"use strict";
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async fetchMembers(filter, columns) {
    if (!filter) {
      const result = await strapi.query("member").model.fetchAll({ columns });
      return result?.toJSON();
    }
    const result = await strapi
      .query("member")
      .model.query((qb) => {
        qb.whereRaw(filter);
      })
      .fetchAll({ columns });
    return result?.toJSON();
  },
};
