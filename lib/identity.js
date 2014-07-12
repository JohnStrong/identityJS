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

	//+ _asString :: any -> string
	_asString = function(entity) {
		return entity.toString();
	},

	//+ _keysLength :: object -> number
	_keysLength = function(object) {
		return Object.keys(object).length;
	},

	// identity/equality checks for suspect against witness
	// TODO: possible to make more generic?
	_check = {

		// aims to compare no value types (i.e. null, undefined)
		'Void': function(suspect, witness) {
			return suspect === witness;
		},

		'Number': function(suspect, witness) {

			var status,

			isNum = _is(suspect, 'Number');

			if(!isNum) return false;

			// NaN check.. sigh
			if(witness !== witness) { 
				status = suspect !== suspect;
			} else {
				status = suspect === witness;
			}

			return status; 
		},

		'String': function(suspect, witness) {

			var isString = _is(suspect, 'String'),
			areEqual = suspect === witness;

			return isString && areEqual;
		},

		'Array': function(suspect, witness) {
			
			var status,

			// is suspect of type array
			isArray = _is(suspect, 'Array'),

			// compare length
			susLen = suspect.length, 
			witLen = witness.length,
			equalLen = susLen === witLen;

			if(!(isArray && equalLen)) return false;


			for(var ith = 0; ith < susLen; ith++) {
				
				var type = _check[_type(witness[ith])] || _check.Void;

				status = type(suspect[ith], witness[ith]);

				if(!status) break;
			}

			return status;
		},

		'Function': function(suspect, witness) {
			
			var isFunction = _is(suspect, 'Function');

			if(!(isFunction)) return false;

			var susString = _asString(suspect),
			witString = _asString(witness);

			return susString === witString;
		},

		'Object': function(suspect, witness) {
			
			var status,

			isObject = _is(suspect, 'Object');

			if(!(isObject)) return false;

			var suspectKeyLen = _keysLength(suspect),
			witnessKeyLen = _keysLength(witness);

			// are keys array both of equal length
			if(suspectKeyLen != witnessKeyLen) {
				return false;
			}

			for(var ith in suspect) {
				
				// suspect has ith directly
				if(suspect.hasOwnProperty(ith)) {

					// does witness have ith too
					if(witness.hasOwnProperty(ith)) {

						var type = _check[_type(witness[ith])] || _check.Void;

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

	// suspect will be compared against witness and treated as that type
	_identity = function(suspect, witness) {

		if(typeof suspect !== 'undefined' && typeof witness !== 'undefined') {
			
			var expectedType = _check[_type(witness)] || _check.Void;
			return expectedType(suspect, witness);
		}
		
	};

	module.identity = _identity;

})(typeof module !== 'undefined' && module.exports? module.exports : window);