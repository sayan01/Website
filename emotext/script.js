input = document.querySelector("#input");
output = document.querySelector("#output");
button = document.querySelector("#submit");

button.addEventListener("click", submit);
input.addEventListener("keyup",(e)=>{
    if(e.keyCode === 13){
        submit();
    }
});

function submit(){
    text = input.value.toUpperCase();
    letter = ["🇦","🇧","🇨","🇩","🇪","🇫","🇬","🇭",
        "🇮","🇯","🇰","🇱","🇲","🇳","🇴","🇵","🇶",
        "🇷","🇸","🇹","🇺","🇻","🇼","🇽","🇾", "🇿"];
    number = ["0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣",
              "9️⃣"]
    output.innerHTML = "";
    var len = text.length;
    for (var i = 0; i < len; i++){
        var char = text.charAt(i);
        if(isAlpha(char)){
            var char2 = letter[char.charCodeAt(0)-65];
            output.innerHTML += char2 + " ";
        }
        else if(isNum(char)){
            var char2 = number[char.charCodeAt(0)-48];
            output.innerHTML += char2 + "";
        }
        else{
            output.innerHTML += char;
            continue;
        }
    }
}
function isAlpha(str) {
    return /^[a-zA-Z]+$/.test(str);
}
function isNum(str) {
    return /^[0-9]+$/.test(str);
}