const https = require('https');
const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = 'https://api.openai.com/v1/chat/completions';
const question = `On Monday evening, Adam and Andrew sent text messages. Adam sent x text messages each hour for 3 hours, 
and Andrew sent y text messages each hour for 5 hours. 
Which of the following represents the total number of messages sent by Adam and Andrew 
on Monday evening?

A) 8xy
B) 3x+5y
C) 15xy
D) 5x+3y

My answer was D) 5x+3y`// use process.argv.slice(2)[0] for command line input;
const prompt = question + "\nWhy is my answer wrong?";

const requestBody = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
        {"role": "system", "content": "You are a teaching aid. You correct and educate users on why their answer is wrong."},
        {"role": "user", "content": prompt}],
    temperature: 0.12,
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
