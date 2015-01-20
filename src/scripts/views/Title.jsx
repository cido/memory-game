var React = require("../lib/react"),
	State = require("../State");

module.exports = React.createClass({
    render: function() {
        return <div className="title">{ State.get("title") }</div>
    }
});
