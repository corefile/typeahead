var express = require('express');
var router = express.Router();

const projectId = 'betterbuy-212518';
const Datastore = require('@google-cloud/datastore');
const datastore = Datastore();
/* GET data from google datastore */
router.get('/', function(req, res, next) {
    const query = datastore
        .createQuery('SKU')
        .filter('name', '>=', req.query.q)
        .limit(5)
        .order('name', {
            descending: false,
        });
    var items = [];
    datastore.runQuery(query).then(results => {
        recData = results[0];
        recData.forEach(rData => items.push(rData.name));
        // console.log(items);
        res.json(items);
    });
});

module.exports = router;
