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
        this.shadowRoot.innerHTML = `
            <style>
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
                #row-comics {
                    max-width: 100%;
                    overflow-x: auto;
                    display: flex;
                    flex-wrap: nowrap;
                }
                #row-comics > figure {
                    margin: 0 1.0rem;
                }
                #row-comics > div {
                    margin: 0 1.0rem;
                }
                #row-comics > div > img {
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
                        <div id="row-comics">
                        </div>
                    </figure>
                </comics>
                <section>
                    <h3>Events</h3>
                    <div class="row" id="row-events">
                    </div>
                </section>
                <section>
                    <h3>Series</h3>
                    <div class="row" id="row-series">
                    </div>
                </section>
                <section>
                    <h3>Stories</h3>
                    <div class="row" id="row-stories">
                    </div>
                </section>
        `;
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
                const comic = results[0];
                const image = comic.thumbnail.path + "." + comic.thumbnail.extension;

                const card = document.createElement("div");
                card.innerHTML = `
                    <img src="${image}" alt="${comic.title}">
                    <span>${comic.title}</span>
                `;
                this.shadowRoot.querySelector("#row-comics").appendChild(card);
            });

        });
        // this._character.events.items.forEach(event => {
        //     const card = document.createElement("div");
        //     card.classList.add("card", "col-6");
        //     card.innerHTML = `
        //         <img src="${event.thumbnail.path}.${event.thumbnail.extension}" alt="${event.name}">
        //         <a href="${event.urls[0].url}">${event.name}</a>
        //         <footer>
        //             <table>
        //                 <tr>
        //                     <th>Start:</th>
        //                     <td>${event.start}</td>
        //                 </tr>
        //                 <tr>
        //                     <th>End:</th>
        //                     <td>${event.end}</td>
        //                 </tr>
        //             </table>
        //         </footer>
        //     `;
        //     this.shadowRoot.querySelector("#row-events").appendChild(card);
        // });
        // this._character.series.items.forEach(serie => {
        //     const card = document.createElement("div");
        //     card.classList.add("card", "col-6");
        //     card.innerHTML = `
        //         <img src="${serie.thumbnail.path}.${serie.thumbnail.extension}" alt="${serie.name}">
        //         <a href="${serie.urls[0].url}">${serie.name}</a>
        //         <footer>
        //             <table>
        //                 <tr>
        //                     <th>Start:</th>
        //                     <td>${serie.startYear}</td>
        //                 </tr>
        //                 <tr>
        //                     <th>End:</th>
        //                     <td>${serie.endYear}</td>
        //                 </tr>
        //             </table>
        //         </footer>
        //     `;
        //     this.shadowRoot.querySelector("#row-series").appendChild(card);
        // });
        // this._character.stories.items.forEach(story => {
        //     const card = document.createElement("div");
        //     card.classList.add("card", "col-12");
        //     card.innerHTML = `
        //         <a href="${story.urls[0].url}">${story.name}</a>
        //         <footer>
        //             <table>
        //                 <tr>
        //                     <th>Type:</th>
        //                     <td>${story.type}</td>
        //                 </tr>
        //             </table>
        //         </footer>
        //     `;
        //     this.shadowRoot.querySelector("#row-stories").appendChild(card);
        // });
    }
}

customElements.define("character-detail", CharacterDetail);