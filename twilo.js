//const accountSid = process.env.TWILIO_ACCOUNT_SID;
//const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(
  "AC1cab7872c096bcec0f9c0776dfb6feb7",
  "7f512327371cd2a6be34c7e36ec2b7d8"
);

function round2dp(number) {
  return (Math.round(number * 100) / 100).toFixed(2);
}
function sendMessage(details, title) {
    var body = `
  \n
  ${title} 
  كود: ${details.B}
  الاسم: ${details.C}
  الأجر شامل : ${details.J}

  الاضافـــات 

  ساعات الإضافى: ${details.N} ساعات وتقدر قيمتهم ${round2dp(details.M)}
  بدلات و حافز: ${details.L + details.K}
   
  الاستقطاعات
  
  الغياب: ${details.Q} أيام وتقدر قيمتهم ${round2dp(details.P)}
  التاخير: ${details.S} ساعات وتقدر قيمتهم ${round2dp(details.T)}
  جزاءات: ${details.U} أيام وتقدر قيمتهم ${round2dp(details.V)}
  جزاء الغياب: ${details.R}
  السلف: ${details.X}
  ضريبة كسب العمل:  ${details.Y}
  تأمينات إجتماعية: ${details.AA}
  
  صافى الأجر: ${round2dp(details.AC)}

    `;
  client.messages
    .create({
      body: body,
      from: "+12058966985",
      to: "+201114929299",
    })
      .then((message) => console.log(message))
      .catch(err=>console.log(err.code));
}

//21608 -> The number  is unverified
//20003 -> Autehtication Token Error
function test() {
  console.log("Test");
}
module.exports.sendMessage = sendMessage;
module.exports.test = test;
