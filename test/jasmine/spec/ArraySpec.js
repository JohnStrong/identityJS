
describe('Array', function() {

	it('returns true when given equal empty Array args', function() {
		expect(identity([], [])).toBe(true);
	});

	it('returns true when given equal n length empty nested Array args', function() {
		expect(identity(
			[[],[],[]], 
			[[],[],[]]
		)).toBe(true);
	});

	it('returns true when given equal non-empty non-nested Array args', function() {
		expect(identity(
			[undefined, null, 1, 'test', function() { }, true],
			[undefined, null, 1, 'test', function() { }, true]
		)).toBe(true);
	});

	it('returns true when given equal non-empty nested Array args', function() {
		var nested1 = [
			[null, undefined],
			[1, 2, 3],
			['test1', 'test2', 'test3'],
			[function() { }, function() { }],
			[true, false]
		],

		nested2 = [
			[null, undefined],
			[1, 2, 3],
			['test1', 'test2', 'test3'],
			[function() { }, function() { }],
			[true, false]
		];

		expect(identity(nested1, nested2)).toBe(true);
	});

	it('returns false when given unequal n length empty nested Array args', function() {
		expect(identity(
			[[],[]], 
			[[],[],[]]
		)).toBe(false);
	});

	it('returns false when given unequal non-nested Array args', function() {
		expect(identity(
			[undefined, null, 1, 'pass', function() { }, true],
			[null, undefined, 2, 'fail', function(a) { return a; }, false]
		)).toBe(false);
	});

	it('returns false when given unequal nested Array args', function() {

		var nested1 = [
			[null, undefined],
			[1, 2, 3],
			['pass1', 'pass2', 'pass3'],
			[function() { }, function() { }],
			[true, false]
		],

		nested2 = [
			[undefined, null],
			[3, 2, 1],
			['fail1', 'fail2', 'fail3'],
			[function(a) { }, function(b) { }],
			[false, true]
		];

		expect(identity(nested1, nested2)).toBe(false);
	});

	it('returns false when comparing non-Array against Array', function() {

		var testArray = [];

		expect(identity(null, testArray)).toBe(false);
		expect(identity(undefined, testArray)).toBe(false);
		expect(identity(10, testArray)).toBe(false);
		expect(identity('test', testArray)).toBe(false);
		expect(identity(function() { }, testArray)).toBe(false);
		expect(identity({}, testArray)).toBe(false);
		expect(identity(new RegExp('.?'), testArray)).toBe(false);
	});
});