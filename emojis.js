const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function start() {
  const myArgs = process.argv.slice(2);
  const concept = myArgs[0];
  const response = await openai.createCompletion("davinci", {
    prompt: "Pick a few emojis that represent the following concepts.\n\nFlammable: 🛢️🚒\n###\nPerson falling asleep at computer:🛌💻💤\n###\n" + concept + ":",
    temperature: 0.1,
    max_tokens: 20,
    top_p: 1,
    frequency_penalty: 0.2,
    presence_penalty: 0.57,
    stop: ["###"]
  });
  console.log(response.data.choices[0].text);
}

start();