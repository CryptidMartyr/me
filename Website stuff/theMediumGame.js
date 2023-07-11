//declare desolate
var desolate;
//declare bullet 1
var bullet_01;
var myGameArea = {

  canvas : document.getElementById("canvas"),

  start : function() {

    this.context = this.canvas.getContext("2d");
    //lets it know when to make a new frame
    this.interval = setInterval(updateGameArea, 24);
    this.frameNo = 0;
    this.frame ++;
    //what
    document.body.insertBefore<canvas>(this.canvas, document.body.childNodes[0]);
    
    //tell the cpu to pay attention to the keys being pressed...
    window.addEventListener('keydown', function (e) {

      myGameArea.key = e.keyCode;
      if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
      };
    })
    //...and unpressed
    window.addEventListener('keyup', function (e) {
      myGameArea.key = false;
    })
  },
  //prevents the paint effect
  clear : function() {

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

var canvasPosition = canvas.getBoundingClientRect();

function holdPlace() {

  desolate = new player (20, 20, "will we see him again.png", 500, 300, "image");
  bullet_01 = new bullet (15, 15, "bullet_01.png", 600, 500, "image");
  myGameArea.start();
}

function player (width, height, color, x, y, type) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;  
  this.speedX = 0;
  this.speedY = 0;

  if (type == "image"){
    this.image = new Image();
    this.image.src = color;
  }

  this.update = function() {
    ctx = myGameArea.context;
    if (type == "image"){
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      }
  }
    // the function that makes it move
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  this.control = function() {

    desolate.speedX = 0;
    desolate.speedY = 0;
    if (myGameArea.key == 37) {desolate.speedX = -3;}
    if (myGameArea.key == 39) {desolate.speedX = 3;}
    if (myGameArea.key == 38) {desolate.speedY = -3;}
    if (myGameArea.key == 40) {desolate.speedY = 3;}
  }

  this.die = function() {

    this.top = this.y;
    this.bottom = this.y + this.height;
    this.left = this.x;
    this.right = this.x + this.width;
    bullet.top = bullet.y;
    bullet.bottom = bullet.y + bullet.height;
    bullet.left = bullet.x;
    bullet.right = bullet.x + bullet.width;
    if (bullet.bottom > this.top || bullet.top < this.bottom ||
    bullet.left > this.right || bullet.right < this.left) {
      return false;
    }
  }
}

function bullet (width, height, color, x, y, type) {
  this.myGameArea = myGameArea;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;  
  this.speedX = -9;
  this.speedY = 3;
  this.color = color;
  this.type = type;
  if (type == "image"){
    this.image = new Image();
    this.image.src = color;
  }

  this.update = function() {

    if (type == "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    else {
      ctx.fillStyle = color;
      ctx.fillRect(this.image, this.x, this.y, this.width, this.height);
    }
  }

  this.newPos = function() {

    this.x += this.speedX;
    this.y += this.speedY;
  }

  this.bounce = function() {

  var i = 0;
      if (this.y >= 603 && this.speedY > 0) {
        this.speedY -= (this.speedY * 2);
        i++;
      }

      if (this.y <= -3 && this.speedY < 0) {
        this.speedY -= (this.speedY * 2);
        i++;
      }
      if (this.x >= 1003 && this.speedX > 0) {
        this.speedX -= (this.speedX * 2);
        i++;
      }
      if (this.x <= -3 && this.speedX < 0) {
        this.speedX -= (this.speedX * 2);
        i++;
      if (i>=3) {
        return;
      }
    }
  }
}

function updateGameArea() {
  myGameArea.clear();
  desolate.newPos();
  desolate.update();
  desolate.control();
  bullet_01.newPos();
  bullet_01.update();
  bullet_01.bounce();
}