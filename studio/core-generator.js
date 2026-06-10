const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'input.json');
const templateHtmlPath = path.join(__dirname, 'templates', 'index.html');
const templateJsPath = path.join(__dirname, 'templates', 'motion.js');
const outputHtmlPath = path.join(__dirname, 'build', 'index.html');
const outputJsPath = path.join(__dirname, 'build', 'motion.js');

function generate() {
    console.log('Ensuring build directory exists...');
    const buildDir = path.dirname(outputHtmlPath);
    if (!fs.existsSync(buildDir)) {
        fs.mkdirSync(buildDir, { recursive: true });
    }

    console.log('Reading input data...');
    const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

    console.log('Reading templates...');
    const htmlTemplate = fs.readFileSync(templateHtmlPath, 'utf8');
    const jsTemplate = fs.readFileSync(templateJsPath, 'utf8');

    let htmlContent = '';
    let jsContent = '';
    let antvScripts = '';

    data.forEach((chunk, index) => {
        const id = `chunk-${index}`;
        const layoutClass = chunk.layout_style ? `layout-${chunk.layout_style}` : '';

        // Build HTML
        htmlContent += `<div id="${id}" class="chunk-container ${layoutClass}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; opacity: 0;">\n`;
        htmlContent += `  <div class="spoken-text">${chunk.spoken_text}</div>\n`;

        if (chunk.metric_data) {
            htmlContent += `  <div id="chart-${index}" class="metric-container" style="display: block;"></div>\n`;

            // Generate AntV G2 script for this chart
            antvScripts += `
// Chart for chunk ${index}
(function() {
    const chart = new G2.Chart({
        container: 'chart-${index}',
        autoFit: true,
        theme: 'classicDark' // Using dark theme for transparency base
    });

    chart.data(${JSON.stringify(chunk.metric_data)});

    chart.interval()
        .encode('x', 'year')
        .encode('y', 'sales')
        .style('fill', '#ffffff')
        .style('fillOpacity', 0.8)
        .style('radiusTopLeft', 8)
        .style('radiusTopRight', 8);

    chart.axis('x', {
        labelFill: '#ffffff',
        titleFill: '#ffffff',
        gridStroke: 'rgba(255, 255, 255, 0.1)'
    });

    chart.axis('y', {
        labelFill: '#ffffff',
        titleFill: '#ffffff',
        gridStroke: 'rgba(255, 255, 255, 0.1)'
    });

    chart.render();
})();
`;
        }

        htmlContent += `</div>\n`;

        // Build GSAP Timeline logic
        const duration = chunk.end_time - chunk.start_time;
        // Basic fade in/out sequence for the chunk container
        jsContent += `
// Animation for ${id} (Start: ${chunk.start_time}s, End: ${chunk.end_time}s)
tl.to("#${id}", { opacity: 1, duration: 0.5 }, ${chunk.start_time});
`;
        // Animate spoken text inside
        jsContent += `tl.fromTo("#${id} .spoken-text", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, ${chunk.start_time} + 0.2);\n`;

        // Animate chart if exists
        if (chunk.metric_data) {
            jsContent += `tl.fromTo("#chart-${index}", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" }, ${chunk.start_time} + 0.4);\n`;
        }

        // Fade out at end_time
        jsContent += `tl.to("#${id}", { opacity: 0, duration: 0.5 }, ${chunk.end_time} - 0.5);\n`;
    });

    // Replace placeholders
    let finalHtml = htmlTemplate.replace('<!-- DYNAMIC_CONTENT_PLACEHOLDER -->', htmlContent);
    // Inject AntV scripts just before closing body if we have any
    if (antvScripts) {
        finalHtml = finalHtml.replace('</body>', `\n<script>\n${antvScripts}\n</script>\n</body>`);
    }

    const finalJs = jsTemplate.replace('// DYNAMIC_MOTION_PLACEHOLDER', jsContent);

    console.log('Writing outputs to build folder...');
    fs.writeFileSync(outputHtmlPath, finalHtml);
    fs.writeFileSync(outputJsPath, finalJs);
    console.log('Generation complete.');
}

generate();
