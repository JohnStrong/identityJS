
describe('Function', function() {
	
	it('returns true when given equal void anomoyous Function args', function() {
		expect(identity(function() { }).against(function() { })).toBe(true);
	});

	it('returns true when given equal anomoyous Function args with body', function() {
		expect(identity(
			function(a, b) { return a + b; }
		).against(
			function(a, b) { return a + b; }
		)).toBe(true);
	});

	it('returns true when given equal named Function args', function() {
		var body1 = function(a, b) { return a + b; },
		body2 = function(a, b) { return a + b; };

		expect(identity(body1).against(body2)).toBe(true);
	});

	it('returns false when given unequal anomoyous Function args', function() {
		expect(identity(
			function() { console.log('pass'); }
		).against(
			function() { console.log('fail'); }
		)).toBe(false);
	});

	it('returns false when given unequal named Function args', function() {
		var body1 = function(a, b) { return a + b; },
		body2 = function(a, b) { return b + a; };

		expect(identity(body1).against(body2)).toBe(false);
	});

	it('returns false when comparing non-Function against Function', function() {

		var testFn = function() { };

		expect(identity(null).against(testFn)).toBe(false);

		expect(identity(undefined).against(testFn)).toBe(false);

		expect(identity(10).against(testFn)).toBe(false);

		expect(identity('test').against(testFn)).toBe(false);

		expect(identity([1,2,3]).against(testFn)).toBe(false);

		expect(identity({}).against(testFn)).toBe(false);

		expect(identity(new RegExp('.?')).against(testFn)).toBe(false);
	});

});