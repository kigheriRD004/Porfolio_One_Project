

// console.log("hello");

// ------------------------------------Toggle Style Switcher ----------------------------

const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click", () =>{
    // console.log("Hello Everyone");

    document.querySelector(".style-switcher").classList.toggle("open");
})


// Hide Style -Switcher on scroll
window.addEventListener("scroll", () =>{
    // console.log("Hi");

    if(document.querySelector(".style-switcher").classList.contains("open")){
        document.querySelector(".style-switcher").classList.remove("open");
    }
})


//------------------------------- Theme COlors ---------------------------------


const alternateStyles = document.querySelectorAll(".alternate-style");
// console.log(alternateStyles);

function setActiveStyle(color){
    // console.log(color);

    localStorage.setItem("color", color);
    changeColor();
}

function changeColor(){
    alternateStyles.forEach((style) =>{
        // console.log(style);

        if (localStorage.getItem("color") === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        } else {
            style.setAttribute("disabled", "true");
        }
    })
}

// Cheking if 'color' key exists
if (localStorage.getItem("color") !== null) {
    changeColor();
}


//-------------------------------- Theme light and dark mode ----------------------------------


const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () =>{
    // console.log("Hello Event");

    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme", "dark");
    }
    else{
        localStorage.setItem("theme", "light");
    }
    updateIcon();
})

function themeMode(){
    // Cheking if 'theme' key exists
    if(localStorage.getItem("theme") !== null){
        if(localStorage.getItem("theme") === "light"){
            document.body.classList.remove("dark");
        }
        else{
            document.body.classList.add("dark");
        }
    }
    updateIcon();
}
themeMode();

function updateIcon(){
    if(document.body.classList.contains("dark")){
        dayNight.querySelector("i").classList.remove("fa-moon");
        dayNight.querySelector("i").classList.add("fa-sun");
    }
    else{
        dayNight.querySelector("i").classList.remove("fa-sun");
        dayNight.querySelector("i").classList.add("fa-moon");
    }
}

// window.addEventListener("load", () =>{
//     if (document.body.classList.contains("dark")) {
//         dayNight.querySelector("i").classList.add("fa-sun");
//     } else {
//         dayNight.querySelector("i").classList.add("fa-moon");
//     }
// })