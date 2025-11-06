class HelloWorld extends HTMLElement {
  static get observedAttributes() {
    return ['name'];
  }

  #name = '';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (!this.#name) {
      this.#name = this.getAttribute('name') || 'World';
    }
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'name') this.name = newValue;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    if (newName === this.#name) return;
    this.#name = newName;
    this.setAttribute('name', newName);
    this.render();
  }

  render() {
    const { shadowRoot } = this;
    if (shadowRoot) shadowRoot.innerHTML = `<p>Hello, ${this.#name}!</p>`;
  }
}

if (!customElements.get('hello-world')) {
  customElements.define('hello-world', HelloWorld);
}
