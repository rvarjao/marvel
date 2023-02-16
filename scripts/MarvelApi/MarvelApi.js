class MarvelApi {

    baseEndPoint = "http://gateway.marvel.com";
    apikey = "9103478f064393d0abbd1e1da6ce0f5f";
    ts = 1;
    hash = '5ad4f5fc8927ac53a2003834cc81375a';
    list = {
        limit: 20,
        offset: 0
    };

    characters = {
        get: (characterId) => {
            const params = new URLSearchParams({
                apikey: this.apikey,
                limit: this.list.limit,
                offset: this.list.offset,
                ts: this.ts,
                hash: this.hash,
                characterId: characterId
            });

            const endpoint = `${this.baseEndPoint}/v1/public/characters/${characterId}?${params.toString()}`;
            return fetch(endpoint)
                .then(response => response.json())
                .then(data => data)
                .catch(error => {
                    console.error(error);
                });
        },
        list: (options = {}) => {
            this.list.limit = options.limit ?? this.list.limit ?? 20;
            this.list.offset = options.offset ?? this.list.offset ?? 0;
            const params = new URLSearchParams({
                apikey: this.apikey,
                limit: this.list.limit,
                offset: this.list.offset,
                ts: this.ts,
                hash: this.hash,
            });

            const endpoint = `${this.baseEndPoint}/v1/public/characters?${params.toString()}`;
            return fetch(endpoint, params)
                .then(response => response.json())
                .then(data => data)
                .catch(error => {
                    console.error(error);
                });
        },
        comics: (characterId) => {
            const params = new URLSearchParams({
                apikey: this.apikey,
                ts: this.ts,
                hash: this.hash,
                characterId: characterId
            });

            const endpoint = `${this.baseEndPoint}/v1/public/characters/${characterId}/comics?${params.toString()}`;
            return fetch(endpoint)
                .then(response => response.json())
                .then(data => data)
                .catch(error => {
                    console.error(error);
                });
        },
        events: (characterId) => {
            const params = new URLSearchParams({
                apikey: this.apikey,
                ts: this.ts,
                hash: this.hash,
                characterId: characterId
            });

            const endpoint = `${this.baseEndPoint}/v1/public/characters/${characterId}/events?${params.toString()}`;
            return fetch(endpoint)
                .then(response => response.json())
                .then(data => data)
                .catch(error => {
                    console.error(error);
                });
        }
    };

    comics = {
        get: (comicId) => {
            const params = new URLSearchParams({
                apikey: this.apikey,
                ts: this.ts,
                hash: this.hash,
                comicId: comicId
            });

            const endpoint = `${this.baseEndPoint}/v1/public/comics/${comicId}?${params.toString()}`;
            return fetch(endpoint)
                .then(data => data)
                .catch(error => {
                    console.error(error);
                });
        }
    };

    resources = {
        get: (resourceURI) => {
            const params = new URLSearchParams({
                apikey: this.apikey,
                ts: this.ts,
                hash: this.hash,
            });

            const endpoint = `${resourceURI}?${params.toString()}`;
            return fetch(endpoint)
                .then(response => response.json())
                .then(data => data)
                .catch(error => {
                    console.error(error);
                });
        }
    };

}
