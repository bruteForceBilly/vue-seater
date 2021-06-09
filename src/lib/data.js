import Layout from "./layout.js";

const sections = Layout.sections.reduce((acc, cv) => {
    acc[cv.name] = [];
    for (const row of cv.rows) {
        row.seats.sort((a, b) => a.seat - b.seat).forEach((seat, i) => {  
            acc[cv.name].push({
                id: i + 1,
                rank: seat.rank,
                rowNumber: row.row,
                seatNumber: seat.seat,
                sectionName: cv.name,
            })
        })
    }
    return acc;
}, {})

// 10 x 10 grid
const vertices = [[0,0],[9,0],[9,9],[0,9]]

const sortVertices = function(verticesArray) {
    
    let points = verticesArray.map(v => {
        let [x, y] = v;
        return {x: x, y: y}
    })

    const center = points.reduce((acc, { x, y }) => {
        acc.x += x / points.length;
        acc.y += y / points.length;
        return acc;
    }, { x: 0, y: 0 });

    const angles = points.map(({ x, y }) => {
        return { x, y, angle: Math.atan2(y - center.y, x - center.x) * 180 / Math.PI };
    });

    const pointsSorted = angles.sort((a, b) => a.angle - b.angle);

    return pointsSorted.map(cv => {
        const {x, y} = cv;
        return [x, y]
    }) 
}

const sortedVertices = sortVertices(vertices);

const calcDiffRange = function(a, b){
    let diff = Math.abs(a - b);
    if(!diff) return null;    
    let range = [];
    for (let i = 0; i <= diff; i++) {
        range.push(i);
    }
    return range
}

const getScalarsPerAxis = function(axis, vertices){
    return vertices.map(v => {
        let [x, y] = v;
        return axis === "x" ? x : y;
    })
}

const getDiffRange = function(arr){
    return  arr.reduce((acc, next, i, arr) => {
                if(i > 0) {        
                    let prev = arr[i - 1];
                    let axis = calcDiffRange(prev, next);
                    acc.push(axis)
                }
            return acc;
    }, [])
}

// const setDiffRange = function(scalars){
//     return scalars.reduce((prev, next, i, src) => {
        
//         if(prev && prev[prev.length -1] === next) {
//             prev.push(null)
//         } else {
//             prev.push(next)
//         }

//         return prev
//     }, [])
// }

// setDiffRange(x)
// sortedVertices

// let aaa = getScalarsPerAxis("x", sortedVertices)


// let bbb = getDiffRange(getScalarsPerAxis("x", sortedVertices))


const setDiffRange = function(diffRange){
    // loop over 
    return diffRange.reduce((acc, cv, i, src) => {
        if(cv === null) {
            if(src[i - 1]) {
                let prev = src[i - 1]; 
                acc.push(prev.map(el => el = prev[prev.length -1]))
            } else {
                let next = src[i + 1]
                acc.push(next.map(el => el = 0))
            }
        } else {
            acc.push(cv)
        }
        return acc
    }, []) 
}


  // let x = minX === maxX ? [minX] : genSpan(minX, maxX);
    // let y = minY === maxY ? [minY] : genSpan(minY, maxY);


    // if(x.length > y.length) {
    //     y = new Array(x.length).fill(y[0])
    // } 
    
    // if (x.length < y.length) {
    //     x = new Array(y.length).fill(y[0])
    // }

    // let result = [];
    
    // for (let i=0; i<x.length; i++) {
    //     result.push([x[i], y[i]]);
    // }


const genRange = (min, max) => {
    // gen range starting from min to ending and including max
    return [...new Array(Math.abs(min - (max + 1)))].map((cv, i) => min + i)
}

const genSpan = (a, b) => {
    // gen range from a to b
    if(a === b) return null;

    if(a < b) {
        return [...new Array(Math.abs(a - (b + 1)))].map((cv, i) => a + i)
    } else {
        return [...new Array(Math.abs(b - (a + 1)))].map((cv, i, arr) => b + i).reverse();
    }
}

const genRangeTuplet = function(a, b) {
    // we should be able to handle asc / desc range
    let [ aX, aY] = a;
    let [ bX, bY] = b;
    let x, y;

    if(aX === bX){
        x = [aX]
    } else {
        x = genSpan(aX, bX)
    }

    if(aY === bY){
        y = [aY]
    } else {
        y = genSpan(aY, bY)
    }


    if(x.length > y.length) {
        y = new Array(x.length).fill(y[0])
    } 

    if (x.length < y.length) {
        x = new Array(y.length).fill(x[0])
    }

    
    let result = [];
    
    for (let i=0; i<x.length; i++) {
        result.push([x[i], y[i]]);
    }
    
    return result        
} 

genRangeTuplet([9,9], [9,0])


sortedVertices

let [topLeft, topRight, bottomRight, bottomLeft] = sortedVertices;

let leftVertical = genRangeTuplet(topLeft, bottomLeft); 
let rightVertical = genRangeTuplet(topRight, bottomRight); 

let firstRow = genRangeTuplet(leftVertical[0], rightVertical[0])

let rows = leftVertical.reduce((acc, cv, i) => {
    acc = [...acc, genRangeTuplet(cv, rightVertical[i])]
    return acc
}, [])






//let genMatrix = (n) => Array(n).fill(0).map(x => Array(n).fill(0))

// const orka = sortedVertices.reduce((prev, next, i, src) => {  
//     if(i > 0) {
//         let prevTuplet = prev[prev.length -1]
//         prev = [ ...prev, ...genRangeTuplet(prevTuplet, next)]
//     } else {
//         prev.push(next)
//     }
//     return prev
// }, [])





let xAxis = setDiffRange(getDiffRange(getScalarsPerAxis("x", sortedVertices)));
let yAxis = setDiffRange(getDiffRange(getScalarsPerAxis("y", sortedVertices)));


const groupAxisInTuplets = function(xAx, yAx){
    let result = [];
    for (let i=0; i<xAx.length; i++) {
        result.push([xAx[i], yAx[i]]);
    }
    
    return result
}

let tuplets = xAxis.reduce((acc, cv, i) => {
    acc.push(groupAxisInTuplets(cv, yAxis[i]));
    return acc;
}, [])

let topLeftToTopRight = tuplets[0]

let topRightToBottomLeft = tuplets[1]

let bottomLeftToBottomRight = tuplets[2]

// topLeftToBottomLeft


//xAxis
//yAxis

//sortedVertices

//let topLeftToTopRight = test[0]

//let topRightToBottomLeft = test[1]

//let bottomLeftToBottomRight = test[2]





// console.log(test[1])

// console.log(test[2])










// const oldDummy = sortedVertices.reduce((acc, next, i, arr) => {
//     let [nX, nY] = next;

//     if(i > 0) {        
//         let prev = arr[i - 1];
//         let [pX, pY] = prev;
//         let xAxis = getDiffRange(pX, nX);
//         //console.log(pX, nX)
//         //let yAxis = getDiffRange(pY, nY)
//         acc.push(xAxis)
//         //acc.push(yAxis)
//     }

//     acc

//     // i > 0 && acc.length && acc[acc.length - 1] === null
//     // if(i > 0 && acc.length > 2 && acc.includes(null)) {                 
//     //     // find index of first null
//     //     //let nullIndexes = acc.map((el, i) => el === null ? i : false).filter(el => el)        

//     // }

//     return acc;
// }, [])


        // pick prev arr that is 2 steps back from null
        
        // map prev
        
        
        //let prev = acc[acc.length - 2]
        //let mapped = prev.map(el => el = prev[prev.length -1]);
        //acc.splice(-1, 1, prev.map(el => el = prev[prev.length -1]));

    // if all values in acc is null throw then error, because you do not have an area


//sortedVertices

//dummy

// get diff between each el.x 
/*
If theres an diff between any scalar in vertex, render out each diff

[0,0]                [10, 0]
[1,0] [2,0] [3,0] [4,0] [5,0] [6,0]            

[10, 0]                                        [10, 10]
[10, 0] [10, 1] [10, 2] [10, 3] [10, 4] [10, 5]

[10, 10]                                        [0,7]
[10, 10] [9, 9] [8, 8] [7, 7] [6, 7] [5, 7] [4, 7] [3, 7] [2, 7] [1, 7] [0, 7]   

if prev el is lower than next, then add to count up

if prev el is higher than next, then subtract to count down

if one scalar of cv has reach next, but the other has not, then continue counting for only one of them





10
10
10
10






*/





// top-left to top-right, 

// top-right to bottom-right, 

// bottom-right to bottom-left, 


// top-left, bottom-right 

// take the y from bottom-right

// and loop top-left to top - y

/*
let topLeft = sortedVertices[0];
let bottomRight = sortedVertices[sortedVertices.length - 1];

let [tRx, tRy, bLx, bLy] = [...sortedVertices[0], ...sortedVertices[sortedVertices.length - 1]]

let top = range(tRx, bLy + 1)

let genRange = (min, max) => {
    return [...new Array(Math.abs(min - (max + 1)))].map((cv, i) => min + i)
}

let d = genRange(tRx, bLy);

sortedVertices

let bla = sortedVertices.reduce((prev, next, i, src) => {
    let [topRightX, topRightY, bottomLeftX, bottomLeftY ] = [...src[0], ...src[src.length - 1]]
   
    let [nX, nY] = next;
    
    if(i > 0) {
        prev
        let [pX, pY] = prev.flat();
        let bbb = genRange(pX, nX)
        
        prev.push(next)
    } else {
        
        prev.push(next)
    }

    return prev
}, [])
*/





 
 