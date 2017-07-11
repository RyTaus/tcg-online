class Requirement {
  constructor(locations = [], elements = [], cardType = [], maxCost = 100) {
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
