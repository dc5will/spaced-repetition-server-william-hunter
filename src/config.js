'use strict';

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
<<<<<<< HEAD
  DB_URL:
    process.env.DATABASE_URL ||
    'postgresql://dunder-mifflin@localhost/spaced-repetition',
  TEST_DB_URL:
    process.env.TEST_DB_URL ||
    'postgresql://dunder-mifflin@localhost/spaced-repetition-test',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000'
};
=======
  DB_URL: process.env.DATABASE_URL
    || 'postgresql://dunder-mifflin@localhost/spaced-repetition',
  TEST_DB_URL: process.env.TEST_DB_URL || "postgresql://dunder-mifflin@localhost/spaced-repetition-test",
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000'
}
>>>>>>> 70ec6f706a4aa40032d020002a59a2475d3f1bda
