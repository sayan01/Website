bloge = document.querySelector("#bloglist");
cproxyURL = 'https://cors-anywhere.herokuapp.com/'
feedURL = 'https://saynblog.blogspot.com/feeds/posts/default';
fetch(cproxyURL + feedURL).then(response => {
    response.text().then(text => {
        parser = new DOMParser();
        xml = parser.parseFromString(text, 'text/xml');
        entries = xml.getElementsByTagName("entry");
        var i = 0;
        for (i = 0; i < entries.length; i++) {
            entry = entries[i].childNodes;
            for (var j = 0; j < entry.length; j++) {
                if (entry[j].nodeName === 'link' && entry[j].getAttributeNode('rel').value === 'alternate') {
                    var title = entry[j].getAttributeNode('title').value;
                    var link = entry[j].getAttributeNode('href').value;
                    bloge.appendChild(createCard(title, link));
                    break;
                }
            }
        }
        if (i != 0) {
            blogh = document.querySelector('#blogheading');
            blogh.setAttribute('style', 'display:inherit');
        }
    });
});

function createCard(title, link) {
    var card = document.createElement("div");
    card.classList.add("card");

    var cardbody = document.createElement("div");
    cardbody.classList.add("card-body");

    var cardtitle = document.createElement("h2");
    cardtitle.classList.add("card-title");
    cardtitle.innerHTML = title;

    var cardtext = document.createElement("p");
    cardtext.classList.add("card-text");

    var cardbutton = document.createElement("a");
    cardbutton.setAttribute('href', link);
    cardbutton.setAttribute('class', 'btn btn-success');
    cardbutton.setAttribute('target', '_blank');
    cardbutton.innerHTML = 'Read the Blog'

    cardtext.appendChild(cardbutton);
    cardbody.appendChild(cardtitle);
    cardbody.appendChild(cardtext);
    card.appendChild(cardbody);
    return card;
}
