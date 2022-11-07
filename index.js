//! taskArray = JSON.parse(localStorage.getItem("taskArray"))
//! localStorage.setItem("taskArray", JSON.stringify(taskArray))


let list = document.getElementById("task-list");

let taskArray =[];
if (localStorage.getItem("taskArray") != null){
    taskArray = JSON.parse(localStorage.getItem("taskArray"))
}
innerHtmlLoop(taskArray.length);






document.getElementById("btnClear").addEventListener("click", function(){
    taskArray = []
    innerHtmlLoop(taskArray.length)
})

document.getElementById("btnAddNewTask").addEventListener("click", function(){
    if (document.getElementById("txtTaskName").value.length != 0 ){
        addTask(document.getElementById("txtTaskName").value);

    } else{
        return
    }
})





function liTemplate(id,text){
    this.id = id;
    this.text = text;
}


function addTask(text){
    let count = taskArray.length;
    let element = new liTemplate(count, text)
    taskArray.push(element)
    count = taskArray.length;
    innerHtmlLoop(count)
    
}   
function innerHtmlLoop(count){
    list.innerHTML = "";
    for (let a = 0; a<count; a++){
        if (taskArray.length == 0){
            localStorage.setItem("taskArray", JSON.stringify(taskArray))
            return
        }
        taskArray[a].id = a;
        addListElement(a,taskArray[a].text);
        

        let element = document.getElementById(`${a+1}`)
        element.addEventListener("click", function(){
            removeListElement(a);
        })
        let edit = document.getElementById(`edit${a+1}`)
        edit.addEventListener("click", function(){
            sign = window.prompt('Rename the task');
            if (sign != ""){
                taskArray[a].text=sign;
                innerHtmlLoop(count)
            }
        })

    }
    localStorage.setItem("taskArray", JSON.stringify(taskArray))
}


function addListElement(count,text){
   
    let li = ` <li class="task list-group-item">
    <div class="form-check">
        <input type="checkbox" id="${count+1}" class="form-check-input">
        <label for="${count+1}" class="form-check-label">${text}</label>
        <svg id="edit${count+1}" class="edit" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-adjustments-horizontal" width="84" height="84" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="14" cy="6" r="2" />
        <line x1="4" y1="6" x2="12" y2="6" />
        <line x1="16" y1="6" x2="20" y2="6" />
        <circle cx="8" cy="12" r="2" />
        <line x1="4" y1="12" x2="6" y2="12" />
        <line x1="10" y1="12" x2="20" y2="12" />
        <circle cx="17" cy="18" r="2" />
        <line x1="4" y1="18" x2="15" y2="18" />
        <line x1="19" y1="18" x2="20" y2="18" />
        </svg>
    </div>
    </li>`
    
    list.insertAdjacentHTML("beforeend",li);
}

function removeListElement(index){
    taskArray.splice(index,1)
    innerHtmlLoop(taskArray.length)
}