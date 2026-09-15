const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const textInput = document.getElementById('textInput');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const counter = document.getElementById('counter');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = [
    '#ff3b3b',
    '#3bb2ff',
    '#3bff6b',
    '#fff23b',
    '#ff3bd4',
    '#b23bff',
    '#ff9d3b',
    '#3bfff2'
];

const fontSize = 26;

let objects = [];

function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function createObject(text) {
    ctx.font = `bold ${fontSize}px sans-serif`;

    const width = ctx.measureText(text).width + 24;
    const height = fontSize + 20;

    return {
        text: text,
        width: width,
        height: height,
        x: Math.random() * (canvas.width - width),
        y: Math.random() * (canvas.height - height),
        dx: (Math.random() < 0.5 ? -1 : 1) * (1.5 + Math.random() * 2),
        dy: (Math.random() < 0.5 ? -1 : 1) * (1.5 + Math.random() * 2),
        color: randomColor()
    };
}

objects.push(createObject('DVD'));
objects.push(createObject('BOUNCE'));

function updateCounter() {
    counter.textContent = `Objects: ${objects.length}`;
}

function addText() {
    const value = textInput.value.trim();

    if (value.length === 0) {
        return;
    }

    objects.push(createObject(value));

    textInput.value = '';

    updateCounter();
}

addBtn.addEventListener('click', addText);

textInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addText();
    }
});

clearBtn.addEventListener('click', () => {
    objects = [];
    updateCounter();
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const obj of objects) {
        obj.x += obj.dx;
        obj.y += obj.dy;

        let bounced = false;

        if (obj.x <= 0 || obj.x + obj.width >= canvas.width) {
            obj.dx = -obj.dx;
            bounced = true;
        }

        if (obj.y <= 0 || obj.y + obj.height >= canvas.height) {
            obj.dy = -obj.dy;
            bounced = true;
        }

        if (bounced) {
            obj.color = randomColor();
        }

        obj.x = Math.max(
            0,
            Math.min(obj.x, canvas.width - obj.width)
        );

        obj.y = Math.max(
            0,
            Math.min(obj.y, canvas.height - obj.height)
        );

        ctx.fillStyle = obj.color;
        ctx.font = `bold ${fontSize}px monospace`;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';

        ctx.fillText(
            obj.text,
            obj.x + obj.width / 2,
            obj.y + obj.height / 2
        );
    }

    requestAnimationFrame(draw);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

updateCounter();
draw();
