BEGIN;

TRUNCATE
  "word",
  "language",
  "user";

INSERT INTO "user" ("id", "username", "name", "password")
VALUES
  (
    1,
    'admin',
    'Dunder Mifflin Admin',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  );

INSERT INTO "language" ("id", "name", "user_id")
VALUES
  (1, 'Spanish', 1);

INSERT INTO "word" ("id", "language_id", "original", "translation", "next")
VALUES
  (1, 1, 'memorize', 'memorizar', 2),
  (2, 1, 'hello', 'hola', 3),
  (3, 1, 'goodbye', 'adios', 4),
  (4, 1, 'good', 'bueno', 5),
  (5, 1, 'where', 'donde', 6),
  (6, 1, 'amazing', 'increible', 7),
  (7, 1, 'dog', 'perro', 8),
  (8, 1, 'cat', 'gato', 9),
  (9, 1, 'mister', 'senor', 10),
  (10, 1, 'time', 'tiempo', 11),
  (11, 1, 'who', 'quien', 12),
  (12, 1, 'beer', 'cerveza', 13),
  (13, 1, 'coffee', 'cafe', 14),
  (14, 1, 'kitchen', 'cocina', 15),
  (15, 1, 'computer', 'ordernador', 16),
  (16, 1, 'now', 'ahora', 17),
  (17, 1, 'tomorrow', 'manana', 18),
  (18, 1, 'thanks', 'gracias', 19),
  (19, 1, 'shoe', 'zapato', 20),
  (20, 1, 'last', 'ultimo', null);

UPDATE "language" SET head = 1 WHERE id = 1;

-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('word_id_seq', (SELECT MAX(id) from "word"));
SELECT setval('language_id_seq', (SELECT MAX(id) from "language"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

COMMIT;
