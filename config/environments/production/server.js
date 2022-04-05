module.exports = ({ env }) => ({
  host: env('HOST', '127.0.0.1'),
  port: env.int('PORT', 1337),
  admin: {
    url: "/dashboard",
    auth: {
      secret: env('ADMIN_JWT_SECRET', '9409073c14048600fa90118f47d4f3ef'),
    },
  },
  cron:{
    enabled:true
  }
});
