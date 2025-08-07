export const handleResize = () => {
    const overlay = document.querySelector("[overlay]")
    const sidebar = document.querySelector("[sidebar]")
    const menuBtn = document.querySelector("[menu-btn]")
    window.addEventListener('resize', function (event) {
        var width = window.innerWidth;
        if (width >= 1200) {
            overlay.classList.remove("active")
            sidebar.classList.remove("active")
            menuBtn.classList.remove("active")

        }
    });
}

