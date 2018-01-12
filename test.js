var email=' ', password = ' ', keyword=' ', comment=' ';
var picdir="/Users/hithere/Documents/Li/weiguangproject/weiboadjs/";
var casper = require('casper').create();
var mouse = require("mouse").create(casper);
var x = require('casper').selectXPath;

var loginurl="https://login.sina.com.cn/";
var searchurl="https://s.weibo.com/";
var waittime=0;
var min=4000;
var max=8000;
var fs = require('fs');
var utils=require('utils');
//casper.userAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)');
casper.userAgent('Linux / Firefox 29: Mozilla/5.0 (X11; Linux x86_64; rv:29.0) Gecko/20100101 Firefox/29.0');
//casper.userAgent('Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16');


//casper.clear();
phantom.clearCookies();

casper.start('http://api.ipify.org/', function() {
		var js = this.evaluate(function() {
			return document; 
		});
		var pagecontent=js.all[0].outerHTML;
		this.echo( pagecontent);
		casper.echo("Casper CLI passed args:");
		//utils.dump(casper.cli.args);
		//email=casper.cli.args[0].trim();
		//password=casper.cli.args[1].toString().trim();
		//utils.dump(casper.cli.raw.get('u'));
		//utils.dump(casper.cli.raw.get('p'));
		//utils.dump(casper.cli.raw.get('k'));
		//utils.dump(casper.cli.raw.get('c'));
		email=casper.cli.raw.get('u');
		password=casper.cli.raw.get('p');
		keyword=casper.cli.raw.get('k');
		comment=casper.cli.raw.get('c');
		
		//searchurl=encodeURI(searchurl+keyword+"&Refer=STopic_box");
		//searchurl = searchurl.encoding('utf-8')
		//this.echo(searchurl);
		
		
		//name=casper.cli.args[2].toString().trim();
	});

casper.thenOpen(loginurl, function() {
	this.echo(this.getTitle());
    this.echo("opening webpage: "+loginurl);
    
    casper.then(function(){
    	waittime=Math.floor(Math.random()*(3000)+10000);
		this.wait(waittime, function() {});
    });		
    casper.then(function(){
    	this.echo("I am on the login page.");
		this.capture(picdir+email+"_trytologin.png");
    });
	casper.then(function() {
		this.sendKeys('#username', email, true);
		this.sendKeys('#password', password, true);
		this.click('#remLoginName'); //uncheck stay login
		this.click(".W_btn_a");
	});
	casper.then(function(){
		this.capture(picdir+email+"beforeredirect.png");
	});
	casper.then(function () {
		this.echo("I've logged in.");
		waittime=Math.floor(Math.random()*(3000)+2000);
		this.wait(waittime, function() {});
	});
	casper.then(function(){
		this.capture(picdir+email+"loggined.png");
	});	
	
});	
	
casper.thenOpen(searchurl, function() {
	//search keywords
	this.echo(this.getTitle());
    this.echo("opening webpage: "+searchurl);
    
    casper.then(function() {
		this.sendKeys('.searchInp_form', keyword, true);
		this.click('.searchBtn');
	});
	casper.then(function () {
		this.echo("I've typed in the keyword.");
		waittime=Math.floor(Math.random()*(2000)+20000);
		this.wait(waittime, function() {});
	});
	casper.then(function(){
		this.capture(picdir+email+"keywordsearched.png");
	});
	
	//find top tweet and comment it
	casper.then(function(){
		this.click('.search_notes > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1) > span:nth-child(1)');
	});
	casper.then(function () {
		waittime=Math.floor(Math.random()*(1000)+30000);
		this.wait(waittime, function() {});
	});
	casper.then(function(){
		this.click('.search_notes > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1) > span:nth-child(1)');
	});
	casper.then(function () {
		waittime=Math.floor(Math.random()*(1000)+30000);
		this.wait(waittime, function() {});
	});
	casper.then(function(){
		this.echo("I've opened the commment thread: "+this.getCurrentUrl());
		this.capture(picdir+email+"showcomments.png");
		//this.echo(this.getCurrentUrl());
	});
	casper.then(function(){
		this.sendKeys('div.WB_publish:nth-child(2) > div:nth-child(1) > textarea:nth-child(1)', comment, true);
	});
	casper.then(function () {
		waittime=Math.floor(Math.random()*(1000)+20000);
		this.wait(waittime, function() {});
	});
	casper.then(function(){
		this.echo("I've commented.");
		this.capture(picdir+email+"trytocomment.png");
	});
	casper.then(function(){
		this.click('div.WB_publish:nth-child(2) > div:nth-child(2) > div:nth-child(1) > a:nth-child(1)');
	});
	casper.then(function () {
		waittime=Math.floor(Math.random()*(1000)+20000);
		this.wait(waittime, function() {});
	});
	casper.then(function(){
		this.capture(picdir+email+"commented.png");
	});
	
	
});
casper.run(function() {
    this.exit();
});