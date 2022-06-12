

export function addNameTitle(userData) {
    const name = userData.name.split(' ')
    const surname = userData.surname.split(' ')
    const namesList = [...name, ...surname]
    
    const fullName = namesList.reduce((previousWord, word) => previousWord + capitalize(word), '')
    
    document.querySelector('#userName').textContent = fullName
}

function capitalize(word) {
    return  ' ' + word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}