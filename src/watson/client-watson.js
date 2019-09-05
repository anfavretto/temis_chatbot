const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const watsonAssistant = new AssistantV1({
  "iam_apikey": "mOS2ZvGUPguUYrui_8jvu5J-guRmOoliqiAgDHqvhtG2",
  "url": "https://gateway.watsonplatform.net/assistant/api",
  "version":"Development"
});

module.exports = watsonAssistant;