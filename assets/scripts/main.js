
// WARNING GRAPHIC CONTENT - CLOSE YOUR EYES
// This questions array is being grabbed from global scope which
// is being loaded in by a script tag in index.html
let questionsArray = [...questionsArrayRaw]
// END GRAPHIC CONTENT - YOU CAN OPEN YOUR EYES NOW

let questionHeaderEl = document.getElementById("game-card-question")
let answersListEl = document.getElementById("game-card-answer-list")
let timerEl = document.getElementById("timer")
let solutionEl = document.getElementById("game-card-solution")

answersListEl.addEventListener("click", handleAnswerSelection)

let timeRemaing = 59
let currentQuestionIndex = 0
let answeredCorrectly = 0
let answeredWrong = 0
let answers = []
let timerId = setInterval(countDownHandler, 1000)

function countDownHandler() {
    if (timeRemaing > 0) {
        timeRemaing--
        timerEl.textContent = `Timer: ${timeRemaing}s`
    } else {
        clearInterval(timerId)
        endGameAndShowScore()
    }
}

updateUI()

function handleAnswerSelection(event) {
    if (event.target.nodeName === 'LI') {
        let answerIndex = parseInt(event.target.getAttribute('data-index'))
        checkRightOrWrong(answerIndex)
    }
}

function checkRightOrWrong(answerIndex) {
    if (questionsArray[currentQuestionIndex].answer === answerIndex) {
        answeredCorrectly++
        timeRemaing = timeRemaing + 5
        solutionEl.textContent = 'Correct! +5 secs'
    } else {
        answeredWrong++
        timeRemaing = timeRemaing - 10
        solutionEl.textContent = 'Wrong -10 secs'
    }
    currentQuestionIndex += 1
    solutionEl.style.display = 'block'
    setTimeout(showAnswer, 1000) // Timeout to show if it was right or wrong
}

function showAnswer() {
    // Check to see if it was the last question
    if (currentQuestionIndex < questionsArray.length) {
        updateUI()
    } else { // Game is over
        clearUI()
        clearInterval(timerId)
        endGameAndShowScore()
    }
}

function updateUI() {
    clearUI()


    questionHeaderEl.textContent = `${currentQuestionIndex} of ${questionsArray.length}: ${questionsArray[currentQuestionIndex].question}`

    answers = questionsArray[currentQuestionIndex].answers.map((answer, index) => {
        let li = document.createElement("li")
        li.setAttribute("data-index", index)
        li.textContent = answer
        return li
    })

    answers.forEach(answerEl => answersListEl.appendChild(answerEl))

    
}

function clearUI() {
    solutionEl.style.display = 'none'
    answers = []
    answersListEl.innerHTML = ""
    questionHeaderEl.innerHTML = ""
}

function endGameAndShowScore() {
    clearUI()
    questionHeaderEl.textContent = "Game Over!"
    li = document.createElement('li')
    li.setAttribute("class", "list-no-decoration")
    answersListEl.textContent = `You got ${answeredCorrectly} right and ${answeredWrong} wrong.`
}

