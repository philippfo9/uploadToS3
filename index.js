let AWS = require('aws-sdk'),
    fs = require('fs'),
    file = "",
    bucket = "";

uploadFile(file);

function uploadFile(file) {
    fs.readFile("../"+file, function (err, data) {
        if (err) { throw err; }

        var base64data = new Buffer(data, 'binary');

        var s3 = new AWS.S3({
            httpOptions: {
                timeout: 5000000
            }
        });
        var params = {
            Body: base64data,
            Bucket: bucket,
            Key: "benutzer-"+file,
            ServerSideEncryption: "AES256",
            ACL: 'public-read'
        };
        s3.putObject(params, function(err, data) {
            if (err) console.log("err", err, err.stack); // an error occurred
            else     console.log("success", data);           // successful response
        }).on('httpUploadProgress', function (progress) {
                      console.log(progress);       });

    });
}


