import { fetchCSV } from "../../modules/fetch.js"
import { addTag } from "./tagsControl.js"



export async function showFoodSuggestions() {

    const data = await fetchCSV('./data/top-1k-ingredients.csv')
    const dataArray = data.split('\n').map(element => element.substring(0, element.indexOf(';')))
    
    // At the beginning we only want to show five foods, as an example. 
    const alimentsList = document.querySelector('#aliments-list')
    for (let i = 0; i <= 4; i++) {
        // Create <li> with the food and add it to the listAliments
        appendLiToContainer(dataArray[i], alimentsList)
    }

    // Shows the user search below
    document.querySelector('#aliments').addEventListener('keyup', (e)=>{
        showFoodList(e, dataArray)
    }) 

    // Create and add the food tag in the aliments-list:
    document.querySelector('#aliments').addEventListener('keyup', (e)=>{
        createFoodTag(e, dataArray)
    })

    document.querySelector('#btn-add-aliment').addEventListener('click', (e)=>{
        createFoodTag(e, dataArray)
    })  
    
}

function createFoodTag(e, dataArray) {
    e.preventDefault()
    // Get the value introduced for the user:
    const val = document.querySelector('#aliments').value

    // Grab a referenct to the add-button (it has to make the same effect as the enter):
    const submitButton = document.querySelector('#btn-add-aliment')

    if (e.keyCode === 13 || e.target === submitButton) {
        // When enter pressed, celar the input:
        document.querySelector('#aliments').value = ''

        // If the introduced value is not on the array of items. return
        // Means that the user has introduced an invalid word.
        if (dataArray.indexOf(val) === -1) return
        
        // We also want to return and do nothing if the value already exists:
        if ([...document.querySelectorAll('#non-aliments-list li p')]
                .map(item => item.textContent)
                .includes(val)
            ) return;

        // Add the tag to the corresponent list:
        const ul = document.querySelector('#non-aliments-list')
        addTag(val, ul)

    } 
}

// Això també, es la primera part
function showFoodList(e, dataArray) {

    e.stopPropagation();
    const val = document.querySelector('#aliments').value.toLowerCase()
    const itemosOfAlimentsList = document.querySelectorAll('#aliments-list li')
    const alimentsList = document.querySelector('#aliments-list')

    // Delete all the <li> from the aliments-list
    for (const item of itemosOfAlimentsList) {
        alimentsList.removeChild(item)
    }

    // Add those ones that fit
    if (val === '') {
        for (let i = 0; i <= 4; i++) {
            appendLiToContainer(dataArray[i], alimentsList)
        }
    } else {
        for (const aliment of dataArray) {
            if (aliment.indexOf(val) !== -1) {
                appendLiToContainer(aliment, alimentsList)
            }
        }
    }
}

function appendLiToContainer(content, container) {
    const li = document.createElement('li')
    li.textContent = content
    container.appendChild(li)
}

