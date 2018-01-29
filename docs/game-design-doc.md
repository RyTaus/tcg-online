***Colosseum of Souls TCG -  Game Design Document***


Table of contents:

1 Overview
2 Concept
3 Gameplay
4 Assets


***1 Overview***

**1.1 Author**

Ryan Taus

**1.2 Title**

Colosseum of Souls

**1.3 Elevator Pitch**

Colosseum of Souls is a Trading Card Game with a unique ramp up system. Most card games end up in more of a solitaire position with each player chasing their own strategy independently. Colosseum of Souls uproots this tradition with a shared mana pool that both players fight to edit into supporting their strategy and hurting their opponents.


***2 Concept***

**2.1 Story**

200 years ago beings from another dimension came into ours and launched an all out war. However, humanity managed to barely survive by sealing their souls into cards. Now, people around the world fight their battle with the help of these now sacred cards. Once in a duel, both combatants rely on their deck of souls, link their fate to the cards at their command, and do battle according to strict rules put out by the king of souls.

**2.2 Game Space**

IMG

TERMS
* SOUL-ZONE: Both players have their own soul zones. They can contain 10 soul cards each.
* ARTIFACT-ZONE: Both players have their own artifact zones. They can contain 10 cards each.
* DECK: Each player has their own Deck. This is their stack of cards that they draw from at the beginning of their turns.
* AFTERWORLD: After a card has been destroyed or used they go into the afterworld unless otherwise specified.
* FIELD: The field consists of each player's ARTIFACT-ZONE and SOUL-ZONE. If a card specifies a certain players side of the field then it means their soul zone and artifact zone.
* MANA-ZONE: Each player has a mana zone. The manazone is separated between the different elements. When play happens you can tap either players cards. Additionally, while both players share a mana pool, tapping a card only taps it for yourself, and the cards will untap upon your draw phase.


**2.3 Game Flow**

Preparing to Duel:
    Both players exchange legal decks and shuffle their opponents before returning it to the owner. Players decide who goes first via any fair method (Rock Paper Scissors, flipping a coin, etc). The player going first draws 4 cards, and the player going second draws 5.

During the duel:

A duel is a sequence of turns, with the active player switching off at the end of every turn.

A turn consists of 3 phases:
  1. Draw Phase
  2. Main Phase
  3. End Phase

*Draw Phase:*

In the draw phase the player whose turn it is adds the top card of the deck to their hand. All cards untap for the drawing player. If a card specifically states that it can be activated during the draw phase, or when a player draws a card then it can be activated, otherwise the turn enters the main phase.

*Main Phase:*

During the main phase the current player can make a multitude of actions:
  * Manify a card (once per turn): add a card to the shared manazone. This card is sorted in the manazone by its element type.
  * Summon a Soul: tap an amount of mana specified by a soul card and add it to your SOUL-ZONE. If the card lists additional costs then they must be satisfied as well.
  * Activate an artifact: activate an either continuous or single use artifact by tapping the amount of mana as specified by the card and placing it in your SOUL-ZONE. How to activate an effect is listed in section EFFECT.
  * Activate an effect of a card already on the field: How to activate an effect is listed in section EFFECT.
  * Place an artifact face down: Placing an artifact face down in your ARTIFACT-ZONE
  * Attack: choose an enemy soul, or if the enemy has none then the enemy directly and conduct a battle, as specified in section BATTLE

After any action, if the opposing player has an artifact or soul on the field that can be ACTIVATED in response to the opponent then they may do so. This action creates a CHAIN. Then, the current player announces they end their turn.

*End Phase*

The player whose turn it is not has the opportunity to activate any cards applicable to the end phase. Any effects that specify if they occur in the end phase happen.

Play continues switching off current players until a condition to end the game is satisfied.

*End of the Game:*

Play can end and a winner decided in any of the following ways:
  * If your HEALTH gets reduced to 0 or less then your opponent wins.
  * If it is your draw phase, but you have no cards left in your deck, your opponent wins.
  * If a card is activated that ends the game, then whoever the player specified in that card wins.
