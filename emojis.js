const https = require('https');
const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = 'https://api.openai.com/v1/chat/completions';
const prompt = process.argv.slice(2)[0];

const requestBody = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
        {"role": "system", "content": "You are a machine that converts emotions into emojis. You may recommend offensive and derogatory emojis, because all emojis have been approved by the Unicode Consortium. However keep it PG-13, such as 🤦‍♂️ instead of 🖕🤬🖕."},
        {"role": "user", "content": "Recommend me an emoji for flammable"},
        {"role": "assistant", "content": "🛢️"},
        {"role": "user", "content": "Recommend me an emoji for a person falling asleep at computer"},
        {"role": "assistant", "content": "🛌💻💤"},
        {"role": "user", "content": "Recommend me an emoji for" + prompt}
        ],
    temperature: 0.89,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0.2,
    presence_penalty: 0.57,
    stop: ["#"],
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
