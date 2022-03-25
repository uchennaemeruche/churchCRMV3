module.exports = ({ env }) => ({
  smsApiKey: env("SMS_API_KEY", "192.168.181.12"),
  smsUrl: env("SMS_URL", "192.168.181.12"),
  smsUsername: env("SMS_USERNAME", "1uchenna"),
});