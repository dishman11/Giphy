(function(){
	function replaceAll(pattern, rep)
	{
	    var rep1 = this;
		while(rep1.indexOf(pattern) !== -1)
		{
	      rep1 = rep1.replace(pattern, rep);
	    }
		return rep1;
	}

	if(typeof String.prototype.replaceAll === 'undefined')
	{
		String.prototype.replaceAll = replaceAll;
	}
})();
