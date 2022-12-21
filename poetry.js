const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function start() {
  const myArgs = process.argv.slice(2);
  const recipe = myArgs[0];
  const ingredients = myArgs[1];
  const response = await openai.createCompletion("text-davinci-003", {
    prompt: "Title: Spaghetti Bolognese\nComponents: spaghetti, ground beef, tomatoes, onions, garlic, herbs\n\nBoil a pot of spaghetti,\nToss in some ground beef,\nDice up some tomatoes and onions,\nAnd don't forget the garlic and herbs.\n\nStir and simmer,\nUntil the sauce is thick and rich,\nServe over noodles,\nAnd savor every delicious bite.\n###\nTitle: "+recipe+"\nComponents: "+ingredients+"\n\nPoem:",
    temperature: 0.89,
    max_tokens: 161,
    top_p: 1,
    frequency_penalty: 0.2,
    presence_penalty: 0.57,
    stop: ["###"],
  });
  console.log(response.data.choices[0].text);
}

start();