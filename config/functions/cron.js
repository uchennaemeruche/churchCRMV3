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

const dayjs = require("dayjs");

module.exports = {
  // Runs every tuesday at 6am --  For Digging Deep
};
const sender = "RCCG CoP";
const churchAddress = "RCCG CHAPEL OF PRAISE";

const fetchMembers = async ({ columns, filter }) => {
  const members = await strapi.services.member.fetchMembers(filter, columns);
  return members;
};

const fetchTemplates = async (category) => {
  const result = await strapi
    .query("broadcast-template")
    .model.query((qb) => {
      qb.where({ category });
    })
    .fetchAll({ columns: ["message"] });
  return result?.toJSON();
};

const findProgramme = async (type) => {
  const result = await strapi
    .query("programme")
    .model.query((qb) => {
      qb.where({
        type,
        date: dayjs().format("YYYY-MM-DD"),
      });
    })
    .fetch({
      columns: ["theme", "time", "speaker", "send_reminder", "date"],
    });

  console.log("Programme Result", result);

  return result?.toJSON();
};

const birthdayMessage = async (gender, name, marital_status) => {
  const msgs = await fetchTemplates("Birthday");
  const msg = msgs[Math.floor(Math.random() * msgs.length)];
  return addPersonalInfoToMsg(msg.message, gender, name, marital_status);
};

const addPersonalInfoToMsg = (msg, gender, name, marital_status) => {
  return msg.replace(
    "[personal_info]",
    `${
      gender?.toLowerCase() == "male"
        ? "Mr. "
        : marital_status?.toLowerCase() == "single"
        ? "Ms. "
        : "Mrs. "
    }${name?.trim().split(" ")[0]}`
  );
};

const createProgrammeReminder = async ({
  theme,
  time,
  speaker,
  date,
  programmeType,
}) => {
  const msgs = await fetchTemplates(programmeType);

  let msg = msgs[Math.floor(Math.random() * msgs.length)];
  if (!theme) return msg.message;

  msg.message += `
    ${theme ? "THEME:" + theme : ""}
    ${speaker ? "Ministering:" + speaker : ""}
    ${date ? ("Date:" + date + " " + time ? time : "") : ""}
  `;

  return msg.message;
};

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
