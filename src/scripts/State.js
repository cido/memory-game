var jsonp = require("./lib/jsonp");

var REDDIT_URL = "http://www.reddit.com/r/perfectloops/top.json?sort=top&t=week&jsonp=callbackFunction";

// ===========================================================================

var informAboutChange;
exports.onChange = function onChange(cb) {
    informAboutChange = cb;
}

// ===========================================================================

var state = {
    board: "start",
    cards: [
        // Initial background values are just colors. Where is all our GIFs?!?
        "#000", "#111", "#222", "#333", "#444",
        "#555", "#666", "#777", "#888", "#999",
        "#000", "#aaa", "#bbb", "#ccc", "#ddd"
    ]
};

exports.get = function get(key) {
    return state[key];
};

exports.set = function set(key, value) {
    state[key] = value;
    informAboutChange();
};

// ===========================================================================

(function getCardBackgrounds() {
    jsonp(REDDIT_URL, { param: "jsonp" }, function(err, response) {
        if (err) {
            console.log("Something went wrong with the Reddit call :(");
            return;
        }

        var urls = response.data.children
            .map(function(child) {
                return child.data.url.replace(".gifv", ".gif");
            })
            .filter(function(url) {
                return url.indexOf(".gif") > 0;
            });

        for (var i = 0; i < state.cards.length; i++) {
            if (urls[i]) {
                state.cards[i] = urls[i];
            }
        }
        informAboutChange();
    });
})();
