var ProximitySensor = function(radius){
	var me = this;
	me.radius = radius;
	me.ring = null;
	me.sensed = false;
};

ProximitySensor.prototype.addSense = function(sense){
	this.sense = sense;
	return this;
}

ProximitySensor.prototype.physical = function(){
	var g = drawing.getAGroup();
	this.ring = drawing.getCircle(0,0,this.radius,"rgba(200,100,100,0.1)");
	this.ring.setAttribute("stroke","transparent");
	this.ring.setAttribute("stroke-dasharray","3,10");
	g.appendChild(this.ring);
	return g;
};

ProximitySensor.prototype.act = function(entity){
	if(this.sense){
		var agent = {
			x:entity.x,
			y:entity.y,
			radius:this.radius,
			id:entity.id,
		};
		entity.sensed = this.sense(agent);
		if(entity.sensed.length) this.ring.setAttribute("stroke","red");
		else this.ring.setAttribute("stroke","transparent");
	}
};