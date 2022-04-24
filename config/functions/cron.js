

const dayjs = require("dayjs");

const sender = "RCCG CoP";
const churchAddress = "RCCG CHAPEL OF PRAISE";



async function addPersonalInfoToMsg(msg, gender, name, marital_status) {
  return msg.replace(
    "[personal_info]",
    `${
      gender.toLowerCase() == "male"
        ? "Mr. "
        : marital_status.toLowerCase() == "single"
        ? "Ms. "
        : "Mrs. "
    }${name.trim().split(" ")[0]}`
  );
};



module.exports ={};