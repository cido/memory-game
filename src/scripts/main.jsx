var React = require("./lib/react"),
    Boards = require("./views/Boards"),
    Title = require("./views/Title"),
    State = require("./State");

var Main = React.createClass({
    render: function() {
        return <div>
            <Title />
            <Boards />
        </div>
    }
});

var r = React.render(
    <Main />,
    document.body
);

State.onChange(function() {
    console.log("triggering re-rendering")
    r.setProps();
});
