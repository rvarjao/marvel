document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        const index = new Index();
        index.init();
    }
}

class Index {
    constructor() {
        this.marvelApi = new MarvelApi();
    }
    init () {
        const url = new URL(window.location.href);
        const id = url.searchParams.get("id");
        if (!id) {
            return;
        }
        this.marvelApi.characters.get(id).then(data => {
            const result = data.data.results[0];
            if (!result) {
                return;
            }
            const character = new CharacterDetail();
            character.character = result;
            const characterContainer = document.getElementById("character-container");
            characterContainer.innerHTML = "";
            characterContainer.appendChild(character);
        });
    }
}
