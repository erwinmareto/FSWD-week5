class User {
  constructor(name, age, allowance) {
    this._name = name;
    this._age = age;
    this._allowance = allowance;
  }

  get name() {
    return this._name;
  }

  get age() {
    return this._age;
  }

  get allowance() {
    return this._allowance;
  }
}

function showMessage(errorMessage, isError) {
  const div = document.getElementById("error-message");
  if (isError) {
    div.className = "container-fluid p-1 text-center bg-danger"
    // div.classList.add("bg-danger");
  } else {
    div.className = "container-fluid p-1 text-center bg-primary"
    // div.classList.add("bg-primary");
  }
  const message = document.createElement("p");
  message.id = "message-text";

  const messageText = document.createTextNode(errorMessage);
  message.appendChild(messageText);
  document.getElementById('message-text').replaceWith(message);
  // div.appendChild(message);
}

let dataList = [];

function registerUser() {
  const username = document.getElementById("username").value;
  const age = document.getElementById("age").value;
  const allowance = document.getElementById("allowance").value;

  const criteriaPromise = new Promise((resolve, reject) => {
    if (username.length < 10) {
      reject("nama minimal memiliki 10 karakter");
    } else if (age < 25) {
      reject("Umur terlalu rendah");
    } else if (allowance < 100000) {
      reject("Jumlah uang terlalu rendah");
    } else if (allowance > 1000000) {
      reject("Jumlah uang terlalu besar");
    } else {
      resolve("Registrasi berhasil!");
    }
  });

  criteriaPromise
    .then((result) => {
      dataList.push(new User(username, age, allowance));
      setTimeout(showMessage(result, false), 3000);
      
      showData();
    })
    .catch((error) => {
      showMessage(error, true);
    });

}

// let ageTotal = 0;
// let allowanceTotal = 0;
function showData() {
  const tableBody = document.getElementById("data-table");

    //Create element nodes
    const row = document.createElement("tr");
    const nameData = document.createElement("td");
    const ageData = document.createElement("td");
    const allowanceData = document.createElement("td");
    //Create text nodes for the elements
    let nameText = document.createTextNode(dataList[dataList.length - 1].name);
    let ageText = document.createTextNode(dataList[dataList.length - 1].age);
    let allowanceText = document.createTextNode(dataList[dataList.length - 1].allowance);

    //Append the texts to the elements
    nameData.appendChild(nameText);
    ageData.appendChild(ageText);
    allowanceData.appendChild(allowanceText);

    //Append the datas to the row
    row.appendChild(nameData);
    row.appendChild(ageData);
    row.appendChild(allowanceData);
    //append the row to the table body
    tableBody.appendChild(row);

    //for resume
    // ageTotal += Number(dataList[dataList.length - 1].age);
    // allowanceTotal += Number(dataList[dataList.length - 1].allowance);
}

function showResume(){
  let ageTotal = 0;
  let allowanceTotal = 0;

  let textSlot = document.createElement("th");
  let ageSlot = document.createElement("th");
  let allowanceSlot = document.createElement("th");

  //Calculate average using for loop
  for (let user in dataList){
    ageTotal += Number(dataList[user].age);
    allowanceTotal += Number(dataList[user].allowance);
  }

  let averageText = document.createTextNode("Rata-rata");
  let ageAverage = document.createTextNode(ageTotal / dataList.length);
  let allowanceAverage = document.createTextNode(allowanceTotal / dataList.length);

  textSlot.appendChild(averageText);
  ageSlot.appendChild(ageAverage);
  allowanceSlot.appendChild(allowanceAverage);
  
  let footText = document.getElementById("average-text");
  let ageFoot = document.getElementById("average-age");
  let allowanceFoot = document.getElementById("average-allowance");
  
  textSlot.id = 'average-text';
  ageSlot.id = 'average-age';
  allowanceSlot.id = 'average-allowance';

  footText.replaceWith(textSlot);
  ageFoot.replaceWith(ageSlot);
  allowanceFoot.replaceWith(allowanceSlot);
}
