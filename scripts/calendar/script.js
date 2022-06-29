import { createCards } from "./modules/createCards.js";
import { mealPrepEndPoint } from "./modules/createEndPoint.js";
import { fetchDataAndSaveToLocalStorage } from "./modules/generateData.js";
import { addNameTitle } from "./modules/personalizeTitleName.js";
import { colsePopUp, showPopUpWithRecipeClicked } from "./modules/popUpControl.js";


async function generateDataForCalendar() {
  // Get user data from local storage -> returns string, parse to JSON
  const userData = JSON.parse(localStorage.getItem("userData"))

  // Create endPoint for spoonacular.com api:
  const endPoint = mealPrepEndPoint(userData)

  // Fetch data from several apis and save processed data to local storage as "mealsOfTheWeek"
  // If we comment these line we'll get the previous fetched data saved on the local storage
  console.log("1")
  await fetchDataAndSaveToLocalStorage(endPoint);
  console.log("2")
  // Personalize title: 
  addNameTitle(userData)

  // Get data from apis saved to local storage and create cards:
  const data = JSON.parse(localStorage.getItem("mealsOfTheWeek"))
  createCards(data)

  // Pop Up
  showPopUpWithRecipeClicked(data)
  colsePopUp()

}
generateDataForCalendar();


