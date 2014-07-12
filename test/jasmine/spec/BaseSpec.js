
describe('Base', function() {
	
	it('returns false when given undefined', function() {
		expect(identity()).toBe(false)
		expect(identity(undefined, undefined)).toBe(false);
	});
		
	it('returns true when given "null" types', function() {
		expect(identity(null, null)).toBe(true);
	});

	it('returns false when given "null" and "undefined"', function() {
		expect(identity(null, undefined)).toBe(false);
	});

	it('returns true when given equal boolean types', function() {
		expect(identity(true, true)).toBe(true);
		expect(identity(false, false)).toBe(true);
	});

	it('returns false when given unequal boolean types', function() {
		expect(identity(true, false)).toBe(false);
	});

	it('returns true when given empty string types', function() {
		expect(identity('', '')).toBe(true);
	});

	it('returns true when given equal string types', function() {
		expect(identity('identity', 'identity')).toBe(true);
	});

	it('returns false when given unequal string types', function() {
		expect(identity('identity', 'spoof')).toBe(false);
	});
})