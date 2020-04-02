let j=1;
var xhr = new XMLHttpRequest();
xhr.addEventListener("readystatechange", functionn);
function functionn() {
    if (this.readyState === 4 && this.status === 200) {
        localStorage.setItem("info", xhr.responseText);
    }
}
xhr.open('GET', "https://api.myjson.com/bins/ozt2y");
xhr.send();

var info = JSON.parse(localStorage.getItem("info"));
document.getElementById("load-more").style.display="none";
let table=document.getElementById("table");
for(let i=0;i<info.length;i++){
fillRow(i);
}
appendDeletes();
function fillRow(i){
let tr=table.appendChild(document.createElement("tr"));
let img=document.createElement("img");
let par=document.createElement("p");
img.src=info[i].image;
img.title=info[i].name;
let a=document.createElement("a");
a.href=info[i].url;
a.target="_blank";
a.appendChild(img);
let td=document.createElement("td");
td.classList="img-container";
par.appendChild(a);
td.appendChild(par);
tr.appendChild(td);

td=document.createElement("td");
td.appendChild(document.createTextNode("14.03.2005"));
tr.appendChild(td);

td=document.createElement("td");
td.appendChild(document.createTextNode(info[i].publisher));
tr.appendChild(td);

td=document.createElement("td");
td.appendChild(document.createTextNode(info[i].genres));
tr.appendChild(td);

td=document.createElement("td");
td.appendChild(document.createTextNode(info[i].rating));
tr.appendChild(td);

td=document.createElement("td");
deleteBtn=document.createElement("button");
deleteBtn.classList="deleteBtn";
deleteBtn.appendChild(document.createTextNode("X"));
td.appendChild(deleteBtn);
tr.appendChild(td);

document.getElementById("table").appendChild(tr);
}

document.getElementById("searchField").addEventListener("input",search);
function search(){
let text=document.getElementById("searchField").value.toLowerCase();
let list=[];
if(document.getElementById("radio1").checked && text.length>0){
    for(i=0;i<info.length;i++){
    list.push(info[i].name);
}
}
else{
    for(let i=0;i<info.length;i++){
        list.push(info[i].genres);
    }
}
//console.log(list[0].toLowerCase().indexOf(text));
let hasObj=[];
let rate=parseInt(document.getElementById("rate").value);
for(i=0;i<info.length;i++){
    if(list[i].toLowerCase().indexOf(text) !== -1 && parseFloat(info[i].rating)>=rate){
        hasObj.push(i);
    }
}
//console.log(hasObj);
return hasObj;
}

document.getElementById("search").addEventListener("click",displayResult);

function displayResult(){
let hasObj=search();
if(hasObj.length>3){
    document.getElementById("load-more").style.display="block";
}
    //console.log(hasObj);
let table=document.getElementById("table");
table.innerHTML='<tr><th>Image</th><th>Launch Date</th><th>Rights</th><th>Genre</th><th>Rate</th><th></th></tr>';
if(hasObj.length<4){
for(let i=0;i<hasObj.length;i++){
    fillRow(hasObj[i]);
}
}
else{
    for(let i=0;i<3;i++){
        fillRow(hasObj[i]);
}}
if(hasObj.length===0){
    tr=document.createElement("h5");
    tr.appendChild(document.createTextNode("No items match your search!"));
    table.appendChild(tr);
}
appendDeletes();
}

document.getElementById("load-more-button").addEventListener("click",loadMore);
function loadMore(){
    let hasObj=search();
    console.log(hasObj);
    if(j<=hasObj.length/3){
j++;
}
    if(hasObj.length>=j*3){
for(let i=(j*3-3);i<j*3;i++){
    fillRow(hasObj[i]);
}
    }
    else{
        for(let i=(j*3-3);i<hasObj.length;i++){
            fillRow(hasObj[i]);
    }
    document.getElementById("load-more").style.display="none";
}
appendDeletes();
}
function appendDeletes(){
    deletes=document.getElementsByClassName("deleteBtn");
    for(let i=0;i<deletes.length;i++){
        deletes[i].addEventListener("click",deleteItem);
    }
}
function deleteItem(event){
event.target.parentNode.parentNode.style.display="none";
}
