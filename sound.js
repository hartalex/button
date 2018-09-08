var player = require('play-sound')(opts={})
player.play('moo.mp3', {omxplayer: ['-o', 'alsa']}, function(err){
  console.log("Callback");
  if (err) throw err
})
