Testes = new Mongo.Collection("testes");

if (Meteor.isClient) {
  Template.body.helpers({
    testes : function () {
      return Testes.find();
    }
  });

  Template.body.events({
    'submit .novo-teste' :function(event){
        var titulo = event.target.titulo.value;
        Testes.insert({
          titulo: titulo,
          createdAt: new Date()
        });
        event.target.titulo.value = "";
        return false;
    }
  });

  Template.teste.events({
    'click .delete': function(){
        Testes.remove(this._id);
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
