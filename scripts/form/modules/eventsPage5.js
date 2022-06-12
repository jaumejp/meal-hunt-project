
import { showIntolerancesGrid, hideIntolerancesGrid, createIntoleranceTag } from "./intolerancesControl.js";
import { deleteTag, unpaintIntoleranceTag } from "./tagsControl.js";


export function createEvents() {
    document.querySelector('#intolerances').addEventListener('keyup', createIntoleranceTag)

    document.querySelector('#btn-add').addEventListener('click', createIntoleranceTag)

    document.querySelector('#intolerances').addEventListener('click', showIntolerancesGrid)

    document.querySelector('html').addEventListener('click', hideIntolerancesGrid)

    document.querySelector('#intolerances-list').addEventListener('click', (e) => {
        if(deleteTag('intolerances-list', e)) {
            unpaintIntoleranceTag(e)
        }
    })

    document.querySelector('#non-aliments-list').addEventListener('click', (e) => {
        deleteTag('non-aliments-list', e)
    })
}




