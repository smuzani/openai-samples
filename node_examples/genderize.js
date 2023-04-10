const https = require('https');
const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = 'https://api.openai.com/v1/chat/completions';
const prompt = process.argv.slice(2)[0];

const requestBody = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
        {"role": "system", "content": "Question: Convert pronouns such as `he` to a neutral variable `${p.she}`. Take note of capitalization.\n\nCode for the pronouns:\n```\nlet p = {\n  sdesc: 'this character', // Bob\n  Sdesc: 'This character', // Bob\n  sdescs: \"this character's\",\n  Sdescs: \"This character's\",\n  him: 'him/her',\n  Him: 'Him/her',\n  his: 'his/her',\n  His: 'His/her',\n  she: 'he/she',\n  She: 'He/she',\n  herself: 'him/herself',\n  Herself: 'His/herself',\n  hers: 'his/hers',\n  Hers: 'His/Hers'\n};\n```\n\n"},
        {"role": "user", "content": "Genderize: She is constantly building bridges between two sides. She never takes sides and always tries to find the good in everyone. Her optimism and positivity has made her popular."},
        {"role": "assistant", "content": "${p.She} is constantly building bridges between two sides. ${p.She} never takes sides and always tries to find the good in everyone. ${p.His} optimism and positivity has made ${p.him} popular."},
        {"role": "user", "content": "Genderize: " + prompt}
        ],
    temperature: 0,
    max_tokens: 300,
    top_p: 1,
    frequency_penalty: 0.2,
    presence_penalty: 0.57,
  });

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  }
};

const request = https.request(apiUrl, options, response => {
  let responseData = '';
  response.on('data', chunk => {
    responseData += chunk;
  });
  response.on('end', () => {
    const data = JSON.parse(responseData);
    if (response.statusCode >= 200 && response.statusCode < 300) {
      console.log(data.choices[0].message.content);
    } else {
      console.error(`ERROR ${response.statusCode}: ${data.error.type}\nMessage: " + ${data.error.message}`);
    }
  });
});

request.write(requestBody);
request.end();
