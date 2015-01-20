var React = require("../lib/react"),
    Card = require("./Card"),
    State = require("../State");

module.exports = React.createClass({

    clicked: function() {
        var card = State.get("cards")[this.props.id]
        if (!card.found) {
            State.Helpers.cardSelected(this.props.id);
        }
    },

    render: function() {
        var card = State.get("cards")[this.props.id],
            className = "card",
            inlineStyles = {
                backgroundImage: "url(" + card.url + ")"
            };

        if (card.selected) {
            className += " selected";
        }
        if (card.found) {
            className += " found";
        }

        return <div className={className} onClick={this.clicked}>
            <div className="flipper">
                <div className="front" style={inlineStyles} />
                <div className="back">{card.number}</div>
            </div>
        </div>
    }
});
