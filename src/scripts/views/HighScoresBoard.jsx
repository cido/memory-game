var React = require("../lib/react"),
    StartLink = require("./StartLink"),
    State = require("../State");

module.exports = React.createClass({

    render: function() {
        var points = State.get("points");
        return <div className="board high-scores-board">
            <h1>💃 Usted consiguió {points} puntos 💃</h1>
            <StartLink />
        </div>
    },

    restart: function() {
        State.Helpers.initializeGame();
    }

});
