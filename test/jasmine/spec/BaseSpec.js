
describe('Base', function() {

	it('identity call returns "against member"', function() {
		expect(identity().against).toBeDefined();
	});
	
	it('returns true when given "null" args', function() {
		expect(identity(null).against(null)).toBe(true);
	});

	it('returns true when given equal Boolean args', function() {
		expect(identity(true).against(true)).toBe(true);
		expect(identity(false).against(false)).toBe(true);
	});

	it('returns true when given empty String args', function() {
		expect(identity('').against('')).toBe(true);
	});

	it('returns true when given equal String args', function() {
		expect(identity('identity').against('identity')).toBe(true);
	});

	it('returns false when given undefined against arg', function() {
		expect(identity('string').against()).toBe(false);
		expect(identity(null).against()).toBe(false);
		expect(identity(true).against()).toBe(false);
	});

	it('returns false when given "null" and "undefined"', function() {
		expect(identity(null).against(undefined)).toBe(false);
	});

	it('returns false when given unequal Boolean args', function() {
		expect(identity(true).against(false)).toBe(false);
	});

	it('returns false when given unequal String args', function() {
		expect(identity('identity').against('spoof')).toBe(false);
	});
})