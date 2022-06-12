
// All the diets information:
const dietsInformation = [
    {
        name : 'No Preference',
        description : 'In the simplest terms, an omnivorous diet includes foods of both plant and animal origin.',
        tag : ''
    }, 
    {
        name : 'Gluten Free',
        description : 'Eliminating gluten means avoiding wheat, barley, rye, and other gluten-containing grains and foods made from them (or that may have been cross contaminated).',
        tag : 'tag 2'
    },
    {
        name : 'Ketogenic',
        description : 'The keto diet is based more on the ratio of fat, protein, and carbs in the diet rather than specific ingredients. Generally speaking, high fat, protein-rich foods are acceptable and high carbohydrate foods are not.',
        tag : 'tag3'
    }, 
    {
        name : 'Vegetarian',
        description : 'No ingredients may contain meat or meat by-products, such as bones or gelatin.',
        tag : 'gat4'
    },
    {
        name : 'Lacto-Vegetarian',
        description : 'All ingredients must be vegetarian and none of the ingredients can be or contain egg.',
        tag : 'omnivorous'
    }, 
    {
        name : 'Ovo-Vegetarian',
        description : 'All ingredients must be vegetarian and none of the ingredients can be or contain dairy.',
        tag : 'tag 2'
    },
    {
        name : 'Vegan',
        description : 'No ingredients may contain meat or meat by-products, such as bones or gelatin, nor may they contain eggs, dairy, or honey.',
        tag : 'tag3'
    }, 
    {
        name : 'Pescetarian',
        description : 'Everything is allowed except meat and meat by-products - some pescetarians eat eggs and dairy, some do not.',
        tag : 'gat4'
    }
]

/**
 * These function creates all the boxes <div> with diet information. Fragment to avoid reflow.
 */
export function createDietsDivs() {
    const fragment = document.createDocumentFragment();

    // Grab a reference to the template: 
    const template = document.querySelector('#diet-template').content;

    // For every diet, creat a div with name and description
    for (const diet of dietsInformation) {
        
        const dietDiv = template.cloneNode(true);
        dietDiv.querySelector('h3').textContent = diet.name;
        dietDiv.querySelector('p').textContent = diet.description;

        // Add the clone to fragment:
        fragment.appendChild(dietDiv)
    }

    // Grab the reference were we'll put the fragment
    const dietsContainer = document.querySelector('.diets-container');
    
    // Add the fragment to DOM
    dietsContainer.appendChild(fragment);

    // By defautl the first one will be selected: 
    const listOfDiets = dietsContainer.querySelectorAll('.diet-container')
    listOfDiets[0].classList.add('diet-active')
}

// Check diet

// Grab the reference were we'll put the information (repeat)
export function changeSelectedDiet() {
    const dietsContainer = document.querySelector('.diets-container');
    const listOfDiets = dietsContainer.querySelectorAll('.diet-container');

    dietsContainer.addEventListener('click', (e) => {
        const elementClicked = e.target;

        if (elementClicked === dietsContainer) return;

        for (const diet of listOfDiets) {
            diet.classList.remove('diet-active')
        }

        // We want to select the diet if we make click over his box, that also include the elements inside.
        for (const diet of listOfDiets) {
            if (elementClicked === diet || elementClicked.parentNode === diet) {
                diet.classList.add('diet-active'); 
            }
        }
    })
}
