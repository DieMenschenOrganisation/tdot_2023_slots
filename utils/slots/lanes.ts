export let Lanes = createLanes([]);

// [[1, 1, 1, 1, 1], [0, 0, 0, 0, 0], [-1, -1, -1, -1, -1], [1, 1, 0, -1, -1], [-1, -1, 0, 1, 1], [1, 0, 0, 0, 1], [-1, 0, 0, 0, -1], [0, 1, 1, 1, 0], [0, -1, -1, -1, 0], [1, 0, 0, 0, -1], [-1, 0, 0, 0, 1], [0, 0, 1, 1, 1], [0, 0, -1, -1, -1], [-1, 0, -1, 0, -1], [0, -1, 0, -1, 0], [1, 0, 1, 0, 1], [0, 1, 0, 1, 0], [1, 0, -1, 0, 1], [-1, 0, 1, 0, -1]];


function createLanes(currentLane: number[]): number[][] {
  if (currentLane.length == 5) {
    return [currentLane]
  }

  let lanes: number[][] = []

  let lastVal = currentLane[currentLane.length - 1];

  if (lastVal == undefined)
    lastVal = 0

  if (lastVal + 1 <= 1) {
    let lane = [...currentLane]
    lane.push(lastVal + 1);
    lanes = lanes.concat(createLanes(lane))
  }
  if (lastVal - 1 >= -1) {
    let lane = [...currentLane]
    lane.push(lastVal - 1);
    lanes = lanes.concat(createLanes(lane))
  }

  let lane = [...currentLane]
  lane.push(lastVal);
  lanes = lanes.concat(createLanes(lane))

  return lanes
}

