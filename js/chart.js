// ChartRenderer - Visualization Layer
class ChartRenderer {
  constructor(canvasElement) {
    if (!canvasElement) {
      console.error("Canvas element not found");
      return;
    }
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext("2d");
    if (!this.ctx) {
      console.error("Could not get 2D context from canvas");
      return;
    }
    this.categoryColors = {
      Food: "#FF6B6B",
      Transport: "#4ECDC4",
      Fun: "#FFE66D",
    };
  }

  render(categoryTotals) {
    if (!this.ctx) {
      console.error("Canvas context not available");
      return;
    }

    this.clear();

    const total = Object.values(categoryTotals).reduce(
      (sum, amount) => sum + amount,
      0,
    );

    if (total === 0) {
      this.drawEmptyState();
      return;
    }

    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2 - 20;
    const radius = Math.min(centerX, centerY) - 40;

    let currentAngle = -Math.PI / 2;
    const categoriesWithData = [];

    for (const [category, amount] of Object.entries(categoryTotals)) {
      if (amount > 0) {
        const percentage = (amount / total) * 100;
        const sliceAngle = (amount / total) * 2 * Math.PI;
        const endAngle = currentAngle + sliceAngle;

        this.drawPieSlice(
          centerX,
          centerY,
          radius,
          currentAngle,
          endAngle,
          this.categoryColors[category] || "#999999",
        );

        categoriesWithData.push({
          category,
          amount,
          percentage,
          color: this.categoryColors[category] || "#999999",
        });

        currentAngle = endAngle;
      }
    }

    this.drawLegend(categoriesWithData);
  }

  clear() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawPieSlice(centerX, centerY, radius, startAngle, endAngle, color) {
    this.ctx.beginPath();
    this.ctx.moveTo(centerX, centerY);
    this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    this.ctx.closePath();
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.strokeStyle = "#ffffff";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  drawLegend(categories) {
    const legendY = this.canvas.height - 60;
    const legendX = 20;
    const lineHeight = 20;

    this.ctx.font = "14px Arial";
    this.ctx.textAlign = "left";

    categories.forEach((cat, index) => {
      const y = legendY + index * lineHeight;

      this.ctx.fillStyle = cat.color;
      this.ctx.fillRect(legendX, y, 15, 15);

      this.ctx.fillStyle = "#333333";
      this.ctx.fillText(
        `${cat.category}: Rp ${cat.amount.toLocaleString("id-ID")} (${cat.percentage.toFixed(1)}%)`,
        legendX + 20,
        y + 12,
      );
    });
  }

  drawEmptyState() {
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "#999999";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "No expenses yet",
      this.canvas.width / 2,
      this.canvas.height / 2,
    );
  }
}
