import { que } from './card_data.js';

const STORAGE_KEY = 'quiz_system_v21_issue_reporter';

// --- 전역 설정 변수 ---
let left = true; 

const excludeList = [
    "배당소득 수입시기", "이자소득 이중과세 조정", "비거주자 투자소득 세율", "가능 총소득/순영업소득 정의",
    "양도소득 신고기관", "비과세 종합저축 기준", "직장공제회 과세방법", "장기채권 분리과세 결정",
    "주관회사 업무 제한 요건", "ELW 핵심 설명서 제공 여부", "생명보험 상품의 가격 구조", "체증식 보험의 특징",
    "정액보험의 정의", "장기손해보험 계약 유지 조건", "저당대출지분이전증권(MPTS) 정의", "전환 증권차익거래 선호 CB",
    "증권 분석기관의 범위", "지방채증권 투자 한도", "상속 증여와 증권거래세", "이자연계 파생결합채권",
    "미국달러표시 채권 발행 형태", "주택 저당채권의 신용 등급", "채권과 주식의 발행주체 비교", "채권발행방식의 특징",
    "회사내부자의 범위", "회사윤리 구성 요소", "수익상환 채권의 가치 평가", "수익률 역전 그룹이상현상",
    "수익증권의 형태", "실물관련 펀드 수익률 변동성", "약정수익률의 정의", "지역권 승역지의 특징",
    "자연환경 보전지역 내 물건 적치 허가 요건", "을종관리신탁의 목적", "연금저축신탁의 요건", "부동산의 장래 가치 불확실성 사유",
    "토지 매입 시 계약 원칙", "사모투자회사(PEF) 등기 사항", "PEF 사원의 구성 및 상법 적용", "환매금지형 펀드 추가 발행 사유",
    "PEF의 자본재조정(Recapitalization)", "스타일 투자 전략의 효과", "비금융투자상품의 예시", "전문투자기관의 예시",
    "투자신탁 설정 시 신탁계약 변경 절차", "종류형 집합투자기구의 특징", "투자성상품의 분류", "고난도 투자성상품 대상",
    "수익증권 발행 시 신고 의무", "교차 투자 금지 규정", "투자설명서 변경과 공시", "집합투자업자의 신탁업 겸영 금지",
    "그랜빌 투자전략의 공황국면", "투자광고와 투자권유규제", "펀드 명칭 내 판매회사 사용 제한", "기업공개 주관 업무 예외 규정",
    "투자정보 확인 방법",

    // 추가 삭제 후보
    "소득세 주소지 과세제도",
    "1거주자 단체 과세",
    "분류과세 대상",
    "증권거래세 납세의무 시기",
    "유가증권 양도소득 원천징수",
    "증권거래세 과세 원칙",
    "저당대출담보부채권의 특징",
    "국내 채권유통시장의 특징",
    "RP 매매와 자본손실 위험",
    "주택 저당채권의 상대적 신용도",
    "채권과 주식의 발행주체 비교",
    "상장채권의 시장 특징",
    "유동화전문회사(SPC)의 특징",
    "수익환원율의 한계",
    "채권수익률 기간 구조가설",
    "수익률 곡선타기전략",
    "이자율 전망과 수익률 곡선",
    "상업지역과 주거지역의 비율 비교",
    "담보신탁의 장점",
    "담보신탁 담보권 실행 방법",
    "신탁의 독립성(도산격리)",
    "신탁 재산의 파생상품 운용 제한",
    "신탁업자 부담 비용 항목",
    "부동산 담보신탁의 성격",
    "비용접근법의 유용성",
    "부동산의 부동성과 현상",
    "주택 외 부동산 처분 제한 기간",
    "부동산 시장의 정보 비공개성",
    "부동산의 인플레이션 헤지 기능",
    "부동산과 타 자산 간 상관관계",
    "부동산 개발금융(PF)의 특징",
    "MBS의 정의 및 발행 구조",
    "해외 직접 투자 양도소득세",
    "투자일임재산의 자기발행증권 투자 금지",
    "사모집합투자 출자방법",
    "대안투자상품의 거래 특징",
    "MMF의 재산평가 원칙",
    "집합투자증권 연계 판매 가능 여부",
    "대안투자상품의 수익 요인",
    "환율 변동과 투자수익률의 관계",
    "국제분산투자의 위험 관리 한계",
    "과도한 투자권유 판단 기준",
    "환매수수료와 회수금액 산정",
    "기관투자자 운용조직의 특징",
    "주식 포트폴리오 구성의 첫 단계",
    "투자이율과 순소득승수의 관계",
    "모자형 집합투자기구의 운용자 요건",
    "투자매매업의 정의",
    "금융투자업 유지 자본금 요건",
    "집합투자업자 수시 공시사항",
    "공모집합투자 성과보수 제한",
    "집합투자기구 등록 자본금 조건",
    "주식매수 선택권의 상품 분류",
    "투자매매업의 핵심",
    "원화표시 CD의 상품 분류",
    "전문 투자자 투자설명서 교부 의무",
    "금지되지 않는 집합투자재산 매수 대상",
    "ETF 상장 기한",
    "환매금지형 설정 기준 (시장성 없는 자산)",
    "사모투자기구 금융위 보고 기한",
    "집합투자재산 평가기준 마련 절차",
    "평균투자방법의 성격",
    "종합적 투자관리의 방식",
    "일반투자자 전환 가능 전문투자자",
    "특정 상품 매매 시 협회가 인정한 사전교육 의무",
    "투자설명서 교부 거부",
    "일반투자자 전환 가능 전문투자자 예시",
    "투자공시 위험고지 글자 크기",
    "핵심설명서 교부 대상 상품",
    "주관회사 업무 수행 제한 지분율",
    "책임보험 특징",
    "포트폴리오 보험 투자자 특성",
    "생명보험의 보상 원칙",
    "예금자보험 가입 금융기관",
    "부동산 수익 지표 구성",
    "주식 적극적 운용방법",
    "핵심설명서 제공대상",
    "ELW의 시간가치와 수익원",
    "포트폴리오 보험 전략",
    "ABS 내부신용보강방법",
    "기대수익률과 베타의 관계",
    "펀드 증권 거래 회계처리",
    "증권 특성선의 기울기 의미",
    "증권시장선(SML)의 기울기",
    "SML과 CML의 위치 관계",
    "자산유동화증권(ABS) 신용도 특징",
    "수의상환채권 특징",
    "적극적 채권 운용전략",
    "자기자본수익률(ROE)의 의미와 계산",
    "ROE와 총자산수익률의 관계",
    "평균수익률 산출 방식",
    "시간가중수익률의 특징",
    "연수익률 환산의 왜곡",
    "초과수익률과 샤프지수의 관계",
    "수익자 총회 결의 요건",
    "투자신탁 환매 절차",
    "수익자총회 요건",
    "수익률 관측값 지표",
    "증권수익률간 공분산의 의미",
    "표시 가능 예상수익률",
    "본국통화 수익률 분산 구성요소",
    "도시지역의 세부 분류",
    "국토의 계획 및 이용에 관한 법률상 용도지역 분류",
    "부동산의 미시적 분석 항목",
    "미국 국채 투자 시 고려사항",
    "동일종목 투자 한도 제한",
    "ETF 상장폐지 사유 (추적오차)"
];

let quizStack = [...que];
let currentIdx = 0;
let correctCount = 0;
let totalAttempts = 0;
let animating = false;
let wrongCounts = {}; 
let issueSet = new Set(); 

const stage = document.getElementById('stage');
const progressBar = document.getElementById('progressBar');
const counter = document.getElementById('counter');
const correctDisplay = document.getElementById('correctCount');

// --- 추가된 로직: 실제 렌더링될 문제 수 계산 ---
function getVisibleTotal() {
    if (!left) return que.length;
    // excludeList에 포함되지 않은 문항만 카운트
    return que.filter(item => !excludeList.includes(item.main)).length;
}

// --- 1. 데이터 저장 및 로드 ---
function saveProgress() {
    const data = { quizStack, currentIdx, correctCount, totalAttempts, wrongCounts };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadProgress() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
        const data = JSON.parse(saved);
        correctCount = data.correctCount || 0;
        totalAttempts = data.totalAttempts || 0;
        wrongCounts = data.wrongCounts || {};
        const savedStack = (data.quizStack || []).filter(item => item !== null);
        const sIdx = data.currentIdx || 0;
        const remaining = savedStack.slice(sIdx);
        if (remaining.length > 0) {
            const nowCard = remaining[0]; 
            const others = remaining.slice(1); 
            const wrongItems = [];
            const normalItems = [];
            const passedMains = new Set(savedStack.slice(0, sIdx).filter(m => m && m.main).map(m => m.main));
            others.forEach(item => {
                if (item && item.main && passedMains.has(item.main)) { wrongItems.push(item); } 
                else if (item) { normalItems.push(item); }
            });
            quizStack = [...wrongItems, nowCard, ...normalItems].filter(q => q !== undefined);
        }
        currentIdx = 0;
    } catch (e) {
        console.error("로드 오류:", e);
        localStorage.removeItem(STORAGE_KEY);
    }
}

// --- 2. 보기 생성 엔진 ---
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
function getRandomDistractors(excludeArray, count) {
    const allAnswers = que.flatMap(item => (Array.isArray(item.answer) ? item.answer : [item.answer]));
    const uniquePool = [...new Set(allAnswers.filter(ans => !excludeArray.includes(ans)))];
    return shuffle(uniquePool).slice(0, count);
}

function prepareChoices(q) {
    if (q.fixedChoices) return;
    if (Array.isArray(q.answer)) q.answer = q.answer.map(a => String(a));
    if (q.type === 'ox') {
        q.fixedChoices = ['O', 'X'];
        q.fixedAnswers = [q.answer];
    } else {
        const originalAnswers = Array.isArray(q.answer) ? q.answer : [q.answer];
        let selectedAnswers = originalAnswers.length >= 5 ? shuffle([...originalAnswers]).slice(0, 5) : [...originalAnswers];
        const neededDistractors = 5 - selectedAnswers.length;
        const distractors = neededDistractors > 0 ? getRandomDistractors(originalAnswers, neededDistractors) : [];
        q.fixedChoices = shuffle([...selectedAnswers, ...distractors]);
        q.fixedAnswers = selectedAnswers;
    }
}

// --- 3. 렌더링 엔진 ---
function renderNextCard() {
    updateUI();
    if (!stage) return;
    stage.innerHTML = '';
    animating = false;

    if (currentIdx >= quizStack.length) { showDone(); return; }

    const q = quizStack[currentIdx];

    // [필터링 로직]
    if (left && excludeList.includes(q.main)) {
        currentIdx++;
        renderNextCard(); 
        return;
    }

    prepareChoices(q);

    const card = document.createElement('div');
    card.className = 'card active';

    // 상단 바 (클로버, 이슈체크)
    const topBar = document.createElement('div');
    topBar.style.display = 'flex';
    topBar.style.justifyContent = 'space-between';
    topBar.style.alignItems = 'center';
    topBar.style.marginBottom = '10px';

    const cloverContainer = document.createElement('div');
    const wCount = wrongCounts[q.main] || 0;
    for (let i = 0; i < wCount; i++) {
        const clover = document.createElement('span');
        clover.textContent = '♣';
        clover.style.fontSize = '10px';
        clover.style.color = '#ff4b2b';
        clover.style.marginRight = '2px';
        cloverContainer.appendChild(clover);
    }

    const issueLabel = document.createElement('label');
    issueLabel.style.fontSize = '12px';
    issueLabel.style.color = '#888';
    issueLabel.style.cursor = 'pointer';
    issueLabel.innerHTML = `<input type="checkbox" id="issueChk"> 이슈문제`;
    const chk = issueLabel.querySelector('input');
    if (issueSet.has(q)) chk.checked = true;
    chk.onchange = (e) => {
        e.stopPropagation();
        if (chk.checked) issueSet.add(q);
        else issueSet.delete(q);
    };

    topBar.appendChild(cloverContainer);
    topBar.appendChild(issueLabel);
    card.appendChild(topBar);

    if (q.type === 'ox') {
        card.insertAdjacentHTML('beforeend', `
            <div class="card-label">OX QUIZ</div>
            <div class="card-main">${q.main}</div>
            <div class="card-divider"></div>
            <div class="card-sentence" style="margin-bottom:20px; font-size:18px;">${q.sentence}</div>
            <div class="choices" style="display:flex; flex-direction: row; gap: 15px;">
                ${q.fixedChoices.map(c => `<button class="choice-btn ox-btn" style="flex:1; height:80px; font-size:24px;">${c}</button>`).join('')}
            </div>
            <div class="result-badge"></div>`);
        card.querySelectorAll('.ox-btn').forEach(btn => {
            btn.onclick = (e) => { 
                e.stopPropagation();
                if (!animating) handleResult(btn.textContent === q.answer, q, [q.answer], [btn.textContent]); 
            };
        });
    } else {
        const choicesHtml = q.fixedChoices.map(c => `<button class="choice-btn multi-btn">${c}</button>`).join('');
        if (q.type === 'blank') {
            let realAnswersInOrder = [];
            const pattern = new RegExp(`(${q.fixedAnswers.map(s => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')).join('|')})`, 'g');
            const processedSentence = q.sentence.replace(pattern, (match) => { realAnswersInOrder.push(match); return `<span class="hole">____</span>`; });
            card.insertAdjacentHTML('beforeend', `
                <div class="card-label">FILL IN THE BLANK</div>
                <div class="sentence-area" style="line-height:2.5; font-size:18px; margin-bottom:20px;">${processedSentence}</div>
                <div class="choices">${choicesHtml}</div>
                <button class="submit-btn" id="submitBtn" style="margin-top:15px; width:100%;">정답 제출</button>
                <div class="result-badge"></div>`);
            setupBlankLogic(card, realAnswersInOrder, q);
        } else {
            card.insertAdjacentHTML('beforeend', `
                <div class="card-label">MULTI-SELECT</div>
                <div class="card-main">${q.main}</div>
                <div class="card-divider"></div>
                <div class="choices">${choicesHtml}</div>
                <button class="submit-btn" id="submitBtn" style="margin-top:15px; width:100%;">답안 제출</button>
                <div class="result-badge"></div>`);
            setupMultiSelectLogic(card, q.fixedAnswers, q);
        }
    }
    stage.appendChild(card);
}

// --- 4. 인터랙션 로직 ---
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
            selectedTexts[idx] = null; hole.textContent = "____"; hole.style.color = "#ccc";
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

// --- 5. 결과 처리 ---
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

    if (!isSuccess && questionData.type === 'blank') {
        const holes = card.querySelectorAll('.hole');
        holes.forEach((hole, idx) => {
            hole.textContent = correctToHighlight[idx];
            hole.style.color = "#4CAF50"; hole.style.borderBottom = "2px solid #4CAF50";
        });
    }

    badge.className += ' show';
    setTimeout(() => badge.classList.remove('show'), 500);

    if (isSuccess) {
        correctCount++;
        badge.textContent = '⭕';
        setTimeout(() => {
            card.classList.add('fly-away');
            setTimeout(proceedToNext, 600);
        }, 400);
    } else {
        wrongCounts[questionData.main] = (wrongCounts[questionData.main] || 0) + 1;
        quizStack.push(questionData);
        badge.textContent = '❌';
        const guide = document.createElement('div');
        guide.innerHTML = "화면을 터치하여 계속하기";
        guide.style.cssText = "font-size:12px; color:#ff4b2b; margin-top:15px; text-align:center; font-weight:bold;";
        card.appendChild(guide);
        card.style.cursor = 'pointer';
        card.onclick = () => {
            card.onclick = null;
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

// --- [수정된 부분] 실제 보여지는 문제 수 기준으로 UI 업데이트 ---
function updateUI() {
    if (!progressBar || !counter) return;
    const totalVisible = getVisibleTotal(); // 필터링된 전체 개수
    const progress = Math.min((correctCount / totalVisible) * 100, 100);
    progressBar.style.width = `${progress}%`;
    counter.textContent = `${correctCount} / ${totalVisible}`;
    if (correctDisplay) correctDisplay.textContent = correctCount;
}

// --- 6. 종료 화면 ---
function showDone() {
    stage.style.display = 'none';
    const doneScreen = document.getElementById('doneScreen');
    const doneTitle = document.getElementById('doneTitle');
    if (doneScreen && doneTitle) {
        doneScreen.classList.add('visible');
        if (issueSet.size > 0) {
            const issueData = Array.from(issueSet).map(item => {
                const { fixedChoices, fixedAnswers, ...cleanItem } = item;
                return cleanItem;
            });
            const reporterArea = document.createElement('div');
            reporterArea.style.marginTop = '20px';
            reporterArea.innerHTML = `
                <p style="font-size:14px; color:#ff4b2b;">⚠️ 체크된 이슈 문제 데이터 (${issueSet.size}건)</p>
                <textarea readonly style="width:100%; height:150px; padding:10px; font-family:monospace; font-size:12px; border:1px solid #ddd; border-radius:5px; background:#f9f9f9;">${JSON.stringify(issueData, null, 2)}</textarea>
                <button onclick="copyIssueData(this)" style="margin-top:10px; width:100%; padding:10px; background:#444; color:#fff; border:none; border-radius:5px; cursor:pointer;">데이터 복사하기</button>
            `;
            doneTitle.after(reporterArea);
        }
    }
}

window.copyIssueData = (btn) => {
    const txt = btn.previousElementSibling;
    txt.select();
    document.execCommand('copy');
    btn.textContent = "복사 완료!";
    setTimeout(() => btn.textContent = "데이터 복사하기", 2000);
};

document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    renderNextCard();
    document.getElementById('resetBtn').onclick = () => {
        if (confirm("기록을 초기화하시겠습니까?")) {
            localStorage.removeItem(STORAGE_KEY);
            location.reload();
        }
    };
});

window.restart = () => { localStorage.removeItem(STORAGE_KEY); location.reload(); };