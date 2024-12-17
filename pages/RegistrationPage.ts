import { Page, expect } from '@playwright/test';

export interface RegistrationData {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    company: string;
    address1: string;
    city: string;
    zoneId: string;
    postcode: string;
    loginName: string;
    password: string;
}

export class RegistrationPage {
    readonly page: Page;
    
    // Locators
    private readonly createAccountText;
    private readonly firstNameInput;
    private readonly lastNameInput;
    private readonly emailInput;
    private readonly telephoneInput;
    private readonly companyInput;
    private readonly address1Input;
    private readonly cityInput;
    private readonly countrySelect;
    private readonly zoneSelect;
    private readonly postcodeInput;
    private readonly loginNameInput;
    private readonly passwordInput;
    private readonly confirmPasswordInput;
    private readonly agreeCheckbox;
    private readonly continueButton;

    constructor(page: Page) {
        this.page = page;
        
        // Initialize locators
        this.createAccountText = this.page.locator('#accountFrm').getByText('Register Account');
        this.firstNameInput = this.page.locator('#AccountFrm_firstname');
        this.lastNameInput = this.page.locator('#AccountFrm_lastname');
        this.emailInput = this.page.locator('#AccountFrm_email');
        this.telephoneInput = this.page.locator('#AccountFrm_telephone');
        this.companyInput = this.page.locator('#AccountFrm_company');
        this.address1Input = this.page.locator('#AccountFrm_address_1');
        this.cityInput = this.page.locator('#AccountFrm_city');
        this.countrySelect = this.page.locator('#AccountFrm_country_id');
        this.zoneSelect = this.page.locator('#AccountFrm_zone_id');
        this.postcodeInput = this.page.locator('#AccountFrm_postcode');
        this.loginNameInput = this.page.locator('#AccountFrm_loginname');
        this.passwordInput = this.page.locator('#AccountFrm_password');
        this.confirmPasswordInput = this.page.locator('#AccountFrm_confirm');
        this.agreeCheckbox = this.page.locator('#AccountFrm_agree');
        this.continueButton = this.page.getByRole('button', { name: ' Continue' });
    }

    // Assertions
    async expectRegistrationPageVisible() {
        await expect(this.createAccountText).toBeVisible();
        await this.continueButton.click();
    }

    // Actions
    async fillRegistrationForm(data: RegistrationData) {
        // Fill personal information
        await this.firstNameInput.fill(data.firstName);
        await this.lastNameInput.fill(data.lastName);
        await this.emailInput.fill(data.email);
        await this.telephoneInput.fill(data.telephone);
        
        // Fill address information
        await this.companyInput.fill(data.company);
        await this.address1Input.fill(data.address1);
        await this.cityInput.fill(data.city);
        
        // Handle country and zone selection
        await this.countrySelect.selectOption('223'); // United States
        await this.page.waitForTimeout(1000); // Wait for zones to load
        await this.zoneSelect.selectOption(data.zoneId);
        
        await this.postcodeInput.fill(data.postcode);
        
        // Fill login information
        await this.loginNameInput.fill(data.loginName);
        await this.passwordInput.fill(data.password);
        await this.confirmPasswordInput.fill(data.password);
        
        // Accept terms and submit
        await this.agreeCheckbox.check();
        await this.continueButton.click();
    }
}
