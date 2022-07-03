// Name:- Deepankaj //
let ball_x,ball_y,ball_dx,ball_dy,score=0, life=5;
let paddle_x,paddle_y,paddle_width,paddle_height,paddle_dx;
let grid = [];
function setup() {
  createCanvas(400, 400);
  ball_x=width/2;
  ball_y=height/2;
  ball_dx=2;
  ball_dy=2;
  ball_d = 25;
  paddle_width = 80;
  paddle_height =15;
  paddle_x=width/2-(80)/2;
  paddle_y =height-20;
  paddle_dx=2;
  for(var i=0; i<4;i++){
    let row=[];
    for(var j=0;j<4;j++){
      let bricks=[];
      bricks["x"] = 30+i*90;
      bricks["y"] = 50+j*50;
      bricks["w"] = 50;
      bricks["h"] = 25;
      row.push(bricks);
    }
    grid.push(row);
  }
}
function draw() {
  background("grey");
  ball_x+=ball_dx;
  ball_y+=ball_dy;
  fill("black");
  stroke("pink")
  circle(ball_x,ball_y,ball_d);
  stroke("red")
  fill("red");
  rect(paddle_x,paddle_y,paddle_width,paddle_height,paddle_dx);
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      fill("#white");
      rect(grid[i][j].x,grid[i][j].y,grid[i][j].w,grid[i][j].h);
      if(ball_x-(ball_d/2)<grid[i][j].x+grid[i][j].w &&
         ball_y >grid[i][j].y && ball_y <grid[i][j].y +grid[i][j].h&& ball_x +(ball_d/2)>grid[i][j].x){
        grid[i][j].h=0;
        grid[i][j].w=0;
        ball_dx=-ball_dx;
        score++;
      }
      if(ball_y-(ball_d/2)<grid[i][j].y+grid[i][j].h &&
         ball_x >grid[i][j].x && ball_x <grid[i][j].x +grid[i][j].w && ball_y +(ball_d/2)>grid[i][j].y){
        ball_dy=-ball_dy;
        score++;
        grid[i][j].h=0;
        grid[i][j].w=0;
      }
    }
  }
  if(keyIsDown(RIGHT_ARROW) && paddle_x+paddle_width<width){
    paddle_x+=paddle_dx;
  }
  if(keyIsDown(LEFT_ARROW) && paddle_x>0){
    paddle_x-=paddle_dx;
  }
  if(ball_x+(ball_d/2)>width || ball_x-(ball_d/2)<0){
    ball_dx=-(ball_dx);
  }
  if(ball_y -(ball_d/2)<0){
    ball_dy=-(ball_dy);
  }
  if(ball_y+(ball_d/2)>height-17){
    if(ball_x>=paddle_x && ball_x<=paddle_x+paddle_width){
      ball_dy=-(ball_dy);
    }
    else if(ball_y+(ball_d/2)>height){
      ball_dx=0;
      ball_dy=0;
      if(life>1){
        life--;
        setup();
      }
      text("Game Over.", 150, 150);
    }
  }
  text("Score : "+score, width - 100, 20)
  text("Lives : "+life, 20, 20)
}

