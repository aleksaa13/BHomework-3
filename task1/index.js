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
        li.appendChild(par1);
        li.appendChild(button);
        li.appendChild(par2);
        list.appendChild(li);
         //AZURIRAMO BUDZET
        if(sign==="-"){
            expenses=expenses-parseFloat(floatValue);
            //DODATI PROCENTE!!!
        }
        else{
            income=income+parseFloat(floatValue);
        }
        document.getElementById("income").textContent="+"+income.toFixed(2);
        document.getElementById("expenses").textContent=expenses.toFixed(2);
        document.getElementsByClassName("amount")[0].textContent=(income+expenses).toFixed(2);
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
        document.getElementById("income").textContent="+"+income;
    }
    if(list.classList.contains("exp")){
        expenses=expenses-(parseFloat(str).toFixed(2)*(-1));
        document.getElementById("expenses").textContent=expenses;
    }
    document.getElementsByClassName("amount")[0].textContent=(income+expenses).toFixed(2);
    list.removeChild(li);
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



