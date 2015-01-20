var React = require("../lib/react"),
    State = require("../State");

module.exports = React.createClass({

    render: function() {
        return <div className="board start-board">
            <button className="start-button" onClick={this.startGame}>Start game!</button>
        </div>
    },

    startGame: function() {
        State.set("board", "game");
    }

});
