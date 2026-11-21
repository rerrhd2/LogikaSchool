document.addEventListener('DOMContentLoaded', () => {

    const questions = [
        {
            question: "Скільки буде 15 + 27?",
            answers: ["32", "42", "45", "52"],
            correct: 1
        },
        {
            question: "Скільки буде 7 × 8?",
            answers: ["48", "54", "56", "64"],
            correct: 2
        },
        {
            question: "Скільки буде 100 - 37?",
            answers: ["63", "53", "67", "73"],
            correct: 0
        },
        {
            question: "Обчисліть значення виразу: 5 + 3 × 4",
            answers: ["32", "17", "20", "12"],
            correct: 1
        },
        {
            question: "Скільки буде 81 ÷ 9?",
            answers: ["7", "8", "9", "10"],
            correct: 2
        },
        {
            question: "Чому дорівнює 25% від 100?",
            answers: ["5", "10", "20", "25"],
            correct: 3
        },
        {
            question: "Скільки буде 12 × 12?",
            answers: ["124", "134", "144", "154"],
            correct: 2
        },
        {
            question: "Скільки буде 144 ÷ 12?",
            answers: ["10", "12", "14", "16"],
            correct: 1
        },
        {
            question: "Скільки буде 150 - 65?",
            answers: ["75", "85", "95", "80"],
            correct: 1
        },
        {
            question: "Скільки буде 18 + 43?",
            answers: ["51", "61", "71", "63"],
            correct: 1
        },
        {
            question: "Обчисліть: (10 + 5) × 2",
            answers: ["20", "25", "30", "35"],
            correct: 2
        },
        {
            question: "Чому дорівнює 50% від 80?",
            answers: ["20", "30", "40", "50"],
            correct: 2
        },
        {
            question: "Квадратний корінь з 64 дорівнює:",
            answers: ["6", "7", "8", "9"],
            correct: 2
        },
        {
            question: "Скільки буде 9 × 6?",
            answers: ["45", "54", "63", "56"],
            correct: 1
        },
        {
            question: "Скільки буде 120 ÷ 4?",
            answers: ["20", "25", "30", "40"],
            correct: 2
        },
        {
            question: "Чому дорівнює 2 в кубі (2³)?",
            answers: ["6", "8", "16", "9"],
            correct: 1
        },
        {
            question: "Скільки буде 75 + 48?",
            answers: ["113", "123", "133", "125"],
            correct: 1
        },
        {
            question: "Чому дорівнює 10% від 350?",
            answers: ["30", "35", "40", "3.5"],
            correct: 1
        },
        {
            question: "Обчисліть: 45 ÷ 5 + 7",
            answers: ["14", "15", "16", "18"],
            correct: 2
        },
        {
            question: "Скільки буде 300 - 145?",
            answers: ["145", "155", "165", "150"],
            correct: 1
        }
    ];

    const startScreen = document.querySelector("#start-screen");
    const quizScreen = document.querySelector("#quiz-screen");
    const resultScreen = document.querySelector("#result-screen");

    const startBtn = document.querySelector("#start-btn") || document.querySelector(".start-btn");
    const restartBtn = document.querySelector("#restart-btn");
    const idkBtn = document.querySelector("#IDK");

    const resultText = document.querySelector(".result-text");
    const finalScore = document.querySelector("#final-score");

    const questionText = document.querySelector("#question-text");
    const answersContainer = document.querySelector("#answers-container");
    const timerDisplay = document.querySelector("#timer");

    let questionIndex = 0;
    let score = 0;
    let timer = 15;
    let interval;

    function startTimer() {
        timer = 15;
        if (timerDisplay) timerDisplay.innerText = timer;

        interval = setInterval(() => {
            timer--;
            if (timerDisplay) timerDisplay.innerText = timer;

            if (timer <= 0) {
                clearInterval(interval);
                nextQuestion();
            }
        }, 1000);
    }

    function showQuestion(question) {
        clearInterval(interval);

        answersContainer.innerHTML = "";
        questionText.innerText = question.question;

        question.answers.forEach((answer, i) => {
            const button = document.createElement("button");
            button.innerText = answer;
            button.classList.add("answer-btn");

            button.addEventListener("click", () => {
                checkAnswer(i);
            });

            answersContainer.appendChild(button);
        });

        startTimer();
    }

    function checkAnswer(answerIndex) {
        clearInterval(interval);

        const buttons = document.querySelectorAll(".answer-btn");
        buttons.forEach(btn => btn.disabled = true);

        if (answerIndex === questions[questionIndex].correct) {
            score++;
        }

        setTimeout(nextQuestion, 1000);
    }

    function nextQuestion() {
        clearInterval(interval);
        questionIndex++;

        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }

    function showResult() {
        clearInterval(interval);

        const accuracy = Math.round((score / questions.length) * 100);

        if (resultText) {
            resultText.innerText = `Твій результат: ${score}/${questions.length} (${accuracy}%)`;
        }
        if (finalScore) {
            finalScore.innerText = score;
        }

        if (quizScreen) quizScreen.classList.add("hide");
        if (resultScreen) resultScreen.classList.remove("hide");
    }

    function startGame() {
        const image = document.querySelector('img[src*="cd2e992d-fcba-492d-9cd7-3d5b004e8b19.webp"]') || document.querySelector('img');
        if (image) {
            image.remove();
        }

        questionIndex = 0;
        score = 0;

        if (startScreen) startScreen.classList.add("hide");
        if (resultScreen) resultScreen.classList.add("hide");
        if (quizScreen) quizScreen.classList.remove("hide");

        showQuestion(questions[questionIndex]);
    }

    if (idkBtn) {
        idkBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const correctIdx = questions[questionIndex].correct;
            const buttons = document.querySelectorAll("#answers-container button");

            if (buttons[correctIdx]) {
                buttons[correctIdx].classList.add("correct");
            }
        });
    }

    if (startBtn) startBtn.addEventListener("click", startGame);
    if (restartBtn) restartBtn.addEventListener("click", startGame);

});