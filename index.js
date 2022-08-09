const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");

// change the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// to crate gravity used in the game for our player
const gravity = 0.5;
// to crate a player
class Player {
  constructor() {
    // make a player asqare
    // x and y posstion
    // width and th eheight
    this.position = {
      x: 100,
      y: 100,
    };
    // ad vilosoty to our player
    this.velocity = {
      x: 0, // 0 is on the top
      y: 0, // numbers get bigger
    };
    this.width = 30;
    this.height = 30;
  }
  // define how our player looks on the screen
  // use canvas context

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  // update the player proprieties over time
  // used un update function
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // this will stop the player on the botton of the screen
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else this.velocity.y = 0;
  }
}

//Crate the platforms object
class Platform {
  constructor() {
    this.position = {
      x: 200,
      y: 100,
    };
    this.width = 200;
    this.height = 20;
  }
  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

//crate the player
const player = new Player();
// create the platform
const platform = new Platform();
// defining the keys object
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

// crate an animation to make our player to move
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  platform.draw();

  let randomNumber1 = Math.floor(Math.random() * 10 + 1);
  let randomNumber2 = Math.floor(Math.random() * 10 + 1);
  let sum = randomNumber1 + randomNumber2;

  if (keys.right.pressed) {
    player.velocity.x = 3;
  } else if (keys.left.pressed) {
    player.velocity.x = -3;
  } else player.velocity.x = 0;
  /// platform colision detection
  if (
    player.position.y + player.height <= platform.position.y &&
    player.position.y + player.height + player.velocity.y >=
      platform.position.y &&
    player.position.x + player.width >= platform.position.x &&
    player.position.x < +platform.position.x + platform.width
  ) {
    let guess = prompt(
      "Please solve the problem: " + randomNumber1 + "+" + randomNumber2
    );
    if (guess == sum) {
      player.velocity.y = 0;
      return;
    }
  }
}
animate();

// adding event

addEventListener("keydown", function ({ keyCode }) {
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = true;
      break;
    case 83:
      console.log("down");
      break;
    case 68:
      console.log("right");
      keys.right.pressed = true;
      break;
    case 87:
      console.log("up");
      player.velocity.y -= 20;
      break;
  }
});

addEventListener("keyup", function ({ keyCode }) {
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = false;

      break;
    case 83:
      console.log("down");
      break;
    case 68:
      console.log("right");
      keys.right.pressed = false;

      break;
    case 87:
      console.log("up");
      break;
  }
});
