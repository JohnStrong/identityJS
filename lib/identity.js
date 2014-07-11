// IdentityJS -> strict equality & identity checking of javascript types
;(function(module) {

	'use strict';

	var 

	_is = function(entity, type) {
		return Object.prototype.toString.call(entity).slice(8, -1) === type;
	},

	_truthy = function(entity) {

		return {
			'obj': function() {
				return (_is(entity, 'Object') && Object.keys(entity).length);
			},

			'string': function() {
				return (_is(entity, 'String') && entity.length);
			},

			'number': function() {
				return (
				entity && _is(entity, 'Number') &&
				entity !== Infinity && entity !== -Infinity
				);
			},

			'fun': function() {
				return _is(entity, 'Function');
			},

			'array': function() {
				return (_is(entity, 'Array') && entity.length);
			}
		};	
	};

	module.identity = function(suspect, witness) {

		var suspectTrue = _truthy(suspect),
		witnessTrue = _truthy(witness);

		return {

			'asString': function() { 

				if(suspectTrue.string() && witnessTrue.string()) {
					return true;
				} else {
					return false;
				}
			},

			'asFunction': function() { 

				if(suspectTrue.fun() && witnessTrue.fun()) {
					return true;
				} else {
					return false;
				}
			},

			'asArray': function() { 

				if(suspectTrue.array() && witnessTrue.array()) {
					return true;
				} else {
					return false;
				}
			},

			'asObject': function() { 

				if(suspectTrue.obj() && witnessTrue.obj()) {
					return true;
				} else {
					return false;
				}
			}
		};
	};

})(typeof module !== 'undefined' && module.exports? module.exports : window);