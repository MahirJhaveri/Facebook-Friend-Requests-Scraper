
var puppeteer = require('puppeteer');
var cheerio = require('cheerio');
var get_requests = require('./helper.js').get_requests;


async function run(){
  const browser = await puppeteer.launch({headless : true}); //change headless to false to see the browser in action
  const page = await browser.newPage();
  const mouse = page.mouse;

  await page.goto('https://www.facebook.com/login/');

  const EMAIL_SELECTOR = '#email';
  const PASSWORD_SELECTOR = '#pass';
  const BUTTON_SELECTOR = '#loginbutton';
  const FRIEND_REQUEST_BUTTON = '#fbRequestsJewel > a.jewelButton._3eoa';
  const FR_DIV = "div.fbRequestList.hasPYMK";

  const EMAIL = 'mahir*****@gmail.com'; //replace with your facebook email id
  const PWD = 'abc*****'; //replace with your password

  await page.click(EMAIL_SELECTOR);
  await page.keyboard.type(EMAIL);

  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(PWD);

  await page.click(BUTTON_SELECTOR);

  await page.waitForNavigation();

  await page.click(FRIEND_REQUEST_BUTTON);

  await page.click(FRIEND_REQUEST_BUTTON);

  try{
    await page.waitForSelector(FR_DIV);
    var str = await page.content();
  }catch(err){
    console.log('error : ' + err);
  }

  var $ = cheerio.load(str);
  var data = $(FR_DIV).html()
  var friend_requests = get_requests(data);
  for(x in friend_requests){
    var person = friend_requests[x];
    console.log(person);
  }

  browser.close();
}

run();
