describe('Customer TopUp', function () {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 350000;

  describe("Access Login Page", function() {
    it("should display the correct title", function() {
      browser.get(browser.params.baseUrl);
      browser.sleep(5000);
      expect(browser.getTitle()).toBe('Login — RM Pay');
    });
  });

  describe("Perform Login", function() {
    it ("should login David Brown", function() {
      var loginCustomer = require ('../index/pages/login_customer.js');   
      loginCustomer.loginDavidBrown();
    });
  }); 

  describe ("decision", function() {
    it ("should decide which way to top up", function() {

      element(by.id('add-funds-button')).click();
      browser.sleep(1000);
      element(by.id('use_new_card_1')).isPresent()
      .then(function(result) 
      { 
      if (result) 
      {
        browser.get(browser.params.baseUrl+'/home');
        browser.sleep(5000)

        .then(function()
        {
             console.log('\n Displaying home page');
             browser.sleep(1)
             .then(function()
             {
	             console.log('Adding funds from new card');
	             element(by.id('user-balance')).getText().then(function(text)
	             { 
	             console.log('Read users balance' );
	             var payment = parseFloat((5.12).toFixed(2)); 
	             var balance_before = parseFloat(text.slice(1).replace(',',''));
	             var balance_expected = (Number( Number (balance_before) + Number(payment))).toFixed(2);
	             var expected = balance_expected.replace(/\B(?=(\d{3})+\b)/g, ",");
	             var value_after = "$" +  expected;

	             console.log('\n Payment amount:');
	             console.log(payment);

	             //information for user what is expected:
	             console.log('The old balance was:');
	             console.log(text);
	             console.log("We're expecting balance to be:");
	             console.log(value_after);

	             element(by.id('user-balance')).getText();
	             element(by.id('add-funds-button')).click();
	             browser.sleep(2000);
	             element(by.id('use_new_card_1')).sendKeys('4000100011112224');
	             element(by.id('use_new_card_2')).sendKeys('09');
	             element(by.id('use_new_card_3')).sendKeys('16');
	             element(by.id('use_new_card_4')).sendKeys('999');
	             element(by.id('use_new_card_5')).sendKeys(payment.toString());
	              browser.waitForAngular();
                  browser.sleep(2000)
                  .then(function()
                  { 
		             element(by.id('btn_use_new_card')).click();
		             browser.waitForAngular();
		             browser.sleep(5000)
		             .then(function()
		             {
		                 //to get information about current balance
		                 console.log('new balance is:');
		                 element(by.id('user-balance')).getText()
		                 .then(function(text)
		                 { 
		                   console.log(text);
		                 });
		                 expect(element(by.binding('balanceAmount')).getText()).toBe(value_after);
		             }, 20000);
	            });
           });
          browser.element(by.id('logout')).click();
        });
      });
    }
              
         else 
         {
          console.log('\n Credit card already present');
          browser.get(browser.params.baseUrl+'/home');
          browser.sleep(1500)
          .then(function() 
          {
            browser.sleep(1)
            .then(function() 
            {
              newCardAddFunds.addSecondCard();
              browser.sleep(1000)
              .then(function() 
              {
                element(by.id('user-balance')).getText()
                .then(function(text)
                { 
             
		             var payment = parseFloat((5.12).toFixed(2)); 
		             var balance_before = parseFloat(text.slice(1).replace(',',''));
		             var balance_expected = (Number( Number (balance_before) + Number(payment))).toFixed(2);
		             var expected = balance_expected.replace(/\B(?=(\d{3})+\b)/g, ",");
		             var value_after = "$" +  expected;

		             console.log('\n Payment amount:');
		             console.log(payment);

		             //information for user what is expected:
		             console.log('The old balance was:');
		             console.log(text);
		             console.log("We're expecting balance to be:");
		             console.log(value_after);

		             element(by.id('user-balance')).getText();
		             element(by.id('add-funds-button')).click();

                     browser.sleep(2000);
		             element(by.id('creditCard_1')).click();
		             browser.sleep(1000);
		             element(by.id('add_new_card')).click();
		             browser.waitForAngular();
		             browser.sleep(5000);
		             element(by.id('use_new_card_1')).sendKeys('4000100011112224');
		             element(by.id('use_new_card_2')).sendKeys('09');
		             element(by.id('use_new_card_3')).sendKeys('16');
		             element(by.id('use_new_card_4')).sendKeys('123');
		             element(by.id('use_new_card_5')).sendKeys(payment.toString());
		             browser.waitForAngular();
		             browser.sleep(2000)
		             .then(function()
		             {   
		                 element(by.id('btn_use_new_card')).click()
		                 .then(function()
		                 {
		                     browser.waitForAngular();
		                     browser.sleep(5000);
		                     console.log('New balance is:');
		                     element(by.id('user-balance')).getText()
		                     .then(function(text)
		                     {
		                        console.log(text);
		                     });
		                     expect(element(by.binding('balanceAmount')).getText()).toBe(value_after);
		                  }); 
		            });
		         });
                element(by.id('logout')).click();
                });
             });
          });
        }    
      });
    });   
  });
});

