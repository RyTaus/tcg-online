class Trigger {
  constructor(type, location) {
    this.type = type;
  }
}

class Activate extends Trigger {
  constructor(location) {
    super('activate', location);
  }
}

class OnSummon extends Trigger {
  constructor() {
    super('on-summon', 'field');
  }
}

module.exports = {
  Activate,
  OnSummon
};
