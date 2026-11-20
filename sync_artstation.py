#!/usr/bin/env python3
"""Append newly published ArtStation projects, preserving curated portfolio entries."""
import html
import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
FILE = ROOT / 'projects.js'
USERNAME = 'ravindushamalka'
HEADERS = {'User-Agent': 'Mozilla/5.0 (compatible; PortfolioSync/1.0)', 'Accept': 'application/rss+xml, application/json, */*'}

def fetch(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=25) as response:
        return response.read()

def normalize_url(url):
    match = re.search(r'(?:artstation\.com/(?:artwork|projects)/|artstn\.co/p/)([A-Za-z0-9]+)', url or '')
    return f'https://{USERNAME}.artstation.com/projects/{match.group(1)}' if match else None

def from_rss():
    for url in [f'https://www.artstation.com/{USERNAME}.rss', f'https://{USERNAME}.artstation.com/rss']:
        try:
            root = ET.fromstring(fetch(url))
            entries = []
            for item in root.findall('.//item'):
                link = normalize_url(item.findtext('link', ''))
                if not link:
                    continue
                title = html.unescape(item.findtext('title', 'Untitled artwork'))
                image = None
                for node in item.iter():
                    if node.tag.rsplit('}', 1)[-1] in ('thumbnail', 'content', 'enclosure'):
                        candidate = node.attrib.get('url')
                        if candidate and ('image' in node.attrib.get('type', 'image') or 'artstation' in candidate):
                            image = candidate
                            break
                if not image:
                    desc = html.unescape(item.findtext('description', ''))
                    match = re.search(r'<img[^>]+src=["\']([^"\']+)', desc)
                    image = match.group(1) if match else None
                entries.append({'title': title, 'url': link, 'category': '3d', 'image': image})
            if entries:
                print(f'RSS: found {len(entries)} recent entries')
                return entries
        except Exception as exc:
            print(f'RSS unavailable ({url}): {exc}')
    return []

def from_json():
    url = f'https://www.artstation.com/users/{USERNAME}/projects.json?album_id=all&page=1'
    data = json.loads(fetch(url))
    items = data.get('data', []) if isinstance(data, dict) else data
    entries = []
    for item in items:
        link = normalize_url(item.get('permalink', '') or item.get('url', ''))
        if not link and item.get('hash_id'):
            link = normalize_url('https://www.artstation.com/artwork/' + item['hash_id'])
        if not link:
            continue
        entries.append({'title': html.unescape(item.get('title', 'Untitled artwork')), 'url': link,
                        'category': '3d', 'image': item.get('cover', {}).get('medium_image_url') if isinstance(item.get('cover'), dict) else item.get('cover', {}).get('medium') if isinstance(item.get('cover'), dict) else item.get('cover_url')})
    return entries

def main():
    original = FILE.read_text(encoding='utf-8')
    # Keep all curated entries untouched. Append a generated block that can be safely refreshed.
    marker = '\n// BEGIN AUTOMATIC ARTSTATION PROJECTS'
    curated = original.split(marker)[0]
    existing = set(re.findall(r'artstation\.com/projects/([A-Za-z0-9]+)', curated))
    old_auto = []
    if marker in original:
        match = re.search(r'// BEGIN AUTOMATIC ARTSTATION PROJECTS\nPROJECTS\.unshift\(\.\.\.(\[.*?\])\);\n// END AUTOMATIC ARTSTATION PROJECTS', original, re.S)
        if match:
            old_auto = json.loads(match.group(1))
    entries = from_rss()
    if not entries:
        try:
            entries = from_json()
            print(f'JSON fallback: found {len(entries)} entries')
        except Exception as exc:
            print(f'ArtStation retrieval failed: {exc}', file=sys.stderr)
    if not entries:
        print('No usable feed data. Existing projects retained; no file changes.', file=sys.stderr)
        return 1
    by_id = {}
    for item in old_auto:
        key = normalize_url(item.get('url', ''))
        if key and key.rsplit('/', 1)[-1] not in existing:
            by_id[key] = item
    added = 0
    for item in entries:
        key = item['url']
        if key.rsplit('/', 1)[-1] in existing:
            continue
        if key not in by_id:
            added += 1
            by_id[key] = item
        else:
            by_id[key]['title'] = item['title']
            if item.get('image'):
                by_id[key]['image'] = item['image']
    if not by_id and marker not in original:
        print('All feed projects already present. No changes.')
        return 0
    block = marker + '\nPROJECTS.unshift(...' + json.dumps(list(by_id.values()), indent=2, ensure_ascii=False) + ');\n// END AUTOMATIC ARTSTATION PROJECTS\n'
    updated = curated.rstrip() + '\n' + block
    if updated != original:
        FILE.write_text(updated, encoding='utf-8')
    print(f'New projects: {added}; automated entries: {len(by_id)}')
    return 0

if __name__ == '__main__':
    sys.exit(main())
