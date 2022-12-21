  const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function start() {
  const myArgs = process.argv.slice(2);
  const text = myArgs[0];
  const prompt ="Question: Convert pronouns such as `he` to a neutral variable `${p.she}`. Take note of capitalization.\n\nCode for the pronouns:\n```\nlet p = {\n  sdesc: 'this character', // Bob\n  Sdesc: 'This character', // Bob\n  sdescs: \"this character's\",\n  Sdescs: \"This character's\",\n  him: 'him/her',\n  Him: 'Him/her',\n  his: 'his/her',\n  His: 'His/her',\n  she: 'he/she',\n  She: 'He/she',\n  herself: 'him/herself',\n  Herself: 'His/herself',\n  hers: 'his/hers',\n  Hers: 'His/Hers'\n};\n```\n\nExample:\n```\nShe is constantly building bridges between two sides. She never takes sides and always tries to find the good in everyone. Her optimism and positivity has made her popular.\n```\nto\n```\n${p.She} is constantly building bridges between two sides. ${p.She} never takes sides and always tries to find the good in everyone. ${p.His} optimism and positivity has made ${p.him} popular.\n```\n\nConvert the following text:\n```\n" + text + "\n```\n\n###\nAnswer:"
  const response = await openai.createCompletion("code-davinci-002", {
    prompt: prompt,
    temperature: 0,
    max_tokens: 200,
    top_p: 1,
    frequency_penalty: 0.2,
    presence_penalty: 0.6,
    stop: ["###"]
  });
  console.log(response.data.choices[0].text);
}

start();