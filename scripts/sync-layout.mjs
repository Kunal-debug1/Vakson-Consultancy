import { readFile, writeFile } from 'node:fs/promises';

const pages = ['index.html', 'about.html', 'services.html', 'service-solar.html', 'service-audit.html', 'service-efficiency.html', 'service-water.html', 'service-electrical.html', 'service-hvac.html', 'service-mep.html', 'contact.html'];
const header = await readFile('templates/partials/header.html', 'utf8');
const footer = await readFile('templates/partials/footer.html', 'utf8');

for (const page of pages) {
  const active = page === 'index.html' ? 'home' : page === 'about.html' ? 'about' : page === 'contact.html' ? 'contact' : 'services';
  const pageHeader = header.replace(/\{\{active_(home|about|services|contact)\}\}/g, (_, key) => key === active ? ' class="active"' : '');
  const source = await readFile(page, 'utf8');
  const withHeader = source.replace(/<header id="header"[\s\S]*?<\/header>/, pageHeader);
  const output = withHeader.replace(/<footer id="footer"[\s\S]*?<\/footer>/, footer);
  await writeFile(page, output);
}
