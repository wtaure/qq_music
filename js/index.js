$(function(){
	var $audio = $('audio');
//	console.log($audio)
	var player = new Player($audio);
	
	
	getPlayerList();
	function getPlayerList(){
		//1.创建歌曲列表，获取歌曲信息
	$.ajax({
		dataType:"json",
		url:"./source/musiclist.json",
//		async:true
		success: function(data){
		
			player.musicList=data;
//			console.log(player.musicList)
//
			//遍历对象获取信息,创建每一条音乐
			$.each(data, function(index,ele) { //index 是脚标， ele是数组中每一个元素
				var $item =createMusicItem(index,ele);
				var $musicList =$(".list ul");
				$musicList.append($item);
			});
		},
		error : function(data){
			console.log("获取失败")
		}
	});
	}
	
	

	//初始化事件的监听
	initEvents();
	function initEvents(){
			//0.自定义滚动条
	 $(window).on("load",function(){
            $(".list").mCustomScrollbar();
        });
	//1.监听歌曲的移入移出事件
	$('body').delegate('.list_music','mouseenter',function(){
		//移入事件
		//显示子菜单
		$(this).find('.list_mune').stop().fadeIn(100)
		//隐藏时长
		$(this).find('.list_time span').stop().fadeOut(100)
		$(this).find('.list_time a').stop().fadeIn(100)
	});
	$('body').delegate('.list_music','mouseleave',function(){
		//移出事件
		//隐藏子菜单
		$(this).find('.list_mune').stop().fadeOut(100)
		//显示时长
		$(this).find('.list_time span').stop().fadeIn(100)
		$(this).find('.list_time a').stop().fadeOut(100)
	})
	
	
	
//	$('.list_music').hover(function(){
//		//移入事件
//		//显示子菜单
//		$(this).find('.list_mune').stop().fadeIn(100)
//		//隐藏时长
//		$(this).find('.list_time span').stop().fadeOut(100)
//		$(this).find('.list_time a').stop().fadeIn(100)
//	},function(){
//		//移出事件
//		//隐藏子菜单
//			$(this).find('.list_mune').stop().fadeOut(100)
//		//显示时长
//		$(this).find('.list_time span').stop().fadeIn(100)
//		$(this).find('.list_time a').stop().fadeOut(100)
//	})
	//2.监听复选框的点击事件
	$('body').delegate('.list_check','click',function(){
		$(this).toggleClass('list_checked')
	})
	
	//3.添加子菜单播放按钮的监听
	var $musicPlay = $('.music_play')
	$('body').delegate('.list_mune_play','click',function(){
		var $item =$(this).parents('.list_music');
//		console.log($item)
//		console.log($item.get(0).index)
//		console.log($item.get(0).music)

//		console.log(this)
		//3.1切换播放图标
		$(this).toggleClass('list_mune_play2')
		//3.2复原其他播放按钮
		$(this).parents('.list_music').siblings().find('.list_mune_play').removeClass('list_mune_play2')
//		console.log(123)
		//3.3 判断播放状态
		if($(this).attr('class').indexOf('list_mune_play2')!=-1){
			console.log(this)
			//当前是播放状态，需要更改底部播放为播放状态
			$('.music_play').addClass('music_play2')	
			//当前是播放状态，文字高亮
			$(this).parents('.list_music').find('div').css('color','#FFF')
			$(this).parents('.list_music').siblings().find('div').css('color','rgba(255,255,255,0.5)')
//			console.log($(this).parents('.list_music').find('div'))
			//3.4改变序号图标
//			$(this).parents('.list_music').find('.list_num').toggleClass('list_num2')
//			$(this).parents('.list_music').siblings().find('.list_num').removeClass('list_num2')
		}else{
			//当前不是是播放状态，需要更改底部播放为不是播放状态
			$('.music_play').removeClass('music_play2')	
			//让文字不高亮
			$(this).parents('.list_music').find('div').css('color','rgba(255,255,255,0.5)')
			$(this).parents('.list_music').siblings().find('div').css('color','rgba(255,255,255,0.5)')
			
		}
		//3.4改变图标序号
			$(this).parents('.list_music').find('.list_num').toggleClass('list_num2')
			$(this).parents('.list_music').siblings().find('.list_num').removeClass('list_num2')
		
		//3.5播放音乐
		player.playMusic($item.get(0).index,$item.get(0).music)
		
		
	})
	
	}
	
	//4.添加底部播放按钮的监听
	$('.music_play').click(function(){
	 	//判断有没有判断过影月
	 	if(player.currentIndex== -1){
	 		//没有播放过音乐
	 		$('.list_music').eq(0).find('.list_mune_play').trigger('click')
	 	}else{
	 		//播放过音乐
	 		$('.list_music').eq(player.currentIndex).find('.list_mune_play').trigger('click')
	 	} 
	 })
	 //5.监听底部控制区域上一首按钮的点击

	 $('.music_pre').click(function(){
	 	$('.list_music').eq(player.preIndex()).find('.list_mune_play').trigger('click')
	 })
	 //6.监听底部控制区域下一首按钮的点击
	 $('.music_next').click(function(){
	 	$('.list_music').eq(player.nextIndex()).find('.list_mune_play').trigger('click')
	 }) 
	 
	 //7.监听删除按钮删除歌曲
	 $('body').delegate('.list_del','click',function(){
	 	var $item = $(this).parents('.list_music');
	 	//判断当前删除的是否是正在播放的
	 	if($item.get(0).index == player.currentIndex){
	 		$('.music_next').trigger('click')
	 	}
	 	$item.remove();
	 	player.changeMusic($item.get(0).index)
	 	console.log($item.get(0).music)
	 	
	 	//重新排序
	 	$('.list_music').each(function(index,ele){
	 		ele.index= index  //右边的index是函数遍历产生的index ，左边的index是遍历到的ele的原来的index
	 		$(ele).find(".list_num").text(index+1)
	 	})
	 	
	 })
	 
	
		function createMusicItem(index,music){
		var $item = $("<li class=\"list_music\">\n"+

							"<div class=\"list_check\"><i></i></div>\n"+
							"<div class=\"list_num\">"+(index+1)+"</div>\n"+
							"<div class=\"list_name\">"+music.name+"\n"+
							"	<div class=\"list_mune\">\n"+
							"		<a href=\"javascript:;\" title=\"播放\" class=\"list_mune_play\"></a>\n"+
							"		<a href=\"javascript:;\" title=\"添加\"></a>\n"+
							"		<a href=\"javascript:;\" title=\"下载\"></a>\n"+
							"		<a href=\"javascript:;\" title=\"分享\"></a>\n"+
							"	</div>\n"+
							"</div>\n"+
							"<div class=\"list_singer\">"+music.singer+"</div>\n"+
					"<div class=\"list_time\"><span>"+music.time+"</span>\n"+
							"	<a href=\"javascript:;\" title=\"删除\" class=\"list_del\"></a>\n"+
								
							"</div>\n"+
						"</li>");
				
				$item.get(0).index=index;
				$item.get(0).music = music;
				
				return $item;
		
	}
	
	
})
