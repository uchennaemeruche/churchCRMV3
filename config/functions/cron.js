

const dayjs = require("dayjs");

const sender = "RCCG CoP";
const churchAddress = "RCCG CHAPEL OF PRAISE";

async function fetchMembers({ columns, filter }) {
  const members = await strapi.services.member.fetchMembers(filter, columns);
  return members;
};

async function fetchTemplates(category) {
  const result = await strapi
    .query("broadcast-template")
    .model.query((qb) => {
      qb.where({ category });
    })
    .fetchAll({ columns: ["message"] });
  return result.toJSON();
};

async function findProgramme(type) {
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

  return result.toJSON();
};

async function birthdayMessage (gender, name, marital_status) {
  const msgs = await fetchTemplates("Birthday");
  const msg = msgs[Math.floor(Math.random() * msgs.length)];
  return addPersonalInfoToMsg(msg.message, gender, name, marital_status);
};

async function addPersonalInfoToMsg(msg, gender, name, marital_status) {
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

async function createProgrammeReminder({
  theme,
  time,
  speaker,
  date,
  programmeType,
}){
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

module.exports = () =>{}