identityJS
==========

strict equality &amp; identity checking of javascript types.

Includes support for primitive types: 
``Null``, ``Undefined``, ``Number``, ``String`` & ``Boolean``.

As well as complex types:
``Function``, ``Array``, ``Object``, ``RegExp`` & ``Date``

Usage
=====
```javascript

//String
identity('test').against('test') 						//true
identity('test').against('fail')						//false
		
//Boolean
identity(true).against(true) 							//true
identity(false).against(false)							//true
identity(true).against(false) 							//false

//Function
identity(
	function() { console.log('test'); }
).against( 
	function() { console.log('test'); }
)														//true

identity(
	function() { console.log('test'); }
).against(
	function() { }
)													 	//false

//Array
identity(
	[1,2,3, [4,5,6]]
).against( 
	[1,2,3, [4,5,6]]
)														//true

identity(
	[1,2,3]
).against( 
	[4,5,6]
)														//false
	
//Object
identity({ 
	'a': 2,
	'b': { 
		'a' : 2, 
		'c': function() { } 
	}
}).against({ 
	'a': 2, 
	'b': { 
		'a' : 2, 
		'c': function() { } 
	}
})														//true

identity({ 
	'a': 2,
	'b': { 
		'a' : 2, 
		'c': function() { } 
	}
}).against({ 
	'a': 2, 
	'b': null
})														//false

//RegExp
identity(
	new RegExp('.?')
).against(
	new RegExp('.?')
)														//true

identity(/.+?/).against(/.+?/)							//true

identity(
	new RegExp('\bpass')
).against(
	new RegExp('\bfail')
)														//false

identity(/\d/).against(/\D/)							//false

//Date
date1 = new Date(56, 6, 17)
date2 = new Date(56, 6, 17)

identity(date1).against(date2)							//true
identity(new Date(40, 6, 17)).against(date1)			//false

```


License
=======
The MIT License (MIT)

Copyright (c) 2014 John Strong

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
