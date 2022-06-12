


/**
 * Given a list of inputs, it validates if all of them are into true.
 * @param {*} inputs 
 * @returns true if all inputs are valid. Otherwise, false
 */
export function checkInputs(inputs) {

    // Passwords must be the same. 
    const pwd1 = document.querySelector('#password').value
    const pwd2 = document.querySelector('#password-2').value

    if (pwd1 !== pwd2) {
        document.querySelector('#password-2').value = ''
        document.querySelector('#pwd2').textContent = 'Passwords must match'
        return false;
    } 

    // Check if all the inputs are into true
    for (const input of inputs) {
            //console.log(input)
            //console.log(input.validity)
            for (const element in input.validity) {
                if (element === 'valid') {
                    if (input.validity[element] != true) {
                        return false;
                    }
                }
            }
        }
        return true;
}

/**
 * These function allow to make click to the eye-icon and see the password.
 */
export function showPassword() {
        
    document.querySelectorAll('.fa-solid').forEach(icon => icon.onmousedown = showPassword)
    document.querySelectorAll('.fa-solid').forEach(icon => icon.onmouseup = hidePassword)
    
    function showPassword(e) {
        e.target.previousElementSibling.type = 'text'
    }
    function hidePassword(e) {
        e.target.previousElementSibling.type = 'password'
    }

}


