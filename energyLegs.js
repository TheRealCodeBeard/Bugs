//This module is new and so the '5' magic number in the 'act' method of EnergyLegs needs to be fixed

var EnergyLegs = function(speed) {
	this.speed = speed;
	this.cost = 0.1 * this.speed;
};

EnergyLegs.prototype.physical = function(){
	var g = drawing.getAGroup();
	var col = "red";
	g.appendChild(drawing.getCircle(0,-7,3,col));
	g.appendChild(drawing.getCircle(0, 7,3,col));
	return g;
};

EnergyLegs.prototype.act = function(entity){
	entity.rotation = world.correctRotationForBounds(entity.x,entity.y,entity.size,entity.rotation);
	if(entity.parts[5]){
		if (entity.parts[5].energy>56 && entity.parts[5].energy<110){
			this.speed = 5;
		} else if (entity.parts[5].energy >= 110) {
			this.speed = 3;
		} else  {
			this.speed = 2;
		}
		this.cost = 0.1 * this.speed;
	} 
	if(this.speed){
		entity.y+=this.speed * Math.sin(support.getRad(entity.rotation));
		entity.x+=this.speed * Math.cos(support.getRad(entity.rotation));					
	}
};
