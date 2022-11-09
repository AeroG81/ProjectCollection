"""
Author: Pan Wei Hung
Testing text scrapping tool for website https://www.69shu.com/txt/ 
"""
import requests
import re
from bs4 import BeautifulSoup
from ebooklib import epub

start = open("progress.txt", "r")
URL = start.read()

book = epub.EpubBook()
# set metadata
book.set_identifier('aero-001')
book.set_title('学霸的黑科技系统')
book.set_language('zh-CN')
book.add_author('晨星LL')
book.add_item(epub.EpubNcx())
book.add_item(epub.EpubNav())

# define CSS style
style = 'BODY {color: black;}'
nav_css = epub.EpubItem(uid="style_nav", file_name="style/nav.css", media_type="text/css", content=style)

# add CSS file
book.add_item(nav_css)

novel_content = []
spine = ['nav']
toc = []
i = 100
while i >= 0:
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, "html.parser")

    results = soup.find("div",class_="txtnav")

    for child in results.find_all("div"):
        child.decompose()


    # print(results.find("h1").text)
    # num = re.findall(r'\d+', results.find("h1").text[1:6])
    # print(num)
    # Write to file
    # create chapter
    chapter = epub.EpubHtml(title=results.find("h1").text, file_name=results.find("h1").text+'.xhtml', lang='zh-CN')
    chapter.set_content("<html><body>"+str(results)+"</body></html>")

    book.add_item(chapter)
    toc.append(chapter)
    spine.append(chapter)

    # Get next link
    nextUrl = soup.select_one("a:-soup-contains('下一章')")

    URL = nextUrl['href']
    
    # Update to progress txt
    progress = open("progress.txt", "w")
    progress.write(URL)
    progress.close()
    i-=1

book.spine = spine 
book.toc = ((epub.Section('MyBook'), toc), )

epub.write_epub('test.epub', book)