# hashBud
Node script to hash passwords

Uncomment the export module to use it in a node application 

Randomize the letters and create your own oneHundredChars to customize your hashes

const letters = 'abcdefghijklmnopqrstuvwxyz';
const oneHundredChars = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*()_+-=[]\\{}|;':",./<>? ¡¢£¤¥`;

const randomize = (options, resLen = options.length - 1) => {
    const randomized = [];
    for (let i = 0; i < resLen; i ++) {
        let num, char;
        do {
            num = Math.round(Math.random() * (options.length - 1));
            char = options[num];
        } while (randomized.includes(char));
        randomized.push(char);
    }
    return randomized;
}

console.log(randomize(letters).join(''))
console.log(randomize(oneHundredChars).join(''))
console.log(randomize(oneHundredChars, 10).join(''))
