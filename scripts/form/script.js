import { followingPage, previousPage, submitForm } from "./modules/formControl.js";
import { changeSelectedDiet, createDietsDivs } from "./modules/chooseDiet.js";
import { showFoodSuggestions } from "./modules/foodSearcher.js";
import { showPassword } from "./modules/inputControl.js";
import { createIntoleranceList } from "./modules/intolerancesControl.js";
import { createProfessionList } from "./modules/createProfessionsList.js";
import { createEvents } from "./modules/eventsPage5.js";


document.addEventListener('DOMContentLoaded', () => {
  // Form control next/previous page:
  followingPage()
  previousPage()
  
  // Page 2
  showPassword()

  // Page 3
  createProfessionList()
  
  // Page 4
  createDietsDivs()
  changeSelectedDiet()

  // Page 5
  createEvents()
  showFoodSuggestions()
  createIntoleranceList()
  
  // Form completed
  submitForm()

  });
  