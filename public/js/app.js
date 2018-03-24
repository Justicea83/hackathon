$(document).ready(function(){
	$('#LoadAccount').on('click',function(e){
	e.preventDefault();
	$('.loadJ').load("/tweety/user/settings/load",function(){
		$('#alertDanger').hide();
	$('#ChangeUsernameButton').click(function(e){
		e.preventDefault();
		var url = $('#ChangeUsername').attr('action');
		var name = $('#username').val();
		var email = $('#email').val();

		if(name == '' && email == ''){
			$('#alertDanger').fadeIn().text('Both fields are required ');
			$('input#username').focus();
			
		}
		if(name == '' || email == '' ){
			if(name == ''){
			$('#alertDanger').fadeIn().text('The name field is required ');
			$('input#username').focus();
			
		}else if(email == ''){
			$('#alertDanger').fadeIn().text('The email field is required ');
			$('input#email').focus();
		}
		}
		var dataString =  $('form#ChangeUsername').serialize();
		$.ajax(url,{
			type : "POST",
			data : dataString,
			success:function(){
				$('#alertDanger').removeClass('alert-danger').addClass('alert-success').fadeIn().text('Saved Successfully');
			},
			error:function(){
				$('#alertDanger').fadeIn().text('There was an error');
			}
		});
		
	});
	});

	
});
	$('#LoadAccountP').on('click',function(e){
	e.preventDefault();
	$('.loadJ').load("/tweety/user/settings/load/pass",function(){
		$('#alertDanger').hide();
	$('#ChangePasswordButton').click(function(e){
		e.preventDefault();
		var url = $('#ChangePassword').attr('action');
		var current = $('#current').val();
		var password = $('#password').val();
		var password_confirmation = $('#password_confirmation').val();

		if(current == '' && password == '' && password_confirmation == ''){

			$('#alertDanger').fadeIn().text('The fields are required');
			$('input#current').focus();
			
		}
		if(current == '' || password == '' || password_confirmation == ''){
			if(current == ''){
			$('#alertDanger').fadeIn().text('The current password field is required ');
			$('input#current').focus();
			
		}else if(password == ''){
			$('#alertDanger').fadeIn().text('The new password field is required ');
			$('input#password').focus();
		}else{
			$('#alertDanger').fadeIn().text('The password confirmation field is required ');
			$('input#password_confirmation').focus();
		}
		}
		//ajax request
		var dataString =  $('form#ChangePassword').serialize();
		$.ajax(url,{
			type : "POST",
			data : dataString,
			success:function(){
				$('#alertDanger').removeClass('alert-danger').addClass('alert-success').fadeIn().text('Saved Successfully');
			},
			error:function(){
				$('#alertDanger').fadeIn().text('There was an error');
			}
		});
	});
	});
	
});
	
	$('#result').hide();
	$('#search').keyup(function(e){
		$('#result').html(' ');
		var url = '/tweety/user/search'; 
		var data = $('#search').val();
		$.ajax({
			url:url,
			data:{data:data},
			success:function(data){
				$('#result').show();
				$.each(data,function(key,value){
					var src = '/SystemImages/'+value.profileImage;
$('#result').append('<li class="list-group-item"><img src="'+src+'" class="list-img" width="40" height="30">'+value.name+'</li>');
				});
			},
			error:function(){
				console.log('error');
			}
		});
	});
	
	//coding for the hashtags
	$(function(){
		var regex = /[#|@](\w+)$/ig;
		$('.status').keyup(function(){
			var max = 140;
			$('.hash-box ul').html(' ');
			$('#enter').html(' ');
			var content = $.trim($(this).val());
			$('#counters').text(max - content.length);
			var text = content.match(regex);
			if(content.length == max){
				$('#CounterBtn').removeClass('btn-success').addClass('btn-danger');
			}else if(content.length > max){
				$('#CounterBtn').attr('disabled','disabled');
				$('#counters').text(0);
			}else{
				$('#CounterBtn').removeAttr('disabled');
				$('#CounterBtn').removeClass('btn-danger').addClass(' btn-success');
			}

			if(text != null){
				let h = $('.status').val();
				//this is an ajax to get the the hashtags in the trends table
				//console.log(data);
				$.ajax({
					type:'GET',
					url:'/tweety/tweet/hashtags',
					data:{hashtag:h},
					success:function(data){
						console.log(data);
						
							$('#enter').append(data);
						
						$('#enter li').click(function(){
							var value = 	 $.trim($(this).html());
							var oldContent = $('.status').val();
							var newContent = oldContent.replace(regex,"");
							$('.status').val(newContent+value+' ');
							$('.getValue').hide();
							$('.status').focus();
			
						});
					},
				});
				//

			}else{
				$('hash-box li').hide();
			}
		});
	});
	//js for the likes on tweets
		$(function(){
			$(document).on('click','.like-btn',function(){
				var tweet_id = $(this).data('tweet');
				var user_id = $(this).data('user');
				var counter = $(this).find('.likeCounter');
				var count = counter.text();
				console.log(count);
				var button = $(this);
				$.ajax({
					url:'/tweety/tweet/likes',
					type:'GET',
					data:{tweet_id:tweet_id , user_id:user_id},
					success:function(){
					button.addClass('unlike-btn');
					button.removeClass('like-btn');
					count++;
					console.log(count);
					console.log(counter.text(count));
					button.find('.fa-heart-o').addClass('fa-heart');
					button.find('.fa-heart').removeClass('fa-heart-o');
				}
				});
			});
		});
		$(function(){
			$('#showTweetForm').on('click',function(){
				$('#twitter-handle').toggleClass('hidden-xs').toggleClass('hidden-sm');
			});
		});
	
});

//vue of the application

new Vue({
	el:'#app',
	data:{
		show:true
	}
});