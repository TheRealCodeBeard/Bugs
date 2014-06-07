var world = function(){
	var notes;
	var maxX=640;
	var maxY=480;
	var minX = 0;
	var minY = 0;
	var w = {
		entities:[],
		correctRotationForBounds:function(x,y,rad,r){
			if(x+rad>maxX)return 180;
			if(x-rad<minX)return 0;
			if(y+rad>maxY)return 270;
			if(y-rad<minY)return 90;
			return r;
		},
		withinXBound:function(x){
			return x<maxX && x>minX;
		},
		withinYBound:function(y){
			return y<maxY && y>minY;
		},
		getNotes:function(){
			notes = drawing.getText(5,10,"0");
			return notes;
		},
		setNotes:function(note){
			notes.textContent = note;
		},
		entitiesCount:function(){
			return this.entities.length;
		},
		updateCount:function(){
			this.setNotes(this.entitiesCount() + " - entities");
		},
		addEntity:function(e){
			this.entities.push(e);
			this.updateCount();
			return e;
		},
		getInView:function(agent){
			//Expect agent to have x,y,radius,angle,rotation,id
			/*
				could this be speeded up by filtering to an x,y box around the agent
				entities within that box could then be evaluated in more detail?
			*/
			return w.entities.filter(function(entity){
				if(entity.id!=agent.id){
					var details = support.getRelativeDetails(agent.x,agent.y,agent.radius,entity.x,entity.y);
					if(details.distance.inside && support.withinSegment(agent,details)) return {entity:entity,details:details};
				}
				return null;
			});
		},
		getProximate:function(agent){
			//Expect agent to have x,y,radius,id
			//similarly with the above, can the list be filtered really quickly first?
			return w.entities.filter(function(entity){
				if(entity.id!=agent.id){
					var details = support.getRelativeDetails(agent.x,agent.y,agent.radius,entity.x,entity.y);
					if(details.distance.inside)return {entity:entity,details:details};
				}
			});
		},
		rndX:function(){
			return 15+(Math.random()*(maxX-30));
		},
		rndY:function(){
			return 15+(Math.random()*(maxY-30));
		},
		postDecay:null,
		kill:function(element,doPostDecay){
			var g = element.group;
			var p = g.parentNode;
			w.entities.remove("id",element.id);
			if(element.decay){
				setTimeout(function(){
					element.decay();
					setTimeout(function(){
						p.removeChild(g);
						if(!doPostDecay && w.postDecay)w.postDecay(element.x,element.y);
					},1000);			
				},500);				
			} else {
				p.removeChild(g);
			}
			w.updateCount();
		}
	};
	return w;
}();