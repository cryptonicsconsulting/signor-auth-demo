module.exports = function (app) {
  const authRoutes = require("./auth.routes");

  app.use("/auth", authRoutes);


  app.get("/", function (req, res) {
    res.json({
      application: "PKIauth API",
      version: "1.0",
    });
  });
};
