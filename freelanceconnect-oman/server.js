const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

const users = [];
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'khidmatee-secret', resave: false, saveUninitialized: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const translations = {
  en: { welcome: 'Welcome to Khidmatee', switchLang: 'العربية' },
  ar: { welcome: 'مرحبًا بكم في خدمتي', switchLang: 'English' }
};

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.lang = req.session.lang || 'en';
  res.locals.t = translations[res.locals.lang];
  next();
});

app.get('/lang/:lang', (req, res) => {
  req.session.lang = req.params.lang === 'ar' ? 'ar' : 'en';
  res.redirect('back');
});

const indexRouter = require('./routes/index')(users);
app.use('/', indexRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running on port ${port}`));