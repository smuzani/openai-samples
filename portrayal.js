const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function start() {
  const myArgs = process.argv.slice(2);
  const definition = myArgs[0];
  const response = await openai.createCompletion("text-davinci-003", {
    prompt: "Write a detailed portrayal of " + definition,
    temperature: 0.89,
    max_tokens: 250,
    top_p: 1,
    frequency_penalty: 0.2,
    presence_penalty: 0.57,
    stop: ["#"],
  });
  console.log(response.data.choices[0].text);
}

start();