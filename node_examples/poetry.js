const https = require('https');
const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = 'https://api.openai.com/v1/chat/completions';

const myArgs = process.argv.slice(2);
const title = myArgs[0];
const ingredients = myArgs[1];

const sampleInput = "Title: Spaghetti Bolognese\nComponents: spaghetti, ground beef, tomatoes, onions, garlic, herbs"
const sampleOutput = "Boil a pot of spaghetti,\nToss in some ground beef,\nDice up some tomatoes and onions,\nAnd don't forget the garlic and herbs.\n\nStir and simmer,\nUntil the sauce is thick and rich,\nServe over noodles,\nAnd savor every delicious bite.";

const requestBody = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
        {"role": "system", "content": "You write poems with minimum words, based around a set of ingredients. Not only do you write recipes, but also bug reports, and even poems about your favorite movies."},
        {"role": "user", "content": sampleInput},
        {"role": "assistant", "content": sampleOutput},
        {"role": "user", "content": "Title: "+title+"\nComponents: "+ingredients+"\n\nPoem:"}
    ],
    temperature: 0.89,
    max_tokens: 161,
    top_p: 1,
    frequency_penalty: 0.2,
    presence_penalty: 0.57,
    stop: ["###"],
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
      console.error(`ERROR ${response.statusCode}: ${data.error.type}\nMessage: ${data.error.message}`);
    }
  });
});

request.write(requestBody);
request.end();
