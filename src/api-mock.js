
var savedUsername = '';
var savedPassword = '';
export function register(username, password) {

    return new Promise((res, rej) => {
        setTimeout(() => {
            savedUsername = username;
            savedPassword = password;
            res();
        }, 2000)
    })
}
export function login(username, password) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if(username === savedUsername && password === savedPassword) {
                res();
            } else {
                rej("Invalid username or password");
            }
        }, 2000)
    })
}