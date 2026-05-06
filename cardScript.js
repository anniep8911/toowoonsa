import { que } from './card_data.js';

const STORAGE_KEY = 'quiz_system_v22_final';
const CLEAR_KEY = 'quiz_clear_list'; 

let quizStack = [];
let currentIdx = 0;
let correctCount = 0;
let totalAttempts = 0;
let animating = false;
let wrongCounts = {}; 
// '확실해!' 목록 (리셋해도 유지됨)
let clearSet = new Set(JSON.parse(localStorage.getItem(CLEAR_KEY) || '[]')); 
let focusMode = false; 

const stage = document.getElementById('stage');
const progressBar = document.getElementById('progressBar');
const counter = document.getElementById('counter');
const correctDisplay = document.getElementById('correctCount');

// --- 1. 데이터 관리 로직 ---

function saveProgress() {
    const data = { quizStack, currentIdx, correctCount, totalAttempts, wrongCounts };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem(CLEAR_KEY, JSON.stringify([...clearSet]));
}

function initQuiz() {
    quizStack = que.filter(item => !clearSet.has(item.main));
    currentIdx = 0;
    correctCount = 0;
}

function loadProgress() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
        initQuiz();
        return;
    }
    try {
        const data = JSON.parse(saved);
        quizStack = (data.quizStack || []).filter(item => item && !clearSet.has(item.main));
        currentIdx = data.currentIdx || 0;
        correctCount = data.correctCount || 0;
        totalAttempts = data.totalAttempts || 0;
        wrongCounts = data.wrongCounts || {};
    } catch (e) {
        initQuiz();
    }
}

// --- 2. 집중 문제 모드 ---

window.toggleFocusMode = () => {
    focusMode = !focusMode;
    const focusBtn = document.getElementById('focusBtn');
    
    if (focusMode) {
        quizStack = que.filter(item => (wrongCounts[item.main] || 0) >= 3);
        focusBtn.textContent = "전체 문제 보기";
        focusBtn.style.background = "#ff4b2b";
    } else {
        initQuiz();
        focusBtn.textContent = "집중 문제 풀기 (♣3↑)";
        focusBtn.style.background = "#444";
    }
    currentIdx = 0;
    correctCount = 0;
    renderNextCard();
};

// --- 3. 보기 생성 엔진 ---

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function getRandomDistractors(excludeArray, count) {
    const allAnswers = que.flatMap(item => (Array.isArray(item.answer) ? item.answer : [item.answer]));
    const uniquePool = [...new Set(allAnswers.filter(ans => !excludeArray.includes(ans)))];
    return shuffle(uniquePool).slice(0, count);
}

function prepareChoices(q) {
    if (q.fixedChoices) return;
    const originalAnswers = Array.isArray(q.answer) ? q.answer.map(String) : [String(q.answer)];
    
    if (q.type === 'ox') {
        q.fixedChoices = ['O', 'X'];
        q.fixedAnswers = originalAnswers;
    } else {
        let selectedAnswers = originalAnswers.length >= 5 ? shuffle([...originalAnswers]).slice(0, 5) : [...originalAnswers];
        const distractors = getRandomDistractors(originalAnswers, 5 - selectedAnswers.length);
        q.fixedChoices = shuffle([...selectedAnswers, ...distractors]);
        q.fixedAnswers = selectedAnswers;
    }
}

// --- 4. 렌더링 엔진 ---

function renderNextCard() {
    updateUI();
    if (!stage) return;
    stage.innerHTML = '';
    animating = false;

    if (currentIdx >= quizStack.length) {
        if (quizStack.length === 0 && !focusMode) {
            stage.innerHTML = `<div class="card">모든 문제를 '확실해!' 처리하셨습니다.</div>`;
        } else if (quizStack.length === 0 && focusMode) {
            stage.innerHTML = `<div class="card">집중 학습할 문제가 없습니다.</div>`;
        } else {
            showDone();
        }
        return;
    }

    const q = quizStack[currentIdx];
    prepareChoices(q);

    const card = document.createElement('div');
    card.className = 'card active';

    const topBar = document.createElement('div');
    topBar.style.cssText = 'display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;';

    const cloverContainer = document.createElement('div');
    const wCount = wrongCounts[q.main] || 0;
    for (let i = 0; i < wCount; i++) {
        const clover = document.createElement('span');
        clover.textContent = '♣';
        clover.style.cssText = 'font-size:12px; color:#ff4b2b; margin-right:2px;';
        cloverContainer.appendChild(clover);
    }

    const clearLabel = document.createElement('label');
    clearLabel.style.cssText = 'font-size:12px; color:#2ecc71; cursor:pointer; font-weight:bold;';
    clearLabel.innerHTML = `<input type="checkbox" id="clearChk"> 확실해!`;
    const chk = clearLabel.querySelector('input');
    if (clearSet.has(q.main)) chk.checked = true;
    
    chk.onchange = (e) => {
        e.stopPropagation();
        if (chk.checked) clearSet.add(q.main);
        else clearSet.delete(q.main);
        localStorage.setItem(CLEAR_KEY, JSON.stringify([...clearSet]));
    };

    topBar.appendChild(cloverContainer);
    topBar.appendChild(clearLabel);
    card.appendChild(topBar);

    if (q.type === 'ox') {
        card.insertAdjacentHTML('beforeend', `
            <div class="card-label">OX QUIZ</div>
            <div class="card-main">${q.main}</div>
            <div class="card-divider"></div>
            <div class="card-sentence" style="margin-bottom:20px; font-size:18px;">${q.sentence}</div>
            <div class="choices" style="display:flex; gap:15px;">
                <button class="choice-btn ox-btn" style="flex:1; height:80px; font-size:24px;">O</button>
                <button class="choice-btn ox-btn" style="flex:1; height:80px; font-size:24px;">X</button>
            </div>
            <div class="result-badge"></div>`);
        card.querySelectorAll('.ox-btn').forEach(btn => {
            btn.onclick = () => !animating && handleResult(btn.textContent === String(q.answer), q, [String(q.answer)], [btn.textContent]);
        });
    } else if (q.type === 'blank') {
        let realAnswersInOrder = [];
        const pattern = new RegExp(`(${q.fixedAnswers.map(s => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')).join('|')})`, 'g');
        const processedSentence = q.sentence.replace(pattern, (m) => { realAnswersInOrder.push(m); return `<span class="hole">____</span>`; });
        card.insertAdjacentHTML('beforeend', `
            <div class="card-label">FILL IN THE BLANK</div>
            <div class="sentence-area" style="line-height:2.5; font-size:18px; margin-bottom:20px;">${processedSentence}</div>
            <div class="choices">${q.fixedChoices.map(c => `<button class="choice-btn multi-btn">${c}</button>`).join('')}</div>
            <button class="submit-btn" id="submitBtn" style="margin-top:15px; width:100%;">정답 제출</button>
            <div class="result-badge"></div>`);
        setupBlankLogic(card, realAnswersInOrder, q);
    } else {
        card.insertAdjacentHTML('beforeend', `
            <div class="card-label">MULTI-SELECT</div>
            <div class="card-main">${q.main}</div>
            <div class="card-divider"></div>
            <div class="choices">${q.fixedChoices.map(c => `<button class="choice-btn multi-btn">${c}</button>`).join('')}</div>
            <button class="submit-btn" id="submitBtn" style="margin-top:15px; width:100%;">답안 제출</button>
            <div class="result-badge"></div>`);
        setupMultiSelectLogic(card, q.fixedAnswers, q);
    }
    stage.appendChild(card);
}

// (setupBlankLogic, setupMultiSelectLogic 생략 - 이전 답변과 동일)
function setupBlankLogic(card, realAnswersInOrder, questionData) {
    const multiBtns = card.querySelectorAll('.multi-btn');
    const holes = card.querySelectorAll('.hole');
    const submitBtn = card.querySelector('#submitBtn');
    let selectedTexts = new Array(holes.length).fill(null);
    multiBtns.forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation(); if (animating) return;
            const emptyIdx = selectedTexts.indexOf(null);
            if (emptyIdx !== -1) {
                selectedTexts[emptyIdx] = btn.textContent;
                holes[emptyIdx].textContent = btn.textContent;
                holes[emptyIdx].style.color = "var(--accent)";
            }
        };
    });
    holes.forEach((hole, idx) => {
        hole.onclick = (e) => {
            e.stopPropagation(); if (animating) return;
            selectedTexts[idx] = null;
            hole.textContent = "____";
            hole.style.color = "#ccc";
        };
    });
    submitBtn.onclick = (e) => {
        e.stopPropagation(); if (animating || selectedTexts.includes(null)) return;
        const isCorrect = selectedTexts.every((val, idx) => val === realAnswersInOrder[idx]);
        handleResult(isCorrect, questionData, realAnswersInOrder, selectedTexts);
    };
}

function setupMultiSelectLogic(card, correctList, questionData) {
    const multiBtns = card.querySelectorAll('.multi-btn');
    const submitBtn = card.querySelector('#submitBtn');
    let selectedTexts = [];
    multiBtns.forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation(); if (animating) return;
            btn.classList.toggle('selected');
            const txt = btn.textContent;
            if (btn.classList.contains('selected')) selectedTexts.push(txt);
            else selectedTexts = selectedTexts.filter(t => t !== txt);
        };
    });
    submitBtn.onclick = (e) => {
        e.stopPropagation(); if (animating || selectedTexts.length === 0) return;
        const isCorrect = JSON.stringify([...selectedTexts].sort()) === JSON.stringify([...correctList].sort());
        handleResult(isCorrect, questionData, correctList, selectedTexts);
    };
}

// --- 5. 결과 처리 (확실해 검증) ---

function handleResult(isSuccess, questionData, correctToHighlight, userSelections = []) {
    animating = true;
    totalAttempts++;
    const card = stage.querySelector('.card');
    const badge = card.querySelector('.result-badge');
    const allBtns = card.querySelectorAll('.choice-btn, .multi-btn, #submitBtn');
    
    allBtns.forEach(btn => {
        btn.style.pointerEvents = 'none';
        if (correctToHighlight.includes(btn.textContent)) btn.classList.add('correct');
        else if (userSelections.includes(btn.textContent)) btn.classList.add('wrong');
    });

    if (isSuccess) {
        correctCount++;
        badge.textContent = '⭕';
        badge.className += ' show';
        setTimeout(() => {
            card.classList.add('fly-away');
            setTimeout(proceedToNext, 600);
        }, 400);
    } else {
        wrongCounts[questionData.main] = (wrongCounts[questionData.main] || 0) + 1;
        
        // 장담했는데 틀렸다면 '확실해'에서 즉시 탈락
        if (clearSet.has(questionData.main)) {
            clearSet.delete(questionData.main);
            localStorage.setItem(CLEAR_KEY, JSON.stringify([...clearSet]));
        }

        quizStack.push(questionData);
        badge.textContent = '❌';
        badge.className += ' show';

        const guide = document.createElement('div');
        guide.innerHTML = "틀렸습니다! (확실해 해제)<br>터치하여 계속";
        guide.style.cssText = "font-size:12px; color:#ff4b2b; margin-top:15px; text-align:center; font-weight:bold;";
        card.appendChild(guide);

        card.style.cursor = 'pointer';
        card.onclick = () => {
            card.classList.add('drop-away');
            setTimeout(proceedToNext, 600);
        };
    }

    function proceedToNext() {
        currentIdx++;
        saveProgress();
        renderNextCard();
    }
}

function updateUI() {
    if (!progressBar || !counter) return;
    const total = quizStack.length; 
    const progress = total === 0 ? 0 : Math.min((currentIdx / total) * 100, 100);
    progressBar.style.width = `${progress}%`;
    counter.textContent = `${currentIdx} / ${total}`;
    if (correctDisplay) correctDisplay.textContent = correctCount;
}

// --- 6. 종료 화면 및 확실해 데이터 출력 (추가된 부분) ---

function showDone() {
    stage.style.display = 'none';
    const doneScreen = document.getElementById('doneScreen');
    if (!doneScreen) return;
    
    doneScreen.classList.add('visible');

    // 1. 확실해! 목록을 배열로 추출 (띄어쓰기 등 원본 유지)
    const confirmedMains = Array.from(clearSet);

    if (confirmedMains.length > 0) {
        const clearArea = document.createElement('div');
        clearArea.style.cssText = 'margin-top:20px; padding:15px; background:#f0fff4; border:1px solid #c6f6d5; border-radius:10px;';
        
        // 2. 결과 화면에 배열 형태 텍스트 출력
        clearArea.innerHTML = `
            <p style="font-weight:bold; color:#2f855a; margin-bottom:10px;">✅ 확실해! 완료된 목록 (${confirmedMains.length}건)</p>
            <textarea readonly style="width:100%; height:100px; padding:10px; font-family:monospace; font-size:12px; border:1px solid #ddd; border-radius:5px; background:#fff;">${JSON.stringify(confirmedMains, null, 2)}</textarea>
            <button id="copyBtn" style="margin-top:10px; width:100%; padding:8px; background:#2f855a; color:white; border:none; border-radius:5px; cursor:pointer;">배열 데이터 복사</button>
        `;
        
        doneScreen.appendChild(clearArea);

        document.getElementById('copyBtn').onclick = function() {
            const textarea = clearArea.querySelector('textarea');
            textarea.select();
            document.execCommand('copy');
            this.textContent = "복사되었습니다!";
            setTimeout(() => this.textContent = "배열 데이터 복사", 2000);
        };
    }
}

// --- 7. 초기화 ---

document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    renderNextCard();
    
    document.getElementById('resetBtn').onclick = () => {
        if (confirm("진행 기록을 초기화합니다. (확실해! 목록은 유지됩니다)")) {
            localStorage.removeItem(STORAGE_KEY);
            location.reload();
        }
    };
});

window.restart = () => { localStorage.removeItem(STORAGE_KEY); location.reload(); };