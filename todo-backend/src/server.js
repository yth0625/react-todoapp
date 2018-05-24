import express from 'express';

import db from './database';
import router from './router';

const app = express();
app.use(express.json());
router(app);

const port =  process.env['TODO_PORT'] || 5556;
app.listen(port, ( ) => { console.log('app listening on port ' + port );});

db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1);  
    });