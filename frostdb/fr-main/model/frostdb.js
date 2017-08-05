var fs = require('fs');
var DB = require('./db-model.js');

//global
path = "./fr-main/";
db = new DB();

//main class
module.exports = class frostdb {
    hello() {
        //db.createDB("frost");
        db.dropDB("frost");
    }
}