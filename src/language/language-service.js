const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from("language")
      .select(
        "language.id",
        "language.name",
        "language.user_id",
        "language.head",
        "language.total_score"
      )
      .where("language.user_id", user_id)
      .first();
  },

  getLanguageWords(db, language_id) {
    return db
      .from("word")
      .select(
        "id",
        "language_id",
        "original",
        "translation",
        "next",
        "memory_value",
        "correct_count",
        "incorrect_count"
      )
      .where({ language_id });
  },

  getHead(db, language_id) {
    return db
      .from("word")
      .join("language", "word.id", "language.head")
      .where("language.id", language_id)
      .first();
  },

  getNextWord(db, id) {
    return db
      .from("word")
      .select("language_id", "original", "correct_count", "incorrect_count")
      .where({ id })
      .first();
  },

  // passing last 2 server tests
  insertWord(db, words, language_id, total_score) {
    return db.transaction(trx => {
      return Promise.all([
        trx("language")
          .where({ id: language_id })
          .update({ total_score, head: words[0].id }),
        ...words.map(word => {
          return trx("word")
            .where({ id: word.id })
            .update({ ...word });
        })
      ]);
    });
  }
};

module.exports = LanguageService;
