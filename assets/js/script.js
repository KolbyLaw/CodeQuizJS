// Constant/Global Variables
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultElement = document.getElementById('result-container');
const startContainer = document.getElementById('start-container');

let highscores = [];
let count = 60;
let score = 0;
let currentQuestionIndex

    document.getElementById('count').innerHTML="Time Remaining: " + count + "(s)";
    document.getElementById('highscore').innerHTML="Highest Score: " + 0;
    document.getElementById('score').innerHTML="Your Current Score: " + score;


// Primary Page Functionality
function startQuiz() {
    timer()
    startButton.classList.add('hide')
    startContainer.classList.add('hide')
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    nextQuestion()
}

function nextQuestion() {
    resetState()
    showQuestion(questions[currentQuestionIndex])
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
        if (correct) {
            score++
            document.getElementById('score').innerHTML="Your Current Score: " + score;
        } else {
            if (count < 10) {
                count = 0
            } else {
                count = count - 10
            }
        }
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (questions.length > currentQuestionIndex +1) {
        nextButton.classList.remove('hide')
    }
    else {
        showResult();
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

function timer() {
    var interval = setInterval(function(){
    document.getElementById('count').innerHTML= "Time Remaining: " + count + "(s)";
    count--;
    if (count < 1){  
        clearInterval(interval);
        showResult();
    }
    }, 1000);
}

function showResult() {
    count = 0;
    questionContainerElement.classList.add('hide');
    nextButton.classList.add('hide');
    resultElement.classList.remove('hide');
    document.getElementById('result-score').innerHTML = "You scored: " + score + "! Thanks for taking the quiz!";
}

function save() {
    localStorage.setItem('initials', document.getElementById('initials').value + " - " + score) 

}


// Question Array
const questions = [
    {
        question: 'What year was JavaScript created?',
        answers: [
            {text: '1995', correct: true},
            {text: '2005', correct: false},
            {text: '2015', correct: false},
            {text: '1776', correct: false},
        ]
    },

    {
        question: 'Who designed JavaScript?',
        answers: [
            {text: 'Reggie Java', correct: false},
            {text: 'Brendan Eich', correct: true},
            {text: 'John Script', correct: false},
            {text: 'J.V. Eich', correct: false},
        ]
    },

    {
        question: 'What character combination is used to contain an array?',
        answers: [
            {text: '!!', correct: false},
            {text: '##', correct: false},
            {text: '[]', correct: true},
            {text: '{}', correct: false},
        ]
    },

    {
        question: 'How much Java would a Java Script script, if Java Script could script script?',
        answers: [
            {text: 'One Java', correct: false},
            {text: 'Two Java', correct: false},
            {text: 'Slightly less than half a Java', correct: false},
            {text: 'All the Java', correct: true},
        ]
    },

    {
        question: 'Would you consider JavaScript to be the best coding language?',
        answers: [
            {text: 'Obviously! (Give me points)', correct: true},
            {text: 'Top 5 at best.', correct: true},
            {text: 'JavaWhat?', correct: true},
            {text: 'If I never hear of it again I can die happy.', correct: true},
        ]
    }
]


//Event Listeners
startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion()
})