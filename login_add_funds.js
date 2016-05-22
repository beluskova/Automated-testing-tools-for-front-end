module.exports = 
{
  'Adding funds from existing card': function(test)
   {
    var url = '';
    var name = 'GLORIA JANDORF';
    var balance_after;
    var paymemt = 5.12;
    test
      .open(url)
      .type('#login-email', 'anna@home.com')
      .type('#login-password', 'XXXXXXXXX')
      .click('.login-btn')
      .wait(3000)
      .assert.text('#title-username').is(name)
      .log.dom('#user-balance')
      .execute(function()
      {
        this.data  
        ('balance_before', parseFloat((document.getElementById("user-balance")
        .innerHTML.slice(1)).replace(',','')));
      })
      .log.message('Current balance is:')
      .log.message(function()
      {
        return test.data('balance_before');
      })
      .execute(function()
      {
        this.data  
        ('balance_after', (Number (parseFloat((document.getElementById("user-balance")
        .innerHTML.slice(1)).replace(',',''))) + Number(5.12))) ;
      })
      .log.message('Topped up: $5.12')
      .log.message('Expected new balance is:')
      .log.message(function(){
        return test.data('balance_after');
      })
      .click('#add-funds-button')
      .wait(5000)
      .click('#creditCard_1')
      .wait(5000)
      .click('#add_new_card')
      .wait(5000)
      .type('use_new_card_1','4000100011112224')
      .type('use_new_card_2','09')
      .type('use_new_card_3','16')
      .type('use_new_card_4','123')
      .type('use_new_card_5','5.12')
      .wait(5000)
      .click('#btn_use_new_card')
      .wait(5000)
      
      .log.message('Funds added from a new card')
      .log.message(function()
      {
        return test.data('balance_after');
      })
      .log.message('New balance is')
      .log.dom('#user-balance')
      .assert.val('#user-balance', balance_after);
      done();
    }
};

