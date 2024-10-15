function fullScreen() {

    // remove right sidebar
    const rightSideBar = document.querySelector("#messaging .scaffold-layout__aside")
    rightSideBar?.remove()

    // expand outer layout to whole width of the screen (may not be necessary)
    const scaffoldLayoutInner = document.querySelector("#messaging .scaffold-layout__inner")
    scaffoldLayoutInner?.setAttribute("style", "width: 100%")

    // expand inner layout to whole width of the screen
    const scaffoldLayoutRow = document.querySelector("#messaging .scaffold-layout__row")
    scaffoldLayoutRow?.setAttribute("style", "grid-template-columns: 100%; margin-top: 5px !important;")

    // make the left portion with list of threads take 1/5 of the screen
    const threadsList = document.querySelector("#messaging .scaffold-layout__list")
    threadsList?.setAttribute("style", "flex: 1")

    // make the right portion with messages take 4/5 of the screen
    const messaging = document.querySelector("#messaging .scaffold-layout__detail")
    messaging?.setAttribute("style", "flex: 4")

    // reduce top and bottom footer padding
    const footer = document.querySelector("footer.msg-form__footer")
    footer?.setAttribute("style", "padding-top: 10px !important")
    footer?.setAttribute("style", "padding-bottom: 2px !important")

    // move the small lower right corner messages tab a little to the left, so that it will not block "send" button
    // when send button is lowered
    const lowerRightCornerMessagesTab = document.querySelector("#msg-overlay")
    lowerRightCornerMessagesTab?.setAttribute("style", "padding-right: 120px")

    // move the Focused/Unread/My Connections/InMail/Starred buttons to the row above and remove the now empty, row below
    const lowerMessagingRow = document.querySelector("div.msg-conversations-container__title-row:nth-child(2)")

    // find all "pill" button elements
    const pillButtons = document.querySelectorAll(".msg-conversations-container__title-row > div")

    const msgSearchForm = document.querySelector(".msg-search-form")

    // move pill buttons to the row above
    for (const pillButton of pillButtons) {
        msgSearchForm?.parentNode?.appendChild(pillButton);
    }

    // remove the now empty lower row
    lowerMessagingRow?.remove();
}

// Listens to DOM changes and stops after a specific element (in this case "#msg-s-message-list-container") is loaded.
// After that, it calls the fullScreen() function to do its part. This is necessary because the SPA does loading of
// elements after the window.onload event is fired, so we can't use window.onload = ...
const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
                if (node instanceof Element) {
                    if (node.matches(".msg-s-message-list-container")) {
                        fullScreen();
                    } else if (node.matches("#msg-overlay")) {
                        // the message overlay loaded after other components, so it's style did not apply
                        node.setAttribute("style", "padding-right: 120px")
                    }
                }
            })
        }
    }
});

observer.observe(document.body, {childList: true, subtree: true});
