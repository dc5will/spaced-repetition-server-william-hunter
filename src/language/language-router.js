const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')
const LinkedList = require('../LinkedList');

const languageRouter = express.Router()

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
    try {
      const nextWord = await LanguageService.getHead(
        req.app.get('db'),
        req.language.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      res.json({
        // expected response:
        // "nextWord": "Testnextword",
        // "wordCorrectCount": 222,
        // "wordIncorrectCount": 333,
        // "totalScore": 999
        nextWord: nextWord.original,
        wordCorrectCount: nextWord.correct_count,
        wordIncorrectCount: nextWord.incorrect_count,
        totalScore: req.language.total_score
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .post('/guess', async (req, res, next) => {
    try {
      const word = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )
      // thinking of how to implement post to LL
      res.json(console.log(res))
      next()
    } catch (error) {
      next(error)
    }
  })

module.exports = languageRouter
