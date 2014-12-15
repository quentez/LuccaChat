// Create the ember app.
window.Chat = Ember.Application.create();

// Create the static collection of users.
var users = [
	{
		id: 0,
		name: "User 1"
	},
	{
		id: 1,
		name: "User 2"
	}
];
var messages = [];

// Create routes for our app.
Chat.Router.map(function () {
	this.resource("users", { path: "/" })
});

Chat.UsersRoute = Ember.Route.extend({
	model: function () {
		return users;
	}
});

// Create the Object Controller used to handle the state of a user.
Chat.UsersController = Ember.ArrayController.extend({
	itemController: "user"
});

Chat.UserController = Ember.ObjectController.extend({
	messages: function () {
		return messages;
	}.property(),
	actions: {
		newMessage: function () {
			// Make sure we have a message to send.
			var messageText = this.get("newMessage").trim()
			if (!messageText || messageText === "") return;

			// Reset the input field.
			this.set("newMessage", "");

			// Add the message to the collection.
			messages.pushObject({
				user: this.get("model"),
				text: messageText
			})
		}
	}	
});

Chat.MessageController = Ember.ObjectController.extend({
	fromMe: function () {
		return this.get("model").user === this.parentController.get("model");
	}.property()
});