var Plant = function(x,y,e){
	var me = this;
	me.id = support.getID();
	me.x = x;
	me.y = y;
	me.size = 10;
	me.rotation=0;
	me.edible = true;
	if(e) me.energy=e;
	else me.energy = 100;
	me.age=0;
	me.baseColour="olive";
};

Plant.prototype = new EntityBase();

Plant.prototype.colourByEnergy = function(){
	var me = this;
	var getcol = function(){
		if(me.energy>=900)return "darkgreen";
		else if (me.energy>=700) return "green";
		else if (me.energy>=300) return "yellowgreen";
		else if (me.energy>=100) return "olivedrab";
		else if (me.energy>0) return "brown";
		else return "white";
	};
	me.body.setAttribute("fill",getcol());
};

Plant.prototype.topLayer = function(){
	var me = this;
	me.body.setAttribute("stroke","darkgreen");
	me.ageText = drawing.getText(-24,2,Math.round(me.age),"blue");
	me.group.appendChild(me.ageText);
	me.energyText = drawing.getText(8,14,Math.round(me.energy));
	me.group.appendChild(me.energyText);
	me.colourByEnergy();
	return me.group;
};

Plant.prototype.kill = function(){
	var me = this;
	me.body.setAttribute("fill","blanchedalmond");
	me.body.setAttribute("stroke","brown");
	me.idtext.setAttribute("fill","brown");
	if(me.killer && !me.dead){
		me.dead = true;
		me.killer(me,true);
	}
};

Plant.prototype.decay = function(){
	var me = this;
	me.body.setAttribute("fill","white");
	me.body.setAttribute("stroke","blanchedalmond");
	me.idtext.setAttribute("fill","burlywood");
};

Plant.prototype.grow = function(){
	var me = this;
	me.age++;
	me.ageText.textContent=Math.round((me.age/365)*10)/10;
	
	var change = 0.5;
	if(me.energy<100)change=0.1;
	else if(me.energy>300)change = 0.75;
	me.changeEnergy(change);

	if(me.energy>1000 && me.age>365){//over a year old and energetic
		var childEnergy = Math.random()*me.energy;
		me.changeEnergy(-(childEnergy/2));
		me.seed(me,childEnergy);
		//me.spawn(Math.random()*(640*0.9),Math.random()*(480*0.9),childEnergy);
	}
};

Plant.prototype.changeEnergy = function(change){
	var me = this;
	
	if(me.energy>0)me.energy+=change;
	else me.kill();

	if(me.energy<100)me.edible=false;
	else me.edible=true;
	me.colourByEnergy();
	me.energyText.textContent=Math.round(me.energy);
};

Plant.prototype.takeEnergy = function(wanted){
	var me = this;
	if(wanted<=me.energy){
		me.changeEnergy(-wanted);
		return wanted;	
	} 
	else {
		var en = me.energy;
		me.changeEnergy(-en);
		return en;
	}
};