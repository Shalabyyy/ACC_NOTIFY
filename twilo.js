//const accountSid = process.env.TWILIO_ACCOUNT_SID;
//const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(
  "AC1cab7872c096bcec0f9c0776dfb6feb7",
  "5896613c846971378f6e19bf4d411fea"
);

function round2dp(number) {
  return (Math.round(number * 100) / 100).toFixed(2);
}
function sendMessage(details, title, labourID) {
  var bodybuild = `\n
  ${title} 
  كود: ${details.B}
  الاسم: ${details.C}
   ${labourID.includes(details.B) ? "الإنتاجية" : "اجر شامل"}: ${details.J}
   الاضافـــات 
   
   `;
  if (details.M + details.L + details.K == 0) {
    bodybuild += `لا يوجود
    `;
  }
  if (details.M != 0)
    bodybuild += `ساعات الإضافى: ${details.N} ساعات وتقدر قيمتهم ${round2dp(
      details.M
    )}
    `;
  if (details.L != 0)
    bodybuild += `حافز: ${details.L}
  `;
  if (details.K != 0)
    bodybuild += `بدلات: ${details.K}
`;
  if (details.K != 0)
    bodybuild += `بدلات: ${details.K}
`;
  bodybuild += `
الاستقطاعات
`;
  if (details.P != 0)
    bodybuild += `الغياب: ${details.Q} أيام وتقدر قيمتهم ${round2dp(details.P)}
`;
  if (details.T != 0)
    bodybuild += `التاخير: ${details.S} ساعات وتقدر قيمتهم ${round2dp(
      details.T
    )}
`;
  if (details.V != 0)
    bodybuild += `جزاءات: ${details.U} أيام وتقدر قيمتهم ${round2dp(details.V)}
`;
  if (details.R != 0)
    bodybuild += `جزاء الغياب: ${details.R}
`;
  if (details.W != 0)
    bodybuild += `التأمين الطبى: ${details.W}
`;
  if (details.X != 0)
    bodybuild += `السلف: ${details.X}
`;
  if (details.Y != 0)
    bodybuild += `ضريبة كسب العمل:  ${details.Y}
`;
  if (details.Z != 0)
    bodybuild += `خصم زى: ${details.Z}
`;
  if (details.AA != 0)
    bodybuild += `تأمينات إجتماعية: ${details.AA}
`;
  if (details.AB == 0)
    bodybuild += `لا يوجد
`;
  bodybuild += `
صافى الأجر: ${round2dp(details.AC)}

`;

  client.messages
    .create({
      body: bodybuild,
      from: "+12058966985",
      to: "+201119455455",
    })
    .then((message) => console.log(message))
    .catch((err) => console.log(err.code));
}
function testMessage(phone) {
  console.log("Test Message");
  var result;
  client.messages
    .create({
      body: "هذه رسالة اختبار",
      from: "+12058966985",
      to: phone,
    })
    .then((message) => {
      console.log(message);
      result = message;
    })
    .catch((err) => {
      console.log(err.code);
      result = err;
    });
    console.log("Twilo Result",result)
  return result;
}
//21608 -> The number  is unverified
//20003 -> Autehtication Token Error
function test() {
  console.log("Test");
}
module.exports.sendMessage = sendMessage;
module.exports.test = test;
module.exports.testMessage = testMessage;
