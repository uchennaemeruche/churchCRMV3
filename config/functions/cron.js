("use strict");

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#cron-tasks
 */

// "0 0 4 * * 4": {
//     task: async () => {
//       console.log("Runs every thursday by 4am");
//       // Send faith clinic reminder to all members
//       const phoneNumbers = await fetchMembers({});
//       const sendMsg = await strapi.services.sms.send({
//         msg: "Faith Clinic reminder",
//         phoneNumbers,
//         sender,
//       });
//       options: {
//         tz: "Africa/Lagos";
//       }
//     },
//   },

//   "0 36 3 * * 4": async () => {
//     // Send faith clinic reminder to all members
//     console.log("Runs by 3:35 am");
//     const phoneNumbers = await fetchMembers({});
//     const sendMsg = await strapi.services.sms.send({
//       msg: "Faith Clinic reminder",
//       phoneNumbers,
//       sender,
//     });
//   },
