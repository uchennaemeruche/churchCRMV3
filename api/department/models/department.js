"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeCreate(data) {
      data.slug = data.name.toLowerCase().split(" ").join("_");
    },

    beforeUpdate(params, data) {
      if (data.name)  data.slug = data.name.toLowerCase().split(" ").join("_");
    },
  },
};
