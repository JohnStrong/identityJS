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

	_keysLength = function(object) {
		return Object.keys(object).length;
	},

	_deepCheck = function(suspect, witness) {
		// todo...
	},

	_identity = function(suspect, witness) {

		if(!(this instanceof _identity)) {
			return new _identity(suspect, witness);
		}

		this.suspect = suspect;
		this.witness = witness;
	}

	_identity.prototype.asString = function() { 

		var suspectString = _truthy(this.suspect).string(),
		witnessString = _truthy(this.witness).string(),
		areEqual = this.suspect == this.witness;

		return suspectString && witnessString && areEqual;

	},

	_identity.prototype.asFunction = function() { 

		var suspectFunction = _truthy(this.suspect).function(),
		witnessFunction = _truthy(this.witness).function();

		if(suspectFunction && witnessFunction) {
			return true;
		} else {
			return false;
		}
	},

	_identity.prototype.asArray = function() { 

		var suspectArray = _truthy(this.suspect).array(),
		witnessArray = _truthy(this.witness).array();

		if(!(suspectArray && witnessArray)) {
			return false;
		}

		var equalLength = this.suspect.length == this.witness.length;

		if(!equalLength) return false;

		// deep check
		return true;

	},

	_identity.prototype.asObject = function() { 

		var suspectObject = _truthy(this.suspect).object(),
		witnessObject = _truthy(this.witness).object();

		if(!(suspectObject && witnessObject)) {
			return false;
		}

		var suspectKeyLen = _keysLength(this.suspect),
		witnessKeyLen = _keysLength(this.witness);

		if(!(suspectKeyLen === witnessKeyLen)) {
			return false;
		}

		// deep check
		return true;

	}


	module.identity = _identity;

})(typeof module !== 'undefined' && module.exports? module.exports : window);