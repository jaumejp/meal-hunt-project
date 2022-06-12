// Show pop up: 
export function showPopUpWithRecipeClicked(data) {
  document.querySelector('.week').addEventListener('click', (e) => {
    if (!e.target.classList.contains('fa-circle-chevron-down')) return
  
    // Get the reference that has been clicked:
    const recipeName = e.target.parentNode.parentNode.parentNode.querySelector('h4').textContent
  
    // Add the information to the pop up div: 
    // Grab the reference: 
    const popUpDiv = document.querySelector('.pop-up')
  
    // Search for all the data that has been clicked and fill the <div>:
    for (const day in data.week) {
      for (const meal of data.week[day].meals) {
        if (recipeName === meal.title) {
          popUpDiv.querySelector('h4').textContent = meal.title
          popUpDiv.querySelector('img').src = meal.image
          popUpDiv.querySelector('img').alt = meal.title
          popUpDiv.querySelector('.scroll-box').innerHTML = meal.summary
          popUpDiv.querySelector('.icons .fa-star').textContent = meal.healthScore
          popUpDiv.querySelector('.icons a').href = meal.sourceUrl
          popUpDiv.querySelector('.icons .fa-clock').textContent = meal.readyInMinutes
  
        }
      }
    }
  
    // Show the div: add the class show to the div = pop-up-bg
    document.querySelector('.pop-up-bg').classList.add('show')
  })
}

/**
 * Close pop up:
 */
export function colsePopUp() {
  document.querySelector('.pop-up-bg .pop-up .fa-circle-xmark')
    .addEventListener('click', () => {
      document.querySelector('.pop-up-bg').classList.remove('show')
    })
}
  
