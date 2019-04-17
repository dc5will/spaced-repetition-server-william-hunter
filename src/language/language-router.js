const express = require("express");
const LanguageService = require("./language-service");
const { requireAuth } = require("../middleware/jwt-auth");
const LinkedList = require("../LinkedList");

const languageRouter = express.Router();

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
    const nextWord = await LanguageService.getHead(
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

languageRouter.post("/guess", async (req, res, next) => {
  try {
    const guess = req.body;

    if (!guess)
      return res.status(400).json({
        error: `Missing 'guess' in request body`
      });
r
    const wods = await LanguageService.getLanguageWords(
      req.app.get("db"),
      req.language.id
    );

    // Given a list of questions with corresponding "memory values", M, starting at 1:
    // Take the first question in the list
    // Ask the question
    // If the answer was correct:
    // Double the value of M
    // Else, if the answer was wrong:
    // Reset M to 1
    // Move the question back M places in the list
    // Use a singly linked list to do this

    // pseudocode
    const ll = new LinkedList();
    words.map(word => ll.insertLast(word)); // mapping words from db into LL
    console.log(ll);

    const currNode = ll.head;
    const answer = currNode.value.translation;

    let isCorrect;
    if (guess === answer) {
      // {
      //   "nextWord": "test-next-word-from-correct-guess",
      //   "wordCorrectCount": 111,
      //   "wordIncorrectCount": 222,
      //   "totalScore": 333,
      //   "answer": "test-answer-from-correct-guess",
      //   "isCorrect": true
      // }
      isCorrect = true;
      ll.head.value.memory_value *= 2;
      ll.head.value.correct_count += 1;
      ll.head.value.total_score += 1;
    } else {
      // {
      //   "nextWord": "test-next-word-from-incorrect-guess",
      //   "wordCorrectCount": 888,
      //   "wordIncorrectCount": 111,
      //   "totalScore": 999,
      //   "answer": "test-answer-from-incorrect-guess",
      //   "isCorrect": false
      // }
      isCorrect = false;
      ll.head.value.memory_value = 1;
      ll.head.value.incorrect_count += 1;
      // move question back M places in the list?
      // one place further down from the head
      ll.insertAt(head.value, ll.head.value.memory_value) // ?????
    }
    res.json({
      answer,
      isCorrect,
      nextWord: ll.head.value.original,
      wordCorrectCount: ll.head.correct_count,
      wordIncorrectCount: ll.head.incorrect_count,
      totalScore: ll.head.total_score
    });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = languageRouter;
