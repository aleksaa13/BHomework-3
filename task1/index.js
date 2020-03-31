var income=0;
var expenses=0;
let storageObj = {
    income:0,
    expenses:0,
    incList:{incListNames:[],
               incListValues:[]
            },
    expList:{expListNames:[],
            expListValues:[],
            expListPercent:[]
     }
};

window.addEventListener("load",unloadStorage);
function unloadStorage(){
    let storage=JSON.parse(localStorage.getItem("values"));
    console.log(storage);
    let list=document.getElementById("inc");
    for(let i=0;i<storage.incList.incListNames.length;i++){
        let description=storage.incList.incListNames[i];
        let value=storage.incList.incListValues[i];
        
            let li = document.createElement("li");
            let par2 = document.createElement("p");
            let button = document.createElement("button");
            button.appendChild(document.createTextNode("X"));
            button.classList.add("deleteBtn");
            let par1 = document.createElement("p");
            par1.textContent = description;
            par1.classList.add("li-par-left");
            par2.classList.add("li-par-right");
            let floatValue = parseFloat(value).toFixed(2);
            par2.appendChild(document.createTextNode(value));
            li.appendChild(par1);
            li.appendChild(button);
            li.appendChild(par2);
            list.appendChild(li);
    }
    
    list=document.getElementById("exp");
    for(let i=0;i<storage.expList.expListNames.length;i++){
        description=storage.expList.expListNames[i];
        value=storage.expList.expListValues[i];
        let percent=storage.expList.expListPercent[i];
        let li = document.createElement("li");
            let par2 = document.createElement("p");
            let button = document.createElement("button");
            button.appendChild(document.createTextNode("X"));
            button.classList.add("deleteBtn");
            let par1 = document.createElement("p");
            par1.textContent = description;
            par1.classList.add("li-par-left");
            par2.classList.add("li-par-right");
            let floatValue = parseFloat(value).toFixed(2);
            par2.appendChild(document.createTextNode(value));
            let par3 = document.createElement("p");
            par3.classList.add("par-percent");
            par3.appendChild(document.createTextNode(percent));
             li.appendChild(par3);
             li.appendChild(par1);
             li.appendChild(button);
             li.appendChild(par2);
             list.appendChild(li);
}

income=storage.income;
expenses=storage.expenses;
document.getElementById("income").textContent = "+" + income.toFixed(2);
document.getElementById("expenses").textContent = expenses.toFixed(2);
if ((income + expenses).toFixed(2) > 0) {
    document.getElementsByClassName("amount")[0].textContent = "+" + (income + expenses).toFixed(2);
}
else {
    document.getElementsByClassName("amount")[0].textContent = (income + expenses).toFixed(2);
}
let totalPercentage = expenses / income * 100 * (-1);
            document.getElementsByClassName("span3")[0].textContent = Math.ceil(totalPercentage) + "%";
}


function writeMonth() {
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    var d = new Date();
    var n = month[d.getMonth()];
    document.getElementsByClassName("p1")[0].textContent = "Avaliable Budget in " + n + ":";
}
writeMonth();
document.getElementById("btn").addEventListener("click", addItem);
function addItem() {
    //DODAVANJE ELEMENTA LISTE
    if (allowOnlyNumbers()) {
        let value = document.getElementsByClassName("val")[0].value;
        let sign;
        let list;
        let description = document.getElementsByClassName("des")[0].value;
        if (document.getElementById("+").checked) {
            sign = "+";
        }
        else sign = "-";
        if (value !== "" && description !== "") {
            if (sign === "-") {
                list = document.getElementById("exp");
            }
            else {
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
            let floatValue = parseFloat(value).toFixed(2);
            par2.appendChild(document.createTextNode(sign + floatValue));
            //AZURIRAMO BUDZET I DODAJEMO PROCENTE
            if (sign === "-") {
                let par3 = document.createElement("p");
                par3.classList.add("par-percent");
                let percentage = floatValue / income * 100;
                par3.appendChild(document.createTextNode(Math.round(percentage) + "%"));
                li.appendChild(par3);
                expenses = expenses - parseFloat(floatValue);
            }
            else {
                income = income + parseFloat(floatValue);
            }
            li.appendChild(par1);
            li.appendChild(button);
            li.appendChild(par2);
            list.appendChild(li);
            document.getElementById("income").textContent = "+" + income.toFixed(2);
            document.getElementById("expenses").textContent = expenses.toFixed(2);
            if ((income + expenses).toFixed(2) > 0) {
                document.getElementsByClassName("amount")[0].textContent = "+" + (income + expenses).toFixed(2);
            }
            else {
                document.getElementsByClassName("amount")[0].textContent = (income + expenses).toFixed(2);
            }

            //AZURIRAMO PROCENTE
            let percentages = document.getElementsByClassName("par-percent");
            for (let i = 0; i < percentages.length; i++) {
                let newPer = percentages[i].parentElement.children[3].textContent;
                newPer = Math.ceil(parseFloat(newPer) / income * 100 * (-1));
                percentages[i].textContent = newPer + "%";
            }
            let totalPercentage = expenses / income * 100 * (-1);
            document.getElementsByClassName("span3")[0].textContent = Math.ceil(totalPercentage) + "%";
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
        let str = li.getElementsByClassName("li-par-right")[0].textContent.substr(1);
        if (list.classList.contains("inc")) {
            income = income - parseFloat(str).toFixed(2);
            document.getElementById("income").textContent = "+" + income.toFixed(2);
        }
        if (list.classList.contains("exp")) {
            expenses = expenses - parseFloat(str).toFixed(2) * (-1);
            document.getElementById("expenses").textContent = expenses.toFixed(2);
        }
        if ((income + expenses).toFixed(2) > 0) {
            document.getElementsByClassName("amount")[0].textContent = "+" + (income + expenses).toFixed(2);
        }
        else {
            document.getElementsByClassName("amount")[0].textContent = (income + expenses).toFixed(2);
        }
        list.removeChild(li);

        //AZURIRAMO PROCENTE
        let percentages = document.getElementsByClassName("par-percent");
        for (let i = 0; i < percentages.length; i++) {
            let newPer = percentages[i].parentElement.children[3].textContent;
            newPer = Math.ceil(parseFloat(newPer) / income * 100 * (-1));
            percentages[i].textContent = newPer + "%";
        }
        let totalPercentage = expenses / income * 100 * (-1);
        document.getElementsByClassName("span3")[0].textContent = Math.ceil(totalPercentage) + "%";
    }
}
document.getElementById("btn").addEventListener("click", allowOnlyNumbers);
//BLOKIRA UNOS SLOVA U VALUE POLJE
function allowOnlyNumbers() {
    let value = document.getElementsByClassName("val")[0].value;
    let decimal = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;
    if (value.match(decimal)) { return true; }
    else {
        document.getElementsByClassName("val")[0].value = "";
        alert("enter a decimal number");
        return false;
    }
}
window.addEventListener("unload",loadStorage);
function loadStorage(){
    let incomeList=document.getElementById("inc");
    let names=incomeList.getElementsByClassName("li-par-left");
    let values=incomeList.getElementsByClassName("li-par-right");
    for(let i=0;i<names.length;i++){
        storageObj.incList.incListNames.push(names[i].textContent);
        storageObj.incList.incListValues.push(values[i].textContent);
    }
    let expensesList=document.getElementById("exp");    
    let names1=expensesList.getElementsByClassName("li-par-left");
    let values1=expensesList.getElementsByClassName("li-par-right");
    let percent=expensesList.getElementsByClassName("par-percent");
    for(let i=0;i<names1.length;i++){
        storageObj.expList.expListNames.push(names1[i].textContent);
        storageObj.expList.expListValues.push(values1[i].textContent);
        storageObj.expList.expListPercent.push(percent[i].textContent);
    }
    storageObj.income=income;
    storageObj.expenses=expenses;
    localStorage.setItem("values",JSON.stringify(storageObj));
}
