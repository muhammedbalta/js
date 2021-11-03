const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules')
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;

let brickRowCount = 9;
let brickColumnCount = 5;


const brickInfo = {
    width: 70,
    height: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -1
}

const paddle = {
    x: canvas.width / 2 -40,
    y: canvas.height - 20,
    width: 80,
    height: 10,
    speed: 8,
    dx: 0,
}

const bricks = [];
for(let i = 0; i< brickRowCount; i++)
{
    bricks[i] = [];
    for(let j = 0; j < brickColumnCount; j++){
        const x = i * (brickInfo.width + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.height + brickInfo.padding) + brickInfo.offsetY;   
        bricks[i][j] = {x, y, ...brickInfo}
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI*2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}
let paddlex = paddle.x;
let paddley = paddle.y;
function drawPaddle(){
    if(paddle.x != paddlex && paddle.y != paddley)
    console.log(paddle)
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawScore(){
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

function drawBricks() {
    bricks.forEach(column => column.forEach(brick => {
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brick.width, brick.height);
        ctx.fillStyle = brick.visible ? '#0095DD' : 'transparent';
        ctx.fill();
        ctx.closePath();
    }));
}

function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

function movePaddle(){
    paddle.x += paddle.dx;

    if(paddle.x + paddle.width >= canvas.width){
        paddle.x = canvas.width - paddle.width;
    }


    if(paddle.x < 0) paddle.x = 0;
}

function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
    if(ball.x + ball.size >= canvas.width ||  ball.x < 0){
        ball.dx *= -1;
    }

    if(ball.y < 0){
        ball.dy *= -1;
    }

    if(ball.y + ball.size >= canvas.height){
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = 4;
        ball.dy = -4;
    }

    if(ball.x + (ball.size / 2) >= paddle.x && ball.x + (ball.size / 2) <= paddle.x + paddle.width && paddle.y < ball.y + ball.size){
        ball.dy *= -1;
    }

    bricks.forEach(column => column.forEach(brick => {
        if(brick.visible && ball.x + ball.size / 2 > brick.x && ball.x + ball.size / 2 < brick.x + brick.width){
            if(ball.y < brick.y + brick.height || (ball.y < brick.y && ball.y + ball.size > brick.y))
            {
                brick.visible = false;
                ball.dy *= -1;
            }
            
        }
    }));
}

function keyDown(e){
    console.log(e.key);
    if(e.key == "Right" || e.key == "ArrowRight"){
        paddle.dx = paddle.speed;
        console.log("e");
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        paddle.dx = -paddle.speed;
    }
}

function keyUp(e){
    if(e.key == "Right" || e.key == "ArrowRight" || e.key == "Left" || e.key == "ArrowLeft")
    paddle.dx = 0;
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function update(){
    movePaddle();
    moveBall();
    draw();

    requestAnimationFrame(update);
}



update();
//Event Listeners
rulesBtn.addEventListener('click', () => {rules.classList.add('show')});
closeBtn.addEventListener('click', () => {rules.classList.remove('show')});
