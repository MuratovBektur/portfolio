const yearDateElement = document.querySelector(".footer-year-text");

if (yearDateElement) {
  yearDateElement.innerHTML = new Date().getFullYear();
} else {
  console.error("can't set current year");
}
