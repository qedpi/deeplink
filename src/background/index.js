/* global chrome */

chrome.runtime.onInstalled.addListener(() => {
    // bind handler to copy deep link command
    chrome.commands.onCommand.addListener((command, tab) => {
        console.log(JSON.stringify(tab))
        console.log(tab.url)
        switch (command){
            case 'copy-deeplink':
                // can't directly call window, must pass message to content script!
                // https://stackoverflow.com/questions/19098505/capture-selected-text-using-keyboard-shortcut
                // https://stackoverflow.com/questions/21359605/window-getselection-returning-undefined-or-null/21393595
                // message passing: https://developer.chrome.com/extensions/messaging
                chrome.tabs.query({active: true, currentWindow: true}, tabs =>
                    chrome.tabs.sendMessage(tabs[0].id, {method: "getSelection"},
                        response => response))
                console.log('success! back to background script')
                break;
            default:
                console.log('undefined command')
        }
    });
});

// to add to manifest: // "options_page": "./options.html",


