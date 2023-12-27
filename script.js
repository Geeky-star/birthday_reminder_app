const birthdayList = document.querySelector(".birthday-list")
nameInput = document.querySelector(".name-input")
dateInput = document.querySelector(".date-input")
image = document.getElementById("image")
quote = document.querySelector("span")

let usersDetails = [];
let id = 0;

const today = new Date();
const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

const addReminder = () => {
    const userName = nameInput.value.trim();
    const date = dateInput.value;
    if(userName && date){
        const item = document.createElement("li")
        item.innerHTML = `
        <div id="${usersDetails.length}">
        ${userName} &nbsp; ${date}
        </div>
        <div>
        <button class="delete-btn">
        <i class="fa fa-trash"></i>
        </button>
        </div>
        `
        birthdayList.appendChild(item)
           
        usersDetails.push({id: id, name:userName,date:date})
        id++;
    
        image.style.display = "none";
        quote.style.display = "none"
    
        item.querySelector(".delete-btn").addEventListener("click",()=>{
           birthdayList.removeChild(item);
           let userToBeDeleted = item.querySelector("div").id
           usersDetails = usersDetails.filter((User)=> User.id != userToBeDeleted)
        })

        if(date==formattedDate){
            checkAndTriggerAlarms();
        }

        nameInput.value=""
        dateInput.value=""
    }
    else{
        window.alert("Fill both name and Birthday date to set Reminder!")
    }
}

function showAlertNotification(users) {
    alert(`Reminder: It's ${users}'s birthday today! 🎉`);
}

function checkAndTriggerAlerts() {
    let todaysBirthdays = [];
    for (const user of usersDetails) {
      if (user.date === formattedDate) {
        todaysBirthdays.push(user.name)
      }
    }
    if(todaysBirthdays.length>0){
        showAlertNotification(todaysBirthdays);
        clearInterval(intervalId)
    }
  }

let intervalId = setInterval(checkAndTriggerAlerts, 1000);
