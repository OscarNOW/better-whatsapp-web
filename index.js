const wrapperSelector = '#app > div > div > div.two';

const html = document.documentElement;

const mutationObserver = new MutationObserver(htmlUpdate);
mutationObserver.observe(html, { attributes: true, childList: false, subtree: false });

console.log('better whatsapp web waiting for whatsapp to load');

let loaded = false;
function htmlUpdate() {
    if (html.classList.contains('wf-loading') && !loaded) {
        loaded = true;
        whatsappLoaded();
    }
}

function whatsappLoaded() {
    console.log('better whatsapp web whatsapp loaded');

    const wrapper = document.querySelector(wrapperSelector);
    wrapper.style.position = 'fixed';
    wrapper.style.top = '0';
    wrapper.style.left = '0';
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';

    updateIcons();
}

function updateIcons() {
    if (document.body.classList.contains('dark')) {
        const icons = document.querySelectorAll('span[data-icon]');
        for (const icon of [...icons]) {
            if (!icon.style.color || icon.style.color !== 'white')
                icon.style.color = 'white';
        }
    }
}