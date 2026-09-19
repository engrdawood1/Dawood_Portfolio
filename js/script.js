"use strict";

/* =========================================================
   ENGR DAWOOD PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const body =
        document.body;

    const header =
        document.getElementById("header");

    const navMenu =
        document.getElementById("navMenu");

    const menuOpen =
        document.getElementById("menuOpen");

    const menuClose =
        document.getElementById("menuClose");

    const desktopTheme =
        document.getElementById(
            "themeToggleDesktop"
        );

    const mobileTheme =
        document.getElementById(
            "themeToggleMobile"
        );

    const backTop =
        document.getElementById("backTop");

    const year =
        document.getElementById("year");


    /* =====================================================
       YEAR
    ====================================================== */

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    const openMenu = () => {

        navMenu.classList.add("open");

        body.classList.add("menu-open");

    };


    const closeMenu = () => {

        navMenu.classList.remove("open");

        body.classList.remove("menu-open");

    };


    if (menuOpen) {

        menuOpen.addEventListener(
            "click",
            openMenu
        );

    }


    if (menuClose) {

        menuClose.addEventListener(
            "click",
            closeMenu
        );

    }


    /* Close menu when navigation item clicked */

    document
        .querySelectorAll(".nav-link")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });


    /* Close menu when clicking outside */

    document.addEventListener(
        "click",
        event => {

            if (!navMenu.classList.contains("open")) {
                return;
            }


            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedMenuButton =
                menuOpen &&
                menuOpen.contains(event.target);


            if (
                !clickedInsideMenu &&
                !clickedMenuButton
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       THEME
    ====================================================== */

    const savedTheme =
        localStorage.getItem(
            "engr-dawood-theme"
        );


    if (savedTheme === "light") {

        body.setAttribute(
            "data-theme",
            "light"
        );

    }


    const updateThemeIcons = () => {

        const isLight =
            body.getAttribute(
                "data-theme"
            ) === "light";


        const icon =
            isLight
                ? "fa-solid fa-sun"
                : "fa-solid fa-moon";


        if (desktopTheme) {

            desktopTheme.innerHTML =
                `<i class="${icon}"></i>`;

        }


        if (mobileTheme) {

            mobileTheme.innerHTML =
                `<i class="${icon}"></i>`;

        }

    };


    const toggleTheme = () => {

        const isLight =
            body.getAttribute(
                "data-theme"
            ) === "light";


        if (isLight) {

            body.removeAttribute(
                "data-theme"
            );

            localStorage.setItem(
                "engr-dawood-theme",
                "dark"
            );

        } else {

            body.setAttribute(
                "data-theme",
                "light"
            );

            localStorage.setItem(
                "engr-dawood-theme",
                "light"
            );

        }


        updateThemeIcons();

    };


    if (desktopTheme) {

        desktopTheme.addEventListener(
            "click",
            toggleTheme
        );

    }


    if (mobileTheme) {

        mobileTheme.addEventListener(
            "click",
            toggleTheme
        );

    }


    updateThemeIcons();


    /* =====================================================
       HEADER SCROLL
    ====================================================== */

    const handleScroll = () => {

        const scrollY =
            window.scrollY;


        if (scrollY > 30) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }


        if (scrollY > 500) {

            backTop.classList.add(
                "show"
            );

        } else {

            backTop.classList.remove(
                "show"
            );

        }

    };


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    handleScroll();


    /* =====================================================
       BACK TO TOP
    ====================================================== */

    if (backTop) {

        backTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    const updateActiveNav = () => {

        const position =
            window.scrollY + 180;


        sections.forEach(section => {

            const top =
                section.offsetTop;

            const height =
                section.offsetHeight;

            const id =
                section.getAttribute("id");


            if (
                position >= top &&
                position < top + height
            ) {

                navLinks.forEach(link => {

                    link.classList.remove(
                        "active"
                    );

                });


                const activeLink =
                    document.querySelector(
                        `.nav-link[href="#${id}"]`
                    );


                if (activeLink) {

                    activeLink.classList.add(
                        "active"
                    );

                }

            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNav,
        {
            passive: true
        }
    );


    updateActiveNav();


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver"
        in window
    ) {


        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {


                    entries.forEach(
                        entry => {


                            if (
                                entry.isIntersecting
                            ) {


                                entry.target.classList.add(
                                    "visible"
                                );


                                observerInstance.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -30px 0px"
                }
            );


        revealElements.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );


    } else {


        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       SMOOTH ANCHOR FALLBACK
    ====================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {


            anchor.addEventListener(
                "click",
                event => {


                    const targetId =
                        anchor
                            .getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       KEYBOARD ESCAPE
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                navMenu.classList.contains("open")
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       PROFILE IMAGE FALLBACK
    ====================================================== */

    const profileImage =
        document.querySelector(
            ".profile-placeholder img"
        );


    if (profileImage) {

        profileImage.addEventListener(
            "error",
            () => {

                profileImage.style.display =
                    "none";

                profileImage
                    .parentElement
                    .classList
                    .add("no-image");

            }
        );

    }


});