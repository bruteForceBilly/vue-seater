/*
getSelectedVertex / getEl - can take an arr/obj or number and returns el if founds or null

addEl - Only adds El to Array if El is not in Array

removeEl(getEl) - Reassigns copy version of array without passed El
*/
const getSelectedVertex = (vertex) => {
    let [x1, y1] = vertex;
    return this.selectedSeatVertices.reduce((acc, cv) => {
        let [x2, y2] = cv;
        if(x1 == x2 && y1 == y2) acc = cv
        return acc
    }, null)
}  