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


        /* A test to check if the feeds in allFeeds object have a defined and not empty url*/
        it("url is defined", function () { //This checks for a defined url
            for (const theFeed of allFeeds) {
                expect(theFeed.url).toBeDefined();
                expect(theFeed.url.length).not.toBe(0); //The length of the feed's url should not be zero
            }
        });

        /* A test to check if the feeds in the allFeeeds object have a defined name and it is not empty*/
        it("name is defined", function () {
            for (const theFeed of allFeeds) {
                expect(theFeed.name).toBeDefined(); //The name of the feed should be defined
                expect(theFeed.name.length).not.toBe(0); // the length of the name should not be zero
            }
        })
    });


    /* The menu test suite checks if the menu toggles between hidden and visible when clicked and if it
     *is hidden by default 
     */
    describe("The menu", function () {
        /* This test check if the menu is hidden by default*/
        it("menu is hidden", function () {
            let body = document.querySelector("body"); //The body element is selected and checked if it has a class of "menu-hidden"
            expect(body.classList.contains("menu-hidden")).toBe(true); //"menu-hidden" makes the menu not visible
        });

        /* This check if the menu becomes visible when clicked  and hidden when clicked again*/
        it("menu shows when clicked and hides when clicked again", function () {
            let body = document.querySelector("body"); //This selects the hidden menu
            let menuButton = document.querySelector(".menu-icon-link"); //The hamburger icon linked to the menu is also selected

            menuButton.click(); //A click event to the hamburger icon is simulated 
            expect(body.classList.contains("menu-hidden")).toBe(false); //Expect the menu to be visible and so does not contain the class "menu-hidden"

            menuButton.click(); //A click event is again simulated 
            expect(body.classList.contains("menu-hidden")).toBe(true); //Expect the menu to contain the class "menu-hidden";
        })
    });



    /* A new test suite named "Initial Entries" */
    describe("Initial Entries", function () {
        /* The  test  ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function (done) {
            loadFeed(0, done); // A feed is loaded
        });

        it("work completed", function () { //test that there is at least a single .entry element within the feed
            const theFeed = document.querySelector(".feed");
            let theFeedEntries = theFeed.getElementsByClassName("entry"); //get the .entry element from the DOM
            expect(theFeedEntries.length > 0).toBe(true);
        });



    });
    /* The New Feed Selection test suite  */
    describe("New Feed Selection", function () {
        /* The test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        let firstOfFeeds;
        let nextOfFeeds;
        beforeEach(function (done) {
            loadFeed(0, function () {
                firstOfFeeds = document.querySelector(".feed").innerHTML; // loads the first feed

                loadFeed(1, function () { // loads the next feed
                    nextOfFeeds = document.querySelector(".feed").innerHTML;
                    done();
                })
            })
        })

        it("content changes", function () { // A test to check for changes
            expect(firstOfFeeds).toBeDefined(); // first feed must be defined
            expect(nextOfFeeds).toBeDefined(); // second feed must be defined
            expect(firstOfFeeds === nextOfFeeds).toBe(false); // they must not be equal
        })

    })


}());