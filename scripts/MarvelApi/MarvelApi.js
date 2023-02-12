class MarvelApi {

    baseEndPoint = "http://gateway.marvel.com";
    apikey = "9103478f064393d0abbd1e1da6ce0f5f";
    ts = 1;
    hash ='5ad4f5fc8927ac53a2003834cc81375a';

    characters = {
        get: (id) => {
            const endpoint = `${this.baseEndPoint}/v1/public/characters/${id}?apikey=${this.apikey}`;
            return fetch(endpoint)
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => {
                    console.error(error);
                });
        },
        list: (options = {}) => {
            const limit = options.limit || 20;
            const offset = options.offset || 0;

            const params = new URLSearchParams({
                apikey: this.apikey,
                limit: limit,
                offset: offset,
                ts: this.ts,
                hash: this.hash,
            });
            const endpoint = `${this.baseEndPoint}/v1/public/characters?${params.toString()}`;
            return fetch(endpoint, params)
                .then(response => response.json())
                .then(data => {
                    return data
                })
                .catch(error => {
                    console.error(error);
                });
        },
    }
}
