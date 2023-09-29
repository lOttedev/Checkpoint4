const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} ( password, mail, firstname, lastname, phone) values (?,?,?,?,?)`,
      [
        user.password,
        user.creationMail,
        user.firstname,
        user.lastname,
        user.phone,
        user.adress,
      ]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set phone = ?, adress = ?, , password = ?, pseudo = ?, mail = ? , firstname =?, lastname =?, where id = ?`,
      [
        user.phone,
        user.adress,
        user.password,
        user.mail,
        user.firstname,
        user.lastname,
        user.id,
      ]
    );
  }

  findOneByEmail(mail) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE mail = ?`, [
      mail,
    ]);
  }

  changeUserInformations(user) {
    return this.database.query(
      `UPDATE ${this.table} SET
      mail = ?,
      phone = ?,
      adress = ?,
      firstname = ?,
      lastname = ?,
      role = ?
  WHERE
      id = ?;`,
      [
        user.phone,
        user.adress,
        user.mail,
        user.firstname,
        user.lastname,
        user.role,
        user.id,
      ]
    );
  }

  findByName(name) {
    return this.database.query(`SELECT firstname FROM user`, [`%${name}%`]);
  }

  findHashedPassword(id) {
    return this.database.query(
      `SELECT password FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }

  updatePassword(user) {
    return this.database.query(
      `update ${this.table} set password = ? where id = ?`,
      [user.password, user.id]
    );
  }
}

module.exports = UserManager;
