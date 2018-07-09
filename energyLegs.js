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
	var energyPart = entity.getEnergyPart();
	if(energyPart && energyPart.energy){
		if (energyPart.energy>25 && energyPart.energy<125){
			entity.speed = 8;
		} else if (energyPart.energy >= 125 && energyPart.energy < 2000){
			entity.speed = 6;
		} else if (energyPart.energy >=2000){
			entity.speed = 0;
		} else {
			entity.speed = 2;
		}
	}
	entity.cost = 0.1 * entity.speed;
	if(entity.speed){
		entity.y+=entity.speed * Math.sin(support.getRad(entity.rotation));
		entity.x+=entity.speed * Math.cos(support.getRad(entity.rotation));					
	}
};
