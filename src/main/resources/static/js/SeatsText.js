
function requestSeats() {
    console.log("requestSeats");
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
            seats=JSON.parse(json.substring(json.indexOf("["),json.indexOf("]")+1));
            initSeatsTableText();
        }else if(xmlhttp.readyState==4){
            alert("服务器异常");
        }
    };
    // xmlhttp.open("GET","http://localhost:8080/allseat",true);
    ip=localStorage.getItem("IP");
    console.log("ip:"+ip);
    if(ip!=null&&ip!="localhost"){
        console.log("url:"+localStorage.getItem("URL"));
        var str=ip.search(".*[a-zA-Z]+.*");
        console.log("str:"+str);
        if(str=="-1"){
            xmlhttp.open("GET","http://"+ip+":8080/allseat",true);
        }else{
            xmlhttp.open("GET",localStorage.getItem("URL")+"/allseat",true);
        }
    }else{
        xmlhttp.open("GET","http://localhost:8080/allseat",true);
    }
    xmlhttp.send();
}

function initSeatsTableText() {
    var seatsTable=document.getElementById("table_seats_text");
    var row,cell;
    var seatsInfo;
    var idle;
    console.log("seats.length:"+seats.length);
    for(var i=0;i<seats.length;i++){
        console.log("i: "+i);
        row=seatsTable.insertRow();
        console.log("seats[i].idle:"+seats[i].idle);
        switch (seats[i].idle) {
            case 0:
                idle="空闲";
                break;
            case 1:
                idle="占用";
                break;
            case 3:
                idle="暂离";
                break;
            case 2:
                idle="预约";
                break;
        }
        seatsInfo='<tr class="tr_content"><td class="td_info">'+ seats[i].id+'</td><td class="td_info">'+ seats[i].floor +'</td><td class="td_info">'+ seats[i].number+'</td> <td class="td_info">'+ idle +'</td><td class="td_info"> '+seats[i].time+'</td><td class="td_info">'+ seats[i].leavetime +'</td><td class="td_info">'+ seats[i].userNumber+' </td></tr>';
        row.className="tr_content";
        row.innerHTML=seatsInfo;
    }
}