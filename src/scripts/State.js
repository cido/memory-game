var _ = require("lodash"),
    jsonp = require("./lib/jsonp");

var REDDIT_URL = "http://www.reddit.com/r/perfectloops/top.json?sort=top&t=week&jsonp=callbackFunction",
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
    cards: [],
    title: "El Juego de Memoria",
    round: 0,
    points: 1000
};

exports.get = function get(key) {
    return state[key];
};

exports.set = function set(key, value) {
    state[key] = value;
    informAboutChange();
};

// ===========================================================================

exports.Helpers = {};

function setCards(backgrounds) {
    // backgrounds in an array of 15 strings
    var cards = _.shuffle([backgrounds, backgrounds]);
    exports.set("cards", cards);
}

exports.Helpers.fetchNewCards = function fetchNewCards() {
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

        var cardBgs = []
        for (var i = 0; i < FALLBACK_CARD_BGS.length; i++) {
            cardBgs[i] = urls[i] || FALLBACK_CARD_BGS[i];
        }

        var cardNumbers = _.shuffle(_.flatten([
            _.range(FALLBACK_CARD_BGS.length),
            _.range(FALLBACK_CARD_BGS.length)
        ]));

        state.cards = cardNumbers.map(function(cardNumber) {
            return {
                number: cardNumber,
                url: urls[cardNumber],
                selected: false,
                found: false
            }
        });

        informAboutChange();
    });
}
exports.Helpers.fetchNewCards();

exports.Helpers.cardSelected = function cardSelected(index) {
    state.points -= 1;

    var preselected = state.cards.filter(function(card) { return card.selected; });

    if (preselected.length >= 2) {
        return;
    }

    var card = state.cards[index];
    card.selected = !card.selected;
    informAboutChange();

    setTimeout(function() {
        var selected = state.cards.filter(function(card) { return card.selected; });

        if (selected.length < 2) {
            return;
        }

        var urls = _.pluck(selected, "url"),
            first = _.first(urls),
            match = urls.every(function(url) { return url === first; });

        selected.forEach(function(card) {
            if (match) {
                setTimeout(function() {
                    card.found = true;
                    card.selected = false;
                    informAboutChange();
                }, 500);
            } else {
                card.selected = false;
            }
        });
        informAboutChange();

    }, 2000);
}
