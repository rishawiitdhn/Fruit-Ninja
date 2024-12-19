let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 585;
let gravity = 0.02;
let score = 0;
let scorePara = document.querySelector("#score");
let mousePath = []; 
const maxPathLength = 5; 

c.fillRect(300, 100, canvas.width, canvas.height);

class sprite {
    constructor({position, velocity, height = 50, color = "red", upward }) {
    this.position = position;
    this.velocity = velocity;
    this.height = height;
    this.width = 50;
    this.color = color;
    this.upward = true;
    
    }
    draw() {
        
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        
    }

    update () {
        this.draw();
        if(this.upward){
        this.position.x += this.velocity.x;
        this.position.y -= this.velocity.y;
        if(this.position.y + this.height + this.velocity.y <= 250){
            this.upward = false;
        }
        
    }
       else{
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if(this.position.y + this.height + this.velocity.y >= canvas.height + 100){
            this.velocity.y = 0;
            this.velocity.x = 0;
            this.position.y = 100 + canvas.height - this.height;
        }
        this.position.y += gravity;
        this.upward = false;
       }
    }
}

const banana = new sprite({
   position :{
    x: 500,
    y: 635
   },
   velocity: {
    x: 0.5,
    y: 1.5
   },
   color: "purple"
});
const orange = new sprite({
    position :{
     x: 560,
     y: 635
    },
    velocity: {
     x: 0.75,
     y: 1
    }, 
    color : 'blue'
 });
 const watermelon = new sprite({
    position :{
     x: 560,
     y: 635
    },
    velocity: {
     x: 1,
     y: 2
    },
    color: 'green'
 });
 const redApple = new sprite({
    position :{
     x: 600,
     y: 635
    },
    velocity: {
     x: 0.75,
     y: 1.5
    },
    color: 'pink'   
 });
 
 const bomb = new sprite({
    position :{
     x: 620,
     y: 635
    },
    velocity: {
     x: 1,
     y: 3
    },
    color: 'white'
 });

let fruits = [banana, orange, watermelon, redApple, bomb];


let fruitNumber1 = Math.floor(Math.random() * 5);
let fruitNumber2 = Math.floor(Math.random() * 5);
console.log(fruitNumber1);
console.log(fruitNumber2);

let fruit;
function ejecting () {
    if(fruitNumber1 <= fruitNumber2){
    for(let i=fruitNumber1; i<=fruitNumber2; i++){
        fruit = fruits[i];
        fruit.update();
    }
}
    else if(fruitNumber1 > fruitNumber2){
        for(let i=fruitNumber1; i>=fruitNumber2; i--){
            fruit = fruits[i];
            fruit.update();
        }
    }
        
}


canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    
    mousePath.push({ x: mouseX, y: mouseY });

    
    if (mousePath.length > maxPathLength) {
        mousePath.shift();
    }
});


function checkSlice(fruit) {
    for (let i = 0; i < mousePath.length - 1; i++) {
        const p1 = mousePath[i];
        const p2 = mousePath[i + 1];

        
        if (
            p1.x < fruit.position.x + fruit.width &&
            p2.x > fruit.position.x &&
            p1.y < fruit.position.y + fruit.height &&
            p2.y > fruit.position.y
        ) {
            return true; 
        }
    }
    return false;
}


function ejecting() {
    for (let fruit of fruits) {
        fruit.update();

        
        if (checkSlice(fruit)) {
            console.log(`${fruit.color} fruit sliced!`);
            score += 10;
            scorePara.textContent = `Score: ${score}`;

            
            fruit.position.y = canvas.height + 100; 
        }
    }
}


function drawSlice() {
    c.strokeStyle = "white";
    c.lineWidth = 2;
    c.beginPath();
    for (let i = 0; i < mousePath.length; i++) {
        const point = mousePath[i];
        if (i === 0) {
            c.moveTo(point.x, point.y);
        } else {
            c.lineTo(point.x, point.y);
        }
    }
    c.stroke();
}

const animate = () => {
window.requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(300, 100, canvas.width, canvas.height - 100);
    ejecting();
    drawSlice(); 
}
animate();

