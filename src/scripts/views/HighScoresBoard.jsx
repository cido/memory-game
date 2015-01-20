var React = require("../lib/react"),
    State = require("../State");

module.exports = React.createClass({

    render: function() {
        return <div className="board game-board">
        	<h1>High Scores</h1>
            <button className="start-button" onClick={this.restart}>New game</button>
        </div>
    },

    restart: function() {
        State.Helpers.initializeGame();
    }

});
