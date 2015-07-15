/**
 * Copyright 2013-present NightWorld.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var mysql = require('mysql'),
  model = module.exports,
  connString = {
    host: 'localhost',
    user: 'root',
    password:'786ab786',
    database: 'sms'
};

/*
 * Required
 */

model.getAccessToken = function (bearerToken, callback) {
    var client = mysql.createConnection(connString);
  client.connect( function (err) {
    if (err) return callback(err);
    client.query('SELECT access_token, client_id, expires, user_id FROM oauth_access_tokens ' +
        'WHERE access_token = ?', [bearerToken], function (err, result) {
      if (err || !result.length) return callback(err);
      // This object will be exposed in req.oauth.token
      // The user_id field will be exposed in req.user (req.user = { id: "..." }) however if
      // an explicit user object is included (token.user, must include id) it will be exposed
      // in req.user instead
      var token = result[0];
      callback(null, {
        accessToken: token.access_token,
        clientId: token.client_id,
        expires: token.expires,
        userId: token.userId
      });
    });
  });
};

model.getClient = function (clientId, clientSecret, callback) {
    var client = mysql.createConnection(connString);
  client.connect(function (err) {
    if (err) return callback(err);

    client.query('SELECT client_id, client_secret, redirect_uri FROM oauth_clients WHERE ' +
      'client_id = ?', [clientId], function (err, result) {
      if (err || !result.length) return callback(err);

      var client = result[0];

      if (clientSecret !== null && client.client_secret !== clientSecret) return callback();

      // This object will be exposed in req.oauth.client
      callback(null, {
        clientId: client.client_id,
        clientSecret: client.client_secret
      });
    });
  });
};

model.getRefreshToken = function (bearerToken, callback) {
   var client = mysql.createConnection(connString);
  client.connect(function (err) {
    if (err) return callback(err);
    client.query('SELECT refresh_token, client_id, expires, user_id FROM oauth_refresh_tokens ' +
        'WHERE refresh_token = ?', [bearerToken], function (err, result) {
      // The returned user_id will be exposed in req.user.id
      callback(err, result.length ? result[0] : false);
    });
  });
};

// This will very much depend on your setup, I wouldn't advise doing anything exactly like this but
// it gives an example of how to use the method to resrict certain grant types
var authorizedClientIds = ['abc1', 'def2'];
model.grantTypeAllowed = function (clientId, grantType, callback) {
  if (grantType === 'password') {
    return callback(false, authorizedClientIds.indexOf(clientId.toLowerCase()) >= 0);
  }

  callback(false, true);
};

model.saveAccessToken = function (accessToken, clientId, expires, userId, callback) {
     var client = mysql.createConnection(connString);
  client.connect(function (err) {
    if (err) return callback(err);
   q = client.query('INSERT INTO oauth_access_tokens(access_token, client_id, user_id, expires) ' +
        'VALUES (?, ?, ?, ?)', [accessToken, clientId, userId, expires],
        function (err, result) {
console.log(err)
callback(err);
    });
    console.log(q.sql)
  });
};

model.saveRefreshToken = function (refreshToken, clientId, expires, userId, callback) {
     var client = mysql.createConnection(connString);
  client.connect(function (err) {
    if (err) return callback(err);
    client.query('INSERT INTO oauth_refresh_tokens(refresh_token, client_id, user_id, ' +
        'expires) VALUES (?, ?, ?, ?)', [refreshToken, clientId, userId, expires],
        function (err, result) {
      callback(err);
    });
  });
};

/*
 * Required to support password grant type
 */
model.getUser = function (username, password, callback) {
     var client = mysql.createConnection(connString);
  client.connect(function (err) {
    if (err) return callback(err);
    client.query('SELECT id FROM users WHERE username = ? AND password = ?', [username,
        password], function (err, result) {
      callback(err, result.length ? result[0].id : false);
    });
  });
};