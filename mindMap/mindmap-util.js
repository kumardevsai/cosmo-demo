Array.prototype.del = function(n) {
	if (n < 0)
		return this;
	else
		return this.slice(0, n).concat(this.slice(n + 1, this.length));
};

Array.prototype.BinarySearch(des) {
	var low = 0;　　
	var high = this.length - 1;　　
	while (low <= high) {　　
		var middle = (low + high) / 2;　　
		if (des == this[middle]) {　　
			return middle;　　
		} else if (des < this[middle]) {　　
			high = middle - 1;　　
		} else {　　
			low = middle + 1;　　
		}　　
	}　　
	return -1;
};