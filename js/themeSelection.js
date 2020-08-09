// https://www.youtube.com/watch?v=r_hYR53r61M// Find stored theme
let theme = localStorage.getItem('theme');
if (theme == null) {
    setTheme('light');
} else
{
    setTheme(theme);
}


let lightButton = document.getElementById('theme-switch-button');

lightButton.addEventListener('click', function(){
    console.log('LIGHT BUTTON');
    var theme_val;

    if (theme == 'light') {
        theme_val = 'dark';
    } 
    else if (theme == 'dark')
    {
        theme_val = 'light';
    }

    setTheme(theme_val);
});

function setTheme(mode) {
    if (mode == 'light')
    {
        document.getElementById('theme-style').href = '/css/partials/variables.css';
        // set also code style if present
        var code_style = document.getElementById('code-theme-style');
        if (code_style != null)
        {
            code_style.href = '//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/github.min.css';
        }

    }
    else if (mode = 'dark')
    {
        document.getElementById('theme-style').href = '/css/partials/variables_dark.css';
        // set also code style if present
        var code_style = document.getElementById('code-theme-style');
        if (code_style != null)
        {
            code_style.href = '//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/obsidian.min.css';
        }
    }

    localStorage.setItem('theme', mode);
    theme = mode;
}