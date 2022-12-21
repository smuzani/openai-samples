const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function start() {
  const myArgs = process.argv.slice(2);
  const paragraph = myArgs[0];
  const response = await openai.createCompletion("text-davinci-003", {
    prompt: "Summarize this for a five-year old child:\n\n" + paragraph,
    temperature: 0.7,
    max_tokens: 200,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  console.log(response.data.choices[0].text);
}

start();