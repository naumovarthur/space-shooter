import kaboom from "kaboom";

kaboom({
  background: [0, 0, 0],
  width: 440,
  height: 275,
  scale: 1.5
});

loadRoot("sprites/");
loadSprite("alien", "alien.png");
loadSprite("gem", "gem.png");
loadSprite("spaceship", "spaceship.png");
loadSprite("stars", "stars.png");

loadRoot("sounds/");
loadSound("explosion", "explosion.wav");
loadSound("music", "music.mp3");
loadSound("score", "score.wav");
loadSound("shoot", "shoot.wav");

scene("main", () => {
  layers([
    "bg",
    "obj",
    "ui"
  ], "obj");

  add([
    sprite("stars"),
    layer("bg")
  ]);

  // Game parameters
  const MAP_WIDTH = 440;
  const MAP_HEIGHT = 275;
  const BLOCK_SIZE = 11;

  const map = addLevel([
    "--------------------------------------------",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                pppppp    -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-    pppppp                                -",
    "-                                          -",
    "-                                          -",
    "-                 pppppp                   -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "============================================",
    "                                            "
  ], {
    width: BLOCK_SIZE,
    height: BLOCK_SIZE,
    pos: vec2(0, 0),
    "=": () => [
      rect(BLOCK_SIZE, BLOCK_SIZE),
      color(150, 75, 0),
      "ground",
      area(),
      solid()
    ],
    "p": () => [
      rect(BLOCK_SIZE, BLOCK_SIZE),
      color(0, 0, 255),
      "platform",
      area(),
      solid()
    ],
    "-": () => [
      rect(BLOCK_SIZE / 10, BLOCK_SIZE),
      color(0, 0, 0),
      "boundary",
      area(),
      solid()
    ]
  });

  const player = add([
    sprite("spaceship"),
    pos(100, 200),
    body(),
    area(),
    scale(1),
    rotate(0),
    origin("center"),
    "player",
    {
      score: 0,
      shield: 100
    }
  ]);

  const directions = {
    LEFT: "left",
    RIGHT: "right"
  };

  let current_direction = directions.RIGHT;

  onKeyDown("left", () => {
    player.flipX(-1);
    player.angle = -11;
  });
});

go("main");
