#!/usr/bin/env python3
"""Static preview server that emulates GitHub Pages clean-URL behavior:
/about -> about.html, /blog/ -> blog/index.html."""
import http.server
import os
import socketserver

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(os.environ.get("PORT", "4599"))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def translate_path(self, path):
        local = super().translate_path(path)
        # If the request has no extension and the file doesn't exist,
        # try appending .html (mirrors GitHub Pages).
        if not os.path.exists(local) or os.path.isdir(local):
            _, ext = os.path.splitext(local)
            if not ext and os.path.isfile(local + ".html"):
                return local + ".html"
        return local


with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving {ROOT} on http://localhost:{PORT}")
    httpd.serve_forever()
