const html = [];
html.push('<p>');
html.push('hello');
html.push('</p>');

console.log(html.join(''));

const words = ['hello', 'world'];
const html2 = [];
html2.push('<ul>\n');
for (let word of words) {
  html2.push(`<li>${word}</li>\n`);
}
html2.push('</ul>');
console.log(html2.join(''));
