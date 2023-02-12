class CharacterCard {
    constructor(character) {
        this.character = character;
    }

    card () {
        const card = document.createElement("div");
        card.classList.add("col-4");
        const article = document.createElement("article");
        const header = document.createElement("header");
        const image = document.createElement("img");
        image.src = `${this.character.thumbnail.path}.${this.character.thumbnail.extension}`;
        image.alt = this.character.name;
        header.appendChild(image);

        const link = document.createElement("a");
        link.href = `./pages/character.html?id=${this.character.id}`;
        link.textContent = this.character.name;

        const footer = document.createElement("footer");
        const table = document.createElement("table");
        const tbody = document.createElement("tbody");
        const content = {
            Series: this.character.series.available,
            Stories: this.character.stories.available,
            Comics: this.character.comics.available,
            Events: this.character.events.available,
        };

        for (const key in content) {
            const tr = document.createElement("tr");
            const th = document.createElement("th");
            th.textContent = key;
            const td = document.createElement("td");
            td.textContent = content[key];
            tr.appendChild(th);
            tr.appendChild(td);
            tbody.appendChild(tr);
        }

        table.appendChild(tbody);
        footer.appendChild(table);


        article.appendChild(header);
        article.appendChild(link);
        article.appendChild(footer);

        card.appendChild(article);

        return card;
    }

}
