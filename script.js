// עדכון התצוגה של התאריך והשעה כל שנייה
setInterval(updateDateTime, 1000);

// פונקציה לעדכון התאריך והשעה במסך
function updateDateTime() {
  let now = new Date(); // יצירת אובייקט תאריך חדש לקבלת התאריך והשעה הנוכחיים

  // עדכון התצוגה של התאריך
  let currentDate = document.getElementById("currentDate"); // מציאת אלמנט התאריך במסך
  currentDate.innerHTML = now.toLocaleDateString(); // עדכון התאריך במסך לתאריך הנוכחי

  // עדכון התצוגה של השעה
  let currentTime = document.getElementById("currentTime"); // מציאת אלמנט השעה במסך
  currentTime.innerHTML = now.toLocaleTimeString(); // עדכון השעה במסך לשעה הנוכחית
}

// פונקציה להוספת משימה חדשה
function addTodo() {
  // קבלת הערך של שדה הקלט
  let todoInput = document.getElementById("todoInput").value; // מציאת אלמנט
  // קבלת התאריך והשעה הנוכחיים
  let now = new Date(); // יצירת אובייקט תאריך חדש לקבלת התאריך והשעה הנוכחיים
  let date = now.toLocaleDateString(); // שמירת התאריך הנוכחי במשתנה date
  let time = now.toLocaleTimeString(); // שמירת השעה הנוכחי במשתנה time

  let selectedDate = document.getElementById("date").value; // מציאת אלמנט שדה התאריך במסך ושמירת הערך שלו
  let selectedTime = document.getElementById("time").value; // מציאת אלמנט שדה השעה במסך ושמירת הערך שלו

  // הוספת המשימה החדשה לרשימת המשימות
  addTodoLi(todoInput, selectedDate || date, selectedTime || time); // קריאה לפונקציית addTodoLi עם הערך של שדה הקלט, התאריך שנבחר או התאריך הנוכחי והשעה הנוכחית
  document.getElementById("date").value = ""; // מחיקת הערך של שדה התאריך
  document.getElementById("time").value = ""; // מחיקת הערך של שדה השעה
  // שמירת הרשימה המעודכנת של משימות ל- localStorage
  saveTodos(); // קריאה לפונקציית saveTodos לשמירת רשימת המשימות ב- localStorage

  // ניקוי שדה הקלט
  document.getElementById("todoInput").value = ""; // מחיקת הערך של שדה הקלט
}

// פונקציה ליצירת אלמנט li למשימה חדשה
function addTodoLi(todoText, date, time) {
  // יצירת פריט רשימה חדש
  let li = document.createElement("li"); // יצירת אלמנט li חדש
  li.setAttribute("data-date", date); // הוספת מאפיין data-date לאלמנט li עם הערך של התאריך
  li.setAttribute("data-time", time); // הוספת מאפיין data-time לאלמנט li עם הערך של השעה

  // יצירת אלמנט span לאחזור טקסט המשימה
  let span = document.createElement("span"); // יצירת אלמנט span חדש
  span.innerHTML = todoText; // הכנסת טקסט המשימה לתוך האלמנט span
  li.appendChild(span); // הוספת האלמנט span לתוך האלמנט li

  // יצירת אלמנטים להצגת התאריך והשעה
  let dateElement = document.createElement("div"); // יצירת אלמנט div חדש להצגת התאריך
  dateElement.innerHTML = date; // הכנסת התאריך לתוך האלמנט div
  li.appendChild(dateElement); // הוספת האלמנט div לתוך האלמנט li

  let timeElement = document.createElement("div"); // יצירת אלמנט div חדש להצגת השעה
  timeElement.innerHTML = time; // הכנסת השעה לתוך האלמנט div
  li.appendChild(timeElement); // הוספת האלמנט div לתוך האלמנט li

  // יצירת כפתור מחיקה
  let deleteButton = document.createElement("button"); // יצירת אלמנט button חדש למחיקת המשימה
  deleteButton.innerHTML = "❌"; // הכנסת טקסט "Delete" לתוך האלמנט button
  deleteButton.onclick = function () {
    // הוספת אירוע לחיצה לאלמנט button
    // מחיקת המשימה מרשימת המשימות
    li.remove(); // מחיקת האלמנט li מהמסך

    // שמירת הרשימה המעודכנת של משימות ל- localStorage
    saveTodos(); // קריאה לפונקציית saveTodos לשמירת רשימת המשימות ב- localStorage
  };
  li.appendChild(deleteButton); // הוספת האלמנט button לתוך האלמנט li

  // הוספת פריט הרשימה החדש לרשימת משימות
  let todoList = document.getElementById("todoList"); // מציאת אלמנט רשימת המשימות במסך
  todoList.appendChild(li); // הוספת האלמנט li לתוך אלמנט רשימת המשימות
}

function saveTodos() {
  let todoList = document.getElementById("todoList"); // מציאת אלמנט רשימת המשימות במסך
  let todos = []; // יצירת מערך ריק לשמירת רשימת המשימות
  for (let li of todoList.children) {
    // לולאה על כל אלמנטי ה- li שבתוך אלמנט רשימת המשימות
    todos.push({
      // הוספת אובייקט חדש למערך todos
      text: li.children[0].innerHTML, // שמירת הטקסט של המשימה בתוך האובייקט
      date: li.getAttribute("data-date"), // שמירת התאריך של המשימה בתוך האובייקט
      time: li.getAttribute("data-time"), // שמירת השעה של המשימה בתוך האובייקט
    });
  }
  localStorage.setItem("todos", JSON.stringify(todos)); // שמירת מערך todos ב- localStorage כאחרי המרה ל- JSON
}

// להוסיף את פונקציית loadTodos כאן
function loadTodos() {
  let todos = JSON.parse(localStorage.getItem("todos")); // קבלת מערך todos מ- localStorage אחרי המרה מ- JSON
  if (todos) {
    // בדיקה אם מערך todos קיים
    for (let todo of todos) {
      // לולאה על כל אובייקט במערך todos
      addTodoLi(todo.text, todo.date, todo.time); // קריאה לפונקציית addTodoLi עם הערכים של האובייקט: טקסט, תאריך ושעה
    }
  }
}

// לבצע את פונקציית loadTodos בעת טעינת הדף כאן
window.onload = loadTodos; // קריאה לפונקציית loadTodos בעת טעינת הדף
