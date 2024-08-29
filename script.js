const imageInput = document.getElementById('image-input');
const asciiOutput = document.getElementById('ascii-output');
const scaleInput = document.getElementById('scale');
const charsInput = document.getElementById('chars');
const colorModeInput = document.getElementById('color-mode');
const invertInput = document.getElementById('invert');
const brightnessInput = document.getElementById('brightness');
const contrastInput = document.getElementById('contrast');
const exportBtn = document.getElementById('export-btn');

let currentImage = null;
let isAnimated = false;
let frames = [];

imageInput.addEventListener('change', handleImage);
scaleInput.addEventListener('input', updateAscii);
charsInput.addEventListener('input', updateAscii);
colorModeInput.addEventListener('change', updateAscii);
invertInput.addEventListener('change', updateAscii);
brightnessInput.addEventListener('input', updateAscii);
contrastInput.addEventListener('input', updateAscii);
exportBtn.addEventListener('click', exportAsImage);

function handleImage(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            if (file.type === 'image/gif') {
                handleGif(event.target.result);
            } else {
                currentImage = new Image();
                currentImage.onload = updateAscii;
                currentImage.src = event.target.result;
            }
        }
        reader.readAsDataURL(file);
    }
}

function handleGif(gifSrc) {
    isAnimated = true;
    frames = [];
    gifFrames({ url: gifSrc, frames: 'all', outputType: 'canvas' })
        .then(function (frameData) {
            frameData.forEach(frame => {
                const img = new Image();
                img.src = frame.getImage().toDataURL();
                frames.push(img);
            });
            animateAscii();
        });
}

function animateAscii() {
    let frameIndex = 0;
    setInterval(() => {
        currentImage = frames[frameIndex];
        updateAscii();
        frameIndex = (frameIndex + 1) % frames.length;
    }, 100);
}

function updateAscii() {
    if (currentImage) {
        const ascii = convertToAscii(currentImage);
        asciiOutput.innerHTML = ascii;
        asciiOutput.classList.toggle('color', colorModeInput.checked);
    }
}

function convertToAscii(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const scaleFactor = parseFloat(scaleInput.value);
    const width = Math.floor(img.width * scaleFactor);
    const height = Math.floor(img.height * scaleFactor);
    const chars = charsInput.value || '@#S%?*+;:,.';

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, width, height);
    let asciiArt = '';

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const offset = (y * width + x) * 4;
            let r = imageData.data[offset];
            let g = imageData.data[offset + 1];
            let b = imageData.data[offset + 2];

            // Apply brightness and contrast
            [r, g, b] = applyBrightnessContrast(r, g, b);

            // Invert colors if needed
            if (invertInput.checked) {
                r = 255 - r;
                g = 255 - g;
                b = 255 - b;
            }

            const brightness = (r + g + b) / 3;
            const charIndex = Math.floor(brightness / 255 * (chars.length - 1));

            if (colorModeInput.checked) {
                asciiArt += `<span style="color: rgb(${r},${g},${b})">${chars[charIndex]}</span>`;
            } else {
                asciiArt += chars[charIndex];
            }
        }
        asciiArt += '<br>';
    }

    return asciiArt;
}

function applyBrightnessContrast(r, g, b) {
    const brightness = parseInt(brightnessInput.value);
    const contrast = parseInt(contrastInput.value);

    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

    r = clamp(factor * (r - 128) + 128 + brightness);
    g = clamp(factor * (g - 128) + 128 + brightness);
    b = clamp(factor * (b - 128) + 128 + brightness);

    return [r, g, b];
}

function clamp(value) {
    return Math.max(0, Math.min(255, value));
}

function exportAsImage() {
    // Set a temporary background color for better export
    const originalBackground = asciiOutput.style.backgroundColor;
    asciiOutput.style.backgroundColor = 'black';

    html2canvas(asciiOutput, {
        backgroundColor: null,
        scale: 2 // Increase resolution
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'ascii_art.png';
        link.href = canvas.toDataURL();
        link.click();

        // Restore original background
        asciiOutput.style.backgroundColor = originalBackground;
    });
}

// Initial console message
console.log('ASCII Art Generator is ready to use. Select an image or GIF to begin!');