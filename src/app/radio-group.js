// @ts-nocheck
const html = String.raw;

const template = document.createElement("template");
template.innerHTML = html`
  <style>
    div {
      display: flex;
      gap: 1rem;

      > div {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
    }
  </style>
  <div></div>
`;

export class RadioGroup extends HTMLElement {
  labels = "";
  name = "";
  values = "";
  #value = ""; // managed by a getter and setter

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.labels = this.getAttribute("labels");
    this.name = this.getAttribute("name");
    this.#value = this.getAttribute("initial");
    this.values = this.getAttribute("values");

    this.render();

    const inputs = this.shadowRoot.querySelectorAll("input");
    for (const input of inputs) {
      input.addEventListener("change", (event) => {
        this.value = event.target.value;
      });
    }
  }

  get value() {
    return this.#value;
  }

  set value(v) {
    this.#value = v;

    const inputs = this.shadowRoot.querySelectorAll("input");
    for (const input of inputs) {
      input.checked = input.value === this.#value;
    }

    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: this.#value },
        bubbles: true,
        composed: true,
      })
    );
  }

  makeButtons() {
    const labelArray = this.labels.split(",");
    const valueArray = this.values.split(",").map((value) => value.trim());
    return valueArray
      .map(
        (value, index) =>
          html`<div>
            <input
              type="radio"
              id="${value}"
              name="${this.name}"
              value="${value}"
              ${value === this.value ? "checked" : ""}
            />
            <label for="${value}">${labelArray[index]}</label>
          </div>`
      )
      .join("");
  }

  render() {
    const dom = template.content.cloneNode(true);
    dom.querySelector("div").innerHTML = this.makeButtons();
    this.shadowRoot.replaceChildren(dom);
  }
}

if (!customElements.get("radio-group")) {
  customElements.define("radio-group", RadioGroup);
}
