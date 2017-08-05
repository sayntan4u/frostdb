var fs = require('fs');
var Data = require('./data-model.js');

//global
dbpath = "./fr-main/db/";
data = new Data();

//helper for creating DB
function _makeDB(name) {
    var dir = dbpath + name;
    fs.mkdir(dir, function (err) {
        if (err) {
            return console.error(err);
        }
        fs.open(dir + "/dbconfig.json", 'w+', function (err, fd) {
            if (err) {
                return console.error(err);
            }
            var dbconfig = '{ "dbname" : "' + name + '", "collection_count" : 0,"collections":[] }';

            fs.writeFile(dir + "/dbconfig.json", dbconfig, function (err) {
                if (err) {
                    return console.error(err);
                }
            });
        });
    });

}

//helper for dropping DB
function _deleteDB(name) {
    var self = arguments.callee
    var dir = dbpath + name;
    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach(function (file) {
            var C = dir + '/' + file
            if (fs.statSync(C).isDirectory()) self(C)
            else fs.unlinkSync(C)
        })
        fs.rmdirSync(dir)
    }
}



//main class
module.exports = class DBModel {

    //method to create new db
    createDB(name) {
        var res = data.readJson('db/mainconfig.json');
        console.log(res);

        if (this.nameExists(name, res) != 1) {
            res.count++;
            res.dbnames.push(name);
            _makeDB(name);
        }
        else {
            console.log("same name");
            return 0;

        }


        console.log(res);
        console.log(data.updateJson('db/mainconfig.json', res));
    }

    dropDB(name) {
        var res = data.readJson('db/mainconfig.json');
        console.log(res);
        if (res.count > 0 && this.nameExists(name, res) == 1) {
            res.count--;
            var index = res.dbnames.indexOf(name);
            res.dbnames.splice(index, 1);
            _deleteDB(name);
        }
        else {
            console.log("no db found");
            return 0;
        }

        console.log(res);
        return data.updateJson('db/mainconfig.json', res);

    }

    nameExists(name, json) {
        if (json.dbnames.indexOf(name) > -1) {
            return 1;
        }
        else {
            return 0;
        }
    }
}