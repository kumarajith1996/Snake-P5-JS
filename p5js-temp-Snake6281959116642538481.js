var snake = [];
var squares = []
var squareWidth = 20;
var boardWidth = 1000, boardHeight = 600;
var directions = {"UP":new Point(0, -1), "DOWN":new Point(0, 1), "LEFT":new Point(-1, 0), "RIGHT":new Point(1, 0)}
var currentDirection;
var apple;
var isDead;
var score, highScore, scoreText;
var tailDirection;
function setup() {
  createCanvas(boardWidth+300, boardHeight);
  highScore = 0
  ellipseMode(CORNER);
  reset()
}

function reset()
{
  if(score>highScore) highScore = score;
  isDead = false;
  score = 0;
  snake = []
  snake.push(new Point(5, boardHeight/(squareWidth*2)));
  snake.push(new Point(4, boardHeight/(squareWidth*2)));
  snake.push(new Point(3, boardHeight/(squareWidth*2)));
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
  moveSnake();
  drawSnake();
  drawApple();
  if(isDead)
    reset();
}

function drawSemiCircle(x, y, direction)
{
  if(direction === directions.RIGHT)  
    arc(x-squareWidth/2, y, squareWidth, squareWidth, -HALF_PI, HALF_PI, OPEN);
  else if(direction === directions.LEFT)  
    arc(x+squareWidth/2, y, squareWidth, squareWidth, HALF_PI, -HALF_PI, OPEN);
  else if(direction === directions.UP)
    arc(x, y+squareWidth/2, squareWidth, squareWidth, -PI, PI, OPEN);
  else if(direction === directions.DOWN)
    arc(x, y-squareWidth/2, squareWidth, squareWidth, TWO_PI, PI, OPEN);
}

function setTailDirection(tail, previous)
{
  var point = new Point(tail.x - previous.x, tail.y - previous.y);
  if(isEqual(point, directions.RIGHT))
    tailDirection = directions.RIGHT;
  else if(isEqual(point, directions.LEFT))
    tailDirection = directions.LEFT;
  else if(isEqual(point, directions.UP))
    tailDirection = directions.UP;
  else if(isEqual(point, directions.DOWN))
    tailDirection = directions.DOWN;
  else if(point.x < -1)
    tailDirection = directions.RIGHT;
  else if(point.x > 1)
    tailDirection = directions.LEFT;
  else if(point.y < -1)
    tailDirection = directions.DOWN;
  else if(point.y > 1)
    tailDirection = directions.UP;
}

function generateApple()
{
  do
  {
    apple = new Point(parseInt(random(0, boardWidth/squareWidth)), parseInt(random(0, boardHeight/squareWidth)))
  }while(isIntersecting(apple));
}

function drawBackground()
{ 
  fill(50);
  stroke(0);
  for(var i = 0; i < boardWidth/squareWidth; i++)
  {
    for(var j = 0; j < boardHeight/squareWidth; j++)
    {
      rect(i*squareWidth, j*squareWidth, squareWidth, squareWidth)
    }
  }
  //rect(0, 0, boardWidth, boardHeight);
  fill(255)
  rect(boardWidth, 0, 300, boardHeight)
  fill(0, 0, 255);
  textSize(20);
  textAlign(CENTER);
  scoreText = text('High Score : '+highScore+'\n\n\n\nScore : '+score, boardWidth, 200, 300, boardHeight);
}

function drawApple()
{
  fill(200, 0, 0)
  ellipse(apple.x*squareWidth, apple.y*squareWidth, squareWidth)
  //rect(apple.x*squareWidth, apple.y*squareWidth, squareWidth, squareWidth)
}

function moveSnake()
{
  var newHead = new Point(snake[0].x + currentDirection.x, snake[0].y + currentDirection.y);
  if(newHead.x >= boardWidth/squareWidth) newHead.x = 0;
  if(newHead.y >= boardHeight/squareWidth) newHead.y = 0;
  if(newHead.x < 0) newHead.x = boardWidth/squareWidth - 1;
  if(newHead.y < 0) newHead.y = boardHeight/squareWidth - 1;
  if(isIntersecting(newHead) && (!isEqual(newHead, snake.slice(snake.length-1)))) isDead = true;
  if(newHead.x === apple.x && newHead.y === apple.y) 
  {
    score++;
    generateApple();
  }
  else snake.pop()
  snake.unshift(newHead)
}

function isIntersecting(point)
{
  for(var i = 1; i < snake.length; i++)
  {
    if(isEqual(snake[i], point))
      return true;
  }
  return false;
}

function drawSnake() {
  fill(200)
  noStroke()
  for(var i = 0; i < snake.length; i++)
  {
    if(i == 0)
      drawSemiCircle(snake[i].x*squareWidth, snake[i].y*squareWidth, currentDirection);
    else if(i == snake.length-1)
    {
      setTailDirection(snake[i], snake[i-1])
      drawSemiCircle(snake[i].x*squareWidth, snake[i].y*squareWidth, tailDirection);
    }
    else
      rect(snake[i].x*squareWidth, snake[i].y*squareWidth, squareWidth, squareWidth)
  }
}

function isEqual(a, b)
{
  if(a.x === b.x && a.y === b.y) return true;
  return false;
}

function Point(pX, pY)
{
  this.x = pX;
  this.y = pY;  
}
