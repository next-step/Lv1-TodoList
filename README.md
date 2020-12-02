# 🏴 첫번째 미션 - Todo List for Team!

## 🚀 기본 요구사항

- [X] todo list에 todoItem을 키보드로 입력하여 추가하기
- [X] todo list의 체크박스를 클릭하여 complete 상태로 변경. (li tag 에 completed class 추가, input 태그에 checked 속성 추가)
- [X] todo list의 x버튼을 이용해서 해당 엘리먼트를 삭제
- [X] todo list를 더블클릭했을 때 input 모드로 변경. (li tag 에 editing class 추가) 단 이때 수정을 완료하지 않은 상태에서 esc키를 누르면 수정되지 않은 채로 다시 view 모드로 복귀
- [X] todo list의 item갯수를 count한 갯수를 리스트의 하단에 보여주기
- [X] todo list의 상태값을 확인하여, 해야할 일과, 완료한 일을 클릭하면 해당 상태의 아이템만 보여주기

## 🚀🚀 심화 요구사항

- [X] localStorage에 데이터를 저장하여, TodoItem의 CRUD를 반영하기. 따라서 새로고침하여도 저장된 데이터를 확인할 수 있어야 함

## 수정 해야할 것

- [X] 할일을 추가할 때 제목이 없는 경우 추가 X
- [X] toggleComplete 메서드 분리
- [X] 누락된 edit input추가