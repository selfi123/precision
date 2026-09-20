import re
with open('public/index.html', 'r', encoding='utf-8') as f:
    html = f.read()
with open('panels_chunk.html', 'r', encoding='utf-8') as f:
    chunk = f.read()

new_html = re.sub(
    r'<div class=\"table-responsive mt-5\">.*?</table>\n      </div>',
    chunk,
    html,
    flags=re.DOTALL
)

with open('public/index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)
