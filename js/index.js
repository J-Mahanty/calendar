//Default dates 
let localTime = new Date();
let currentDate = localTime.getDate();
let currentMonth = localTime.getMonth();
let currentYear = localTime.getFullYear();

//Arrays to hold the constants
const monthList = ["January","February","March","April","May","June","July","August","September","October","November","December"]; //list of all months
const tableMonth =  document.querySelectorAll("td"); //the table
const monthThirty = [3,5,8,10]; //list of 30 day months as indices


//Set the defaults to be displayed
document.querySelector("h1.month-name").textContent = monthList[currentMonth]; 

//document.querySelector("h2.show-year").textContent = currentYear ;

//Shortcut to the first date
function todayView(){

    if((currentMonth<9)&&(currentDate<10)){
        document.querySelector("h2.shortcut").textContent = `0${currentDate}.0${(currentMonth+1)}.${(currentYear)%100}`;
    } else if(currentMonth<9){
        document.querySelector("h2.shortcut").textContent = `${currentDate}.0${(currentMonth+1)}.${(currentYear)%100}`;
    } else if(currentDate<10){
        document.querySelector("h2.shortcut").textContent = `0${currentDate}.${(currentMonth+1)}.${(currentYear)%100}`;
    } else {
        document.querySelector("h2.shortcut").textContent = `${currentDate}.${(currentMonth+1)}.${(currentYear)%100}`;
    }

    document.querySelector("h2.shortcut").addEventListener("click", function(){
        currentDate = localTime.getDate();
        currentMonth = localTime.getMonth();
        currentYear = localTime.getFullYear();

        monthView(); //load dates again
        document.querySelector("h1.month-name").textContent = monthList[currentMonth]; 
        //document.querySelector("h2.show-year").textContent = currentYear ;
    });
}

//Empty the calender
function dateFlush(){
    for (var i=0 ; i<tableMonth.length ; i++){
        tableMonth[i].textContent = null;
    }
}

//Navigation Bar Handler
function monthToggle(){

    currentMonth = monthList.indexOf(document.querySelector("h1.month-name").textContent); // taking month from the html so there is no scope of error

    function nextMonth(){
        document.querySelector("img.right-arrow-month").addEventListener("click", function(){
        dateFlush(); //Delte all existing dates

            if(currentMonth>10){
                currentMonth = 0;
                currentYear++;
                //document.querySelector("h2.show-year").textContent = currentYear ;
            } else {
                currentMonth++;
            }

            document.querySelector("h1.month-name").textContent = monthList[currentMonth];
            

            monthView(); //load the dates again when button clicked


        });
    }

    function lastMonth(){
        document.querySelector("img.left-arrow-month").addEventListener("click", function(){
        dateFlush(); //Delete all existing dates

        if(currentMonth<=0){
            currentMonth = 11;
            currentYear--;
            //document.querySelector("h2.show-year").textContent = currentYear ;
        } else {
            currentMonth--;
        }

        document.querySelector("h1.month-name").textContent = monthList[currentMonth];
        monthView(); //load the dates again when button clicked
        });
    }

    function showYear(){
        let dateDropdown = document.getElementById('date-dropdown');    
        let earliestYear = currentYear-50;
        let latestYear = currentYear+50;    
        while (latestYear >= earliestYear) {      
            let dateOption = document.createElement('option');          
            dateOption.text = latestYear;      
            dateOption.value = latestYear;        
            dateDropdown.add(dateOption);      
            latestYear -= 1;    
        }
    }

    nextMonth();
    lastMonth();
    showYear();
    
    //document.querySelector("h2.show-year").textContent = currentYear ;
}

//Dates Handler
function monthView(){
    
    let firstDay = new Date(currentYear, currentMonth, 1);
    let weekday = firstDay.getDay();

    function setCurrentDate(){
        for (var i=weekday+1 ; i<tableMonth.length ; i++){
            if((i==(currentDate-weekday-1))&&(currentMonth==localTime.getMonth())&&(currentYear==localTime.getFullYear())){
                tableMonth[i].classList.add("today");
            } else {
                tableMonth[i].classList.remove("today");
            }
        }
    }

    function loadDates() {

        let num = 1;
        tableMonth[weekday].textContent = num;

        for (var i=weekday+1 ; i<tableMonth.length ; i++){

            num++;

            if((currentMonth==1)&&(currentYear%4==0)&&(num>29)) { //leap year february - 29 days
                break;
            } else if((currentMonth==1)&&(currentYear%4!=0)&&(num>28)){ //non-leap year february - 28 days 
                break;
            } else if((monthThirty.indexOf(currentMonth) != -1)&&(num>30)){ // April, June, September , November - 30 days
                break;
            } else if(num>31) { //all other months - 31 days
                break;
            }

            tableMonth[i].textContent = num;

        }

        if((monthThirty.indexOf(currentMonth) != -1)&&(num<30)){ //If all the dates do not fit in one screen for the 30 days a month
            for(var i=0;i<tableMonth.length;i++){
                num++;
                tableMonth[i].textContent = num;
                if(num>=30){
                    break;
                } 
            }
        } else if((currentMonth!=1)&&(num<31)){ // If the 31-days months do not fit in one screen
            for(var i=0;i<tableMonth.length;i++){
                num++;
                tableMonth[i].textContent = num;
                if(num>=31){
                    break;
                }
            }
        }
    }

    setCurrentDate();
    loadDates();
}   

//Page load
monthView();
monthToggle();
todayView();
