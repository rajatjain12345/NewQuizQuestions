const questions = [
    {
        q: 'what is the capital of india',
        a: 'new delhi',
        opt: ['jaipur', 'mumbai', 'new delhi', 'kolkata'],
    },
    {
        q: 'which is the national bird of india',
        a: 'peacock',
        opt: ['sparrow', 'peacock', 'pigcon', 'crow'],
    },
    {
        q: 'who won the 2024 cricket t20 world cup',
        a: 'india',
        opt: ['austraila', "south africa", 'west indies', 'india'],
    },
    {
        q: 'who is the president of india',
        a: 'draupdi murmu',
        opt: ['apj abdul kalam', 'naraendar modi', 'draupdi murmu', 'rahul gandhi'],
    },
];

let userAnswers = [];

let count = 0;
let timer = 5;
let isQuestionAnswered = false;

let startBtn = document.querySelector('.startBtn');
let startQuizbtn = document.querySelector('.startQuizbtn');
const questionDiv = document.querySelector(".question");
const timerDiv = document.querySelector('.timer');
let quizDiv = document.querySelector("#quiz");
let scoreDiv = document.querySelector('#score');
let paragraphs = document.querySelectorAll('.option');

// questionDiv.innerHTML = `Question is :- ${(questions[count])}`;

startQuizbtn.addEventListener('click', quizstartnow);

function quizstartnow() {
    quizDiv.classList.remove('hidden');
    startBtn.classList.add('hidden')
    let randomOrder = getARandomorder();
    timerDiv.innerHTML = timer;
    printQuestions();

    let id2 = setInterval(() => {
        if (timer == 1) {
            timer = 5;
            timerDiv.innerHTML = timer;
        } else {
            timer = timer - 1;
            timerDiv.innerHTML = timer;

        }
    }, 1000)

    let id1 = setInterval(() => {
        if (count == questions.length - 1) {

            //To check the last question
            checkUserAnswer();

            //clear the question
            clearInterval(id1);

            //clear the timer
            clearInterval(id2);

            quizDiv.classList.add('hidden');
            scoreDiv.classList.remove('hidden');

            scoreUser();
        } else {
            count = count + 1;

            checkUserAnswer();

            ////Enable option on new questions
            enableAllOptions();

            printQuestions();
        }
    }, 5000);


    function printQuestions() {
        // questionDiv.innerHTML = `Q${count + 1}. ${randomOrder[count].q}`;
        questionDiv.innerHTML = `Q${count + 1}. ${questions[randomOrder[count]].q}`;
        paragraphs.forEach((para, index) => {
            // para.innerHTML = questions[count].opt[index]
            para.innerHTML = questions[randomOrder[count]].opt[index]
        });

    }

    paragraphs.forEach((para, index) => {
        para.addEventListener('click', storeUserAnswer);
    });

    function storeUserAnswer(e) {
        isQuestionAnswered = true;
        userAnswers.push(e.target.innerHTML);
        disableAllOptions();
        console.log(userAnswers)
    }


    function checkUserAnswer() {
        // Insert NULL is user didnt answer
        if (isQuestionAnswered == false) {
            userAnswers.push(null)
            console.log(userAnswers)
        }
        else {
            isQuestionAnswered = false;
        }
    }

    function scoreUser() {
        let finalScore = 0;
        userAnswers.forEach((userans, ind) => {
            if (userans == questions[randomOrder[ind]].a) {
                finalScore = finalScore + 1;
            }
        })
        scoreDiv.innerHTML = `final score is :  ${finalScore} / ${questions.length}`
    }

    function disableAllOptions() {
        paragraphs.forEach((opt, i) => {
            opt.classList.add("pointerdisable");
        })
    }

    function enableAllOptions() {
        paragraphs.forEach((opt, i) => {
            opt.classList.remove('pointerdisable');
        })
    }

    function getARandomorder() {
        // console.log('countvar')
        let temp = [];
        for (let i = 0; i < questions.length; i++) {
            let randomValue = Math.floor(Math.random() * questions.length);
            if (temp.includes(randomValue)) {
                return getARandomorder();
            } else {
                temp.push(randomValue)
            }
        }
        return temp;
    }
}


// console.log(getARandomorder());


