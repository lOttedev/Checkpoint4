const models = require("../models");

const browse = (req, res) => {
  models.guitares
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.guitares
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] !== null) {
        res.send(rows[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
};
