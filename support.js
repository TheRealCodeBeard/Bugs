var support = function(){
	var lastID = 0;
	return {
		getID:function(){
			lastID++;
			return lastID;
		},
		getRad:function(d){
			return d * (Math.PI/180);
		},
		getDeg:function(r){
			return r/(Math.PI/180);
		},
		sq:function(x){
			return x*x;
		},
		getAngleDirection:function(from,to){
			if(to>270 && from<90) return "ccw";
			else if(to>from) return "cw";
			else return "ccw";
		},
		getRelativeDetails:function(x,y,rad,ax,ay){
			var details = {distance:{}};

			details.distance.hypotenues = Math.sqrt(support.sq(ay-y)+support.sq(ax-x));
			details.distance.inside = details.distance.hypotenues <= rad;

			if(ay>=y) details.distance.oposite = ay-y;
			else details.distance.oposite = y-ay;
			if(ax>=x) details.distance.adjacent = ax-x;
			else details.distance.adjacent = x-ax;

			if(ax>=x&&ay>=y) details.angle = support.getDeg(Math.atan(details.distance.oposite/details.distance.adjacent));
			else if (x>=ax && ay>=y) details.angle = 180-support.getDeg(Math.atan(details.distance.oposite/details.distance.adjacent));
			else if (x>=ax&&y>=ay) details.angle = 180+support.getDeg(Math.atan(details.distance.oposite/details.distance.adjacent));
			else if (ax>=x && y>=ay) details.angle = 360-support.getDeg(Math.atan(details.distance.oposite/details.distance.adjacent));

			return details;
		},
		withinSegment:function(agent,details){
			var result = false;
			if(details.angle===agent.rotation) {
				result = true;
			} else if(details.angle<agent.rotation) {
				if(details.angle >= agent.rotation-agent.angle) result = true;
				else if(agent.rotation+agent.angle>360){
					if(details.angle<=agent.angle-(360-agent.rotation)) result=true;
				}
			} else if(details.angle>agent.rotation) {
				if(details.angle <= agent.rotation+agent.angle) result = true;
			}
			return result;
		},
		withinTriangle:function(x,y,c,t,ax,ay,rot){
			var agent = {
				x:x,y:y,
				radius:c,angle:t,
				rotation:rot
			};
			var details = support.getRelativeDetails(agent.x,agent.y,agent.radius,ax,ay);
			var within = support.withinSegment(agent,details);
			return {
				aa:details.distance.adjacent,
				ao:details.distance.oposite,
				ah:details.distance.hypotenues,
				at:details.angle,
				c:agent.radius,
				t:agent.angle,
				inside:details.distance.inside && support.withinSegment(agent,details)
			};
		},
		maybeDo:function(func,chance,alt){
			if(!chance)chance = 0.5;
			if(chance && Math.random()>chance){
				func();
				return true;
			} else {
				if(alt)alt();
				return false;
			}
		},
		bind:function(me,name){
			if(me[name])return function(){me[name]();};
		}
	};
}();