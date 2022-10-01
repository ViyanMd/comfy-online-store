function request(path) {
    return fetch(path).then(data => data.json())
}