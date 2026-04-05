const questionsDatabase = [
    // ТИП 1: Смеси и чистые вещества
    {
        type: 1,
        variants: [
            { q: "Выберите ЧИСТОЕ вещество: 1) Морская вода, 2) Воздух, 3) Дистиллированная вода", correct: "3", hint: "Морская вода содержит соли, воздух — смесь газов. Только дистиллированная вода — это H₂O." },
            { q: "Выберите СМЕСЬ: 1) Железо, 2) Молоко, 3) Кислород", correct: "2", hint: "Молоко — это сложная смесь белков, жиров и воды." }
        ]
    },
    // ТИП 2: Физ/Хим явления
    {
        type: 2,
        variants: [
            { q: "Признак ХИМИЧЕСКОЙ реакции при горении свечи:", correct: "выделение света", hint: "Горение — это окисление, сопровождающееся свечением и теплом." },
            { q: "Какое явление ФИЗИЧЕСКОЕ? 1) Плавление льда, 2) Ржавление гвоздя", correct: "1", hint: "При плавлении состав воды не меняется, меняется только агрегатное состояние." }
        ]
    },
    // ТИП 3: Молярная масса (упрощенно для примера)
    {
        type: 3,
        variants: [
            { q: "Рассчитайте M(CO₂). В ответе только число.", correct: "44", hint: "C(12) + O(16)*2 = 44 г/моль." },
            { q: "Рассчитайте M(NH₃). В ответе только число.", correct: "17", hint: "N(14) + H(1)*3 = 17 г/моль." }
        ]
    },
    // ТИП 4: Атом
    {
        type: 4,
        variants: [
            { q: "Сумма p и e в нейтральном атоме = 22. Какой это порядковый номер?", correct: "11", hint: "В нейтральном атоме p=e, значит 22/2 = 11 (Натрий)." }
        ]
    },
    // ТИП 5: Задачи (сок)
    {
        type: 5,
        variants: [
            { q: "В 200г сока 10% сахара. Сколько грамм сахара?", correct: "20", hint: "200 * 0.10 = 20г." }
        ]
    }
];

let currentMode = '';
let currentQuestionIndex = 0;
let score = 0;
let selectedVariants = [];

function startApp(mode) {
    currentMode = mode;
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    
    // Выбираем по одному случайному варианту для каждого из 5 типов
    selectedVariants = questionsDatabase.map(db => {
        const randomIndex = Math.floor(Math.random() * db.variants.length);
        return db.variants[randomIndex];
    });
    
    showQuestion();
}

function showQuestion() {
    const qData = selectedVariants[currentQuestionIndex];
    const box = document.getElementById('question-box');
    const expl = document.getElementById('explanation');
    const nextBtn = document.getElementById('next-btn');
    
    expl.classList.add('hidden');
    nextBtn.classList.add('hidden');
    
    box.innerHTML = `
        <h3>Задание ${currentQuestionIndex + 1}</h3>
        <p>${qData.q}</p>
        <input type="text" id="answer-input" placeholder="Ваш ответ...">
        <button onclick="checkAnswer()" class="btn btn-neon-blue">Проверить</button>
    `;
}

function checkAnswer() {
    const userAns = document.getElementById('answer-input').value.trim().toLowerCase();
    const qData = selectedVariants[currentQuestionIndex];
    const expl = document.getElementById('explanation');
    
    if (userAns === qData.correct.toLowerCase()) {
        score++;
        if (currentMode === 'study') {
            expl.innerHTML = `<span style="color:var(--neon-green)">Верно!</span><br>${qData.hint}`;
        }
    } else {
        if (currentMode === 'study') {
            expl.innerHTML = `<span style="color:red">Ошибка!</span> Правильный ответ: ${qData.correct}<br>${qData.hint}`;
        }
    }
    
    if (currentMode === 'study') expl.classList.remove('hidden');
    document.getElementById('next-btn').classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedVariants.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('final-score').innerText = `${score} / ${selectedVariants.length}`;
    
    let grade = '';
    if (score === 5) grade = "Отлично! Ты готов к ВПР!";
    else if (score >= 3) grade = "Хорошо, но стоит повторить теорию.";
    else grade = "Нужно больше практики.";
    
    document.getElementById('grade-text').innerText = grade;
}
