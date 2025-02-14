export const removeUndefinedField = (params: object) => {
    Object.keys(params).forEach((key) => {
        if (typeof params[key] === 'undefined') {
            delete params[key];
        }
    });
    return params;
};

export const convertPayloadToQueryString = (payload: object = {}) => {
    return Object.keys(payload)
        .map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]);
        })
        .join('&');
};

export const convertQueryStringToPayload = (json: string) => {
    const obj = {};

    json?.split('&')?.forEach(part => {
        const [key, ...values] = part?.split('=');
        obj[key] = values.join('=');
    });
    return obj;
};

export const validateEmail = (email: string) => {
    const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
};

export const validatePassword = (password: string) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return regex.test(password);
};

export const getHeader = (header, element, index, defaultVal = undefined) => {
    return header[element] ? header[element][index] : defaultVal;
};

export const getExtraPrefix = (deepLink: string) => {
    const indexOfPrefix = 'bammbo://'.length;
    const indexOfParams = deepLink.indexOf('?');
    return deepLink.slice(indexOfPrefix, indexOfParams);
};

export const getExtraParams = (deepLink: string) => {
    const indexOfParams = deepLink.indexOf('?');
    return deepLink.slice(indexOfParams + 1)
};
