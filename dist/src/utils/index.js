"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countBooyar = exports.somePoints = void 0;
const tablePoints_1 = require("../helpers/tablePoints");
function somePoints(positions) {
    let points = 0;
    positions.forEach((position) => {
        Object.entries(tablePoints_1.tablePoints).forEach(([key, value]) => {
            if (position === +key)
                points += value;
        });
    });
    return points;
}
exports.somePoints = somePoints;
function countBooyar(positions, booyars) {
    const some = booyars + positions.filter((position) => position === 1).length;
    return some;
}
exports.countBooyar = countBooyar;
