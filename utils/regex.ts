const Regex = {
    anagram: (letters: string) => {
        const lettersU = letters.toUpperCase();
        const letterCounts: Record<string, number> = {};
        let regex = "";

        for (const letter of lettersU) {
            letterCounts[letter] = letterCounts[letter] ? letterCounts[letter] + 1 : 1;
        }

        for (const [letter, count] of Object.entries(letterCounts)) {
            regex += `(?=(.*${letter}){${count}})`;
        }

        regex += `.{${lettersU.length}}`;

        return regex;
    },

    anagramSup1: (letters: string) => {
        const lettersU = letters.toUpperCase();
        const letterCounts: Record<string, number> = {};
        let regex = "";

        for (const letter of lettersU) {
            letterCounts[letter] = letterCounts[letter] ? letterCounts[letter] + 1 : 1;
        }

        for (const [letter, count] of Object.entries(letterCounts)) {
            regex += `(?=(.*${letter}){${count}})`;
        }

        regex += `.{${lettersU.length + 1}}`;

        return regex;
    },

    anagramSup2: (letters: string) => {
        const lettersU = letters.toUpperCase();
        const letterCounts: Record<string, number> = {};
        let regex = "";

        for (const letter of lettersU) {
            letterCounts[letter] = letterCounts[letter] ? letterCounts[letter] + 1 : 1;
        }

        for (const [letter, count] of Object.entries(letterCounts)) {
            regex += `(?=(.*${letter}){${count}})`;
        }

        regex += `.{${lettersU.length + 2}}`;

        return regex;
    },

    anagramSub1: (letters: string) => {
        const lettersU = letters.toUpperCase();
        const letterCounts: Record<string, number> = {};
        let regex = "";

        for (const letter of lettersU) {
            letterCounts[letter] = letterCounts[letter] ? letterCounts[letter] + 1 : 1;
        }

        for (const [letter, count] of Object.entries(letterCounts)) {
            regex += `(?!(.*${letter}){${count + 1},})`;
        }

        const uniqueLetters = Object.keys(letterCounts).join("");

        regex += `[${uniqueLetters}]{${lettersU.length - 1}}`;

        return regex;
    },

    anagramSub2: (letters: string) => {
        const lettersU = letters.toUpperCase();
        const letterCounts: Record<string, number> = {};
        let regex = "";

        for (const letter of lettersU) {
            letterCounts[letter] = letterCounts[letter] ? letterCounts[letter] + 1 : 1;
        }

        for (const [letter, count] of Object.entries(letterCounts)) {
            regex += `(?!(.*${letter}){${count + 1},})`;
        }

        const uniqueLetters = Object.keys(letterCounts).join("");

        regex += `[${uniqueLetters}]{${lettersU.length - 2}}`;

        return regex;
    },

    prefix: (word: string) => `.+${word}`,

    suffix: (word: string) => `${word}.+`,

    infixOf: (word: string) => `.+${word}.+`,

    prefix1: (word: string) => `.${word}`,

    prefix2: (word: string) => `..${word}`,

    prefix3: (word: string) => `...${word}`,

    suffix1: (word: string) => `${word}.`,

    infix1Of: (word: string) => `.${word}.`,

    epenthesis: (word: string) => `(?=^${[...word].join(".?")}$).{${word.length + 1}}`,

    lipogram: (word: string) => `(?=^${[...word].join("?")}?$).{${word.length - 1}}`,

    replacements: (word: string) => {
        const regexParts = [];

        for (let i = 0; i < word.length; i++) {
            regexParts.push(word.replace(word[i], `[^${word[i]}]`));
        }

        return `(${regexParts.join("|")})`;
    },
};

export default Regex;
