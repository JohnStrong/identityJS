
describe('Number', function() {

	it('returns true when given equal Number types', function() {
		expect(identity(0, 0)).toBe(true);
		expect(identity(10, 10)).toBe(true);
		expect(identity(Infinity, Infinity)).toBe(true);
		expect(identity(-Infinity, -Infinity)).toBe(true);
	});

	it('returns true when given 2 NaN values', function() {
		expect(identity(NaN, NaN)).toBe(true);
	});

	it('returns false when given unequal Number types', function() {
		expect(identity(1, 10)).toBe(false);
	});

	it('returns false when given NaN and a real number', function() {
		expect(identity(NaN, 1)).toBe(false);
	});

	it('returns false when given Infinity and -Infinity', function() {
		expect(identity(Infinity, -Infinity)).toBe(false);
	});

	it('returns false when given Infinitys and a real number', function() {
		expect(identity(Infinity, 1)).toBe(false);
		expect(identity(-Infinity, 1)).toBe(false);
	});

	it('returns false when given Infinitys and NaN', function() {
		expect(identity(Infinity, NaN)).toBe(false);
		expect(identity(-Infinity, NaN)).toBe(false);
	});

	it('returns false when given a negative and a postive real number', function() {
		expect(identity(10, -20)).toBe(false);
	})
});