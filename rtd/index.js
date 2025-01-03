import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-ec3de-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")
const shoppingListEl = document.getElementById("shopping-list")

onValue(shoppingListInDB, (snapshot) => {

    if (snapshot.exists()) {

        let itemsArray = Object.entries(snapshot.val())
        clearShoppingListEl()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            appendItemToShoppingListEl(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = "No items here..., yet."
    }

})

const clearShoppingListEl = () => {
    shoppingListEl.innerHTML = ""
}

const clearInputFieldEl = () => {
    inputFieldEl.value = ""
}

const appendItemToShoppingListEl = (item) => {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    newEl.addEventListener("click", () => {
        let path = `shoppingList/${itemID}`
        let exactLocationOfItemInDB = ref(database, path)
        remove(exactLocationOfItemInDB)
    })
    shoppingListEl.append(newEl)
}

addButtonEl.addEventListener("click", () => {
    let inputVal = inputFieldEl.value
    push(shoppingListInDB, inputVal)
    clearInputFieldEl()
})
