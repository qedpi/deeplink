// export function copyTextToClipboard(text) {
//     //Create a textbox field where we can insert text to.
//     const copyFrom = document.createElement("textarea");
//
//     //Set the text content to be the text you wished to copy.
//     copyFrom.textContent = text;
//
//     //Append the textbox field into the body as a child.
//     //"execCommand()" only works when there exists selected text, and the text is inside
//     //document.body (meaning the text is part of a valid rendered HTML element).
//     document.body.appendChild(copyFrom);
//
//     //Select all the text!
//     copyFrom.select();
//
//     //Execute command
//     document.execCommand('copy');
//
//     //(Optional) De-select the text using blur().
//     copyFrom.blur();
//
//     //Remove the textbox field from the document.body, so no other JavaScript nor
//     //other elements can get access to this.
//     document.body.removeChild(copyFrom);
// }

// may not be supported by chrome:
// const setClipboard = text => {
//     let data = [new ClipboardItem({ "text/plain": text })];
//
//     navigator.clipboard.write(data).then(function() {
//         /* success */
//     }, function() {
//         /* failure */
//     });
// }

// todo: https://stackoverflow.com/questions/3436102/copy-to-clipboard-in-chrome-extension
// const copyToClipboard = () => {
//     navigator.permissions.query({name: 'clipboard-write'}).then(result => {
//         if (result.state === 'granted') {
//             const blob = new Blob(['hello'], {type: 'text/plain'});
//             const item = new ClipboardItem({'text/plain': blob});
//             navigator.clipboard.write([item]).then(function () {
//                 console.log("Copied to clipboard successfully!");
//             }, function (error) {
//                 console.error("unable to write to clipboard. Error:");
//                 console.log(error);
//             });
//         } else {
//             console.log("clipboard-permissoin not granted: " + result);
//         }
//     });
// }

// const copyToClipboard2 = () => {
//     document.execCommand('copy')
// }

// chrome.contextMenus.create({
//     id: "copyDeepLink",
//     title: "copy deeplink",
//     contexts: ['selection']
// });
//
// // set up listener (has to be sync?)
// chrome.contextMenus.onClicked.addListener(event => {
//     if (event.menuItemId === "copyDeepLink") {
//         // alert(JSON.stringify(event))
//         const sParameter = event['selectionText']
//         // using location.href here returns the contextmenu URL!
//         // instead, we use the metadata: pageUrl
//         const deepLink = `${event['pageUrl']}#:~:text=${encodeURIComponent(sParameter.trim())}`
//         console.log(JSON.stringify(deepLink))
//
//         copyToClipBoard()
//     }
// });

// const getURL = () => {
//     chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
//         return tabs[0].url;
//         // use `url` here inside the callback because it's asynchronous!
//     });
// }

// const formDeepLink = (url, text) => {
//     console.log('selected text: ' + text)
//     const deepLink = `${url}#:~:text=${text}`
//     console.log(JSON.stringify(deepLink))
//     copyTextToClipboard(deepLink)
// }

// This is an example of a script that will run on every page. This can alter pages
// Don't forget to change `matches` in manifest.json if you want to only change specific webpages
printAllPageLinks();

// This needs to be an export due to typescript implementation limitation of needing '--isolatedModules' tsconfig
export function printAllPageLinks() {
    const allLinks = Array.from(document.querySelectorAll('a')).map(
        link => link.href
    );

    console.log('-'.repeat(30));
    console.log(
        `These are all ${allLinks.length} links on the current page that have been printed by the Sample Create React Extension`
    );
    console.log(allLinks);
    console.log('-'.repeat(30));
}

// import {copyTextToClipboard} from '../utils'

messageInBackground();

// This needs to be an export due to typescript implementation limitation of needing '--isolatedModules' tsconfig
export function messageInBackground() {
    console.log('I can run your javascript like any other code in your project');
    console.log('just do not forget, I cannot render anything !');
}