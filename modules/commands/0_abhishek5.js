const fs = require("fs");
module.exports.config = {
	name: "abhishek5",
    version: "1.1.1",
	hasPermssion: 0,
	credits: "ABHISHEK", 
	description: "Just Respond",
	commandCategory: "no prefix",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	let react = event.body.toLowerCase();
	if(react.includes("🧐") ||
     react.includes("🙄") || react.includes("🤪") || react.includes("😳") ||
react.includes("🙀") ||
react.includes("😱")) {
		var msg = {
				body: `【  𝐀𝐈𝐒𝐄 𝐌𝐀𝐓 𝐃𝐄𝐊𝐇0 𝐘𝐀𝐑 𝐍𝐀𝐇𝐈 𝐊𝐈𝐒𝐒  𝐊𝐀𝐑 𝐋𝐔𝐍𝐆𝐀______😁😁😝】`,
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😅", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }