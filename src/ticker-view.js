import './ticker.css';

class TickerView {
  #root;

  #ticker;

  constructor(root) {
    this.#root = root;
  }

  load() {
    this.#ticker= document.createElement('div');

    this.#root.appendChild(this.#ticker);

    this.#loadTicker();
  }

  #loadTicker() {
    this.#ticker.classList.add('ticker');
  }

  displayMessage(msgStr) {
    this.clear();

    let tickerText = document.createElement('p');
    tickerText.innerText = '--- ' + msgStr + ' ---';

    for (let i = 0; i < 3; i += 1) {
      this.#ticker.appendChild(tickerText.cloneNode(true));
    }
  }

  clear() {
    this.#ticker.innerHTML = '';
  }
}

export default TickerView;
