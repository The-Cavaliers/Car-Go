
const MessageBus = function (sign_up) {
	this.groups = {}
	if(!this.groups[sign_up]) {
      this.groups[sign_up] = []
	}
	this.checkMessage = function() {
	}
	this.subscribe = function(sign_up, callback) {
      callback(sign_up)
	};
	this.publish = function(group, input) {
	   var message = {
	   	topic: group,
	   	message: input,
	   }
		if(!this.groups[sign_up]) {
	      this.groups[sign_up] = []
		}
	}
}


var bus = new MessageBus('mean people');
bus.publish('mean people', 'i hate mean people')
console.log(bus)