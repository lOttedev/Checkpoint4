const AbstractManager = require("./AbstractManager");

class GuitaresManager extends AbstractManager {
  constructor() {
    super({ table: "guitares" });
  }
}

module.exports = GuitaresManager;
