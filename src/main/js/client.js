/**
 * Https client wrapper for Akiban REST API
 * @module akiban-node/client
 *
 * @typedef {object} Promise
 */
var EventEmitter = require( 'events' ).EventEmitter;
var util = require( 'util' );
var https = require( 'https' );
var url = require( 'url' );
var Q = require( 'q' );
var defaults = require( './defaults' );

/**
 * @constructor
 * @param config
 * @param {string} config.username
 * @param {string} config.password
 * @param {string} [config.host="db1.akiban.com"]
 * @param {string} [config.port=443]
 * @param {string} [config.encoding="utf8"]
 */
var Client = function ( config ) {
  EventEmitter.call( this );

  config = config || {};
  if ( typeof config.username === 'undefined' ) {
    throw new TypeError( 'username is undefined' );
  }

  if ( typeof config.password === 'undefined' ) {
    throw new TypeError( 'password is undefined' );
  }

  this.config = {
    apiVersion : config.apiVersion || defaults.apiVersion,
    user : config.username,
    port : config.port || defaults.port,
    host : config.host || defaults.host,
    rejectUnauthorized : config.rejectUnauthorized || false,
    password : config.password,
    encoding : config.encoding || 'utf8'
  };
};

util.inherits( Client, EventEmitter );
var p = Client.prototype;

var agent;

/**
 *
 * @param resource
 * @param query
 * @param body
 * @param method
 * @returns {object} Promise which resolves with JSON response from server or rejected either with
 * <ul><li>{@see Error} - for connection or protocol errors</li>
 * <li>JSON object with error code and message</li>
 * @instance
 * @public
 */
p.request = function ( resource, query, body, method ) {
  var defer = Q.defer();

  var options = {
    encoding : this.config.encoding || 'utf8',
    host : this.config.host,
    rejectUnauthorized : this.config.rejectUnauthorized,
    port : this.config.port,
    method : method || 'GET',
    path : [this.config.apiVersion, '/', resource].join( '' ),
    headers : {
      'Authorization' : 'Basic ' + new Buffer( this.config.user + ':' + this.config.password ).toString( 'base64' )
    }
  };

  options.agent = options.agent || agent || (agent = new https.Agent( options ));

  if ( query ) {
    options.path += '?' + query;
  }

  var req = https.request( options,function ( res ) {
    var data = "";
    res.setEncoding( options.encoding );

    res.on( 'data', function ( d ) {
      data += d;
    } );

    var done = function () {
      var d = JSON.parse( data );
      if ( d.code ) {
        defer.reject( d );
      }
      else {
        defer.resolve( d );
      }
    };
    res.on( 'end', done );
    res.on( 'close', done );
  } ).on( 'error', function ( e ) {
        console.log( e );
        defer.reject( e );
      } );

  if ( body ) {
    req.write( body );
  }

  req.end();

  return defer.promise;
};

module.exports = Client;
