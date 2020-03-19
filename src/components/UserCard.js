const template = document.createElement('template')

template.innerHTML = `
  <link rel="stylesheet" href="https://unpkg.com/sakura.css/css/sakura.css" type="text/css">

  <style>
    h3 {
      color: coral;
      margin: 0 0 20px;
    }

    img {
      object-fit: cover;
      margin-right: 20px
    }

    .user-card {
      display: inline-flex;
      padding: 20px;
      border: 1px solid gray;
    }
  </style>

  <div class="user-card">
    <div>
      <h3></h3>
      <img width="100" height="100" />
    </div>

    <div>
      <div>
        <button id="toggle-info">Hide Info</button>
      </div>
      <div class="info">
        <p><slot name="email"></slot></p>
        <p><slot name="phone"></slot></p>
      </div>
    </div>
  </div>
`

class UserCard extends HTMLElement {
  constructor() {
    super()
    this.showInfo = true
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name')
    this.shadowRoot.querySelector('img').src = this.getAttribute('avatar')
    console.log(this.getAttribute('avatar'))
  }

  toggleInfo() {
    this.showInfo = !this.showInfo
    const info = this.shadowRoot.querySelector('.info')
    const toggleBtn = this.shadowRoot.querySelector('#toggle-info')

    if (this.showInfo) {
      info.style.display = 'block'
      toggleBtn.innerText = 'Hide Info'
    } else {
      info.style.display = 'none'
      toggleBtn.innerText = 'Show Info'
    }
  }

  connectedCallback() {
    console.log('connectedCallback')
    this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo())
  }

  disconnectedCallback() {
    console.log('disconnectedCallback')
    this.shadowRoot.querySelector('#toggle-info').removeEventListener()
  }

  attributeChangedCallback(attributeName, opdValue, newValue) {}
}

export default UserCard
