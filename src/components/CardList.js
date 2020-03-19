const template = document.createElement('template')

template.innerHTML = `
  <div id="card-list"></div>
`

export class CardList extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.container = this.shadowRoot.querySelector('#card-list')
  }

  async initUserCard() {
    const { UserCard } = await import('./UserCard.js')
    window.customElements.define('user-card', UserCard)
  }

  getCards(props) {
    const {
      name: { first, last },
      email,
      phone,
      picture: { large },
    } = props

    return `
      <user-card name="${first} ${last}" avatar="${large}">
        <div slot="email">${email}</div>
        <div slot="phone">${phone}</div>
      </user-card>
    `.trim()
  }

  async connectedCallback() {
    let data = 'Сервис не доступен'

    try {
      const response = await fetch('https://randomuser.me/api/?results=3')
      const { results } = await response.json()

      await this.initUserCard()

      data = results.map(this.getCards).join('\n')
    } catch (err) {
      console.log(err)
    }

    const node = document.createElement('div')
    node.innerHTML = data
    this.container.appendChild(node)
  }
}
