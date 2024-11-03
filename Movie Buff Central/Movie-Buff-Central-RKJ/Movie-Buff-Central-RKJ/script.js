// Quote of the Day
const quotes = [
    "I am Iron Man. – Tony Stark",
    "Whatever happens tomorrow, you must promise me one thing: that you will stay who you are. – Dr. Stephen Strange",
    "I can do this all day. – Steve Rogers",
    "We are Groot. – Groot",
    "It's not about how much we lost, it's about how much we have left. – Tony Stark",
    "Dormammu, I've come to bargain. – Doctor Strange",
    "Puny god. – Hulk",
    "I have nothing to prove to you. – Carol Danvers",
    "I’m always angry. – Bruce Banner",
    "If you're nothing without the suit, then you shouldn't have it. – Tony Stark",
    // Add more quotes as needed
];

const quoteElement = document.getElementById('quote');
const newQuoteBtn = document.getElementById('new-quote');

function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];
}

newQuoteBtn.addEventListener('click', displayRandomQuote);

// Initialize with a quote
displayRandomQuote();

// Trivia Quiz
const quizData = [
    {
        question: "Who is the director of the Avengers in the MCU?",
        options: ["Joss Whedon", "Anthony Russo", "Jon Favreau", "Ryan Coogler"],
        answer: "Joss Whedon"
    },
    {
        question: "What is Thor's hammer called?",
        options: ["Stormbreaker", "Mjolnir", "Gungnir", "Vanir"],
        answer: "Mjolnir"
    },
    {
        question: "Which Infinity Stone is hidden on Vormir?",
        options: ["Soul Stone", "Time Stone", "Mind Stone", "Space Stone"],
        answer: "Soul Stone"
    },
    {
        question: "What is Black Panther's real name?",
        options: ["T'Challa", "Shuri", "N'Jadaka", "Okoye"],
        answer: "T'Challa"
    },
    {
        question: "What is the name of Thor's home?",
        options: ["Asgard", "Vanaheim", "Midgard", "Jotunheim"],
        answer: "Asgard"
    },
    {
        question: "Who is Peter Parker's best friend?",
        options: ["Ned Leeds", "Harry Osborn", "Flash Thompson", "Mary Jane"],
        answer: "Ned Leeds"
    },
    {
        question: "What is the real name of the Winter Soldier?",
        options: ["James Barnes", "Bucky Barnes", "Sam Wilson", "Clint Barton"],
        answer: "Bucky Barnes"
    },
    {
        question: "Which Avenger is known as the 'Sorcerer Supreme'?",
        options: ["Doctor Strange", "Iron Man", "Thor", "Captain America"],
        answer: "Doctor Strange"
    },
    {
        question: "What is Captain America's shield made of?",
        options: ["Vibranium", "Adamantium", "Uru", "Carbonadium"],
        answer: "Vibranium"
    },
    {
        question: "Who is the leader of the Guardians of the Galaxy?",
        options: ["Star-Lord", "Gamora", "Drax", "Rocket"],
        answer: "Star-Lord"
    },
    // Add more questions as needed
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');

function loadQuiz() {
    resetState();
    if (currentQuestion < quizData.length) {
        const currentQuiz = quizData[currentQuestion];
        questionEl.textContent = currentQuiz.question;
        currentQuiz.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            button.addEventListener('click', selectOption);
            optionsEl.appendChild(button);
        });
    } else {
        questionEl.textContent = `Quiz Completed! Your score: ${score}/${quizData.length}`;
        nextBtn.style.display = 'none';
    }
}

function resetState() {
    nextBtn.disabled = true;
    while (optionsEl.firstChild) {
        optionsEl.removeChild(optionsEl.firstChild);
    }
}

function selectOption(e) {
    const selectedBtn = e.target;
    const selectedAnswer = selectedBtn.textContent;
    const correctAnswer = quizData[currentQuestion].answer;

    if (selectedAnswer === correctAnswer) {
        selectedBtn.style.backgroundColor = '#28a745';
        score++;
        scoreEl.textContent = `Score: ${score}`;
    } else {
        selectedBtn.style.backgroundColor = '#dc3545';
        // Highlight the correct answer
        Array.from(optionsEl.children).forEach(button => {
            if (button.textContent === correctAnswer) {
                button.style.backgroundColor = '#28a745';
            }
        });
    }

    // Disable all buttons after selection
    Array.from(optionsEl.children).forEach(button => {
        button.disabled = true;
    });

    nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    loadQuiz();
});

// Initialize Quiz
loadQuiz();

// Load Characters from JSON
fetch('characters.json')
    .then(response => response.json())
    .then(data => {
        const charactersContainer = document.getElementById('characters-container');
        data.forEach(character => {
            const card = document.createElement('div');
            card.classList.add('character-card');

            const img = document.createElement('img');
            img.src = character.image;
            img.alt = character.name;
            img.loading = 'lazy'; // Improves performance by lazy loading images

            const name = document.createElement('h3');
            name.textContent = character.name;

            const description = document.createElement('p');
            description.textContent = character.description;

            const fact = document.createElement('p');
            fact.innerHTML = `<strong>Interesting Fact:</strong> ${character.fact}`;

            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(description);
            card.appendChild(fact);

            charactersContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error loading character data:', error);
        const charactersContainer = document.getElementById('characters-container');
        charactersContainer.innerHTML = '<p>Failed to load character data.</p>';
    });
    
    // Inside the fetch block where character cards are created
    data.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('character-card');
        card.setAttribute('data-aos', 'fade-up'); // Add AOS attribute

        // Rest of the card creation code...
    });
