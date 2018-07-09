Array.prototype.apply = function(f){
	for(var i=0;i<this.length;i++){
		f(this[i]);
	}
};

Array.prototype.perform = function(f){
	this.apply(function(e){ 
		if(e[f]) e[f]();
	});
};

Array.prototype.performOn = function(f,me){
	this.apply(function(e){
		if(e[f]) e[f](me);
	});
};

Array.prototype.getWith = function(property,sub){
	var out =[];
	for(var i=0;i<this.length;i++){
		if(sub){
			if(this[i][sub][property])out.push(this[i]);
		} else {
			var item = this[i].thing;
			if(item[property])out.push(this[i]);	
		}
	}	
	return out;
};

Array.prototype.filter = function(selector){
	var a = this;
	var select = function(i){return selector(a[i]);};
	var out = [];
	for(var i = 0;i<a.length;i++){
		var filtered = select(i);
		if(filtered) out.push(a[i]);
	}
	return out;
};

Array.prototype.filterBroken = function(selector){
	var a = this;
	var select = function(i){return selector(a[i]);};
	var out = [];
	for(var i = 0;i<a.length;i++){
		var filtered = select(i);
		if(filtered) out.push(filtered);
	}
	return out;
};

Array.prototype.getWhereMin = function(property,sub,subsub){
	var out = null;
	if(sub){
		if(subsub) out = this.sort(function(a,b){a[sub][subsub][property]<b[sub][subsub][property]});
		else out = this.sort(function(a,b){a[sub][property]<b[sub][property]});
	}
	else out = this.sort(function(a,b){a[property]<b[property]});
	return out[0];
};

Array.prototype.remove = function(property,value) {
    for(var i=0; i<this.length; i++) {
        if(this[i][property] === value) {
            this.splice(i, 1);
            break;
        }
    }
};	