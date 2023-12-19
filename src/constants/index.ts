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
export const DEFAULT_WIDTH = 320;
export const DEFAULT_HEIGHT = 650;

export const API_BASE_URL = 'http://localhost:8080'
export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
// export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;

export const ViewType = {
    Container: "Container",
    Label: "Label",
    Text: "Text",
    Image: "Image",
    Button: "Button"
};