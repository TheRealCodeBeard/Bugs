var ComposedEntity = function(x,y,parts){
	var me = this;
	me.id = support.getID();
	me.x = x;
	me.y = y;
	me.rotation = 0;
	me.size = 7;
	me.parts = parts;
	me.scared = false;
	me.colour = "white";
	me.stroke = "black";
	me.showText = true;
	me.opacity = 1.0;
};

ComposedEntity.prototype.getGroup = function(){
	var me = this;
	var idloc = {x:-me.size-2,y:-me.size-2};

	me.group = drawing.getAGroup();
	me.group.appendChild(drawing.getCircle(0,0,me.size,me.colour,me.opacity,me.stroke));
	if(me.showText){
		me.group.appendChild(drawing.getText(idloc.x,idloc.y,me.id,"gray"));
	}
	var addPart = function(p) {me.group.appendChild(me.parts[p].physical(me))};
	for(var i=0;i<me.parts.length;i++){addPart(i);}

	me.update();
	return me.group;
};

ComposedEntity.prototype.update = function(){
	var me = this;
	me.group.setAttribute("transform","translate("+me.x+","+me.y+"),rotate("+me.rotation+")");
};

ComposedEntity.prototype.tick = function(){
	var me = this;
	me.parts.performOn("act",me);
	me.update();
};

ComposedEntity.prototype.getEnergyPart = function(){
	return this.parts.find(part=>(part.energy));
};

ComposedEntity.prototype.getPartWith = function(element){
	return this.parts.find(part=>part.hasOwnProperty(element));
}