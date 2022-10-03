class MarvelService {
     _apiBase = 'https://gateway.marvel.com:443/v1/public/';
     _apiKey = 'apikey=edab933bdc894b2b8f0d1798c98d5395';
     _offsetStandart = 210

     getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }
    getAllCharacters = async (offset = this._offsetStandart)=>{
        const charepters = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
            return charepters.data.results.map(this._changeChar)
    }
    getCharacter = async (id) => {
        const charepter = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._changeChar(charepter.data.results[0])
    }
    _changeChar = (char)=>{
            return{
                id: char.id,
                name: char.name,
                description: char.description ,
                thumbnail :char.thumbnail.path + '.' + char.thumbnail.extension,
                homepage : char.urls[0].homepage,
                wiki : char.urls[1].wiki,
                comics: char.comics.items
            }
    }
}
export default MarvelService;