

// ------------------------------ Navigation Meenu -------------------------------------------

(() =>{

    const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);

    function showNavMenu(){
        navMenu.classList.add("open");
        bodyScrollingToggle();
    }

    function hideNavMenu(){
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrollingToggle();
    }

    function fadeOutEffect(){
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() =>{
            document.querySelector(".fade-out-effect").classList.remove("active");
        }, 300)
    }

    // ATTACH AN EVENT HANDLER TO DOCUMENT
    document.addEventListener("click", (event) =>{
        // console.log(event.target);
        if (event.target.classList.contains('link-item')){
            // console.log("event.target contains 'link-item' class");
            // console.log(event.target.hash);

            // MAKE SURE EVENT.TARGET.HASH HAS A VALUE BEFORE OVERRIDDING DEFAULT BEHAVIOR
            if(event.target.hash !==""){
                // PREVENT DEFAULT ANCHOR CLICK  BEHAVIOR
                event.preventDefault();
                const hash = event.target.hash;
                // console.log(hash);

                // DESACTIVATE EXISTING ACTIVE 'SECTION'
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                
                // ACTIVATE NEW 'SECTION'
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");

                // DESACTIVATE EXISTING ACTIVE NAVIGATION MENU 'link-item'
                navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active","inner-shadow");


                // IF CLICKED 'link-item' IS CONTAINED WITHIN THE NAVIGATION NEMU
                if(navMenu.classList.contains("open")){
                    // ACTIVATE NEW NAVIGATION MENU 'link-item'
                    event.target.classList.add("active","inner-shadow");
                    event.target.classList.remove("outer-shadow","hover-in-shadow");

                    // HIDE NAVIGATION MENU
                    hideNavMenu();
                    // console.log("CLICKED 'link-item' IS CONTAINED WITHIN THE NAVIGATION NEMU");
                }
                else{
                    // console.log("CLICKED 'link-item' IS NOT CONTAINED WITHIN THE NAVIGATION NEMU");
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item) =>{
                        if(hash === item.hash){
                            // ACTIVATE NEW NAVIGATION MENU 'link-item'
                            item.classList.add("active","inner-shadow");
                            item.classList.remove("outer-shadow","hover-in-shadow");
                        }
                    })
                    fadeOutEffect();
                }
                // ADD hash (#) To URL
                window.location.hash = hash;
            }
        }

    })


})();












// ---------------------------About Section tabs------------------------------------

(() =>{
        const aboutSection = document.querySelector(".about-section"),
        tabsContainer = document.querySelector(".about-tabs");

        tabsContainer.addEventListener("click", (event) =>{
            // console.log(event.target);
            // if event.target contains 'tab-item' class and not contains 'active' class
            if(event.target.classList.contains("tab-item") &&
            !event.target.classList.contains("active")){
                // console.log("event.target contains 'tab-item' class and not contains 'active' class");
                // console.log(event.target);
                const target = event.target.getAttribute("data-target");
                // console.log(target);

                // desactivate existing active 'tab-item'
                tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
                // activate new 'tab-item'
                event.target.classList.add("active","outer-shadow");
                // desactivate existing active 'tab-content'
                aboutSection.querySelector(".tab-content.active").classList.remove("active");
                // activate new 'tab-content'
                aboutSection.querySelector(target).classList.add("active");
            }
        })

})();

function bodyScrollingToggle(){
    document.body.classList.toggle("hidden-scrolling");
}


//-----------------------portfolio filter and popup------------------------------

(() =>{

    const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    // console.log(portfolioItems)
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    // filter portfolio items
    filterContainer.addEventListener("click", (event)=>{
        // console.log(event.target);
        if(event.target.classList.contains("filter-item") &&
        !event.target.classList.contains("active")){
            // console.log("true");

            // DESACTIVATE EXITING ACTIVE 'filter-item'
            filterContainer.querySelector(".active").classList.remove("outer-shadow","active");
            // ACTIVATE NEW 'filter-item'
            event.target.classList.add("active", "outer-shadow");
            const target = event.target.getAttribute("data-target");
            // console.log(target);
            portfolioItems.forEach((item) =>{
                // console.log(item)
                // console.log(item.getAttribute("data-category"));
                if(target === item.getAttribute("data-category") || target === 'all'){
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else{
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
        // else{
        //     console.log("false");
        // }
        // console.log(event.target);
    })

    portfolioItemsContainer.addEventListener("click", (event) =>{
        // console.log(event.target)
        // console.log(event.target.closest(".portfolio-item-inner"))
        if(event.target.closest(".portfolio-item-inner")){
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            // console.log(portfolioItem);
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            // console.log(itemIndex);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            // console.log(screenshots)
            
            // CONVERT SCREENSHOTS INTO ARRAY
            screenshots = screenshots.split(",");
            if (screenshots.length === 1) {
                prevBtn.style.display="none";
                nextBtn.style.display="none";
            } else {
                prevBtn.style.display="block";
                nextBtn.style.display="block";
            }
        
            // console.log(screenshots);
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    })

    closeBtn.addEventListener("click", () =>{
        popupToggle();
        if(projectDetailsContainer.classList.contains("active")){
            popupDetailsToggle();
        }
    })

    function popupToggle(){
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function popupSlideshow(){
        // console.log("hello");
        const imgSrc = screenshots[slideIndex];
        // console.log(imgSrc);
        const popupImg = popup.querySelector(".pp-img");
        // ACTIVATE LOADER UNTIL THE POPUPIMG LOADED
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () =>{
            // DESACTIVATE LOADER AFTER THE POPUPIMG LOADER
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " of " + screenshots.length;
    }

    // NEXT SLIDE
    nextBtn.addEventListener("click",() =>{
        if(slideIndex === screenshots.length-1){
            slideIndex = 0;
        }
        else{
            slideIndex++;
        }
        popupSlideshow();
        // console.log("slideINdex:" + slideIndex);
    })

    // PREV SLIDE
    prevBtn.addEventListener("click", () =>{
        if (slideIndex === 0) {
            slideIndex = screenshots.length-1;
        }
        else {
            slideIndex--;
        }
        popupSlideshow();
        // console.log("slideINdex:" + slideIndex);
    })

    function popupDetails(){
        // IF PORTFOLIO ITEM DETAILS NOT EXISTS
        if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
            projectDetailsBtn.style.display="none";
            return;
            // END FUNCTION EXECUTION
        }
        projectDetailsBtn.style.display="block";
        // GET THE PROJECT DETAILS
        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        // SET THE PROJECT DETAILS
        popup.querySelector(".pp-project-details").innerHTML = details;
        // GET THE PROJECT TITLE
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;

        // console.log(title);
        // SET THE PROJECT TITLE
        popup.querySelector(".pp-title h2").innerHTML = title;
        // GET THE PROJECT CATEGORY
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        // console.log(category);
        // SET THE PROJECT CATEGORY
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
    }   

    projectDetailsBtn.addEventListener("click", () =>{
        popupDetailsToggle();
    })

    function popupDetailsToggle(){
        // console.log("hello");
        if (projectDetailsContainer.classList.contains("active")){
            // console.log("true");
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
        projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
        }else {
        //  console.log("false");
        projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
        projectDetailsBtn.querySelector("i").classList.add("fa-minus");
         projectDetailsContainer.classList.add("active");
         projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
         popup.scrollTo(0,projectDetailsContainer.offsetTop);
        }
    }

})();


// ------------------------------ Testimonail Slider--------------------------------------------------

(() =>{

    // console.log("Hello");
    const sliderContainer = document.querySelector(".testi-slider-container"),
    slides = sliderContainer.querySelectorAll(".testi-item"),
    // console.log(slides);
    slideWidth = sliderContainer.offsetWidth,
    // console.log(slideWidth);
    prevBtn = document.querySelector(".testi-slider-nav .prev"),
    nextBtn = document.querySelector(".testi-slider-nav .next"),
    activeSlide = sliderContainer.querySelector(".testi-item.active");
    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);
    // console.log(slideIndex);

    // SET WIDTH OF ALL SLIDES
    slides.forEach((slide) =>{
        // console.log(slide);
        slide.style.width = slideWidth + "px";
    })

    // SET WIDTH OF SLIDECONTAINER
    sliderContainer.style.width = slideWidth * slides.length + "px";

    nextBtn.addEventListener("click", ()=>{
        if (slideIndex === slides.length-1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        // console.log(slideIndex);
        slider();
    })

    prevBtn.addEventListener("click", ()=>{
        if (slideIndex === 0) {
            slideIndex = slides.length-1;
        } else {
            slideIndex--;
        }
        slider();
    })

    function slider() {
        // DESACTIVATE EXISTING ACTIVE SLIDES
        sliderContainer.querySelector(".testi-item.active").classList.remove("active");
        // ACTIVATE NEW SLIDE
        slides[slideIndex].classList.add("active");
        sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
    }
    slider();
})();



//-------------------------------- Hide All sections except active -------------------------

(() =>{
    // console.log("hello");

    const sections = document.querySelectorAll(".section");
    // console.log(sections);
    sections.forEach((section) =>{
        if(!section.classList.contains("active")){
            section.classList.add("hide");
        }
    })
})();