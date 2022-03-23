import './button.css';
import './start.css';
import GameEvent from './game-event.js';
import RobotImage from './assets/game-graphics/admiral.svg';

class StartView {
  #root;

  constructor(root) {
    this.#root = root;
    this.startEvent = new GameEvent();
  }

  load() {
    let img = document.createElement('img');
    let tagline = document.createElement('h2');
    let startBtn = document.createElement('div');

    img.classList.add('admiral');
    img.src = RobotImage;

    tagline.classList.add('tagline');
    tagline.innerText = 'Can you defeat Admiral Gizmotron?';

    startBtn.classList.add('btn');
    startBtn.innerText = 'Start';
    startBtn.addEventListener('click', () => this.startEvent.trigger());

    this.#root.appendChild(tagline);
    this.#root.appendChild(img);
    this.#root.appendChild(startBtn);
  }

  clear() {
    this.#root.innerHTML = '';
  }
}

export default StartView;
