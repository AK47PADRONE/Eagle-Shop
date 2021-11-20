const Discord = require('discord.js');
const client = new Discord.Client()
const config = require('./config.json');
require('discord-buttons')(client)
const { MessageMenu, MessageMenuOption, MessageButton, MessageActionRow } = require('discord-buttons');

client.on('ready', () => {
    console.log(client.user.tag + " is online")
    client.user.setPresence({
        activity: {
            name: 'Eagle Shop',
            type: "PLAYING"
        },
        status: 'dnd'
    })
        .catch(console.error)
    if (config.prefix === null) {
        console.log("Den exeis balei prefix")
    }
})

client.on('clickMenu', async (menu) => {
    const close = new MessageButton().setID('close').setEmoji('🔒').setStyle('red')
    if (menu.values[0] == 'discord') {
        const channel = await menu.guild.channels.create(`discord-services-${menu.clicker.user.tag}`)
        channel.setParent(config.parent)
        const dev = menu.guild.roles.cache.get('909698627851649034')
        const nitro = menu.guild.roles.cache.get('909747293324980244')
        channel.updateOverwrite(menu.guild.id, {
            SEND_MESSAGE: false,
            VIEW_CHANNEL: false
        });
        channel.updateOverwrite(menu.clicker.user, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true
        });
        channel.updateOverwrite(dev, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true
        });
        channel.updateOverwrite(nitro, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true
        });
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription('**Παρακαλώ πολύ περιμένετε να σας εξυπηρετήσει κάποιος**')

        channel.send(embed, close)

        menu.reply.defer()
    }
    if (menu.values[0] == 'fivem') {
        const channel = await menu.guild.channels.create(`fivem-services-${menu.clicker.user.tag}`)
        const script = menu.guild.roles.cache.get('909746601432592404');
        const host = menu.guild.roles.cache.get('909746601432592404');
        const mlo = menu.guild.roles.cache.get('910213729168289822');
        const map = menu.guild.roles.cache.get('910213729168289822');
        const vehicle = menu.guild.roles.cache.get('909819904654471169');
        channel.setParent(config.parent)
        channel.updateOverwrite(menu.guild.id, {
            SEND_MESSAGE: false,
            VIEW_CHANNEL: false
        });
        channel.updateOverwrite(menu.clicker.user, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true
        });
        channel.updateOverwrite(script, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true
        });
        channel.updateOverwrite(map, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true
        });
        channel.updateOverwrite(vehicle, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true
        });
        channel.updateOverwrite(mlo, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true
        });
        channel.updateOverwrite(map, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true
        });
        channel.updateOverwrite(host, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true
        });
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription('**Παρακαλώ πολύ περιμένετε να σας εξυπηρετήσει κάποιος**')

        channel.send(embed, close)
        menu.reply.defer()
    }
    if (menu.values[0] == 'support') {
        const channel = await menu.guild.channels.create(`Ticket-${menu.clicker.user.id}`)
        channel.setParent(config.parent)
        const eagle = menu.guild.roles.cache.get('909696684039229492');
        const staff = menu.guild.roles.cache.get('910212868929110046');
        channel.updateOverwrite(menu.guild.id, {
            SEND_MESSAGE: false,
            VIEW_CHANNEL: false
        });
        channel.updateOverwrite(menu.clicker.user, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true
        });
        channel.updateOverwrite(eagle, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true
        });
        channel.updateOverwrite(staff, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true
        });
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription('**Παρακαλώ πολύ περιμένετε να σας εξυπηρετήσει κάποιος**')

        channel.send(embed, close)
        menu.reply.defer()
    }
    if (menu.values[0] == 'p2p') {
        const channel = await menu.guild.channels.create(`p2p-${menu.clicker.user.tag}`)
        channel.setParent(config.parent)
        const p2p = menu.guild.roles.cache.get('909698061251518475')
        channel.updateOverwrite(menu.guild.id, {
            SEND_MESSAGE: false,
            VIEW_CHANNEL: false
        });
        channel.updateOverwrite(menu.clicker.user, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true
        });
        channel.updateOverwrite(p2p, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true
        });
        menu.reply.defer()
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription('**Παρακαλώ πολύ περιμένετε να σας εξυπηρετήσει κάποιος**')

        channel.send(embed, close)
    }
});

client.on('clickButton', async (button) => {
    if (button.id == 'close') {
        button.channel.send('Αυτό το ticket θα σβηστεί σε 2 δευτερόλεπτα');
        setTimeout(() => button.channel.delete(), 2000);
        button.reply.defer()
    }
    if (button.id === 'staff') {
        button.clicker.fetch()
        let questions = {
            firstQuestion: "**Η Ηλικία σας :**",
            secondQuestion: "**Πώς μπορείς να βοηθήσεις το shop μας ?**",
            thirdQuestion: "**Πως μπορείτε να βελτιώσετε το shop μας ?**",
            fourthQuestion: "**Γιατί θες να ενταχθείς στο Staff team μας? **",
            fifthQuestion: "**Πόσες ώρες μπορείτε να είστε ενεργοί ?**",
        }
        button.clicker.user.send("**Για να ακυρώσεις την αίτηση γράψε ``cancel``**")
        button.clicker.user.send(questions.firstQuestion).then(msg => {
            const filter1 = m => m.author.id === button.clicker.user.id
            msg.channel.awaitMessages(filter1, {
                time: 5 * 60000,
                max: 1
            }).then(messages => {
                let msg1 = messages.first().content
                if (msg1.toLowerCase() === "cancel") return button.clicker.user.send("**Ή Αίτηση ακυρώθηκε**")
                button.clicker.user.send(questions.secondQuestion).then(msg => {
                    const filter1 = m => m.author.id === button.clicker.user.id
                    msg.channel.awaitMessages(filter1, {
                        time: 5 * 60000,
                        max: 1
                    }).then(messages => {
                        let msg2 = messages.first().content
                        if (msg2.toLowerCase() === "cancel") return button.clicker.user.send("**Ή Αίτηση ακυρώθηκε**")
                        button.clicker.user.send(questions.thirdQuestion).then(msg => {
                            const filter1 = m => m.author.id === button.clicker.user.id
                            msg.channel.awaitMessages(filter1, {
                                time: 5 * 60000,
                                max: 1
                            }).then(messages => {
                                let msg3 = messages.first().content
                                if (msg3.toLowerCase() === "cancel") return button.clicker.user.send("**Ή Αίτηση ακυρώθηκε**")
                                button.clicker.user.send(questions.fourthQuestion).then(msg => {
                                    const filter1 = m => m.author.id === button.clicker.user.id
                                    msg.channel.awaitMessages(filter1, {
                                        time: 5 * 60000,
                                        max: 1
                                    }).then(messages => {
                                        let msg4 = messages.first().content
                                        if (msg4.toLowerCase() === "cancel") return button.clicker.user.send("**Ή Αίτηση ακυρώθηκε**")
                                        button.clicker.user.send(questions.fifthQuestion).then(msg => {
                                            const filter1 = m => m.author.id === button.clicker.user.id
                                            msg.channel.awaitMessages(filter1, {
                                                time: 5 * 60000,
                                                max: 1
                                            }).then(messages => {
                                                let msg5 = messages.first().content
                                                if (msg5.toLowerCase() === "cancel") return button.clicker.user.send("**Ή Αίτηση ακυρώθηκε**")
                                                button.clicker.user.send("**Η Αίτηση Στάλθηκε**").then(msg => {
                                                    button.client.channels.cache.get(config.applog).send(
                                                        new Discord.MessageEmbed()
                                                            .setDescription(`**Nέα Αίτηση για <@&910212868929110046>\n\nΗ Αίτηση είναι απο τον <@${button.clicker.user.id}>-${button.clicker.user.id}**`)
                                                            .setTimestamp()
                                                            .setColor(config.color)
                                                            .addField(questions.firstQuestion, "Απάντηση: " + msg1)
                                                            .addField(questions.secondQuestion, "Απάντηση: " + msg2)
                                                            .addField(questions.thirdQuestion, "Απάντηση: " + msg3)
                                                            .addField(questions.fourthQuestion, "Απάντηση: " + msg4)
                                                            .addField(questions.fifthQuestion, "Απάντηση: " + msg5)
                                                    )
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
        button.reply.defer()
    }
});

client.on('guildMemberAdd', async (member) => {
    const role = member.guild.roles.cache.get('909697787573174272')
    member.roles.add(role)
    const AddChannel = member.guild.channels.cache.get('909705275328573440')
    const embed = new Discord.MessageEmbed()
        .setColor('#FE660A')
        .setDescription(`Ο/Η <@${member.user.id}> έγινε μέλος του ${member.guild.name}`)
        .setThumbnail(`${member.user.displayAvatarURL()}`)
        .setTimestamp(Date.now())
        .addFields(
            { name: `Account Created On:`, value: `${member.user.createdAt.toLocaleString()}` }
        )
    AddChannel.send(embed)
})

client.on('guildMemberRemove', async (member) => {
    const LeaveChannel = member.guild.channels.cache.get('909705275328573440')
    const LeavEembed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setDescription(`Ο/Η ${member.user} έφυγε απο το ${member.guild.name}`)
        .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}`)
        .setTimestamp(Date.now())
        .addFields({
            name: `ID:`,
            value: `${member.user.id}`
        }, {
            name: `Account Created On:`,
            value: `${member.user.createdAt.toLocaleString()}`
        }, {
            name: `Joined Server On:`,
            value: `${member.joinedAt.toLocaleString()}`
        })

    LeaveChannel.send(LeavEembed)
})

client.on("message", async (message) => {
    if (message.channel.id === "909693368618090496") {
        message.react("👍").then(() => {
            message.react('👎')
        })
    }

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command == 'ticket') {
        if (!message.member.hasPermission("ADMINISTRATOR")) return;
        const Option1 = new MessageMenuOption()
            .setLabel('Discord')
            .setDescription('Discord Services')
            .setEmoji('909866674696622130')
            .setValue('discord')


        const Option2 = new MessageMenuOption()
            .setLabel('FiveM')
            .setDescription('FiveM Services')
            .setEmoji('909745702018637854')
            .setValue('fivem')


        const Option3 = new MessageMenuOption()
            .setLabel('P2P')
            .setDescription('PaySafe To Paypal')
            .setEmoji('909866627422629949')
            .setValue('p2p')

        const Option4 = new MessageMenuOption()
            .setLabel('Support')
            .setDescription('Για οποιαδήποτε ερώτηση')
            .setEmoji('910181007972507678')
            .setValue('support')

        const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.guild.name}`, `${message.guild.iconURL({ dynamic: true })}`)
            .setColor(config.color)
            .setDescription('**Για την εξυπηρέτηση σας ορίστε την επιλογή που παρουσιάζει το θέμα του ticket σας.**')
            .setThumbnail(message.guild.iconURL({ dynamic: true }))

        const Menu = new MessageMenu()
            .setID('menu1')
            .setPlaceholder('Διάλεξε το θέμα του Ticket')
            .addOption(Option1)
            .addOption(Option2)
            .addOption(Option3)
            .addOption(Option4)

        const row1 = new MessageActionRow()
            .addComponent(Menu)

        await message.channel.send(embed, { components: [row1] })
    }

    if (command == 'clear') {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Δεν μπορεις να σβήσεις μηνύματα');
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Δεν μπορω να σβήσω μηνύματα διότι δεν εχω αρκερα permissions ')
        if (!args[0]) return message.channel.send("You must state a number of messages to delete \`!clear number\`")
        const amountToDelete = Number(args[0], 10);

        if (isNaN(amountToDelete)) return message.channel.send("Number stated is not a valid number")
        if (!Number.isInteger(amountToDelete)) return message.channel.send("Number stated must be a whole number");
        if (!amountToDelete || amountToDelete < 2 || amountToDelete > 100) return message.channel.send('The number stated must be between 2 and 100');
        const fetched = await message.channel.messages.fetch({
            limit: amountToDelete
        });

        try {
            await message.channel.bulkDelete(fetched)
            const msg = message.channel.send(`Σβήστηκαν ${amountToDelete} μηνύματα`).then(msg => { setTimeout(() => msg.delete(), 2000) }).catch()
        } catch (err) {
            console.log(err);
            message.channel.send("I was unable to delete the amount stated make sure they are within 14 days old")
        }
    }

    if (command == 'lock') {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('You do not have enough permissions')
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('I require \`MANAGE CHANNELS\` permission to lock')

        const role = message.guild.roles.cache.get('909697787573174272')
        let lockchannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!lockchannel) lockchannel = message.channel

        await lockchannel.updateOverwrite(role, {
            SEND_MESSAGES: false
        }).catch(err => console.log(err));
        message.channel.send('Channel Locked🔒')
    }

    if (command == 'unlock') {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('You do not have enough permissions')
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('I require \`MANAGE CHANNELS\` permission to unlock')

        const role = message.guild.roles.cache.get('909697787573174272')
        let lockchannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!lockchannel) lockchannel = message.channel

        await lockchannel.updateOverwrite(role, {
            SEND_MESSAGES: true
        }).catch(err => console.log(err));
        message.channel.send('Channel Unlocked🔓')
    }

    if (command == 'giveaway') {
        let started_time_duration = ""
        let time_duration = ""
        let time_length = ""
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You don\'t have enough permissions to use this command.');
        if (!message.content.split(' ')[1]) return message.channel.send('Please follow the format. example : ``giveaway 1h 773665434612138024 1 Month Discord Nitro``.');
        const prize = message.content.split(' ').slice(3).join(' ');
        let channel = message.content.split(' ')[2]
        const started_time_duration_start = message.content.split(' ')[1]
        if (started_time_duration_start.toLowerCase().includes("h")) {
            started_time_duration = started_time_duration_start.split("h")[0]
            time_duration = started_time_duration * 3600000
            if (time_duration == 3600000) { time_length = "hour" }
            if (time_duration > 7200000) { time_length = "hours" }
        }
        if (started_time_duration_start.toLowerCase().includes("m")) {
            started_time_duration = started_time_duration_start.split('m')[0]
            time_duration = started_time_duration * 60000
            if (time_duration < 3600000) { time_length = "minutes" }
            if (time_duration == 60000) { time_length = "minute" }
        }
        if (isNaN(started_time_duration)) return message.channel.send('The duration time has to be a number.');
        if (started_time_duration < 1) return message.channel.send('The duration time has to be either a minutes or hours **(m or h)**.');
        if (!message.guild.channels.cache.find(channels => channels.id === `${channel}`)) return message.channel.send("Please enter a valid id of the channel you want the giveaway to be sent.")
        if (prize === '') return message.channel.send('You have to enter a price.');
        const embed = new Discord.MessageEmbed()
            .setTitle(`${prize}`)
            .setColor('#21b1e3')
            .setDescription(`React with 🎉 to enter!\nTime duration: **${started_time_duration}** ${time_length}\n\nHosted by: ${message.author}`)
            .setTimestamp(Date.now() + time_duration)
            .setFooter('Ends at')
        let msg = await client.channels.cache.get(`${channel}`).send(':tada: **GIVEAWAY** :tada:', embed)
        await msg.react('🎉')
        setTimeout(() => {
            msg.reactions.cache.get('🎉').users.remove(client.user.id)
            setTimeout(() => {
                let winner = msg.reactions.cache.get('🎉').users.cache.random();
                if (msg.reactions.cache.get('🎉').users.cache.size < 1) {
                    const winner_embed = new Discord.MessageEmbed()
                        .setTitle(`${prize}`)
                        .setColor('#e92855')
                        .setDescription(`No one entered the giveaway 🙁\n\nHosted by: ${message.author}`)
                        .setTimestamp()
                        .setFooter('Ended at')
                    msg.edit(':tada: **Giveaway Ended** :tada:', winner_embed);
                }
                if (!msg.reactions.cache.get('🎉').users.cache.size < 1) {
                    const winner_embed = new Discord.MessageEmbed()
                        .setTitle(`${prize}`)
                        .setColor('#f9b428')
                        .setDescription(`Winner:\n${winner}\n\nHosted by: ${message.author}`)
                        .setTimestamp()
                        .setFooter('Ended at')
                    msg.edit(':tada: **Giveaway Ended** :tada:', winner_embed);
                }
            }, 1000);
        }, time_duration);
    }
    if (command == 'apps') {
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setFooter(`${message.guild.name} Applications `)
            .setDescription('**Για αίτηση στο <@&910212868929110046> πατήστε στο κουμπί με το 🔰\n\nΓια αίτηση στο <@&909696684039229492> πατήστε στο 🚀**')

        const staff = new MessageButton()
            .setID('staff')
            .setStyle('blurple')
            .setEmoji('🔰')

        const eagle = new MessageButton()
            .setStyle('url')
            .setURL(`https://docs.google.com/forms/d/111xybSrhsBWiMpQdfk2W1lAsXN_LmFiGbBzEpx85cBM/edit`)
            .setEmoji('🚀')

        const row = new MessageActionRow()
            .addComponents(staff, eagle)

        message.channel.send(embed, row)
    }
    if (command == 'rules') {
        if (!message.member.hasPermission("ADMINISTRATOR")) return;
        const rules = new Discord.MessageEmbed()
            .setColor(config.color)
            .setThumbnail(message.guild.iconURL())
            .setDescription('**Eagle Shop Rules \n\n <:black:910483872532279377> Σεβόμαστε και δεν προσβάλουμε τα αλλά μέλη του server.\n\n <:black:910483872532279377> Απαγορεύονται αυστηρώς τα σχόλια, ρατσιστικού, εκφοβιστικού, βίας και πορνογραφικού υλικού.\n\n<:black:910483872532279377> Απαγορεύεται troll ακραίου τύπου.\n\n<:black:910483872532279377>Μην spamαρετε στο chat!\n\n<:black:910483872532279377>Απαγορεύεται η πρόσκληση σε μέλη του server μας είτε από προσωπικό είτε από αποστολή μηνυμάτων στο στο general (αιτία BAN).\n\n<:black:910483872532279377>Επιπλέον, απαγορεύονται αυστηρώς τα υβριστικά σχόλια προς τα θεία.\n\n<:black:910483872532279377> Δεν βγάζουμε προσβλητική εικόνα προφίλ.\n\n<:black:910483872532279377> Απαγορεύεται το emoji spam και ειδικά emoji που είναι πιθανό να προκαλέσουν επιληψία.\n\n<:black:910483872532279377> Σεβαστείτε το γεγονός πώς συνυπάρχετε με ανήλικα.\n\n<:black:910483872532279377> Μην χρησιμοποιείται τα ειδικά tags των μελών μας ή το everyone αν δεν υπάρχει σοβαρός λόγος!**')

        message.channel.send(rules)
    }
    if (command == 'steal') {
        if (!args.length) return message.reply('Please specify an emoji');

        for (const rawEmoji of args) {
            const parsedEmoji = Discord.Util.parseEmoji(rawEmoji);

            if (parsedEmoji.id) {
                const extension = parsedEmoji.animated ? ".gif" : ".png";
                const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id +
                    extension}`;
                message.guild.emojis
                    .create(url, parsedEmoji.name)
                    .then((emoji) => message.channel.send(`Stole: ${emoji}`))
            }
        }
    }
});

client.login(config.token)