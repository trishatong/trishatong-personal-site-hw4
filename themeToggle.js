document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Set initial icon based on theme
    if (currentTheme === 'dark') {
        themeToggle.textContent = '🌜';
    } else {
        themeToggle.textContent = '🌞';
    }

    // Toggle Theme Function
    function toggleTheme() {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '🌜';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌞';
        }
    }

    // Event Listener
    themeToggle.addEventListener('click', toggleTheme);
});