import { Template } from 'meteor/templating';

import './main.html';

const todos = [
  {text:'Pickup package'},
  {text:'Food Shopping'},
  {text:'Meet with Friends'}
]

Template.main.helpers({
  title() {
    return 'Quick To Do'
  },
  todos(){
    return todos;
  }
});
