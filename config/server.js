module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: "http://zeus.kotins.website/api",
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "16d2c90b40a1dc691510030f760cf1fe"),
    },
  },
});
