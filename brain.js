var Brain = function(){};

Brain.prototype.addRational = function(f){
	this.rational = f;
	return this;
}

Brain.prototype.physical = function(){
	var g = drawing.getAGroup();
	g.appendChild(drawing.getCircle(0,0,1,"rgba(0,0,0,1)"));
	return g;
};

Brain.prototype.act = function(entity){
	if(this.rational) this.rational(entity);
};