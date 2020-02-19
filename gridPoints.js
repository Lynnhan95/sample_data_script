
function getGrid(startPoint, edge, pointDist="leftSkewed", cellUnit=12.5, offsetEnabled=true) {
    points = []
    if (pointDist === "uniform") {
        randomCoord = d3.randomUniform(-cellUnit, cellUnit)
        offsetX = 0
        offsetY = 0
        n = 0
        for (i=0; i<edge; i=i+cellUnit) {
            pointX = i + startPoint[0]
            for (j=0; j<edge; j=j+cellUnit) {
                XorYOffset = d3.randomUniform(2, 5)() > 3
                if (offsetEnabled && XorYOffset) offsetX = Math.floor(randomCoord())
                if (offsetEnabled && XorYOffset) offsetY = Math.floor(randomCoord())
                pointX = pointX + offsetX
                pointY = j + startPoint[1] + offsetY
                points.push({ x:pointX, y:pointY })
                offsetX = 0
                offsetY = 0
                n = n+1
            }
        }
    }

    pointsPerLine = edge / cellUnit
    totalPoints = pointsPerLine**2
    halfEdge = edge/2

    // change the skewed degree
    randomSkewed = d3.randomUniform(0, edge)
    meanX = startPoint[0] + edge/2
    meanY = startPoint[1] + edge/4
    std = edge/6
    gridPolygon = d3.polygonHull([
        startPoint, [startPoint[0]+edge, startPoint[1]],
        [startPoint[0], startPoint[1]+edge], [startPoint[0]+edge, startPoint[1]+edge]
    ])
    if (pointDist === "normal" || pointDist === "leftSkewed" || pointDist === "rightSkewed") {

        randomX = d3.randomNormal(meanX, std)
        randomY = d3.randomNormal(meanY, std)
        for (i=0; i<totalPoints; ++i) {
            while(true) {
                pointX = Math.floor(randomX())
                pointY = Math.floor(randomY())
                // minus or plus randownskewed() will change the direction of the the skewed
                if (pointDist === "leftSkewed" ) pointX = pointX + randomSkewed()
                if (pointDist === "rightSkewed" && pointX > meanX) pointX = pointX - randomSkewed()
                if (pointDist === "leftSkewed") pointY = pointY + randomSkewed()
                if (pointDist === "rightSkewed" && pointY > meanY) pointY = pointY - randomSkewed()
                if (d3.polygonContains(gridPolygon, [pointX, pointY]) ){
                    points.push({ x:pointX, y:pointY })
                    break
                }
            }
        }
    }

    if (pointDist === "normalAlongX" || pointDist === "leftSkewedAlongX" || pointDist === "rightSkewedAlongX") {
        randomX = d3.randomNormal(meanX, std)
        for (i=0; i<edge; i=i+cellUnit) {
            for (j=0; j<pointsPerLine; ++j) {
                while(true) {
                    pointX = Math.floor(randomX())
                    pointY = startPoint[1] + i
                    if (pointDist === "leftSkewedAlongX" && pointX < meanX) pointX = pointX + halfEdge/2
                    if (pointDist === "rightSkewedAlongX" && pointX > meanX) pointX = pointX - halfEdge/2
                    if (d3.polygonContains(gridPolygon, [pointX, pointY]) ){
                        points.push({ x:pointX, y:pointY })
                        break
                    }
                }
            }
        }
    }

    if (pointDist === "normalAlongY" || pointDist === "leftSkewedAlongY" || pointDist === "rightSkewedAlongY") {
        randomY = d3.randomNormal(meanY, std)
        for (i=0; i<edge; i=i+cellUnit) {
            for (j=0; j<pointsPerLine; ++j) {
                while(true) {
                    pointX = startPoint[0] + i
                    pointY = Math.floor(randomY())
                    if (pointY < meanY && pointDist === "leftSkewedAlongY") pointY = pointY + halfEdge/2
                    if (pointY > meanY && pointDist === "rightSkewedAlongY") pointY = pointY - halfEdge/2
                    if (d3.polygonContains(gridPolygon, [pointX, pointY]) ){
                        points.push({ x:pointX, y:pointY })
                        break
                    }
                }
            }
        }
    }

    // console.log(points)
    return points
}


function getGrid1(startPoint, edge, pointDist="leftSkewed", cellUnit=17.5, offsetEnabled=true) {
    points = []
    if (pointDist === "uniform") {
        randomCoord = d3.randomUniform(-cellUnit, cellUnit)
        offsetX = 0
        offsetY = 0
        n = 0
        for (i=0; i<edge; i=i+cellUnit) {
            pointX = i + startPoint[0]
            for (j=0; j<edge; j=j+cellUnit) {
                XorYOffset = d3.randomUniform(0,7)() > 3
                if (offsetEnabled && XorYOffset) offsetX = Math.floor(randomCoord())
                if (offsetEnabled && XorYOffset) offsetY = Math.floor(randomCoord())
                pointX = pointX + offsetX
                pointY = j + startPoint[1] + offsetY
                points.push({ x:pointX, y:pointY })
                offsetX = 0
                offsetY = 0
                n = n+1
            }
        }
    }

    pointsPerLine = edge / cellUnit
    totalPoints = pointsPerLine**2
    halfEdge = edge/2

    // change the skewed degree
    randomSkewed = d3.randomUniform(0, edge)
    meanX = startPoint[0] + edge
    meanY = startPoint[1] + edge/4
    std = edge/6
    gridPolygon = d3.polygonHull([
        startPoint, [startPoint[0]+edge, startPoint[1]],
        [startPoint[0], startPoint[1]+edge], [startPoint[0]+edge, startPoint[1]+edge]
    ])
    if (pointDist === "normal" || pointDist === "leftSkewed" || pointDist === "rightSkewed") {

        randomX = d3.randomNormal(meanX, std)
        randomY = d3.randomNormal(meanY, std)
        for (i=0; i<totalPoints; ++i) {
            while(true) {
                pointX = Math.floor(randomX())
                pointY = Math.floor(randomY())
                // minus or plus randownskewed() will change the direction of the the skewed
                if (pointDist === "leftSkewed" ) pointX = pointX + randomSkewed()
                if (pointDist === "rightSkewed" && pointX > meanX) pointX = pointX - randomSkewed()
                if (pointDist === "leftSkewed") pointY = pointY + randomSkewed()
                if (pointDist === "rightSkewed" && pointY > meanY) pointY = pointY - randomSkewed()
                if (d3.polygonContains(gridPolygon, [pointX, pointY]) ){
                    points.push({ x:pointX, y:pointY })
                    break
                }
            }
        }
    }

    if (pointDist === "normalAlongX" || pointDist === "leftSkewedAlongX" || pointDist === "rightSkewedAlongX") {
        randomX = d3.randomNormal(meanX, std)
        for (i=0; i<edge; i=i+cellUnit) {
            for (j=0; j<pointsPerLine; ++j) {
                while(true) {
                    pointX = Math.floor(randomX())
                    pointY = startPoint[1] + i
                    if (pointDist === "leftSkewedAlongX" && pointX < meanX) pointX = pointX + halfEdge/2
                    if (pointDist === "rightSkewedAlongX" && pointX > meanX) pointX = pointX - halfEdge/2
                    if (d3.polygonContains(gridPolygon, [pointX, pointY]) ){
                        points.push({ x:pointX, y:pointY })
                        break
                    }
                }
            }
        }
    }

    if (pointDist === "normalAlongY" || pointDist === "leftSkewedAlongY" || pointDist === "rightSkewedAlongY") {
        randomY = d3.randomNormal(meanY, std)
        for (i=0; i<edge; i=i+cellUnit) {
            for (j=0; j<pointsPerLine; ++j) {
                while(true) {
                    pointX = startPoint[0] + i
                    pointY = Math.floor(randomY())
                    if (pointY < meanY && pointDist === "leftSkewedAlongY") pointY = pointY + halfEdge/2
                    if (pointY > meanY && pointDist === "rightSkewedAlongY") pointY = pointY - halfEdge/2
                    if (d3.polygonContains(gridPolygon, [pointX, pointY]) ){
                        points.push({ x:pointX, y:pointY })
                        break
                    }
                }
            }
        }
    }

    // console.log(points)
    return points
}



// ************************************************
//
//
//                CLUSTERS PART BEGIN
//
//
// ************************************************

function getCirclePoint(center, radius, distance, numPoints) {
    randomAngle = d3.randomUniform(0, 360)
    points = new Array(numPoints);
    for (var i = 0, n = numPoints; i < n; ++i) {
        angle = randomAngle()
        point_x = center[0] + radius * Math.cos(-angle*Math.PI/180) * distance,
        point_y = center[1] + radius * Math.sin(-angle*Math.PI/180) * distance

        points[i] = [Math.floor(point_x), Math.floor(point_y)];
    }
    return points
}

function getEllipsePoint(center, a, b, distance, numPoints) {
    randomAngle = d3.randomUniform(0, 360)
    points = new Array(numPoints);
    for (var i = 0, n = numPoints; i < n; ++i) {
        angle = randomAngle()
        point_x = center[0] + a * Math.cos(-angle*Math.PI/180) * distance,
        point_y = center[1] + b * Math.sin(-angle*Math.PI/180) * distance

        points[i] = [Math.floor(point_x), Math.floor(point_y)];
    }
    return points
}

function getRectPoint(center, r, h) {
    j = Math.sqrt(1-h*h)
    x_base = center[0], y_base = center[1]
    boundaryOfRect = [
        [ -r*j+x_base, -r*h+y_base  ], [ r*j+x_base, -r*h+y_base  ],
        [ -r*j+x_base, r*h+y_base  ], [ r*j+x_base, r*h+y_base  ]
    ]
    return boundaryOfRect
}

function getHexagonPoint(center, r, h) {
    x_base = center[0], y_base = center[1]
    boundaryOfHexagon = [
        [ r+x_base, y_base  ], [ r/2+x_base, r*h+y_base  ],
        [ -r/2+x_base, r*h+y_base  ], [ -r+x_base, y_base  ],
        [ -r/2+x_base, -r*h+y_base  ], [ r/2+x_base, -r*h+y_base  ]
    ]
    return boundaryOfHexagon
}

function getPolyPoint(center, r, numSides) {
    x_base = center[0], y_base = center[1]
    boundaryOfPoly = new Array(numSides);
    for (var i = 0, n = numSides; i < n; ++i) {
        angle = Math.PI/2 + 2*Math.PI*i / numSides;
        boundaryOfPoly[i] = [ Math.floor(x_base+r*Math.cos(angle)), Math.floor(y_base+r*Math.sin(angle)) ]
    }
    return boundaryOfPoly
}

function getRandPolygon(numPoints) {

    var randomX = d3.randomNormal(width/2, 200),
        randomY = d3.randomNormal(height/2, 200),
        points = new Array(numPoints);

    for (var i = 0, n = points.length; i < n; ++i) points[i] = [randomX(), randomY()];

    return points
}

// ************************************************
//
//
//                CLUSTERS PART END
//
//
// ************************************************

function randPoint(min, max, bias=0, influence=0) {
    // use bias and influence to make the rand points not uniform distributed.
    // bias = 400, influence = 0.75
    // return Math.floor(Math.random() * (max-min)) + min;
    var rnd = Math.random() * (max - min) + min,   // random in range
        mix = Math.random() * influence;           // random mixer
    return Math.floor(rnd * (1 - mix) + bias * mix);           // mix full range and bias
}

function randPointInPolygon(hull_init, min_max_xy) {
    new_point = 0
    while(true) {
        x = randPoint(min_max_xy[0][0], min_max_xy[0][1], bias=0, influence=0)
        y = randPoint(min_max_xy[1][0], min_max_xy[1][1], bias=0, influence=0)
        new_point = [x, y]
        // alert(d3.polygonContains(hull_init, new_point))
        if (d3.polygonContains(hull_init, new_point)) break
    }
    return new_point
}

function getPointsInsidePolygon(numPoints, points_init) {
    var min_max_xy = getXYMinMax(points_init)

    hull_init = d3.polygonHull(points_init)

    points = new Array(numPoints);
    for (var i = 0, n = points_init.length; i < n; ++i) points[i] = points_init[i];
    // alert(points_init)
    // alert(points)

    for (var i = points_init.length, n = numPoints; i < n; ++i) {
        new_point = randPointInPolygon(hull_init, min_max_xy)
        points[i] = new_point;
    }
    // alert(points)

    return points;
}

function getXYMinMax (coords) {
    var min_x = 0, min_y = 0, max_x = 0, max_y = 0
    for (var i=0; i<coords.length; i++) {
        if (min_x > coords[i][0]) {
        min_x = coords[i][0]
        }
        if (max_x < coords[i][0]) {
        max_x = coords[i][0]
        }
        if (min_y > coords[i][1]) {
        min_y = coords[i][1]
        }
        if (max_y < coords[i][1]) {
        max_y = coords[i][1]
        }
    }
    min_max_xy = []
    min_max_xy.push([ min_x, max_x ])
    min_max_xy.push([ min_y, max_y ])
    return min_max_xy
}
