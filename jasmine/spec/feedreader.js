/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it("url is defined", function () { //This checks for a defined url
            for (const theFeed of allFeeds) {
                expect(theFeed.url).toBeDefined();
                expect(theFeed.url.length).not.toBe(0); //The length of the feed's url should not be zero
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("name is defined", function () {
            for (const theFeed of allFeeds) {
                expect(theFeed.name).toBeDefined(); //The name of the feed should be defined
                expect(theFeed.name.length).not.toBe(0); // the length of the name should not be zero
            }
        })
    });


    /* TODO: Write a new test suite named "The menu" */
    describe("The menu", function () {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it("menu is hidden", function () {
            let body = document.querySelector("body"); //The body element is selected and checked if it has a class of "menu-hidden"
            expect(body.classList.contains("menu-hidden")).toBe(true); //"menu-hidden" makes the menu not visible
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it("menu shows when clicked and hides when clicked again", function () {
            let body = document.querySelector("body"); //This selects the hidden menu
            let menuButton = document.querySelector(".menu-icon-link"); //The hamburger icon linked to the menu is also selected

            menuButton.click(); //A click event to the hamburger icon is simulated 
            expect(body.classList.contains("menu-hidden")).toBe(false); //Expect the menu to be visible and so does not contain the class "menu-hidden"

            menuButton.click(); //A click event is again simulated 
            expect(body.classList.contains("menu-hidden")).toBe(true); //Expect the menu to contain the class "menu-hidden";
        })
    });



    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function () {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            loadFeed(0, done); // A feed is loaded
        });

        it("work completed", function () { //test that there is at least a single element within the feed
            const theFeed = document.querySelector(".feed");
            expect(theFeed.children.length > 0).toBe(true);
        });



    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function () {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        const theFeed = document.querySelector(".feed"); // this selects the elements with the class "feed"
        let theFeedArray = Array.from(theFeed.children); // An array object is created from "theFeed" children
        let firstOfFeeds = []; //A new array is created to take in the innerText of 'theFeedArray'
        beforeEach(function (done) { //using beforeEach since loadfeed is asynchronous
            loadFeed(0); //load first feed
            for (let feedChildren of theFeedArray) { //this loops through the array,retrieve it's inner text and add it to 'first of feeds'
                firstOfFeeds.push(feedChildren.innerText);
            }
            loadFeed(1, done); //load second feed and ends
        });

        it("content changes", function () { //This checks for content changes and evaluates that the feeds must not be the same
            theFeedArray.forEach(function (entry, index) {
                expect(entry.innerText).toBeDefined();
                expect(firstOfFeeds[index]).toBeDefined();
                expect(entry.innerText === firstOfFeeds[index]).toBe(false);
            })
        })

    })


}());