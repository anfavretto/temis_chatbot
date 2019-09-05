const AssistantV2 = require('watson-developer-cloud/assistant/v2');
const watsonAssistant = new AssistantV2({
  "iam_apikey": "mOS2ZvGUPguUYrui_8jvu5J-guRmOoliqiAgDHqvhtG2",
  "url": "https://gateway.watsonplatform.net/assistant/api",
  "version":"Development"
});

module.exports = watsonAssistant;