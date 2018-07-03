var AWS = require('aws-sdk'),
    fs = require('fs');

var file = "win32/latest.yml";
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
            Bucket: "orderstar-release",
            Key: "benutzer-"+file,
            ServerSideEncryption: "AES256",
            ACL: 'public-read'
        };
        s3.putObject(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
            /*
            data = {
             ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"",
             ServerSideEncryption: "AES256",
             VersionId: "Ri.vC6qVlA4dEnjgRV4ZHsHoFIjqEMNt"
            }
            */
        }).on('httpUploadProgress', function (progress) {
                      console.log(progress);       });

    });
}


