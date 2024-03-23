//Here you will import route files and export them as used in previous labs
import venues from './venues.js';

const constructorMethod = (app) => {
  app.use('/', venues);
  app.use('*', (req, res) => {
    res.status(404).render('error',{ ErrOutput:'Not found'})
  });
};

export default constructorMethod;
