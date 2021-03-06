
COMPONENT('typing', function() {
	var self = this;
	var cache = {};
	var empty = true;
	var count = 0;
	var max;

	self.readonly();

	self.make = function() {

		max = (self.attr('data-max') || '4').parseInt();

		self.classes('ui-typing hidden-xs');
		var scr = self.find('script');
		self.template = Tangular.compile(scr.html());
		scr.remove();
		setInterval(function() {
			if (empty)
				return;
			var dt = new Date();
			Object.keys(cache).forEach(function(id) {
				if (cache[id] > dt)
					return;
				delete cache[id];
				count--;
				self.find('div[data-id="{0}"]'.format(id)).remove();
			});
		}, 5000);
	};

	self.clear = function() {
		count = 0;
		cache = {};
		self.empty();
	};

	self.insert = function(user) {
		if (count > max)
			return;
		var is = cache[user.id] ? true : false;
		cache[user.id] = new Date().add('5 seconds');
		empty = false;
		count++;
		!is && self.append(self.template(user));
	};
});