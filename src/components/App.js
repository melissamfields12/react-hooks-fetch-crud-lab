import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionItem from "./QuestionItem";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(resp => resp.json())
    .then(quest => setQuestions(quest))
  }, [])

  function onAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion])
  }

  function onChangeQuestion(id, value) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "correctIndex": value
      })
    })
      .then(resp => resp.json())
      .then(question => {
        const updatedAnswer = question.correctIndex
        const updatedQuestions = [...questions]
        updatedQuestions.map(question => {
          if(question.id === id) {
            question.correctIndex = updatedAnswer
          } else {
            return true
          }
        })
      setQuestions(updatedQuestions)
  })
}

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method : "DELETE"
    })
    const deletedQuestion = questions.filter(question => question.id !== id)
    setQuestions(deletedQuestion)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={onAddQuestion}/> : 
      <QuestionList questions={questions} setQuestions={setQuestions} onHandleDelete={handleDelete} onChangeQuestion={onChangeQuestion}/>}
    </main>
  );
}

export default App;
