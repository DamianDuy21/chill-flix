export const handleResize = () => {
    const overlay = document.querySelector("[overlay]")
    window.addEventListener('resize', function (event) {
        var width = window.innerWidth;
        if (width >= 1200) {
            overlay.click()
        }
    });
}

