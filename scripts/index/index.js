document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        const index = new Index();
        index.init();
    }
}

class Index {
    marvelApi = new MarvelApi();

    init() {
        this.marvelApi.characters.list().then(data => {
            const results = data.data.results;
            if (!results) {
                return;
            }
            const characters = results.map(character => new CharacterCard(character));
            const charactersContainer = document.getElementById("row-characters");
            characters.forEach(character => {
                charactersContainer.appendChild(character.card());
            });
        });

        document.addEventListener("scroll", () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            if (Math.ceil(scrolled) === scrollable) {
                const offset = this.marvelApi.list.offset + this.marvelApi.list.limit;
                this.marvelApi.characters.list({ offset: offset }).then(data => {
                    const results = data.data.results;
                    if (!results) {
                        return;
                    }
                    const characters = results.map(character => new CharacterCard(character));
                    const charactersContainer = document.getElementById("row-characters");
                    characters.forEach(character => {
                        charactersContainer.appendChild(character.card());
                    });
                });
            }
        });
    }

}
