
describe('Base', function() {
	
	it('returns true when given undefined args', function() {
		expect(identity(undefined, undefined)).toBe(true);
	});
		
	it('returns true when given "null" args', function() {
		expect(identity(null, null)).toBe(true);
	});

	it('returns true when given equal Boolean args', function() {
		expect(identity(true, true)).toBe(true);
		expect(identity(false, false)).toBe(true);
	});

	it('returns true when given empty String args', function() {
		expect(identity('', '')).toBe(true);
	});

	it('returns true when given equal String args', function() {
		expect(identity('identity', 'identity')).toBe(true);
	});

	it('returns false when given no args', function() {
		expect(identity()).toBe(false)
	});

	it('returns false when given "null" and "undefined"', function() {
		expect(identity(null, undefined)).toBe(false);
	});

	it('returns false when given unequal Boolean args', function() {
		expect(identity(true, false)).toBe(false);
	});

	it('returns false when given unequal String args', function() {
		expect(identity('identity', 'spoof')).toBe(false);
	});
})