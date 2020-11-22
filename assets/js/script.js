const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('quiz-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

// var scoreCounter = 0;
// var quizQuestions = [];
// var questionIndex = 0;


function startQuiz() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    nextQuestion()
}

function nextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach (answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }

}
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex +1) {
        nextButton.classList.remove('hide')
    }
    else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    }
    else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'First question text placeholder',
        answers: [
            {text: 'true placeholder', correct: true},
            {text: 'false placeholder 1', correct: false},
            {text: 'false placeholder 2', correct: false},
            {text: 'false placeholder 3', correct: false},
        ]
    },

    {
        question: 'Second question text placeholder',
        answers: [
            {text: 'false placeholder 1', correct: false},
            {text: 'true placeholder', correct: true},
            {text: 'false placeholder 2', correct: false},
            {text: 'false placeholder 3', correct: false},
        ]
    },

    {
        question: 'Third question text placeholder',
        answers: [
            {text: 'false placeholder 1', correct: false},
            {text: 'false placeholder 2', correct: false},
            {text: 'true placeholder', correct: true},
            {text: 'false placeholder 3', correct: false},
        ]
    },

    {
        question: 'Fourth question text placeholder',
        answers: [
            {text: 'false placeholder 1', correct: false},
            {text: 'false placeholder 2', correct: false},
            {text: 'false placeholder 3', correct: false},
            {text: 'true placeholder', correct: true},
        ]
    },

    {
        question: 'Fifth question text placeholder',
        answers: [
            {text: 'true placeholder 1', correct: true},
            {text: 'true placeholder 2', correct: true},
            {text: 'false placeholder 1', correct: false},
            {text: 'false placeholder 2', correct: false},
        ]
    }
]



startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion()
})