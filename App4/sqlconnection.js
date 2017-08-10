var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Create connection to database
var config =
   {
     userName: 'jiffybots',
     password: 'abcd1234$',
     server: 'ocbotdata.database.windows.net',
     options:
        {
           database: 'OlympediaV2',
           encrypt: true
        }
   }
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err)
   {
     if (err)
       {
          console.log(err)
       }
    else
       {
           console.log("Connected");
           executeStatement();
       }
   }
 );

    function executeStatement() {
        request = new Request("SELECT * FROM athletes", function(err) {
        if (err) {
            console.log(err);}
        });
        var result = "";
        request.on('row', function(columns) {
            //console.log(columns);
            columns.forEach(function(column) {
              if (column.value === null) {
              //  console.log('NULL');
              } else {
                result+= column.value + " ";
              }
            });
            //console.log(result);
            result ="";
        });

        request.on('done', function(rowCount, more) {
        console.log(rowCount + ' rows returned');
        });
        connection.execSql(request);
    }
