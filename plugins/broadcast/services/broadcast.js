"use strict";

/**
 * broadcast.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {
  async getMessageTemplates() {
    strapi.notification.success(`Templates called`);
    console.log("Collections", strapi);
    console.log("Hello everyone");
    let result = await strapi
      .query("broadcast-template")
      .model.fetchAll({ columns: ["message, id"] });
    result = result?.toJSON();
  },

  async getMessageTemplates2() {
    const result = await request(
      "/content-manager/content-types/application::broadcast-template.broadcast-template",
      { method: "GET" }
    );

    // Remove non-user content types from models

    strapi.notification.success(`Result: ${result}`);
    // strapi.notification.success(`Templates ${models}`);

    const templates = result.map((template) => {
      return {
        label: template.message,
        value: template.id,
      };
    });
    return templates;
  },
};
