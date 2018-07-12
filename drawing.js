var drawing = function(){
	var xmlns = "http://www.w3.org/2000/svg";
	var xlink = "http://www.w3.org/1999/xlink";
	var set = function(obj,settings){
		for(var s in settings){
			obj.setAttribute(s,settings[s]);
		}
	};
	return {
		getImage:function(x,y){
			var im = document.createElementNS(xmlns,"image");
			var w = 31/2;
			var h = 32/2;
			set(im,{
				"x":x-w/2,"y":y-h/2,
				"width":w,"height":h,
				"transform":"rotate(90)"
			});
			im.setAttributeNS(xlink,"xlink:href","bug.png");
			return im;
		},
		getCircle:function(x,y,r,col,op,stroke){
			var circle = document.createElementNS(xmlns,"circle");
			if(!op) {op=1.0;}
			if(!stroke) {stroke="black";}
			set(circle,{
				"cx":x,"cy":y,"r":r,
				"stroke":stroke,"stroke-width":1,"fill":col,
				"fill-opacity":op
			});
			return circle;
		},
		getRect:function(x,y,w,h,fill,sw){
			var rect = document.createElementNS(xmlns,"rect");
			var stroke = sw?sw:0;
			set(rect,{
				"x":x,"y":y,"width":w,"height":h,
				"stroke":"black","stroke-width":stroke,"fill":fill
			});
			return rect;
		},
		getLine:function(x1,y1,x2,y2,col){
			var l1 = document.createElementNS(xmlns,"line");
			var colour = col?col:"black";
			set(l1,{
				"x1":x1,"x2":x2,"y1":y1,"y2":y2,
				"stroke":colour,"stroke-width":1
			});
			return l1;
		},
		getCone:function(x,y,r,d,col){
			var colour = col;
			if(!colour) colour = "lightgray";
			var g = document.createElementNS(xmlns,"g");
			var rad = support.getRad(d);//deg * (Math.PI/180);
			//sin A = a/c -> (sin A) * c = a
			//cos A = b/c -> (cos A) * c = b
			var x2 = Math.cos(rad)*r;
			var y2 = Math.sin(rad)*r;
			var x22 = Math.cos(-rad)*r;
			var y22 = Math.sin(-rad)*r;

			g.appendChild(drawing.getLine(x,y,x2,y2,colour));
			g.appendChild(drawing.getLine(x,y,x22,y22,colour));
			return g;
		},
		getText:function(x,y,t,c){
			var text = document.createElementNS(xmlns,"text");
			var colour = c?c:"black";
			set(text,{
				"x":x,"y":y,"fill":colour,
				"font-family":"Verdana","font-size":"8"
			});
			text.textContent=t;
			return text;
		},
		getAGroup:function(){
			return document.createElementNS(xmlns,"g");
		}
	};			
}();