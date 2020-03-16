let scoresListEl = document.getElementById('high-scores-list')


let scores = JSON.parse(localStorage.getItem('quizGame'))



scores.forEach(score => {
    let li = document.createElement('li')
    li.textContent = `${score[0]} - ${score[1]}`
    scoresListEl.appendChild(li)
})


