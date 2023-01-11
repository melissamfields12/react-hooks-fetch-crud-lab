import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, onHandleDelete, onChangeQuestion}) {

  const mappedQuestions = questions.map((question) => {
    return <QuestionItem key={question.id} question={question} onHandleDelete={onHandleDelete} onChangeQuestion={onChangeQuestion}/>
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {mappedQuestions}
        </ul>
    </section>
  );
}

export default QuestionList;
