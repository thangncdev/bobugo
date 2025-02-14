export const validateInputNumber = (
    text: string,
    previousText: string = '',
    decimal: number = 8,
    beforeDecimal?: number
) => {
    const textReplace = text.replace(/,/g, '.');
    const previousTextReplace = previousText.replace(/,/g, '.');
    if (textReplace?.length < previousTextReplace?.length) {
        return textReplace;
    }
    if (textReplace.includes(' ')) {
        return previousText;
    }
    if (textReplace.includes('-') || !textReplace.match(/^[0-9]*\.?[0-9]*$/)) {
        return previousText;
    }

    if (textReplace.charAt(0) === '.' || textReplace.split('.').length > 2) {
        return previousText;
    }

    if (decimalCountOfNumber(text) > decimal || (beforeDecimal && beforeDecimalCountOfNumber(text) > beforeDecimal)) {
        return previousText;
    }

    return textReplace;
};

const decimalCountOfNumber = (text: string) => {
    if (text) {
        const str = text.toString().replace(/,/g, '.');
        if (!str.includes('.')) {
            return 0;
        } else {
            return str.split('.')[1].length;
        }
    } else {
        return 0;
    }
};

const beforeDecimalCountOfNumber = (text: string) => {
    const str = text.toString().replace(/,/g, '.').replace(/-/g, '');
    if (str.includes('.')) {
        return str.length - decimalCountOfNumber(str) - 1;
    } else {
        return str.length - decimalCountOfNumber(str);
    }
};
