// import {generator} from 'generate-password';
// const fs = require('fs');

const validLength = password => password.length >= 10;
const hasUpperCase = password => /[A-Z]/.test(password);
const hasLowerCase = password => /[a-z]/.test(password);
const hasNumbers = password => /[0-9]/.test(password);
const hasNonAlphas = password => /[^a-zA-Z0-9]/.test(password);
const hasSpaces = password => /\s/.test(password);

const lowerAlphas = 'abcdefghijklmnopqrstuvwxyz';
const upperAlphas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const nonAlphas = '!@#$%^&*()_+{}:"<>?|[];\',./`~';

const chars = [lowerAlphas, upperAlphas, numbers, nonAlphas];
const validations = [hasLowerCase, hasUpperCase, hasNumbers, hasNonAlphas];

const randIndex = (arr) => Math.floor(Math.random() * (arr.length - 1));
// const passwords = fs.readFileSync('passwords.txt', 'utf8').split('\n');

// function generatePassword() {
//     return generator.generate({
//         length: 10,
//         numbers: true,
//         symbols: true,
//         uppercase: true,
//         lowercase: true
//     });
// }

export const isStrong = (password) => {
    if (checkPassword(password) === password)
        return true;
    return false;
}

export const checkPassword = (password) => {
    console.log("CHECKING PASSWORD")
    if (hasSpaces(password))
        password = password.replace(/ /g, "")
    for (let i = 0; i < validations.length; i++) {
        if (!validations[i](password)) {
            const j = randIndex(password);
            const k = randIndex(chars[i].split(''));
            password = password.substring(0, j + 1) + chars[i][k] + password.substring(j + 1);
        }
    }
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
    return password;
}

console.log(checkPassword('home'));
