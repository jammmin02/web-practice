// 사용자가 입력하는 텍스트 입력창
const todoInputElem = document.querySelector('.todo-input');
// 할 일 목록
const todoListElem = document.querySelector('.todo-list');
// 전체 완료 버튼 (complete-all-btn)
const completeAllBtnElem = document.querySelector('.complete-all-btn');
// 남아 있는 할 일 개수 표시 (Items left)
const leftItemsElem = document.querySelector('.left-items');
// 필터링 버튼 (All, Active, Completed)
const showAllBtnElem = document.querySelector('.show-all-btn');
const showActiveBtnElem = document.querySelector('.show-active-btn');
const showCompletedBtnElem = document.querySelector('.show-completed-btn');
// 완료된 할 일 모두 삭제 버튼 (Clear Completed)
const clearCompletedBtnElem = document.querySelector('.clear-completed-btn');

// const 함수이름 = (매개변수) => {
// 실행할 코드 }

let id = 0; // 각 할일에 고유 id 부여하기 위한 숫자
// setId : 외부에서 id를 갱신 할 때 사용하는 함수
const setId = (newId) => { id = newId; }; // id를 설정하는 함수

let isAllCompleted = false; // 전체 완료 상태를 저장하는 변수
const setIsAllcompleted = (bool) => { isAllCompleted = bool; }; // 전체 완료 상태를 설정하는 함수

let currentShowType = 'all'; // 현재 보여주는 필터링 상태 (all, active, completed)
const setCurrentShowType = (newShowType) => { currentShowType = newShowType; }; // 필터링 상태를 설정하는 함수

let todos = []; // 할 일들을 저장하는 배열
const setTodos = (newTodos) => { todos = newTodos; }; // 할 일 배열을 설정하는 함수

// 현재 배열을 가지고 옴
const getAllTodos = () => {
    return todos;
}

// 완료되지 않은 할 일만 반환
const getActiveTodos = () => {
    return todos.filter(todo => !todo.isCompleted);
}

// 완료된 할 일만 반환
const getCompletedTodos = () => {
    return todos.filter(todo => todo.isCompleted);
}

// 할 일 추가
const appendTodos = (text) => {
    const newId = id + 1; // id를 1 증가시킴
    setId(newId); // id를 설정하는 함수 호출
    // const newArray = oldArray.concat(다른배열또는값);
    // 배열을 합치는 함수 (기존 배열 변경X 새로운 배열 생성)
    const newTodos = getAllTodos().concat({
        id: newId, // id 부여
        isCompleted: false, // 완료 여부 (처음에는 false)
        content: text // 할 일 내용 (사용자 입력력)
    });
    setTodos(newTodos); // 새로운 배열로 교체
    setLeftItems(); // 남은 할 일 개수 업데이트
    checkIsAllCompleted(); // 전체 완료 상태 체크
    paintTodos(); // 화면에 다시 그리기
}

// 삭제버튼 클릭 시 해당 TODO 삭제
const deleteTodo = (todoId) => {
    const newTodos = getAllTodos().filter(todo => todo.id !== todoId); // id가 일치하지 않는 것만 남김
    setTodos(newTodos);
    setLeftItems(); // 남은 할 일 개수 업데이트
    paintTodos(); // 다시 그리기
}

// 체크박스 클릭 시 완료 상태 
//map: 배열의 각 요소에 대해 함수를 실행하고 새로운 배열을 반환
// 해당 id의 todo를 찾아서 isCompleted 상태를 반전시킴
// ... : 스프레드 연산자 -> 객체를 복사할 때 사용 (기존 내용을 복사하고 isCompleted만 변경)
const CompletedTodo = (todoId) => {
    const newTodos = getAllTodos().map(todo =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(newTodos);
    setLeftItems(); // 남은 할 일 개수 업데이트
    checkIsAllCompleted(); // 전체 완료 상태 체크
    paintTodos(); // 다시 그리기
}

// 전체 완료 버튼 클릭 시 모든 할 일을 완료 상태로 변경
const completeAll = () => {
    completeAllBtnElem.classList.add('checked'); // 버튼에 checked 클래스 추가
    const newTodos = getAllTodos().map(todo => ({ ...todo, isCompleted: true })); // 모든 todo를 완료 상태로 변경
    setTodos(newTodos); // 새로운 배열로 업데이트
}

// 전체 미완료 처리 함수
const incompleteAll = () => {
    completeAllBtnElem.classList.remove('checked'); // 버튼에서 checked 클래스 제거
    const newTodos = getAllTodos().map(todo => ({ ...todo, isCompleted: false })); // 모든 todo를 미완료 상태로 변경
    setTodos(newTodos); // 새로운 배열로 업데이트
}

// 전체가 완료됐는지 검사하는 함수
// getAllTodos().length : 전체 할 일 개수
// getCompletedTodos().length: 완료된 할 일 개수
// 두개가 같으면 모두 완료된 상태 -> 버튼 업데이트
const checkIsAllCompleted = () => {
    if (getAllTodos().length === getCompletedTodos().length) {
        setIsAllcompleted(true);
        completeAllBtnElem.classList.add('checked');
    } else {
        setIsAllcompleted(false);
        completeAllBtnElem.classList.remove('checked');
    }
}

// 버튼 클릭 시 토글 처리 함수
const onClickCompleteAll = () => {
    if (!getAllTodos().length) return; // 할 일이 하나도 없으면 종료
    if (isAllCompleted) incompleteAll(); // 현재 isAllCompleted 값에 따라 전체완료 & 전체 미완료 처리
    else completeAll();
    setIsAllcompleted(!isAllCompleted); // 값을 반대로 뒤집음
    paintTodos(); // 다시 랜더링
    setLeftItems(); // 남은 미완료 항목 수 갱신
}

// 남은 할 일 수 세기
const setLeftItems = () => {
    const leftTodos = getActiveTodos(); // 완료 되지 않은 할 일들만 가지고 옴
    // 요소에 해당값을 텍스트로 넣음
    // <div class="left-items">2 items left</div> => 할 일이 2개 있는것
    leftItemsElem.innerHTML = `${leftTodos.length} item left`;
}

// 할 일 수정 기능 (사용자가 할 일 더블클릭 시 텍스트가 수정가능상태로 바뀜)
// e: 더블 클릭 이벤트 객체
const onDbclickTodo = (e, todoId) => {
    const todoElem = e.target; // 더블 클릭한 HTML 요소
    const todoItemElem = todoElem.parentElement; // 부모 li 요소
    const inputText = e.target.innerText; // inputText: 현재 보이는 텍스트를 읽어옴 -> <div>안의 텍스트
    const inputElem = document.createElement('input'); // inputElem: 새로운 <input> 테그를 만듦

    inputElem.value = inputText; // value : 기존 텍스트를 그대로 채움
    inputElem.classList.add('edit-input'); // css 스타일을 위해 클래스를 붙힘

    inputElem.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') { // 사용자가 엔터를 누르면
            updateTodo(e.target.value, todoId); // updateTodo를 호출해 내용 변경
            document.body.removeEventListener('click', onClickBody); // 클릭이벤트 리스너 해제
        }
    });

    const onClickBody = (e) => {
        // 사용자가 다른곳을 클릭하면 입력창을 사라지게함
        if (e.target !== inputElem) {
            todoItemElem.removeChild(inputElem);
            document.body.removeEventListener('click', onClickBody);
        }
    }
    // document.body에 클릭이벤트 등록
    document.body.addEventListener('click', onClickBody);
    // input요소를 li에 추가
    todoItemElem.appendChild(inputElem);
}

// 수정 내용 반영
const updateTodo = (text, todoId) => {
    const currentTodos = getAllTodos();
    const newTodos = currentTodos.map(todo =>
        todo.id === todoId ? { ...todo, content: text } : todo
    );
    setTodos(newTodos);
    paintTodos();
}

// 완료된 할 일 일괄 삭제
const clearCompletedTodos = () => {
    const newTodos = getAllTodos().filter(todo => !todo.isCompleted);
    setTodos(newTodos);
    setLeftItems();
    paintTodos();
}

// 화면에 할 일 목록 그리기
const paintTodo = (todo) => {
    // li 요소 생성
    const todoItemElem = document.createElement('li');
    todoItemElem.classList.add('todo-item');
    todoItemElem.setAttribute('data-id', todo.id);

    // 체크박스 역할 (클릭하면 해당일을 완료/미완료로 바꿈)
    const checkboxElem = document.createElement('div');
    checkboxElem.classList.add('checkbox');
    checkboxElem.addEventListener('click', () => CompletedTodo(todo.id));

    // 실제 할 일 텍스트 (더블 클릭 시 수정 가능)
    const todoElem = document.createElement('div');
    todoElem.classList.add('todo');
    todoElem.addEventListener('dblclick', (event) => onDbclickTodo(event, todo.id));
    todoElem.innerText = todo.content;

    // 삭제버튼 (클릭하면 해당 할 일 삭제)
    const delBtnElem = document.createElement('button');
    delBtnElem.classList.add('delBtn');
    delBtnElem.addEventListener('click', () => deleteTodo(todo.id));
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
}

// 여러개 전체 그리기
const paintTodos = () => {
    // 매번 그리기 전에 기존 리스트 초기화
    todoListElem.innerHTML = '';

    switch (currentShowType) {
        case 'all':
            const allTodos = getAllTodos();
            allTodos.forEach(todo => { paintTodo(todo); });
            break;
        case 'active':
            const activeTodos = getActiveTodos();
            activeTodos.forEach(todo => { paintTodo(todo); });
            break;
        case 'completed':
            const completedTodos = getCompletedTodos();
            completedTodos.forEach(todo => { paintTodo(todo); });
            break;
    }
}

// 필터 버튼 클릭 이벤트
const onClickShowTodosType = (e) => {
    const newShowType = e.target.dataset.type;
    setCurrentShowType(newShowType);
    paintTodos();
}

// 초기화 함수: 입력창에 이벤트 추가
const init = () => {
    todoInputElem.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            appendTodos(e.target.value);
            todoInputElem.value = ''; // 입력창 초기화
        }
    });

    completeAllBtnElem.addEventListener('click', onClickCompleteAll);
    showAllBtnElem.addEventListener('click', onClickShowTodosType);
    showActiveBtnElem.addEventListener('click', onClickShowTodosType);
    showCompletedBtnElem.addEventListener('click', onClickShowTodosType);
    clearCompletedBtnElem.addEventListener('click', clearCompletedTodos);
}

init();
