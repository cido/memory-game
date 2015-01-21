#Workshop steps

* Implement fetchNewCards()
    * ...fetch URLs, console.log() the result
    * ...create 2*15 cards, console.log() the result
    * ...set the cards to state.cards

* Draw the cards to the GameBoard
    * It would be handy to use a new view (Card.jsx)
    * One could perhaps want to click a Card. You could add a State helper for it; State.cardSelected
    * To make some meaningful actions, you might want to change the DOM tree of an invidual Card to reflect the one that is define in styles. In simpler terms: Change what is inside a Card.render. Check example for it from _card.scss

* Implement flipping of a card on a click
    * It would be handy to be able to select only two cards
    * It would be handy to be able to de-select a selected card

* Implement founding of matching pairs (.found class is premade)
    * And then check that one can not click a found card again
