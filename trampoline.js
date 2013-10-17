function factorialCPS(n, fn) {
	fn(factorial(n));
}

function factorial(n) {
	var fact = function(i,acc) {
		if(i == 0) {
			return acc;
		}
		return function() {
			return fact(i-1,acc*i);
		};
	}
	return fact(n, 1);
}

function isEven(n) {
	if(n == 0) {
		return true;
	}
	return function() { return isOdd(n-1); }
}

function isOdd(n) {
	if(n == 0) {
		return false;
	}
	return function() {
		return isEven(n-1);
	}
}

//I hear this is overly complicated. 
//But whatever, I just copied the first reasonable thing I found on the internet and it serves it's purpose.
function isFunction(functionToCheck) {
	var getType = {};
	return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function trampoline(fn) {
	var thunk = fn;
	while (isFunction(thunk)) {
		thunk = thunk();
	}
	return thunk;
}

console.log(trampoline(factorial(10000000)));

// console.log(isEven(2));
// console.log(isOdd(2));
// console.log(isEven(1));
console.log(trampoline(isOdd(100000001)));