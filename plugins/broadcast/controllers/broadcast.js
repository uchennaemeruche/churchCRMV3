"use strict";

const constructQueryFilter = (category, value) => {
  if (value == "all") return null;
  if (category == "natural_group") return `natural_groups.id = ${value}`;

  if (category != value) return `${category} LIKE ${value}`;
  if (category == "minister") return `isMinister = 1`;
  if (category == "workers") return `department != ""`;
};

const constructQueryRelations = () => {
  const relations = [
    [
      "members__natural_groups",
      "members.id",
      "=",
      "members__natural_groups.member_id",
    ],
    [
      "natural_groups",
      "natural_groups.id",
      "=",
      "members__natural_groups.natural-group_id",
    ],
  ];

  return relations;
};

const getPhoneNumbers = (category, recipientArr) => {
  if (category == "custom_recipients") return recipientArr.split(",");
  return recipientArr.map((member) => member.phone_number);
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

      const filter = constructQueryFilter(recipientCategory, recipients);
      let columns = [
        recipientCategory != "natural_group" ? "name" : "members.name",
        "phone_number",
        // "natural_groups.name as groupName",

        // recipientCategory == "natural_group"
        //   ? "natural_groups.name as groupName"
        //   : "natural_groups.name as groupName",
        "department",
      ];

      // const relations =
      //   recipientCategory == "natural_group" ? constructQueryRelations() : null;
      const relations = constructQueryRelations();

      const members =
        recipientCategory == "custom_recipients"
          ? recipients
          : await strapi.services.member.fetchMembers(
              filter,
              columns,
              relations
            );

      console.log("Members", members);

      const phoneNumbers = getPhoneNumbers(recipientCategory, members);
      console.log("Phone Numbers", phoneNumbers);

      strapi.services.sms
        .send({
          msg: message,
          phoneNumbers,
          sender,
        })
        .then((res) => {
          console.log("Res:", res);
        });

      ctx.send("Message broadcasted");
    } catch (error) {
      console.log("Error Here:", error);
      throw error;
    }
  },
};
