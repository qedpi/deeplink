/* global chrome */

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.method === "getSelection") {
            const selection = window.getSelection().toString().trim()
            let url = document.location.toString().split('#:~:')[0]
            console.log(url)
            const deepLink = `${url}#:~:text=${encodeURIComponent(selection)}
            `
            navigator.clipboard.writeText(deepLink).then(() => {
                console.log('copy to clipboard success')
                sendResponse({data: deepLink});
            }, () => {
                console.log('failed to copy to clipboard!')
                sendResponse({data: undefined});
            });
        }
        else
            sendResponse({});
    }
)