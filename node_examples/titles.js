const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function start() {
  const myArgs = process.argv.slice(2);
  const concept = myArgs[0];
  const response = await openai.createCompletion("text-davinci-003", {
    prompt: "Write a witty, brief title for the following concept: " + concept,
    temperature: 0,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0.2,
    presence_penalty: 0.57,
    stop: ["###"]
  });
  console.log(response.data.choices[0].text);
}

start();