'use strict'; 

const { LinkedList } = require('./LinkedList')

const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score'
      )
      .where('language.user_id', user_id)
      .first();
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count'
      )
      .where({ language_id });
  },
  getNextWord(db, language_id, head_id){
    return db 
      .from('word as w')
      .select(
        'w.original',
        'w.correct_count',
        'w.incorrect_count',
        'l.total_score'
      )
      .leftJoin('language as l', 'w.language_id', 'l.id')
      .where({ language_id })
      .andWhere('w.id', head_id)
      .first();
  },
  getWord(db, word_id) {
    return db
      .from('word')
      .select('*')
      .where('id', word_id)
      .first();
  },
  persistUpdatedList(db, list, language) {
    let promises = [];
    let node = list.head;
    //update all words
    while (node !== null) {
      promises.push(
        db('word')
          .update({
            ...node.value
          })
          .where('id', node.value.id)
      );
      node = node.next;
    }
    //update language
    promises.push(
      db('language')
        .update(language)
        .where('id', language.id)
    );
    return Promise.all(promises);
  },
  createLanguageLL: async function(db, head_id){
    const list = new LinkedList();
    let nextId = head_id;
    while (nextId !== null) {
      const node = await LanguageService.getWord(
        db,
        nextId
      );
      nextId = node.next;
      list.insertLast(node);
    }
    return list;
  }
};

module.exports = LanguageService;