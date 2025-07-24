// Get DOM elements
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score-value');
const restartButton = document.getElementById('restart-btn');
const balloonContainer = document.getElementById('balloon-container');
const weldoneText = document.getElementById('weldone-text');

// Array of questions and answers
const questions = [
    {
        question: 'When did Manchester United win their first UCL?',
        answers: [
            { text: '1066', correct: false },
            { text: '1968', correct: true },
            { text: '2024', correct: false },
            { text: '1999', correct: false }
        ]
    },
    {
        question: 'What color is the Manchester United home kit?',
        answers: [
            { text: 'Green', correct: false },
            { text: 'Blue', correct: false },
            { text: 'Pink', correct: false },
            { text: 'Red', correct: true }
        ]
    },
    {
        question: 'Who is the top scorer for Manchester United?',
        answers: [
            { text: 'Wayne Rooney', correct: true },
            { text: 'Cristiano Ronaldo', correct: false },
            { text: 'Phil Jones', correct: false },
            { text: 'Bobby Charlton', correct: false }
        ]
    },
    {
        question: 'How many times have Manchester United won the FA Cup?',
        answers: [
            { text: '14', correct: false },
            { text: '11', correct: false },
            { text: '15', correct: false },
            { text: '12', correct: true }
        ]
    },
    {
        question: 'When did Manchester United last win the Premier League?',
        answers: [
            { text: '2016/17', correct: false },
            { text: '2011/12', correct: false },
            { text: '2014/13', correct: false },
            { text: '2012/13', correct: true }
        ]
    },
    {
        question: 'Which Manchester United manager was said to be At The Wheel?',
        answers: [
            { text: 'Alex Ferguson', correct: false },
            { text: 'Ole Gunnar Solskjaer', correct: true },
            { text: 'Louis Van Gaal', correct: false },
            { text: 'Jose Mourinho', correct: false }
        ]
    },
    {
        question: 'Which one of these players has played for Manchester United? ',
        answers: [
            { text: 'Heung Min Son', correct: false },
            { text: 'Mesut Ozil', correct: false },
            { text: 'Neymar Jr', correct: false },
            { text: 'Edinson Cavani', correct: true }
        ]
    },
    {
        question: 'How many premier league trophies did Sir Alex Ferguson win with Manchester United?',
        answers: [
            { text: '15', correct: false },
            { text: '17', correct: false },
            { text: '11', correct: false },
            { text: '13', correct: true }
        ]
    },
    {
        question: 'How many own goals has Phil Jones scored at Manchester United?',
        answers: [
            { text: '14', correct: false },
            { text: '19', correct: false },
            { text: '23', correct: true },
            { text: '15', correct: false }
        ]
    },

    {
        question: 'Which Manchester United manager was said to be At The Wheel?',
        answers: [
            { text: 'Alex Ferguson', correct: false },
            { text: 'Ole Gunnar Solskjaer', correct: true },
            { text: 'Louis Van Gaal', correct: false },
            { text: 'Jose Mourinho', correct: false }
        ]
    },
    {
        question: 'In 2009, how much was Cristiano Ronaldo sold to Real Madrid for?',
        answers: [
            { text: '£90 million', correct: false },
            { text: '£80 million', correct: true },
            { text: '£74 million', correct: false },
            { text: '£64 million', correct: false }
        ]
    }
];

// Initialize variables
let shuffledQuestions, currentQuestionIndex;
let score = 0;

// Add event listeners
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

restartButton.addEventListener('click', startGame);

// Initially hide certain elements
questionContainerElement.classList.add('hide');
balloonContainer.classList.add('hide');
weldoneText.style.opacity = '0';




// Set the next question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    resultElement.classList.add('hide');

    // Hide the balloons and "Well done!" text when moving to the next question
    balloonContainer.classList.add('hide');
    weldoneText.style.opacity = '0';
}

// Show the question and answer buttons
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

// Reset the answer buttons
function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Handle answer selection
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
        button.removeEventListener('click', selectAnswer);
        button.disabled = true;
    });
    if (correct) {
        resultElement.innerHTML = 'Correct!';
        resultElement.classList.remove('wrong');
        resultElement.classList.add('correct');
        incrementScore();
    } else {
        resultElement.innerHTML = 'Incorrect!';
        resultElement.classList.remove('correct');
        resultElement.classList.add('wrong');
    }
    resultElement.classList.remove('hide');
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        restartButton.innerText = 'Restart';
        restartButton.classList.remove('hide');
        // Show the balloons and "Well done!" text only if the score is above zero
        if (score > 0) {
            showBalloons();
        }
    }

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        restartButton.innerText = 'Restart';
        restartButton.classList.remove('hide');
        // Show the balloons and "Well done!" text only if the score is 4 or above
        if (score >= 4) {
            showBalloons();
        }
    }
}

// Show the balloons and "Well done!" text
function showBalloons() {
    createBalloons(30); // Create the balloons here
    balloonContainer.classList.remove('hide');
    weldoneText.style.opacity = '1';
}

// Set the status class (correct or wrong)
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

// Clear the status class
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

// Increment the score
function incrementScore() {
    score++;
    scoreElement.innerText = score;
}

function random(num) {
    return Math.floor(Math.random() * num);
}

function getRandomStyles() {
    const r = random(255);
    const g = random(255);
    const b = random(255);
    const mt = random(200);
    const ml = random(50);
    const dur = random(5) + 5;
    return `
        background-color: rgba(${r},${g},${b},0.7);
        color: rgba(${r},${g},${b},0.7); 
        box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
        margin: ${mt}px 0 0 ${ml}px;
        animation: float ${dur}s ease-in infinite
    `;
}

function createBalloons(num) {
    for (let i = num; i > 0; i--) {
        const balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.cssText = getRandomStyles();
        balloonContainer.append(balloon);
    }
}

function removeBalloons() {
    balloonContainer.style.opacity = 0;
    setTimeout(() => {
        balloonContainer.remove();
    }, 500);
}

// Start the game
function startGame() {
    startButton.classList.add('hide');
    restartButton.classList.add('hide');
    balloonContainer.classList.add('hide');
    weldoneText.style.opacity = '0';

    // Remove existing balloons
    while (balloonContainer.firstChild) {
        balloonContainer.removeChild(balloonContainer.firstChild);
    }

    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    score = 0;
    scoreElement.innerText = score;
    setNextQuestion();
}
