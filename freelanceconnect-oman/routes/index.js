const express = require('express');
module.exports = (users) => {
  const router = express.Router();

  router.get('/', (req, res) => res.render('index'));
  router.get('/login', (req, res) => res.render('login'));
  router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) { req.session.user = user; res.redirect('/'); } else { res.send('Invalid credentials'); }
  });
  router.get('/signup', (req, res) => res.render('signup'));
  router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    users.push({ name, email, password });
    res.redirect('/login');
  });
  router.get('/logout', (req, res) => req.session.destroy(() => res.redirect('/')));
  return router;
};