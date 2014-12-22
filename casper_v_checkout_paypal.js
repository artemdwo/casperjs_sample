/**
 * Created by Artem Dvornichenko on 17 Dec 2014.
 *
 * Regular checkout for not logged in customer - PayPal
 */

var casper = require('casper').create();
casper.options.viewportSize = {width: 1024, height: 768};
casper.options.waitTimeout = 30000;

casper.start('http://artemdvornichenko.vaimo.com/');

casper.then(function() {
    if (this.exists('.carousel-inner')) {
        this.echo('Homepage', 'INFO');
    } else {
        this.echo("Couldn't reach the homepage", 'ERROR');
    }
});

casper.thenOpen('http://artemdvornichenko.vaimo.com/accessories', function(){
    this.click('a[title*="Sunglasses"]');
    this.waitForText("Sunglasses", function() {
        this.click('.btn-cart');
        this.echo(this.getTitle(), 'INFO');
    });
    this.waitForText("Shopping Cart", function() {
        this.echo(this.fetchText('.headercart-items'));
    });

});

casper.thenOpen('http://artemdvornichenko.vaimo.com/women', function(){
    this.click('a[title*="Diana"]');
    this.waitForText("Diana", function() {
        this.click('.btn-cart');
        this.echo(this.getTitle(), 'INFO');
    });
    this.waitForText("Shopping Cart", function() {
        this.echo(this.fetchText('.headercart-items'));
    });

});

casper.then(function() {
    this.click('.headercart-co-btn');
    this.waitForText("Checkout", function() {
        this.echo(this.getTitle(), 'INFO');

        this.click('#p_method_paypal_standard');

        this.fill('form#co-billing-form', {
            'billing[firstname]':   'John',
            'billing[lastname]':    'Doe',
            'billing[email]':       'John@Doe.com',
            'billing[company]':     'XXX',
            'billing[street][]':    'Default Street',
            'billing[postcode]':    'se1 4rt',
            'billing[city]':        'London',
            'billing[telephone]':   '07555444333',
            'billing[country_id]':  'GB'
        }, false);
        this.click('#place-order-button');
    });

    this.waitForText("Choose a way to pay", function() {
        this.echo(this.getTitle(), 'INFO');
    });
});

casper.run();
