const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

export const auth = {
  authenticate,
  cookieName: 'adminjs',
  cookiePassword: 'secret',
};

export const sessionOptions = {
  resave: true,
  // saveUninitialized: true,
  secret: 'secret',
};

export const branding = {
  companyName: 'OneBitFlix',
  logo: '/adxfull.png',
  theme: {
    colors: {
      primary100: '#28ABE2',
      primary80: '#0d04ec',
      primary60: '#0902dd',
      primary40: '#0401cd',
      primary20: '#0000be',
      grey100: '#151515',
      grey80: '#333333',
      grey60: '#4d4d4d',
      grey40: '#666666',
      grey20: '#dddddd',
      filterBg: '#333333',
      accent: '#151515',
      hoverBg: '#151515',
      // background color page de login black
      background: '#151515',
    },
  },
};
