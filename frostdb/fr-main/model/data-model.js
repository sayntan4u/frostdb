var fs = require('fs');

//global path
path = "./fr-main/";

//main class
module.exports = class Data {

    //method to read json : JSON
    readJson(pathJson) {
        pathJson = path + pathJson;
        var json = JSON.parse(fs.readFileSync(pathJson).toString());
        return json;
    }

    //method to write to json : ERR_STRING or 1
    updateJson(pathJson, data) {
        pathJson = path + pathJson;
        if(this.isJSON(data)==1)
        {
            data=JSON.stringify(data);
        }

        fs.writeFile(pathJson, data, function (err) {
            if (err) {
                return console.error(err);
            }
        });

        return 1;
    }

    //method to check if object is JSON or not
    isJSON(obj) {
        if (typeof (obj) == "object") {
            return 1;
        }
        else {
            return 0;
        }
    }

    //test method
    test() {
        console.log("working");
    }
}