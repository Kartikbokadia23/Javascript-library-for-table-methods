


var jsonData;
var rows = 0;
var rows_end = 0;
var count = 0;
var table = "";
var value_change = document.getElementsByClassName("value_change");
var page_change = 1;
var click_change = 1;
var no_of_rows = 10;
var prev_row_change = 20;
var newarr;
var rows_search = 0;
var rows_end_search = 10;
function loadfunc(){
    document.getElementById("fetch-btn").style.display = "none";
    document.getElementById("fixed_box").style.display = "none";
    document.getElementById("three_btn_box").style.display = "block";
    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            json_function(this); 

        }
    }
    xhttp.open("GET","https://fakerestapi.azurewebsites.net/api/Authors",true);
    xhttp.send();
}

{
    table+="<tr><th>Author ID</th><th>Book ID</th><th>First Name</th><th>Last Name</th></tr>";
}
function json_function(json) {
    var i;
    jsonData = JSON.parse(json.responseText);
    console.log(jsonData[3].IDBook);
    iterator();
}

function rows_change(row_catcher){
    page_change = 1;
    no_of_rows = row_catcher;
    prev_row_change = row_catcher*2;
    rows=0;
    table="";
    table="<tr><th>Author ID</th><th>Book ID</th><th>First Name</th><th>Last Name</th></tr>";
    value_change[0].innerHTML=page_change;
    value_change[1].innerHTML=page_change + 1;
    value_change[2].innerHTML=page_change + 2;
    value_change[0].classList.add("active");
    value_change[1].classList.remove("active");
    value_change[2].classList.remove("active");
    iterator();
}


function iterator(){
    rows_end = rows + no_of_rows;
    for ( ;rows < rows_end; rows++) {
        table += "<tr class=row1><td class=tabledata1>"
            + jsonData[rows].ID +
            "</td><td>" 
            + jsonData[rows].IDBook +
            "</td><td>" 
            + jsonData[rows].FirstName +
            "</td><td>" 
            + jsonData[rows].LastName +
            "</td></tr>";
    }

        document.getElementById("demo").innerHTML = table;
        // var trr = document.getElementsByTagName("tr")[0].innerHTML;
        // console.log(trr)
        var tr = document.getElementsByClassName("row1");
        if(tr.length == 10){
            for(count = 0;count < 10;count++){
                tr[count].addEventListener("click",get_id_func);
                tr[count].setAttribute("data-toggle","modal");
                tr[count].setAttribute("data-target","#tableData");
            }
        }
}
function get_id_func(){
    var valid = this.getElementsByTagName("td")[0].childNodes[0].nodeValue;
    fetch_personal_data(valid);
}
function fetch_personal_data(id_no){
    var id = id_no;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            jsonData2 = JSON.parse(this.responseText);
            var table="<tr><th >Author ID</th><th>Book ID</th><th>First Name</th><th>Last Name</th></tr>";
            table += "<tr class='fetched_row'><td>" + jsonData2.ID + "</td><td>" + jsonData2.IDBook + "</td><td>" + jsonData2.FirstName + "</td><td>" + jsonData2.LastName + "</td></tr>";
            document.getElementById("demo2").innerHTML = table;

            }
    }
    xhttp.open("GET","https://fakerestapi.azurewebsites.net/api/Authors/" + id,true);
    xhttp.send();
};
function next_page(){
    table = "";
    table+="<tr><th>Author ID</th><th>Book ID</th><th>First Name</th><th>Last Name</th></tr>";
    click_change += 1;
    if(value_change[0].className == "btn btn-outline-secondary mt-2 mb-3 value_change active"){
        value_change[1].classList.add("active");
        value_change[0].classList.remove("active");
    }
    else if(value_change[1].className == "btn btn-outline-secondary mt-2 mb-3 value_change active"){
        value_change[2].classList.add("active");
        value_change[1].classList.remove("active")
    }
    else if(value_change[2].className == "btn btn-outline-secondary mt-2 mb-3 value_change active"){
        if(click_change > 3){
        page_change += 1;
        value_change[0].innerHTML = page_change;
        value_change[1].innerHTML = page_change + 1;
        value_change[2].innerHTML = page_change + 2;
    }
    }
    else{
        console.log("Still not working.");
    }
    iterator();
}
function prev_page(){
    table = "";
    table+="<tr><th>Author ID</th><th>Book ID</th><th>First Name</th><th>Last Name</th></tr>";
    rows = rows - prev_row_change;
    
    if(value_change[2].className == "btn btn-outline-secondary mt-2 mb-3 value_change active"){
        value_change[1].classList.add("active");
        value_change[2].classList.remove("active");
    }
    else if(value_change[1].className == "btn btn-outline-secondary mt-2 mb-3 value_change active"){
        value_change[0].classList.add("active");
        value_change[1].classList.remove("active")
    }
    else if(value_change[0].className == "btn btn-outline-secondary mt-2 mb-3 value_change active"){
        if(rows < 0){
            alert("No more rows..!!");
            rows = 0;
        }
        else if(page_change < 1){
            value_change[0].innerHTML = 1;
            value_change[1].innerHTML = 2;
            value_change[2].innerHTML = 3;
            page_change = 1;
        }
        else{
            page_change -= 1;
            value_change[0].innerHTML = page_change;
            value_change[1].innerHTML = page_change + 1;
            value_change[2].innerHTML = page_change + 2;
        }
    }
    
    iterator(no_of_rows);
}
function skip_page(page){
   var temp = document.getElementById(page).innerHTML;
   //console.log(temp);
   table = "";
   table+="<tr><th>Author ID</th><th>Book ID</th><th>First Name</th><th>Last Name</th></tr>";
   rows = temp*10;
   document.getElementById(pag_id).classList.add("active");
   if(page == "page1"){
       document.getElementById("page2").classList.remove("active");
       document.getElementById("page3").classList.remove("active");
   }
   else if(page == "page2"){
    document.getElementById("page1").classList.remove("active");
    document.getElementById("page3").classList.remove("active");
   }
   else{
    document.getElementById("page1").classList.remove("active");
    document.getElementById("page2").classList.remove("active");
   }
   iterator();
}



function sort_table(header){
    window.head=header;
    var sliced_rows = jsonData.slice(rows-no_of_rows,rows);
    console.log(sliced_rows.sort(compare));
    table="";
    table+="<tr><th>Author ID</th><th>Book ID</th><th>First Name</th><th>Last Name</th></tr>";
    for(var i = 0;i<sliced_rows.length;i++)
    {
        table += "<tr class=row1><td class=tabledata1>"
        + sliced_rows[i].ID +
        "</td><td>" 
        + sliced_rows[i].IDBook +
        "</td><td>" 
        + sliced_rows[i].FirstName +
        "</td><td>"
        + sliced_rows[i].LastName +
        "</td></tr>";
    }
    document.getElementById("demo").innerHTML=table;
}


function compare(a,b){
// console.log(a[head]);
let value1 = a[head];
let value2 = b[head];

  let comparison = 0;
  if (value1 > value2) {
    comparison = 1;
  } else if (value1 < value2) {
    comparison = -1;
  }
  return comparison;
}

function searchbook_id(){
    
    newarr=jsonData.filter(checkData);
    console.log(newarr);
    table = "";
    table+="<tr><th>Author ID</th><th>Book ID</th><th>First Name</th><th>Last Name</th></tr>";
    iteratorfilter();
}

function checkData(obj){
    var id,bookid,firstname,lastname,idstring,bookidstring,firstnamestring,lastnamestring;
    id = document.getElementById("ID").value;
    bookid = document.getElementById("bookID").value;
    firstname = document.getElementById("firstname").value;
    lastname = document.getElementById("lastname").value;

    idstring = obj.ID.toString();
    bookidstring = obj.IDBook.toString();
    firstnamestring = obj.FirstName.toString().toLowerCase();
    lastnamestring = obj.LastName.toString().toLowerCase(); 

        if(id!="" && idstring.includes(id)){
            return obj.ID;
         }
        if(bookid!="" && bookidstring.includes(bookid)){
            return obj.IDBook;
        }
        if(firstname!="" && firstnamestring.includes(firstname)){
             return obj.FirstName;
         }
        if(lastname!="" && lastnamestring.includes(lastname)){
             return obj.LastName;
         }
}




function iteratorfilter(){
    console.log(newarr.length);
    rows_search=0;
    if(newarr.length>0){
        
        for(;rows_search<rows_end_search && rows_search<=newarr.length;rows_search++){
            console.log(rows_search);
            // console.log("hii");
            table += "<tr class=row1><td>"
            + newarr[rows_search].ID +
            "</td><td>" 
            + newarr[rows_search].IDBook +
            "</td><td>" 
            + newarr[rows_search].FirstName +
            "</td><td>"
            + newarr[rows_search].LastName +
            "</td></tr>";
        }
        document.getElementById("demo").innerHTML=table;
        console.log("hiiiii");



        // if(newarr.length>0){
        //     for(var i=0;i<newarr.length;i++){
        //         table += "<tr class=row1><td class=tabledata1>"
        //         + newarr[i].ID +
        //         "</td><td>" 
        //         + newarr[i].IDBook +
        //         "</td><td>" 
        //         + newarr[i].FirstName +
        //         "</td><td>"
        //         + newarr[i].LastName +
        //         "</td></tr>";
        //     }
        //     document.getElementById("demo").innerHTML=table;
        }else if(newarr.length==0){
            rows=0;
            no_of_rows=10;
            rows_end = rows +no_of_rows;
            iterator();
        }
    }



        //  var nextbtn = document.createElement("button");
        //  var prevbtn = document.createElement("button");
        //  nextbtn.classList.add("btn","btn-outline-secondary");
        //  prevbtn.classList.add("btn","btn-outline-secondary");
        //  nextbtn.addEventListener("click",rows_search_next);
        //  prevbtn.addEventListener("click",rows_search_prev);
        //  nextbtn.innerHTML = "Next";
        //  prevbtn.innerHTML = "Previous";
        //  var parent = document.getElementById("last_btns");
        //  parent.append(prevbtn,nextbtn);