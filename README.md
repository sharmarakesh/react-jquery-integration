This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

### implementation details --- https://www.pluralsight.com/guides/how-to-use-jquery-inside-a-react-component

Introduction
Sometimes when we are building large applications, we might want to use jQuery plugins or jQuery functionality to do things that aren’t possible in React. The advantage of using React is that each component can maintain its own state independent of other components.

Since many web apps are developed using jQuery, we might want our React component to integrate with the jQuery app. For example, we might want to show some data within our React application. Similarly, we may have an existing jQuery app and want our React app to send data to the jQuery app for rendering on the page.

Communicating between the React side of the app and jQuery is actually easy to implement. In this guide, we'll look at three different ways to do this:

1. Referencing jQuery context from React
2. Using helper class, which is passed to React
3. Using a publisher/subscriber object passed to React

Referencing jQuery context from React
This method involves passing a copy of the jQuery context, i.e., \$(this), to the React component in the constructor when we initially create our React component. This allows React to manipulate our existing UI elements.

Our jQuery app initially creates the React component using a call to React.createElement and passing in the context of the jQuery app to the components constructor. The component can then store the reference (available via the props argument) in its state and use it to update key elements on the web page. This allows the component to change web page elements outside of its own component area.

Below is the code:

ReactDOM.render(React.createElement(MyjQueryReactComponent, { context: \$('body') }), document.getElementById('root'));
});

In the above example, we can see how the component gets created initially. We pass a reference to the jQuery body element to the component's constructor. It is then accessible via the props of the component's constructor.

Below is our React component, which stores the jQuery context. It can also update UI elements directly, as shown below. We can also see that the constructor takes an argument for "props" that will have the jQuery context we pass when it gets created. This context is actually stored within the state of the component.

class MyjQueryReactComponent extends React.Component {
constructor(props) {
super(props);  
 this.state = {
context: props.context
};
this.onClick = this.onClick.bind(this);
}

onClickBtn() {
// Getting ref to JQuery object from our parent app.
var myDomEl = this.state.context.find('#myDomEl');

// Update color of our element.
myDomEl.css('background-color', 'green'));
}
render() {
return (

<div className='alert alert-success' role='alert'>
<h3>Hello there!</h3>
<button type='button' className='btn btn-default' onClick={ this.onClickBtn }>Click to Update!</button>
</div>
);
}
}

Using helper class, which is passed to React
This method involves passing a reference JavaScript object to the React component that will act as an intermediary between the React component and the existing web application. The React component can then request data from this intermediate javascript class and even ask it to update certain portions of the page with updated data. Thus the jQuery web app has control over its own UI sections. Similarly, the React component also has control over its own section of web elements. The React component gets a copy of the JavaScript helper class so that it can get notifications from the parent jQuery application and also ask for any updates to the main web app, i.e., outside it's own scope.

The main advantage of this approach is that we are clearly separating the responsibility between the React component for UI elements on our page and the jQuery app’s ownership for its own UI elements. The React component can maintain its own section of the page and let jQuery own the remaining portion. The React component can ask for any updates to be made in the UI outside of its control by sending a request through the helper class, and the jQuery web app can respond accordingly.

Below is an example of instantiating a React component and passing it the helper class.

ReactDOM.render(React.createElement(MyjQueryReactComponent, { context: UIHelper }), document.getElementById('root'));

We can now see that instead of passing the jQuery context itself as we had done in the previous example, we are now passing a reference to a JavaScript intermediate class. This intermediate class has methods for updating the different UI elements as well as state outside the React component scope itself.

The UIHelper class is shown below:

var UIHelper = {
getBgColor: function(parent, callbackfn) {
callbackfn($('#elm').css('background-color'), parent);
  },
  setBgColor: function(color) {
    $('#elm').css('background-color', color);
}
};

We can see that the above class only contains a couple of methods that handle the background color of UI element on our page. We can also get/read the current background color value of this element or even update its background color.

Similar to the previous example for our React component, we can store the context of the outer web app within the state of our React component. However, this time, instead of the context being a reference to jQuery object, we'll instead store a reference to the helper JavaScript class, i.e., UIHelper.

Below is the code:

class MyjQueryReactComponent extends React.Component {
constructor(props) {
super(props);  
 this.state = {
context: props.context
};
this.onBtnClick = this.onBtnClick.bind(this);
}

onBtnClick() {
this.state.context.getBgColor(this, function(color, self) {
self.state.context.setBgColor('green');
});
}
render() {
return (

<div className='alert alert-success' role='alert'>
<h3>Hi there!</h3>
<button type='button' className='btn btn-default' onClick={ this.onBtnClick }>Click to Update!</button>
</div>
);
}
}

We can see that in the above code, we store the reference to UIHelper, which is referred as props.context within the state of the React component. Once a user clicks on the button in the React component, we make a call to UIHelper class via the context to get the current background color of the UI element. We then call the UIHelper again to update the background color.

Using a publisher/subscriber object passed to React
Another way of integrating React with an existing jQuery application is via a pubsub model. This enables the component to watch for updates from the external web app and also send updates back. For instance, when the client interacts with the existing web app, there might be certain events that trigger methods which are then sent to the React component so it can refresh its UI accordingly.

We have now replaced the UIHelper Javascript class with a pub/sub model. Thus, the React component can be informed of events originating from the external web app and update its inner state and UI controls.

Let's take a simple example. Whenever a user clicks a button in the existing jQuery app, we'll send an event to all the subscribers of the Javascript class in between and let them respond accordingly.

We can use the pub/sub helper class to do this

var PubSubHelper = {
subscribers: [],
subscribe: function(parent, callbackfn) {
this.subscribers.push({ parent: parent, callbackfn: callbackfn });
},
bgColor: function(name) {
// Inform subscribers of the event.
this.subscribers.forEach(function(subscriber) {
subscriber.callbackfn(name, subscriber.parent);
});
}
};

In the above class, we have a subscribe method from which clients can subscribe to get notified of events from the parent app. Thus, whenever the bgColor method gets invoked by the existing app, all subscribers get informed of the change, giving them a chance to update their UI accordingly.

Let's take an example where the existing app updates the background color of the UI element on the page every 2 seconds. It will update the background color from green to red. Below is the code:

$(function() {
  setTimeout(function() {
    ReactDOM.render(React.createElement(MyjQueryReactComponent, { context: PubSubHelper }), document.getElementById('root'));
  }, 0);
  // Change the element bgcolor every 2 seconds.
  setInterval(function() {
    var elm = $('#elm');
var bgColor = elm.css('background-color') === 'rgb(255, 255, 0)' ? 'red' : 'green';
// Change element color
elm.css('background-color', bgColor);
// Inform subscribers.
PubSubHelper.bgColor(bgColor);
}, 2000)
});

In the above example, there is a two-second interval during which the background color of the UI element is updated. The React component would normally have no way of identifying the change in bgcolor of the element. It would also have no direct way to access the UI element itself. This is because the element is actually a div outside the scope of the React component.

However, using the pubsub model, the React component can get notified whenever the background color of the element updates. The React component can react and update its own UI element accordingly.

The React component can listen to events in the main app, as we can see in the example below. We can also see that the constructor now stores a reference to the application context (pubsub model). This is similar to the earlier example, but the context is now a pub/sub model instead of the UIHelper class.

We can also invoke the subscribe method to listen to events from the existing web app. In the example below, we'll handle the onBgColor event to update the React component’s UI based on the events fired.

class MyjQueryReactComponent extends React.Component {
constructor(props) {
super(props);

this.state = {
bgColor: 'red',
context: props.context
};
// Listen to bgColor events.
this.state.context.subscribe(this, this.onBgColor);
}

onBgColor(bgColor, that) {
// Change the state value for bgColor.
that.setState({ bgColor: bgColor });
}
render() {
return (

<div className='alert alert-success' role='alert'>
<h3>Hello, from React!</h3>
<span className={ 'icon ' + (this.state.bgColor === 'red' ? 'icon-danger' : 'icon-success') + ' p-3' }>
{ this.state.bgColor }
</span>
</div>
);
}
}

In the above example, our React component has a header title/message along with a span element with a warning/success message inside. The message updates its label as well as the bgColor based on the value of the current state bgColor. The state bgColor gets a value from the onBgColor event, which is called as callback method from the pub/sub class in the outer app.

We can also see that the onBgColor callback function gets a bgColor name along with a reference to the React component’s context. We want the pub/sub model to send this information to us since the current context of our event handler comes from the pub/sub class and not from our React component. To get access to this.state, we have to refer to the parent context that.state instead.

Directly Invoking React Component Methods from Outside
In addition to the methods we discussed above for communication between the React component and jQuery/outside app, we can also communicate in a reverse way, i.e., from jQuery to React, by invoking methods within React component itself.

When our React component gets rendered on screen, it returns an instance of the component. We can make use of this instance and invoke methods within the React component. Thus we get access to the React component from outside and, by invoking methods on our React component, we can update the state, user interface of the React application.

Let's look at an example:

<button id='showBtn' type="button" class="btn btn-primary">Show</button>
<button id='hideBtn' type="button" class="btn btn-primary">Hide</button>

<div id="root"></div>
<div id="output"></div>

Let's also render the React component within our div as shown below:

var myComponent = ReactDOM.render(React.createElement(MyComponent), document.getElementById('root'));

We are storing a copy of our React component instance in a variable named myComponent after calling the render command. That is how we are going to invoke the React component’s internal methods.

We'll also update the jQuery methods to show/hide buttons.

$(function() {
  $('#showBtn').click(function() {
$('#output').text('');
    
    myComponent.show('Hello World!', function(text) {
      $('#output').text(text);
});
});

\$('#hideBtn').click(function() {
myComponent.hide();
});
});

Finally we have our React component, as shown below:

class MyjQueryReactComponent extends React.Component {
constructor(props) {
super(props);
this.state = {
text: '',
visible: false
};

this.onSaySomething = this.onSaySomething.bind(this);
};
show(text, callback) {
this.setState({ visible: true, text: text, callback: callback });
}
hide() {
this.setState({ visible: false });
}

onSaySomething() {
this.state.callback('Hello from MyjQueryReactComponent');
}

render() {
return (

<div className={ 'my-component ' + (this.state.visible ? '' : 'hidden') } >
<div className="card">
<div className="card-header">
My jQuery React Component
</div>
<div className="card-block">
<h4 className="card-title"></h4>
<p className="card-text">
{ this.state.text }
</p>
<a href="#" className="btn btn-primary" onClick={ this.onSaySomething }>Say Something</a>
</div>
</div>
</div>
);
}
};

Thus, we can see that the React component defines show/hide methods and renders its UI consisting of a box element with a title, some text and a button to update the text. When the React component renders on screen, a user can click the “Say Something” button to display some text in the React component’s UI.

Conclusion
In this guide, we’ve seen there are many ways of integrating jQuery with React component. The techniques discussed here can also be helpful in integrating your existing jQuery app with the React application.
