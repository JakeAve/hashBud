const hashBud = {
    letters : 'abcdefghijklmnopqrstuvwxyz',
    oneHundredChars : `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*()_+-=[]\\{}|;':",./<>? ¡¢£¤¥`,

    hash(string, letters = this.letters, oneHundredOptions = this.oneHundredChars) {
        const hex = Buffer.from(string).toString('hex').split('').reverse().join('');
        const digits = hex.split('').map(char => /\d/.test(char) ? char : letters.indexOf(char));
        
        let numerical = digits;
        for (let i = 0; i < 3; i ++)
            numerical = this.shuffleDigits(numerical);
            
        const lettered = this.toLetters(numerical.join(''), Array.isArray(oneHundredOptions) ? oneHundredOptions : oneHundredOptions.split('')).slice(0, 120);
        return Buffer.from(lettered).toString('base64').slice(0, 150);
    },

    shuffleDigits(digits) {
        function adder(arr) {
            return arr.reduce((accumulator, currentValue, index) => 
                accumulator + (index + currentValue)
            )
                .toString()
                .split('');
        };
        
        function randomNumber(arr) {
            const sumArr = arr.reduce((accumulator, currentValue) => 
                (parseInt(accumulator) + parseInt(currentValue))
            )
                .toString()
                .split('');
            return parseInt(sumArr[0]) + parseInt(sumArr[sumArr.length - 1])
        };
    
        function multiplier(arr) {
            const number = randomNumber(arr);
            return arr.map(item => item * number).concat([number])
        };
        
        const shuffle = adder(digits);
        const jumble = multiplier(digits);
        const firstHalf = jumble.concat(shuffle);
        const shuffle2 = adder(firstHalf);
        const jumble2 = multiplier(shuffle2);
        const secondHalf = shuffle2.concat(jumble2);
        
        return combined = firstHalf.map((item, index) => {
            return secondHalf[index] ? item.toString() + secondHalf[index].toString() : item.toString();
        })
    },
        
    toLetters(string, oneHundredOptions = this.oneHundredChars) {
        return string.match(/(..?)/g).map(item => oneHundredOptions[item]).join('');
    },

    makeSalt(length = 0, options = this.oneHundredChars) {
        const chars = length <= 0 || length > 16 ? Math.ceil(Math.random() * 16) : length;
        let salt = '';
        for (let i = 0; i < chars; i ++)
            salt += options[Math.round(Math.random() * 100)];
        return salt
    }
};

//export default hashBud;

const arrayOfStuff = [
    '0',
    '0',
    'ten',
    'tne',
    'abcdefghijklmmopqrstuvwxyzabcdefghijklmmopqrstuvwxyz',
    'abcdefghijklmmopqrstuvwxyzabcdefghijklmmopqrstuvwxyy',
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    'this is a very long password that I would never use',
    'this is a very long password',
    '人口總數居於日本各都道府縣首位',
    '人口總數居於日本各都道府縣首位。'
];

arrayOfStuff.forEach(item => {
    const salt1 = hashBud.makeSalt();
    const salt2 = hashBud.makeSalt();
    console.log(`
    
    ${item}
    
    ${hashBud.hash(item)}
    ${hashBud.hash(item + salt1)}
    ${hashBud.hash(item + salt2)}
    `)
});
