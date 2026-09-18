```javascript
/* =====================================================
   ENG R DAWOOD — PORTFOLIO JAVASCRIPT
===================================================== */


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(
    ".section-title, .about-text, .stat, .service-card, .project, .contact-inner, .footer"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 160;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


/* ================= CARD 3D EFFECT ================= */

const cards = document.querySelectorAll(
    ".project, .service-card, .stat"
);

cards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -2;

        const rotateY =
            ((x - centerX) / centerX) * 2;

        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* ================= IMAGE PARALLAX ================= */

const heroImage = document.querySelector(".image-wrapper");

window.addEventListener("mousemove", (event) => {

    if (!heroImage) return;

    const x =
        (window.innerWidth / 2 - event.clientX) / 90;

    const y =
        (window.innerHeight / 2 - event.clientY) / 90;

    heroImage.style.transform =
        `translate(${x}px, ${y}px)`;

});


/* ================= CURRENT YEAR ================= */

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}


/* ================= PREVENT IMAGE DRAG ================= */

document.querySelectorAll("img").forEach((image) => {

    image.addEventListener("dragstart", (event) => {

        event.preventDefault();

    });

});


/* ================= PAGE LOAD ================= */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});