const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function start() {
  const myArgs = process.argv.slice(2);
  const topic = myArgs[0];
  const prompt = topic + "\nLet's think step by step."
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.69,
    max_tokens: 250,
    top_p: 1,
    frequency_penalty: 0.2,
    presence_penalty: 0.57,
    stop: ["###"],
  });
  console.log(response.data.choices[0].text);
}

start();