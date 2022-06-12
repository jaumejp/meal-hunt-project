
export function deleteTag(target, e) {
    e.stopPropagation();
    
    const elementClicked = e.target
    
    // If the element clickd dosen't contains the icon tag, means that is not the icon button
    if (!elementClicked.classList.contains('fa-circle-xmark')) return false;

    // Delete element clicked de la llista: 
    const valueToDelete = elementClicked.parentNode.textContent

    // Grab a reference of the items and the container of the list: 
    const listOfExistentTags = document.querySelectorAll(`#${target} li`)
    const ul = document.querySelector(`#${target}`)

    // Delete the <li> that has the value (textContent of the element clicked)
    deleteLiFromUl(ul, listOfExistentTags, valueToDelete)



    return true;
}

export function deleteLiFromUl(ul, listOfExistentTags, valueToDelete) {
    for (const li of listOfExistentTags) {
        if (li.textContent === valueToDelete) {
            ul.removeChild(li)
        }
    }
}

export function unpaintIntoleranceTag(e) {

    const valueToDelete = e.target.parentNode.textContent
    const intoleranceList = document.querySelectorAll('.options p')

    for (const [index, item] of intoleranceList.entries()) {
        if (item.textContent === valueToDelete) {
            // Remove the class that privides selected color:
            intoleranceList[index].classList.remove('selected')
        }
    }
}


/**
 * Append tag <li> to a container <ul> is for addint foods and intolerances to the 
 * coresponent list.
 * @param {*} liItem 
 * @param {*} ulContainer 
 */
 export const addTag = (liItem, ulContainer) => { 

    const template = document.querySelector('#exclude-template').content;
    const li = template.cloneNode(true);

    li.querySelector('p').textContent = liItem
    ulContainer.appendChild(li)
}

