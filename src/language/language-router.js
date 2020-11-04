const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')
const bodyParser = express.json()
const languageRouter = express.Router()
const { listInsertAt } = require('./LinkedList')

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
        )
      res.json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/head', async (req, res, next) => {
    try{
      const word = await LanguageService.getNextWord(
        req.app.get('db'), 
        req.language.id,
        req.language.head
      );
      res.json({
        nextWord: word.original,
        totalScore: word.total_score,
        wordCorrectCount: word.correct_count,
        wordIncorrectCount: word.incorrect_count
      });
      next()
    } catch(error) {
      next(error); 
    }
  })

languageRouter
.post('/guess', bodyParser, async (req, res, next) => {
  if (!req.body.guess){
    return res.status(400).json({error: "Missing 'guess' in request body"}); 
  }
  try{
    const list = await LanguageService.createLanguageLL(
      req.app.get('db'),
      req.language.head
    );
    const head = list.head;
    /*if guess is correct:
        update memory value * 2
        increase score
        move to memory_value pos
    */
   const isCorrect = req.body.guess.toLowerCase() === head.value.translation;
    if (isCorrect) {
      head.value.memory_value = head.value.memory_value * 2;
      head.value.correct_count++;
      req.language.total_score++;
      req.language.head = head.next.value.id;
      list.head = head.next;
      listInsertAt(list, head.value, head.value.memory_value);
    /*if guess is wrong:
      reset memory value
      move to next pos to try again
    */
    } else {
      head.value.memory_value = 1;
      head.value.incorrect_count++;
      req.language.head = head.next.value.id;
      list.head = head.next;
      listInsertAt(list, head.value, head.value.memory_value);
    }
    await LanguageService.persistUpdatedList(
      req.app.get('db'),
      list,
      req.language
    );
    //send back our updated data
    res.json({
      nextWord: list.head.value.original,
      totalScore: req.language.total_score,
      wordCorrectCount: list.head.value.correct_count,
      wordIncorrectCount: list.head.value.incorrect_count,
      answer: head.value.translation,
      isCorrect: isCorrect
    });
    next();
  } catch(error){
    next(error); 
  } 
});

module.exports = languageRouter