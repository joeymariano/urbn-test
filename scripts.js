// create Show class - contains title imgUrl artist and rating
// API call to data.json on window load
// parse data and organize with Show class
// populate template information with info from first show
// iterate over shows
// copy previous divs and repopulate

class Artist {
    constructor(name, url, listeners) {
        this.name = name
        this.url = url
        this.listeners = listeners
    }
}

window.onload = function() {
    // api call
    fetch(`https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=8834627c4bb1245c48a7f26707e73ebd&format=json`)
        .then((response) => {
            return response.json()
        })
        .then((artistJson) => {
            let artists = artistJson.topartists.artist.map((obj, index) => new Artist(obj.name, obj.url, obj.listeners))
            populateHtml(artists)
        })
}

function populateHtml(sortedArtists) {
    debugger
    sortedArtists.forEach(
        (obj, index) => {
            if (index === 0) {
                // populate first template
                document.getElementsByTagName('img')[0].src = obj.imgUrl
                document.getElementsByClassName('show-title')[0].textContent = `"` + obj.title + `"`
                document.getElementsByClassName('show-artist')[0].textContent = obj.artist
                document.getElementsByClassName('show-rating')[0].textContent = obj.rating
            } else {
                // clone first card
                let cardTemplate = document.getElementsByClassName('card')[0].cloneNode(true)
                let cards = document.getElementsByClassName('cards')
                // add template
                cards[cards.length - 1].appendChild(cardTemplate)
                // populate information
                document.getElementsByTagName('img')[index].src = obj.imgUrl
                document.getElementsByClassName('show-title')[index].textContent = `"` + obj.title + `"`
                document.getElementsByClassName('show-artist')[index].textContent = obj.artist
                document.getElementsByClassName('show-rating')[index].textContent = obj.rating
            }
        }
    )
}