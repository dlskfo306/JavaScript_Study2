'use strict';

// Promise is a JavaScript object for asynchronous operation.
// State : pending 상태였다가 성공하거나 실패?하면 -> fulfilled or rejected상태로 변경
// Producer vs Consumer

// 1. Producer
// 새로운 Promise가 만들어질때 executor라는 함수가 자동으로 바로 실행된다.
const promise = new Promise((resolve, reject) => {
    // network통신, 파일 읽기 등 무언가 무거운 일이 진행됨
    console.log('doing something...');
    setTimeout(() => {
        resolve('lina'); // 성공했을때
        //reject(new Error('no network')); // 실패했을때
    }, 2000);
});

// 2. Consumers : then, catch, finally로 값 받아올 수 있음
promise
    .then(value => {
        console.log(value);
        // (then은 성공했을때!)위에서 성공해서 resolve된 lina값이 value로 넘어와서 출력됨.
    })
    .catch(error => {
        console.log(error);
        // (catch는 에러나면) 에러가 더 이상 빨갛게 안나오고 걍 콘솔창에 뜨는거처럼 뜸
    })
    .finally(() => {
        console.log('finally');
        // 걍 성공 실패 상관없이 무조건 뜨는거라 인자 따로 없이 () => 로 콜백
    });

// 3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
});

fetchNumber
.then(num => num * 2) // 1=>2
.then(num => num * 3) // 2=>6
.then(num => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(num -1), 1000);
    }); // 6=>5
})
.then(num => console.log(num));

// 4. Error Handling (오류를 잘 처리하자)
// const getHen = () =>
//     new Promise((resolve, reject) => {
//         setTimeout(() => resolve('🐓'),1000);
//     });

// const getEgg = hen => 
//     new Promise((resolve, reject) => {
//         setTimeout(() => resolve(`${hen} => 🥚`),1000);
//     });
// const cook = egg =>
//     new Promise((resolve, reject) => {
//         setTimeout(() => resolve(`${egg} => 🍳`),1000);
//     });


// getHen()
// .then(hen => getEgg(hen))
// .then(egg => cook(egg))
// .then(meal => console.log(meal));

// 🐓 => 🥚 => 🍳
// 위에껄 좀 이쁘게 만들자면
// 한가지만 받아서 계속 전달하는 거는 생략가능함

// getHen()  
//     .then(getEgg)
//     .then(cook)
//     .then(console.log);


// 근데 달걀을 받아오다가 에러가 난다면?
const getHen = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('🐓'),1000);
    });

const getEgg = hen => 
    new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error(`error! ${hen} => 🥚`)),1000);
    });
const cook = egg =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${egg} => 🍳`),1000);
    });

getHen()  
    .then(getEgg)
    .catch(error => {
        return '🍞';
    }) // 에러를 catch로 바로바로 해결해주기
    .then(cook)
    .then(console.log)
    .catch(console.log);