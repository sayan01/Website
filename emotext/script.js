document.querySelector("#submit").addEventListener("click", ()=>{
    text = document.querySelector("#input").value;
    output = document.querySelector("#output");
    array = ["🇦","🇧","🇨","🇩","🇪", "🇫", "🇬",
             "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳",
             "🇴", "🇵", "🇶", "🇷", "🇸", "🇹", "🇺",
             "🇻", "🇼", "🇽", "🇾", "🇿"];
    output.innerHTML = "";
    var len = text.length;
    for (var i = 0; i < len; i++){
        var char = text.charAt(i).toUpperCase();
        if(!isAlpha(char)){
            output.innerHTML = output.innerHTML + char;
            continue;
        }
        var char2 = array[char.charCodeAt(0)-65];
        output.innerHTML = output.innerHTML + char2 + " ";
    }
});

function isAlpha(str) {
    return /^[a-zA-Z]+$/.test(str);
  }