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

	//+ _keysLength :: object -> number
	_keysLength = function(object) {
		return Object.keys(object).length;
	},

	// identity/equality checks for suspect against witness
	_check = {

		'String': function(suspect, witness) {

			var isString = _is(suspect, 'String'),
			areEqual = suspect === witness;

			return isString && areEqual;
		},

		'Array': function(suspect, witness) {
			
			var isArray = _is(suspect, 'Array'),
			equalLen = suspect.length === witness.length;

			if(!(isArray && equalLen)) return false;

			return true;
		},

		'Function': function(suspect, witness) {
			var isFunction = _is(suspect, 'Function');

			if(!(isFunction)) return false;

			return true;
		},

		'Object': function(suspect, witness) {
			
			var isObject = _is(suspect, 'Object');

			if(!(isObject)) return false;

			var suspectKeyLen = _keysLength(suspect),
			witnessKeyLen = _keysLength(witness);

			if(suspectKeyLen != witnessKeyLen) {
				return false;
			}

			return true;
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