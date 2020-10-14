const blue = document.getElementById('blue');
const purple = document.getElementById('purple');
const orange = document.getElementById('orange');
const green = document.getElementById('green');
const btnBegin = document.getElementById('btnBegin');
const LAST_LEVEL = 5;

class Game {
  constructor() {
    this.init = this.init.bind(this);
    this.init();
    this.generateSequence();
    this.nextLevel();
  }

  init() {
    this.level = 1;
    this.colors = [blue, purple, orange, green];
    this.selectColor = this.selectColor.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
    this.toogleBtnBegin();
  }

  toogleBtnBegin() {
    btnBegin.classList.contains('hide')
      ? btnBegin.classList.remove('hide')
      : btnBegin.classList.add('hide');
  }

  generateSequence() {
    this.sequence = new Array(LAST_LEVEL)
      .fill(0)
      .map((item) => Math.floor(Math.random() * 4));
  }

  nextLevel() {
    this.subLevel = 0;
    this.lightSequence();
    this.createClickEvents();
  }

  lightSequence() {
    for (let i = 0; i < this.level; i++) {
      const item = this.sequence[i];
      setTimeout(() => {
        this.lightColor(item);
      }, 1000 * i);
    }
  }

  lightColor(color) {
    this.colors[color].classList.add('light');
    setTimeout(() => {
      this.offColor(color);
    }, 500);
  }

  offColor(color) {
    this.colors[color].classList.remove('light');
  }

  createClickEvents() {
    this.colors.forEach((item) =>
      item.addEventListener('click', this.selectColor)
    );
  }

  removeClickEvents() {
    this.colors.forEach((item) =>
      item.removeEventListener('click', this.selectColor)
    );
  }

  selectColor(event) {
    const colorSelected = event.target.getAttribute('data-color');
    const numColor = this.colors.findIndex((item) => item.id == colorSelected);
    this.validateSelectedColor(numColor);
  }

  validateSelectedColor(numColor) {
    if (numColor === this.sequence[this.subLevel]) {
      this.subLevel++;
      if (this.subLevel === this.level) {
        this.level++;
        this.removeClickEvents();
        if (this.level === LAST_LEVEL + 1) {
          this.winner();
        } else {
          setTimeout(() => {
            this.nextLevel();
          }, 2000);
        }
      }
    } else {
      this.looser();
    }
  }

  winner() {
    swal('Simon Said', 'You the the winnie!', 'success').then(() => {
      this.restartGame();
    });
  }

  looser() {
    swal('Simon Said', 'Buuu! Looser ', 'error').then(() => {
      this.restartGame();
    });
  }

  restartGame() {
    this.removeClickEvents();
    this.init();
    btnBegin.innerHTML = "Let's go again!";
  }
}
function startGame() {
  swal('The game will start soon. Get Ready', {
    buttons: false,
    timer: 2000,
  }).then(() => {
    var game = new Game();
  });
}
