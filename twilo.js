//const accountSid = process.env.TWILIO_ACCOUNT_SID;
//const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(
  "AC1cab7872c096bcec0f9c0776dfb6feb7",
  "06e40fc04a1fbdfbac160f28fe960f05"
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
  الأجر الأساسى: ${details.F}

  الاضافـــات 

  ساعات الإضافى: ${details.I}
  قيمة الإضافى: ${details.J}
  بدلات و حافز: ${details.H + details.G}
   
  الاستقطاعات
  
  الغياب: ${details.L} أيام وتقدر قيمتهم ${round2dp(details.M)}
  التاخير: ${details.O} ساعات وتقدر قيمتهم ${round2dp(details.P)}
  جزاءات: ${details.Q} أيام وتقدر قيمتهم ${round2dp(details.R)}
  السلف: ${details.T}
  ضريبة كسب العمل:  ${details.U}
  تأمينات إجتماعية: ${details.W}
  
  صافى الأجر: ${round2dp(details.Y)}

    `;
  client.messages
    .create({
      body: body,
      from: "+12058966985",
      to: "+201119455455",
    })
      .then((message) => console.log(message))
      .catch(err=>console.log(err));
}

function test() {
  console.log("Test");
}
module.exports.sendMessage = sendMessage;
module.exports.test = test;
