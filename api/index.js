const EXPRESS = require('express');
const MainAPI = EXPRESS();

MainAPI.use(require('./AccountAPI.js').AccountsAPI);
MainAPI.use(require('./BlogpostAPI.js').BlogpostAPI);

MainAPI.listen(8000, function () {
    console.log('listening on port 8000');
});