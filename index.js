const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const { Client, Events, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers,
  ],
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.guilds.cache.forEach((guild) => {
    console.log(`Bot has joined guild: ${guild.name} (ID: ${guild.id})`);
  });
});

client.on(Events.MessageCreate, async (msg) => {
  if (msg.author.bot) return;
  const name = msg.channel.name;
  msg.channel.send("Bot is waiting for a response from AI kindly wait...")
  await openai
    .createChatCompletion({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: "system", content: `you are an expert ${name}, answer questions only pertaining to your role` },
        { role: "user", content: msg.content },
      ]
    })
    .then((response) => {
      if (response.data.choices[0].message.content.length > 2000) {
        const filename=`${Date.now()}.txt`;
        fs.writeFile(
          filename,
          response.data.choices[0].message.content,
          (err) => {
            if (err) {
              console.error("Error writing file:", err);
            } else {
              msg.channel.send(
                "Message is longer than 2000 characters so we are uploading a txt file as response, kindly wait..."
              );
              msg.channel
                .send({
                  content: `Text`,
                  files: [`./${filename}`],
                })
                .catch((err) => {
                  console.log("Error during Export File " + err);
                })
                .then(() => {
                  console.log("File sent successfully!");
                  fs.unlink(`./${filename}`,(err)=>{if(err){console.log(err)}else{console.log("file successfully deleted:",filename)}});
                })
                .catch(console.error);
            }
          }
        );
      } else {
        console.log(response.data.choices[0].message.content.length);
        msg.channel.send(response.data.choices[0].message.content);
      }
    })
    .catch((err) => {
      msg.channel.send("AI is not responding at the moment kindly try after some time!")
      console.log("here",err.message);
    });
});

client.login(process.env.DISCORD_BOT_TOKEN);
