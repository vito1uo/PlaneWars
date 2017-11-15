class Enemy{
	
	constructor(type){
		this.ele = null;
		this.hp = 1; 
		this.speed = 10;
		this.dieImgs = [];
		this.score = 10; 
		this.type = type;
	}
	
	init(){
		
		this.ele = document.createElement("div");
		gameEngine.ele.appendChild(this.ele);
		
		gameEngine.allEnemys.push(this);
		
		switch(this.type) {

			//大飞机
			case this.Enemy_Type_Large: 
				this.ele.className = "enemy-large";
				this.hp = this.Enemy_Hp_Large;
				this.speed = this.Enemy_Speed_Large;
				this.dieImgs = ["images2/plane3_die1.png", "images2/plane3_die2.png", "images2/plane3_die3.png", "images2/plane3_die4.png", "images2/plane3_die5.png", "images2/plane3_die6.png"];
				this.score = 30; 
				break;
			
			//中飞机
			case this.Enemy_Type_Middle: 
				this.ele.className = "enemy-middle";
				this.hp = this.Enemy_Hp_Middle;
				this.speed = this.Enemy_Speed_Middle;
				this.dieImgs = ["images2/plane2_die1.png", "images2/plane2_die2.png", "images2/plane2_die3.png", "images2/plane2_die4.png"];
				this.score = 20; 
				break;
				
			//小飞机
			case this.Enemy_Type_Small: 
				this.ele.className = "enemy-small";
				this.hp = this.Enemy_Hp_Small;
				this.speed = this.Enemy_Speed_Small;
				this.dieImgs = ["images2/plane1_die1.png", "images2/plane1_die2.png", "images2/plane1_die3.png"];
				this.score = 10; 
				break;
			
			//其他
			default: 
				alert("");
		}
		
		this.ele.style.left = parseInt( Math.random() * (gameEngine.ele.offsetWidth-this.ele.offsetWidth) ) + "px";
		this.ele.style.top = -this.ele.offsetHeight + "px";
		
		return this;
	}
	
	move(){
		
		let that = this;
		this.timer = setInterval(function(){
			
			if (that.ele.offsetTop > gameEngine.ele.offsetHeight) {
				clearInterval(this.timer);
				gameEngine.ele.removeChild(that.ele);
				
				gameEngine.allEnemys.splice(gameEngine.allEnemys.indexOf(that), 1);
			}
			else {
				that.ele.style.top = that.ele.offsetTop + that.speed + "px";
			}
		}, 30);
	}
	
	hurt(){
		this.hp--; 
		
		if (this.hp == 0) {
			this.boom();
			
			gameEngine.totalScore += this.score;

		}
	}
	
	boom(){

		clearInterval(this.timer);
		
		let that = this;
		let i = 0;
		let dieTimer = setInterval(()=>{
			if (i >= that.dieImgs.length){
				clearInterval(dieTimer);
				gameEngine.ele.removeChild(that.ele);
				
				gameEngine.allEnemys.splice(gameEngine.allEnemys.indexOf(that), 1);
				
			}
			else {
				that.ele.style.backgroundImage = "url(" + that.dieImgs[i++] + ")";
			}
		}, 100);
		
	}
}

Enemy.prototype.Enemy_Type_Large = 3;
Enemy.prototype.Enemy_Type_Middle = 2;
Enemy.prototype.Enemy_Type_Small = 1;

Enemy.prototype.Enemy_Speed_Large = 2;
Enemy.prototype.Enemy_Speed_Middle = 4;
Enemy.prototype.Enemy_Speed_Small = 7;

Enemy.prototype.Enemy_Hp_Large = 8;
Enemy.prototype.Enemy_Hp_Middle = 3;
Enemy.prototype.Enemy_Hp_Small = 1;












