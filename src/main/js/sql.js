/**
 * Akiban Nodejs SQL Resources
 * @module akiban-node/sql
 */
var Client = require( './client' );
var querystring = require( "querystring" );

/**
 * @constructor
 * @param config
 */
var Sql = function ( config ) {
  /**
   * @type {Client}
   */
  this.client = new Client( config );
};

var p = Sql.prototype;

/**
 * Run a single SQL statement. Successful response is a JSON array results.
 * @param {string} q - the query. Trailing semicolons will be removed.
 * @returns {object} Promise
 * @instance
 */
p.query = function ( q ) {
  var l = q.length;
  while ( l && q[l - 1] === ';' ) {
    q = q.substr( 0, l - 1 );
  }

  return this.client.request( 'sql/query', querystring.stringify( {q : q} ) );
};

/**
 * Run a single SQL statement. Successful response is a JSON array results.
 * @param {string} q - the query
 * @returns {object} Promise
 * @instance
 */
p.explain = function ( q ) {
  return this.client.request( 'sql/explain', querystring.stringify( {q : q} ) );
};

/**
 * Execute multiple SQL statements within a single transaction. Individual statements can be free-form
 * and must be separated by semicolons (;). Successful response is a JSON object with one field per statement
 * executed.
 * @param {string} q - the SQL statements
 * @returns {object} Promise
 * @instance
 */
p.execute = function ( q ) {
  return this.client.request( 'sql/execute', null, q, 'POST' );
};

module.exports = Sql;
