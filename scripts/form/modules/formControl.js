
/**
 * In this file, we have
 */

import { checkInputs } from './inputControl.js'

// get all the references:
// Node list with all the buttons with the class="next" -> shows the following page.
const nextButtons = document.querySelectorAll('button.next');

// Node List with all the buttons with the class="back" -> allow to go back one step on the form.
const backButtons = document.querySelectorAll('button.back');

// Reference to the general <form>, check if the form is submited.
const form = document.querySelector('form');

// Node List with all the div with the class="content". That means one step or page of the form.
const content = document.querySelectorAll('.content');

// Node list with the five bubbles that represents the phase of the form.
const itemsProgress = document.querySelectorAll('.step');


/**
 * That function changes the layout for the next one, removes the class active and add it to the next.
 */
export function followingPage() {
    nextButtons.forEach(item => {
        item.addEventListener('click', () => {
            // Identify which node has the class='active'. Is the content that is being displayed.
            const active = document.querySelector('.content.active')
    
            // Check all the inputs. If it's not correct. We can't go to next step.
            const inputs = active.querySelectorAll('input');
    
            if (checkInputs(inputs)) {
                // Remove all the color yellow from the bubbles. Switch it to grey.
                for (const bubble of itemsProgress) {
                    bubble.classList.remove('active-step')
                }
    
                // Go to section of the form by changing the active class.
                // Also change the color of the bubble.
                for (let i = 0; i < content.length; i++) {
                    if (content[i] === active) {
                        content[i].classList.remove('active')
                        content[i+1].classList.add('active')
    
                        // Bubble color.
                        itemsProgress[i+1].classList.add('active-step')
                    } 
                }
            }
        })
    })
}

/**
 * These function changes the layout for the previous one
 */
export function previousPage() {
    backButtons.forEach(item => {
        item.addEventListener('click', () => {
            // Mirem quin node té la class='active' es el contingut que s'està mostrant.
            const active = document.querySelector('.content.active')
            
            // Treiem totes les bombolles groques i les posem a gris: 
            for (const bubble of itemsProgress) {
                bubble.classList.remove('active-step')
            }
    
            for (let i = 0; i < content.length; i++) {
                if (content[i] === active) {
                    content[i].classList.remove('active')
                    content[i-1].classList.add('active')
    
                    // Posem la bombolla de color
                    itemsProgress[i-1].classList.add('active-step')
    
                } 
            }
        })
    })
}


// Això s'ha de canviar a 'click'
export function submitForm() {
    document.querySelector('#btn-submit').addEventListener('click',e => {
        // Get all the <input> and <option> data.

        const inputs = document.querySelectorAll(".value-item");
        // Type of diet:
        const typeOfDiet = document.querySelector('.diet-active h3').textContent
        // Intolerances: 
        const intolerances = [...document.querySelectorAll('#intolerances-list li p')].map(item => item.textContent)
        // Food that the user don't like:
        const foods = [...document.querySelectorAll('#non-aliments-list li p')].map(item => item.textContent)
        
        const data = {}

        for (const input of inputs) {
            data[input.name] = input.value
        }

        data["diet"] = typeOfDiet
        data["intolerances"] = intolerances
        data["foods"] = foods

        // Save the user information to local storage
        localStorage.setItem("userData", JSON.stringify(data))
            
    })
}
