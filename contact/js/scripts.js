function SendMail(){
	var link = 'mailto:me@sayn.work';
	var subject,body,i=0;
	Subject = document.getElementById("subject");
	Body = document.getElementById("body");
	subject = Subject.value;
	body	= Body.value;
	subject = encodeURIComponent(subject);
	body = encodeURIComponent(body);
	if( subject!='' ) {
		link += (i++==0?'?':'&');
		link += 'subject='+subject;
	}
	if( body!='' ) {
		link += (i++==0?'?':'&');
		link += 'body='+body;
	}
	link=link.replace(/%0A/g,"%0D%0A");
	window.open(link);
	Subject.value="";
	Body.value="";
}
Button = document.getElementById("button");
Button.addEventListener("click", SendMail);
