var wpi = require('node-wiring-pi')
var request = require('request')

let pin = 10
let count = 0
let pinval = 1
let lastpinval = 0

console.log('Setting up wiringpi')
wpi.wiringPiSetupGpio()
wpi.pinMode(pin, wpi.INPUT)

var sendSlack = (txt) => {
  let body = { text: txt }
  request(
    {
      url: 'https://hooks.slack.com/services/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',
      method: 'POST',
      json: true,
      body: body
    },
    function (error, response, body) {
      if (!error && typeof response !== 'undefined' && response.statusCode && response.statusCode === 200) {
        // Sending to Slack was successful
        console.log('Sent Success')
      } else {
        console.log(error)
      }
    }
  )
}

setInterval(() => {
  wpi.pullUpDnControl(pin, wpi.PUD_UP)
  pinval = wpi.digitalRead(pin)
  if (pinval === 0 && lastpinval !== pinval) {
    count++
    sendSlack(`button is down:${count}`)
  }
  lastpinval = pinval
}, 100)
