"use strict";

const constructQueryFilter = (category, value) => {
  if (value == "all") return null;

  if (category != value) return `${category} LIKE ${value}`;
  if (category == "minister") return `isMinister = 1`;
  if (category == "workers") return `department != ""`;
};

/**
 * broadcast.js controller
 *
 * @description: A set of functions called "actions" of the `broadcast` plugin.
 */

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Add your own logic here.
    console.log("Hello there");

    // Send 200 `ok`
    ctx.send({
      message: "ok",
    });
  },

  /**
   * Default action.
   *
   * @return {Object}
   */
  send: async (ctx) => {
    try {
      console.log("Broadcasting...");

      const { sender, recipients, message, recipientCategory } =
        ctx.request.body;
      console.log(ctx.request.body);

      let members = [];
      if (recipientCategory == "custom_recipients") {
        members = recipients.split(",");
      } else {
        const filter = constructQueryFilter(recipientCategory, recipients);
        const columns = [
          "phone_number",
          "name",
          "gender",
          "marital_status",
          "department",
          "natural_group",
        ];
        members = await strapi.services.member.fetchMembers(filter, columns);
      }

      console.log("Members", members);

      ctx.send({
        message,
        sender,
        recipients,
      });
    } catch (error) {
      console.log("Error Here:", error);
      throw error;
    }
  },
};
