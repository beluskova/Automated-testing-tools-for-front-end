

var mouse = require("mouse").create(casper);
var colorizer = require('colorizer').create('Colorizer');

casper.test.begin('Rm Pay log in the customer & add funds', 6, function suite(test) {
    casper.start('https://rmpay.routematch.com', function()   
    {
        test.assertTitle("Login — RM Pay", "RmPay title is the one expected");
        console.log("Page loaded");
        this.test.assertExists('form', 'Form is found');
        
    }, true);
  });

casper.wait(10000, function() {
    this.echo("I've waited for 10 seconds.", "PARAMETER");
});

casper.waitForSelector("form", function()
 {
    this.echo('Form found');
    this.fill("form", {
       'email' : 'anna@home.com',
       'password' : 'XXXXXXXXXXXXXXXX'
    }, true);  
});

casper.wait(10000, function() {
    this.echo("I've waited for 10 seconds.", "PARAMETER");
});

casper.waitForText("YOUR BALANCE", function()
 {
    this.echo('Home page redirected');
 });

casper.waitForSelector("#title-username", function()
{
   this.test.assertExists('#title-username');
});

casper.then(function(){

    this.echo("Checking that the home page is displaying name Gloria Jandorf", "INFO");
    this.test.assertEval(function() {
            return __utils__
            .findOne('#title-username')
            .textContent === "GLORIA JANDORF"; 
        });
});

casper.then(function getText() {  
    var target = this.fetchText('#user-balance');
    this.echo(target);
    var payment = parseFloat((5.12).toFixed(2)); 
    var balance1 = balance = target;
    var balance_before = parseFloat(balance1.slice(1).replace(',',''));
    var balance_expected = (Number( Number (balance_before) + Number(payment))).toFixed(2);
    var expected = balance_expected.replace(/\B(?=(\d{3})+\b)/g, ",");
    var value_after1 = value_after = "$" +  expected;
    console.log('Expected balance is:');
    console.log(value_after1);
});  

casper.wait(5000, function() {
    this.echo("I've waited for 5 seconds.", "PARAMETER");
});

casper.then(function(){
  this.click("#add-funds-button");
  console.log('Clicked on add funds button');

  this.waitForSelector('#creditCard_1', 1000);
  this.click('#creditCard_1');
  this.waitForSelector('#add_new_card', 1000);
  this.click('#add_new_card');
  this.wait(1000);
  this.fillSelectors('form#login-form', {
      'input[id=use_new_card_1]': '4000100011112224',
      'input[id=use_new_card_2]': '09',
      'input[id=use_new_card_3]': '16',
      'input[id=use_new_card_4]': '123',
      'input[id=use_new_card_5]': '5.12'
      }, true);
  this.wait(3000);
  this.waitForSelector('button[id=btn_use_new_card]', 1000);
  this.click('button[id=btn_use_new_card]');
  this.wait(5000);
  
});

casper.then(function getText()   
      {
       var new_balance1 = new_balance = this.fetchText('#user-balance');
       console.log('New balance is:');
       console.log(new_balance1);
       this.echo('Checking that the balance has increased as it should', "INFO");
       this.test.assertEval(function() {
            return __utils__
            .findOne('#user-balance')
            .textContent === new_balance;
        });
      });


casper.then(function()
{
    this.click("#logout");
    console.log("Logged out the customer");   
});

casper.wait(10000, function() {
    this.echo("I've waited for 10 seconds.");
});

casper.then(function(){
     this.test.
     assertTitle("Login — RM Pay", "RmPay title is the one expected");
});

 casper.then(function(){ 
    localStorage.clear(); 
    });

casper.run( function () {
    this.test.done();
    casper.exit();
}); 