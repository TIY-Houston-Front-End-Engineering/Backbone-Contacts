;(function(exports){

    "use strict";

    Backbone.Contact = Backbone.Model.extend({
        validate: function(data){
            var isUnique = this.collection.filter(function(v){
                return v.get('email') === data.email
            }).length === 0;
            // debugger;
            if(!isUnique || !data.name || !data.email){
                return "Name and email required.";
            }
        }
    })

    Backbone.ContactView = Backbone.TemplateView.extend({
        el: ".container",
        view: "app",
        events: {
            "submit .add-contact-form": "addContact",
            "click .delete-contact": "deleteContact"
        },
        addContact: function(e){
            e.preventDefault();
            var d = {
                name: this.el.querySelector("input[name='name']").value,
                email: this.el.querySelector("input[name='email']").value
            }
            this.collection.add(d, {validate: true});
        },
        deleteContact: function(e){
            var emailToDelete = e.target.parentElement.querySelector('p').innerText;
            var modelToDelete = this.collection.find(function(v){ return v.get('email') === emailToDelete });
            this.collection.remove(modelToDelete);
        }
    })

    Backbone.ContactList = Backbone.Collection.extend({
        model: Backbone.Contact
    })

    var testData = [
        { name: "Matt", email: "matt@theironyard.com" },
        { name: "Billy Gates", email: "bgates@microsoft.com" },
        { name: "Jony Ive", email: "jony@lsd.com" }
    ]

    Backbone.ContactRouter = Backbone.Router.extend({
        initialize: function(){
            // collection and view
            this.collection = new Backbone.ContactList(testData);
            this.view = new Backbone.ContactView({ collection: this.collection });
            Backbone.history.start();
        },
        routes: {
            "*default": "home"
        },
        home: function(){
            this.view.render();
        }
    })


})(typeof module === "object" ? module.exports : window)