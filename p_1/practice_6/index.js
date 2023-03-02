const {sorting,DeepClone} = require("./library")
// abiturs_csv = require("./csv/abiturs.csv")
abiturs_json = require("./json/abiturs.json")
clients = require("./json/clients.json")
users = require("./json/users.json")

sorting(clients)
// DeepClone(clients)