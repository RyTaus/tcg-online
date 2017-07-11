class Requirement {
  constructor(locations = [], elements = [], cardType = [], players = ['me'], maxCost = 100) {
    this.players = players;
    this.locations = locations;
    this.elements = elements;
    this.cardType = cardType;
    this.maxCost = maxCost;
  }

  addLocation(location) {
    this.locations.push(location);
  }

  addElement(element) {
    this.elements.push(element);
  }

  addCardType(type) {
    this.cardType.push(type);
  }
}

module.exports = Requirement;
