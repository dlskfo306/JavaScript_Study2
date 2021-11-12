'use strict';


// hoisting : var, function declaration
console.log('1'); // 동기
setTimeout(() => console.log('2'), 1000); // 비동기
console.log('3'); // 동기

// 동기 콜백
function printImmediately (print){
    print();
}
printImmediately(() => console.log('hello')); // 동기

// 비동기 콜백
function printWithDelay(print, timeout){
    setTimeout(print, timeout);
}
printWithDelay(()=> console.log('async callback'), 2000); // 비동기

// 1
// 3
// hello
// 2 (1초뒤)
// async callback (2초뒤)

// Callback Hell example
// 1. id,password쳐서 2.login하고 3.Role확인해서 받아오고 4.사용자의 name,role을 출력

class UserStorage{
    loginUser(id, password){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(
                    (id === 'ellie' && password === 'dream') ||
                    (id === 'coder' && password === 'academy')
                ) {
                    resolve(id);
                } else {
                    reject(new Error('not found'));
                }
            }, 2000);
        });
    }

    getRoles(user){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(user === 'ellie'){
                    resolve({ name: 'ellie', role: 'admin' });
                } else {
                    reject(new Error('no access'));
                }
            }, 1000);
        });
    }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your pw');
userStorage
    .loginUser(id, password)
    .then(userStorage.getRoles)
    .then(user => alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`))
    .catch(console.log);
