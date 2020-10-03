/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navbarList = document.querySelector("#navbar__list");
const sections = document.getElementsByTagName("section");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
const addNavbarListItem = (id, linkName) => {
  const itemHtmlText = `<li><a href="#${id}" class="menu__link">${linkName}</a></li>`;
  navbarList.insertAdjacentHTML("beforeend", itemHtmlText);
};

const isInViewport = (section) => {
  const rect = section.getBoundingClientRect();
  
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  );
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildNavbarList = (sections) => {
  for (const section of sections) {
    const id = section.getAttribute("id");
    const linkName = section.dataset.nav;
    
    addNavbarListItem(id, linkName);
  }
};

// Add class 'active-section' to section when near top of viewport
const setActiveSection = (sections) => {
  for (const section of sections) {
    const linkQuery = `a[href="#${section.getAttribute("id")}"]`;
    const activeMenuLink = document.querySelector(linkQuery);

    if (isInViewport(section)) {
      section.classList.add("active-section");
      activeMenuLink.classList.add("menu__link--active");
    } else {
      section.classList.remove("active-section");
      activeMenuLink.classList.remove("menu__link--active");
    }
  }
};

// Scroll to anchor ID using scrollTO event
const onLinkClick = (e) => {
  e.preventDefault();
  
  const href = e.target.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;
  
  scrollTo({
    top: offsetTop,
    behavior: "smooth"
  });
};

/**
 * End Main Functions
 * Begin Events
 * 
*/
document.addEventListener("DOMContentLoaded", () => {
  // Build menu 
  buildNavbarList(sections);
  
  // Scroll to section on link click
  const menuLinks = document.querySelectorAll(".menu__link");

  for (const link of menuLinks) {
    link.addEventListener("click", onLinkClick);
  }
  
  // Set sections as active
  window.addEventListener("scroll", () => {
    setActiveSection(sections);
  });
});
