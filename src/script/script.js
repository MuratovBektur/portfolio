const yearDateElement = document.querySelector(".footer-year-text");

if (yearDateElement) {
  yearDateElement.innerHTML = new Date().getFullYear();
} else {
  console.error("can't set current year");
}

const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  const headerContainer = document.querySelector(".header-container");
  const footer = document.querySelector("footer");
  const headerHeight = 100;
  // sticky header
  headerContainer.classList.toggle("sticky", window.scrollY > headerHeight);

  // remove toggle icon and navbar when click navbar links (scroll)
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");

  // animation footer on scroll

  // footer.classList.toggle(
  //   "show-animate",
  //   this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight
  // );

  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - headerHeight;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      // active navbar links
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
      if (id === "contact") {
        footer.classList.add(
          "show-animate"
          // this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight
        );
      }
      // acitve sections for animation on scroll
      sec.classList.add("show-animate");
    } else {
      // fi want ot use animation that repeats on scroll use this
      sec.classList.remove("show-animate");
    }
  });
};
