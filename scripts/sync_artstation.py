                if cover.get(key):
                    return cover[key]
        for key in ('cover_url', 'cover_image_url'):
            if data.get(key):
                return data[key]
        for asset in data.get('assets', []):
            for key in ('image_url', 'image_url_large', 'image_url_medium'):
                if asset.get(key):
                    return asset[key]
    except Exception as exc:
        print(f'Thumbnail API unavailable ({project_id}): {exc}')
    return None


def from_rss():
    urls = [f'https://www.artstation.com/{USERNAME}.rss', f'https://{USERNAME}.artstation.com/rss']
    for url in urls:
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
                    if node.tag.rsplit('}', 1)[-1] in ('thumbnail', 'content', 'enclosure', 'image'):
                        candidate = node.attrib.get('url') or node.attrib.get('href')
                        if candidate and candidate.startswith(('https://', 'http://')) and ('image' in node.attrib.get('type', 'image') or 'artstation' in candidate):
                            image = candidate
                            break
                if not image:
                    # ArtStation places images in content:encoded, not description.
                    content = item.findtext(CONTENT_NS, '')
                    image = image_from_markup(content)
                if not image:
                    image = image_from_markup(item.findtext('description', ''))
                entries.append({'title': title, 'url': link, 'category': '3d', 'image': image})
            if entries:
                print(f'RSS: found {len(entries)} recent entries')
                print(f'RSS images found: {sum(bool(e["image"]) for e in entries)} of {len(entries)}')
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
        cover = item.get('cover')
        image = (cover.get('medium_image_url') or cover.get('large_image_url')) if isinstance(cover, dict) else item.get('cover_url')
        entries.append({'title': html.unescape(item.get('title', 'Untitled artwork')), 'url': link, 'category': '3d', 'image': image})
    return entries


def main():
    original = FILE.read_text(encoding='utf-8')
    marker = '\n// BEGIN AUTOMATIC ARTSTATION PROJECTS'
    curated = original.split(marker)[0]
    existing = set(re.findall(r'artstation\.com/projects/([A-Za-z0-9]+)', curated))
    old_auto = []
    if marker in original:
        match = re.search(r'// BEGIN AUTOMATIC ARTSTATION PROJECTS\nPROJECTS\.unshift\(\.\.\.(\[.*?\])\);\n// END AUTOMATIC ARTSTATION PROJECTS', original, re.S)
        if match:
            old_auto = json.loads(match.group(1))
        else:
            print('Existing automatic block could not be parsed. Leaving projects.js unchanged.', file=sys.stderr)
            return 1
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
    missing = [item for item in by_id.values() if not item.get('image')]
    for item in missing:
        item['image'] = project_thumbnail(item['url'])
    print(f'Thumbnails recovered via fallback: {sum(bool(item.get("image")) for item in missing)} of {len(missing)} missing')
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
