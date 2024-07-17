const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const Repository = require("./repositories");

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
  async create(attrs) {
    attrs.Id = this.randomId();
    const salt = crypto.randomBytes(8).toString("hex");
    const buf = await scrypt(attrs.password, salt, 64);
    const record = {
      ...attrs,
      password: `${buf.toString("hex")}.${salt}`,
    };

    const records = await this.getAll();
    records.push(record);

    await this.writeAll(records);

    return record;
  }

  async comparePassword(saved, supplied) {
    // Saved -> password saved in databased. "hashed.salt"
    // Supplied -> password given to us by a user
    const [hashed, salt] = saved.split(".");
    const hashedSuppliedBuf = await scrypt(supplied, salt, 64);
    return hashed === hashedSuppliedBuf.toString("hex");
  }
}

module.exports = new UsersRepository("users.json");
