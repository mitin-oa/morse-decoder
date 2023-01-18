const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

const Morse_Binary = { '.': '10', '-': '11',' ': '**********' };

function decode(expr) {
    let decoded_expr = [];

    if (isDecoded(expr)) {
        let binaryWords = [];
        split_arr(expr, 10).forEach(word => binaryWords.push(decryptWord(word).join('')));
        binaryWords.forEach(word => decoded_expr.push(MORSE_TABLE[word] || ' '));
    } else {
        expr.split('').forEach((letter) => {
            const decoded = letter !== ' ' ? getKeyByValue(MORSE_TABLE, letter) : ' ';
            decoded_expr.push(decoded_symbol(decoded));
        });
    }

    return decoded_expr.join('');
}

function decryptWord(decodedWord) {
    let decryptedWords = [];
    if (decodedWord === '**********') { return [' '] }
    split_arr(decodedWord, 2).forEach(item => {
        if (item !== '00') {
            decryptedWords.push(getKeyByValue(Morse_Binary, item))
        }
    });

    return decryptedWords;
}

function decoded_symbol(symb) {
    if (symb === ' ') {
        return Morse_Binary[' ']
    }
    const decoded = []
    let templateArray = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
    symb.split('').forEach((x) => {
        decoded.push(Morse_Binary[x])
    })

    const stringToReplace = decoded.join('')
    templateArray.splice(templateArray.length - stringToReplace.length,
        stringToReplace.length,
        stringToReplace);
    return templateArray.join('');
}

function split_arr(array, size) {
    const splited_arr = [];
    let index = 0;
    while (index < array.length) {
        splited_arr.push(array.slice(index, size + index));
        index += size;
    }

    return splited_arr;
}


function isDecoded(str) {
    return RegExp(/^[01*]+$/).test(str);
}

function getKeyByValue(object ,value) {
    return Object.keys(object).find(key => object[key] === value);
}

module.exports = {
    decode
}