function login() {
    console.log("login");
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
            // alert(xmlhttp.responseText);
            if(xmlhttp.responseText=="-1"){
                alert("用户名不存在");
            }else if(xmlhttp.responseText=="0"){
                alert("密码错误");
            }else {
                if(!judge()){
                    window.location.href="atticSeat";
                }else {
                    window.location.href="atticSeat";
                }
            }
        }else if(xmlhttp.readyState==4){
            alert("服务器异常");
        }
    };
    var number=document.getElementById("input_number").value;
    var pass=document.getElementById("input_pass").value;
    console.log(number+" "+pass);
    if(judge()){
        // xmlhttp.open("GET","http://localhost:8080/login?number="+number+"&pass="+pass,true);
        ip=localStorage.getItem("IP");
        console.log("ip:"+ip);
        if(ip!=null&&ip!="localhost"){
            console.log("url:"+localStorage.getItem("URL"));
            var str=ip.search(".*[a-zA-Z]+.*");
            console.log("str:"+str);
            if(str=="-1"){
                xmlhttp.open("GET","http://"+ip+":8080/login?number="+number+"&pass="+pass,true);
            }else{
                xmlhttp.open("GET",localStorage.getItem("URL")+"/login?number="+number+"&pass="+pass,true);
            }
        }else{
            xmlhttp.open("GET","http://localhost:8080/login?number="+number+"&pass="+pass,true);
        }
    }else {
        // xmlhttp.open("GET","http://localhost:8080/admlogin?number="+number+"&pass="+pass,true);
        ip=localStorage.getItem("IP");
        console.log("ip:"+ip)
        if(ip!=null&&ip!="localhost"){
            console.log("url:"+localStorage.getItem("URL"));
            var str=ip.search(".*[a-zA-Z]+.*");
            console.log("str:"+str);
            if(str=="-1"){
                xmlhttp.open("GET",ip+"/login?number="+number+"&pass="+pass,true);
            }else{
                xmlhttp.open("GET",localStorage.getItem("URL")+"/login?number="+number+"&pass="+pass,true);
            }
        }else{
            xmlhttp.open("GET","http://localhost:8080/login?number="+number+"&pass="+pass,true);
        }
    }
    xmlhttp.send();
}

function judge() {
    if(document.getElementById("checkbox_student").checked){
        console.log("student");
        return true;
    }else {
        console.log("admin");
        return false;
    }
}

function changeIp() {
    console.log("changeIp");
    var ip=prompt("请输入IP地址：");
    localStorage.setItem("URL","http://"+ip+".natappfree.cc");
    localStorage.setItem("IP",ip);
    localStorage.setItem("WS",ip+".natappfree.cc");
}

