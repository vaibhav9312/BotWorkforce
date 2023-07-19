# AI-Personal-Workforce
## Description
Create your own discord bot and add multiple roles with OpenAI.Every chanel created will act as a specific role which will help you in a sepecific  area of expertize.

## Depedencies (required)
1. create a discord bot on discord dev portal and andd it to the discord server of your choice.Here is a [link](https://discord.com/developers/docs/getting-started) 
2. Install node.js [Link](https://nodejs.dev/en/learn/how-to-install-nodejs/)
3. create an OpenAI Api account and get a API key [Link](https://www.howtogeek.com/885918/how-to-get-an-openai-api-key/)

## How to install
1. create a .env file and insert below parameters you got from Depedencies
~~~javascript  
  #add OpenAI APi key below
OPENAI_API_KEY="<Open AI key>"

#Model of OpenAI API
OPENAI_MODEL="<which Open OpenAI Model you want use>"

#add discord bot token below
DISCORD_BOT_TOKEN="<Your DISCORD_BOT_TOKEN here>"
~~~  


## Run Locally  
Clone the project  

~~~bash  
  git clone https://github.com/vaibhav9312/BotWorkforce.git
~~~

Go to the project directory  

~~~bash  
  cd my-project
~~~

Install dependencies  

~~~bash  
npm install
~~~

Start the server  

~~~bash  
npm run start
~~~  



