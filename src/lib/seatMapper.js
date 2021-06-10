export default function (seats, vertices) {
  if(!seats || !vertices) throw 'SeatMapper: You have passed a falsy parameter!';

  const sortVertices = function (verticesArray) {
    let points = verticesArray.map((v) => {
      let [x, y] = v;
      return { x: x, y: y };
    });

    const center = points.reduce(
      (acc, { x, y }) => {
        acc.x += x / points.length;
        acc.y += y / points.length;
        return acc;
      },
      { x: 0, y: 0 }
    );

    const angles = points.map(({ x, y }) => {
      return {
        x,
        y,
        angle: (Math.atan2(y - center.y, x - center.x) * 180) / Math.PI,
      };
    });

    const pointsSorted = angles.sort((a, b) => a.angle - b.angle);

    return pointsSorted.map((cv) => {
      const { x, y } = cv;
      return [x, y];
    });
  };

  const sortedVertices = sortVertices(vertices);

  const createArea = function (sortedVerticesArray) {
    const [topLeft, topRight, bottomRight, bottomLeft] = sortedVerticesArray;

    const genSpan = (a, b) => {
      // gen range from a to b
      if (a === b) return null;

      if (a < b) {
        return [...new Array(Math.abs(a - (b + 1)))].map((cv, i) => a + i);
      } else {
        return [...new Array(Math.abs(b - (a + 1)))]
          .map((cv, i) => b + i)
          .reverse();
      }
    };

    const genRangeTuplet = function (a, b) {
      let [aX, aY] = a;
      let [bX, bY] = b;
      let x, y;

      if (aX === bX) {
        x = [aX];
      } else {
        x = genSpan(aX, bX);
      }

      if (aY === bY) {
        y = [aY];
      } else {
        y = genSpan(aY, bY);
      }

      if (x.length > y.length) {
        y = new Array(x.length).fill(y[0]);
      }

      if (x.length < y.length) {
        x = new Array(y.length).fill(x[0]);
      }

      let result = [];

      for (let i = 0; i < x.length; i++) {
        result.push([x[i], y[i]]);
      }

      return result;
    };

    const leftVertical = genRangeTuplet(topLeft, bottomLeft);
    const rightVertical = genRangeTuplet(topRight, bottomRight);

    return leftVertical.reduce((acc, cv, i) => {
      acc = [...acc, genRangeTuplet(cv, rightVertical[i])];
      return acc;
    }, []);
  };

  const createSectionTuplets = function (areaMatrix) {
    return areaMatrix.reduce((acc, cv, i) => {
      for (const v of cv) {
        acc.push([i, v]);
      }
      return acc;
    }, []);
  };

  const createSeatTuplets = function (seatsArray) {
    return seatsArray.reduce((acc, cv, i) => {
      acc.push([i, cv]);
      return acc;
    }, []);
  };

  const positionSeatsInSection = function (
    sectionTupletsArray,
    seatsTupletsArray
  ) {
    return sectionTupletsArray.reduce((acc, cv) => {
      let [sectionId, tuplet] = cv; // eslint-disable-line no-unused-vars
      seatsTupletsArray.forEach((seat) => {
        let [seatId, seatObject] = seat; // eslint-disable-line no-unused-vars
        acc.push([seatObject, tuplet]);
      });
      return acc;
    }, []);
  };

  const sectionTuplets = createSectionTuplets(createArea(sortedVertices));
  const seatsTuplets = createSeatTuplets(seats);

  return new Map(positionSeatsInSection(sectionTuplets, seatsTuplets));
}
