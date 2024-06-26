interface IStar {
    x: number;
    y: number;
    radius: number;
    brightness: number;
    life?: number;
}
class Stars {
    stars: IStar[];
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;
    count: number;
    frequency: number;
    duration: number;
    constructor(props) {
        let {count, frequency, duration, background} = props || {};
        this.stars = [];
        // 星星数量
        this.count = count || 200;
        // 出现概率
        this.frequency = frequency || 0.0001;
        // 持续时间
        this.duration = duration || 1000;
        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100;z-index: -1;';
        canvas.style.background = background || 'black';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
    }
    createStar() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            radius: Math.random() * 2 + 1,
            brightness: Math.random()* 0.5 + 0.5,
        }
    }

    drawStar(star) {
        let ctx = this.context;
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.fill();
    }
    animate() {
        let canvas = this.canvas;
        let ctx = this.context;
        let stars = this.stars;

        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = stars.length; i < this.count; i++) {
            stars.push(this.createStar());
        }

        for (let i = stars.length - 1; i >= 0; i--) {
            const star = stars[i];
            this.drawStar(star);

            if (Math.random() < 0.05) { 
                // 随机改变亮度，模拟闪烁
                star.brightness = Math.random() * 0.5 + 0.5;
            }

            if (Math.random() < this.frequency) { 
                // 添加流星
                const meteor = { ...star, life: this.duration };
                stars.push(meteor);
            }

            if (star.y > canvas.height + star.radius || star.y < -star.radius) {
                stars.splice(i, 1);
            } else {
                star.y += Math.random();
            }
        }

        // 绘制流星
        for (let i = stars.length - 1; i >= 0; i--) {
            const star = stars[i];
            if (star && 'life' in star) { // 确认对象是流星
                this.drawMeteor(star);
                if (typeof star.life === 'number') {
                    star.life -= 10;
                    if (star.life <= 0) {
                        stars.splice(i, 1);
                    }
                }
            }
        }
        requestAnimationFrame(()=>this.animate());
    }

    drawMeteor(meteor) {
        let ctx = this.context;
        if (!ctx) return;
        let stars = this.stars;
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(meteor.x + 100, meteor.y - 100);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
        // 流星下落速度
        meteor.x -= 15;
        meteor.y += 15;
        meteor.life -= 10;

        if (meteor.life <= 0) {
            stars.splice(stars.indexOf(meteor), 1);
        }
    }
}

export default Stars;