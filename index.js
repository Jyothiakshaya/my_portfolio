// 1. Typewriter Effect
const typewriterElement = document.getElementById("typewriter");
const words = ["Web Developer", "AI Enthusiast", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentWord = words[wordIndex];
  const currentText = currentWord.substring(0, charIndex);
  typewriterElement.textContent = currentText;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(type, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 50);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 1000);
  }
}
type();

// 2. Smooth Scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// 3. Scroll animation for skill icons (optional fade-in)
const skillSection = document.getElementById('skills');
const skillImgs = document.querySelectorAll('#skills img');

window.addEventListener('scroll', () => {
  const triggerBottom = window.innerHeight * 0.8;
  const sectionTop = skillSection.getBoundingClientRect().top;

  if (sectionTop < triggerBottom) {
    skillImgs.forEach((img, index) => {
      setTimeout(() => {
        img.style.opacity = 1;
        img.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }
});
