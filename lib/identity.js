// IdentityJS -> strict equality & identity checking of javascript types
;(function(module) {

	'use strict';

	var 

	_is = function(entity, type) {
		return Object.prototype.toString.call(entity).slice(8, -1) === type;
	},

	_truthy = function(entity) {

		var _members = {

			'object': function() {
				return (_is(entity, 'Object') && Object.keys(entity).length);
			},

			'string': function() {
				return (_is(entity, 'String') && entity.length);
			},

			'number': function() {
				return (entity && _is(entity, 'Number'));
			},

			'function': function() {
				return _is(entity, 'Function');
			},

			'array': function() {
				return (_is(entity, 'Array') && entity.length);
			}
		};

		return _members;
	},

	_keysLength = function(object) {
		return Object.keys(object).length;
	},

	_deepCheck = function(suspect, witness) {

		// todo...
	};

	module.identity = function(suspect, witness) {

		var suspectTrue = _truthy(suspect),
		witnessTrue = _truthy(witness);

		return {

			'asString': function() { 

				var suspectString = suspectTrue.string(),
				witnessString = witnessTrue.string(),
				areEqual = suspect == witness;

				return suspectString && witnessString && areEqual;

			},

			'asFunction': function() { 

				if(suspectTrue.function() && witnessTrue.function()) {
					return true;
				} else {
					return false;
				}
			},

			'asArray': function() { 

				var suspectArray = suspectTrue.array(),
				witnessArray = witnessTrue.array();

				if(!(suspectArray && witnessArray)) {
					return false;
				}

				var equalLength = suspect.length == witness.length;

				if(!equalLength) return false;

				// deep check
				return true;

			},

			'asObject': function() { 

				var suspectObject = suspectTrue.object(),
				witnessObject = witnessTrue.object();

				if(!(suspectObject && witnessObject)) {
					return false;
				}

				var equalLength = _keysLength(suspect) == _keysLength(witness);

				if(!equalLength) return false;

				// deep check
				return true;

			}
		};
	};

})(typeof module !== 'undefined' && module.exports? module.exports : window);