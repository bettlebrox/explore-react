import { defineAuth, secret } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),
        scopes: ['email', 'profile', 'openid'],
        attributeMapping: {
          email: 'email',
          familyName: 'family_name',
          givenName: 'given_name',
          birthdate: 'birthdate',
          phoneNumber: 'phone_number',
        },
      },
      callbackUrls: [
        'http://localhost:5174/',
        'https://main.d1tgde1goqkt1z.amplifyapp.com/',
        'chrome-extension://inngbfkedplilfmhecbohfcnplcjpgnk/',
      ],
      logoutUrls: [
        'http://localhost:5174/',
        'https://main.d1tgde1goqkt1z.amplifyapp.com/',
        'chrome-extension://inngbfkedplilfmhecbohfcnplcjpgnk/sidepanel.html',
      ],
    },
  },
  userAttributes: {
    birthdate: {
      mutable: false,
    },
    givenName: {
      mutable: true,
    },
    familyName: {
      mutable: true,
    },
    phoneNumber: {
      mutable: true,
    },
  },
});
