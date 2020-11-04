const bcrypt = require("bcryptjs");

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const UserService = {
  hasUserWithUserName(db, username) {
    return db("user")
      .where({ username })
      .first()
      .then(user => !!user);
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into("user")
      .returning("*")
      .then(([user]) => user);
  },
  validatePassword(password) {
    if (password.length < 8) {
      return "Password be longer than 8 characters";
    }
    if (password.length > 72) {
      return "Password be less than 72 characters";
    }
    if (password.startsWith(" ") || password.endsWith(" ")) {
      return "Password must not start or end with empty spaces";
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return "Password must contain one upper case, lower case, number and special character";
    }
    return null;
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  serializeUser(user) {
    return {
      id: user.id,
      name: user.name,
      username: user.username
    };
  },
  populateUserWords(db, user_id) {
    return db.transaction(async trx => {
      const [languageId] = await trx
        .into('language')
        .insert([
          { name: 'Spanish', user_id },
        ], ['id'])

      // when inserting words,
      // we need to know the current sequence number
      // so that we can set the `next` field of the linked language
      const seq = await db
        .from("word_id_seq")
        .select("last_value")
        .first();

      const languageWords = [
        ['memorize', 'memorizar', 2],
        ['hello', 'hola', 3],
        ['goodbye', 'adios', 4],
        ['good', 'bueno', 5],
        ['where', 'donde', 6],
        ['amazing', 'increible', 7],
        ['dog', 'perro', 8],
        ['cat', 'gato', 9],
        ['mister', 'senor', 10],
        ['time', 'tiempo', 11],
        ['who', 'quien', 12],
        ['beer', 'cerveza', 13],
        ['cafe', 'coffee', 14],
        ['kitchen', 'cocina', 15],
        ['computer', 'ordernador', 16],
        ['now', 'ahora', 17],
        ['tomorrow', 'manana', 18],
        ['thanks', 'gracias', 19],
        ['shoe', 'shoe', 20],
        ['last', 'ultimo', null],
      ]

      const [languageHeadId] = await trx.into("word").insert(
        languageWords.map(([original, translation, nextInc]) => ({
          language_id: languageId.id,
          original,
          translation,
          next: nextInc ? Number(seq.last_value) + nextInc : null
        })),
        ["id"]
      );

      await trx("language")
        .where("id", languageId.id)
        .update({
          head: languageHeadId.id
        });
    });
  }
};

module.exports = UserService;
