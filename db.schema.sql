CREATE TABLE "User" (
    user_id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE Survey (
    survey_id SERIAL PRIMARY KEY,
    nazwa TEXT NOT NULL
);

CREATE TABLE Author (
    user_id INT REFERENCES "User"(user_id) ON DELETE CASCADE,
    survey_id INT REFERENCES Survey(survey_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, survey_id)
);

CREATE TABLE Question (
    question_id SERIAL PRIMARY KEY,
    tresc TEXT NOT NULL,
    odpowiedz_1 TEXT,
    odpowiedz_2 TEXT,
    odpowiedz_3 TEXT,
    odpowiedz_4 TEXT,
    odpowiedz_5 TEXT,
    survey_id INT REFERENCES Survey(survey_id) ON DELETE CASCADE
);

CREATE TABLE Answer (
    answer_id SERIAL PRIMARY KEY,
    odpowiedz INT NOT NULL,
    question_id INT REFERENCES Question(question_id) ON DELETE CASCADE
);
