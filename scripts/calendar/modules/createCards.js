
/**
 * This function creates all the elemes of calendar.index DOM
 * @param {*} data
 */
export function createCards(data) {
    // Create fragment:
    const fragment = document.createDocumentFragment();
  
    // Get references to the template:
    const dayTemplate = document.querySelector('#day-template').content 
    const cardTemplate = document.querySelector('#card-template').content
    const statsTemplate = document.querySelector('#stats-template').content
  
    // index to generate canvas id's
    let index = 0;
  
    // Array to save the information to create the bar chart after creating the <canvas> container.
    let dataStats = []
  
    // For every day get the name, get the three meals and create the corresponding cards
    // and finally create the <canvas> container.
    for (const day in data.week) {
      const title = dayTemplate.cloneNode(true);
      //console.log(day)
      // Title of the template
      title.querySelector('.title').textContent = day
  
      // Add the title to fragment:
      fragment.appendChild(title)
  
      // We need 3 divs with class="cards" (Meals of the template):
      // Create the meal cards: 
      for (const meal of data.week[day].meals) {
        // For every meal create a card with the meal data. 
        //console.log(meal)
        const mealCard = cardTemplate.cloneNode(true);
        mealCard.querySelector('img').src = meal.image
        mealCard.querySelector('h4').textContent = meal.title
  
        // Add the cards to fragment:
        fragment.appendChild(mealCard)
      }
  
      // div with class="data" (Macros column):
      const statsDiv = statsTemplate.cloneNode(true);
      const canvas = statsDiv.querySelector('.data canvas')
      canvas.id = `macros-chart-${index}`
      index++;
      // Add the clone to fragment:
      fragment.appendChild(statsDiv)
  
      // Save data references to create the bar charts: 
      dataStats.push([canvas.id, data.week[day].nutrients.fat, data.week[day].nutrients.carbohydrates, data.week[day].nutrients.protein, data.week[day].nutrients.calories])
    }
  
    // Grab the reference were we'll put the fragment
    const week = document.querySelector('.week');
  
    // Add the fragment to DOM
    week.appendChild(fragment);
  
    // Once the canvas exists, we can add the stats.
    for (const data of dataStats) {
      createBarChar(...data)
    }
}

/**
 * function that given an id creates a bar chart of three bars (fat, carbs, proteins)
 * on the id that has been provided.
 * @param {*} reference 
 * @param {*} fat 
 * @param {*} carbs 
 * @param {*} protein 
 * @param {*} cals will appear on the title of the bar chart
 */
function createBarChar(reference, fat, carbs, protein, cals) {
    const ctx = document.getElementById(reference);
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Fat', 'Protein', 'Carbohydrates'],
            datasets: [{
                label: `Total kcal ${cals}`,
                data: [fat, protein, carbs],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}