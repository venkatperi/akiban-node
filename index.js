/**
 * Akiban nodejs client for the REST api
 * @see https://akiban.readthedocs.org/en/latest/service/restapireference.html
 * @module akiban-node
 */
module.exports = {
  /**
   * Sql endpoint
   */
  Sql : require( './src/main/js/sql' ),

  /**
   * Version endpoint
   */
  Version : require( './src/main/js/version' )
};