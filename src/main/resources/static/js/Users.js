function requestUsers() {
    console.log("requestUsers");
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
            var json=xmlhttp.responseText;
            // 格式化为json数组
            // var obj = eval('(' + xmlhttp.responseText + ')');
            users=JSON.parse(json.substring(json.indexOf("["),json.indexOf("]")+1));
            console.log(users[0].id);
            initUsersTable()
        }else if(xmlhttp.readyState==4){
            alert("服务器异常");
        }
    };
    // xmlhttp.open("GET","http://localhost:8080/allusers",true);
    ip=localStorage.getItem("IP");
    console.log("ip:"+ip);
    if(ip!=null&&ip!="localhost"){
        console.log("url:"+localStorage.getItem("URL"));
        var str=ip.search(".*[a-zA-Z]+.*");
        console.log("str:"+str);
        if(str=="-1"){
            xmlhttp.open("GET","http://"+ip+":8080/allusers",true);
        }else{
            xmlhttp.open("GET",localStorage.getItem("URL")+"/allusers",true);
        }
    }else{
        xmlhttp.open("GET","http://localhost:8080/allusers",true);
    }
    xmlhttp.send();
}

function initUsersTable() {
    var userTable=document.getElementById("table_users");
    var row,cell;
    var userInfo;
    console.log("users.length:"+users.length);
    for(var i=0;i<users.length;i++){
        console.log("i: "+i);
        row=userTable.insertRow();
        // cell=row.insertCell();
        // cell.innerHTML=users[i].number;
        // cell=row.insertCell();
        // cell.innerHTML=users[i].name;
        // cell=row.insertCell();
        // cell.innerHTML=users[i].sex;
        // cell=row.insertCell();
        // cell.innerHTML=users[i].department;
        // cell=row.insertCell();
        // cell.innerHTML=users[i].nickName;
        // cell=row.insertCell();
        // cell.innerHTML=users[i].time;
        // cell=row.insertCell();
        // cell.innerHTML=users[i].num;
        // cell=row.insertCell();
        // cell.innerHTML=users[i].seat_id;
        if(users[i].nickname==null){
            console.log("users[i].nickname==\"\"");
            users[i].nickname=" ";
        }
        userInfo='<tr class="tr_content"><td class="td_info">'+ users[i].number+'</td><td class="td_info">'+ users[i].name +'</td><td class="td_info">'+ users[i].sex+'</td> <td class="td_class">'+ users[i].department +'</td><td class="td_info"> '+users[i].nickname+'</td><td class="td_info">'+ users[i].time +'</td><td class="td_info">'+ users[i].num+' </td><td class="td_info">'+ users[i].seatId+'</td></tr>';
        row.className="tr_content";
        row.innerHTML=userInfo;
    }
}