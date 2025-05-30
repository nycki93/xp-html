// load this on the first time entrance page after the buttons load
function main() {
    // set up the buttons
    const acceptButton = document.getElementById('accept');
    acceptButton.onclick = doAccept;
    const rejectButton = document.getElementById('reject');
    rejectButton.onclick = doReject;
}

function doAccept() {
    // okay cool! let's just mark that you've been here before.
    console.log('user accepted');
    localStorage.setItem('firstTime', 'false');

    // now let's go back to the cool stuff!
    // we stored this in the url like `?next=lastpage` so now we gotta extract that.
    let nextPage = 'index.html';
    const queries = (window.location.search || '').slice(1).split('&');
    for (const query of queries) {
        const [key, value] = query.split('=', 2);
        if (key === 'next') {
            nextPage = value;
        }
    }
    // okay, off you go!
    window.location.replace(nextPage);
}

function doReject() {
    // you don't wanna see the cool stuff? away you go, I guess.
    window.location.replace('index.html');
}

// run this onload so the buttons load first
window.onload = main;
