Math.seedrandom('set_seed_to_fix_points_genetated');

// controlling parameters
var pointsNumb= 800
var elX = 220
var elY = 180

var randPoint = function(min, max) {
  return Math.floor(Math.random() * (max-min)) + min;
};

var ellipsepts = function(numPoints){
  var data = [];
  var data1 = [];
  var data2 = [];

  for (i=0; i < numPoints; i++) {
    var angle = Math.random()*Math.PI;
    data.push({x: 300+Math.cos(angle)*elX, y: 400+Math.sin(angle)*elY});
    data1.push({x: 500+Math.cos(angle)*elX, y: 200+Math.sin(angle)*elY});
  }

  for (i = 0; i < pointsNumb; i++) {
    var angle = Math.random()*Math.PI*1.2;
    var scalerX =randPoint(0,elX)
    var scalerY =randPoint(0,elY)
    data.push({x: 500+Math.cos(angle)*scalerX, y: 300+Math.sin(angle)*scalerY});
    data2.push({x: 500+Math.cos(angle)*scalerX, y: 200+Math.sin(angle)*scalerY});
  }
  return [data,data1,data2];
};

pointXYInPolygon = function (point, vs) {
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
  var xi, xj, i, intersect,
      x = point.x,
      y = point.y,
      inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    xi = vs[i].x,
    yi = vs[i].y,
    xj = vs[j].x,
    yj = vs[j].y,
    intersect = ((yi > y) != (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}



// ************************************************
//
//
//                Ellipse Points Generation
//
//
// ************************************************

function getEllipsePoints(center, radius, distance, numPoints) {
  randomAngle = d3.randomUniform(0, 360)
  points = new Array(numPoints);
  rx = radius[0]
  ry = radius[1]
  for (var i = 0, n = numPoints; i < n; ++i) {
      angle = randomAngle()
      point_x = center[0] + rx * Math.cos(-angle*Math.PI/180) * distance,
      point_y = center[1] + ry * Math.sin(-angle*Math.PI/180) * distance

      points[i] = [Math.floor(point_x), Math.floor(point_y)];
  }
  return points
}

function getEllipsePointsWithBaseAngle(center, radius, radius_interval, distance, base_angle, sidedEven=false) {
  numPoints = parseInt(360/base_angle)
  points = [];
  for(rx=radius_interval[0], ry=radius_interval[1]; rx < radius[0]; rx=rx+radius_interval[0],ry=ry+radius_interval[0]) {
    for (var i = 0, n = numPoints; i < n; ++i) {
      angle = base_angle * i
      if (sidedEven && angle < 180 && angle%4==0) continue
      point_x = center[0] + rx * Math.cos(-angle*Math.PI/180) * distance,
      point_y = center[1] + ry * Math.sin(-angle*Math.PI/180) * distance

      points.push( {x:Math.floor(point_x), y:Math.floor(point_y)} );
    }
  }
  return points
}

function getEllipsePointsWithPointNumIncrease(center, radius, radius_interval, distance, increase=10, sidedEven=false) {
  points = [];
  numPoints = 0;
  for(rx=radius_interval[0], ry=radius_interval[1]; rx < radius[0]; rx=rx+radius_interval[0],ry=ry+radius_interval[0]) {
    numPoints = increase + numPoints
    base_angle = parseInt(360/numPoints)
    for (var i = 0, n = numPoints; i < n; ++i) {
      angle = base_angle * i
      if (sidedEven && angle < 180 && angle%4==0) continue
      point_x = center[0] + rx * Math.cos(-angle*Math.PI/180) * distance,
      point_y = center[1] + ry * Math.sin(-angle*Math.PI/180) * distance

      points.push( {x:Math.floor(point_x), y:Math.floor(point_y)} );
    }
  }
  return points
}

function getEllipsePointsWithSlices(center, radius, totalSlices, numPointsInSlices, distance, sliceInterval=1) {
  points = [];
  angle_per_slice = 360 / totalSlices
  // randomRadiusA = d3.randomUniform(0, radius[0])
  // randomRadiusB = d3.randomUniform(0, radius[1])
  randomProportion = d3.randomUniform(0, 1)

  for (var j=0; j < numPointsInSlices.length; ++j) {
    angle_min = angle_per_slice * j*sliceInterval
    angle_max = angle_per_slice * (j*sliceInterval+1)
    randomAngle = d3.randomUniform(angle_min, angle_max)
    for (var i = 0; i < numPointsInSlices[j]; ++i) {
      angle = randomAngle()
      p = randomProportion()
      ra = radius[0] * p
      rb = radius[1] * p
      point_x = center[0] + ra * Math.cos(-angle*Math.PI/180) * distance,
      point_y = center[1] + rb * Math.sin(-angle*Math.PI/180) * distance

      points.push( {x:Math.floor(point_x), y:Math.floor(point_y)} );
    }
  }
  return points
}

function getPointsInsideEllipse(cx, cy, rx, ry, points) {
  points_in_ellipse = []
  for (i=0; i<points.length; ++i) {
    point_to_check = [ , points[i].y ]
    dx = (points[i].x - cx) / rx
    dy = (points[i].y - cy) / ry
    if (dx**2 + dy**2 <= 1) points_in_ellipse.push(points[i])
  }
  return points_in_ellipse
}

// ************************************************
//
//
//                Circle Points Generation
//
//
// ************************************************

function getCirclePoints(center, radius, distance, numPoints) {
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


function getCirclePointsWithBaseAngle(center, radius, radius_interval, distance, base_angle, sidedEven=false) {
  numPoints = parseInt(360/base_angle)
  points = [];
  for(r=radius_interval; r < radius; r=r+radius_interval) {
    for (var i = 0, n = numPoints; i < n; ++i) {
      angle = base_angle * i
      if (sidedEven && angle < 180 && angle%4==0) continue
      point_x = center[0] + r * Math.cos(-angle*Math.PI/180) * distance,
      point_y = center[1] + r * Math.sin(-angle*Math.PI/180) * distance

      points.push( {x:Math.floor(point_x), y:Math.floor(point_y)} );
    }
  }
  return points
}

function getCirclePointsWithPointNumIncrease(center, radius, radius_interval, distance, increase=10, sidedEven=false) {
  points = [];
  numPoints = 0;
  for(r=radius_interval; r < radius; r=r+radius_interval) {
    numPoints = increase + numPoints
    base_angle = parseInt(360/numPoints)
    for (var i = 0, n = numPoints; i < n; ++i) {
      angle = base_angle * i
      if (sidedEven && angle < 180 && angle%4==0) continue
      point_x = center[0] + r * Math.cos(-angle*Math.PI/180) * distance,
      point_y = center[1] + r * Math.sin(-angle*Math.PI/180) * distance

      points.push( {x:Math.floor(point_x), y:Math.floor(point_y)} );
    }
  }
  return points
}

function getCirclePointsWithSlices(center, radius, totalSlices, numPointsInSlices, distance, sliceInterval=1) {
  points = [];
  angle_per_slice = 360 / totalSlices
  randomRadius = d3.randomUniform(0, radius)

  for (var j=0; j < numPointsInSlices.length; ++j) {
    angle_min = angle_per_slice * j*sliceInterval
    angle_max = angle_per_slice * (j*sliceInterval+1)
    randomAngle = d3.randomUniform(angle_min, angle_max)
    for (var i = 0; i < numPointsInSlices[j]; ++i) {
      angle = randomAngle()
      r = randomRadius()
      point_x = center[0] + r * Math.cos(-angle*Math.PI/180) * distance,
      point_y = center[1] + r * Math.sin(-angle*Math.PI/180) * distance

      points.push( {x:Math.floor(point_x), y:Math.floor(point_y)} );
    }
  }
  return points
}

function getPointsInsideCircle(cx, cy, r, points) {
  points_in_circle = []
  for (i=0; i<points.length; ++i) {
    point_to_check = [ , points[i].y ]
    dx = points[i].x - cx
    dy = points[i].y - cy
    rsquare = r**2
    if (dx**2 + dy**2 <= rsquare) points_in_circle.push(points[i])
  }
  return points_in_circle
}

// ************************************************
//
//
//                Rect Points Generation
//
//
// ************************************************

function getRectPoints(x, y, width, height) {
  var points = []
  points.push( [x, y])
  points.push( [x+width, y])
  points.push( [x, y+height])
  points.push( [x+width, y+height])
  return points
}

function getBiggerRectPoints(x, y, width, height) {
  var points = []
  offset = 10
  points.push( [x-offset, y-offset])
  points.push( [x+width-offset, y-offset])
  points.push( [x-offset, y+height+offset])
  points.push( [x+width+offset, y+height+offset])
  return points
}

function getPointsInsideRect(x, y, width, height, points) {
  // points_init = getRectPoints(x, y, width, height)
  // hull_init = d3.polygonHull(points_init)
  // points_in_rect = []
  // for (i=0; i<points.length; ++i) {
  //   point_to_check = [ points[i].x, points[i].y ]
  //   if (d3.polygonContains(hull_init, point_to_check)) {
  //     points_in_rect.push(points[i])
  //   }
  // }
  points_in_rect = []
  for (i=0; i<points.length; ++i) {
    px = points[i].x
    py = points[i].y
    if ( ! (px < x || py < y || px > x+width || py > y+height) ) {
      points_in_rect.push(points[i])
    }
  }
  // console.log(points_in_rect)
  return points_in_rect
}

// ************************************************
//
//
//                CLUSTERS PART END
//
//
// ************************************************

function getRandPoint(min, max, bias=0, influence=0) {
  // use bias and influence to make the rand points not uniform distributed.
  // bias = 400, influence = 0.75
  // return Math.floor(Math.random() * (max-min)) + min;
  var rnd = Math.random() * (max - min) + min,   // random in range
      mix = Math.random() * influence;           // random mixer
  return Math.floor(rnd * (1 - mix) + bias * mix);           // mix full range and bias
}

function randPointInPolygon(hull_init, min_max_xy, bias=0, influence=0) {
  new_point = 0
  while(true) {
      x = getRandPoint(min_max_xy[0][0], min_max_xy[0][1], bias=bias, influence=influence)
      y = getRandPoint(min_max_xy[1][0], min_max_xy[1][1], bias=bias, influence=influence)
      new_point = [x, y]
      // alert(d3.polygonContains(hull_init, new_point))
      if (d3.polygonContains(hull_init, new_point)) break
  }
  return new_point
}


function getPointsInsidePolygon(numPoints, points_init, bias=0, influence=0) {
  var min_max_xy = getXYMinMax(points_init)

  hull_init = d3.polygonHull(points_init)

  points = new Array(numPoints+points_init,length);
  for (var i = 0, n = points_init.length; i < n; ++i) points[i] = points_init[i];
  // alert(points_init)
  // alert(points)

  for (var i = points_init.length, n = points_init.length+numPoints; i < n; ++i) {
      new_point = randPointInPolygon(hull_init, min_max_xy, bias=bias, influence=influence)
      points[i] = new_point;
  }
  // alert(points)

  points_xy = []
  for(i=0; i<points.length; ++i) {
    points_xy.push({ x:points[i][0], y:points[i][1] })
  }

  return points_xy;
}

function getPointsInsidePolygonWithoutInitPoints(numPoints, points_init, bias=0, influence=0) {
  var min_max_xy = getXYMinMax(points_init)

  hull_init = d3.polygonHull(points_init)

  points = new Array(numPoints);

  for (var i = 0, n = numPoints; i < n; ++i) {
      new_point = randPointInPolygon(hull_init, min_max_xy, bias=bias, influence=influence)
      points[i] = new_point;
  }
  // alert(points)

  points_xy = []
  for(i=0; i<points.length; ++i) {
    points_xy.push({ x:points[i][0], y:points[i][1] })
  }

  return points_xy;
}

function randPointBetween2Circles(circle, biggerCircle, min_max_xy, bias=0, influence=0) {
  new_point = 0
  while(true) {
      x = getRandPoint(min_max_xy[0][0], min_max_xy[0][1], bias=bias, influence=influence)
      y = getRandPoint(min_max_xy[1][0], min_max_xy[1][1], bias=bias, influence=influence)
      new_point = [x, y]
      // alert(d3.polygonContains(hull_init, new_point))
      if (d3.polygonContains(biggerCircle, new_point) && !d3.polygonContains(circle, new_point))  break
  }
  return new_point
}

function getPointsBetween2Circles(numPoints, pointsCircle, pointsBiggerCircle, bias=0, influence=0) {

  var min_max_xy = getXYMinMax(pointsBiggerCircle)

  circle = d3.polygonHull(pointsCircle)
  biggerCircle = d3.polygonHull(pointsBiggerCircle)

  points = new Array(numPoints+pointsCircle.length+pointsBiggerCircle.length);

  n = pointsCircle.length
  for (var i = 0; i < n; ++i) points[i] = pointsCircle[i];

  n = pointsCircle.length + pointsBiggerCircle.length
  for (var i = pointsCircle.length,j=0; i < n; ++i, ++j) points[i] = pointsBiggerCircle[j];

  console.log(points)

  n = pointsCircle.length + pointsBiggerCircle.length + numPoints
  for (var i = pointsCircle.length + pointsBiggerCircle.length; i < n; ++i) {
      new_point = randPointBetween2Circles(circle, biggerCircle, min_max_xy, bias=bias, influence=influence)
      points[i] = new_point;
  }


  points_xy = []
  for(i=0; i<n; ++i) {
    points_xy.push({ x:points[i][0], y:points[i][1] })
  }


  return points_xy;
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
