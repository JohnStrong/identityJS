describe('RegExp', function() {
	
	it('returns true when given empty RegExp instance args', function() {
		expect(identity(new RegExp(), new RegExp())).toBe(true);
	});

	it('returns true when given RegExp literal args', function() {
		expect(identity(/(?:)/, /(?:)/)).toBe(true);
	});	

	it('returns true when given non-empty RegExp instance args', function() {
		expect(identity(new RegExp('.?'), new RegExp('.?'))).toBe(true);
	});

	it('returns false when given unequal non-empty RegExp instance args', function() {
		expect(identity(new RegExp('.?'), new RegExp('.+?'))).toBe(false);
	});

	it('returns false when given unequal RegExp literal args', function() {
		expect(identity(/\bpass/, /\bfail/)).toBe(false);
	});

	it('returns false when comparing non-RegExp against RegExp', function() {

		var testRegExp = new RegExp('.+?');

		expect(identity(null, testRegExp)).toBe(false);
		expect(identity(undefined, testRegExp)).toBe(false);
		expect(identity(10, testRegExp)).toBe(false);
		expect(identity('test', testRegExp)).toBe(false);
		expect(identity(function() {}, testRegExp)).toBe(false);
		expect(identity([1,2,3], testRegExp)).toBe(false);
		expect(identity({}, testRegExp)).toBe(false);
	});

});