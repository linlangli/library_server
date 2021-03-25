var posts;
function requestPosts() {
    console.log("requestPosts");
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
            posts=JSON.parse(json.substring(json.indexOf("["),json.indexOf("]")+1));
            console.log(posts[0].id);
            initPostTable()
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
            xmlhttp.open("GET","http://"+ip+":8080/getMainPosts",true);
        }else{
            xmlhttp.open("GET",localStorage.getItem("URL")+"/getMainPosts",true);
        }
    }else{
        xmlhttp.open("GET","http://localhost:8080/getMainPosts",true);
    }
    xmlhttp.send();
}

function initPostTable() {
    var postTable=document.getElementById("table_posts");
    var row,cell;
    var postInfo;
    console.log("posts.length:"+posts.length);
    for(var i=0;i<posts.length;i++){
        console.log("i: "+i);
        row=postTable.insertRow();
        postInfo='<tr class="tr_content"><td class="td_info">'+ posts[i].id+'</td><td class="td_info">'+ posts[i].content +'</td><td class="td_info">'+ posts[i].userName+'</td> <td class="td_class">'+ posts[i].userNumber +'</td><td class="td_info"> '+posts[i].title+'</td><td class="td_info">'+ posts[i].praiseNum +'</td><td class="td_info">'+ posts[i].date +'</td></tr>';
        row.className="tr_content";
        row.innerHTML=postInfo;
    }
}