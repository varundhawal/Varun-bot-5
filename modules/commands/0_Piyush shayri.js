module.exports.config = {
    name: "shayri",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "PIYUSH CHAUHAN",
    description: "THIS BOT WAS MADE BY MR PIYUSH CHAUHAN",
    commandCategory: "SHAYRI PROFILE",
    cooldowns: 0
};

module.exports.run = async function({ event, api, args, client, Currencies, Users, utils, __GLOBAL, reminder }) {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const axios = global.nodemodule['axios'];
    
    // Shayari ka array
    const shayariList = ["Attitude 😎 दिखाना 😁मेरी 🤗 एक बिमारी है…. और इसे 🤐 ठीक👍करने के 😜 लिए मुझे 🤘 जरुरत तुम्हारी है💯💯",
                         "हम बस 😎Attitude 👍में रहते हैं फिर 😁सामने 👊 कोई भी हो 😜भाव 🤑 कम देते हैं💯💯",
                         "पहचान क्या 🤔होती है 🌍दुनिया को हम 🤘 बतायेंगे…. बिना ❌ नाम आये थे ….🤔पर बिना 😱 नाम किये ❌नहीं जायेंगे",
                         "ज्यादा 😎Smart बनने की 🤨कोशिश मत कर❌ पगले, क्यूंकि मेरे 🤨बाल भी तेरी 🤘औकात से 🤔ज्यादा 🙏लम्बे है 💯💯💯",
                         "गोली 😚 चलाना 🔫हर किसी के ☝️बस में ❌नही Trigger पे 😜पकड़ और 👎सीने में 😎 अकड़ चाहिए💯💯",
                         "अपनी ☝️ बदमाशी का #😇आलम 🤔 कुछ ऐसा है दुश्मन तो 🤔 दुश्मन साला 😇जमाना भी हमसे खफा है💯💯",
                         "हमारे जीने का 😇तरीका थोड़ा 👊 अलग है 😁हम उमीद 👊 पर नहीं 🤑 अपनी जिद 😚 पर जीते है🤩🤩🤩",
                         "कमियाँ 🤔तो बहुत है मुझ ☹️ मे… पर कोई 🤔 निकाल 😎कर तो देखे…😁😁😁",
                         "मेरी हिम्मत 🤘को परखने की 😌गुस्ताखी न करना❌, पहले भी🤔 कई तूफानों का रुख मोड़ चुका हु😎😎😎",
                         "सुन बे 😜मुझे हारने❌ का नहीं जीतने 💪का शौक है., मुझे हराने वाले कई 🤔 यमलोक 👹 पहुँच लिए 😜😜😜",
                         "👍एक बात तो 🤔आज़मा के देख ली..🌍दुनिया प्यार ❤️से नहीं, दादागिरी 💪से चलती है…💯💯💯",
                         "👍Luck तो हर किसी 😇का होता है यार,😁 But हमें पाने👍 के लिए 😁Good Luck चाहिए !💯💯",
                         "अक्सर वही🤔 लोग उठाते है हम पर ☝️उंगलिया.. जिनकी 🤔हमें 😇छूने की 😇औकात नहीं होती 💯💯💯",
                         "मेरी 👍DP 👦 पर तुम 🤔नज़र ❌मत रखो,वरना 🙏 लोग तुम्हें मेरा 🙏Security😎Guard कहेंगे..👍",
                         "😎मेरा 😚style 💚और #✴attitude🔗 #🔥 💙ही #💜कुछ अलग है💋 ✊बराबरी 😈करने जाओगे 👊# #💕तो 👌बरबाद हो ✴जाओगे# 🔫 😎"
    ];

    const randomShayari = shayariList[Math.floor(Math.random() * shayariList.length)];

    // Shayari aur profile picture ke saath message bhejne ka function
    const sendShayariWithProfilePic = (shayari, picture) => {
        api.sendMessage({
            body: shayari,
            attachment: fs.createReadStream(picture)
        }, event.threadID, () => fs.unlinkSync(picture), event.messageID);
    };

    const sendProfilePic = (uid, shayari) => {
        const callback = () => sendShayariWithProfilePic(shayari, __dirname + "/cache/1.png");
        return request(encodeURI(`https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
            .pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
            .on('close', callback);
    };

    const sendWarningMessage = () => {
        api.sendMessage("DON'T CHANGE CREDIT FUCK YOUR MOTHER AND SISTER", event.threadID);
    };

    if (event.type == "message_reply") {
        let name = await Users.getNameUser(event.messageReply.senderID);
        const uid = event.messageReply.senderID;
        sendProfilePic(uid, randomShayari);
    } else {
        let uid;
        if (!args[0]) {
            uid = event.senderID;
        } else if (args[0].indexOf(".com/") !== -1) {
            const res_ID = await api.getUID(args[0]);
            uid = res_ID;
        } else if (args.join().indexOf('@') !== -1) {
            uid = Object.keys(event.mentions)[0];
        }
        sendProfilePic(uid, randomShayari);
    }

    if (event.name == "shayri" && args[0] == "credits") {
        sendWarningMessage();
    }
};
