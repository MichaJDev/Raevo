const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./config.json');
let TOKEN = auth.token;
const prefix = "-?";

client.on('ready', () => {
  console.log('Logged in as ${client.user.tag}!');
});
client.on('message', async message => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (message.author.bot) return;
  //Automatic Reply for Listing server
  if (message.content.includes('discord.gg/')) {
    message.channel.send({
      embed: {
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
  var server = message.guild.id;
  //ping command
  if (command === 'ping') {
    message.reply('pong');
  }
  if (command === 'guild') {

    message.reply(" the server id: " + server);
  }
  if(command === 'owner'){
    var guild = client.guilds.get(server);
    message.reply(guild.owner);
  }
  if (command === 'ban') {
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (message.author.roles.some(role => role.name === 'Owner')) {
      if (user) {
        // Now we get the member from the user
        const member = message.guild.member(user);
        // If the member is in the guild
        if (member) {
          /**
           * Ban the member
           * Make sure you run this on a member, not a user!
           * There are big differences between a user and a member
           * Read more about what ban options there are over at
           * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
           */
          member.ban({
            reason: 'They were bad!',
          }).then(() => {
            // We let the message author know we were able to ban the person
            message.reply('Successfully banned ${user.tag}');
            member.sendMessage('You have banned from ' + message.guild.name + member.name + "| Reason: Undefined");
          }).catch(err => {
            // An error happened
            // This is generally due to the bot not being able to ban the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to ban the member');
            // Log the error
            console.error(err);
          });
        } else {
          // The mentioned user isn't in this guild
          message.reply('That user isn\'t in this guild!');
        }
      } else {
        // Otherwise, if no user was mentioned
        message.reply('You didn\'t mention the user to ban!');
      }
    }
  }
});



client.login(TOKEN);
