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
		return "" + entity;
	},

	//+ _keysLength :: object -> number
	_keysLength = function(object) {
		return Object.keys(object).length;
	},

	// identity checks of 'suspect' against 'witness'
	_check = {

		// Boolean, Null, Undefined, String
		'Primitive': function(witness, suspect) {
			return suspect === witness;
		},

		// number types (1..N, NaN, Infinity, -Infinity)
		'Number': function(witness, suspect) {

			if(!_is(suspect, 'Number')) {
				return false;
			}

			if(_NaN(witness)) {
				return _NaN(suspect);
			}

			return suspect === witness;
		},

		'Function': function(witness, suspect) {
			
			if(!_is(suspect, 'Function')) {
				return false;
			}

			// convert to strings and do strict check for now
			return _asString(suspect) === _asString(witness);
		},

		'Array': function(witness, suspect) {
			
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
				
				var type = _check[_type(witness[ith])] || _check.Primitive;

				status = type(suspect[ith], witness[ith]);

				if(!status) break;
			}

			return status;
		},

		'Object': function(witness, suspect) {
			
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

						var type = _check[_type(witness[ith])] || _check.Primitive;

						status = type(suspect[ith], witness[ith]);

					} else {
						
						status = false;
					}

					if(!status) break;
				}
			}


			return status;
		},

		'RegExp': function(witness, suspect) {

			if(!_is(suspect, 'RegExp')) {
				return false;
			}

			return _asString(suspect) === _asString(witness);
		},

		'Date': function(witness, suspect) {

			if(!_is(suspect, 'Date')) {
				return false;
			}


			if(suspect.valueOf() - witness.valueOf()) {
				return false;
			}

			return true;
		}
	},

	/**
	 * takes a suspects list
	 * takes a witness 
	 * return true if all suspects match witness
	 * return false if not
	 **/
	_identity = function() {

		var suspectList = Array.prototype.slice.call(arguments),
		suspectsLen = suspectList.length,

		// takes the type which to compare our suspects against
		_against = function(witness) {

			// latest identity check result of suspects against witness
			var status = false;

			if(typeof witness !== 'undefined') {

				var check = _check[_type(witness)] || _check.Primitive;
				
				for(var ith = 0; ith < suspectsLen; ith++) {
					
					status = check(witness, suspectList[ith]);

					if(!status) break;
				}
			}

			return status;
		};

		return {
			'against': _against 
		};
	};

	module.identity = _identity;

})(typeof module !== 'undefined' && module.exports? module.exports : window);