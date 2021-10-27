/* 
    We will use the Geolocation API which is built-in in the most modern browsers.
    https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
    We have to get the user's current position.

    Rules of State:
        Only usable with class components (With functional components using the "hooks" system.)
        Don't confuse props with state :(
        "State" is a JS object that contains data relevant to a component.
        Updating 'state' on a component causes the component to (almost) instantly rerender.
        State must be initialized when a component is created.
        State can only be updated using the function "setState".

    We can initialize the state using the lifecycle methods.

    componentDidMount() ==> Automatically gets called one time when our component first gets rendered onto the screen.
                            Good place to do data-loading.
    componentDidUpdate() ==> Our component sits around and waits for an update, for the setState method to be called.
                             The render() method gets called right before the componenentDidUpdate() lifecycle method.
                             Anytime that happens a lifecycle method, componentDidUpdate, will be called automatically.
                             Good place to do more data-loading when state/props change.
    componetWillUnmount() ==> When we stop showing the component to the screen, the componentWillUnmount method will be called.
                              Good place to do cleanup (especially for non-React stuff.)
*/

import React, {Component} from "react";
import ReactDOM from "react-dom";

import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

// The App component
class App extends Component {
    // Good place to do one-time setup. | Best practice NOT to do data-loading in the constructor.
    constructor(props) {
        super(props);

        // Don't confuse the props with the state!!!
        // When the state updates, the component rerenders.
        // WE CAN'T RENAME STATE!!!
        // The only time we do direct assignment to "this.state".
        this.state = {
            latitude: null,
            errorMessage: ""
        };
    };

    // // Alternate way to initialize the state. | Babel creates the constructor for us.
    // state = {latitude: null, errorMessage: ""};

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            // We call setState!!! This callback will run some time in future, when we fetch our position.
            position => this.setState({latitude: position.coords.latitude}),  // The success callback
            err => this.setState({errorMessage: err.message})  // The failure callback
        );
    };

    // A helper function
    renderContent () {
        // Conditional rendering
        if (this.state.errorMessage && !this.state.latitude) {
            return <div>Error: {this.state.errorMessage} </div>
        }

        if (!this.state.errorMessage && this.state.latitude) {
            return (
                // Passing a value from the state system to the props system.
                <SeasonDisplay latitude={this.state.latitude}/>
            );
        }

        return <Spinner message="Please accept location request"/>
    }
    
    // The render method in NOT optional. Avoid doing anything besides returning JSX.
    render() {
        // We never want to start initialize some work or some request from a call in the render method,
        // because the render method will be called all the damn time.
        return (
            // To always surround the result with some common element with a certain style.
            <div className="border red">
                {this.renderContent()}
            </div>
        );

    };
};

ReactDOM.render(<App />, document.querySelector("#root"));