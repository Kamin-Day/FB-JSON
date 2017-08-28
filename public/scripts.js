var log = console.log;

window.addEventListener("load", function(){
	// Element comments will be appended to
	var commentArea = document.getElementsByClassName('post__comments')[0]
	// request to get JSON information from server
	var request = new XMLHttpRequest();
	request.open("GET", "/posts");
	request.send();
	// Once response is recieved, parse JSON to JS object
	request.addEventListener("load", function(event){
		postInfo = JSON.parse(event.target.response);
		// Call function, sending a list of comments
		makeDOMelements(postInfo.post.user_comments)
	});

	// Builds comments content from JSON
	var makeDOMelements = function(user_comments){
		comments = []
		for (var i = 0; i < user_comments.length; i++) {
			log("user_comments[i] is ");
			log(user_comments[i]);

			// Creates a comment div, which will parent all of the comments information		
			comments[i] = document.createElement("div");
			comments[i].setAttribute("class", "comment media");
			// Adds the user image to the div
			comments[i].appendChild(buildImage(user_comments[i]));
			// Builds child divs
			comments[i].appendChild(buildMediaInfo(user_comments[i]));
		}
		// Adds all comments to the comment area of the page
		for (var i = 0; i < comments.length ; i ++) {
			commentArea.appendChild(comments[i])
		}	
	}
	// Recieves a list of replies &
	// Creates a replies div, then
	// calls appendReplies for each reply in the list
	var buildReplies = function(listOfReplies){
		log("buildReplies")
		log(listOfReplies)

		var repliesArea = document.createElement("div");
		repliesArea.setAttribute("class", "replies");
		repliesArea.style.display = "block"; 
		for (var r = 0; r < listOfReplies.length; r++) {
			log("In buildReplies loop... Current index is:" + r)
			log(listOfReplies[r])
			repliesArea.appendChild(appendReplies(listOfReplies[r]));    
		}
		return repliesArea
	}
	// recieves a single reply
	// & then calls functions to construct them
	var appendReplies = function(user_reply){
		var reply = document.createElement("div");
		reply.setAttribute("class", "comment media");
		reply.appendChild(buildImage(user_reply));
		reply.appendChild(buildMediaInfo(user_reply));

		return reply	
	}
	// recieves a single comment
	// constructs div to append
	var buildCommentInfo = function(user_comment){
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
		replyLink.appendChild(document.createTextNode(user_comment.replies + " replies"));
		comInfo.appendChild(spacerSpan);
		comInfo.appendChild(replyLink);
		comInfo.appendChild(document.createElement("span"));
		comInfo.childNodes[3].innerHTML = "&nbsp" + user_comment.likes +" likes ";
		comInfo.appendChild(document.createTextNode(user_comment.timestamp))
      return comInfo
	}
	// recieves a single comment
	// Creates a div to append, and calls functions to append children
	var buildMediaInfo = function(user_comment){
		log("buildMediaInfo");
		log(user_comment.post_owner.name)
		var medInfo = document.createElement("div");
		medInfo.setAttribute("class", "media__info");
		var nameLink = document.createElement("a");
		nameLink.href = "#"
		nameLink.appendChild(document.createTextNode(user_comment.post_owner.name));
		medInfo.appendChild(nameLink);
		medInfo.appendChild(document.createTextNode(" " + user_comment.content));
		medInfo.appendChild(buildCommentInfo(user_comment))
		// if the comment has replies, send a list of replies to function
		if (user_comment.user_replies.length > 0) {
			medInfo.appendChild(buildReplies(user_comment.user_replies));
		}
		return medInfo
	}
	// recieves a single comment
	// builds user IMG element to append 
	var buildImage = function(user_comment){
		var img = document.createElement("img");
		img.setAttribute("src", user_comment.post_owner.img);
        img.setAttribute("class", "profilePhoto");
        return img
	}
});


       