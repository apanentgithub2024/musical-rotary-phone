const QuizApanent = {
  quizJSON: function(json = {}, scripted = true) {
    const div = document.createElement("div")
    const questionDiv = document.createElement("div")
    const questionText = document.createElement("a")
    const answerSheet = document.createElement("div")
    const center = document.createElement("center")
    center.appendChild(div)
    div.appendChild(questionDiv)
    questionDiv.appendChild(questionText)
    div.appendChild(answerSheet)
    if (scripted) {
      if (!"questions" in json) {
        throw new Error("The `json` parameter has no 'questions' property defined in the JSON value. This is required and is the most important to start the quiz.")
      }
      // The user wants other people to interact with the quiz. There must be more than two questions, or the quiz is impossible.
      (async function(j) {
        async function wait(s) {
          return new Promise(function(res) {
            setTimeout(function() {
              res()
            }, s * 1000)
          })
        }
        
        for (const question of j.questions) {
          if (!"text" in j) {
            throw new Error("Every question defined must have the 'text' parameter.")
          }
          questionText.innerText = question.text
        }
      })(json)
    }
    return div
  }
}
