from pathlib import Path

p=Path('pom.xml')
t=p.read_text(encoding='utf-8')
idx=t.index('<artifactId>maven-compiler-plugin</artifactId>')
print(repr(t[idx-120:idx+120]))
