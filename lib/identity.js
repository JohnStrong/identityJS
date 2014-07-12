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

	//+ _truthy :: any -> object -> boolean
	_truthy = function(entity) {

		var _members = {

			'object': function() {
				return (_is(entity, 'Object') && !!Object.keys(entity).length);
			},

			'string': function() {
				return (_is(entity, 'String') && !!entity.length);
			},

			'number': function() {
				return (!!entity && _is(entity, 'Number'));
			},

			'function': function() {
				return _is(entity, 'Function');
			},

			'array': function() {
				return (_is(entity, 'Array') && !!entity.length);
			}
		};

		return _members;
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

		'Number': function(suspect, witness) {

			var isNum = _is(suspect, 'Number'),
			areEqual = suspect === witness;

			return isNum && areEqual; 
		},

		'String': function(suspect, witness) {

			var isString = _is(suspect, 'String'),
			areEqual = suspect === witness;

			return isString && areEqual;
		},

		'Array': function(suspect, witness) {
			
			// holds the current pass state of check
			var status = false,

			// is suspect of type array
			isArray = _is(suspect, 'Array'),

			// compare length
			susLen = suspect.length, 
			witLen = witness.length,
			equalLen = susLen === witLen;

			if(!(isArray && equalLen)) return false;


			for(var ith = 0; ith < susLen; ith++) {
				
				var type = _check[_type(witness[ith])];

				status = type? type(suspect[ith], witness[ith]) : false;

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
			
			var status = false,

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

						var type = _check[_type(witness[ith])];

						status = type? type(suspect[ith], witness[ith]) : false;

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
			
			var expectedType = _check[_type(witness)];
			
			if(expectedType) {
				return expectedType(suspect, witness);
			} else {
				throw new TypeError('Could not find identity of param[2]');
			}
		}
		
	};

	module.identity = _identity;

})(typeof module !== 'undefined' && module.exports? module.exports : window);