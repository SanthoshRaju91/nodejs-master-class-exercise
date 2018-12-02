const config = require("../config");
const https = require("https");
const querystring = require("querystring");

let helpers = {};

helpers.sendTwilioSms = (phone, msg, callback) => {
  // validate parameters
  phone =
    typeof phone === "string" && phone.trim().length === 10
      ? phone.trim()
      : false;
  msg =
    typeof msg === "string" &&
    msg.trim().length > 0 &&
    msg.trim().length <= 1600
      ? msg.trim()
      : false;

  if (phone && msg) {
    console.log("Phone ", phone);
    console.log("Msg ", msg);
    // configure request payload
    const paylod = {
      From: config.twilio.fromPhone,
      To: "+91" + phone,
      Body: msg
    };

    const stringPayload = querystring.stringify(paylod);

    const requestDetails = {
      protocol: "https:",
      hostname: "api.twilio.com",
      method: "POST",
      path:
        "/2010-04-01/Accounts" + config.twilio.accountSid + "/Messages.json",
      auth: config.twilio.accountSid + ":" + config.twilio.authToken,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(stringPayload)
      }
    };

    // Instantiate the request object
    const req = https.request(requestDetails, res => {
      const status = res.statusCode;

      if (status === 200 || status === 201) {
        callback(false);
      } else {
        callback("Status code returned was " + status);
      }
    });

    // Bind the error event
    req.on("error", err => {
      callback(err);
    });

    // add the payload
    req.write(stringPayload);

    // End the request
    req.end();
  } else {
    callback("Given parameter were missing or invalid");
  }
};

module.exports = helpers;
