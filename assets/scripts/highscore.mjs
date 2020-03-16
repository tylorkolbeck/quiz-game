let scoresListEl = document.getElementById('high-scores-list')


let scores = JSON.parse(localStorage.getItem('quizGame'))


// Sort the scores so that the list goes highest score to lowest
let sortedScores = scores.sort(function (a, b) {
    if (a[1] > b[1]) {
        return -1
    }
});



console.log(sortedScores)

sortedScores.forEach(score => {
    let li = document.createElement('li')
    li.textContent = `${score[0]} - ${score[1]}`
    scoresListEl.appendChild(li)
})


