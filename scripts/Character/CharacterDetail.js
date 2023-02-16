class CharacterDetail extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    set character(character) {
        this._character = character;
        this.render();
    }
    render() {
        this.shadowRoot.innerHTML = this.shadowRootInnerHtml();
        this.shadowRoot.querySelector("#character-image").src = `${this._character.thumbnail.path}.${this._character.thumbnail.extension}`;
        this.shadowRoot.querySelector("#character-image").alt = this._character.name;
        this.shadowRoot.querySelector("#character-name").textContent = this._character.name;
        this.shadowRoot.querySelector("#character-description").textContent = this._character.description;

        this._character.comics.items.forEach(comic => {

            const marvelApi = new MarvelApi();
            marvelApi.resources.get(comic.resourceURI).then(resource => {
                const data = resource.data;
                if (!data) {
                    return;
                }
                const results = data.results;
                if (!results) {
                    return;
                }

                const resourceCard = new ResourceCard();
                const result = results[0];
                resourceCard.title = result.title;
                resourceCard.image = result.thumbnail.path + "." + result.thumbnail.extension;
                resourceCard.description = result.description;
                resourceCard.render();
                this.shadowRoot.querySelector("#row-comics").appendChild(resourceCard);
            });
        });
        this._character.events.items.forEach(event => {
            const marvelApi = new MarvelApi();
            marvelApi.resources.get(event.resourceURI).then(resource => {
                const data = resource.data;
                if (!data) {
                    return;
                }
                const results = data.results;
                if (!results) {
                    return;
                }

                const result = results[0];
                const resourceCard = new ResourceCard();
                resourceCard.title = result.title;
                resourceCard.image = result.thumbnail.path + "." + result.thumbnail.extension;
                resourceCard.description = result.description;
                resourceCard.render();
                this.shadowRoot.querySelector("#row-events").appendChild(resourceCard);
            });
        });
        this._character.series.items.forEach(serie => {
            const marvelApi = new MarvelApi();
            marvelApi.resources.get(serie.resourceURI).then(resource => {
                const data = resource.data;
                if (!data) {
                    return;
                }
                const results = data.results;
                if (!results) {
                    return;
                }

                const result = results[0];
                const resourceCard = new ResourceCard();
                resourceCard.title = result.title;
                resourceCard.image = result.thumbnail.path + "." + result.thumbnail.extension;
                resourceCard.description = result.description;
                resourceCard.render();
                this.shadowRoot.querySelector("#row-series").appendChild(resourceCard);
            });
        });
        this._character.stories.items.forEach(story => {
            const marvelApi = new MarvelApi();
            marvelApi.resources.get(story.resourceURI).then(resource => {
                const data = resource.data;
                if (!data) {
                    return;
                }
                const results = data.results;
                if (!results) {
                    return;
                }

                const result = results[0];
                const resourceCard = new ResourceCard();
                console.log(result);
                resourceCard.title = result.title;
                resourceCard.image = result.thumbnail ? result.thumbnail.path + "." + result.thumbnail.extension : null;
                resourceCard.description = result.description;
                resourceCard.render();
                this.shadowRoot.querySelector("#row-stories").appendChild(resourceCard);
            });
        });
    };

    shadowRootInnerHtml() {
        return `<style>
        article {
            display: grid;
            grid-template-columns: 1fr 2fr;
            grid-template-rows: 1fr 1fr;
            grid-template-areas:
                "header header"
                "comics events"
                "series stories";
        }
        header {
            grid-area: header;
        }
        header > img {
            max-height: 10rem;
            object-fit: contain;
        }
        #character-image {
            width: 100%;
        }
        #character-name {
            text-align: center;
        }
        #character-description {
            text-align: center;
        }
        .row-cards {
            max-width: 100%;
            overflow-x: auto;
            display: flex;
            flex-wrap: nowrap;
        }
        .row-cards > figure {
            margin: 0 1.0rem;
        }
        .row-cards > div {
            margin: 0 1.0rem;
        }
        .row-cards > div > img {
            max-height: 10rem;
            object-fit: contain;
        }
    </style>
        <header>
            <img src="" alt="" id="character-image">
            <h1 id="character-name"></h1>
            <p id="character-description"></p>
        </header>
        <comics>
            <h3>Comics</h3>
            <figure>
                <div id="row-comics" class='row-cards'>
                </div>
            </figure>
        </comics>
        <events>
            <h3>Events</h3>
            <figure>
                <div class="row-cards" id="row-events">
                </div>
            </figure>
        </events>
        <series>
            <h3>Series</h3>
            <div class="row-cards" id="row-series">
            </div>
        </series>
        <stories>
            <h3>Stories</h3>
            <div class="row-cards" id="row-stories">
            </div>
        </stories>`
    };

}

customElements.define("character-detail", CharacterDetail);