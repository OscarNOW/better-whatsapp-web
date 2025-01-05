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

    let styleTexts = [];
    styleTexts.push('/* Better whatsapp web extension */');

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

        styleTexts.push(styleInnerText);
    }

    //end to end encryption
    styleTexts.push(`
    #app > div > div > div > div > span > div > span > div > div > section > div:has(span[data-icon="lock"]) {
        display: none !important;
    }
    `);

    //end to end encryption
    styleTexts.push(`
    #app > div > div > div > div > div > span > div > span > div > div > div > div > div > div > div > span > div:has(span[data-icon="lock-small-v2"]) {
        display: none !important;
    }
    `);

    //newsletter
    styleTexts.push(`
    #app > div > div > div > header > div > div > div > div > span > div > div > div:has(span[data-icon="newsletter-outline"]) {
        display: none !important;
    }
    `);

    //download from microsoft store
    styleTexts.push(`
    #app > div > div > div > div > div > div:has(div[gap]) {
        display: none !important;
    }
    `);

    styleTexts = styleTexts.map(a => a.split('\n').map(b => b.trim()).join(''));
    const styleText = styleTexts.join('\n');
    const style = document.createElement('style');
    style.textContent = styleText;
    document.head.appendChild(style);
}