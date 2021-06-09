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

const createArea = function(sortedVerticesArray){
    const [topLeft, topRight, bottomRight, bottomLeft] = sortedVerticesArray;

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

    const leftVertical = genRangeTuplet(topLeft, bottomLeft); 
    const rightVertical = genRangeTuplet(topRight, bottomRight); 

    return leftVertical.reduce((acc, cv, i) => {
        acc = [...acc, genRangeTuplet(cv, rightVertical[i])]
        return acc
    }, [])
}

