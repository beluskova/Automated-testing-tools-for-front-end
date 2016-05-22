module.exports = {
  'Log in test' : function (browser) {
    browser
      .url('https://rmpay.routematch.com')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=email]', 'anna@home.com')
      .setValue('input[type=password]', 'XXXXXXXXXXX')
      .waitForElementVisible('button[id=login-btn]', 1000)
      .click('button[id=login-btn]')
      .pause(5000)
      .assert.containsText('#title-username', 'GLORIA JANDORF')

  },

  'Top up test' : function (browser) {
    browser
      .getText("#user-balance", function(result) {
       console.log('Current balance is:') ;
       console.log(result.value);
       var payment = parseFloat((5.12).toFixed(2)); 
       var balance1 = balance = result.value;
       var balance_before = parseFloat(balance1.slice(1).replace(',',''));
       var balance_expected = (Number( Number (balance_before) + Number(payment))).toFixed(2);
       var expected = balance_expected.replace(/\B(?=(\d{3})+\b)/g, ",");
       var value_after1 = value_after = "$" +  expected;
       console.log('Expected balance is:');
       console.log(value_after1);
      });
    browser
      .waitForElementVisible('button[id=add-funds-button]', 1000)
      .click('button[id=add-funds-button]')
      .pause(5000)
      .waitForElementPresent('#creditCard_1', 1000)
      .click('#creditCard_1')
      .waitForElementVisible('#add_new_card', 1000)
      .click('#add_new_card')
      .pause(1000)
      .setValue('input[id=use_new_card_1', '4000100011112224')
      .setValue('input[id=use_new_card_2]', '09')
      .setValue('input[id=use_new_card_3]', '16')
      .setValue('input[id=use_new_card_4]', '123')
      .setValue('input[id=use_new_card_5]', '5.12')
      .pause(3000)
      .waitForElementVisible('button[id=btn_use_new_card]', 1000)
      .click('button[id=btn_use_new_card]')
      .pause(5000)
      .getText("#user-balance", function(result)
      {
       var new_balance1 = new_balance = result.value;
       console.log('New balance is:');
       console.log(new_balance1);
       browser.assert.containsText('#user-balance', new_balance);
      });
    browser 
      .end();
  }
};

