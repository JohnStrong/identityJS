describe('RegExp', function() {
	
	it('returns true when given empty RegExp instance args', function() {
		expect(identity(new RegExp()).against(new RegExp())).toBe(true);
	});

	it('returns true when given RegExp literal args', function() {
		expect(identity(/(?:)/).against(/(?:)/)).toBe(true);
	});	

	it('returns true when given non-empty RegExp instance args', function() {
		expect(identity(new RegExp('.?')).against(new RegExp('.?'))).toBe(true);
	});

	it('returns false when given unequal non-empty RegExp instance args', function() {
		expect(identity(new RegExp('.?')).against(new RegExp('.+?'))).toBe(false);
	});

	it('returns false when given unequal RegExp literal args', function() {
		expect(identity(/\bpass/).against(/\bfail/)).toBe(false);
	});

	it('returns false when comparing non-RegExp against RegExp', function() {

		var testRegExp = new RegExp('.+?');

		expect(identity(null).against(testRegExp)).toBe(false);

		expect(identity(undefined).against(testRegExp)).toBe(false);

		expect(identity(10).against(testRegExp)).toBe(false);

		expect(identity('test').against(testRegExp)).toBe(false);

		expect(identity(function() {}).against(testRegExp)).toBe(false);

		expect(identity([1,2,3]).against(testRegExp)).toBe(false);

		expect(identity({}).against(testRegExp)).toBe(false);
	});

});