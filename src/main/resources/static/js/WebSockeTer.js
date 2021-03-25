function connect() {
    console.log("connect");
    // var webSocket=new WebSocket("ws://localhost:8080/websocket");
    var webSocket;
    ip=localStorage.getItem("IP");
    console.log("ip:"+ip);
    if(ip!=null&&ip!="localhost"){
        console.log("url:"+localStorage.getItem("WS"));
        var str=ip.search(".*[a-zA-Z]+.*");
        console.log("str:"+str);
        if(str=="-1"){
            webSocket=new WebSocket("ws://"+ip+":8080/websocket");
        }else{
            webSocket=new WebSocket("ws://"+localStorage.getItem("WS")+"/websocket");
        }
    }else{
        webSocket=new WebSocket("ws://localhost:8080/websocket");
    }
    webSocket.onopen=function (ev) {
        // webSocket.send("发送数据");
        alert("连接成功");
    };
    webSocket.onmessage=function (ev) {
        var data=ev.data;
        var result=confirm(data);
        if(result){
            updateSeats("1");
            alert("你同意了请求");
        }else {
            updateSeats("0");
            alert("你拒绝了请求");
        }
    };
    webSocket.onclose=function (ev) {
        alert("连接已关闭");
    };
}

function updateSeats(result) {
    console.log("updateSeats");
    var xmlhttp;
    if (window.XMLHttpRequest) {
        //  IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {
        // IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            console.log(xmlhttp.responseText);
        }else if(xmlhttp.readyState==4){
            alert("服务器异常");
        }
    };
    // xmlhttp.open("GET","http://localhost:8080/updateSeat?result="+result,true);
    ip=localStorage.getItem("IP");
    console.log("ip:"+ip);
    console.log("result:"+result);
    if(ip!=null&&ip!="localhost"){
        console.log("URL:"+localStorage.getItem("URL"));
        var str=ip.search(".*[a-zA-Z]+.*");
        console.log("str:"+str);
        if(str=="-1"){
            xmlhttp.open("GET","http://"+ip+":8080/updateSeat?result="+result,true);
        }else{
            xmlhttp.open("GET",localStorage.getItem("URL")+"/updateSeat?result="+result,true);
        }
    }else{
        xmlhttp.open("GET","http://localhost:8080/updateSeat?result="+result,true);
    }
    xmlhttp.send();
}
