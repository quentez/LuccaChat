// Create the ember app.
window.Chat = Ember.Application.create();

// Create the data model.
var users = [
	{
		name: "User 1"
	},
	{
		name: "User 2"
	}
];
var messages = [];

// Create a single route for our app using our static users collection as model.
Chat.Router.map(function () {
	this.resource("users", { path: "/" })
});

Chat.UsersRoute = Ember.Route.extend({
	model: function () {
		return users;
	}
});

// Create a Users controller to render the user collection.
Chat.UsersController = Ember.ArrayController.extend({
	// Set the controller to use for rendering this array's items.
	itemController: "user"
});

// Create a User controller to render a single user.
Chat.UserController = Ember.ObjectController.extend({
	// Computed property returning the global messages collection.
	messages: function () {
		return messages;
	}.property(),
	actions: {
		// Action creating a new message and inserting it in the messages collection.
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

// Create a Message controller to render a single message.
Chat.MessageController = Ember.ObjectController.extend({
	// Computed property indicating whether this message is from our user or not.
	fromMe: function () {
		return this.get("model").user === this.parentController.get("model");
	}.property()
});

// Create a custom view helper to handle autoscroll to the bottom when new messages are received.
Chat.ScrollBottomView = Ember.View.extend({
	didInsertElement: function () {
		// Retrieve the scrolling container along with the newly inserted item.
		var scrollContainer = this.$().parents(".scroll-container");
		var scrollItem = this.$().parents(".scroll-item");
		if (scrollContainer.length === 0 || scrollItem.length === 0) return;

		// Check if we're already at the bottom of the scroll container. Otherwise, we're done.
		if (scrollContainer.prop("scrollHeight") - scrollContainer.height() - scrollItem.height() - scrollContainer.scrollTop() > 10) return;

		// Scroll the container to the bottom.
		scrollContainer.scrollTop(scrollContainer.prop("scrollHeight"));
	}
});
Ember.Handlebars.helper("scroll-bottom", Chat.ScrollBottomView);

