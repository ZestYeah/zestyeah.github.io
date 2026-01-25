document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('rose-petals');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const petals = [];
        const numPetals = 30;

        class Petal {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height * 2 - height;
                this.w = 25 + Math.random() * 15;
                this.h = 20 + Math.random() * 10;
                this.opacity = this.w / 40;
                this.flip = Math.random();
                this.xSpeed = 1.5 + Math.random() * 2;
                this.ySpeed = 1 + Math.random() * 1;
                this.flipSpeed = Math.random() * 0.03;
            }

            draw() {
                if (this.y > height || this.x > width) {
                    this.x = -this.w;
                    this.y = Math.random() * height * 2 - height;
                    this.xSpeed = 1.5 + Math.random() * 2;
                    this.ySpeed = 1 + Math.random() * 1;
                    this.flip = Math.random();
                }
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.bezierCurveTo(
                    this.x - this.w / 2, this.y - this.h / 2,
                    this.x - this.w / 2, this.y + this.h / 2,
                    this.x, this.y + this.h
                );
                ctx.bezierCurveTo(
                    this.x + this.w / 2, this.y + this.h / 2,
                    this.x + this.w / 2, this.y - this.h / 2,
                    this.x, this.y
                );
                ctx.fillStyle = 'rgba(233, 30, 99, 0.7)'; // Rose pink color
                ctx.fill();
            }

            animate() {
                this.x += this.xSpeed;
                this.y += this.ySpeed;
                this.flip += this.flipSpeed;
                this.draw();
            }
        }

        for (let i = 0; i < numPetals; i++) {
            petals.push(new Petal());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            petals.forEach(petal => petal.animate());
            requestAnimationFrame(animate);
        }

        animate();
    }
});
