import $ from 'jquery';

$(document).ready(function() {
    // Gestion du toggle de la sidebar
    $("#sidebar-toggle").click(function() {
        $("#sidebar").toggleClass("collapsed");
    });

    // Gestion du toggle de thème
    $(".theme-toggle").click(function() {
        toggleRootClass();
        toggleLocalStorage();
    });

    function toggleRootClass() {
        const currentTheme = $("html").attr('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        $("html").attr('data-bs-theme', newTheme);
    }

    function toggleLocalStorage() {
        if (isLight()) {
            localStorage.removeItem("theme");
        } else {
            localStorage.setItem("theme", "light");
        }
    }

    function isLight() {
        return localStorage.getItem("theme") === "light";
    }

    // Initialiser le thème en fonction du localStorage
    if (isLight()) {
        toggleRootClass();
    }

});



