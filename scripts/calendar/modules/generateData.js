
import { fetchJSON } from "../../modules/fetch.js";
import { createRecipeEndPointOf } from "./createEndPoint.js"

export async function fetchDataAndSaveToLocalStorage(endPoint) {
  let mealPrepData;
  try {
    mealPrepData = await fetchJSON(endPoint);
    //console.log(mealPrepData)
   
    for (const day in mealPrepData.week) {
      //console.log(day)
      for (const meal of mealPrepData.week[day].meals) {
        //console.log(meal)
  
        // Data from api:
        // Call api for every recipe/meal:
        const recipeEndPoint = createRecipeEndPointOf(meal.id)
        const recipeData = await fetchJSON(recipeEndPoint)
  
        // Add the data from the second api call and put it to the first one: 
        meal.image = recipeData.image
        meal.summary = recipeData.summary
        meal.healthScore = recipeData.healthScore
      }
    }
    
    // Save the information to local Storage: 
    localStorage.setItem("mealsOfTheWeek", JSON.stringify(mealPrepData))

  } catch(error) {
    // If we don't have credits or someting goes wrong with the connection with the api. 
    // Charge some general data. 
    mealPrepData = await fetchJSON("./data/ExampleMealsOfTheWeek.json");
    //console.log(mealPrepData)
    localStorage.setItem("mealsOfTheWeek", JSON.stringify(mealPrepData))
  }

}