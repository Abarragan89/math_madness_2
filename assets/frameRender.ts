function frameRenderer(ball, size) {
    this.clearRect(0, 0, size.width, size.height / 2);

    const drawCircle = (x, y, radius, color) => {
      this.save();
      this.beginPath();
      this.arc(x, y, radius, 0, Math.PI * 2);
      this.fillStyle = color;
      this.fill();
      this.closePath();
      this.restore();
    };

    drawCircle(ball.x, ball.y, ball.radius, "green");
  }
  
  export default frameRenderer;
  