import { fetchJSON } from "../../modules/fetch.js";

export const createProfessionList = async () => {

    const professions = await fetchJSON('./data/professions.json')

    const fragment = document.createDocumentFragment();

    // For every profession, creat a <option> with the name and the attribute value with kcal.
    for (const profession of professions) {
        const option = document.createElement('option')
        option.textContent = profession.name
        option.value = profession.kcal
        option.name = profession.name
        fragment.appendChild(option)
    }

    // Grab the reference were we'll put the fragment:
    const professionsContainer = document.querySelector('#profession');
    
    // Add the fragment to DOM
    professionsContainer.appendChild(fragment);

}