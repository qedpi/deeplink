/* global chrome */

const wrapDeepLink = selection => {
    const url = document.location.toString().split('#:~:')[0];
    const deepLink = `${url}#:~:text=${encodeURIComponent(selection)}`;
    console.log(`content: creating deeplink from ${url} \n
                 > ${deepLink}`);
    return deepLink
}

const copyToClipboard = (text, sendResponse) => {
    navigator.clipboard.writeText(text).then(() => {
        console.log('copy to clipboard success')
        sendResponse({data: text});
    }, () => {
        console.log('failed to copy to clipboard!')
        sendResponse({});
    });
}

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        const selection = request.selectionText || window.getSelection().toString().trim();
        const deepLink = wrapDeepLink(selection)
        copyToClipboard(deepLink, sendResponse)
        // note: without sendResponse or return, content script will close connection, causing error for background script
        sendResponse({});
    }
)