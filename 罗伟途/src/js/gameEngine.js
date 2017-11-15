let gameEngine = {

	ele: null,
	
	allBullets: [],
	allEnemys: [], 
	
	totalScore: 0,
	
	init: function(){
		this.ele = document.getElementById("main");
		return this;
	},
	
	start: function(){
		console.log("游戏开始");

		this.loading(function(){
			console.log("游戏加载完成！");
			console.log("进入游戏");
			
			myPlane.init().move();
			
			myPlane.fire(); 

			gameEngine.listenKeybord();

			gameEngine.createEnemy();

			gameEngine.crash();

			gameEngine.moveBackground();
		});
		
		
	},
	
	//加载游戏
	loading: function(callback){
		
		//logo
		let logo = document.createElement("div");
		gameEngine.ele.appendChild(logo);
		logo.className = "logo";
		
		//load
		let load = document.createElement("div");
		gameEngine.ele.appendChild(load);
		load.className = "load";
		
		//动画
		let imgs = ["images2/loading1.png", "images2/loading2.png", "images2/loading3.png"];
		let i = 0;
		let timer = setInterval(()=>{
			if (i >= 5){
				clearInterval(timer);
				gameEngine.ele.removeChild(logo);
				gameEngine.ele.removeChild(load);
				
				//回调
				if (callback) callback();
				
			}
			else {
				load.style.backgroundImage = "url("+ imgs[++i%3] +")";
			}
		}, 500);
	
	},
	
	listenKeybord: function(){
		
		let xspeed = 0;
		let yspeed = 0;
		
		window.onkeydown = (e)=>{
			e = e || event;
			
			if (e.keyCode == 37) { //左
				xspeed = -10;
			}
			else if (e.keyCode == 39) { //右
				xspeed = 10;
			}
			else if (e.keyCode == 38) { //上
				yspeed = -10;
			}
			else if (e.keyCode == 40) { //下
				yspeed = 10;
			}
		}
		window.onkeyup = (e)=>{
			e = e || event;
			
			if (e.keyCode == 37 || e.keyCode == 39 ) { //左右
				xspeed = 0;
			}
			else if (e.keyCode == 38 || e.keyCode == 40) { //上下
				yspeed = 0;
			}
		}
		
		setInterval(()=>{
			let x = myPlane.ele.offsetLeft + xspeed;
			if (x < 0) x = 0;
			if (x > gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth) {
				x = gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth;
			}
			
			myPlane.ele.style.left = x + "px";
			myPlane.ele.style.top = myPlane.ele.offsetTop + yspeed + "px";
		}, 30);	
		
	},
	
	createEnemy: function(){
		
		setInterval(()=>{
			let flag = Math.random()>0.6 ? true : false;
			if (flag) {
				let enemy = new Enemy(Enemy.prototype.Enemy_Type_Large);
				enemy.init().move();
			}
		}, 6000);
		
		setInterval(()=>{
			let flag = Math.random()>0.5 ? true : false;
			if (flag) {
				let enemy = new Enemy(Enemy.prototype.Enemy_Type_Middle);
				enemy.init().move();
			}
		}, 2000);
		
		setInterval(()=>{
			let flag = Math.random()>0.3 ? true : false;
			if (flag) {
				let enemy = new Enemy(Enemy.prototype.Enemy_Type_Small);
				enemy.init().move();
			}
		}, 1000);
	},
	
	crash: function(){
		
		let timer = setInterval(()=>{
			
			for (let i=0; i<gameEngine.allEnemys.length; i++) { //遍历所有敌机
				
				for (let j=0; j<gameEngine.allBullets.length; j++) { //遍历所有子弹
					
					if ( isCrash(gameEngine.allEnemys[i].ele, gameEngine.allBullets[j].ele) ) {
						
						gameEngine.allBullets[j].boom();
						gameEngine.allBullets.splice(j, 1);						
						gameEngine.allEnemys[i].hurt();
					}
					
				}
				
				if ( isCrash(gameEngine.allEnemys[i].ele, myPlane.ele) ){
					
					clearInterval(timer);

					myPlane.boom(()=>{
						
						
						//
						let myName = prompt("请留下您的大名， 您当前的分数是:"+gameEngine.totalScore, "");

						ajax({
							type: "post",
							url: "http://60.205.181.47/myPHPCode4/uploadScore.php",
							data: {name: myName, score: gameEngine.totalScore},
							
							success: (data)=>{
								console.log("提交成功: " + data);
								location.href = "rand.html";
							}
						})
						
						
						
					});
					
					break;
				}
				
			}
			
		}, 30);
		
	},
	moveBackground: function(){
		let y = 0;
		setInterval(()=>{
			gameEngine.ele.style.backgroundPositionY = y++ + "px";
		}, 30);
		
	}
}








