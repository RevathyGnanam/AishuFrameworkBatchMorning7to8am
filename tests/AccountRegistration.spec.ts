import {test,expect} from '@playwright/test'
import {TestConfig} from '../test.config'
import {RegistrationPage}  from '../pages/RegistrationPage';
import {Homepage}  from '../pages/HomePage';
import {RandomDataUtil} from '../utils/randamDataGenerator';


let config:TestConfig;
 let regpage:RegistrationPage;
 let homepage:Homepage;

test.beforeEach(async ({page})=>{
 config=new TestConfig();
 await page.goto(config.appurl); //navigation to the app url
 homepage = new Homepage(page);
 regpage =new RegistrationPage(page);
})

test.afterEach (async ({page})=>{
    await page.waitForTimeout(5000);
    await page.close();

})

test('@master',async({page})=>{

     //Go to 'My Account' and click 'Register'
     await homepage.clickMyAccount();
     await homepage.clickRegister();

     //fill the registration details
     await regpage.setFirstName(RandomDataUtil.getFirstName())
     await regpage.setLastName(RandomDataUtil.getlastName())
     await regpage.setEmail(RandomDataUtil.getEmail())
     await regpage.setTelephone(RandomDataUtil.getPhoneNumber())

     const password = RandomDataUtil.getPassword()

      await regpage.setPassword(password)
       await regpage.setConfirmPassword(password)

       await regpage.setPrivacyPolicy();
       await regpage.clickContinue()

       //validate the confirmation message

       const confirmMsg = await regpage.getConfirmationMsg();
       console.log(confirmMsg)

       expect(confirmMsg).toContain('Your Account Has Been Created!')

       
     
     








})




