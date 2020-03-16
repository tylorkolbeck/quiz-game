let scoresListEl = document.getElementById('high-scores-list')
let scores = JSON.parse(localStorage.getItem('quizGame'))

document.getElementsByClassName("go-home-btn")

document.addEventListener("click", () => {window.location.href = "index.html"})


// Sort the scores so that the list goes highest score to lowest
let sortedScores = scores.sort(function (a, b) {
    if (a[1] > b[1]) {
        return -1
    }
});


sortedScores.forEach(score => {
    let li = document.createElement('li')
    li.textContent = `${score[0]} - ${score[1]}`
    scoresListEl.appendChild(li)
})


