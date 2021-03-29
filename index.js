

// fund raising progress bar

// set values

let fundRaised = 89914;
let goal = 100000;
let progressBarGoal = 100;
let backers = 5007;
const remainingDays = 56;



let progressBarFundRaised = (fundRaised * progressBarGoal) / goal;

document.querySelector(".fund-raised").innerHTML = "$" + fundRaised;
document.querySelector(".backers").innerHTML = backers;
document.querySelector(".remaining-days").innerHTML = remainingDays;
document.querySelector(".progress-fill").style.width = progressBarFundRaised+"%";

// REMAINING ITEMS

let remainingItems = [101,64,0];
let [bambooStock, blackStock, mahoganyStock]= remainingItems;

const bamboos = document.querySelectorAll(".bambooStock");
const darks = document.querySelectorAll(".blackStock");
const mahoganys = document.querySelectorAll(".mahoganyStock");

class Item {
    constructor (name, stock){
    this.name = name,
    this.stock = stock
    }
}


const bambooItem = new Item( "bamboo", bambooStock );
const blackItem = new Item("black", blackStock);
const mahoganyItem = new Item("mahogany", mahoganyStock);

const items = [bambooItem, blackItem, mahoganyItem];

function updateStock(){
    bamboos.forEach(function(item){
        item.innerHTML = bambooItem.stock;
    });
    
    darks.forEach(function(item){
        item.innerHTML = blackItem.stock;
    });
    
    mahoganys.forEach(function(item){
        item.innerHTML = mahoganyItem.stock;
    });
    
}

updateStock();

// open/close back pages


document.querySelector(".back-this-project").addEventListener("click", function(){
    document.querySelector("#back-popup").style.display = "block";
    document.querySelector("#overlay").style.display = "block";
});

function closePage(){
    document.querySelector("#back-popup").style.display = "none";
     document.querySelector("#overlay").style.display = "none";
}


// BOOKMARK BUTTON 
var click = false;

document.querySelector(".bookmark").addEventListener("click", function(){
   
   console.log(click);
   
    if (click === false){
        document.querySelector(".bookmark-icon").style.fill = "hsl(176, 50%, 47%)";
    document.querySelector(".path").style.fill = "#fff";
    document.querySelector(".bookmark-btn-text").style.backgroundColor= "hsl(176, 50%, 47%, 0.33)";
    document.querySelector(".bookmark-btn-text").style.color= "hsl(176, 72%, 28%)";
    document.querySelector(".bookmark-btn-text").innerHTML = "Bookmarked";
    return click = true;
} else if (click === true){
        document.querySelector(".bookmark-icon").style.fill = "#2F2F2F";
        document.querySelector(".path").style.fill = "#B1B1B1";
        document.querySelector(".bookmark-btn-text").style.backgroundColor= "hsl(0, 0%, 69%, 0.33)";
        document.querySelector(".bookmark-btn-text").style.color= "hsl(0, 0%, 48%)";
        document.querySelector(".bookmark-btn-text").innerHTML = "Bookmark";
        return click = false;
} 
});




var button = document.querySelectorAll(".back-btn");

// CHANGE COLOUR FUNCTION 
function changeColour(event){
    const checkboxes = document.querySelectorAll(".checkbox");
    const cards = document.querySelectorAll(".card");
    const selects = document.querySelectorAll(".select");
    
        cards.forEach(function(card){
            card.style.borderColor = "#B1B1B1";
        });
        selects.forEach(function(select){
            select.style.display = "none";
        })
        const path = event.target.parentElement.parentElement.parentElement;
        path.style.borderColor = "hsl(176, 50%, 47%)";
        if(path.querySelector(".select")){
            path.querySelector(".select").style.display = "flex";
        }
    }

// HAMBURGER STYLE BUTTON FUNCTION 

function changeHamburgerButton(x){
    x.classList.toggle("change");
    console.log
    // document.querySelector(".menu-item").style.display = "list-item";
    // document.querySelector(".menu-item").style.color = "black";
    // document.querySelector(".menu-background").style.display = "block";
    var menuBar = document.getElementById("my-menu");
    console.log(menuBar.className)
    if(menuBar.className === "menu"){
        menuBar.className += " responsive";
        
    } else {
        menuBar.className = "menu";
    }

}


// OUT OF STOCK ITEMS
function setOutOfStock(item){
    const itemNames = document.querySelectorAll("."+item.name);
    itemNames.forEach(function(itemName){
        itemName.querySelector(".back-btn").style.backgroundColor = "hsl(0, 0%, 69%)";
        itemName.querySelector(".back-btn").style.color = "hsl(0, 0%, 5%)";
        itemName.querySelector(".back-btn").innerHTML = "Out of Stock";
        itemName.querySelector(".back-btn").style.cursor = "not-allowed";
        itemName.querySelector(".back-btn").style.pointerEvents = "none";
        if(itemName.querySelector(".pledge-input")){
            itemName.querySelector(".pledge-input").disabled = true;
        }
    });
}



items.forEach(function(item){
    if(item.stock === 0){
        setOutOfStock(item)
    }
});


function switchToChecked(event){
    const checkbox = event.target.parentElement.parentElement.parentElement.parentElement.querySelector(".checkbox")
    checkbox.checked = true;
}

// MAKE A PLEDGE 


document.addEventListener("click", function(event){
    console.log(event)

    // if(event.target.matches("#hamburger-btn")){
    //     document.querySelector("li").style.display = "list-item";
    //     document.querySelector("li").style.color = "black";
    //     // document.querySelector(".menu-background").style.display = "block";
    // }

    if(event.target.matches(".pledge-btn")){
        var path = event.target.parentElement.parentElement.parentElement;
        let input = parseInt(path.querySelector(".pledge-input").value);
        fundRaised = fundRaised + input;
        backers += 1;
        items.forEach(function(item){
            if(item.name === path.className.slice(5, path.className.length)){
             return item.stock = item.stock - 1;
               
            }
        });
        updateStock();
        progressBarFundRaised = (fundRaised * progressBarGoal) / goal;
        if (progressBarFundRaised > progressBarGoal){
            progressBarFundRaised = progressBarGoal;
        }
        
        document.querySelector(".backers").innerHTML = backers;
        document.querySelector(".fund-raised").innerHTML = "$" + fundRaised;
        document.querySelector(".progress-fill").style.width = progressBarFundRaised+"%";
        document.querySelector("#back-popup").style.display = "none";
        document.querySelector("#thankyou").style.display = "block"; 
    }
    if(event.target.matches(".thankyou-btn")){
        document.querySelector("#thankyou").style.display = "none";
        document.querySelector("#overlay").style.display = "none";
    }

    if(event.target.matches(".reward")){
        document.querySelector("#back-popup").style.display = "block";
        document.querySelector("#overlay").style.display = "inline";
        const path = event.target.parentElement.parentElement.parentElement.className;
        const selector = path.slice(5, path.length);
        document.querySelector("#back-popup").querySelector("."+selector).querySelector(".checkbox").checked = true;
        document.querySelector("#back-popup").querySelector("."+selector).style.borderColor = "hsl(176, 50%, 47%)";
        if(document.querySelector("#back-popup").querySelector("."+selector).querySelector(".select")){
            document.querySelector("#back-popup").querySelector("."+selector).querySelector(".select").style.display = "flex";
        }
    }


    if(event.target.matches(".checkbox")){
        changeColour(event);
    }

   
});



