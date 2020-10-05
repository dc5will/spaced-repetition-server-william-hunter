const express = require("express");
const LanguageService = require("./language-service");
const { requireAuth } = require("../middleware/jwt-auth");
const LinkedList = require("./LinkedList");

const languageRouter = express.Router();
const jsonBodyParser = express.json();

languageRouter.use(requireAuth).use(async (req, res, next) => {
  try {
    const language = await LanguageService.getUsersLanguage(
      req.app.get("db"),
      req.user.id
    );

    if (!language)
      return res.status(404).json({
        error: `You don't have any languages`
      });

    req.language = language;
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get("/", async (req, res, next) => {
  try {
    const words = await LanguageService.getLanguageWords(
      req.app.get("db"),
      req.language.id
    );

    res.json({
      language: req.language,
      words
    });
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get("/head", async (req, res, next) => {
  try {
    const nextWord = await LanguageService.getListHead(
      req.app.get("db"),
      req.language.id
    );

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
    });
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.post("/guess", jsonBodyParser, async (req, res, next) => {
  try {
    const guess = req.body.guess;
    // throw error is req body is empty
    if (!guess) {
      res.status(400).json({
        error: `Missing 'guess' in request body`
      });
    }

    const words = await LanguageService.getLanguageWords(
      req.app.get("db"),
      req.language.id
    );

    const language = await LanguageService.getUsersLanguage(
      req.app.get("db"),
      req.user.id
    );

    // create linked list and populating ll with words from db
    const ll = new LinkedList();
    words.map(word => ll.insertLast(word)); 

    let currNode = ll.head;
    let answer = ll.head.value.translation;
    let nextWord = currNode.next.value.original;
    let correct_count = currNode.next.value.correct_count;
    let incorrect_count = currNode.next.value.incorrect_count;
    let memory_value = currNode.value.memory_value;
    
    let isCorrect;
    if (guess === answer) {
      isCorrect = true;
      currNode.value.correct_count += 1;
      language.total_score += 1;
      currNode.value.memory_value = memory_value;
      memory_value *= 2;
      ll.head = currNode.next;
    } else {
      isCorrect = false;
      ll.head.value.incorrect_count += 1;
      currNode.value.memory_value = 1; // set memory value to 1 on incorrect
      ll.head = currNode.next;
    }
    
    ll.insertAt(currNode.value, memory_value);
    // create new array with updated values and update db
    let newDB = [];
    let tempNode = ll.head;
    while (tempNode.next !== null) {
      newDB.push(tempNode.value) 
      tempNode = tempNode.next;
    }
    newDB.push(tempNode.value) 
    await LanguageService.persistDB(
      req.app.get("db"),
      newDB,
      language.id,
      language.total_score
    );

    res.json({
      answer,
      isCorrect,
      nextWord,
      totalScore: language.total_score,
      wordCorrectCount: correct_count,
      wordIncorrectCount: incorrect_count,
    });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = languageRouter;
