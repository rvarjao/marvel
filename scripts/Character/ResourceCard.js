class ResourceCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    set title(title) {
        this._title = title;
    }
    set image(image) {
        this._image = image;
    }
    set description(description) {
        this._description = description;
    }
    render() {
        this.shadowRoot.innerHTML = this.shadowRootInnerHtml();
        if (this._image) {
            this.shadowRoot.querySelector("#resource-image").src = this._image;
            this.shadowRoot.querySelector("#resource-image").alt = this._title;
        }
        this.shadowRoot.querySelector("#resource-title").textContent = this._title;
    }
    shadowRootInnerHtml() {
        return `<style>
            .card {
                margin: 10px;
                padding: 10px;
            }
            .card-image {
                height: 10rem;
                object-fit: cover;
                display: block;
            }
        </style>
        <div class="card">
            <img id="resource-image" class="card-image" src="" alt="">
            <span id="resource-title"></span>
        </div>`;
    }
}

customElements.define("resource-card", ResourceCard);
