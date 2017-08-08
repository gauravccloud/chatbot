var azure = require('azure-storage');
var uuid = require('node-uuid');
var express = require('express');
var entityGen = azure.TableUtilities.entityGenerator;
var nconf = require('nconf');
nconf.env().file({ file: 'config.json', search: true});
var TaskList = require('./routes/tasklist');



var app = express();

var tableName = nconf.get("TABLE_NAME");
var accountName = nconf.get("STORAGE_NAME");
var accountKey = nconf.get("STORAGE_KEY");
var partitionKey = nconf.get("PARTITION_KEY");

console.log("NGCONFIS",tableName,accountName,accountKey,partitionKey)

var Task = require('./models/task');
var task = new Task(azure.createTableService(accountName, accountKey), tableName, partitionKey);
console.log("Task is",task)
var taskList = new TaskList(task);


app.get('/', taskList.showTasks.bind(taskList));
app.post('/addtask', taskList.addTask.bind(taskList));
app.post('/completetask', taskList.completeTask.bind(taskList));


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
