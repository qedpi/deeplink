/* global chrome */

/**
 * logic flow:
 * > background listens for keyboard shortcuts & context menu clicks
 * > if shortcut => tells content script to copy selection, parse it, and write to clipboard
 * > elif cxt menu =>
 */

const onClickCopyDeeplink = (info, tab) => {
    console.log(`background: context menu selected text: ${info.selectionText}`)
    chrome.tabs.sendMessage(tab.id, {method: "sendSelection", selectionText: info.selectionText},
        response => response)
}

chrome.runtime.onInstalled.addListener(() => {
    // create context menu & bind click action
    chrome.contextMenus.create({
        id: "deepLink",
        title: "Copy Deeplink",
        contexts: ["selection"],
    });
    chrome.contextMenus.onClicked.addListener(onClickCopyDeeplink)

    // bind handler to copy deep link command
    chrome.commands.onCommand.addListener((command, tab) => {
        // console.log(JSON.stringify(tab));
        // console.log(tab.url)
        switch (command) {
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


