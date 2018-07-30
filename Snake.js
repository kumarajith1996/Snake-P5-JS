var snake = [];
var squares = []
var squareWidth = 20;
var boardWidth = 1000, boardHeight = 600;
var directions = {"UP":new Point(0, -1), "DOWN":new Point(0, 1), "LEFT":new Point(-1, 0), "RIGHT":new Point(1, 0)}
var currentDirection;
var apple;
var isDead;
var score, highScore, scoreText;
function setup() {
  createCanvas(boardWidth+300, boardHeight);
  highScore = 0
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
  generateApple();
  currentDirection = directions.RIGHT;
  frameRate(10)
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
  if(isDead)
    reset();
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
  fill(50)
  for(var i = 0; i < boardWidth/squareWidth; i++)
  {
    for(var j = 0; j < boardHeight/squareWidth; j++)
    {
      rect(i*squareWidth, j*squareWidth, squareWidth, squareWidth)
    }
  }
  fill(255)
  rect(boardWidth, 0, 300, boardHeight)
  fill(0, 0, 255);
  textSize(20);
  textAlign(CENTER);
  scoreText = text('High Score is '+highScore+'\n\n\n\nScore is '+score, boardWidth, 200, 300, boardHeight);
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
  if(tail.x >= boardWidth/squareWidth) tail.x = 0;
  if(tail.y >= boardHeight/squareWidth) tail.y = 0;
  if(tail.x < 0) tail.x = boardWidth/squareWidth - 1;
  if(tail.y < 0) tail.y = boardHeight/squareWidth - 1;
  if(isIntersecting(tail) && (!isEqual(tail, snake.slice(snake.length-1)))) isDead = true;
  if(tail.x === apple.x && tail.y === apple.y) 
  {
    score++;
    generateApple();
  }
  else snake.pop()
  snake.unshift(tail)
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
  for(var i = 0; i < snake.length; i++)
  {
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
