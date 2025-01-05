const wrapperSelector = '#app > div > div > div.two';
const whiteIcons = [
    'chats-filled',
    'chats-outline',
    'status',
    'status-outline',
    'newsletter-tab',
    'newsletter-outline',
    'community-tab',
    'community-outline',
    'settings',
    'settings-outline',
    'new-chat-outline',
    'menu',
    'search-alt',
    'plus'
];

const html = document.documentElement;

const htmlObserver = new MutationObserver(htmlUpdate);
htmlObserver.observe(html, { attributes: true, childList: false, subtree: false });

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

    if (document.body.classList.contains('dark')) {
        let styleInnerText = `
        span[data-icon]:is($$) {
            color: white !important;
        }
        `;

        let iconTexts = [''];
        for (const whiteIcon of whiteIcons)
            iconTexts.push(`[data-icon="${whiteIcon}"]`);

        const iconText = iconTexts.join(',');
        styleInnerText = styleInnerText.replace('$$', iconText);
        styleInnerText = styleInnerText.replaceAll('\n', '');

        const style = document.createElement('style');
        style.innerText = styleInnerText;
        document.head.appendChild(style);
    }
}