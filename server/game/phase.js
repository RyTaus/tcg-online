const PHASE = [
  'standby',
  'draw',
  'main',
  'end'
];

class Phase {
  constructor(start = 0) {
    this.state = PHASE[start];
  }

  next() {
    this.state = PHASE[(PHASE.indexOf(this.state) + 1) % PHASE.length];
  }

  in(name) {
    return this.state === name;
  }
}

module.exports = Phase;
