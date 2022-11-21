"""
Author: Pan Wei Hung
Updated: 21/11/2022
Testing text scrapping tool for website https://www.69shu.com/txt/ 
"""
import requests
from bs4 import BeautifulSoup
from ebooklib import epub
import tkinter as tk
import tkinter.ttk as ttk

def search_event_handler(event):
    request_page(ent_website.get())
    print(event)

def clear_event_handler(event):
    txt_html_code.delete("1.0",tk.END)
    print(event)

def request_page(URL):
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, "html.parser")
    txt_html_code.delete("1.0",tk.END)
    txt_html_code.insert("1.0",soup)

def book_input():
    identifier = ent_identifier.get()       # 'aero-001'
    title = ent_title.get()                 # '学霸的黑科技系统'
    author = ent_author.get()               # '晨星LL'
    URL = ent_website.get()
    tocURL = ent_end_url.get()              # /txt/29162.htm
    return identifier, title, author, URL, tocURL

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

def clear_field():
    ent_author.delete(0,tk.END)
    ent_head.delete(0,tk.END)
    ent_end_url.delete(0,tk.END)
    ent_title.delete(0,tk.END)
    ent_identifier.delete(0,tk.END)
    ent_website.delete(0,tk.END)

def main_scrap(event):
    identifier, title, author, URL, tocURL = book_input()
    title_tag, title_class, content_tag, content_class, next_chapter = 0,0,0,0,0
    headlink = ent_head.get()

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

        # Get next link, if a tag contain text
        URL = soup.select_one("a:-soup-contains('下一章')")['href']

        # Update current progress to progress.txt
        progress = open("progress.txt", "w")
        progress.write(URL)
        progress.close()

        if not URL.__contains__(headlink):
            URL = headlink + URL

        print(results.find("h1").text)
        print(URL)
        print(URL == tocURL)

        # Check if page reached end
        if URL == tocURL:
            flag = False

    book.spine = spine 
    book.toc = ((epub.Section('MyBook'), toc), )

    epub.write_epub('test.epub', book)
    clear_field()
    return

if __name__ == "__main__":
    window = tk.Tk()
    frm_website = tk.Frame(master=window,width=200,height=100)
    frm_website.pack()
    frm_scrap = tk.Frame(master=window, width=200, height=125)
    frm_scrap.pack()

    lbl_website = ttk.Label(
        text="Website",
        master=frm_website
    )
    lbl_website.pack()

    ent_website = ttk.Entry(
        width=20,
        master=frm_website
    )
    ent_website.pack()

    btn_search = ttk.Button(
        text="View Code",
        width=10,
        master=frm_website
        )
    btn_search.bind("<Button-1>", search_event_handler)
    btn_search.pack()

    btn_clear_txt = ttk.Button(
        text="Clear",
        width=10,
        master=frm_website
    )
    btn_clear_txt.bind("<Button-1>", clear_event_handler)
    btn_clear_txt.pack()

    lbl_identifier = ttk.Label(
        text="Identifier",
        master=frm_scrap
    )
    lbl_identifier.pack()

    ent_identifier = ttk.Entry(
        width=20,
        master=frm_scrap
    )
    ent_identifier.pack()

    lbl_title = ttk.Label(
        text="Title",
        master=frm_scrap
    )
    lbl_title.pack()

    ent_title = ttk.Entry(
        width=20,
        master=frm_scrap
    )
    ent_title.pack()

    lbl_author = ttk.Label(
        text="Author",
        master=frm_scrap
    )
    lbl_author.pack()

    ent_author = ttk.Entry(
        width=20,
        master=frm_scrap
    )
    ent_author.pack()

    lbl_end_url = ttk.Label(
        text="End URL",
        master=frm_scrap
    )
    lbl_end_url.pack()

    ent_end_url = ttk.Entry(
        width=20,
        master=frm_scrap
    )
    ent_end_url.pack()

    lbl_head = ttk.Label(
        text="Headlink",
        master=frm_scrap
    )
    lbl_head.pack()

    ent_head = ttk.Entry(
        width=20,
        master=frm_scrap
    )
    ent_head.pack()
    
    txt_html_code = tk.Text(
        master=frm_website
    )
    txt_html_code.pack()
    txt_html_code.insert("1.0","HTML code here")

    btn_clear_txt = ttk.Button(
        text="Start Scrapping",
        width=30,
        master=frm_website
    )
    btn_clear_txt.bind("<Button-1>", main_scrap)
    btn_clear_txt.pack()

    window.mainloop()
