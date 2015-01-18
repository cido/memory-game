var React = require("../lib/react"),
    State = require("../State"),
    StartBoard = require("./StartBoard"),
    GameBoard = require("./GameBoard"),
    HighScoresBoard = require("./HighScoresBoard");

module.exports = React.createClass({

    render: function() {
        switch (State.get("board")) {

            case "game":
                return <GameBoard />;

            case "high-scores":
                return <HighScoresBoard />;

            case "start":
            default:
                return <StartBoard />;
        }
    }

});
