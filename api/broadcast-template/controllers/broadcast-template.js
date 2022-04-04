"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  find: async (ctx) => {
    const data = await strapi.services["broadcast-template"].find();

    // Send 200 `ok`
    ctx.send(data);
  },
};
