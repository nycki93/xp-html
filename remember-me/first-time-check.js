// load this js on every page "inside" the club
function main() {
    const firstTime = localStorage.getItem('firstTime');
    if (firstTime == 'false') {
        // you've been here before, you can go back to what you were doing!
        return; 
    } else {
        // it's your first time! let's take a note of where you were so we can
        // bring you back later, but first we gotta show you around!
        window.location.replace(`first-time.html?next=${window.location}`);
    }
}

// run this now before anything else loads
main();
