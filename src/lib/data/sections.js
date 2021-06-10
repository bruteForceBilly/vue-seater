import api from "./api.js";

 const sections = api.sections.reduce((acc, cv) => {
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

export default sections;
