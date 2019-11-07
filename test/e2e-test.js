require('chromedriver');
const webdriver = require('selenium-webdriver');
const {
    By,
    until
} = webdriver;

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;
const driver = new webdriver.Builder().forBrowser('chrome').build();
describe('End to End Test Suite', function(){
    
    before(function (done) {
        console.log('Before everything login to the page');
        driver.get('http://localhost:3000')
        .then(function (res) {
            driver.wait(until.titleIs('Passport Authentication')).then(() => {
                done();
            });
        });
    });
    after(function(){
        return driver.quit();
    });
    it('can create a new account', async function(){

        await driver.findElement(By.id('email-input')).sendKeys('megatron@gmail.com')
        await driver.findElement(By.id('password-input')).sendKeys('123')
        await driver.findElement(By.className("btn")).click()
        return driver.wait(until.elementLocated(By.className('member-name'))).then(async () => {
            const memberName = await driver.findElement(By.className('member-name')).getAttribute('innerHTML');
            expect(memberName).to.equal("megatron@gmail.com")
            driver.findElement(By.className("navbar-brand")).click()
          
        });
    });
    it('can login to account', async function(){
        await driver.wait(until.elementLocated(By.className('signup')))
        await driver.get('http://localhost:3000/login');
        await driver.findElement(By.id('email-input')).sendKeys('megatron@gmail.com')
        await driver.findElement(By.id('password-input')).sendKeys('123')
        await driver.findElement(By.className("btn")).click()
        return driver.wait(until.elementLocated(By.className('member-name'))).then(async () => {
            const memberName = await driver.findElement(By.className('member-name')).getAttribute('innerHTML');
            expect(memberName).to.equal("megatron@gmail.com")
            driver.findElement(By.className("navbar-brand")).click()
        });
    });
});