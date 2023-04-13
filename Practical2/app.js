var app=()=>{
    fetch("http://127.0.0.1:5500/sample.html")
    .then(Response=>Response.text())
    .then(data=>{var parser=new DOMParser;
        var doct = parser.parseFromString(data,"text/html");
        var img=doct.querySelector("img").src;
        var uname=doct.querySelector("p").textContent;
        var name=doct.querySelector("h1").textContent;
        var mark=doct.querySelector("h2").textContent;
        var roll=doct.querySelector("h3").textContent;

        document.getElementById("image").src=img;
        document.getElementById("Name").innerHTML=name;
        document.getElementById("Roll").innerHTML=roll;
        document.getElementById("UName").innerHTML=uname;
        document.getElementById("Mark").innerHTML=mark;
    });
}