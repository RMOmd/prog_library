// Interactive Reader & Quiz Engine for Programming Library
'use strict';

class ChapterQuiz {
  constructor(containerId, questions, options = {}) {
    this.container = document.getElementById(containerId);
    this.questions = questions;
    this.options = options;
    this.chapterId = options.chapterId || location.pathname;
    this.userAnswers = {};
    this.score = 0;
    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
    this.loadProgress();
  }

  render() {
    this.container.innerHTML = `
      <div class="quiz-header">
        <div>
          <h2>🧠 Интерактивный квиз для проверки знаний</h2>
          <p>Ответьте на вопросы по материалу главы, чтобы закрепить понимание и проверить себя.</p>
        </div>
        <div class="quiz-score-badge" id="quiz-score-badge">
          Прогресс: 0 / ${this.questions.length}
        </div>
      </div>
      <div class="quiz-questions-list" id="quiz-questions-list"></div>
      <div id="quiz-summary-slot"></div>
    `;

    const list = this.container.querySelector('#quiz-questions-list');
    this.questions.forEach((q, qIndex) => {
      const card = document.createElement('div');
      card.className = 'quiz-card';
      card.id = `q-card-${qIndex}`;

      const optionsHtml = q.options.map((opt, optIndex) => `
        <button type="button" class="quiz-option" data-q="${qIndex}" data-opt="${optIndex}" id="btn-q${qIndex}-opt${optIndex}">
          <span class="option-marker">${String.fromCharCode(65 + optIndex)}</span>
          <span class="option-text">${opt}</span>
        </button>
      `).join('');

      card.innerHTML = `
        <div class="quiz-question-number">Вопрос ${qIndex + 1} из ${this.questions.length}</div>
        <div class="quiz-question-text">${q.question}</div>
        <div class="quiz-options">${optionsHtml}</div>
        <div class="quiz-explanation" id="expl-${qIndex}"></div>
      `;

      list.appendChild(card);
    });

    // Add click listeners to options
    this.container.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const qIdx = parseInt(btn.dataset.q, 10);
        const optIdx = parseInt(btn.dataset.opt, 10);
        this.handleAnswer(qIdx, optIdx);
      });
    });
  }

  handleAnswer(qIndex, selectedOptIndex) {
    if (this.userAnswers[qIndex] !== undefined) return; // already answered

    const q = this.questions[qIndex];
    this.userAnswers[qIndex] = selectedOptIndex;

    const card = this.container.querySelector(`#q-card-${qIndex}`);
    const options = card.querySelectorAll('.quiz-option');
    const explBox = card.querySelector(`#expl-${qIndex}`);

    options.forEach((optBtn, idx) => {
      optBtn.classList.add('locked');
      if (idx === q.correct) {
        optBtn.classList.add('correct');
      } else if (idx === selectedOptIndex) {
        optBtn.classList.add('wrong');
      }
    });

    const isCorrect = (selectedOptIndex === q.correct);
    if (isCorrect) {
      this.score++;
    }

    // Show Explanation
    explBox.innerHTML = `
      <div style="font-weight:700; color:${isCorrect ? '#34d399' : '#f87171'}; margin-bottom:4px;">
        ${isCorrect ? '✔ Верно!' : '✖ Не совсем так.'}
      </div>
      <div>${q.explanation}</div>
    `;
    explBox.classList.add('show');

    this.updateScoreBadge();
    this.saveProgress();

    // If all answered, show summary
    if (Object.keys(this.userAnswers).length === this.questions.length) {
      this.showSummary();
    }
  }

  updateScoreBadge() {
    const badge = this.container.querySelector('#quiz-score-badge');
    const answeredCount = Object.keys(this.userAnswers).length;
    badge.innerHTML = `Баллы: <b>${this.score}</b> из ${this.questions.length} (Ответов: ${answeredCount}/${this.questions.length})`;
    if (this.score === this.questions.length) {
      badge.style.borderColor = '#10b981';
      badge.style.color = '#34d399';
    }
  }

  showSummary() {
    const slot = this.container.querySelector('#quiz-summary-slot');
    const percent = Math.round((this.score / this.questions.length) * 100);
    const perfect = this.score === this.questions.length;

    slot.innerHTML = `
      <div class="quiz-summary-card">
        <h3>${perfect ? '🎉 Превосходно! 100% правильных ответов!' : 'Квиз завершен!'}</h3>
        <p>Ваш результат: <b>${this.score} из ${this.questions.length}</b> (${percent}%). ${perfect ? 'Вы в совершенстве усвоили ключевые концепции этой главы.' : 'Рекомендуем перечитать разделы с ошибками и закрепить материал.'}</p>
        <button type="button" class="quiz-reset-btn" id="quiz-retry-btn">Попробовать снова</button>
      </div>
    `;

    slot.querySelector('#quiz-retry-btn').addEventListener('click', () => {
      this.reset();
    });
  }

  reset() {
    this.userAnswers = {};
    this.score = 0;
    localStorage.removeItem('quiz:' + this.chapterId);
    this.render();
  }

  saveProgress() {
    try {
      localStorage.setItem('quiz:' + this.chapterId, JSON.stringify({
        score: this.score,
        answers: this.userAnswers,
        completed: Object.keys(this.userAnswers).length === this.questions.length
      }));
    } catch (e) {}
  }

  loadProgress() {
    try {
      const data = JSON.parse(localStorage.getItem('quiz:' + this.chapterId) || 'null');
      if (data && data.answers) {
        Object.entries(data.answers).forEach(([qIdx, optIdx]) => {
          this.handleAnswer(parseInt(qIdx, 10), optIdx);
        });
      }
    } catch (e) {}
  }
}

// Scroll Progress Tracker and Global Helpers
document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.getElementById('reading-progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
    });
  }

  // Copy code buttons
  document.querySelectorAll('.copy-code-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const codeContainer = btn.closest('.code-container');
      const code = codeContainer.querySelector('code').innerText;
      navigator.clipboard.writeText(code).then(() => {
        const origText = btn.textContent;
        btn.textContent = 'Скопировано! ✔';
        setTimeout(() => btn.textContent = origText, 2000);
      });
    });
  });
});
