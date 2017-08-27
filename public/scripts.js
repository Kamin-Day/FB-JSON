window.addEventListener("load", function(){

	var commentArea = document.getElementsByClassName('post__comments')[0]

	var request = new XMLHttpRequest();
	request.open("GET", "/posts");
	request.send();
	
	request.addEventListener("load", function(event){
		postInfo = JSON.parse(event.target.response);
		

		makeDOMelements(postInfo.post.user_comments)
	});

	var makeDOMelements = function(user_comments){
		comments = []
//		debugger;
		for (i = 0; i < user_comments.length; i++) {
	//		debugger;
			comments[i] = document.createElement("div");
			comments[i].setAttribute("class", "comment media");
		   // comments[i].appendChild(document.createTextNode("\n")); // possibly remove
			comments[i].appendChild(buildImage(user_comments[i], i));
			
			//comments[i].appendChild(document.createTextNode("\n")); // possibly remove
	//	 debugger;
			comments[i].appendChild(buildMediaInfo(user_comments[i], i));
			// comments[i].appendChild(document.createTextNode("\n")); // possibly remove

			// comments[i].appendChild(buildCommentInfo(user_comments, i));
			// comments[i].appendChild(buildReplies(user_comments, i));

		}
		debugger
		
		for (i = 0; i < comments.length ; i ++) {
			commentArea.appendChild(comments[i])
		}
		
	}

          



	var buildReplies = function(user_comments, i){
			//	 debugger;

		var repliesArea = document.createElement("div");
		repliesArea.setAttribute("class", "replies")
		repliesArea.style.display = "block"; 
		 //// debugger;
		for (r = 0; r < user_comments.length; r++) {
			repliesArea.appendChild(appendReplies(user_comments[r], i));    
		}
		return repliesArea
	}

	var appendReplies = function(user_comments, i){
			//	 debugger;

		var reply = document.createElement("div");
		//// debugger;
		reply.setAttribute("class", "comment media");
		reply.appendChild(buildImage(user_comments, i));
		reply.appendChild(buildMediaInfo(user_comments, i));
		//reply.appendChild(buildCommentInfo(user_comments, i));
		//reply.appendChild(buildReplies(user_comments, i));			
	
		

		return reply
	}

	var buildCommentInfo = function(user_comments, i){
			//	 debugger;

		var comInfo = document.createElement("div");
		comInfo.setAttribute("class", "comment__info");		
		var spacerSpan = document.createElement("span");
     	spacerSpan.innerHTML = "&nbsp";
		var	likeLink = document.createElement("a")
		likeLink.href = "#";
		likeLink.title = "like/unlike";
		likeLink.appendChild(document.createTextNode("Like"));
		comInfo.appendChild(likeLink);
		var replyLink = document.createElement("a");
		replyLink.href = "#";
		replyLink.title = "Replies";
		replyLink.appendChild(document.createTextNode(user_comments.replies + " replies"));
		comInfo.appendChild(spacerSpan);
		comInfo.appendChild(replyLink);

		comInfo.appendChild(document.createElement("span"));
		comInfo.childNodes[3].innerHTML = "&nbsp" + user_comments.likes +" likes ";
		comInfo.appendChild(document.createTextNode(user_comments.timestamp))


      return comInfo
	}

	var buildMediaInfo = function(user_comments, i){
			//	 debugger;

		var medInfo = document.createElement("div");
		medInfo.setAttribute("class", "media__info");
		var nameLink = document.createElement("a");
		nameLink.href = "#"
		nameLink.appendChild(document.createTextNode(user_comments.post_owner.name));
		medInfo.appendChild(nameLink);
		medInfo.appendChild(document.createTextNode(" " + user_comments.content));
		medInfo.appendChild(buildCommentInfo(user_comments, i))
		//// debugger

///	maybe?	kclszdcvkjdzhvkj.d	
		// if () {



			//Need a function here to check current data structure
			// to see if current user_comments replies have already been 
			// appended 
			if (user_comments.user_replies.length > 0) {
			 	medInfo.appendChild(buildReplies(user_comments.user_replies, i));
			}
		// }
		return medInfo
	}



	var buildImage = function(user_comments, i){
	//	 debugger;

		var img = document.createElement("img");
		img.setAttribute("src", user_comments.post_owner.img);
		// OPTIONAL??  img.setAttribute("alt", "Profile Image");
        img.setAttribute("class", "profilePhoto");
        return img
	}
});


          //   var userImg = document.createElement("img");
          //   userImg.setAttribute("src", "images/user.png");
          //   userImg.setAttribute("alt", "Profile Image");
          //   userImg.setAttribute("class", "profilePhoto");
          //   var divCommentMedia = document.createElement("div");
          //   divCommentMedia.setAttribute("class", "comment media");
          //   var divMediaInfo = document.createElement("div");
          //   divMediaInfo.setAttribute("class", "media__info");
          //   var userNameLink = document.createElement("a");
          //   var userName = document.createTextNode("Name 1");
          //   userNameLink.appendChild(userName);
          //   userNameLink.title = "Name 1";
          //   userNameLink.href = "#";
          // //  userNameLink.appendChild(userName);
          //   var commentText = document.createTextNode(" " + commentMessage);
          //   var divCommentInfo = document.createElement("div");
          //   divCommentInfo.setAttribute("class", "comment__info");
          //   var likeLink = document.createElement("a");
          //   var likeText = document.createTextNode("Like");
          //   likeLink.appendChild(likeText);
          //   likeLink.title = "Like";
          //   likeLink.href = "#";
          //   //likeLink.appendChild(likeText);
          //   var replyText = document.createTextNode("Reply");
          //   var replyLink = document.createElement("a");
          //   // replyLink.appendChild(likeText);
          //   replyLink.title = "Reply";
          //   replyLink.href = "#";
          //   replyLink.appendChild(replyText);
          //   var commentSpan = document.createElement("span");
          //   commentSpan.innerHTML = " 0 likes"
          //   commentDate = document.createTextNode("Just now");
          //   var spaceText = document.createTextNode("  ");
          //   var linkBR = document.createTextNode(" ");
          //   var spacerSpan = document.createElement("span");
          //   space
// var request = new XMLHttpRequest();
// 	request.open("GET", "/people");
// 	request.send();
	
// 	request.addEventListener("load", function(event){
// 		people = JSON.parse(event.target.response);
// 		makeDOMelements(people)
// 	});


// // var newdiv = document.createElement("DIV");
// // newdiv.appendChild(document.createTextNode("some text"));
// // document.body.appendChild(newdiv);
	

// 	var makeDOMelements = function(people){
		
// 		var persons = []
// 		for (i = 0; i < people.length; i++) {
// 			persons[i] = document.createElement("div");
// 			persons[i].appendChild(document.createElement("li")).appendChild(document.createTextNode("Name: " + people[i].fname + " " + people[i].lname))
// 			persons[i].appendChild(document.createElement("li")).appendChild(document.createTextNode("Phone Number: " + people[i].tel))
// 			persons[i].appendChild(document.createElement("li")).appendChild(document.createTextNode("Address: " + people[i].address))
// 			persons[i].appendChild(document.createElement("li")).appendChild(document.createTextNode("City: " + people[i].city))
// 			persons[i].appendChild(document.createElement("li")).appendChild(document.createTextNode("State: " + people[i].state))
// 			persons[i].appendChild(document.createElement("li")).appendChild(document.createTextNode("Zip: " + people[i].zip))
// 			persons[i].appendChild(document.createElement("br")) 
// 			persons[i].appendChild(document.createElement("br")) 
// 		}
// 		// //// debugger;
// 		appendToDom(persons);
// 	}

// 	var appendToDom = function(persons){
// 		 body = document.getElementsByTagName("body")[0]
// 		// theHTML = "";
// 		// //// debugger;
// 		for (i = 0; i < persons.length; i++){
// 			body.appendChild(persons[i]);
// 		}
// 		// //// debugger 
		
		
// 	}

// });