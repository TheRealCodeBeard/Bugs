var Mouth = function(){
	this.radius = 10;
	this.angle = 20;
};

Mouth.prototype.addSee = function(see){
	this.see = see;
	return this;
}

Mouth.prototype.physical = function(){
	var g = drawing.getAGroup();
	g.appendChild(drawing.getCone(0,0,this.radius,this.angle,"red"));
	this.text = drawing.getText(-8,21,"0");
	g.appendChild(this.text); 
	return g;
};

Mouth.prototype.act = function(entity){
	if(this.see){
		var agent = {
			x:entity.x,
			y:entity.y,
			angle:this.angle,
			radius:this.radius,
			id:entity.id,
			rotation:entity.rotation
		};
		entity.edible = this.see(agent);
		this.text.textContent = entity.edible.length;
	}
};