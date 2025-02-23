-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Survey" (
    "survey_id" SERIAL NOT NULL,
    "nazwa" TEXT NOT NULL,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("survey_id")
);

-- CreateTable
CREATE TABLE "Author" (
    "user_id" INTEGER NOT NULL,
    "survey_id" INTEGER NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("user_id","survey_id")
);

-- CreateTable
CREATE TABLE "Question" (
    "question_id" SERIAL NOT NULL,
    "tresc" TEXT NOT NULL,
    "odpowiedz_1" TEXT,
    "odpowiedz_2" TEXT,
    "odpowiedz_3" TEXT,
    "odpowiedz_4" TEXT,
    "odpowiedz_5" TEXT,
    "survey_id" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "answer_id" SERIAL NOT NULL,
    "odpowiedz" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("answer_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "Survey"("survey_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "Survey"("survey_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;
