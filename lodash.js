const obj1 = require('underscore')
const obj2 = require('lodash')




console.log(obj2.chunk(["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"], 4))
console.log(obj2.tail([1, 3, 5, 7, 9, 11, 13, 15, 17, 19]))
console.log(obj2.union([2], [1, 2], [5, 5, 15], [88, 15, 77], [77, 456, 123]))
console.log(obj2.fromPairs([
    ["Horror", "Stranger Things"],
    ["Drama", "Game of Thrones"],
    ["Thriller", "Squid Games"],
    ["Fantasy", "Lucifer"]
]))