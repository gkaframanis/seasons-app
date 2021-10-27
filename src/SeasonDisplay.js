import React from "react";
import "./SeasonDisplay.css";

// We will create a configuration object
const seasonConfig = {
    summer: {
        text: "Let's hit the beach!",
        iconName: "sun"
    },
    winter: {
        text: "Burr, it's chilly!",
        iconName: "snowflake"
    }
};

// Helper function
const getSeason = (lat, month) => {
    // From April to Octomber
    if (month > 2 && month < 9) {
        // Summer in the nothern hemisphere, winter at the southern
        return lat > 0 ? "summer": "winter";
    } else {
        return lat > 0 ? "winter": "summer";
    }
};

// Functional component.
const SeasonDisplay = (props) => {
    const season = getSeason(props.latitude, new Date().getMonth());
    const {text, iconName} = seasonConfig[season];

    return (
        // Good practice the root element to has the css-version of the component's name.
        <div className={`season-display ${season}`}>
            <i className={`icon-left massive ${iconName} icon`}/>
            <h1>{text}</h1>
            <i className={`icon-right massive ${iconName} icon`}/>
        </div>
    );
};


export default SeasonDisplay;