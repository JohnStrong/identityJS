
describe('Number', function() {

	it('returns true when given equal Number types', function() {
		expect(identity(0).against(0)).toBe(true);
		expect(identity(10).against(10)).toBe(true);
		expect(identity(Infinity).against(Infinity)).toBe(true);
		expect(identity(-Infinity).against(-Infinity)).toBe(true);
	});

	it('returns true when given 2 NaN values', function() {
		expect(identity(NaN).against(NaN)).toBe(true);
	});

	it('returns false when given unequal Number types', function() {
		expect(identity(1).against(10)).toBe(false);
	});

	it('returns false when given NaN and a real number', function() {
		expect(identity(NaN).against(1)).toBe(false);
	});

	it('returns false when given Infinity and -Infinity', function() {
		expect(identity(Infinity).against(-Infinity)).toBe(false);
	});

	it('returns false when given Infinitys and a real number', function() {
		expect(identity(Infinity).against(1)).toBe(false);
		expect(identity(-Infinity).against(1)).toBe(false);
	});

	it('returns false when given Infinitys and NaN', function() {
		expect(identity(Infinity).against(NaN)).toBe(false);
		expect(identity(-Infinity).against(NaN)).toBe(false);
	});

	it('returns false when given a negative and a postive real number', function() {
		expect(identity(10).against(-20)).toBe(false);
	});

	it('returns false when comparing non-Number against Number', function() {

		var testNumber = 0;

		expect(identity(null).against(testNumber)).toBe(false);
		expect(identity(undefined).against(testNumber)).toBe(false);
		expect(identity('test').against(testNumber)).toBe(false);
		expect(identity(function() { }).against(testNumber)).toBe(false);
		expect(identity([]).against(testNumber)).toBe(false);
		expect(identity({}).against(testNumber)).toBe(false);
		expect(identity(new RegExp('.?')).against(testNumber)).toBe(false);
	});
});