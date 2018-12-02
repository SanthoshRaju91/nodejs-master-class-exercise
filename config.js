let environments = {};

environments.staging = {
  httpsPort: 3001,
  envName: "staging",
  twilio: {
    accountSid: "AC630b785b4849668e17e5dc7ae8d14643",
    authToken: "52172e608f1084ac0cbae44dfdb86ca0",
    fromPhone: "+919738343297"
  }
};

environments.production = {
  httpsPort: 3001,
  envName: "staging",
  twilio: {
    accountSid: "AC630b785b4849668e17e5dc7ae8d14643",
    authToken: "52172e608f1084ac0cbae44dfdb86ca0",
    fromPhone: "+919738343297"
  }
};

const currentEnvironment =
  typeof process.env.NODE_ENV === "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";
const environmentToExport =
  typeof environments[currentEnvironment] === "object"
    ? environments[currentEnvironment]
    : environments.staging;

module.exports = environmentToExport;
