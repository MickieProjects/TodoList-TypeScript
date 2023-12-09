const inputEl = document.getElementById('input')! as HTMLInputElement
const formEl = document.querySelector('form')!
const listEl = document.getElementById('list')!
formEl.addEventListener('submit', saveData)

interface Task {
  name: string,
  completed: boolean
}

const tasks:Task[]=readData()
tasks.forEach(createList)

// save
function saveData(event:SubmitEvent) {
  event.preventDefault()

  const newTask:Task = {
    name: inputEl.value,
    completed: false
  }
  createList(newTask)
  tasks.push(newTask)
  localStorage.setItem("myList", JSON.stringify(tasks))
}

// createList
function createList(task:Task) {
  const liEl = document.createElement("li")
  const checkboxEl = document.createElement("input") 

  checkboxEl.type = "checkbox"
  checkboxEl.checked = task.completed
  checkboxEl.addEventListener("change", function() {
    task.completed = checkboxEl.checked
    updateData()
  })

  liEl.append(task.name)
  liEl.append(checkboxEl)
  listEl.append(liEl)
  inputEl.value = ""
}

// read
function readData() {
  const myList = localStorage.getItem("myList")
  if (myList == null) {
    return [] 
  }
  return JSON.parse(myList) 
}

// update
function updateData() {
  localStorage.setItem("myList", JSON.stringify(tasks))
}
