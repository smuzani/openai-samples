# openai-samples

## Command Line Tools

Here are some quick tools for the command line, using OpenAI's GPT-3 language model.

Assumptions

- You have Node.js and npm installed on your machine.
- You have an API key for OpenAI.
- You are using a Mac and the zsh terminal

Instructions:

1. Clone the repo.
2. Add something similar to the following to ~/.zshrc:

```
export OPENAI_API_KEY=(YOUR API KEY HERE)

function tldr() {
  if [[ "$1" == "" ]]; then
    echo "tell me what to summarize"
  else
	node ~/(THE PATH TO YOUR FILE HERE)/tldr.js $1
  fi
}
```

3. Run the command you like (be careful with quotes), e.g.

```
tldr "The intent of Ethereum is to create an alternative protocol for building decentralized applications, providing a different set of tradeoffs that we believe will be very useful for a large class of decentralized applications, with particular emphasis on situations where rapid development time, security for small and rarely used applications, and the ability of different applications to very efficiently interact, are important. Ethereum does this by building what is essentially the ultimate abstract foundational layer: a blockchain with a built-in Turing-complete programming language, allowing anyone to write smart contracts and decentralized applications where they can create their own arbitrary rules for ownership, transaction formats and state transition functions. A bare-bones version of Namecoin can be written in two lines of code, and other protocols like currencies and reputation systems can be built in under twenty. Smart contracts, cryptographic boxes that contain value and only unlock it if certain conditions are met, can also be built on top of the platform, with vastly more power than that offered by Bitcoin scripting because of the added powers of Turing-completeness, value-awareness, blockchain-awareness and state."
```

4. It gives a response similar to

```
Ethereum is a decentralized platform that runs smart contracts: applications that run exactly as programmed without any possibility of fraud or third party interference.

In Ethereum, you can write code that controls money, and build applications accessible anywhere in the world.
```

This repo contains several samples:

- **brainstorm.js**: Generate ideas and suggestions for a given topic.
- **emojis.js**: Express your deepest, most complex emotions through the medium of tiny, pixelated images.
- **portrayal.js**: Generate a detailed portrayal of a given concept, whether it's a description of a sunset or a sweet potato.
- **poetry.js**: Write poetry based on a title and some ingredients. It can also be used to write bug reports. 
- **titles.js**: Generate a title around a concept, suited for PowerPoint presentations or book titles.
- **tldr.js**: Explains a concept to a 5 year old.
- **genderize.js**: Rewrite some boilerplate code around genders, turning gendered text like `he` into a softcoded variable like `${p.She}`.

## Fine Tuning

The `/ft/` folder contains two files:

- **prompt-template.jsonl**: Simple template for new fine-tuning files.
- **tags.jsonl**: Sample I'm actually using for character trait generation. 

There used to be a YouTube video on setting this up which has been sadly taken down. Basic instructions from [OpenAI docs](https://beta.openai.com/docs/guides/fine-tuning).

You do have to run it in python and not the command line, like the following (Mac)

```
python -m venv venv
source venv/bin/activate
```

You can prepare data. This is not so useful if you're already using .jsonl formatting, but helpful in catching bugs and typos.

```
openai tools fine_tunes.prepare_data -f <LOCAL_FILE>
```

You can then fine tune with the following command.

```
openai api fine_tunes.create -t <FILENAME>.jsonl -m <ENGINE (like curie or davinci)>
```