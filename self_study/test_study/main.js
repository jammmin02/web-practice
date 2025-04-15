// // String (문자)
// // 따옴표 사용
// let myName = '김민수';
// let email = 'naver';
// let hello = `hello ${myName}?!`

// console.log(myName);
// console.log(email);
// console.log(hello);

// // Number (숫자)
// let number = 123;
// let opacity = 1.57;

// console.log(number);
// console.log(opacity);

// // Boolean (참과 거짓)
// let checked = true;
// let isShow = false;

// console.log(checked);
// console.log(isShow);

// // Undefined (값이 할당되지 않았을 때)

// let undef; // let undef = undefined; 와 같음
// let obj = { abc: 123 };

// console.log(undef);
// console.log(obj.abc);
// console.log(obj.xyz);

// // Null (값이 의도적으로 비어있다)
// let empty = null;

// console.log(empty);

// // Object (객체, 여러 데이터를 Key:Value 형태로 저장 {})
// let user =
// {
//     name: '김민수',
//     age: 85,
//     isValid: true
// };

// console.log(user.name);
// console.log(user.age);
// console.log(user.isValid);


// // Array (배열, 여러 데이터를 순차적으로 저장 [])
// let fruits = ['Apple', 'Banana', 'Cherry'];

// console.log(fruits[0]);
// console.log(fruits[1]);
// console.log(fruits[2]);

// // let
// // 변수 재선언 불가능
// // 변수 재사용 가능
// // 재할당 가능

// let a = 123;
// // let a = 321; // 에러
// a = 321; // 가능

// //const
// // 변수 재선언 불가능
// // 변수 재사용 불가능
// // 재할당 불가능

// // 함수 (일부코드의 집합)
// function helloFunc()
// {
//     // 실행코드
//     console.log(123);
// }

// // 함수 호출
// helloFunc();

// // 함수의 반환
// function returnFunc()
// {
//     // 반환환
//     return 456;
// }

// // 함수 호출
// let b = returnFunc();
// console.log(b);

// // 함수 선언
// // a , b 는 매개변수
// function sum(a, b)
// {
//     return a + b;
// }

// // 재사용 
// // c, d, e 는 인자
// let c = sum(1, 2);
// let d = sum(7, 12);
// let e = sum(2, 4);

// console.log(c, d, e);

// // 가명함수(이름이 있는 함수)
// // 함수 선언
// function hello1()
// {
//     console.log('hello');
// }

// // 익명함수(이름이 없는 함수)
// // 함수 표현
// let world = function ()
// {
//     console.log('world');
// }

// hello1();
// world();

// // // 객체 데이터
// // const dog =
// // {
// //     sound: '멍멍',

// //     // 메소드 
// //     getSound: function ()
// //     {
// //         return this.sound;
// //     }
// // };

// // const puppy = dog.getName();
// // console.log(puppy);
// // console.log(dog.getName());

// // 조건문 (if, else if, else)
// let isShow1 = true;
// let checked1 = false;

// if (isShow1) {
//     console.log('Show!');
// }
// if (checked1) {
//     console.log('Checked!');
// }

// // HTML 요소 1개 검색/칮기
// let boxEl = document.querySelector('.box');

// // HTML 요소에 적용할 수 있는 메소드
// boxEl.addEventListener();

// // 인수 추가 가능
// boxEl.addEventListener(1, 2);

// // 첫번째 인수: 이벤트
// boxEl.addEventListener('click', 2);

// // 두번째 인수: 핸들러
// boxEl.addEventListener('click', function () {
//     console.log('Click!');
// });

// let boxEl = document.querySelector('.box');
// console.log(boxEl);

// boxEl.addEventListener('click', function () {
//     console.log('Click!');
//     boxEl.classList.add('active');
//     console.log(
//         boxEl.classList.contains('active')
//     );
//     boxEl.classList.remove('active');
//     console.log(
//         boxEl.classList.contains('active')
//     );
// });


// // 요소의 클래스 정보 객체 활용
// boxEl.classList.add('active');
// let isContains = boxEl.classList.contains('active');
// console.log(isContains); // true

// boxEl.classList.remove('active');
// isContains = boxEl.classList.contains('active');
// console.log(isContains); // false

// HTML 요소 모두 검색/찾기
const boxEls = document.querySelectorAll('.box');
console.log(boxEls);

// 찾은 요소들 반복해서 함수 실행
// 익명 함수를 인수로 추가
// 첫번째 매개변수(boxEl): 반복 중인 요소
// 두번째 매개변수(index): 반복 중인 번호
// 출력
// forEach : 반복문
// boxEl : 반복 중인 요소
// index : 반복 중인 번호
boxEls.forEach(function (boxEl, index) {
  boxEl.classList.add(`order-${index + 1}`);
  console.log(index, boxEl);
});

const boxEl = document.querySelector('.box');

// Getter : 값을 얻는 용도
// textContent : boxEl의 글자
console.log(boxEl.textContent);

// Setter : 값을 지정하는 용도
// boxEl의 글자를 'Hello!'로 지정
boxEl.textContent = 'Hello!';
console.log(boxEl.textContent);

const a = 'Hello!';
// split : 문자를 나누어 배열로 반환
// reverse : 배열을 뒤집기
// join : 배열을 합쳐 문자로 반환

const b = a.split('').reverse().join(''); // 메소드 체이닝
console.log(b);