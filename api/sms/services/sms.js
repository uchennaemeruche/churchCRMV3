"use strict";

const axios = require("axios");

/**
 * `sms` service.
 */

module.exports = {
  async send({ msg, phoneNumbers = [], sender }) {
    const formattedRecipients = phoneNumbers.map((phoneNumber, idx) => {
      return { msidn: phoneNumber, msgid: idx };
    });

    const payload = {
      SMS: {
        auth: {
          username: strapi.config.custom.smsUsername,
          apikey: strapi.config.custom.smsApiKey,
        },
        message: {
          sender,
          messagetext: msg,
        },
        recipients: {
          gsm: formattedRecipients,
        },
      },
    };

    const res = await axios.post(strapi.config.custom.smsUrl, payload);
    console.log("Res:", res.data);
    return true;
  },
};
