/*
# This project is based on a public project but has been modified 
# according to the requirements of the IST 107 Course.
# Instructor: Washington Valencia
# Institution: CCTB College
*/

document.addEventListener("DOMContentLoaded", () => {
  // Array of colors for background change
  const colors = [
    "#F0E68C",
    "#FFDAB9",
    "#FFE4B5",
    "#D8BFD8",
    "#B0E0E6",
    "#AFEEEE",
    "#E0FFFF",
    "#98FB98",
    "#FFDEAD",
    "#F5DEB3",
  ];

  let index = 0;

  // Function to change background color with a gradient effect
  const changeBackgroundColor = () => {
    document.body.style.backgroundColor = colors[index];
    index = (index + 1) % colors.length; // Loop back to the start
  };

  // Change color every 2 seconds with a smooth transition
  setInterval(changeBackgroundColor, 2000);
});

let enterButton = document.getElementById("enter");
let askUserButton = document.getElementById("enterUser"); // add other button by new id

let input = document.getElementById("userInput");
let ul = document.querySelector("ul");
let item = document.getElementsByTagName("li");

let listDic = {}; // for recording tasks list

function inputLength() {
  return input.value.length;
}

function listLength() {
  return item.length;
}

function createListElement(inputValue = input.value) {
  inputValue = String(inputValue).toLowerCase().trim();
  let li = document.createElement("li"); // creates an element "li"
  //   li.appendChild(document.createTextNode(input.value)); //makes text from input field the li text
  li.appendChild(document.createTextNode(inputValue));
  ul.appendChild(li); //adds li to ul
  input.value = ""; //Reset text input field

  //START STRIKETHROUGH
  // because it's in the function, it only adds it for new items
  function crossOut() {
    li.classList.toggle("done");
  }

  li.addEventListener("click", crossOut);
  //END STRIKETHROUGH

  // START ADD DELETE BUTTON
  let dBtn = document.createElement("button");
  dBtn.appendChild(document.createTextNode("X"));
  dBtn.addEventListener("click", deleteLi); //  add delete function
  li.appendChild(dBtn);
  listDic[inputValue] = inputValue; // add task to list
}

function addListAfterClick() {
  if (inputLength() > 0) {
    //makes sure that an empty input field doesn't create a li
    if (IsInvalidInputValue()) {
      return;
    } else {
      createListElement();
    }
  }
}

function addListAfterKeypress(event) {
  if (inputLength() > 0 && event.which === 13) {
    //this now looks to see if you hit "enter"/"return"
    //the 13 is the enter key's keycode, this could also be display by event.keyCode === 13
    if (IsInvalidInputValue()) {
      return;
    } else {
      createListElement();
    }
  }
}

// ask user for input task
function askUser() {
  let task = prompt("What task would you like to add?");
  while (task != null) {
    if (isInvalidAskUserInput(task)) {
      // do nothing and wait for next input
    } else {
      task = String(task).toLocaleLowerCase().trim();

      createListElement(task);

      alert(`${task} added successfully!!`);
    }

    task = prompt(`What else task would you like to add?`);
  }
}

// check prompt input is invalid and jump alert
function isInvalidAskUserInput(task) {
  if (String(task).length == 0) {
    alert("No input, Please re-enter a task.");
    return true;
  }
  if (hasSameTask(String(task).toLocaleLowerCase().trim())) {
    alert("Already has same task, Please re-enter a task.");
    return true;
  }
  return false;
}

// check if task is already in the list
function hasSameTask(taskStr) {
  if (taskStr in listDic) {
    return true;
  } else {
    return false;
  }
}

// remove li element
function deleteLi(event) {
  let btn = event.target;
  let liTmp = btn.parentElement;
  let ulTmp = liTmp.parentElement;
  let liText = String(liTmp.textContent).slice(0, -1);
  ulTmp.removeChild(liTmp);
  delete listDic[liText];
}

function inputIsEmpty() {
  //   console.log("check in");
  if (String(input.value).trim().length == 0) {
    return true;
  }
  //   console.log("aaaaaggagagg");
  return false;
}

// combine check invalid conditions for input box
function IsInvalidInputValue() {
  //   console.log(" .  IsInvalidInputValue");
  if (inputIsEmpty()) {
    console.log("inputIsEmpty");
    input.value = "";
    return true;
  }
  if (hasSameTask(String(input.value).toLowerCase().trim())) {
    alert("Already has same task. pls re-enter a task.");
    input.value = "";
    return true;
  }
  return false;
}

enterButton.addEventListener("click", addListAfterClick);
askUserButton.addEventListener("click", askUser); // add other function
input.addEventListener("keypress", addListAfterKeypress);
