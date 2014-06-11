Posts = new Meteor.Collection('posts');
if (Meteor.isClient) {
  Template.chatClient.lines = function () {  
    return Posts.find({},{sort:{timestamp:1}}).fetch();
  };
  function getCurrentUser () {
    return Meteor.user().emails[0].address.split("@")[0]; 
  }
  function insertChatMessage() {
      var currentUser = getCurrentUser(); 
      var currentChatContentObject = $('#userChatTextarea');
      var currentChatContent = currentChatContentObject.val();
      Posts.insert({chatContent: currentChatContent, username: currentUser, timestamp:(new Date()).getTime()},function(){
        var chatHistory=$('#chatHistory');
        chatHistory.animate({scrollTop:chatHistory[0].scrollHeight},1000);
      })
      console.log("Hi!");
      $('#userChatTextarea').val("");
  }
  Template.chatClient.events({
    'click #sendChat': function () {            
      insertChatMessage();
    },
    
    'keydown #userChatTextarea': function(keypressed)
    {
      if(keypressed.which==13){
        event.preventDefault();
        insertChatMessage();
      }
    }
  });
}