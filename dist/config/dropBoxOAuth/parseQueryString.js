"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseQueryString(queryString) {
    const params = {};
    const queryStringWithoutQuestionMark = queryString.substring(1); // Remove o ponto de interrogação inicial
    const keyValuePairs = queryStringWithoutQuestionMark.split('&');
    for (const pair of keyValuePairs) {
        const [key, value] = pair.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    }
    return params;
}
exports.default = parseQueryString;
