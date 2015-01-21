var _ = require("lodash"),
    jsonp = require("./lib/jsonp");

var TITLE = "El Juego de Memoria",
    REDDIT_URL = "http://www.reddit.com/r/perfectloops/top.json?sort=top&t=week&jsonp=callbackFunction",
    FALLBACK_CARD_BGS = [
        // Initial background values are just colors. Where is all our GIFs?!?
        "#000", "#111", "#222", "#333", "#444",
        "#555", "#666", "#777", "#888", "#999",
        "#000", "#aaa", "#bbb", "#ccc", "#ddd"
    ];

// ===========================================================================

var informAboutChange;
exports.onChange = function onChange(cb) {
    informAboutChange = cb;
}

// ===========================================================================

var state = {
    board: "start",
    title: TITLE
};

exports.get = function get(key) {
    return state[key];
};

// ===========================================================================

exports.Helpers = {};

function fetchNewCards() {
    jsonp(REDDIT_URL, { param: "jsonp" }, function(err, response) {
        /*
            ...
            ...
            In the end, you should set the state.cards to be an array
            of 2*n (eg. 2*15 cards). The included objects should follow
            structure of
            {
                url: "some string here for the background image",
                selected: false,
                found: false
            }
        */
        // state.cards = [ ... ]
        // informAboutChange();
    });
}

exports.Helpers.initializeGame = function initializeGame() {
    state.board = "game";
    state.cards = [];
    state.title = TITLE;
    state.round += 1;
    state.points = 1000;
    fetchNewCards();
    informAboutChange();
};
