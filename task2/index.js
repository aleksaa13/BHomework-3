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

let table=document.getElementById("table");
for(let i=0;i<info.length;i++){
fillRow(i);
}
function fillRow(i){
let tr=table.appendChild(document.createElement("tr"));
let img=document.createElement("img");
let par=document.createElement("p");
img.src=info[i].image;
let td=document.createElement("td");
td.classList="img-container";
par.appendChild(img);
td.appendChild(par);
tr.appendChild(td);

td=document.createElement("td");
td.appendChild(document.createTextNode("14.96.2019"));
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
    //console.log(hasObj);
let table=document.getElementById("table");
table.innerHTML='<tr><th>Image</th><th>Launch Date</th><th>Rights</th><th>Genre</th><th>Rate</th><th></th></tr>';

for(let i=0;i<hasObj.length;i++){
    fillRow(hasObj[i]);
}
if(hasObj.length===0){
    tr=document.createElement("h5");
    tr.appendChild(document.createTextNode("No items match your search!"));
    table.appendChild(tr);
}
}