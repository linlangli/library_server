var ip;

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
            initSeatsTable();
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

function initSeatsTable(flag) {
    var seatFree;
    var seatOccupied;
    var seatPause;
    var seatsTable=document.getElementById("table_seats");
    var row,cell;
    var c=0;
    var floor=1;
    row=seatsTable.insertRow();
    cell=row.insertCell();
    cell.innerHTML='<div class="div_seats_title">1楼</div>';
    row=seatsTable.insertRow();
    for(var i=0;i<seats.length;i++){
        seatFree='<div class="div_seat"><span class="span_seat">'+seats[i].id+'</span><img class="img_seat" src="../img/seat.png"/><span class="span_seat">'+seats[i].leavetime+'</span></div>';
        seatOccupied='<div class="div_seat"><span class="span_seat">'+seats[i].id+'</span><img class="img_seat" src="../img/seat_reserve.png"/><span class="span_seat">'+seats[i].leavetime+'</span></div>';
        seatPause='<div class="div_seat"><span class="span_seat">'+seats[i].id+'</span><img class="img_seat" src="../img/seat_leave.png"/><span class="span_seat">'+seats[i].leavetime+'</span></div>';
        console.log("i:"+i);
        ++c;
        if(seats[i].floor!=floor){
            console.log("不同楼层座位换行");
            row=seatsTable.insertRow();
            cell=row.insertCell();
            cell.innerHTML='<div class="div_seats_title">'+seats[i].floor+'楼</div>';
            row=seatsTable.insertRow();
            c=0;
        }else if(c==6 && seats[i+1].floor==floor){
            console.log("一行满6个且相同楼层换行");
            row=seatsTable.insertRow();
            c=0;
        }
        cell=row.insertCell();
        switch (seats[i].idle){
            case 0:
                cell.innerHTML=seatFree;
                break;
            case 1:
                cell.innerHTML=seatOccupied;
                break;
            case 2:
                cell.innerHTML=seatPause;
                break;
            case 3:
                cell.innerHTML=seatPause;
                break;
        }
        floor=seats[i].floor;
    }
}
