var React = require("../lib/react"),
    StartLink = require("./StartLink"),
    State = require("../State");

module.exports = React.createClass({

    render: function() {
        return <div className="board high-scores-board">
            High scores should go here
        </div>
    },

    restart: function() {
        State.Helpers.initializeGame();
    }

});
