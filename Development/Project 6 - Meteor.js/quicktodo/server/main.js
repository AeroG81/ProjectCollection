import { Meteor } from 'meteor/meteor';
import '../lib/collections.js';


Meteor.publish('todos', function todoPublication() {
  return Todos.find({
    $or: [
      { private: { $ne: true } },
      { owner: this.userId }
    ]
  });
});

Meteor.methods({
  'todos.insert'(text, time) {
    if (!this.userId) {
      throw new Meteor.Error('Not Authorised');
    }

    Todos.insert({
      text,
      time,
      owner: Meteor.userId(),
      username: Meteor.user().username
    });

  },
  'todos.checked'(id, checked) {
    Todos.update(id, {
      $set: { checked: !checked }
    });
  },
  'todos.remove'(id) {
    const todo = Todos.findOne(id);
    
    if (todo.owner !== this.userId) {
      throw new Meteor.Error('Unautorised');
    }

    Todos.remove(id);
  },
  'todos.setPrivate'(id, setToPrivate) {
    const todo = Todos.findOne(id);
    
    if (todo.owner !== this.userId) {
      throw new Meteor.Error('Unautorised');
    }

    Todos.update(id, { $set: { private: setToPrivate } });
  }
});
