export const AUTH_ACCESS_TOKEN = 'access_token';
export const INVITATION_TOKEN = 'invitation_token';
export const AUTH_LOGIN_PATH = '/login';
export const AUTHENTICATED_ENTRY = '/app/dashboard';
export const PROJECT_POSITIONS = [
    'Designer',
    'Developer',
    'DevOps',
    'Manager'
]

export const DEVICES = [
    {
        name: 'iPhone SE',
        width: 375,
        height: 667
    },
    {
        name: 'iPhone XR',
        width: 414,
        height: 896
    },
    {
        name: 'iPhone 12 Pro',
        width: 390,
        height: 844
    },
    {
        name: 'iPhone 14 Pro Max',
        width: 430,
        height: 932
    },
    {
        name: 'Samsung Galaxy S8',
        width: 360,
        height: 740
    },
    {
        name: 'Samsung Galaxy S20 Ultra',
        width: 412,
        height: 915
    },
]

export const API_BASE_URL = 'http://localhost:8080'
export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
// export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;