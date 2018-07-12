var InfiniteEnergy = function(){};

InfiniteEnergy.prototype.physical = function(){
	return drawing.getText(8,14,"∞");
};

InfiniteEnergy.prototype.act = function(entity){
	//nothing?
};


var DecreasingEnergy = function(amount){
	this.energy = amount;
};

DecreasingEnergy.prototype.physical = function(){
	this.text = drawing.getText(8,14,this.energy);
	return this.text;
};

DecreasingEnergy.prototype.act = function(entity){
	this.energy-=1;
	if(this.energy>=0){
		this.text.textContent=this.energy;	
	} else {
		if(entity.die)entity.die(entity);
	}
};


var ComponentEnergy = function(amount){
	this.energy = amount;
	this.reduction = null;
}

ComponentEnergy.prototype.physical = function(){
	this.text = drawing.getText(8,14,this.energy,"blue"); 
	return this.text;
};

ComponentEnergy.prototype.act = function(entity){
	if(entity.parts){
		if(!this.reduction){//calculate it once
			var total = 0;
			var getPartCost = function(i){
				if(entity.parts[i].cost) return entity.parts[i].cost;
				return 0;
			};
			for(var i = 0; i<entity.parts.length;i++){ total += getPartCost(i);}	
			this.reduction = total;
		}
		this.energy -= this.reduction;
	}
	if(this.energy>=0){
		this.text.textContent=Math.round(this.energy);	
	} else {
		if(entity.die)entity.die(entity);
	}
};





