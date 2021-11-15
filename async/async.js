// async && await
// clear style of using promise :)

// 1. async
async function fetchUser(){
    // return new Promise((resolve, reject) => {
    //     // do network request in 10 secs...
    //     resolve('lina');
    // });
    return 'lina';    
    // async라는 키워드를 쓰면 promise와 동일한 결과값이 출력된다.
    // 원래는 async없이 return 'lina';를 하면 
    // pending상태에 값은 없게 나옴.
}

const user = fetchUser();
user.then(console.log);
console.log(user);

// 2. await
// async함수 안에서만 쓸 수 있음
function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple(){
    await delay(2000);
    // 3초를 기다려 줬다가 사과가 리턴
    return '🍎';
}

async function getBanana(){
    await delay(1000);
    return '🍌';
}

// promise 함수로 했을 때 
// function getBanana(){
//     return delay(3000)
//     .then(() => '🍌');
// }


// async function pickFruits(){
//     const apple = await getApple();
//     const banana = await getBanana();
//     return `${apple} + ${banana}`;
//     // 근데 이렇게 하면 사과1초 + 바나나1초여서 2초를 기다려야함
//     // 두개는 다른거기 때문에 같이 1초에 뜨게하려면??
// }


async function pickFruits(){
    const applePromise = getApple();
    const bananaPromise = getBanana();
    const apple = await applePromise;
    const banana = await bananaPromise;
    return `${apple} + ${banana}`;
    // 이렇게 하면 병렬적으로 1초만에 실행이 됨.
}

pickFruits().then(console.log);


// promise로 받아올 때
// function pickFruits(){
//     return getApple().then(apple => {
//         return getBanana().then(banana => `${apple} + ${banana}`);
//     });
// }

// pickFruits().then(console.log);


// 근데 저렇게 안씀!
// 3. useful Promise APIs
function pickAllFruits(){
    return Promise.all([getApple(), getBanana()])
    // 배열로 묶어서
    .then(fruits => fruits.join(' + '));
    // join을 사용해서
}
pickAllFruits().then(console.log);


// * 가장 먼저 값을 리턴하는 애만 출력해보자
// 사과가 2초 , 바나나가 1초라고 했을 때
// .race 를 사용해서
function pickOnlyOne(){
    return Promise.race([getApple(), getBanana()]);
}
pickOnlyOne().then(console.log);
