let agents,
  ctx,
  canvas,
  foods,
  poisen;

let agentCountContainer,
  tableContainer;
function setup() {
  canvas = createCanvas(windowWidth, 800);
  ctx = canvas.drawingContext;
  canvas.parent('container');
  pixelDensity(1);

  agentCountContainer = document.getElementById('agentCount');
  tableContainer = document.getElementById('table');

  reset();
}

function draw() {

  agentCountContainer.innerHTML = agents.length;

  background('#37454e');
  agents.forEach((agent, i) => {
    if (agent.health <= 0) {
      agents.splice(i, 1);
    }
    agent.checkBoundaries();
    agent.update();
  });

  poisen.forEach((poisen) => poisen.display());
  foods.forEach((food) => food.display());

  if (random(1) < 0.01) {
    poisen.push(new Nutriment(-1))
  }
  if (random(1) < 0.02) {
    foods.push(new Nutriment(1))
  }

  if (agents.length === 0) {
    reset();
  }
}

function reset() {
  foods = Array.from(new Array(50), () => new Nutriment(0.2));
  poisen = Array.from(new Array(10), () => new Nutriment(-0.6));
  agents = Array.from(new Array(10), () => new Agent().addTargets('poisen', poisen).addTargets('food', foods));
}
