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
		for (i = 0; i < user_comments.length; i++) {
			comments[i] = document.createElement("div");
			comments[i].setAttribute("class", "comment media");
		    comments[i].appendChild(document.createTextNode("\n")); // possibly remove
			comments[i].appendChild(buildImage(user_comments[i], i));
			//comments[i].appendChild(document.createTextNode("\n")); // possibly remove
			comments[i].appendChild(buildMediaInfo(user_comments[i], i));
			comments[i].appendChild(document.createTextNode("\n")); // possibly remove

			// comments[i].appendChild(buildCommentInfo(user_comments, i));
			// comments[i].appendChild(buildReplies(user_comments, i));

		}
		for (i = 0; i < comments.length ; i ++) {
			commentArea.appendChild(comments[i])
		}
		
	}

          



	var buildReplies = function(user_comments, i){
		var repliesArea = document.createElement("div");
		repliesArea.setAttribute("class", "replies")
		repliesArea.style.display = "none"; 
		 debugger;
		repliesArea.appendChild(appendReplies(user_comments, i));    
		return repliesArea
	}

	var appendReplies = function(user_comments, i){
		var replies = []
		if (user_comments.user_replies.length > 0) {
			for (r = 0; r < user_comments.user_replies.length ; r ++) {
				replies[r] = document.createElement("div");
				replies[r].setAttribute("class", "comment media");
				replies[r].appendChild(buildImage(user_comments.user_replies[r], i));
				replies[r].appendChild(buildMediaInfo(user_comments.user_replies[r], i));
				replies[r].appendChild(buildCommentInfo(user_comments.user_replies[r], i));
				replies[r].appendChild(buildReplies(user_comments.user_replies[r], i));			
			}
		}

		return replies
	}

	var buildCommentInfo = function(user_comments, i){
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
		var medInfo = document.createElement("div");
		medInfo.setAttribute("class", "media__info");
		medInfo.appendChild(document.createElement("a"));
		medInfo.childNodes[0].href = "#";
		// medInfo.childNodes[0].title = user_comments[i].post_owner.name;
		medInfo.childNodes[0].appendChild(document.createTextNode(user_comments.post_owner.name));
		medInfo.appendChild(document.createTextNode(" " + user_comments.content));
		medInfo.appendChild(buildCommentInfo(user_comments, i))
		// if (user_comments.user_replies.length > 0) {
		// 	medInfo.appendChild(buildReplies(user_comments, i));
		// }
		return medInfo
	}



	var buildImage = function(user_comments, i){

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
// 		// debugger;
// 		appendToDom(persons);
// 	}

// 	var appendToDom = function(persons){
// 		 body = document.getElementsByTagName("body")[0]
// 		// theHTML = "";
// 		// debugger;
// 		for (i = 0; i < persons.length; i++){
// 			body.appendChild(persons[i]);
// 		}
// 		// debugger 
		
		
// 	}

// });