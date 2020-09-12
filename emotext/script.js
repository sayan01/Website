var input = document.querySelector("#input");
var output = document.querySelector("#output");
var sub = document.querySelector("#submit");
var copy = document.querySelector("#copy");
var out = ""

sub.addEventListener("click", submit);
input.addEventListener("keyup",(e)=>{
    if(e.keyCode === 13){
        submit();
    }
});
copy.addEventListener("click", ()=>{
    copyTextToClipboard(out);
});

function submit(){
    text = input.value.toUpperCase();
    letter = ["🇦","🇧","🇨","🇩","🇪","🇫","🇬","🇭",
        "🇮","🇯","🇰","🇱","🇲","🇳","🇴","🇵","🇶",
        "🇷","🇸","🇹","🇺","🇻","🇼","🇽","🇾", "🇿"];
    number = ["0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣",
              "9️⃣"]
    out = "";
    var len = text.length;
    for (var i = 0; i < len; i++){
        var char = text.charAt(i);
        if(isAlpha(char)){
            var char2 = letter[char.charCodeAt(0)-65];
            out += char2 + " ";
        }
        else if(isNum(char)){
            var char2 = number[char.charCodeAt(0)-48];
            out += char2 + "";
        }
        else{
            out += char + "";
            continue;
        }
    }
    output.innerHTML = out;
    copy.disabled = out==="";
}
function isAlpha(str) {
    return /^[a-zA-Z]+$/.test(str);
}
function isNum(str) {
    return /^[0-9]+$/.test(str);
}
function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
  
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
  
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
  
    document.body.removeChild(textArea);
  }
  function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }