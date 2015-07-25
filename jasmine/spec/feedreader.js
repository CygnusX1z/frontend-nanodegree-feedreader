/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* #8a. This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
    	
    	
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* #8b. TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are defined', function() {
        	for (i = 0; i < allFeeds.length; i++) { 
        		expect(allFeeds[i].url).toBeDefined();
        		expect(allFeeds[i].url.length).not.toBe(0);
        	};
        	
        });        

        /* #9. TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined', function() {
        	for (i = 0; i < allFeeds.length; i++) { 
        		expect(allFeeds[i].name).toBeDefined();		//name is defined
        		expect(allFeeds[i].name.length).not.toBe(0); //name is not empty
        	};
        	
        });
    });


    /* #10. TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* #11. TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
    	it("is hidden", function() {
    		expect($('body').hasClass('menu-hidden')).toBe(true); // check that the body has class='menu-hidden' at start
    	});
    	
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
    	
    	// #12a
    	var menuAnchor = $('.menu-icon-link'); // assign the .menu-icon-link class to a variable for easier access 
    	it('should display when clicked', function() {
    		 spyOn(menuAnchor, 'click'); //
    		 menuAnchor.click();
    		 expect(menuAnchor.click).toHaveBeenCalled();
    	});
    	
    	// #12b
    	it('should be hidden when clicked again', function() {
    		menuAnchor.trigger('click');
    		//expect($('body')).not.toHaveClass('menu-hidden');
    		expect($('body').hasClass('menu-hidden')).toBe(false);
    		
    		menuAnchor.trigger('click');
    		expect($('body').hasClass('menu-hidden')).toBe(true);
    	});
     });	

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
    	/* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         * http://www.htmlgoodies.com/beyond/javascript/stips/using-jasmine-2.0s-new-done-function-to-test-asynchronous-processes.html
         * http://jweden.tumblr.com/post/66999796589/async-testing-in-jasmine-2-0
         * http://jasmine.github.io/2.0/introduction.html
         */    	
		 beforeEach(function(done) {
			 loadFeed(0, done); 
		  });
 	
    	 it('feed div contains at least one entry', function(done) {
    		var div = $('.feed').children().length;
    		expect(div).toBeDefined();
    		expect(div).not.toBe(0);
    		expect(div).toBeGreaterThan(0);
    		done();
    	 });    	
    });   
    
    
    /* TODO: Write a new test suite named "New Feed Selection" */
	describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
		beforeEach(function(done) {
			title = $('h2').text();
			loadFeed(1, done);
		});
    	
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
