let gas = 250;
    let windspeed = 2;
    let gaslevel = 0;
    let MoveLightHouse = 0;
    let temperature = 80;
    let speed_next_level = 0;
    let crash = 0;
    let score = 0;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    

    const ball = {
      x: 40,
      y: 450,
      radius: 65,
      speedY: 0.02, // speed ballon down
      gravity: 0.01, // gravity akceleration
      
    };

    let isSpacePressed = false; 
    let spaceAccel = -0.02; 
    
    const LightHouseImage = new Image();
    LightHouseImage.src = 'hv4.png';

    
    const ballImage = new Image();
    ballImage.src = 'ball2.png'; // ballon img

    const startImage = new Image();
    startImage.src = 'start.png'; // start point img
      
    const endImage = new Image();
    endImage.src = 'cil.png'; // end point img 

    
    function drawBall() {

        // Draw balloon, startpoint, endpoint, LighHouse
  
      ctx.drawImage(LightHouseImage, 300 + MoveLightHouse, 300, 100, 200);
      ctx.drawImage(startImage, 22, 485, 50, 10);
      ctx.drawImage(endImage, 900, 485, 50, 10);
      ctx.drawImage(ballImage, ball.x - ball.radius, ball.y - ball.radius, 150, 150);

      speedBallonText = ball.speedY * 10;

      // flying text Ballon 
      ctx.font = '16px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText('y  = ' + ball.y.toFixed(0), ball.x, ball.y - ball.radius - 20); 
      ctx.fillText('x = ' + ball.x.toFixed(0), ball.x, ball.y - ball.radius - 40); 
      ctx.fillText('m/s = ' +  speedBallonText.toFixed(0), ball.x, ball.y - ball.radius - 60); 
 
      // Static text

      ctx.fillText('wind speed (m/s) :  ' + windspeed.toFixed(0), 60, 50); 

      ctx.fillText('score :  ' + MoveLightHouse.toFixed(0), 800, 90);  

      if (temperature  > 150  ) {
        ctx.fillStyle = 'red';
            } 
      
ctx.fillText('temperature : ' + temperature.toFixed(0), 800, 50); 

ctx.fillStyle = 'white';

if (gas  < 10 ) {
  ctx.fillStyle = 'red';
      } 

ctx.fillText('gas : ' +  gas.toFixed(0), 800, 70 ); 


if (crash == 1) {
 
  ctx.fillStyle = 'red';
ctx.fillText('Game Over - score:' +  score.toFixed(0), 450, 120 );
} 

      
if ( ball.x <= 40 ) {
 
 
ctx.fillStyle = 'white';
ctx.fillText('To start, hold down the space bar.', 410, 150 );


     }    

} 



    function update() {

       
      // Gravity simulation
      ball.speedY += ball.gravity;
     
      // akcelereration contra gravity - space key on
      
      if (gas > 1) {
        
      if (isSpacePressed) {
          ball.speedY += spaceAccel;
          audio = document.getElementById("myAudio");
  audio.play();
      }
    }

      // move ballon down
      ball.y += ball.speedY;
      temperature = temperature - 0.2;

     // Start ballon
      if (ball.y < 435) {
        ball.x = ball.x + 0.5 + speed_next_level;
        
        score = 0;
        crash = 0;
      } 


      

     // Collision Light house
      if (ball.x > 300 + MoveLightHouse && ball.y > 250 && ball.x < 360 + MoveLightHouse) {
        Collision();
      } 
    
      // High temperature 
      if (temperature > 200) {
        Collision();
      } 

      


      // minimal temepratere = 80 
      if (temperature  < 80) {
        
        temperature = 80;
      } 

      if (gas < 1) {
        
        gas = 0;
      } 
      // Balon Land successfully -  Next level
      if (ball.x > 890 && ball.y >= 432 && ball.x < 930 && speedBallonText <= 4) {
        ball.y = 450;
        ball.x = 40;
        temperature = 80;
        MoveLightHouse = MoveLightHouse + 60;
        speed_next_level = speed_next_level + 0.25;
        temperature = 80;
        gaslevel = gaslevel + 35;
        gas = 250 - gaslevel;
        windspeed = windspeed + 4;
        

       } 
       
       // Colision low fly
       if (ball.y >= 434 && ball.x > 60) {
        Collision();
       } 
      
       // Stop ballon on border canvas (for start ballon positions)
       if (ball.y + ball.radius > canvas.height) {
        ball.speedY = 0; 
        ball.y = canvas.height - ball.radius; 
        

      }
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw new position
      drawBall();


      // Start animation
      requestAnimationFrame(update);
    }

    // Listenig space key on

    
       
    window.addEventListener('keydown', (event) => {
      if (event.key === ' ') {
        isSpacePressed = true;
        temperature = temperature + 2;
        gas = gas - 1;
      }
    });
  

    // Listenig space key off
    window.addEventListener('keyup', (event) => {
      if (event.key === ' ') {
        isSpacePressed = false;
        
      }
    });

    update();

  // Colision (reset all val) - start new game
    function Collision()  {
    

      
      
      ball.y = 450;
        ball.x = 40;
        temperature = 80;
        gaslevel = 0;
        score = MoveLightHouse ;
        MoveLightHouse = 0;
        speed_next_level = 0;
        windspeed = 2;
        gas = 250;
        crash = 1;


        
drawBall();       




        
       }  