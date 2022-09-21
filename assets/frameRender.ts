function frameRenderer(size, ball, ) {
    this.clearRect(0, 0, size.width, size.height);

  
    const drawCircle = (x, y, radius, color, alpha) => {
      this.save();
      this.beginPath();
      this.arc(x, y, radius, 0, Math.PI * 2);
      this.fillStyle = color;
      this.globalAlpha = alpha;
      this.fill();
      this.closePath();
      this.restore();
    };

    const winningCirles = (x, y, radius, text, color) => {
      this.save();
      this.beginPath();
      this.arc(x, y, radius, 0, Math.PI * 2);
      this.fillStyle = color;
      this.fill();
      this.closePath();
      this.restore();

      this.beginPath();
      this.font = '20px Monospace'
      this.textBaseline = 'middle';
      this.textAlign = 'center';
      this.fillStyle = 'white';
      this.fillText(text, x, y);
      this.closePath();
      this.restore();
    }
    
    winningCirles(50, 50, 15, 'x5', 'green');

    // drawCircle(ball.x, ball.y, ball.radius, "#F1EEE9");
  }
  
  export default frameRenderer;
  