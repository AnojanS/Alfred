const lib = require('lib')({ token: process.env.STDLIB_TOKEN });
const axios = require('axios');
const send = require('../helpers/send.js');

/**
 * Generic MessageBird SMS handler
 * @param {string} sender The phone number that sent the text to be handled
 * @param {string} receiver The StdLib phone number that received the SMS
 * @param {string} message The contents of the SMS
 * @param {string} createdDatetime Datetime when the SMS was sent
 * @returns {any}
 */
module.exports = async (
  sender = '',
  receiver = '',
  message = '_',
  createdDatetime = '',
  context
) => {
  const { result } = await axios
    .get('http://api.wolframalpha.com/v1/conversation.jsp', {
      params: {
        appid: 'WPA4G9-76H3PX55HH',
        i: message
      }
    })
    .then(response => response.data);

  try {
    return send(receiver, sender, result);
  } catch (e) {
    // Catch thrown errors specifically so we can log them. See logs using
    // $ lib logs <username>.<service name> from the command line
    console.error(e);
    return;
  }
};
