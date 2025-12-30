// 動画自動切り替え機能
const video = document.getElementById('bg-video');
let currentVideoIndex = 1;
const totalVideos = 4;

// 動画のスムーズトランジション
video.style.transition = 'opacity 0.3s ease';

// 動画が終了したら次の動画に切り替え
video.addEventListener('ended', () => {
    // 次の動画インデックスを計算（1→2→3→4→1...）
    currentVideoIndex = currentVideoIndex % totalVideos + 1;

    // 動画をフェードアウト
    video.style.opacity = '0';

    setTimeout(() => {
        // 動画ソースを変更
        video.src = `../movie/m${currentVideoIndex}.mp4`;
        video.load();
        video.play();

        // 動画をフェードイン
        video.style.opacity = '1';
    }, 300);
});

// パーティクルエフェクト
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.opacity = Math.random();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.speed = Math.random() * 1 + 0.5;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;

        // ゴールドとホワイトの色をランダムに
        const colors = [
            { r: 255, g: 215, b: 0 },   // ゴールド
            { r: 255, g: 255, b: 255 }, // ホワイト
            { r: 255, g: 237, b: 78 }   // ライトゴールド
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speed;

        // 画面外に出たらリセット
        if (this.y > canvas.height) {
            this.reset();
        }

        // ゆらゆら動く
        this.x += Math.sin(this.y * 0.01) * 0.5;
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // グロー効果
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
    }
}

// パーティクルの生成
const particles = [];
const particleCount = window.innerWidth < 768 ? 30 : 50;

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// アニメーションループ
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

animate();

// リサイズ対応
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ページロード時のアニメーション
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// キラキラエフェクトをランダムに追加
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.background = 'white';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '100';
    sparkle.style.boxShadow = '0 0 10px white';

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.animation = 'sparkle 1s ease-out forwards';

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// スパークルアニメーションのCSS追加
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 0;
            transform: scale(0);
        }
        50% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(style);

// 定期的にキラキラを追加
setInterval(createSparkle, 500);

// タッチデバイスでの動画自動再生対応
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function playVideo() {
        video.play();
        document.removeEventListener('touchstart', playVideo);
    }, { once: true });
}
