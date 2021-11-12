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
    loginUser(id, password, onSuccess, onError){
        setTimeout(() => {
            if(
                (id === 'ellie' && password === 'dream') ||
                (id === 'coder' && password === 'academy')
            ) {
                onSuccess(id);
            } else {
                onError(new Error('not found'));
            }
        }, 2000);
    }

    getRoles(user, onSuccess, onError){
        setTimeout(() => {
            if(user === 'ellie'){
                onSuccess({ name: 'ellie', role: 'admin' });
            } else {
                onError(new Error('no access'));
            }
        }, 1000);

    }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your pw');
userStorage.loginUser(
    id, 
    password, 
    user => {
        userStorage.getRoles(
            user,
            userWithRole => {
                alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`);
            }, 
            error => {
                console.log(error);
            }
        );
    },
    error => { 
        console.log(error)
    }
);