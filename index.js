var wpi = require('node-wiring-pi')
var request = require('request')

let pin = 10
let pinval = 1
let lastpinval = 0
let ledpin =4 

console.log('Setting up wiringpi')
wpi.wiringPiSetupGpio()
wpi.pinMode(pin, wpi.INPUT)
wpi.pinMode(ledpin, wpi.OUTPUT)

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

var sendPress = () => {
  request(
    {
      url: 'http://api.hub.hartcode.com/button',
      method: 'POST'
    },
    function (error, response) {
      if (!error && typeof response !== 'undefined' && response.statusCode && response.statusCode === 200) {
        // Sending to Slack was successful
        console.log('Press Success')
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
    wpi.digitalWrite(ledpin,1);
  } 
  if (pinval === 1 && lastpinval !== pinval) {
    wpi.digitalWrite(ledpin,0);
  }
  if (pinval === 0 && lastpinval !== pinval) {
    sendPress()
  }
  lastpinval = pinval
}, 100)
