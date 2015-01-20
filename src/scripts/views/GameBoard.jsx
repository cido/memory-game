var React = require("../lib/react"),
    Card = require("./Card"),
    State = require("../State");

module.exports = React.createClass({
    render: function() {
        return <div className="board game-board">
            {State.get("cards").map(function(card, i) {
                return <Card key={i} id={i}>{card}</Card>
            })}
        </div>
    }
});
