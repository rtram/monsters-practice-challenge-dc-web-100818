  document.addEventListener("DOMContentLoaded", function() {
    fetchAPI(0)

    const forward = document.querySelector("#forward")
    forward.addEventListener("click", forwardButton)

    const back = document.querySelector("#back")
    back.addEventListener("click", backButton)

    monsterCreateFormSubmit.addEventListener("click", addNewMonster)

  })
  // Variables to Track Monster Objects
  let first = 0
  let last = 50

  //GET Fetch Monsters
  function fetchAPI(increment) {
    fetch("http://localhost:3000/monsters")
      .then(response => response.json())
      .then(data => {
        first += increment
        last += increment
        if (first < 0) {
          first = 0
          last = first + 50
          alert("Look in your closet")
        } else if (first > data.length) {
          first = Math.floor(data.length/50)*50
          last = Math.ceil(data.length/50)*50
          alert("Look under your bed")
        }
        data.slice(first, last).forEach(monster => {
        renderMonster(monster)})
      })
  }

  // Forward Button
  function forwardButton() {
    removeChildren(monsterContainer)
    fetchAPI(50)
  }

  // Back Button
  function backButton() {
    removeChildren(monsterContainer)
    fetchAPI(-50)
  }

  // Remove Children
  function removeChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
  }

  // Render Monster Container
  const monsterContainer = document.querySelector("#monster-container")

  function renderMonster(monsterData) {
    const monsterDiv = document.createElement("div")
    monsterDiv.innerHTML = `<h2>${monsterData.name}</h2><p>${monsterData.age}</p><p>${monsterData.description}</p>`
    monsterContainer.appendChild(monsterDiv)
  }

  // Create Monster Form
  const createMonster = document.querySelector("#create-monster")

  const monsterCreateForm = document.createElement("form")
  const monsterCreateFormName = document.createElement("input")
  monsterCreateFormName.id = "name-input"
  monsterCreateFormName.type = "text"
  monsterCreateFormName.placeholder = "name"

  const monsterCreateFormAge = document.createElement("input")
  monsterCreateFormAge.id = "age-input"
  monsterCreateFormAge.type = "text"
  monsterCreateFormAge.placeholder = "age"

  const monsterCreateFormDescription = document.createElement("input")
  monsterCreateFormDescription.id = "description-input"
  monsterCreateFormDescription.type = "textarea"
  monsterCreateFormDescription.placeholder = "description"

  const monsterCreateFormSubmit = document.createElement("input")
  monsterCreateFormSubmit.id = "submit"
  monsterCreateFormSubmit.type = "submit"
  monsterCreateFormSubmit.value = "Create A Monster"

  monsterCreateForm.appendChild(monsterCreateFormName)
  monsterCreateForm.appendChild(monsterCreateFormAge)
  monsterCreateForm.appendChild(monsterCreateFormDescription)
  monsterCreateForm.appendChild(monsterCreateFormSubmit)

  createMonster.appendChild(monsterCreateForm)

// Objectifying Input Fields
  function addNewMonster(event) {
    event.preventDefault()
    let data = {
      name: monsterCreateFormName.value,
      age: monsterCreateFormAge.value,
      description: monsterCreateFormDescription.value
    }
    postFetchAPI(data)
  }

// POST Fetch Monsters
  function postFetchAPI(data) {
    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      renderMonster(data)
    })
  }
