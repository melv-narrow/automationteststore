import { faker } from '@faker-js/faker';
import type { RegistrationData } from '../../pages/RegistrationPage';

// Map of US states to their zone IDs in the automation test store
const stateZoneIds: { [key: string]: string } = {
    'California': '3613',
    'Florida': '3618',
    'New York': '3635',
    'Texas': '3644'
};

export const generateRegistrationData = (): RegistrationData => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const state = faker.helpers.arrayElement(Object.keys(stateZoneIds));
    
    return {
        firstName,
        lastName,
        email: faker.internet.email({ firstName, lastName }),
        telephone: faker.phone.number(),
        company: faker.company.name(),
        address1: faker.location.streetAddress(),
        city: faker.location.city(),
        zoneId: stateZoneIds[state],
        postcode: faker.location.zipCode(),
        loginName: faker.internet.username({ firstName, lastName }),
        password: faker.internet.password({ length: 12, memorable: true })
    };
};

export const testUsers = {
    defaultUser: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test.user@example.com',
        telephone: '123-456-7890',
        company: 'Test Company',
        address1: '123 Test St',
        city: 'Test City',
        zoneId: '3613', // California
        postcode: '12345',
        loginName: 'testuser',
        password: 'Password123!'
    } as RegistrationData,

    adminUser: {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        telephone: '123-456-7890',
        company: 'Admin Company',
        address1: '123 Admin St',
        city: 'Admin City',
        zoneId: '3618', // Florida
        postcode: '12345',
        loginName: 'adminuser',
        password: 'AdminPass123!'
    } as RegistrationData
};

export const generateUniqueEmail = (): string => {
    return faker.internet.email();
};

export const generateUniqueUsername = (): string => {
    return faker.internet.userName();
};

export const generateAddress = () => {
    const state = faker.helpers.arrayElement(Object.keys(stateZoneIds));
    return {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        zoneId: stateZoneIds[state],
        postcode: faker.location.zipCode()
    };
};

export const generatePaymentInfo = () => {
    return {
        cardNumber: faker.finance.creditCardNumber(),
        cardExpiry: faker.date.future().toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' }),
        cardCvv: faker.finance.creditCardCVV()
    };
};

export const generateProductReview = () => {
    return {
        rating: faker.number.int({ min: 1, max: 5 }),
        title: faker.lorem.sentence(),
        review: faker.lorem.paragraph(),
        author: faker.person.fullName()
    };
};
