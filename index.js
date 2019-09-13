const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
var prefix;
var channel;

client.on('ready', () =>{
  prefix = "!"
  console.log('Logged in as ${client.user.tag}!');
});

client.on('message', msg => {
  if(msg.content === prefix + 'ping'){
    msg.reply('pong');
  }
});
client.on('message', msg => {
  if(msg.content === prefix + 'ping'){
    msg.reply('pong');
  }
});

client.on('message', msg =>{
  if(msg.content.includes('discord.gg/')){
    msg.channel.send({embed: {
    color: 3447003,
    author: {
      name: "Advertisement Rules",
      icon_url: client.user.avatarURL
    },
    description: ":warning: - Only post advertisements every **2 hours** \n :warning: - Make sure your advertisements includes a description longer than 5 words \n :warning: - Ensure that your advertisement has a **valid** `discord.gg` invite",
    timestamp: new Date(),
    fields: [{
        name: "Your Advertisement will be removed once",
        value: " - Your advertisement does not includes a description longer than 5 words. \n - Your advertisement does not includes a valid discord.gg invite \n - Your advertisement is from the same server as your previous advertisement. \n - Your server does not follows the `Discord Terms of Service`"
    }],
    footer: {
      icon_url: client.user.avatarURL,
      text: "Reavo Bot© - By Vyx"
    }
  }
});
  }
})

client.login(auth.token)
