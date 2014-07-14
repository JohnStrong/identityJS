
describe('Array', function() {

	it('returns true when given equal empty Array args', function() {
		expect(identity([]).against([])).toBe(true);
	});

	it('returns true when given equal n length empty nested Array args', function() {
		expect(identity([[],[],[]]).against([[],[],[]])).toBe(true);
	});

	it('returns true when given equal non-empty non-nested Array args', function() {

		var nonNested1 = [undefined, null, 1, 'test', function() { }, true],
		nonNested2 = [undefined, null, 1, 'test', function() { }, true];

		expect(identity(nonNested1).against(nonNested2)).toBe(true);
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

		expect(identity(nested1).against(nested2)).toBe(true);
	});

	it('returns false when given unequal n length empty nested Array args', function() {
		expect(identity([[],[]]).against([[],[],[]])).toBe(false);
	});

	it('returns false when given unequal non-nested Array args', function() {

		var nonNested1 = [undefined, null, 1, 'pass', function() { }, true],
		nonNested2 = [null, undefined, 2, 'fail', function(a) { return a; }, false];

		expect(identity(nonNested1).against(nonNested2)).toBe(false);
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

		expect(identity(nested1).against( nested2)).toBe(false);
	});

	it('returns false when comparing non-Array against Array', function() {

		var testArray = [];

		expect(identity(null).against( testArray)).toBe(false);

		expect(identity(undefined).against( testArray)).toBe(false);

		expect(identity(10).against( testArray)).toBe(false);

		expect(identity('test').against(testArray)).toBe(false);

		expect(identity(function() { }).against(testArray)).toBe(false);

		expect(identity({}).against(testArray)).toBe(false);

		expect(identity(new RegExp('.?')).against(testArray)).toBe(false);
		
	});
});