/**
 * Data of the features
 */
const urlsImg = 
[
    {
        name : "Meal Prep",
        url : "./images/iphone-home.png"
    },
    {
        name : "Meal Search",
        url : "./images/iphone-yellow.png"
    },
    {
        name : "Meal Generator",
        url : "./images/iphone-blue.png"
    },
    {
        name : "See More",
        url : "./images/iphone-red.png"
    }
]

/**
 * These function change the image and the selected button of the features section
 */
export const changeFeatures = () => {
    // Get reference to button container: 
    const buttonContainer = document.querySelector('.button-container');
    // Add eventListenner to everything in the container for the buttons:
    buttonContainer.addEventListener('click', (e) => {
        
        // Get references for all elements:
        const elementClicked = e.target;

        // NodeList with all the <a> which contains the .btn-features class
        const buttons = document.querySelectorAll('.btn-features')
        
        // Image of the features-container
        const img = document.querySelector('.img-content');
        
        // If element clicked is outside the button, return
        if (elementClicked === buttonContainer) return; 
    
        // Remove all class='active-button':
        for (const button of buttons) {
            button.classList.remove('active-button');
        }
    
        // Activate the clicked button and put the corresponent soruce in the image: 
        for (const button of buttons) {
            if (button === elementClicked) {
                button.classList.add('active-button')
                for (const image of urlsImg) {
                    if (button.textContent === image.name) {
                        img.src = image.url;
                    } 
                }
            }
        }
    })
}

/**
 * When click on the icons, appears the hidden layout.
 * When click on the close, buttons the layout is hidden. 
 */
export const shareLayout = () => {
    const shareContainer = document.querySelector('.share-container')
    document.querySelectorAll('.share-button').forEach(item => {
        item.addEventListener('click', () => {
            shareContainer.classList.add('active')
        })
    })

    document.querySelector('.icon.close').addEventListener('click', () => {
        shareContainer.classList.remove('active')  
    })
}

