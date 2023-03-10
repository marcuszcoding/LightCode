DROP TABLE IF EXISTS quizzes CASCADE;

CREATE TABLE quizzes (
 id SERIAL PRIMARY KEY NOT NULL,
 owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
 title VARCHAR(255) NOT NULL,
 public_listed BOOLEAN DEFAULT true,
 url VARCHAR(25) UNIQUE -- making sure no url is being repeated in db
--  category VARCHAR(255),
--  date_created TIMESTAMP,
--  type VARCHAR(255) NOT NULL,
--  description TEXT
);
