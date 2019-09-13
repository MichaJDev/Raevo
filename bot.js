const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./config.json');
let TOKEN = auth.token;

client.on('ready', () => {
  console.log('Logged in as ${client.user.tag}!');
});
client.on('message', async message => {
  const args = message.content.slice(auth.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
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
    if(message.author.bot) return;
    if(message.content.indexOf(auth.prefix) !== 0) return;
    //ping command
    if (command === auth.prefix +'ping') {
      message.reply('pong');
    }
    //ban command
    if(command === "kick") {
      // This command must be limited to mods and admins. In this example we just hardcode the role names.
      // Please read on Array.some() to understand this bit:
      // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
      if(!message.member.roles.some(r=>["Owner", "Administrator", "Moderator"].includes(r.name)) || !message.member.id !== "Vyx#3045" )
        return message.reply("Sorry, you don't have permissions to use this!");

      // Let's first check if we have a member and if we can kick them!
      // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
      // We can also support getting the member by ID, which would be args[0]
      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      if(!member)
        return message.reply("Please mention a valid member of this server");
      if(!member.kickable)
        return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

      // slice(1) removes the first part, which here should be the user mention or ID
      // join(' ') takes all the various parts to make it a single string.
      let reason = args.slice(1).join(' ');
      if(!reason) reason = "No reason provided";

      // Now, time for a swift kick in the nuts!
      await member.kick(reason)
        .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
      message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

    }
    //Kick command
    if(command === "ban") {
     // Most of this command is identical to kick, except that here we'll only let admins do it.
     // In the real world mods could ban too, but this is just an example, right? ;)
     if(!message.member.roles.some(r=>["Owner, Administrator"].includes(r.name)) )
       return message.reply("Sorry, you don't have permissions to use this!");

     let member = message.mentions.members.first();
     if(!member)
       return message.reply("Please mention a valid member of this server");
     if(!member.bannable)
       return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

     let reason = args.slice(1).join(' ');
     if(!reason) reason = "No reason provided";

     await member.ban(reason)
       .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
     message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
   }

});



client.login(TOKEN);
