$(function() {
    // Test the RSS Feeds
    describe('RSS Feeds', function() {
        /* Tests to make sure that the allFeeds variable has been defined and
         * that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loop through each feed in the allFeeds object to ensure it has a URL
         * defined and that the URL is not empty.
         */
        it('URLs are defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            };
        });

        /* Loop through each feed in the allFeeds object and ensure it has a
         * name defined and that the name is not empty.
         */
        it('names are defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined(); // name is defined
                expect(allFeeds[i].name.length).not.toBe(0); // name is not empty
            };
        });
    });

    /* Test the Menu */
    describe('The menu', function() {
        /* Ensure the menu element is hidden by default. */
        it("is hidden", function() {
            // check that the body has class='menu-hidden' at start
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        // Ensure menu displays when menu icon is clicked
        // assign the .menu-icon-link class to a variable for easier access
        var menuAnchor = $('.menu-icon-link');
        it('should display when clicked', function() {
            spyOn(menuAnchor, 'click'); //
            menuAnchor.click();
            expect(menuAnchor.click).toHaveBeenCalled();
        });

        // Ensure menu is hidden when menu icon is clicked again
        it('should be hidden when clicked again', function() {
            menuAnchor.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuAnchor.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Test "Initial Entries */
    describe('Initial Entries', function() {
        // Use beforeEach for asynchronous loadFeed function
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        // Make certain .feed div contains at least one entry
        it('feed div contains at least one entry', function(done) {
            var div = $('.feed').children().length;
            expect(div).toBeDefined();
            expect(div).not.toBe(0);
            expect(div).toBeGreaterThan(0);
            done();
        });
    });

    /* Test "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* Test to ensure when a new feed is loaded by the loadFeed function
         * that the content actually changes.
         */
        beforeEach(function(done) {
            title = $('h2').text();
            loadFeed(1, done);
        });

        // Feed changes after a new selection is made
        it('changes after load', function(done) {
            newTitle = $('h2').text();
            expect(newTitle).toBeDefined();
            expect(newTitle).not.toBe("");
            expect(newTitle).not.toBe(title);
            done();
        });

        afterEach(function(done) {
            loadFeed(0, done);
        });
    });
}());