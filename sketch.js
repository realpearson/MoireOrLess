let cnv;

let grids = [];

let size = 20;
let cols = 100;
let rows = 100;

let rot = 0;

function setup() {
  //createCanvas(400, 400);
  
  window.addEventListener('click', ()=>{
    fullscreen(!fullscreen());
  });
  
  pixelDensity(displayDensity());
  cnv = createCanvas(displayWidth, displayHeight);
  //cnv = createCanvas(displayWidth * (1 / displayDensity()), displayHeight * (1 / displayDensity()));

  //size = displayWidth/70;
  //cols = displayWidth/10;
  
  grids.push(new grid());
  grids.push(new grid());
  grids.push(new grid());
}

function draw() {
  background(20);
  
  //for(let g of grids) g.display();
  //translate(-width/4+(rows-1)*size/2,-width/4 + (cols-1)*size/2);
  translate(-400 +(rows-1)*size/2,-400 +(cols-1)*size/2);
  grids[0].display();
  rotate(rot);
  grids[1].display();
  rotate(rot*1.1);
  grids[2].display();
   
  rot +=0.0003;
}

function grid(){
  let pg = createGraphics(size*(cols-1), size*(rows-1));
  
  //Offset Logic
  let seedX = random(1000);
  let seedY = random(1000);
  let seedZoom = random(1000);
  const inc = 0.00123;
  const offsetAmt = size / 2;
  
  pg.stroke(random(255), random(255), random(255));
  pg.strokeWeight(3);
  for(let x = 0; x < cols; x++){
    for(let y = 0; y < rows; y++){
      pg.line(x * size, 0, x * size, (rows-1)*size);
      pg.line(0, y * size, (cols-1)*size, y * size);
    }
  }
  
  
  this.display = function(){
    if(random(100) < 5){
      pg.erase();
      const rx = Math.floor(random(cols));
      const ry = Math.floor(random(rows));
      pg.strokeWeight(4);
      pg.rect(rx * size, ry * size, size, size);
      pg.noErase();
    } else if(random(100) < 2) {
        const rx = Math.floor(random(cols));
        const ry = Math.floor(random(rows));
        //pg.strokeWeight(4);
        pg.fill(random(255), random(255), random(255));
      
        pg.rect(rx * size, ry * size, size, size);
    }
    seedX += inc;
    seedY += inc;
    seedZoom += inc;
    const offX = (noise(seedX) - 0.5) * 2 * offsetAmt;
    const offY = (noise(seedY) - 0.5) * 2 * offsetAmt;
    const zoom = noise(seedZoom) +1;
    scale(zoom, zoom);
    image(pg, -(rows-1)*size/2 + offX, -(cols-1)*size/2 + offY);
  }
}
