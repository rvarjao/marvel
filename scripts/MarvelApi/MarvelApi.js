class MarvelApi {
    baseEndPoint = "http://gateway.marvel.com";
    apikey = "9103478f064393d0abbd1e1da6ce0f5f";

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
        list: () => {
            const params = new URLSearchParams({
                apikey: this.apikey,
                limit: 100,
                ts: 1,
                hash:'5ad4f5fc8927ac53a2003834cc81375a',
            });
            const endpoint = `${this.baseEndPoint}/v1/public/characters?${params.toString()}`;
            return fetch(endpoint, params)
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => {
                    console.error(error);
                });
        },
    }
}