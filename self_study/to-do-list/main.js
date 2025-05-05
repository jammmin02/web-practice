// 사용자가 입력하는 텍스트 입력창
const todoInputElem = document.querySelector('.todo-input');
// 할 일 목록
const todoListElem = document.querySelector('.todo-list');

let todos = []; // 할 일들을 저장하는 배열
let id = 0; // 각 할일에 고유 id 부여하기 위한 숫자

// const 함수이름 = (매개변수) => {
  // 실행할 코드 }

// 기존 배열을 새로운 배열로 교체 
const setTodos = (newTodos) => {
    todos = newTodos; 
}

// 현재 배열을 가지고 옴
const getAllTodos = () => {
    return todos;
}

const appendTodos = (text) => {
    const newId = id++; // 매번 id를 하나씩 증가시켜 고유 아이디 부여
    // const newArray = oldArray.concat(다른배열또는값);
    // 배열을 합치는 함수 (기존 배열 변경X 새로운 배열 생성)
    const newTodos = getAllTodos().concat({
        id: newId,
        isCompleted: false,
        content: text
    });
    setTodos(newTodos); // 새로운 배열로 교체
    paintTodos();       // 화면에 다시 그리기
}

// 화면에 할 일 목록 그리기
const paintTodos = () => {
    todoListElem.innerHTML = ''; // 기존 목록 초기화
    const allTodos = getAllTodos();

    allTodos.forEach(todo => {
        // li 요소 생성
        const todoItemElem = document.createElement('li');
        todoItemElem.classList.add('todo-item'); 

        // 체크박스 역할 
        const checkboxElem = document.createElement('div');
        checkboxElem.classList.add('checkbox');

        // 실제 할 일 텍스트
        const todoElem = document.createElement('div');
        todoElem.classList.add('todo');
        todoElem.innerText = todo.content;

        // 삭제버튼
        const delBtnElem = document.createElement('button');
        delBtnElem.classList.add('delBtn');
        delBtnElem.innerText = 'X';
        
        // 체크 된 경우 처리
        if (todo.isCompleted) {
            todoItemElem.classList.add('checked');
            checkboxElem.innerText = '✔';
        }

        // 요소 적립
        todoItemElem.appendChild(checkboxElem);
        todoItemElem.appendChild(todoElem);
        todoItemElem.appendChild(delBtnElem);

        // 최종 목록에 추가
        todoListElem.appendChild(todoItemElem);
    });
}
// 초기화 함수: 입력창에 이벤트 추가
const init = () => {
    todoInputElem.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            appendTodos(e.target.value);
            todoInputElem.value = ''; // 입력창 초기화
        }
    });
}

 init();