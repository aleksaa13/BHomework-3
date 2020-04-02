var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
let children = itemList.children;
form.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
function addItem(e) {
    e.preventDefault();
    var newItem = document.getElementById("item").value;
    if (newItem.length > 2) {
        var li = document.createElement("li");
        li.className = "list-group-item";
        li.appendChild(document.createTextNode(newItem));
        var deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-danger btn-sm float-right delete";
        deleteBtn.appendChild(document.createTextNode("X"));
        li.appendChild(deleteBtn);
        let check = document.createElement("input");
        check.type = "checkbox";
        check.classList = "check";
        document.body.addEventListener("click", checkFluency);
        li.appendChild(check);
        itemList.appendChild(li);
    }
}

function removeItem(e) {
    if (e.target.classList.contains("delete")) {
        if (confirm("Are you sure?")) {
            var li = e.target.parentElement;
            itemList.removeChild(li);
        }
    }
}
function checkFluency() {
    let checks = document.getElementsByClassName("check");
    for (let i = 0; i < checks.length; i++) {
        if (checks[i].checked) {
            checks[i].parentElement.style.textDecoration = "line-through";
        }
        else {
            checks[i].parentElement.style.textDecoration = "none";
        }
    }

}
document.getElementById("save-profile").addEventListener("click", createJSON);
function createJSON() {
    let list = document.getElementsByTagName("li");
    let arr = [];
    for (let i = 0; i < list.length; i++) {
        let obj = {};
        obj.title = list[i].textContent.replace("X","");
        obj.done = list[i].children[1].checked;
        arr.push(obj);
    }
    fetch('https://api.myjson.com/bins', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(arr)

    })
        .then(response => response.json())
        .then(function store(data) {
            console.log(data);
            let id = data.uri.slice(data.uri.lastIndexOf("/") + 1);
            localStorage.setItem("tasksID", id);
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
}
window.addEventListener("load", unloadStorage);
function unloadStorage() {
    if ("tasksID" in localStorage) {
        let url = "https://api.myjson.com/bins/" + localStorage.getItem("tasksID");
        fetch(url)
            .then(response => response.json())
            .then(function render(data) {
                let obj = data;
                console.log(obj);
               for(let i=0;i<obj.length;i++){
                var newItem=obj[i].title;
                var li = document.createElement("li");
                li.className = "list-group-item";
                li.appendChild(document.createTextNode(newItem));
                var deleteBtn = document.createElement("button");
                deleteBtn.className = "btn btn-danger btn-sm float-right delete";
                deleteBtn.appendChild(document.createTextNode("X"));
                li.appendChild(deleteBtn);
                let check = document.createElement("input");
                check.type = "checkbox";
                check.classList = "check";
                li.appendChild(check);
                if(obj[i].done){
                    check.checked=true;
                    check.parentElement.style.textDecoration="line-through";
                }
                document.body.addEventListener("click", checkFluency);
                itemList.appendChild(li);
               }
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
        }
}


