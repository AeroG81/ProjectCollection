"""
Author: Pan Wei Hung
Updated: 11/11/2022
Testing text scrapping tool for website https://www.69shu.com/txt/ 
"""
import requests
from bs4 import BeautifulSoup
from ebooklib import epub

def create_book(book_obj, identifier, title, author):
    book = book_obj
    # set metadata
    book.set_identifier(identifier)
    book.set_title(title)
    book.set_language('zh-CN')
    book.add_author(author)
    book.add_item(epub.EpubNcx())
    book.add_item(epub.EpubNav())

    # define CSS style
    style = 'BODY {color: black;}'
    nav_css = epub.EpubItem(uid="style_nav", file_name="style/nav.css", media_type="text/css", content=style)

    # add CSS file
    book.add_item(nav_css)
    return book

def book_input():
    print("Input identifier")
    identifier = input()    # 'aero-001'
    print("Input Title")
    title = input()         # '学霸的黑科技系统'
    print("Input Author:")
    author = input()        # '晨星LL'
    print("Input Starting URL:")
    URL = input()
    print("Input Table Of Content URL:")
    tocURL = input()        # /txt/29162.htm
    return identifier, title, author, URL, tocURL

def main_scrap():
    identifier, title, author, URL, tocURL = book_input()
    book = create_book(epub.EpubBook(), identifier, title, author)
    spine = ['nav']
    toc = []

    flag = True
    while flag:
        page = requests.get(URL)
        soup = BeautifulSoup(page.content, "html.parser")
        results = soup.find("div",class_="txtnav")

        # trim out uneccessary data
        for child in results.find_all("div"):
            child.decompose()

        # create chapter
        chapter = epub.EpubHtml(title=results.find("h1").text, file_name=results.find("h1").text+'.xhtml', lang='zh-CN')
        chapter.set_content("<html><body>"+str(results)+"</body></html>")

        # add chapter to book, append to bookitem, toc, spine
        book.add_item(chapter)
        toc.append(chapter)
        spine.append(chapter)

        # Get next link
        URL = soup.select_one("a:-soup-contains('下一章')")['href']

        # Update current progress to progress.txt
        progress = open("progress.txt", "w")
        progress.write(URL)
        progress.close()
        print(results.find("h1").text)
        print(URL)
        print(URL == tocURL)
        # Check if page reached end
        if URL == tocURL:
            flag = False

    book.spine = spine 
    book.toc = ((epub.Section('MyBook'), toc), )

    epub.write_epub('test.epub', book)
    return

def main():
    exec = True
    print("Scrap Tool for https://www.69shu.com/txt/ \nmode:\ns: scrap novel\nc: commands\nq: quit tool")
    while exec:
        mode = input()
        if mode == 'c':
            print("Scrap Tool for https://www.69shu.com/txt/ \nmode:\ns: scrap novel\nc: commands\nq: quit tool")
        elif mode == 's':
            main_scrap()
        elif mode == 'q':
            exec = False
        else:
            print("Incorrect Command! use c for more commands")

if __name__ == "__main__":
    main()
