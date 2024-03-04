function parseQueryString(queryString: string): { [key: string]: string } {
    const params: { [key: string]: string } = {};
    const queryStringWithoutQuestionMark = queryString.substring(1); // Remove o ponto de interrogação inicial
    const keyValuePairs = queryStringWithoutQuestionMark.split('&');
    for (const pair of keyValuePairs) {
        const [key, value] = pair.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    }
    return params;
}

export default parseQueryString
