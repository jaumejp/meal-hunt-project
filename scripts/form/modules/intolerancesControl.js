import { fetchJSON } from "../../modules/fetch.js";
import { addTag, deleteLiFromUl } from "./tagsControl.js";

export async function createIntoleranceList() {

    const data = await fetchJSON('./data/intolerances.json')

    // Create the list with intolerances
    const intolerances = data.map(item => item.name);

    // For every intolerance, create a <p> tag and append it to the container.
    // By default will be hidden
    const container = document.querySelector('.options')
    for (const intolerance of intolerances) {
        const p = document.createElement('p')
        p.textContent = intolerance
        container.appendChild(p)
    }
}

export const showIntolerancesGrid = (e) => {
    e.stopPropagation();

    // Change visibility of he container with class options:
    document.querySelector('.options').classList.add('active-tag')

    // Detect when some of them are clicked:
    document.querySelector('.active-tag').querySelectorAll('p').forEach(text => {
        text.addEventListener('click', (e) => {
            // If the user clicks the button and it has been already selected, means that
            // the user wants to unselect. and vice versa.
            if (e.target.classList.contains('selected')) {
                e.target.classList.remove('selected')
                // Delete from the main list of intolerances that the user is choosing:
                const ul = document.querySelector('#intolerances-list')
                const listOfExistentTags = document.querySelectorAll('#intolerances-list li')
                const valueToDelete = e.target.textContent
                deleteLiFromUl(ul, listOfExistentTags, valueToDelete)

            } else {
                e.target.classList.add('selected')
                const ul = document.querySelector('#intolerances-list')
                addTag(e.target.textContent, ul)
            }
        })
    })
}

/**
 * These function hides the Intolerance grid.
 * @param {*} e 
 * @returns void
 */
export const hideIntolerancesGrid = (e) => {
    const div = document.querySelector('.active-tag')
    const submitButton = document.querySelector('#btn-add')
    const ul = document.querySelector('#intolerances-list')

    /*
        We only want to hide the menu if the user click outside the div. 
        Not on the container, the tag itserlf, the submit button or the list 
        with the selected items.
    */

    if (e.target === div || e.target.parentNode === div || e.target === submitButton || e.target === ul || e.target.parentNode === ul || e.target.parentNode.parentNode === ul) return;
    
    e.stopPropagation();
    
    document.querySelector('.options').classList.remove('active-tag')
}

export const createIntoleranceTag = (e) => {
    e.preventDefault()
    const val = document.querySelector('#intolerances').value.toLowerCase()
    
    // button has to be like an enter
    const submitButton = document.querySelector('#btn-add')

    if (e.keyCode === 13 || e.target === submitButton) {
        document.querySelector('#intolerances').value = ''

        // Grab the list of intolerances: 
        const allIntolerances = document.querySelectorAll('.options p')

        // if the introduced value it has been already added or dosen't exists, return
        // these could be a function (repeated code)

        // If the value dosen't exists on the array, is not valid:
        const listOfAllIntolerances = [...allIntolerances].map(item => item.textContent.toLocaleLowerCase())
        if (listOfAllIntolerances.indexOf(val) === -1) return

        // Also is not a valid input if the value already exists.    
        if ([...document.querySelectorAll('#intolerances-list li p')]
            .map(item => item.textContent.toLowerCase())
            .includes(val)) return 


        // Add the itroduced word "intolerance" to the list:
        for (const [index, item] of listOfAllIntolerances.entries()) {
            if (val === item) {
                // Marcar-lo de color
                allIntolerances[index].classList.add('selected')
                // Falta add a la llista de dalt:
                const ul = document.querySelector('#intolerances-list')
                addTag(allIntolerances[index].textContent, ul)
            }
        }
    }  
}
