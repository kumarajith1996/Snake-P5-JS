var snake = [];
var squares = []
var squareWidth = 20;
var directions = {"UP":new Point(0, -1), "DOWN":new Point(0, 1), "LEFT":new Point(-1, 0), "RIGHT":new Point(1, 0)}
var currentDirection;
var apple;
function setup() {
  reset()
}

function reset()
{
  createCanvas(1000, 600);
  //one time setup
  fill(50);
  snake = []
  snake.push(new Point(5, height/(squareWidth*2)));
  snake.push(new Point(4, height/(squareWidth*2)));
  generateApple();
  currentDirection = directions.RIGHT;
  frameRate(15)
}

function keyPressed() {
  if(keyCode === LEFT_ARROW && currentDirection !== directions.RIGHT)
    currentDirection = directions.LEFT;
  else if(keyCode === RIGHT_ARROW && currentDirection !== directions.LEFT)
    currentDirection = directions.RIGHT;
  else if(keyCode === UP_ARROW && currentDirection !== directions.DOWN)
    currentDirection = directions.UP;
  else if(keyCode === DOWN_ARROW && currentDirection !== directions.UP)
    currentDirection = directions.DOWN;
}

function draw() {
  drawBackground();
  drawApple();
  moveSnake();
  drawSnake();
}

function generateApple()
{
  apple = new Point(parseInt(random(0, width/squareWidth)), parseInt(random(0, height/squareWidth)))
}

function drawBackground()
{ 
  fill(50)
  for(var i = 0; i < width/squareWidth; i++)
  {
    for(var j = 0; j < height/squareWidth; j++)
    {
      rect(i*squareWidth, j*squareWidth, squareWidth, squareWidth)
    }
  }
}

function drawApple()
{
  fill(200, 0, 0)
  rect(apple.x*squareWidth, apple.y*squareWidth, squareWidth, squareWidth)
}

function moveSnake()
{
  var tail = snake.slice(snake.length-1);
  tail.x = snake[0].x + currentDirection.x;
  tail.y = snake[0].y + currentDirection.y;
  if(tail.x === apple.x && tail.y === apple.y)
  {
    generateApple();
  }
  else
    snake.pop()
  snake.unshift(tail)
}

function isDead(head)
{
  for(var i = 1; i < snake.length; i++)
  {
    if(snake[i].x === head.x && snake[i].y === head.y)
      return true;
  }
  return false;
}

function drawSnake() {
  fill(200)
  for(var i = 0; i < snake.length; i++)
  {
    rect(snake[i].x*squareWidth, snake[i].y*squareWidth, squareWidth, squareWidth)
  }
}

function Point(pX, pY)
{
  this.x = pX;
  this.y = pY;
}