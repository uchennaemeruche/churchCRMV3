module.exports = ({ env }) => ({
  smsApiKey: env("SMS_API_KEY", ""),
  smsUrl: env("SMS_URL", ""),
  smsUsername: env("SMS_USERNAME", "1uchenna"),
});
