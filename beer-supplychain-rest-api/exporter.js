
/*
# Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
# 
*/

//customizing variables. 
var APIGWURL = ""; // insert your API GW endpoint (ex.https://ghddibof0a.execute-api.us-east-1.amazonaws.com/v1/transaction/message)


var util = require('util');
var request = require('request');
var helper = require('./connection.js');
var logger = helper.getLogger('Export');

var exportTransactionData = async function(message) {
	try {
		logger.info('============ START exportTransactionData');
		request({
			url: APIGWURL,
			method: "POST",
			timeout: 5000,
			headers: { "content-type": "application/json" },
			json: message
		}, function(err, res, body) {
			logger.info('## StatusCode : ' + res.statusCode);
		});
	
	} catch(error) {
		logger.error('##### exportTransactionData - Failed to export due to error: ' + error.stack ? error.stack : error);
                return error.toString();
	}
}

exports.exportTransactionData = exportTransactionData;

