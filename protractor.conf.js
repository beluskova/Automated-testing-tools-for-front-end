exports.config = {


  onPrepare: function() {
    setTimeout(function() {
      browser.driver.executeScript(function() {
        return {
          width: window.screen.availWidth,
          height: window.screen.availHeight,
        };
      }).then(function(result) {
        browser.driver.manage().window().setSize(result.width, result.height);
      });
    });
  },

  specs: [

     './index/phantom_login_add_funds.js',

  ], 

  params: {

    baseUrl: 'https://rmpay.routematch.com'

  },

  seleniumPort: 4444,
  framework: 'jasmine',
  capabilities: {
        'browserName': 'phantomjs',
        //Can be used to specify the phantomjs binary path.
        //This can generally be ommitted if you installed phantomjs globally.
      //  'phantomjs.binary.path': require('phantomjs').path,
       // 'phantomjs.cli.args': ['--ignore-ssl-errors=true', '--web-security=false']
    },
};