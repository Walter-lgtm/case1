// Ждем полной загрузки DOM, чтобы кнопки точно работали на мобилках
document.addEventListener('DOMContentLoaded', () => {
    console.log("VPR-TRAINER 8.0 запущен");
});

const questionsDatabase = [
    {
        type: 1,
        variants: [
            { q: "Выберите ЧИСТОЕ вещество: 1) Морская вода, 2) Воздух, 3) Дистиллированная вода", correct: "3", hint: "Морская вода и воздух — это смеси. Дистиллят — чистая H₂O." },
            { q: "Выберите СМЕСЬ: 1) Поваренная соль, 2) Нефть, 3) Золото", correct: "2", hint: "Нефть — смесь углеводородов. Соль и золото — чистые вещества." },
            { q: "Что является чистым веществом? 1) Молоко, 2) Сахар (сахароза), 3) Гранит", correct: "2", hint: "Молоко и гранит — сложные смеси веществ." },
            { q: "Выберите смесь: 1) Углекислый газ, 2) Медь, 3) Раствор йода", correct: "3", hint: "Раствор — это всегда смесь (йод + спирт)." },
            { q: "Выберите чистое вещество: 1) Сталь, 2) Кислород, 3) Почва", correct: "2", hint: "Сталь — сплав, почва — смесь. Кислород — вещество." }
        ]
    },
    {
        type: 2,
        variants: [
            { q: "Признак ХИМИЧЕСКОЙ реакции при скисании молока:", correct: "появление запаха", hint: "Скисание — химический процесс с образованием новых веществ." },
            { q: "Какое явление ФИЗИЧЕСКОЕ? 1) Горение магния, 2) Таяние мороженого", correct: "2", hint: "При таянии меняется только агрегатное состояние." },
            { q: "Выберите химическое явление: 1) Ржавление гвоздя, 2) Испарение воды", correct: "1", hint: "Ржавление — это окисление железа (появление нового вещества)." },
            { q: "Признак реакции горения метана:", correct: "выделение тепла", hint: "Горение всегда сопровождается выделением тепла и света." },
            { q: "Что НЕ является химической реакцией? 1) Дыхание, 2) Замерзание воды", correct: "2", hint: "Замерзание — физический процесс (смена состояния)." }
        ]
    },
    {
        type: 3,
        variants: [
            { q: "Рассчитайте M(CH₄). В ответе только число.", correct: "16", hint: "C(12) + H(1)*4 = 16 г/моль." },
            { q: "Какой газ ТЯЖЕЛЕЕ воздуха (29)? 1) N₂, 2) CO₂, 3) CH₄", correct: "2", hint: "M(CO₂) = 44, это больше 29." },
            { q: "Рассчитайте M(SO₂). В ответе только число.", correct: "64", hint: "S(32) + O(16)*2 = 64 г/моль." },
            { q: "Какой газ ЛЕГЧЕ воздуха (29)? 1) O₂, 2) NH₃, 3) Cl₂", correct: "2", hint: "M(NH₃) = 17, это меньше 29." },
            { q: "Рассчитайте M(NaOH). В ответе только число.", correct: "40", hint: "Na(23) + O(16) + H(1) = 40 г/моль." }
        ]
    },
    {
        type: 4,
        variants: [
            { q: "Сумма протонов и электронов = 12. Какой это порядковый номер?", correct: "6", hint: "В атоме p=e, значит 12/2 = 6 (Углерод)." },
            { q: "Число протонов в атоме равно 15. Какой это элемент?", correct: "фосфор", hint: "15-й номер в таблице — Фосфор." },
            { q: "Сумма p + e = 32. В какой ГРУППЕ находится элемент?", correct: "6", hint: "32/2 = 16 (Сера). Сера в 6 группе." },
            { q: "Атом имеет 3 слоя и 1 электрон на внешнем слое. Порядковый номер?", correct: "11", hint: "Это Натрий (Na)." },
            { q: "Сумма p + e = 26. В каком ПЕРИОДЕ находится элемент?", correct: "3", hint: "26/2 = 13 (Алюминий). Он в 3 периоде." }
        ]
    },
    {
        type: 5,
        variants: [
            { q: "В 300г сока 12% сахара. Сколько грамм сахара?", correct: "36", hint: "300 * 0.12 = 36г." },
            { q: "Сколько грамм соли в 500г 0,9% физраствора?", correct: "4.5", hint: "500 * 0.009 = 4.5г." },
            { q: "Вы выпили 100г сока (15% сахара). Норма 300г. Какая это доля (%) от нормы?", correct: "5", hint: "100*0.15 = 15г. (15/300)*100 = 5%." },
            { q: "В чае (200г) две ложки сахара по 5г. Какова массовая доля (%) сахара?", correct: "5", hint: "10г сахара на 200г чая: (10/200)*100 = 5%." },
            { q: "В морской воде 3% соли. Сколько грамм соли в 1000г воды?", correct: "30", hint: "1000 * 0.03 = 30г." }
        ]
    }
];

let currentMode = '';
let currentQuestionIndex = 0;
let score = 0;
let selectedVariants = [];

// Глобальная функция для кнопок
window.startApp = function(mode) {
    currentMode = mode;
    currentQuestionIndex = 0;
    score = 0;
    
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    
    // Выбор случайных вопросов
    selectedVariants = questionsDatabase.map(db => {
        const randomIndex = Math.floor(Math.random() * db.variants.length);
        return db.variants[randomIndex];
    });
    
    showQuestion();
};

function showQuestion() {
    const qData = selectedVariants[currentQuestionIndex];
    const box = document.getElementById('question-box');
    const expl = document.getElementById('explanation');
    const nextBtn = document.getElementById('next-btn');
    
    document.getElementById('progress').innerText = `Вопрос ${currentQuestionIndex + 1} из ${selectedVariants.length}`;
    expl.classList.add('hidden');
    nextBtn.classList.add('hidden');
    
    box.innerHTML = `
        <p style="font-size: 1.1rem; margin-bottom: 20px;">${qData.q}</p>
        <input type="text" id="answer-input" placeholder="Введите ответ..." inputmode="text">
        <br>
        <button onclick="checkAnswer()" class="btn btn-neon-blue" style="margin-top: 15px;">Проверить</button>
    `;
    
    // Автофокус на ввод для удобства
    setTimeout(() => document.getElementById('answer-input').focus(), 100);
}

window.checkAnswer = function() {
    const inputField = document.getElementById('answer-input');
    const userAns = inputField.value.trim().toLowerCase();
    const qData = selectedVariants[currentQuestionIndex];
    const expl = document.getElementById('explanation');
    
    if (userAns === qData.correct.toLowerCase()) {
        score++;
        if (currentMode === 'study') {
            expl.innerHTML = `<span style="color:var(--neon-green)">✨ Верно!</span><br><small>${qData.hint}</small>`;
        }
    } else {
        if (currentMode === 'study') {
            expl.innerHTML = `<span style="color:#ff4444">❌ Ошибка!</span><br>Правильный ответ: <b>${qData.correct}</b><br><small>${qData.hint}</small>`;
        }
    }
    
    if (currentMode === 'study') expl.classList.remove('hidden');
    document.getElementById('next-btn').classList.remove('hidden');
};

window.nextQuestion = function() {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedVariants.length) {
        showQuestion();
    } else {
        showResults();
    }
};

function showResults() {
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('final-score').innerText = `${score} / ${selectedVariants.length}`;
    
    let grade = score === 5 ? "Отлично! Ты мастер химии!" : score >= 3 ? "Хороший результат!" : "Нужно еще потренироваться.";
    document.getElementById('grade-text').innerText = grade;
}
