
describe('Object', function() {

	it('returns true when given equal empty object literal args', function() {
		expect(identity({}, {})).toBe(true);
	});

	it('returns true when given equal empty constructor args', function() {
		function Test() { };

		expect(identity(new Test(), new Test())).toBe(true);
	});

	it('returns true when given equal populated object literal args', function() {

		var literal1 = { 
			'a': 1, 
			'b': true,
			'c': null,
			'd': 'test',
			'e': function() { },
			'f': [1, 's', false, undefined]
		},

		literal2 = { 
			'a': 1, 
			'b': true,
			'c': null,
			'd': 'test',
			'e': function() { },
			'f': [1, 's', false, undefined]
		};

		expect(identity(literal1, literal2)).toBe(true);
	});

	it('returns true when given equal stateful constructor args', function() {
		
		function Test(a, b) { this.a = a; this.b = b;};

		expect(identity(new Test(1, 2), new Test(1, 2))).toBe(true);
	});

	it('returns true when given equal nested object literal args', function() {

		var nested1 = {
			'a': {
				'b': false,
				'c': {
					'd': 10,
					'e': function() { }
				}
			}
		},

		nested2 = {
			'a': {
				'b': false,
				'c': {
					'd': 10,
					'e': function() { }
				}
			}
		};

		expect(identity(nested1, nested2)).toBe(true);
	});

	it('returns false when given unequal object literal args', function() {
		var literal1 = { 
			'a': 1, 
			'b': true, 
			'c': 'literal',
			'e': function() { },
			'f': [1, 2, 3]
		},

		literal2 = { 
			'a': 10, 
			'b': false, 
			'c': 'spoof',
			'e': function(a) { return a; },
			'f': [3, 2, 1]
		};

		expect(identity(literal1, literal2)).toBe(false);
	});

	it('returns false when given unequal stateful constructor args', function() {
		function Test(a, b) { this.a = a; this.b = b; };

		expect(identity(new Test(1, 2), new Test(2, 3))).toBe(false);
	});

	it('returns false when members have different names & same functonality', function() {

		var members1 = {
			'a': 1,
			'b': null,
			'c': 'test',
			'd': function() { },
			'e': [],
			'f': { }
		},

		members2 = {
			'h': 1,
			'i': null,
			'j': 'test',
			'k': function() { },
			'e': [],
			'f': { }
		};

		expect(identity(members1, members2)).toBe(false);
	});

	it('returns false when comparing non-Object against Object', function() {

		var testObject = {};

		expect(identity(null, testObject)).toBe(false);
		expect(identity(undefined, testObject)).toBe(false);
		expect(identity(10, testObject)).toBe(false);
		expect(identity('test', testObject)).toBe(false);
		expect(identity(function() { }, testObject)).toBe(false);
		expect(identity([], testObject)).toBe(false);
		expect(identity(new RegExp('.?'), testObject)).toBe(false);
	});


});