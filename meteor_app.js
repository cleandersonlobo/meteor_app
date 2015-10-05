Testes = new Mongo.Collection("testes");

if (Meteor.isClient) {
  Template.body.helpers({
    testes : function () {
      if(Session.get("hideCompleto")){
        return Testes.find({checked: {$ne: true}});
      }else{
      return Testes.find();
      }
    },

    hideCompleto : function(){
      return Session.get("hideCompleto");
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
    },

    'change .hide-completo': function(event){
      Session.set('hideCompleto', event.target.checked);
    }
  });

  Template.teste.events({
    'click .toggle-checked': function(){
      Testes.update(this._id, {$set:{checked: !this.checked}});
    },

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
