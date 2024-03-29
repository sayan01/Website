/* recent blogs and recent videos */
bloge = document.querySelector("#bloglist");
videoe = document.querySelector('#videolist');
cproxyURL = 'https://sayncors.herokuapp.com/'
// cproxyURL = 'http://0.0.0.0:5000/'

/* blogs */
feedURL = 'https://saynblog.blogspot.com/feeds/posts/default';
fetch(cproxyURL + feedURL).then(response => {
    response.text().then(text => {
        parser = new DOMParser();
        xml = parser.parseFromString(text, 'text/xml');
        entries = xml.getElementsByTagName("entry");
        var count = 0;
        for (i = 0; i < entries.length; i++) {
            entry = entries[i].childNodes;
            for (var j = 0; j < entry.length; j++) {
                if (entry[j].nodeName === 'link' && entry[j].getAttributeNode('rel').value === 'alternate') {
                    var title = entry[j].getAttributeNode('title').value;
                    var link = entry[j].getAttributeNode('href').value;
                    bloge.appendChild(createCard(title, link));
                    count++;
                    break;
                }
            }
        }
        if (count == 0) {
            bloge.innerHTML = "Nothing here!"
        }
    });
});

/* videos */
videorss = 'https://www.youtube.com/feeds/videos.xml?channel_id=';
channelid = 'UCFupCEK--j387JHG8uS5Qcg';
fetch(cproxyURL + videorss + channelid).then(response => {
    response.text().then(text => {
        parser = new DOMParser();
        xml = parser.parseFromString(text, 'text/xml');
        entries = xml.getElementsByTagName("entry");
        var count = 0;
        recentThreshold = 365; // how many days old video should be NOT-recent?
        for (i = 0; i < entries.length; i++) {
            const entry = entries[i].children;
            var title = entry[3].innerHTML;
            var link = entry[4].getAttributeNode('href').value;
            var date = entry[6].innerHTML;
            var thumblink = entry[8].children[2].getAttributeNode('url').value;
            if (daydiff(date) < recentThreshold) {
                videoe.appendChild(createCard(title, link, thumblink, date))
                count++;
            }
            if (count == 6) break;
        }
        if (count == 0) {
            videoe.innerHTML = "Nothing here!"
        }
    });
});

/* footer year */

foote = document.getElementsByTagName('footer');
year = new Date().getFullYear();
foote[0].innerHTML = foote[0].innerHTML.replace("##year##", year);

function createCard(title, link, image, date) {
    var card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("bg-dark");

    var cardheader = document.createElement("div");
    cardheader.classList.add("card-header");

    var cardbody = document.createElement("div");
    cardbody.classList.add("card-body");

    var cardtitle = document.createElement("h2");
    cardtitle.classList.add("card-title");
    cardtitle.innerHTML = title;

    var cardtext = document.createElement("div");
    cardtext.classList.add("card-text");

    var cardbutton = document.createElement("a");
    cardbutton.setAttribute('href', link);
    cardbutton.setAttribute('target', '_blank');

    if (!image) {
        cardbutton.classList.add('btn', 'btn-primary');
        cardbutton.innerHTML = 'Read the Blog'    
    }
    else {
        var cardimage = document.createElement("img");
        cardimage.setAttribute('src', image);
        cardimage.setAttribute('alt', 'thumbnail');

        var imageholder = document.createElement("div");
        imageholder.classList.add('imgcon');
        imageholder.appendChild(cardimage);
        cardbutton.appendChild(imageholder);
    }

    cardbody.appendChild(cardtext);
    cardbody.appendChild(cardbutton);
    cardheader.append(cardtitle);
    card.appendChild(cardheader);
    card.appendChild(cardbody);

    if (date) {
        var cardfooter = document.createElement('div');
        cardfooter.classList.add('card-footer');
        cardfooter.innerHTML = daydiff(date) + ' days ago'
        card.appendChild(cardfooter);
    }

    return card;
}

function unhide(classname) {
    document.querySelectorAll(classname).forEach(element => {
        element.setAttribute('style', 'display:inherit');
    });
}

function daydiff(date) {
    milsecinaDay = 86400 * 1000;
    return Math.floor((new Date() - new Date(date)) / milsecinaDay)
}