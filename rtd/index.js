import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js"
import { getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-ec3de-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

addButtonEl.addEventListener("click", () => {
    let inputVal = inputFieldEl.value
    push(shoppingListInDB, inputVal)
})
