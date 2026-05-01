const curriculumMap = {
  1: [
    { id: "counting", title: "수 세기", badge: "기초", description: "100까지 수의 순서와 크기" },
    { id: "add1", title: "한 자리 덧셈", badge: "덧셈", description: "합이 18 이하인 빠른 덧셈" },
    { id: "sub1", title: "한 자리 뺄셈", badge: "뺄셈", description: "작은 수의 차 구하기" },
    { id: "blank_add", title: "빈칸 덧셈", badge: "빈칸", description: "□에 들어갈 수 찾기" },
  ],
  2: [
    { id: "add_sub2", title: "두 자리 덧셈/뺄셈", badge: "기본", description: "두 자리 수를 빠르게 계산" },
    { id: "carrying", title: "받아올림/받아내림", badge: "도전", description: "자리값을 넘나드는 계산" },
    { id: "multiplication_intro", title: "곱셈 기초", badge: "곱셈", description: "묶음과 배의 개념" },
  ],
  3: [
    { id: "add_sub3", title: "세 자리 덧셈/뺄셈", badge: "기본", description: "세 자리 수의 합과 차" },
    { id: "multiplication_table", title: "곱셈구구", badge: "구구단", description: "2단부터 9단까지" },
    { id: "multiplication", title: "곱셈", badge: "속도", description: "두 자리, 세 자리 곱셈" },
    { id: "division_intro", title: "나눗셈 기초", badge: "나눗셈", description: "나누어 떨어지는 계산" },
  ],
  4: [
    { id: "large_numbers", title: "큰 수", badge: "자리값", description: "천, 만 단위 수 감각" },
    { id: "multiplication_advanced", title: "곱셈 심화", badge: "심화", description: "두 자리 수끼리 곱셈" },
    { id: "division", title: "나눗셈", badge: "몫", description: "큰 수를 나누는 계산" },
    { id: "fractions_intro", title: "분수 기초", badge: "분수", description: "분모와 분자, 같은 분모 계산" },
    { id: "decimals_intro", title: "소수 기초", badge: "소수", description: "소수 한 자리 계산" },
  ],
  5: [
    { id: "factors_multiples", title: "약수와 배수", badge: "수 감각", description: "최대공약수와 최소공배수" },
    { id: "reduce_fraction", title: "약분/통분", badge: "분수", description: "분수를 간단히 만들기" },
    { id: "fraction_add_sub", title: "분수 덧셈/뺄셈", badge: "연산", description: "분모가 다른 분수 계산" },
    { id: "decimal_multiplication", title: "소수 곱셈", badge: "소수", description: "소수와 자연수의 곱" },
  ],
  6: [
    { id: "fraction_mul_div", title: "분수 곱셈/나눗셈", badge: "분수", description: "분수끼리 곱하고 나누기" },
    { id: "decimal_division", title: "소수 나눗셈", badge: "소수", description: "소수를 자연수로 나누기" },
    { id: "ratio_percent", title: "비와 비율", badge: "비율", description: "비, 백분율, 기준량" },
    { id: "mixed_operations", title: "혼합 계산", badge: "종합", description: "괄호와 사칙연산" },
  ],
};

const keypadKeys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "/"];
let questionSerial = 0;

const players = [
  { id: "p1", name: "1번 학생", color: "blue", score: 0, progress: 0, streak: 0, input: "", submitted: false, feedback: "", question: null },
  { id: "p2", name: "2번 학생", color: "red", score: 0, progress: 0, streak: 0, input: "", submitted: false, feedback: "", question: null },
  { id: "p3", name: "3번 학생", color: "green", score: 0, progress: 0, streak: 0, input: "", submitted: false, feedback: "", question: null },
  { id: "p4", name: "4번 학생", color: "yellow", score: 0, progress: 0, streak: 0, input: "", submitted: false, feedback: "", question: null },
];

const state = {
  screen: "home",
  selectedGrade: null,
  selectedUnitId: null,
  solvedCount: 0,
  running: false,
  revealed: false,
  message: "학년과 단원을 고른 뒤 레이스를 시작하세요.",
};

const el = {
  menuScreen: document.querySelector("#menuScreen"),
  gameShell: document.querySelector("#gameShell"),
  selectionInfo: document.querySelector("#selectionInfo"),
  messageLine: document.querySelector("#messageLine"),
  roundNumber: document.querySelector("#roundNumber"),
  leaderName: document.querySelector("#leaderName"),
  raceLanes: document.querySelector("#raceLanes"),
  playersGrid: document.querySelector("#playersGrid"),
  startButton: document.querySelector("#startButton"),
  nextButton: document.querySelector("#nextButton"),
  revealButton: document.querySelector("#revealButton"),
  resetButton: document.querySelector("#resetButton"),
  courseButton: document.querySelector("#courseButton"),
};

const questionGenerators = {
  counting() {
    const type = randomInt(1, 3);
    if (type === 1) {
      const number = randomInt(1, 98);
      return makeQuestion(`${number} 다음 수는?`, number + 1);
    }
    if (type === 2) {
      const number = randomInt(2, 99);
      return makeQuestion(`${number}보다 1 작은 수는?`, number - 1);
    }
    const a = randomInt(10, 99);
    const b = randomInt(10, 99);
    return makeQuestion(`${a}와 ${b} 중 큰 수는?`, Math.max(a, b));
  },
  add1() {
    const a = randomInt(1, 9);
    const b = randomInt(1, 9);
    return makeQuestion(`${a} + ${b} = ?`, a + b);
  },
  sub1() {
    const a = randomInt(6, 18);
    const b = randomInt(1, Math.min(9, a - 1));
    return makeQuestion(`${a} - ${b} = ?`, a - b);
  },
  blank_add() {
    const a = randomInt(1, 9);
    const b = randomInt(1, 9);
    return Math.random() > 0.5
      ? makeQuestion(`□ + ${b} = ${a + b}`, a)
      : makeQuestion(`${a} + □ = ${a + b}`, b);
  },
  add_sub2() {
    if (Math.random() > 0.5) {
      const a = randomInt(12, 78);
      const b = randomInt(11, 99 - a);
      return makeQuestion(`${a} + ${b} = ?`, a + b);
    }
    const a = randomInt(40, 99);
    const b = randomInt(11, a - 10);
    return makeQuestion(`${a} - ${b} = ?`, a - b);
  },
  carrying() {
    if (Math.random() > 0.5) {
      const tensA = randomInt(1, 7) * 10;
      const tensB = randomInt(1, 8 - tensA / 10) * 10;
      const onesA = randomInt(5, 9);
      const onesB = randomInt(10 - onesA, 9);
      const a = tensA + onesA;
      const b = tensB + onesB;
      return makeQuestion(`${a} + ${b} = ?`, a + b);
    }
    const tens = randomInt(4, 9) * 10;
    const ones = randomInt(0, 4);
    const a = tens + ones;
    const b = randomInt(ones + 1, 9) + randomInt(1, Math.floor(tens / 10) - 1) * 10;
    return makeQuestion(`${a} - ${b} = ?`, a - b);
  },
  multiplication_intro() {
    const groups = randomInt(2, 5);
    const each = randomInt(2, 6);
    return makeQuestion(`${each}씩 ${groups}묶음은 모두 몇 개?`, groups * each);
  },
  add_sub3() {
    if (Math.random() > 0.5) {
      const a = randomInt(120, 699);
      const b = randomInt(101, 999 - a);
      return makeQuestion(`${a} + ${b} = ?`, a + b);
    }
    const a = randomInt(300, 999);
    const b = randomInt(101, a - 100);
    return makeQuestion(`${a} - ${b} = ?`, a - b);
  },
  multiplication_table() {
    const a = randomInt(2, 9);
    const b = randomInt(2, 9);
    return makeQuestion(`${a} × ${b} = ?`, a * b);
  },
  multiplication() {
    if (Math.random() > 0.55) {
      const a = randomInt(12, 98);
      const b = randomInt(2, 9);
      return makeQuestion(`${a} × ${b} = ?`, a * b);
    }
    const a = randomInt(101, 299);
    const b = randomInt(2, 6);
    return makeQuestion(`${a} × ${b} = ?`, a * b);
  },
  division_intro() {
    const divisor = randomInt(2, 9);
    const quotient = randomInt(2, 9);
    return makeQuestion(`${divisor * quotient} ÷ ${divisor} = ?`, quotient);
  },
  large_numbers() {
    if (Math.random() > 0.5) {
      const thousands = randomInt(2, 9);
      const hundreds = randomInt(1, 9);
      return makeQuestion(`1000이 ${thousands}개, 100이 ${hundreds}개이면?`, thousands * 1000 + hundreds * 100);
    }
    const a = randomInt(12, 89) * 100;
    const b = randomInt(2, 9) * 100;
    return makeQuestion(`${formatComma(a)} + ${formatComma(b)} = ?`, a + b);
  },
  multiplication_advanced() {
    const a = randomInt(12, 49);
    const b = randomInt(11, 29);
    return makeQuestion(`${a} × ${b} = ?`, a * b);
  },
  division() {
    const divisor = randomInt(6, 24);
    const quotient = randomInt(5, 32);
    return makeQuestion(`${divisor * quotient} ÷ ${divisor} = ?`, quotient);
  },
  fractions_intro() {
    const denominator = randomInt(3, 9);
    const numerator = randomInt(1, denominator - 1);
    if (Math.random() > 0.5) {
      return makeQuestion(`${numerator}/${denominator}에서 분자는?`, numerator);
    }
    const add = randomInt(1, denominator - numerator);
    return makeQuestion(`${numerator}/${denominator} + ${add}/${denominator} = ?`, simplifyFraction(numerator + add, denominator));
  },
  decimals_intro() {
    if (Math.random() > 0.5) {
      const a = randomInt(1, 8);
      const b = randomInt(1, 9 - a);
      return makeQuestion(`${formatDecimal(a / 10)} + ${formatDecimal(b / 10)} = ?`, formatDecimal((a + b) / 10));
    }
    const a = randomInt(5, 9);
    const b = randomInt(1, a - 1);
    return makeQuestion(`${formatDecimal(a / 10)} - ${formatDecimal(b / 10)} = ?`, formatDecimal((a - b) / 10));
  },
  factors_multiples() {
    const a = randomInt(4, 12);
    const b = randomInt(4, 12);
    if (Math.random() > 0.5) {
      return makeQuestion(`${a}와 ${b}의 최대공약수는?`, gcd(a, b));
    }
    return makeQuestion(`${a}와 ${b}의 최소공배수는?`, lcm(a, b));
  },
  reduce_fraction() {
    const baseNumerator = randomInt(1, 6);
    const baseDenominator = randomInt(baseNumerator + 1, 9);
    const multiplier = randomInt(2, 5);
    return makeQuestion(`${baseNumerator * multiplier}/${baseDenominator * multiplier}을 약분하면?`, simplifyFraction(baseNumerator, baseDenominator));
  },
  fraction_add_sub() {
    const d1 = randomInt(3, 8);
    const d2 = randomInt(3, 8);
    const n1 = randomInt(1, d1 - 1);
    const n2 = randomInt(1, d2 - 1);
    if (Math.random() > 0.45) {
      return makeQuestion(`${n1}/${d1} + ${n2}/${d2} = ?`, simplifyFraction(n1 * d2 + n2 * d1, d1 * d2));
    }
    const left = n1 / d1 >= n2 / d2 ? [n1, d1, n2, d2] : [n2, d2, n1, d1];
    return makeQuestion(`${left[0]}/${left[1]} - ${left[2]}/${left[3]} = ?`, simplifyFraction(left[0] * left[3] - left[2] * left[1], left[1] * left[3]));
  },
  decimal_multiplication() {
    const tenths = randomInt(12, 89);
    const multiplier = randomInt(2, 9);
    return makeQuestion(`${formatDecimal(tenths / 10)} × ${multiplier} = ?`, formatDecimal((tenths * multiplier) / 10));
  },
  fraction_mul_div() {
    const n1 = randomInt(1, 5);
    const d1 = randomInt(n1 + 1, 9);
    const n2 = randomInt(1, 5);
    const d2 = randomInt(n2 + 1, 9);
    if (Math.random() > 0.5) {
      return makeQuestion(`${n1}/${d1} × ${n2}/${d2} = ?`, simplifyFraction(n1 * n2, d1 * d2));
    }
    return makeQuestion(`${n1}/${d1} ÷ ${n2}/${d2} = ?`, simplifyFraction(n1 * d2, d1 * n2));
  },
  decimal_division() {
    const divisor = randomInt(2, 8);
    const answerTenths = randomInt(4, 45);
    const dividend = (answerTenths * divisor) / 10;
    return makeQuestion(`${formatDecimal(dividend)} ÷ ${divisor} = ?`, formatDecimal(answerTenths / 10));
  },
  ratio_percent() {
    if (Math.random() > 0.5) {
      const base = randomInt(4, 16) * 10;
      const percent = [10, 20, 25, 50][randomInt(0, 3)];
      return makeQuestion(`${base}의 ${percent}%는?`, (base * percent) / 100);
    }
    const left = randomInt(2, 6);
    const right = randomInt(2, 6);
    const scale = randomInt(3, 8);
    return makeQuestion(`${left}:${right}에서 전체가 ${(left + right) * scale}이면 왼쪽 값은?`, left * scale);
  },
  mixed_operations() {
    const a = randomInt(3, 9);
    const b = randomInt(2, 8);
    const c = randomInt(2, 7);
    if (Math.random() > 0.5) {
      return makeQuestion(`(${a} + ${b}) × ${c} = ?`, (a + b) * c);
    }
    return makeQuestion(`${a * c + b} - ${a} × ${c} = ?`, b);
  },
};

function makeQuestion(text, answer) {
  const unit = getSelectedUnit();
  return {
    id: `q${++questionSerial}`,
    subject: "수학",
    level: unit ? unit.title : "기본",
    text,
    answer: String(answer),
  };
}

function generateQuestion() {
  ensureSelection();
  const unit = getSelectedUnit();
  const generator = questionGenerators[unit.id] || questionGenerators.add1;
  return generator();
}

function render() {
  el.menuScreen.classList.toggle("screen-hidden", state.screen === "race");
  el.gameShell.classList.toggle("screen-hidden", state.screen !== "race");

  if (state.screen === "race") {
    renderGame();
  } else {
    renderMenu();
  }
}

function renderGame() {
  el.gameShell.classList.toggle("is-running", state.running);
  el.selectionInfo.textContent = getCourseLabel();
  el.messageLine.textContent = state.message;
  el.roundNumber.textContent = state.solvedCount;
  el.leaderName.textContent = getLeaderName();

  renderLanes();
  renderPlayers();
}

function renderMenu() {
  if (state.screen === "gradeSelect") {
    renderGradeSelect();
    return;
  }

  if (state.screen === "unitSelect") {
    renderUnitSelect();
    return;
  }

  renderHome();
}

function renderHome() {
  const summary = getCourseLabel();
  const canStart = Boolean(state.selectedGrade && state.selectedUnitId);

  el.menuScreen.innerHTML = `
    <div class="menu-shell home-shell">
      <header class="menu-hero">
        <div class="hero-copy">
          <span class="mode-chip">전자칠판 4인 터치 배틀</span>
          <h1>터치 카트</h1>
          <p class="course-summary">${summary}</p>
          <div class="menu-actions">
            <button class="menu-primary" type="button" data-menu-action="grade">학년 선택</button>
            <button class="menu-secondary" type="button" data-menu-action="unit" ${state.selectedGrade ? "" : "disabled"}>단원 선택</button>
            <button class="menu-race" type="button" data-menu-action="start" ${canStart ? "" : "disabled"}>레이스 시작</button>
          </div>
        </div>
        <div class="hero-track" aria-hidden="true">
          <div class="hero-scoreboard">TOUCH KART</div>
          <div class="hero-lane lane-a"><span></span>${getKartMarkup()}</div>
          <div class="hero-lane lane-b"><span></span>${getKartMarkup()}</div>
          <div class="hero-lane lane-c"><span></span>${getKartMarkup()}</div>
          <div class="hero-lane lane-d"><span></span>${getKartMarkup()}</div>
          <div class="hero-finish"></div>
        </div>
      </header>

      <section class="flow-strip" aria-label="진행 단계">
        <button class="flow-step ${state.selectedGrade ? "is-done" : "is-current"}" type="button" data-menu-action="grade">
          <span>1</span><strong>학년 선택</strong>
        </button>
        <button class="flow-step ${state.selectedUnitId ? "is-done" : state.selectedGrade ? "is-current" : ""}" type="button" data-menu-action="unit" ${state.selectedGrade ? "" : "disabled"}>
          <span>2</span><strong>단원 선택</strong>
        </button>
        <button class="flow-step ${canStart ? "is-current" : ""}" type="button" data-menu-action="start" ${canStart ? "" : "disabled"}>
          <span>3</span><strong>레이스 시작</strong>
        </button>
      </section>
    </div>
  `;

  bindMenuActions();
}

function renderGradeSelect() {
  const gradeCards = Object.keys(curriculumMap)
    .map((grade) => {
      const units = curriculumMap[grade].map((unit) => unit.title).slice(0, 4).join(" · ");
      const selected = Number(grade) === state.selectedGrade;
      return `
        <button class="grade-card ${selected ? "is-selected" : ""}" type="button" data-grade="${grade}">
          <span>${grade}</span>
          <strong>${grade}학년</strong>
          <em>${units}</em>
        </button>
      `;
    })
    .join("");

  el.menuScreen.innerHTML = `
    <div class="menu-shell picker-shell">
      <nav class="menu-nav" aria-label="메뉴 이동">
        <button type="button" data-menu-action="home">처음</button>
        <strong>학년 선택</strong>
      </nav>
      <section class="picker-head">
        <span class="mode-chip">COURSE 1</span>
        <h1>학년을 고르세요</h1>
      </section>
      <section class="grade-grid" aria-label="학년 목록">
        ${gradeCards}
      </section>
    </div>
  `;

  bindMenuActions();
  el.menuScreen.querySelectorAll("[data-grade]").forEach((button) => {
    button.addEventListener("click", () => selectGrade(Number(button.dataset.grade)));
  });
}

function renderUnitSelect() {
  ensureGrade();
  const units = curriculumMap[state.selectedGrade];
  const unitCards = units
    .map((unit) => {
      const selected = unit.id === state.selectedUnitId;
      return `
        <button class="unit-card ${selected ? "is-selected" : ""}" type="button" data-unit="${unit.id}">
          <span>${unit.badge}</span>
          <strong>${unit.title}</strong>
          <em>${unit.description}</em>
        </button>
      `;
    })
    .join("");
  const canStart = Boolean(state.selectedUnitId);

  el.menuScreen.innerHTML = `
    <div class="menu-shell picker-shell">
      <nav class="menu-nav" aria-label="메뉴 이동">
        <button type="button" data-menu-action="grade">학년 변경</button>
        <strong>${state.selectedGrade}학년 단원 선택</strong>
        <button type="button" data-menu-action="home">처음</button>
      </nav>
      <section class="picker-head">
        <span class="mode-chip">COURSE 2</span>
        <h1>단원을 고르세요</h1>
      </section>
      <section class="unit-grid" aria-label="단원 목록">
        ${unitCards}
      </section>
      <div class="start-dock">
        <span>${getCourseLabel()}</span>
        <button class="menu-race" type="button" data-menu-action="start" ${canStart ? "" : "disabled"}>레이스 시작</button>
      </div>
    </div>
  `;

  bindMenuActions();
  el.menuScreen.querySelectorAll("[data-unit]").forEach((button) => {
    button.addEventListener("click", () => selectUnit(button.dataset.unit));
  });
}

function bindMenuActions() {
  el.menuScreen.querySelectorAll("[data-menu-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.menuAction;
      if (action === "home") goHome();
      if (action === "grade") showGradeSelect();
      if (action === "unit") showUnitSelect();
      if (action === "start") startRace();
    });
  });
}

function showGradeSelect() {
  state.screen = "gradeSelect";
  state.running = false;
  render();
}

function showUnitSelect() {
  if (!state.selectedGrade) {
    showGradeSelect();
    return;
  }
  state.screen = "unitSelect";
  state.running = false;
  render();
}

function goHome() {
  state.screen = "home";
  state.running = false;
  render();
}

function selectGrade(grade) {
  state.selectedGrade = grade;
  state.selectedUnitId = null;
  state.screen = "unitSelect";
  render();
}

function selectUnit(unitId) {
  state.selectedUnitId = unitId;
  render();
}

function startRace() {
  ensureSelection();
  resetPlayersForCourse();
  state.screen = "race";
  state.running = true;
  state.revealed = false;
  state.solvedCount = 0;
  state.message = `${getCourseLabel()} 레이스 시작! 각자 패드의 문제를 풀어보세요.`;
  render();
}

function renderLanes() {
  el.raceLanes.innerHTML = "";

  players.forEach((player) => {
    const lane = document.createElement("article");
    const visualProgress = Math.max(3, player.progress);
    lane.className = `race-lane player-${player.color}`;
    lane.classList.toggle("is-boosting", player.feedback === "정답");
    lane.classList.toggle("is-winner", player.feedback === "승리");
    lane.innerHTML = `
      <div class="lane-name">
        <strong>${player.name}</strong>
        <span>${player.score}점</span>
      </div>
      <div class="track" aria-label="${player.name} 진행률">
        <div class="track-fill" style="--progress: ${visualProgress}%">
          <div class="vehicle" aria-hidden="true">
            <span class="speed-line line-one"></span>
            <span class="speed-line line-two"></span>
            ${getKartMarkup()}
            <span class="boost-flare"></span>
          </div>
        </div>
      </div>
      <div class="lane-meter">${player.progress}m</div>
    `;
    el.raceLanes.append(lane);
  });
}

function getKartMarkup() {
  return `
    <svg class="vehicle-asset kart-asset" viewBox="0 0 150 86" focusable="false" aria-hidden="true">
      <path class="flame flame-one" d="M11 49C1 43 1 32 13 24c-3 8 5 14 12 16-8 2-11 5-14 9z" />
      <path class="flame flame-two" d="M18 58C4 57 0 47 8 38c4 8 13 11 24 10-6 4-9 7-14 10z" />
      <path class="shadow" d="M28 71c12 8 82 8 101 0" />
      <path class="body" d="M28 37c10-16 29-23 59-21 23 2 39 14 49 31l9 4-7 17H23l-9-17 14-14z" />
      <path class="nose" d="M91 19c18 4 33 15 43 31H88z" />
      <path class="window" d="M48 25h28c10 0 18 5 22 14H39c2-8 5-12 9-14z" />
      <g class="wheel-ring wheel-left">
        <circle class="wheel" cx="45" cy="64" r="14" />
        <path class="spoke" d="M45 52v24M33 64h24M37 56l16 16M53 56L37 72" />
      </g>
      <g class="wheel-ring wheel-right">
        <circle class="wheel" cx="113" cy="64" r="14" />
        <path class="spoke" d="M113 52v24M101 64h24M105 56l16 16M121 56l-16 16" />
      </g>
      <circle class="hub" cx="45" cy="64" r="5" />
      <circle class="hub" cx="113" cy="64" r="5" />
      <path class="stripe" d="M29 46h94" />
      <path class="spark" d="M131 13l5-9 4 10 10 3-10 4-3 10-5-9-10-3z" />
    </svg>
  `;
}

function renderPlayers() {
  el.playersGrid.innerHTML = "";

  players.forEach((player) => {
    const question = currentQuestion(player);
    const card = document.createElement("article");
    card.className = `player-card player-${player.color}`;
    card.classList.toggle("is-correct", player.feedback === "정답");
    card.classList.toggle("is-wrong", player.feedback === "오답");
    card.classList.toggle("is-locked", player.submitted);

    const displayValue = player.input || (player.submitted ? "다음 문제" : "입력");
    const displayClass = player.input ? "answer-display" : "answer-display empty";
    const answerHint = state.revealed ? `<span class="answer-hint">정답 ${question.answer}</span>` : "";

    card.innerHTML = `
      <div class="player-top">
        <strong>${player.name}</strong>
        <span>${player.progress}m</span>
      </div>
      <section class="mini-question" aria-label="${player.name} 문제">
        <div>
          <span>${question.subject}</span>
          <span>${question.level}</span>
          ${answerHint}
        </div>
        <strong>${question.text}</strong>
      </section>
      <div class="${displayClass}" aria-live="polite">${displayValue}</div>
      <div class="pad" aria-label="${player.name} 숫자 패드"></div>
      <div class="pad-actions">
        <button class="pad-action" type="button" data-action="clear">C</button>
        <button class="pad-action" type="button" data-action="back">지움</button>
        <button class="pad-action pad-submit" type="button" data-action="submit"><span>제출</span></button>
      </div>
      <div class="feedback">${player.feedback || "대기"}</div>
    `;

    const pad = card.querySelector(".pad");
    keypadKeys.forEach((key) => {
      const button = document.createElement("button");
      button.className = "key";
      button.type = "button";
      button.textContent = key;
      button.dataset.key = key;
      button.addEventListener("click", () => pressKey(player.id, key));
      pad.append(button);
    });

    card.querySelectorAll("[data-action]").forEach((button) => {
      button.addEventListener("click", () => handleAction(player.id, button.dataset.action));
    });

    el.playersGrid.append(card);
  });
}

function currentQuestion(player) {
  if (!player.question) {
    player.question = generateQuestion();
  }
  return player.question;
}

function pressKey(playerId, key) {
  const player = findPlayer(playerId);
  if (!canType(player)) return;
  if (player.input.length >= 8) return;
  player.input += key;
  player.feedback = "";
  render();
}

function handleAction(playerId, action) {
  const player = findPlayer(playerId);
  if (action === "clear" && !player.submitted) {
    player.input = "";
    player.feedback = "";
  }
  if (action === "back" && !player.submitted) {
    player.input = player.input.slice(0, -1);
    player.feedback = "";
  }
  if (action === "submit") {
    submitAnswer(player);
    return;
  }
  render();
}

function canType(player) {
  if (!player) return false;
  if (!state.running) {
    state.message = "아직 출발 전입니다. 문제 시작을 눌러주세요.";
    render();
    return false;
  }
  if (player.submitted) {
    state.message = `${player.name}은 다음 문제로 넘어가는 중입니다.`;
    render();
    return false;
  }
  return true;
}

function submitAnswer(player) {
  if (!canType(player)) return;
  if (!player.input.trim()) {
    player.feedback = "입력 필요";
    render();
    return;
  }

  const question = currentQuestion(player);
  const isCorrect = isAnswerCorrect(player.input, question);

  if (isCorrect) {
    const move = getMoveAmount(player);
    const solvedQuestionId = question.id;
    player.progress = Math.min(100, player.progress + move);
    player.score += 120 + player.streak * 20;
    player.streak += 1;
    player.submitted = true;
    player.feedback = "정답";
    state.solvedCount += 1;
    state.message = `${player.name} 정답! 부스터 ON, ${move}m 전진하고 다음 문제가 열립니다.`;

    if (player.progress >= 100) {
      finishRace(player);
      render();
      return;
    }

    window.setTimeout(() => advancePlayerQuestion(player.id, solvedQuestionId), 650);
  } else {
    player.score = Math.max(0, player.score - 20);
    player.streak = 0;
    player.feedback = "오답";
    player.input = "";
    state.message = `${player.name} 오답. 다시 입력할 수 있습니다.`;
    window.setTimeout(() => {
      if (player.feedback === "오답") {
        player.feedback = "";
        render();
      }
    }, 700);
  }

  render();
}

function advancePlayerQuestion(playerId, solvedQuestionId) {
  const player = findPlayer(playerId);
  if (!player || !player.submitted || !player.question || player.question.id !== solvedQuestionId) return;

  player.question = generateQuestion();
  player.input = "";
  player.submitted = false;
  player.feedback = "";
  state.message = `${player.name}의 다음 문제가 준비되었습니다. 계속 달리세요.`;
  render();
}

function startQuestion() {
  ensureSelection();
  state.running = true;
  state.revealed = false;
  state.message = "각자 패드의 문제를 보고 정답을 입력하세요. 맞힌 차만 전진합니다.";
  players.forEach((player) => {
    if (!player.question) player.question = generateQuestion();
    player.input = "";
    player.submitted = false;
    player.feedback = "";
  });

  render();
}

function loadNextQuestion(startNow = false) {
  ensureSelection();
  const finishedSet = players.some((player) => player.progress >= 100);
  const shouldRun = startNow || state.running;
  state.running = shouldRun;
  state.revealed = false;
  state.message = "모든 학생의 패드가 다음 문제로 넘어갔습니다.";
  players.forEach((player) => {
    if (finishedSet) {
      player.progress = 0;
      player.streak = 0;
    }
    player.question = generateQuestion();
    player.input = "";
    player.submitted = false;
    player.feedback = "";
  });
  render();
}

function revealAnswer() {
  state.revealed = true;
  state.message = "각 학생 패드에 현재 문제의 정답이 표시됩니다.";
  render();
}

function resetGame() {
  ensureSelection();
  state.solvedCount = 0;
  state.running = false;
  state.revealed = false;
  state.message = `${getCourseLabel()} 코스를 초기화했습니다. 문제 시작을 누르세요.`;
  resetPlayersForCourse();
  render();
}

function resetPlayersForCourse() {
  players.forEach((player) => {
    player.score = 0;
    player.progress = 0;
    player.streak = 0;
    player.input = "";
    player.submitted = false;
    player.feedback = "";
    player.question = generateQuestion();
  });
}

function finishRace(winner) {
  state.running = false;
  winner.score += 300;
  winner.feedback = "승리";
  players.forEach((player) => {
    player.submitted = true;
  });
  state.message = `${winner.name} 결승 도착! 리셋으로 같은 코스를 다시 시작할 수 있습니다.`;
}

function getMoveAmount(player) {
  const base = 21;
  const streakBonus = Math.min(10, player.streak * 2);
  return base + streakBonus;
}

function isAnswerCorrect(input, question) {
  const submitted = normalizeAnswer(input);
  const answers = [question.answer, ...(question.aliases || [])].map(normalizeAnswer);
  return answers.some((answer) => answersMatch(submitted, answer));
}

function answersMatch(left, right) {
  if (left === right) return true;
  const leftNumber = answerToNumber(left);
  const rightNumber = answerToNumber(right);
  if (leftNumber === null || rightNumber === null) return false;
  return Math.abs(leftNumber - rightNumber) < 0.000001;
}

function answerToNumber(value) {
  if (/^-?\d+\/-?\d+$/.test(value)) {
    const [numerator, denominator] = value.split("/").map(Number);
    if (denominator === 0) return null;
    return numerator / denominator;
  }
  if (/^-?\d+(\.\d+)?$/.test(value)) {
    return Number(value);
  }
  return null;
}

function normalizeAnswer(value) {
  return String(value).replace(/\s/g, "").replace(/,/g, "").toLowerCase();
}

function getLeaderName() {
  const topProgress = Math.max(...players.map((player) => player.progress));
  const leaders = players.filter((player) => player.progress === topProgress);
  if (topProgress === 0 || leaders.length > 1) return "동점";
  return leaders[0].name;
}

function getCourseLabel() {
  if (!state.selectedGrade) return "학년과 단원을 선택하세요";
  const unit = getSelectedUnit();
  return unit ? `${state.selectedGrade}학년 · ${unit.title}` : `${state.selectedGrade}학년 · 단원 선택`;
}

function getSelectedUnit() {
  if (!state.selectedGrade || !state.selectedUnitId) return null;
  return curriculumMap[state.selectedGrade].find((unit) => unit.id === state.selectedUnitId) || null;
}

function ensureGrade() {
  if (!state.selectedGrade) {
    state.selectedGrade = 1;
  }
}

function ensureSelection() {
  ensureGrade();
  const units = curriculumMap[state.selectedGrade];
  if (!state.selectedUnitId || !units.some((unit) => unit.id === state.selectedUnitId)) {
    state.selectedUnitId = units[0].id;
  }
}

function findPlayer(playerId) {
  return players.find((player) => player.id === playerId);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const next = x % y;
    x = y;
    y = next;
  }
  return x || 1;
}

function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

function simplifyFraction(numerator, denominator) {
  if (numerator === 0) return "0";
  const sign = denominator < 0 ? -1 : 1;
  const top = numerator * sign;
  const bottom = Math.abs(denominator);
  const divisor = gcd(top, bottom);
  const simplifiedTop = top / divisor;
  const simplifiedBottom = bottom / divisor;
  if (simplifiedBottom === 1) return String(simplifiedTop);
  return `${simplifiedTop}/${simplifiedBottom}`;
}

function formatDecimal(value) {
  return Number(value.toFixed(2)).toString();
}

function formatComma(value) {
  return Number(value).toLocaleString("ko-KR");
}

el.startButton.addEventListener("click", startQuestion);
el.nextButton.addEventListener("click", () => loadNextQuestion(false));
el.revealButton.addEventListener("click", revealAnswer);
el.resetButton.addEventListener("click", resetGame);
el.courseButton.addEventListener("click", showUnitSelect);

render();
