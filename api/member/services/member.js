"use strict";
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async fetchMembers(filter, columns, relations = null) {
    if (!filter) {
      const result = await strapi.query("member").model.fetchAll({ columns });
      return result.toJSON();
    }

    // if (relations) {
    //   const result = await strapi
    //     .query("member")
    //     .model.query((qb) => {
          
    //       // qb.join(...relations[0])
    //       // qb.join(...relations[1])
    //       qb.whereRaw(filter)
    //     })
    //     .fetchAll({columns});
    //   return result.toJSON();
    // }
    const result = await strapi
      .query("member")
      .model.query((qb) => {
        if(relations){
          relations.forEach(relation =>{
            qb.join(...relation);
          })
        }
        qb.whereRaw(filter);
      })
      .fetchAll({ columns });
    return result.toJSON();
  },
};
