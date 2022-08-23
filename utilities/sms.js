const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TKN;
const from = process.env.TWILIO_NUM;
const client = require('twilio')(accountSid, authToken);

function sms(body, to) {
    client.messages.create({
        body,
        from,
        to,
    }).then(message => {
        console.log('Sent', message);
    }).catch(error => {
        console.error(error)
    });
}

module.exports = sms;