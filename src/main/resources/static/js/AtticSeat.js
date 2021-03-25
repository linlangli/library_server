var flag=true;
function loadSeats() {
    console.log("loadSeats");
    var div=document.getElementById("content");
    if(flag){
        console.log("true");
        div.innerHTML='<iframe align="center" width="100%" height="100%" src="../seats.html" frameborder="no" border="0" marginwidth="0" marginheight="5" scrolling="no" ></iframe>';
        flag=false;
    }else {
        console.log("false");
        div.innerHTML='<iframe align="center" width="100%" height="100%" src="../seats_text.html" frameborder="no" border="0" marginwidth="0" marginheight="5" scrolling="no" ></iframe>';
        flag=true;
    }
}

function loadUsers() {
    var div=document.getElementById("content");
    div.innerHTML='<iframe align="center" width="100%" height="100%" src="../users.html" frameborder="no" border="0" marginwidth="0" marginheight="20" scrolling="no"></iframe>'
}

function addSeat() {
    console.log("addSeat");
    var val=prompt("请以输入楼号和座位号（1:2）");
    var array=val.split(":");
    console.log("array:"+array[0]+":"+array[1]);
    var xmlhttp;
    if (window.XMLHttpRequest)
    {
        //  IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {
        // IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            console.log(xmlhttp.responseText);
            if(xmlhttp.responseText="1"){
                alert("座位添加成功");
                requestSeats();
            }else if(xmlhttp.responseText="0"){
                alert("座位添加失败");
            }else {
                alert("服务器异常");
            }
        }else if(xmlhttp.readyState==4){
            alert("服务器异常");
        }
    };
    ip=localStorage.getItem("IP");
    console.log("ip:"+ip);
    if(ip!=null&&ip!="localhost"){
        var str=ip.search(".*[a-zA-Z]+.*");
        console.log("str:"+str);
        if(str=="-1"){
            xmlhttp.open("GET","http://"+ip+":8080/addseat?floor="+array[0]+"&number="+array[1],true);

        }else{
            xmlhttp.open("GET",localStorage.getItem("URL")+"/addseat?floor="+array[0]+"&number="+array[1],true);
        }
    }else{
        xmlhttp.open("GET","http://localhost:8080/addseat?floor="+array[0]+"&number="+array[1],true);
    }
    xmlhttp.send();
}

function loadPosts() {
    var div=document.getElementById("content");
    div.innerHTML='<iframe align="center" width="100%" height="100%" src="../posts.html" frameborder="no" border="0" marginwidth="0" marginheight="20" scrolling="no"></iframe>'
}

function deleteSeat() {
    console.log("addSeat");
    var xmlhttp;
    if (window.XMLHttpRequest)
    {
        //  IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {
        // IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    var id=document.getElementById("");
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            console.log(xmlhttp.responseText);
            if(xmlhttp.responseText="1"){
                alert("座位删除成功");
                requestSeats();
            }else if(xmlhttp.responseText="0"){
                alert("座位删除失败");
            }else {
                alert("服务器异常");
            }
        }else if(xmlhttp.readyState==4){
            alert("服务器异常");
        }
    };
    ip=localStorage.getItem("IP");
    console.log("ip:"+ip);
    if(ip!=null){
        xmlhttp.open("GET",localStorage.getItem("URL")+"/addseat?id="+id,true);
    }else{
        xmlhttp.open("GET","http://localhost:8080/addseat?id="+id,true);
    }
    xmlhttp.send();
}

function createCodes() {
    console.log("createCodes");
    var xmlhttp;
    if (window.XMLHttpRequest)
    {
        //  IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {
        // IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            alert("成功生成");
        }else if(xmlhttp.readyState==4){
            alert("服务器异常");
        }
    };
    ip=localStorage.getItem("IP");
    console.log("ip:"+ip);
    if(ip!=null&&ip!="localhost"){
        var str=ip.search(".*[a-zA-Z]+.*");
        console.log("str:"+str);
        if(str=="-1"){
            xmlhttp.open("GET","http://"+ip+":8080/createCodes",true);

        }else{
            xmlhttp.open("GET",localStorage.getItem("URL")+"/createCodes",true);
        }
    }else{
        xmlhttp.open("GET","http://localhost:8080/createCodes",true);
    }
    xmlhttp.send();
}