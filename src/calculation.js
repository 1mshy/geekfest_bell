import password_file from './passwords.txt';
//this file contains all functions that involve the password recommendation algorithm and password strength calculation

//Functions for calculating the strength of a password
const validLength = password => password.length >= 10;
const hasUpperCase = password => /[A-Z]/.test(password);
const hasLowerCase = password => /[a-z]/.test(password);
const hasNumbers = password => /[0-9]/.test(password);
const hasNonAlphas = password => /[^a-zA-Z0-9]/.test(password);
const hasSpaces = password => /\s/.test(password);

//Constant strings for each character type
const lowerAlphas = 'abcdefghijklmnopqrstuvwxyz';
const upperAlphas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const nonAlphas = '!@#$%^&*()_+{}:"<>?|[];\',./`~';

//Arrays of character types and their corresponding validation functions
const chars = [lowerAlphas, upperAlphas, numbers, nonAlphas];
const validations = [hasLowerCase, hasUpperCase, hasNumbers, hasNonAlphas];

//Random index generator
const randIndex = (arr) => Math.floor(Math.random() * (arr.length - 1));

export const isStrong = (password) => {
    if (checkPassword(password) === password)
        return true;
    return false;
}

//Checks if password is strong, if not, modifies it to be strong
export const checkPassword = (password) => {
    console.log("CHECKING PASSWORD")
    //If spaces are present, remove them
    if (hasSpaces(password))
        password = password.replace(/ /g, "")
    //Loop through each character type and check if password has at least one of each
    for (let i = 0; i < validations.length; i++) {
        if (!validations[i](password)) {
            const j = randIndex(password);
            const k = randIndex(chars[i].split(''));
            password = password.substring(0, j + 1) + chars[i][k] + password.substring(j + 1);
        }
    }
    //If the length of password is still less than 10, add random characters until it is
    if (!validLength(password)) {
        for (let i = 0; i < 10; i++) {
            const j = randIndex(password);
            const l = randIndex(chars);
            const k = randIndex(chars[l].split(''));
            password = password.substring(0, j + 1) + chars[l][k] + password.substring(j + 1);
            if (validLength(password))
                break;
        }
    }
    //Return the modified password
    return password;
}

// console.log(checkPassword('home'));
function x() {

}
const y = () => {

}


async function checkList(password) {
    // console.log(password_file);
    let pass_arr = [];
    await fetch(password_file)
    .then((response) => {
        return response.text(); 
    }).then((text) => {
        // console.log(text.split("\r\n"));
        pass_arr = text.split("\r\n");
    });

    if (pass_arr.includes(password)) {
        return true;
    }
    return false;
}

checkList("12345").then((res) => console.log(res));