const { RichEmbed } = require('discord.js');
const { prefix } = require('../config');

exports.run = async (client, message, args) => {

    await message.delete().catch(O_o=>{});

    const a = message.guild.roles.get('520152642979233792'); // PC
    const b = message.guild.roles.get('520152918494674965'); // PS4
    const c = message.guild.roles.get('521427244233654273'); // XBOX

    const filter = (reaction, user) => ['🇦', '🇧', '🇨'].includes(reaction.emoji.name) && user.id === message.author.id;

    const embed = new RichEmbed()
        .setTitle('Avaiilable Roles')
        .setDescription(`
        
        🇦 ${a.toString()}
        🇧 ${b.toString()}
        🇨 ${c.toString()}
        `)
        .setColor(0xdd9323)
        .setFooter(`ID: ${message.author.id}`);
        
    message.channel.send(embed).then(async msg => {

        await msg.react('🇦');
        await msg.react('🇧');
        await msg.react('🇨');

        msg.awaitReactions(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
        }).then(collected => {

            const reaction = collected.first();

            switch (reaction.emoji.name) {
                case '🇦':
                    if (message.member.roles.has(a.id)) {
                        msg.delete(2000);
                        return message.channel.send('You are already in this role!').then(m => m.delete(3000));
                    }
                    message.member.addRole(a).catch(err => {
                        console.log(err);
                        return message.channel.send(`Error adding you to this role: **${err.message}**.`);
                    });
                    message.channel.send(`You have been added to the **${a.name}** role!`).then(m => m.delete(3000));
                    msg.delete();
                    break;
                case '🇧':
                    if (message.member.roles.has(b.id)) {
                        msg.delete(2000);
                        return message.channel.send('You are already in this role!').then(m => m.delete(3000));
                    }
                    message.member.addRole(b).catch(err => {
                        console.log(err);
                        return message.channel.send(`Error adding you to this role: **${err.message}**.`);
                    });
                    message.channel.send(`You have been added to the **${b.name}** role!`).then(m => m.delete(3000));
                    msg.delete();
                    break;
                case '🇨':
                    if (message.member.roles.has(c.id)) {
                        msg.delete(2000);
                        return message.channel.send('You are already in this role!').then(m => m.delete(3000));
                    }
                    message.member.addRole(c).catch(err => {
                        console.log(err);
                        return message.channel.send(`Error adding you to this role: **${err.message}**.`);
                    });
                    message.channel.send(`You have been added to the **${c.name}** role!`).then(m => m.delete(3000));
                    msg.delete();
                    break;
            }
        }).catch(collected => {
            return message.channel.send(`I couldn't add you to this role!`);
        });

    });

};

exports.help = {
    name: 'roles'
};