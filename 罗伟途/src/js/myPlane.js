let myPlane = {
	
	ele: null,
	fireInterval: 300, 
	
	init: function(){
		this.ele = document.createElement("div");
		gameEngine.ele.appendChild(this.ele);
		this.ele.className = "myplane";
		this.ele.style.left = (gameEngine.ele.offsetWidth-this.ele.offsetWidth)/2 + "px";
		this.ele.style.top = gameEngine.ele.offsetHeight-this.ele.offsetHeight + "px"
		return this;
	},
	
	fire: function(){
		this.timer = setInterval(()=>{

			var bullet = new Bullet();
			bullet.init().move();
			
		}, this.fireInterval);
	},
	
	move: function(){

		this.ele.onmousedown = (e)=>{
			e = e || event;
			let disx = e.offsetX;
			let disy = e.offsetY;
			
			document.onmousemove = (e)=>{
				e = e || event;
				let x = e.pageX - disx - gameEngine.ele.offsetLeft;
				if (x < 0) x = 0;
				if (x > gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth) {
					x = gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth
				}
				myPlane.ele.style.left = x + "px";
				myPlane.ele.style.top = e.pageY - disy + "px";
			}
			document.onmouseup = ()=>{
				document.onmousemove = document.onmouseup = null;
			}
		}
	},
	
	boom: function(callback){

		clearInterval(this.timer);

		let dieImgs = ["images2/me_die1.png", "images2/me_die2.png", "images2/me_die3.png", "images2/me_die4.png"]
		let i = 0;
		let dieTimer = setInterval(()=>{
			
			if (i >= dieImgs.length) {
				clearInterval(dieTimer);
				gameEngine.ele.removeChild(myPlane.ele);
				
				callback(); 
				
			}
			else {
				myPlane.ele.style.backgroundImage = "url("+ dieImgs[i++] +")";
			}
			
		}, 100);
	}
	
}
















