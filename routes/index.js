var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Merging' });
});

router.post('/search', 
  function(req, res, next) {
    if (req.body && req.body.searchTerm && toString.call(req.body.searchTerm) == '[object String]') {
      next();
    }
    else {
      res.status(400).send({ status: "error", reason: "Empty String or passed value is not a string" });
    }
  },
  function(req, res) {
    var products = require(rootdir + "/schemas/products")
    var searchTerm = req.body.searchTerm
    products.find({ name: searchTerm }).lean(true).exec( function(err,data) {
      if (err) {
        console.error(err);
        res.render('listGroup', { data: [] });
      }
      else {
        debugger
        if (data.length >= 0) {
          var rawMaterials = []
          for (var i = 0; i < data.length; i++) {
            rawMaterials = rawMaterials.concat(data[i].raw_materials)
          };
          res.render('listGroup', { data: rawMaterials  });
        }
        else {
          res.render('listGroup', { data: [] });
        }
      }
    })
  }
);

module.exports = router;
