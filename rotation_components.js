var RotationComponentBase = function(){};

RotationComponentBase.prototype.adjust = function(entity){
	if(entity.rotation>360)entity.rotation=360-entity.rotation;
	else if(entity.rotation<0)entity.rotation=360-(-entity.rotation);
};

RotationComponentBase.prototype.randomRotation = function(entity){
	if(Math.random()>0.8){
		if(Math.random()>0.5)entity.rotation += this.rate;
		else entity.rotation -= this.rate;
	}
};

RotationComponentBase.prototype.targetRotation = function(entity,target,dir){
	var diff = Math.abs(entity.rotation-target.details.angle);
	var delta = dir * (this.rate<diff?this.rate:diff);
	if(support.getAngleDirection(entity.rotation,target.details.angle)=="cw") entity.rotation += delta;
	else entity.rotation -= delta;
};


var SteadyRotationComponent = function(rate){
	this.rate = rate;
};

SteadyRotationComponent.prototype = new RotationComponentBase();

SteadyRotationComponent.prototype.physical = function(){
	return drawing.getCircle(-5,0,3,"blue");
};

SteadyRotationComponent.prototype.act = function(entity){
	entity.rotation+=this.rate;
	this.adjust(entity);
};


var RandomRotationComponent = function(rate){
	this.rate = rate;
};

RandomRotationComponent.prototype = new RotationComponentBase();

RandomRotationComponent.prototype.physical = function(){
	return drawing.getCircle(-5,0,3,"purple");
};

RandomRotationComponent.prototype.act = function(entity){
	this.randomRotation(entity);
	this.adjust(entity);
};


var RotateTowardsSeen = function(rate){
	this.rate = rate;
};

RotateTowardsSeen.prototype = new RotationComponentBase();

RotateTowardsSeen.prototype.physical = function(){
	return drawing.getCircle(-5,0,3,"green");
};

RotateTowardsSeen.prototype.act = function(entity){
	if(entity.seen && entity.seen.length){
		var target = entity.seen.getWhereMin('hypotenues','details','distance');//closest
		this.targetRotation(entity,target,1);
	} else {//just wander
		this.randomRotation(entity);
	}
	this.adjust(entity);
};


var RotateAwayFromSeen = function(rate){
	this.rate = rate;
};

RotateAwayFromSeen.prototype = new RotationComponentBase();

RotateAwayFromSeen.prototype.physical = function(){
	return drawing.getCircle(-5,0,3,"orange");
};

RotateAwayFromSeen.prototype.act = function(entity){
	if(entity.seen && entity.seen.length){
		var target = entity.seen.getWhereMin('hypotenues','details','distance');//closest
		this.targetRotation(entity,target,-1);
	} else {//just wander
		this.randomRotation(entity);
	}
	this.adjust(entity);
};