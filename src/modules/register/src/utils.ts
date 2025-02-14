export const minimum8Characters = (password: string) => {
    return password.length >= 8;
};

export const atLeastOneLetter = (password: string) => {
    const regex = /[a-zA-Z]+/;
    return regex.test(password);
};

export const atLeastOneDigit = (password: string) => {
    const regex = /\d+/;
    return regex.test(password);
};

export const atLeastOneSpecialCharacter = (password: string) => {
    const regex = /[\W_]+/;
    return regex.test(password);
};
