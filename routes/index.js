var express = require('express');
var router = express.Router();
var events = require('events');
var eventEmitter = new events.EventEmitter();
var counter = 0
var globalid = Date.now().toString() + Math.floor(Math.random() * 10000)

var Gpio = require('onoff').Gpio;
//var led = new Gpio(17, 'out');
var leds = []
var pins = [ 17, 27, 22, 10, 9 ]

for (var i = 0; i < pins.length; i++) {
	var eachPin = {}
	eachPin.name = pins[i]
	eachPin.control = new Gpio(pins[i], 'out')
	leds.push(eachPin)
}

debugger

var on = function turnOn(led, onTime, offTime, id) {
	if (globalid != id ) {
		console.log("id is not equal. i am returning");
		return
	}
	console.log("turning on led " + led.name)
	if ( counter <= 40 ) {
		counter++
		led.control.writeSync(1);
		setTimeout(function() {
			eventEmitter.emit("turnOff", led, onTime, offTime, id)	
		}, onTime,led, onTime, offTime, id)
	}
	else {
		console.log("blinking stopped from on")
	}
}

var off = function turnOff(led, onTime, offTime, id) {
	if (globalid != id ) {
		console.log("id is not equal. i am returning");
		return
	}
	console.log("turning off led " + led.name)
	led.control.writeSync(0);
	if ( counter <= 40 ) {
		counter++
		setTimeout(function() {
			eventEmitter.emit("turnOn",  led, onTime, offTime, id)	
		}, offTime, led, onTime, offTime, id)
	}
	else {
		console.log("blinking stopped from off")
	}	
}

var delay = function delay(delay, led, onTime, offTime, id) {
	console.log("starting delay for led " + led.name + " is " + delay);
	setTimeout(function() {
		eventEmitter.emit("turnOn",  led, onTime, offTime, id)	
	}, delay)	
}


var simple = function simple(id) {
	console.log("setting simple strategy")
	var delays = {
		"17" : {
			startDelay: 0,
			onTime: 500,
			offTime: 2000
		},
		"27" : {
			startDelay: 500,
			onTime: 500,
			offTime: 2000
		},
		"22" : {
			startDelay: 1000,
			onTime: 500,
			offTime: 2000
		},
		"10" : {
			startDelay: 1500,
			onTime: 500,
			offTime: 2000
		},
		"9" : {
			startDelay: 2000,
			onTime: 500,
			offTime: 2000
		}							
	}
	var led = {}
	for (var i = 0; i < leds.length; i++) {
		led = leds[i]
		eventEmitter.emit("delay", delays[led.name].startDelay, led, delays[led.name].onTime, delays[led.name].offTime,id)
	}
	//setTimeout( function() { eventEmitter.emit("pullout") }, 5000)	
}

var tooth = function tooth(id) {
	console.log("setting tooth strategy")
	var delays = {
		"17" : {
			startDelay: 1000,
			onTime: 500,
			offTime: 1000
		},
		"27" : {
			startDelay: 500,
			onTime: 500,
			offTime: 1000
		},
		"22" : {
			startDelay: 0,
			onTime: 500,
			offTime: 1000
		},
		"10" : {
			startDelay: 500,
			onTime: 500,
			offTime: 1000
		},
		"9" : {
			startDelay: 1000,
			onTime: 500,
			offTime: 1000
		}							
	}
	var led = {}
	for (var i = 0; i < leds.length; i++) {
		led = leds[i]
		eventEmitter.emit("delay", delays[led.name].startDelay, led, delays[led.name].onTime, delays[led.name].offTime,id)
	}	
}

var zigzag = function zigzag(id) {
	console.log("setting zigzag strategy")
	var delays = {
		"17" : {
			startDelay: 0,
			onTime: 500,
			offTime: 500
		},
		"27" : {
			startDelay: 500,
			onTime: 500,
			offTime: 500
		},
		"22" : {
			startDelay: 0,
			onTime: 500,
			offTime: 500
		},
		"10" : {
			startDelay: 500,
			onTime: 500,
			offTime: 500
		},
		"9" : {
			startDelay: 0,
			onTime: 500,
			offTime: 500
		}							
	}
	var led = {}
	for (var i = 0; i < leds.length; i++) {
		led = leds[i]
		eventEmitter.emit("delay", delays[led.name].startDelay, led, delays[led.name].onTime, delays[led.name].offTime,id)
	}	
}

var something = function something(id) {
	console.log("setting something strategy")
	var delays = {
		"17" : {
			startDelay: 800,
			onTime: 100,
			offTime: 800
		},
		"27" : {
			startDelay: 700,
			onTime: 200,
			offTime: 700
		},
		"22" : {
			startDelay: 500,
			onTime: 100,
			offTime: 800
		},
		"10" : {
			startDelay: 100,
			onTime: 400,
			offTime: 500
		},
		"9" : {
			startDelay: 0,
			onTime: 100,
			offTime: 800
		}							
	}
	var led = {}
	for (var i = 0; i < leds.length; i++) {
		led = leds[i]
		eventEmitter.emit("delay", delays[led.name].startDelay, led, delays[led.name].onTime, delays[led.name].offTime,id)
	}	
}

var random = function random(id) {
	console.log("setting random strategy")
	var delays = {
		"17" : {
			startDelay: 100,
			onTime: 50,
			offTime: 150
		},
		"27" : {
			startDelay: 50,
			onTime: 100,
			offTime: 100
		},
		"22" : {
			startDelay: 0,
			onTime: 150,
			offTime: 50
		},
		"10" : {
			startDelay: 50,
			onTime: 100,
			offTime: 100
		},
		"9" : {
			startDelay: 100,
			onTime: 50,
			offTime: 150
		}							
	}
	var led = {}
	for (var i = 0; i < leds.length; i++) {
		led = leds[i]
		eventEmitter.emit("delay", delays[led.name].startDelay, led, delays[led.name].onTime, delays[led.name].offTime,id)
	}	
}
eventEmitter.on("turnOn", on);
eventEmitter.on("turnOff", off);
eventEmitter.on("delay", delay);
eventEmitter.on("simple", simple);
eventEmitter.on("tooth", tooth);
eventEmitter.on("zigzag", zigzag);
eventEmitter.on("something", something);
eventEmitter.on("random", random);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Raspberry LED control' });
});

router.post('/strategy', 
  function(req, res, next) {
    if (req.body && req.body.strategy && toString.call(req.body.strategy) == '[object String]') {
      next();
    }
    else {
      	res.status(400).send({ status: "error", reason: "Empty String or passed value is not a string" });
    }
  },
  function(req, res) {
  	counter = 0
  	globalid = Date.now().toString() + Math.floor(Math.random() * 10000);
  	var status = eventEmitter.emit(req.body.strategy, globalid)
    	console.log("Event emitted " + status)
    	if (status) {
		res.send({ status: "strategy applied" });
	}
	else {
		res.send({ strategy: "strategy failed" });
	}
  }
);

module.exports = router;
