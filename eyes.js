var Eyes = function(radius,angle){
	this.radius = radius;
	this.angle = angle;
	this.lamp = new Lamp();
	this.cost = 0.05;
};

Eyes.prototype.addSee = function(see){
	this.see = see;
	return this;
}

Eyes.prototype.physical = function(){
	var g = drawing.getAGroup();
	g.appendChild(drawing.getCone(0,0,this.radius,this.angle));
	g.appendChild(this.lamp.getElement());
	this.text = drawing.getText(-8,14,"0");
	g.appendChild(this.text); 
	return g;
};

Eyes.prototype.act = function(entity){
	if(this.see){
		var agent = {
			x:entity.x,
			y:entity.y,
			angle:this.angle,
			radius:this.radius,
			id:entity.id,
			rotation:entity.rotation
		};
		entity.seen = this.see(agent);
		this.text.textContent = entity.seen.length;
		if(entity.seen.length) this.lamp.on("red");
		else this.lamp.off();
	}
};