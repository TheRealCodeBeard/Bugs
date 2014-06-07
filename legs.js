var Legs = function(speed) {
	this.speed = speed;
	this.cost = 0.1 * speed;
};

Legs.prototype.physical = function(){
	var g = drawing.getAGroup();
	var col = "yellow";
	g.appendChild(drawing.getCircle(0,-7,3,col));
	g.appendChild(drawing.getCircle(0, 7,3,col));
	return g;
};

Legs.prototype.act = function(entity){
	entity.rotation = world.correctRotationForBounds(entity.x,entity.y,entity.size,entity.rotation);
	if(this.speed){
		entity.y+=this.speed * Math.sin(support.getRad(entity.rotation));
		entity.x+=this.speed * Math.cos(support.getRad(entity.rotation));					
	}
};
