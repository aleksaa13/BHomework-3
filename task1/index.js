var income=0;
var expenses=0;
document.getElementById("btn").addEventListener("click", addItem);
function addItem() {
    //DODAVANJE ELEMENTA LISTE
    if(allowOnlyNumbers()){
    let value = document.getElementsByClassName("val")[0].value;
    let sign;
    let list;
    let description = document.getElementsByClassName("des")[0].value;
    if (document.getElementById("+").checked) {
        sign = "+";
    }
    else sign = "-";
    if (value !== "" && description !== "") {
        if(sign==="-"){
            list = document.getElementById("exp");
        }
        else{
            list = document.getElementById("inc");
        }
        let li = document.createElement("li");
        let par2 = document.createElement("p");
        let button = document.createElement("button");
        button.appendChild(document.createTextNode("X"));
        button.classList.add("deleteBtn");
        let par1 = document.createElement("p");
        par1.textContent = description;
        par1.classList.add("li-par-left");
        par2.classList.add("li-par-right");
        let floatValue=parseFloat(value).toFixed(2);
        par2.appendChild(document.createTextNode(sign + floatValue));
         //AZURIRAMO BUDZET I DODAJEMO PROCENTE
        if(sign==="-"){
           let par3=document.createElement("p");
           par3.classList.add("par-percent");
           let percentage=floatValue/income*100;
           par3.appendChild(document.createTextNode(Math.round(percentage)+"%"));
           li.appendChild(par3);
           expenses=expenses-parseFloat(floatValue);
            }
        else{
            income=income+parseFloat(floatValue);
        }
        li.appendChild(par1);
        li.appendChild(button);
        li.appendChild(par2);
        list.appendChild(li);
        document.getElementById("income").textContent="+"+income.toFixed(2);
        document.getElementById("expenses").textContent=expenses.toFixed(2);
        document.getElementsByClassName("amount")[0].textContent=(income+expenses).toFixed(2);

        //AZURIRAMO PROCENTE
        let percentages=document.getElementsByClassName("par-percent");
        for(let i=0;i<percentages.length;i++){
            let newPer=percentages[i].parentElement.children[3].textContent;
            newPer=Math.ceil(parseFloat(newPer)/income*100*(-1));
            percentages[i].textContent=newPer+"%";
        }
        let totalPercentage=expenses/income*100*(-1);
        console.log("aleksa");
document.getElementsByClassName("span3")[0].textContent=Math.ceil(totalPercentage)+"%";
document.getElementsByClassName("income")[0].children[1].style.marginLeft=document.getElementsByClassName("span3")[0].offsetWidth.toString();
    }
    }
}
document.getElementById("inc").addEventListener("click", deleteItem);
document.getElementById("exp").addEventListener("click", deleteItem);
function deleteItem(event) {
    var list = event.target.parentElement.parentElement;
        var li = event.target.parentElement;
    if (event.target.classList.contains("deleteBtn")) {
        //AZURIRAMO BUDZET
        let str=li.getElementsByClassName("li-par-right")[0].textContent.substr(1);
        console.log(income);
        console.log(expenses);
    if(list.classList.contains("inc")){
        income=income-parseFloat(str).toFixed(2);
        document.getElementById("income").textContent="+"+income.toFixed(2);
    }
    if(list.classList.contains("exp")){
        expenses=expenses-parseFloat(str).toFixed(2)*(-1);
        document.getElementById("expenses").textContent=expenses.toFixed(2);
    }
    document.getElementsByClassName("amount")[0].textContent=(income+expenses).toFixed(2);
    list.removeChild(li);

    //AZURIRAMO PROCENTE
    let percentages=document.getElementsByClassName("par-percent");
        for(let i=0;i<percentages.length;i++){
            let newPer=percentages[i].parentElement.children[3].textContent;
            newPer=Math.ceil(parseFloat(newPer)/income*100*(-1));
            percentages[i].textContent=newPer+"%";
        }
let totalPercentage=expenses/income*100*(-1);
document.getElementsByClassName("span3")[0].textContent=Math.ceil(totalPercentage)+"%";
document.getElementsByClassName("income")[0].children[1].style.paddingLeft=document.getElementsByClassName("span3")[0].offsetWidth.toString();
    
}
}
document.getElementById("btn").addEventListener("click",allowOnlyNumbers);
//BLOKIRA UNOS SLOVA U VALUE POLJE
function allowOnlyNumbers(){
    let value = document.getElementsByClassName("val")[0].value;
    let decimal=/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;
    if(value.match(decimal)){return true;}
    else{
        document.getElementsByClassName("val")[0].value="";
        alert("enter a decimal number");
        return false;
    }
}




