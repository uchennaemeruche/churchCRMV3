("use strict");


module.exports = {
  /**
  *    *    *    *    *    *
  ┬    ┬    ┬    ┬    ┬    ┬
  │    │    │    │    │    │
  │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
  │    │    │    │    └───── month (1 - 12)
  │    │    │    └────────── day of month (1 - 31)
  │    │    └─────────────── hour (0 - 23)
  │    └──────────────────── minute (0 - 59)
  └───────────────────────── second (0 - 59, OPTIONAL)

*/

  // Runs every tuesday at 6am --  For Digging Deep
  "0 0 6 * * 2": async () => {
    try {
      console.log("Hello Digging Deep");
      const columns = [
        "phone_number",
        "name",
        "birthdate",
        "gender",
        "marital_status",
      ];
      const members = await fetchMembers({ columns });
      // const phoneNumbers = members.map((member) => member.phone_number);
      const programmeType = "Digging_Deep";

      // Fetch Digging deep topic, time and location for that day from digging deep table
      const programme = await findProgramme(programmeType);

      if (programme && !programme.send_reminder) return false;

      const msg = await createProgrammeReminder({
        programmeType,
        theme: programme?.theme,
        time: programme?.time,
        speaker: programme?.speaker,
        date: programme?.date,
      });

      members.forEach(async (member) => {
        strapi.services.sms
          .send({
            msg: addPersonalInfoToMsg(
              msg,
              member.gender,
              member.name,
              member.marital_status
            ),
            phoneNumbers: [member.phone_number],
            sender,
          })
          .then((res) => {
            console.log("Res:", res);
          });
      });
    } catch (error) {
      console.log(" Digging Deep Error", error);
    }
  },

  
  //Runs every thursday at 6am --  For Faith Clinic

  "0 0 6 * * 4": async () => {
    try {
      console.log("Hello Faith Clinic");
      const columns = [
        "phone_number",
        "name",
        "birthdate",
        "gender",
        "marital_status",
      ];
      const members = await fetchMembers({ columns });
      // const phoneNumbers = members.map((member) => member.phone_number);
      const programmeType = "Faith_Clinic";

      // Fetch Faith clinic topic, time and location for that day from faith clinic table
      const programme = await findProgramme(programmeType);

      if (programme && !programme.send_reminder) return false;

      const msg = await createProgrammeReminder({
        programmeType,
        theme: programme?.theme,
        time: programme?.time,
        speaker: programme?.speaker,
        date: programme?.date,
      });

      members.forEach(async (member) => {
        strapi.services.sms
          .send({
            msg: addPersonalInfoToMsg(
              msg,
              member.gender,
              member.name,
              member.marital_status
            ),
            phoneNumbers: [member.phone_number],
            sender,
          })
          .then((res) => {
            console.log("Res:", res);
          });
      });
    } catch (error) {
      console.log(" Faith Clinic Error", error);
    }
  },


  
  // "0 0 6 * * 6": {},
  /**
  Cron Job that runs
  every first friday of a new month at 7pm -- For Mount Zion impactation service
  */

  //Cron Job that runs everyday by 6am for birthday messages
  "0 0 6 * * *": async () => {
    console.log(
      "This runs everyday at 6:00am everyday to send birthday shout outs"
    );
    try {
      const filter = `birthdate LIKE '%${dayjs().format("MM-DD")}%'`;
      const columns = [
        "phone_number",
        "name",
        "birthdate",
        "gender",
        "marital_status",
      ];

      const members = await fetchMembers({ columns, filter });
      if (!members || members.length < 1) return false;
      members.forEach(async (member) => {
        strapi.services.sms
          .send({
            msg: await birthdayMessage(
              member.gender,
              member.name,
              member.marital_status
            ),
            phoneNumbers: [member.phone_number],
            sender,
          })
          .then((res) => {
            console.log("Res:", res);
          });
      });
    } catch (error) {
      console.log(
        "An error occurred while sending birthday shoutout message",
        error.message
      );
      // Send an  Email and SMS to ADMIN
    }
  },

  // Executing every 1 second
  "*/10 * * * * *": async () => {
    try {
      // console.log("RUns 10secs");

      const filter = `birthdate LIKE '%${dayjs().format("MM-DD")}%'`;
      // filter: `birthdate LIKE '%04%'`,
      const columns = [
        "phone_number",
        "name",
        "birthdate",
        "gender",
        "marital_status",
      ];

      const phoneNumbers = await fetchMembers({
        columns,
        filter,
      });
      // const birthdat = await birthdayMessage("male", "Uchenna", "single");
      // console.log("Birthday", birthdat);
      // const programme = await findProgramme("Digging_Deep");
      // console.log("Programme", programme);

      // strapi.services.sms.send({msg, sender});
    } catch (error) {
      console.log("An Error occurred", error.message);
    }
  },

  // "0 0 6 * * 2": {
  //   task: async () => {
  //     // Send digging deep reminder to all members

  //     options: {
  //       tz: "Africa/Lagos";
  //     }
  //   },
  // },
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
