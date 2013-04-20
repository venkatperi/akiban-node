/**
 * Akiban Nodejs SQL Resources
 * @module akiban-node/version
 */
var Client = require( './client' );

/**
 * @param config
 * @constructor
 */
var Version = function ( config ) {
  /**
   * @type {Client}
   */
  this.client = new Client( config );
};

var p = Version.prototype;

/**
 * Successful response contains a single JSON array with a single object containing the name and version of the
 * Akiban Server.
 * @returns {object} Promise
 * @instance
 */
p.version = function () {
  return this.client.request( 'version' );
};

module.exports = Version;
