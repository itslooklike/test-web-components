import { UserCard } from './UserCard.js'
window.customElements.define('user-card', UserCard)
const template = document.createElement('template')

template.innerHTML = `
  <link rel="stylesheet" href="https://unpkg.com/sakura.css/css/sakura.css" type="text/css">
  <div id="card-list"></div>
`

export class CardList extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.container = this.shadowRoot.querySelector('#card-list')
  }

  async connectedCallback() {
    const response = await fetch('https://randomuser.me/api/?results=13')
    const { results } = await response.json()

    const cards = results
      .map(
        ({ name: { first, last }, email, phone, picture: { large } }) => `
      <user-card name="${first} ${last}" avatar="${large}">
        <div slot="email">${email}</div>
        <div slot="phone">${phone}</div>
      </user-card>
    `
      )
      .join('\n')

    const node = document.createElement('div')
    node.innerHTML = cards
    this.container.appendChild(node)
  }
}
