
describe('Function', function() {
	
	it('returns true when given equal void anomoyous Function args', function() {
		expect(identity(function() { }, function() { })).toBe(true);
	});

	it('returns true when given equal anomoyous Function args with body', function() {
		expect(identity(
			function(a, b) { return a + b; },
			function(a, b) { return a + b; }
		)).toBe(true);
	});

	it('returns true when given equal named Function args', function() {
		var body1 = function(a, b) { return a + b; },
		body2 = function(a, b) { return a + b; };

		expect(identity(body1, body2)).toBe(true);
	});

	it('returns false when given unequal anomoyous Function args', function() {
		expect(identity(
			function() { console.log('pass'); },
			function() { console.log('fail'); }
		)).toBe(false);
	});

	it('returns false when given unequal named Function args', function() {
		var body1 = function(a, b) { return a + b; },
		body2 = function(a, b) { return b + a; };

		expect(identity(body1, body2)).toBe(false);
	});

	it('returns false when comparing non-Function against Function', function() {

		var testFn = function() { };

		expect(identity(null, testFn)).toBe(false);
		expect(identity(undefined, testFn)).toBe(false);
		expect(identity(10, testFn)).toBe(false);
		expect(identity('test', testFn)).toBe(false);
		expect(identity([1,2,3], testFn)).toBe(false);
		expect(identity({}, testFn)).toBe(false);
		expect(identity(new RegExp('.?'), testFn)).toBe(false);
	});

});