var React = require("../lib/react"),
    StartLink = require("./StartLink");

module.exports = React.createClass({

    render: function() {
        return <div className="board start-board">
            <StartLink />
        </div>
    }

});
