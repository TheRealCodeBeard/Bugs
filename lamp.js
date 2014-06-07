var Lamp = function(x,y,size){
	var me = this;
	me.x=(x||x===0)?x:5;
	me.y=(y||y===0)?y:0;
	me.size=size?size:2;
	me.colour="white";
	me.onColour = "red";
	me.element=null;
};

Lamp.prototype.on = function(colour){
	if(this.element)this.element.setAttribute("fill",colour?colour:this.onColour);
};

Lamp.prototype.off = function(){
	if(this.element)if(this.element)this.element.setAttribute("fill",this.colour);
};

Lamp.prototype.getElement = function(){
	var me = this;
	me.element = drawing.getCircle(me.x,me.y,me.size,me.colour);
	return me.element;
};