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
        let points = 0
        async function wait(s) {
          return new Promise(function(res) {
            setTimeout(function() {
              res()
            }, s * 1000)
          })
        }
        
        for (const question of j.questions) {
          let nextpressed = false
          if (!"text" in question) {
            throw new Error("Every question defined must have the 'text' parameter.")
          }
          let quizB = []
          questionText.innerText = question.text
          if (!"possibleAnswers" in question) {
            throw new Error("Every question defined must have the 'possibleAnswers' parameter. This lets people select one of the answers.")
          }
          
          for (const answer of question.possibleAnswers) {
            const button = document.createElement("button")
            button.json = answer
            quizB.push(button)
            button.innerText = String(answer.answer)
            answerSheet.appendChild(button)
            if (!"correct" in answer) {
              button.disabled = true
            }
            button.onclick = function() {
              quizB.filter(item => item !== button).forEach(function(button2) {
                if (button2.json.correct) {
                  button2.style.backgroundColor = "green"
                } else {
                  button2.style.backgroundColor = "darkred"
                }
                button2.disabled = true
                button2.onclick = function() {}
              })
              button.disabled = true
              button.onclick = function() {}
              if (answer.correct) {
                points += ("points" in answer ? answer.points : 1)
                button.style.backgroundColor = "lime"
              } else {
                points -= ("wrongPoints" in answer ? answer.wrongPoints : 1)
                button.style.backgroundColor = "red"
              }
              const next = document.createElement("button")
              answerSheet.appendChild(next)
              next.innerText = "Next question"
              next.onclick = function() {
                nextpressed = true
              }
            }
          }
          while (nextpressed == false) {
            await wait(0.1)
          }
          answerSheet.innerHTML = ""
        }
      })(json)
    }
    return div
  }
}
