if(Meteor){
  Meteor.startup(function(){
    if(Posts.find().count()==0){
      Posts.insert({'chatContent':'hello','username':'Alice',timestamp:0});
    }
  })
}
