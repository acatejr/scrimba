import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js"
import { getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-be7ed-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const inputFieldEl = document.getElementById("input-field") // .addEventListener('change', inputChange)
const addButtonEl = document.getElementById("add-button")
const database = getDatabase(app)
const moviesInDb = ref(database, "movies")

addButtonEl.addEventListener("click", () => {
    let inputVal = inputFieldEl.value
    push(moviesInDb, inputVal)
    // console.log(`${inputVal} added to database`)
})