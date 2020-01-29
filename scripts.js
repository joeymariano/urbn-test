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
    fetch(`https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=United+States&api_key=8834627c4bb1245c48a7f26707e73ebd&format=json`)
        .then((response) => {
            return response.json()
        })
        .then((artistJson) => {
            let artists = artistJson.topartists.artist.map((obj, index) => new Artist(obj.name, obj.url, obj.listeners))
            populateHtml(artists)
        })
}

function populateHtml(sortedArtists) {
    // clone template
    sortedArtists.forEach(
        (obj, index) => {
            if (index === 0) {
                // populate first template
                document.getElementsByClassName('artist-name')[0].textContent = '#' + `${index + 1} ` + obj.name
                document.getElementsByClassName('listeners')[0].textContent = obj.listeners + ` listeners`
            } else {
                let cards = document.getElementById('cards')
                let cardTemplate = document.getElementsByClassName('card')[0].cloneNode(true)

                cards.appendChild(cardTemplate)

                document.getElementsByClassName('artist-name')[index].textContent = '#' + `${index + 1} ` + obj.name
                document.getElementsByClassName('listeners')[index].textContent = obj.listeners + ` listeners`
            }
        }
    )
}