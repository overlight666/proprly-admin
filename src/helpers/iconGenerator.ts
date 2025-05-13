export function createSVGText(text: any, x: any, y: any, font = 'Arial', fontSize = '16', fill = 'black') {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '200'); // Adjust as needed
    svg.setAttribute('height', '100'); // Adjust as needed

    const textElement = document.createElementNS(svgNS, 'text');
    textElement.setAttribute('x', x);
    textElement.setAttribute('y', y);
    textElement.setAttribute('font-family', font);
    textElement.setAttribute('font-size', fontSize);
    textElement.setAttribute('fill', fill);
    textElement.textContent = text;

    svg.appendChild(textElement);
    return svg;
}
