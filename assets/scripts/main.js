import { questionsArrayRaw } from '../questions/questions.mjs'

let questionsArray = [...questionsArrayRaw]
let questionHeaderEl = document.getElementById("game-card-question")
let answersListEl = document.getElementById("game-card-answer-list")
let timerEl = document.getElementById("timer")
let solutionEl = document.getElementById("game-card-solution")
let initialsFormEl = document.getElementById("initals-form")
let initialsInputEl = document.getElementById("initials-input")

answersListEl.addEventListener("click", handleAnswerSelection)

let timeRemaing = 59
let currentQuestionIndex = 0
let answeredCorrectly = 0
let answeredWrong = 0
let answers = []
let score
let timerId 

// Start The Game
// init()

function countDownHandler() {
    if (timeRemaing > 0) {
        timeRemaing--
        timerEl.textContent = `Timer: ${timeRemaing}s`
    } else if (timeRemaing <= 0) {
        timeRemaing = 0
        timerEl.textContent = "Times Up!"
        clearInterval(timerId)
        endGameAndShowScore()
    }
}

function init() {
    timerId = setInterval(countDownHandler, 1000)
    updateUI()
}

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

    // Remove the event listener during the time out to prevent inadvertant skipping of questions
    answersListEl.removeEventListener("click", handleAnswerSelection)
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

    // Add the event listener again after the timeout is done
    answersListEl.addEventListener("click", handleAnswerSelection)
}

function updateUI() {
    clearUI()
    if (timeRemaing > 0) {
        questionHeaderEl.textContent = `${currentQuestionIndex} of ${questionsArray.length}: ${questionsArray[currentQuestionIndex].question}`

        answers = questionsArray[currentQuestionIndex].answers.map((answer, index) => {
            let li = document.createElement("li")
            li.setAttribute("data-index", index)
            li.textContent = answer
            return li
        })
    
        answers.forEach(answerEl => answersListEl.appendChild(answerEl)) 
    } else {
        endGameAndShowScore()
    }
}

function clearUI() {
    solutionEl.style.display = 'none'
    answers = []
    answersListEl.textContent = ""
    questionHeaderEl.textContent = ""
}

function endGameAndShowScore() {
    // FIGURE OUT HOW TO MAKE A REUSABLE LI INSTANCE
    clearUI()
    initialsFormEl.addEventListener('submit', handleFormSubmit)
    score = (timeRemaing + 1) * answeredCorrectly - answeredWrong
    questionHeaderEl.textContent = `Game Over - Score ${score}`
    initialsFormEl.style.display = 'block'

    let scoreLi = document.createElement('li')
    scoreLi.setAttribute("class", "list-no-decoration")
    scoreLi.textContent = `You got ${answeredCorrectly} right and ${answeredWrong} wrong.`
    answersListEl.appendChild(scoreLi)
}


function handleFormSubmit(event) {
    event.preventDefault()

    let localStorageData = localStorage.getItem("quizGame")
    if (localStorageData) {
        localStorageData = JSON.parse(localStorageData)
    } else {
        localStorageData = []
    }
    localStorageData.push([initialsInputEl.value.toUpperCase(), score])
    localStorage.setItem("quizGame", JSON.stringify(localStorageData))
    initialsFormEl.removeEventListener('submit', handleFormSubmit)
    window.location.href = "./highscore.html"
    
}

