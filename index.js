const https = require("https");
const fs = require("fs");

const config = require("./config");
const helpers = require("./lib/helpers");

const unifiedServer = (req, res) => {};

const httpsServerOptions = {
  key: fs.readFileSync("./https/key.pem"),
  cert: fs.readFileSync("./https/cert.pem")
};

const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
  unifiedServer(req, res);
});

httpsServer.listen(config.httpsPort, () => {
  console.log("The HTTPS server is running on port " + config.httpsPort);

  helpers.sendTwilioSms("8197558464", "Hello!", err => {
    console.log(`this was the error`, err);
  });
});
