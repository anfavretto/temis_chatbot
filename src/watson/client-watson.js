const AssistantV2 = require('ibm-watson/assistant/v2');
const watsonAssistant = new AssistantV2({
  "apikey": "mOS2ZvGUPguUYrui_8jvu5J-guRmOoliqiAgDHqvhtG2",
  "iam_apikey_description": "Auto-generated for key 54368522-dade-40eb-975d-30c9e04166a3",
  "iam_apikey_name": "Auto-generated service credentials",
  "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
  "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/0aa7db02609c468e8a4664418c16f06e::serviceid:ServiceId-cd2e024a-54af-47e6-90e2-c87128667c71",
  "url": "https://gateway.watsonplatform.net/assistant/api"
});

module.exports = watsonAssistant;