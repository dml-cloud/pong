const fs = require('fs');

// Simple 180x180 PNG with green/red paddles and white ball
// This is a minimal PNG file with RGBA data
function createPNG() {
    const width = 180;
    const height = 180;
    
    // PNG header and IHDR chunk
    const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
    
    // IHDR chunk
    const ihdr = Buffer.alloc(25);
    ihdr.writeUInt32BE(13, 0); // length
    ihdr.write('IHDR', 4);
    ihdr.writeUInt32BE(width, 8);
    ihdr.writeUInt32BE(height, 12);
    ihdr.writeUInt8(8, 16); // bit depth
    ihdr.writeUInt8(6, 17); // color type (RGBA)
    ihdr.writeUInt8(0, 18); // compression
    ihdr.writeUInt8(0, 19); // filter
    ihdr.writeUInt8(0, 20); // interlace
    
    // Calculate CRC for IHDR
    const zlib = require('zlib');
    const crc32 = require('zlib').crc32 || ((data) => {
        let crc = 0xFFFFFFFF;
        const table = [];
        for (let n = 0; n < 256; n++) {
            let c = n;
            for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
            table[n] = c;
        }
        for (let i = 0; i < data.length; i++) crc = table[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
        return (crc ^ 0xFFFFFFFF) >>> 0;
    });
    
    // Simple raw RGBA pixels (dark background with paddles and ball)
    const rawData = Buffer.alloc(width * height * 4);
    
    // Fill with dark blue background
    for (let i = 0; i < width * height; i++) {
        const x = i % width;
        const y = Math.floor(i / width);
        const offset = i * 4;
        
        rawData[offset] = 26;     // R
        rawData[offset + 1] = 26; // G
        rawData[offset + 2] = 46; // B
        rawData[offset + 3] = 255; // A
    }
    
    // Draw green paddle (left)
    const paddleW = 30, paddleH = 100, paddleX = 20;
    for (let y = 50; y < 50 + paddleH; y++) {
        for (let x = paddleX; x < paddleX + paddleW; x++) {
            const i = (y * width + x) * 4;
            rawData[i] = 0;     // R
            rawData[i + 1] = 255; // G
            rawData[i + 2] = 136; // B
            rawData[i + 3] = 255; // A
        }
    }
    
    // Draw red paddle (right)
    for (let y = 50; y < 50 + paddleH; y++) {
        for (let x = width - paddleX - paddleW; x < width - paddleX; x++) {
            const i = (y * width + x) * 4;
            rawData[i] = 255;   // R
            rawData[i + 1] = 107; // G
            rawData[i + 2] = 107; // B
            rawData[i + 3] = 255; // A
        }
    }
    
    // Draw white ball (center)
    const ballX = width / 2, ballY = height / 2, ballR = 20;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dx = x - ballX, dy = y - ballY;
            if (dx * dx + dy * dy <= ballR * ballR) {
                const i = (y * width + x) * 4;
                rawData[i] = 255;
                rawData[i + 1] = 255;
                rawData[i + 2] = 255;
                rawData[i + 3] = 255;
            }
        }
    }
    
    // Compress with zlib
    const compressed = zlib.deflateSync(rawData, { level: 9 });
    
    // Create IDAT chunk
    const idat = Buffer.alloc(compressed.length + 12);
    idat.writeUInt32BE(compressed.length, 0);
    idat.write('IDAT', 4);
    compressed.copy(idat, 8);
    
    // Calculate CRCs
    const ihdrData = ihdr.slice(4, 21);
    const idatData = Buffer.concat([Buffer.from('IDAT'), compressed]);
    
    // Simple CRC32
    function crc(data) {
        let crc = 0xFFFFFFFF;
        const table = [];
        for (let n = 0; n < 256; n++) {
            let c = n;
            for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
            table[n] = c;
        }
        for (let i = 0; i < data.length; i++) crc = table[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
        return (crc ^ 0xFFFFFFFF) >>> 0;
    }
    
    const ihdrCrc = crc(ihdrData);
    const idatCrc = crc(idatData);
    
    ihdr.writeUInt32BE(ihdrCrc, 21);
    idat.writeUInt32BE(idatCrc, idat.length - 4);
    
    // IEND chunk
    const iend = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82]);
    
    return Buffer.concat([signature, ihdr, idat, iend]);
}

const png = createPNG();
fs.writeFileSync('/c/Proyectos/Claude/pong-game/icon.png', png);
console.log('Icon created: icon.png (' + png.length + ' bytes)');
