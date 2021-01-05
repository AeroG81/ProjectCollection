import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';

import './main.html';
import '../lib/collections.js';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

Template.main.onCreated(function mainOnCreated(){
  Meteor.subscribe('todos');
});

Template.main.helpers({
  title() {
    return 'Quick To Do'
  },
  todos() {
    const todos = Todos.find();
    return todos;
  },
  isOwner() {
    return this.owner === Meteor.userId();
  }
});

Template.main.events({
  'submit .add'(event) {
    event.preventDefault();
    const text = event.target.text.value;
    const time = event.target.time.value;

    Meteor.call('todos.insert',text,time);

    event.target.text.value = '';
    event.target.time.value = '';
  },
  'click .toggle-checked'(event) {
    Meteor.call('todos.checked',this._id,this.checked);
  },
  'click .delete'(event) {
    Meteor.call('todos.remove',this._id);
  },
  'click .toggle-private'(){
    Meteor.call('todos.setPrivate',this._id,!this.private);
  }
});
