Posts = new Meteor.Collection('posts');

if (Meteor) {
  Meteor.startup(function () {
    // code to run on server at startup
    if (Posts.find().count() == 0)
    {
      Posts.insert({'chatContent':'hello', 'username':'Alice', timestamp: 0})
      Posts.insert({'chatContent':'hello', 'username':'Bob', timestamp:1})
    }
  });
}
