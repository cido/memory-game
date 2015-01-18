var React = require("./lib/react"),
    Boards = require("./views/Boards"),
    State = require("./State");

var r = React.render(
    <Boards />,
    document.getElementById("content")
);

State.onChange(function() {
    r.setProps();
});
