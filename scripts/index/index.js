document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        const index = new Index();
        index.init();
    }
}

class Index {

    init() {
        const marvelApi = new MarvelApi();
        marvelApi.characters.list().then(data => {
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

}
