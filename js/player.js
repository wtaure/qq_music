(function(window){
	function Player($audio){
		return new Player.prototype.init($audio);
		
	}
	Player.prototype = {
		constructor : Player,
		musicList : [],
		init : function($audio){
			this.$audio = $audio;
			this.audio = $audio.get(0);
		},
		currentIndex:-1,
		playMusic : function(index,music){
//			console.log(this.currentIndex)
//			console.log(index)
//			console.log(this.currentIndex==index)
			//判断是否同一首音乐
//			console.log(this);
//			console.log(music+".....music")
//			console.log(index+"....index")
			if(this.currentIndex == index){
				console.log(this.music)
				//同一首音乐
				if(this.audio.paused){
					this.audio.play();
				}else{
					this.audio.pause();
				}
			}else{
				//不是同一首
				this.$audio.attr('src',music.link_url);
				this.audio.play();
				this.currentIndex = index;
//				console.log(this.music+"====this.music")
//			console.log(this.index+"====this.index")
				
			}
			
			
		},
		preIndex : function(){
			var index =this.currentIndex-1;
//			console.log(index)
			if(index<0){
				index = this.musicList.length -1 ;
				
			}
//			console.log(index)
			return index;
			
		},
		nextIndex : function(){
			var index =this.currentIndex+1;
			console.log(index)
			if(index>this.musicList.length-1){
				index = 0;
				
			}
			console.log(index)
			return index; 
			
		},
		changeMusic:function(index){
			//删除对应的数据
			this.musicList.splice(index,1)
			
			//判断当前删除的音乐是否是正在播放的音乐的前面的歌曲
			if(index<this.currentIndex){
				this.currentIndex =this.currentIndex-1
			}
		}
		
	}
	Player.prototype.init.prototype = Player.prototype;
//	console.log(Player)
	window.Player = Player;
})(window);
