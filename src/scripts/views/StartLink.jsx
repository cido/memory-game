var React = require("../lib/react"),
    State = require("../State");

module.exports = React.createClass({

    render: function() {
        return <div className="start-link-container">
            <a href="#" className="start-link" onClick={this.startGame}>Iniciar el juego!</a>
        </div>
    },

    startGame: function() {
        State.Helpers.initializeGame();
    }

});
