var EntityBase = function(){
	var me = this;
	me.x = null;
	me.y = null;
	me.size = null;
	me.speed = null;
	me.rotation = null;
};

EntityBase.prototype.addKill = function(kill){
	this.killer = kill;
	return this;
};

EntityBase.prototype.addSense = function(sense){
	this.sensor = sense;
	return this;
};

EntityBase.prototype.middleLayer = function(me){
	var me = this;
	var idloc = {x:-8,y:-8};
	if(me.size) {
		me.body = drawing.getCircle(0,0,me.size,me.baseColour?me.baseColour:"white");
		me.group.appendChild(me.body);
		idloc = {x:-me.size-2,y:-me.size-2};
	}
	if(me.id) {
		me.idtext = drawing.getText(idloc.x,idloc.y,me.id,"gray");
		me.group.appendChild(me.idtext);
	}
};

EntityBase.prototype.getGroup = function(){
	var me = this;
	me.group = drawing.getAGroup();
	
	if(me.bottomLayer)me.bottomLayer(me);
	if(me.middleLayer)me.middleLayer(me);
	if(me.topLayer)me.topLayer(me);
	
	me.group.setAttribute("transform","translate("+me.x+","+me.y+"),rotate("+me.rotation+")");
	return me.group;
};

EntityBase.prototype.move = function(){
	if(this.generateNewRotation)this.generateNewRotation();
	this.rotation = world.correctRotationForBounds(this.x,this.y,this.size,this.rotation);
	if(this.speed){
		this.y+=this.speed * Math.sin(support.getRad(this.rotation));
		this.x+=this.speed * Math.cos(support.getRad(this.rotation));					
	}
	this.group.setAttribute("transform","translate("+this.x+","+this.y+"),rotate("+this.rotation+")");
};

EntityBase.prototype.rotate = function(direction,amount,force){
	var me = this;
	var d = {cw:1,ccw:-1};
	var dir = d[direction];
	var delta = dir;
	if(amount)delta=(dir*amount);
	else if(me.rotationSpeed)delta=(dir*me.rotationSpeed);

	if(me.rotationSpeed && Math.abs(delta)>me.rotationSpeed && !force) delta = (dir*me.rotationSpeed);

	me.rotation+=delta;

	if(me.rotation>360)me.rotation=360-me.rotation;
	else if(me.rotation<0)me.rotation=360-(-me.rotation);
};