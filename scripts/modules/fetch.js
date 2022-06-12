/**
 * These function makes fetch to a internal file and returns a persed json
 * @param {string} fileDirection 
 * @returns JSON object with the information of the file
 */
 export const fetchJSON = async (fileDirection) => {

    const response = await fetch(fileDirection);

    if (!response.ok) return 

    // Parse response to json
    const data = await response.json();

    return data;
}

/**
 * These function makes fetch to a internal file and returns the content in a text format
 * @param {string} fileDirection 
 * @returns string with the information
 */
export const fetchCSV = async (fileDirection) => {

    const response = await fetch(fileDirection);

    if (!response.ok) return 

    // parse response to text
    const data = await response.text();
    
    return data;
}