from pathlib import Path

p=Path('pom.xml')
t=p.read_text(encoding='utf-8')

# Add fork=true to configuration
old_config = '\t\t\t\t<configuration>\n\t\t\t\t\t<useIncrementalCompilation>false</useIncrementalCompilation>\n\t\t\t\t</configuration>\n\t\t\t\t<executions>'
new_config = '\t\t\t\t<configuration>\n\t\t\t\t\t<useIncrementalCompilation>false</useIncrementalCompilation>\n\t\t\t\t\t<fork>true</fork>\n\t\t\t\t</configuration>\n\t\t\t\t<executions>'

if old_config in t:
    t = t.replace(old_config, new_config, 1)
    p.write_text(t, encoding='utf-8')
    print('Updated pom.xml')
else:
    print('Pattern not found')
