export const debounce = (func, delay = 300)  => {
	let timeout = null;
	return function() {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func.apply(this, arguments);
		}, delay);
	};
} 