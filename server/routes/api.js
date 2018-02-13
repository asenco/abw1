var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var fs = require('fs');
var NodeRSA = require('node-rsa');
var objectId = require('mongodb').ObjectID;

module.exports = function (app) {
  const secretKey = 'artwebsecret';
  const RSA_PRIVATE_KEY = fs.readFileSync(__dirname + '/../rsa-keys/id_rsa');
  const RSA_PUBLIC_KEY = fs.readFileSync(__dirname + '/../rsa-keys/id_rsa.pub');


  const generateKeys = function () {
    var key = new NodeRSA({ b: 512, e: 5 });

    key.setOptions({
      encryptionScheme: {
        scheme: 'pkcs1',
        label: 'Optimization-Service'
      },
      signingScheme: {
        saltLength: 25
      }
    });

    return {
      "private": key.exportKey('pkcs1-private-pem'),
      "public": key.exportKey('pkcs8-public-pem')
    };
  }

  var keys = generateKeys();


  const checkIfAuthenticated = expressJwt({
    secret: keys.public,
    algorithms: ['RS256']
  });

  app.post('/api/authenticate', (req, res) => {
    db.collection('user').findOne({ username: req.body.username, password: req.body.password }, function (err, doc) {
      console.log('err, docs:', err, doc);
      if (err || !doc) {
        res.status(200).send({});
      }
      else {
        const jwtBearerToken = jwt.sign({ _id: doc._id.toString() }, keys.private, {
          algorithm: 'RS256',
          expiresIn: 120
        });
        res.status(200).send({
          token: jwtBearerToken,
          expiresIn: 120
        });
      }
    })

  });


  app.get('/api/users', checkIfAuthenticated, function (req, res) {
    console.log('getting data!!');
    db.collection('user').find({}).toArray(function (err, docs) {
      console.log('err:', err, 'docs:', docs);
      res.send(docs);
    });
    //res.send('data!!');
  });

  app.get('/api/getCurrentUser', checkIfAuthenticated, function (req, res) {
    console.log('req.user._id:', req.user._id);
    db.collection('user').findOne({ _id: objectId(req.user._id) }, function (err, doc) {
      console.log('err, doc:', err, doc);
      if(err){
        res.send(null);
      }
      res.send(doc);
    });
  });

};