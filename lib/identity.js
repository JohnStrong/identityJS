// IdentityJS -> strict equality & identity checking of javascript types
;(function(module) {

	'use strict';

	var 

	//+ _type :: any -> string
	_type = function(entity) {
		return Object.prototype.toString.call(entity).slice(8, -1);
	},

	//+ _is :: (any, string) -> boolean
	_is = function(entity, type) {
		return _type(entity) === type;
	},

	//+ _NaN :: any -> boolean
	_NaN = function(entity) {
		return entity !== entity;
	},

	//+ _asString :: any -> string
	_asString = function(entity) {
		return entity.toString();
	},

	//+ _keysLength :: object -> number
	_keysLength = function(object) {
		return Object.keys(object).length;
	},

	// identity/equality checks of 'suspect' against 'witness'
	_check = {

		// booleans & no values (null, undefined)
		'Base': function(suspect, witness) {
			return suspect === witness;
		},

		// number types (1..N, NaN, Infinity, -Infinity)
		'Number': function(suspect, witness) {

			if(!_is(suspect, 'Number')) {
				return false;
			}

			if(_NaN(witness)) {
				return _NaN(suspect);
			}

			return suspect === witness;
		},

		// string types ('', "")
		'String': function(suspect, witness) {

			var isString = _is(suspect, 'String'),
			areEqual = suspect === witness;

			return isString && areEqual;
		},

		'Function': function(suspect, witness) {
			
			if(!_is(suspect, 'Function')) {
				return false;
			}

			// convert to strings and do strict check for now
			return _asString(suspect) === _asString(witness);
		},

		'Array': function(suspect, witness) {
			
			var status;

			// is suspect of type array
			if(!_is(suspect, 'Array')) {
				return false;
			}

			// store length values
			var susLen = suspect.length, 
			witLen = witness.length;

			// are lengths equal
			if(susLen !== witLen) {
				return false;
			}

			// are arrays both empty
			if(!susLen && !witLen) {
				return true;
			}

			for(var ith = 0; ith < witLen; ith++) {
				
				var type = _check[_type(witness[ith])] || _check.Base;

				status = type(suspect[ith], witness[ith]);

				if(!status) break;
			}

			return status;
		},

		'Object': function(suspect, witness) {
			
			var status;

			if(!_is(suspect, 'Object')) {
				return false;
			}

			var susLen = _keysLength(suspect),
			witLen = _keysLength(witness);

			// are keys array both of equal length
			if(susLen !== witLen) {
				return false;
			}

			// are both objects empty
			if(!susLen && !witLen) {
				return true;
			}

			for(var ith in witness) {
				
				if(witness.hasOwnProperty(ith)) {

					// does suspect have ith member
					if(suspect.hasOwnProperty(ith)) {

						var type = _check[_type(witness[ith])] || _check.Base;

						status = type(suspect[ith], witness[ith]);

					} else {
						
						status = false;
					}

					if(!status) break;
				}
			}


			return status;
		}
	},

	/**
	 * takes a suspect and witness value
	 * compare suspect against witness 
	 * if suspect state = witness state returns true
	 * else returns false
	 **/
	_identity = function(suspect, witness) {

		if(suspect !== undefined && witness !== undefined) {
			var expectedType = _check[_type(witness)] || _check.Base;
			return expectedType(suspect, witness);
		} else {
			return false;
		}
		
	};

	module.identity = _identity;

})(typeof module !== 'undefined' && module.exports? module.exports : window);