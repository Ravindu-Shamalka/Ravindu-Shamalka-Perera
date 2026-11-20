/*
  PROJECTS DATA
  -------------
  Pulled from https://ravindushamalka.artstation.com/
  Each entry:
    title     - display name
    url       - link to the original ArtStation project
    category  - one of: "3d", "environment", "character", "sketch", "vehicle", "2d", "animation"
    image     - thumbnail URL, or null to fall back to a generated placeholder tile
    large     - bigger image for the lightbox (falls back to `image` if omitted)

  STATUS: 68 / 68 pieces have real images pulled from ArtStation. Done.

  heroFeature - optional flag, true for the pieces that rotate through the
  hero background on the homepage. Kept to colorful / stylized pieces only
  (no black-background renders) per site owner's preference. Add or remove
  this flag on any project to change what shows up in the hero rotation.

  To add a new piece later: copy an object below, fill it in, done.
  To swap a placeholder for a real image: just add "image" and "large" URLs.
*/

const CATEGORY_LABELS = {
  "3d": "3D",
  environment: "Environment",
  character: "Character & Creature",
  sketch: "Sketch",
  vehicle: "Vehicle & Hard Surface",
  "2d": "2D",
  animation: "Animation"
};

const PROJECTS = [
  { title: "panther walk cycle", url: "https://ravindushamalka.artstation.com/projects/4182zq", category: "animation",
    image: "https://cdna.artstation.com/p/assets/video_clips/images/101/347/706/large/ravindu-shamalka-thumb.jpg?1785911728" },

  { title: "elephant skull", url: "https://ravindushamalka.artstation.com/projects/o0A1BW", category: "sketch",
    image: "https://cdnb.artstation.com/p/assets/images/images/101/347/623/medium/ravindu-shamalka-1.jpg?1785911405",
    large: "https://cdnb.artstation.com/p/assets/images/images/101/347/623/large/ravindu-shamalka-1.jpg?1785911405" },

  { title: "Low poly bear", url: "https://ravindushamalka.artstation.com/projects/EYVJV4", category: "3d",
    image: "https://cdna.artstation.com/p/assets/images/images/100/757/168/medium/ravindu-shamalka-1.webp?1783963537",
    large: "https://cdna.artstation.com/p/assets/images/images/100/757/168/large/ravindu-shamalka-1.webp?1783963537" },

  { title: "Universal ramen bowl", url: "https://ravindushamalka.artstation.com/projects/DLnOE9", category: "3d", heroFeature: true,
    image: "https://cdna.artstation.com/p/assets/images/images/099/631/562/medium/ravindu-shamalka-asset.webp?1780511770",
    large: "https://cdna.artstation.com/p/assets/images/images/099/631/562/large/ravindu-shamalka-asset.webp?1780511770" },

  { title: "2D environment night and day", url: "https://ravindushamalka.artstation.com/projects/oJn8Zk", category: "2d",
    image: "https://cdna.artstation.com/p/assets/images/images/099/631/430/medium/ravindu-shamalka-asset.webp?1780511581",
    large: "https://cdna.artstation.com/p/assets/images/images/099/631/430/large/ravindu-shamalka-asset.webp?1780511581" },

  { title: "Rick and Morty style #series", url: "https://ravindushamalka.artstation.com/projects/oJn8Zm", category: "2d", heroFeature: true,
    image: "https://cdna.artstation.com/p/assets/images/images/099/631/384/medium/ravindu-shamalka-asset.webp?1780511502",
    large: "https://cdna.artstation.com/p/assets/images/images/099/631/384/large/ravindu-shamalka-asset.webp?1780511502" },

  { title: "Anatomical Sketch Art", url: "https://ravindushamalka.artstation.com/projects/YGXqRq", category: "sketch", heroFeature: true,
    image: "https://cdnb.artstation.com/p/assets/images/images/099/631/267/medium/ravindu-shamalka-asset.webp?1780511345",
    large: "https://cdnb.artstation.com/p/assets/images/images/099/631/267/large/ravindu-shamalka-asset.webp?1780511345" },

  { title: "Lost between pixels and stars", url: "https://ravindushamalka.artstation.com/projects/XJyg0L", category: "2d",
    image: "https://cdnb.artstation.com/p/assets/videos/images/098/964/063/large/ravindu-shamalka-maxresdefault.jpg?1778574588" },

  { title: "Stillness Over Troubled Waters", url: "https://ravindushamalka.artstation.com/projects/V2EYxg", category: "environment",
    image: "https://cdna.artstation.com/p/assets/videos/images/096/000/970/large/ravindu-shamalka-maxresdefault.jpg?1770102639" },

  { title: "Alien Neomorph", url: "https://ravindushamalka.artstation.com/projects/RK4J0y", category: "character",
    image: "https://cdnb.artstation.com/p/assets/videos/images/092/956/809/large/ravindu-shamalka-maxresdefault.jpg?1761148769" },

  { title: "Alien Neomorph", url: "https://ravindushamalka.artstation.com/projects/8BXzVQ", category: "character",
    image: "https://cdna.artstation.com/p/assets/images/images/092/956/766/medium/ravindu-shamalka-screenshot-2025-10-22-212647.webp?1761148669",
    large: "https://cdna.artstation.com/p/assets/images/images/092/956/766/large/ravindu-shamalka-screenshot-2025-10-22-212647.webp?1761148669" },

  { title: "Contained #creature", url: "https://ravindushamalka.artstation.com/projects/98KYEW", category: "character", heroFeature: true,
    image: "https://cdna.artstation.com/p/assets/images/images/092/715/396/medium/ravindu-shamalka-asset.webp?1760448128",
    large: "https://cdna.artstation.com/p/assets/images/images/092/715/396/large/ravindu-shamalka-asset.webp?1760448128" },

  { title: "Pixel Japanese theme — 2D game environment", url: "https://ravindushamalka.artstation.com/projects/qJmaeP", category: "2d", heroFeature: true,
    image: "https://cdnb.artstation.com/p/assets/images/images/092/715/285/medium/ravindu-shamalka-asset.webp?1760447959",
    large: "https://cdnb.artstation.com/p/assets/images/images/092/715/285/large/ravindu-shamalka-asset.webp?1760447959" },

  { title: "The hand", url: "https://ravindushamalka.artstation.com/projects/rlL9V5", category: "sketch",
    image: "https://cdna.artstation.com/p/assets/images/images/089/753/732/medium/ravindu-shamalka-hand-1.jpg?1751873187",
    large: "https://cdna.artstation.com/p/assets/images/images/089/753/732/large/ravindu-shamalka-hand-1.jpg?1751873187" },

  { title: "Nature's Architects", url: "https://ravindushamalka.artstation.com/projects/obEERw", category: "environment",
    image: "https://cdnb.artstation.com/p/assets/videos/images/074/253/311/large/ravindu-shamalka-hqdefault.jpg?1711601947" },

  { title: "Shine", url: "https://ravindushamalka.artstation.com/projects/39xzPA", category: "3d",
    image: "https://cdnb.artstation.com/p/assets/images/images/067/058/841/medium/ravindu-shamalka-2.jpg?1694451452",
    large: "https://cdnb.artstation.com/p/assets/images/images/067/058/841/large/ravindu-shamalka-2.jpg?1694451452" },

  { title: "Spider verse", url: "https://ravindushamalka.artstation.com/projects/GedyvQ", category: "character",
    image: "https://cdna.artstation.com/p/assets/images/images/065/393/648/medium/ravindu-shamalka-asset.jpg?1690270890",
    large: "https://cdna.artstation.com/p/assets/images/images/065/393/648/large/ravindu-shamalka-asset.jpg?1690270890" },

  { title: "Cave", url: "https://ravindushamalka.artstation.com/projects/qeJk82", category: "animation",
    image: "https://cdna.artstation.com/p/assets/video_clips/images/061/568/996/large/ravindu-shamalka-thumb.jpg?1681140059" },

  { title: "Hidden Cave", url: "https://ravindushamalka.artstation.com/projects/WBXxVX", category: "environment",
    image: "https://cdna.artstation.com/p/assets/videos/images/061/425/612/large/ravindu-shamalka-maxresdefault.jpg?1680760799" },

  { title: "Last of us", url: "https://ravindushamalka.artstation.com/projects/043xze", category: "character",
    image: "https://cdna.artstation.com/p/assets/images/images/060/748/162/medium/ravindu-shamalka-screenshot-2023-03-19-230359.jpg?1679247686",
    large: "https://cdna.artstation.com/p/assets/images/images/060/748/162/large/ravindu-shamalka-screenshot-2023-03-19-230359.jpg?1679247686" },

  { title: "Hazard suit zombie", url: "https://ravindushamalka.artstation.com/projects/n0EWvO", category: "character",
    image: "https://cdna.artstation.com/p/assets/videos/images/060/514/046/large/ravindu-shamalka-maxresdefault.jpg?1678738696" },

  { title: "Sea view", url: "https://ravindushamalka.artstation.com/projects/6NaZEn", category: "environment",
    image: "https://cdna.artstation.com/p/assets/videos/images/059/763/182/large/ravindu-shamalka-maxresdefault.jpg?1677087857" },

  { title: "Ages", url: "https://ravindushamalka.artstation.com/projects/YBaLNq", category: "character",
    image: "https://cdna.artstation.com/p/assets/images/images/059/636/618/medium/ravindu-shamalka-screenshot-2023-02-20-001236.jpg?1676832183",
    large: "https://cdna.artstation.com/p/assets/images/images/059/636/618/large/ravindu-shamalka-screenshot-2023-02-20-001236.jpg?1676832183" },

  { title: "AR Car", url: "https://ravindushamalka.artstation.com/projects/EvVqN2", category: "vehicle",
    image: "https://cdnb.artstation.com/p/assets/video_clips/images/059/629/297/large/ravindu-shamalka-thumb.jpg?1676819232" },

  { title: "Snow", url: "https://ravindushamalka.artstation.com/projects/w0AWXV", category: "vehicle",
    image: "https://cdna.artstation.com/p/assets/images/images/059/525/738/medium/ravindu-shamalka-car-png.jpg?1676567380",
    large: "https://cdna.artstation.com/p/assets/images/images/059/525/738/large/ravindu-shamalka-car-png.jpg?1676567380" },

  { title: "The bar", url: "https://ravindushamalka.artstation.com/projects/LenZV0", category: "environment",
    image: "https://cdna.artstation.com/p/assets/images/images/058/490/636/medium/ravindu-shamalka-1.jpg?1674272698",
    large: "https://cdna.artstation.com/p/assets/images/images/058/490/636/large/ravindu-shamalka-1.jpg?1674272698" },

  { title: "Low poly deer", url: "https://ravindushamalka.artstation.com/projects/VyqvKZ", category: "3d",
    image: "https://cdnb.artstation.com/p/assets/images/images/053/358/271/medium/ravindu-shamalka-12.jpg?1662020253",
    large: "https://cdnb.artstation.com/p/assets/images/images/053/358/271/large/ravindu-shamalka-12.jpg?1662020253" },

  { title: "VR Low poly Character", url: "https://ravindushamalka.artstation.com/projects/B3Leom", category: "character",
    image: "https://cdna.artstation.com/p/assets/images/images/051/761/516/medium/ravindu-shamalka-vr-2.jpg?1658126947",
    large: "https://cdna.artstation.com/p/assets/images/images/051/761/516/large/ravindu-shamalka-vr-2.jpg?1658126947" },

  { title: "1930s", url: "https://ravindushamalka.artstation.com/projects/DA1OnR", category: "environment",
    image: "https://cdna.artstation.com/p/assets/images/images/051/761/474/medium/ravindu-shamalka-untitled.jpg?1658126874",
    large: "https://cdna.artstation.com/p/assets/images/images/051/761/474/large/ravindu-shamalka-untitled.jpg?1658126874" },

  { title: "Wind wheel", url: "https://ravindushamalka.artstation.com/projects/qQR9Dn", category: "3d",
    image: "https://cdna.artstation.com/p/assets/images/images/050/125/976/medium/ravindu-shamalka-1-wind.jpg?1654109050",
    large: "https://cdna.artstation.com/p/assets/images/images/050/125/976/large/ravindu-shamalka-1-wind.jpg?1654109050" },

  { title: "Jiraiya", url: "https://ravindushamalka.artstation.com/projects/ZeB42R", category: "character", heroFeature: true,
    image: "https://cdnb.artstation.com/p/assets/images/images/050/023/027/medium/ravindu-shamalka-asset.jpg?1653901109",
    large: "https://cdnb.artstation.com/p/assets/images/images/050/023/027/large/ravindu-shamalka-asset.jpg?1653901109" },

  { title: "Low poly coffee shop", url: "https://ravindushamalka.artstation.com/projects/1438v3", category: "environment", heroFeature: true,
    image: "https://cdna.artstation.com/p/assets/images/images/049/345/894/medium/ravindu-shamalka-day-coffee.jpg?1652281357",
    large: "https://cdna.artstation.com/p/assets/images/images/049/345/894/large/ravindu-shamalka-day-coffee.jpg?1652281357" },

  { title: "Low poly barber shop", url: "https://ravindushamalka.artstation.com/projects/4Xq8rl", category: "environment", heroFeature: true,
    image: "https://cdna.artstation.com/p/assets/images/images/049/345/844/medium/ravindu-shamalka-day-barber.jpg?1652281288",
    large: "https://cdna.artstation.com/p/assets/images/images/049/345/844/large/ravindu-shamalka-day-barber.jpg?1652281288" },

  { title: "Adventure", url: "https://ravindushamalka.artstation.com/projects/r9BZEL", category: "environment",
    image: "https://cdnb.artstation.com/p/assets/images/images/049/024/527/medium/ravindu-shamalka-asset.jpg?1651518319",
    large: "https://cdnb.artstation.com/p/assets/images/images/049/024/527/large/ravindu-shamalka-asset.jpg?1651518319" },

  { title: "Fighter jet speed modelling", url: "https://ravindushamalka.artstation.com/projects/6benGn", category: "vehicle",
    image: "https://cdnb.artstation.com/p/assets/videos/images/047/441/253/large/ravindu-shamalka-maxresdefault.jpg?1647588169" },

  { title: "Christmas Nutcracker", url: "https://ravindushamalka.artstation.com/projects/9NEGoa", category: "character",
    image: "https://cdnb.artstation.com/p/assets/videos/images/044/582/181/large/ravindu-shamalka-maxresdefault.jpg?1640501995" },

  { title: "Industrial cooling", url: "https://ravindushamalka.artstation.com/projects/8wbqrm", category: "3d",
    image: "https://cdnb.artstation.com/p/assets/videos/images/044/489/355/large/ravindu-shamalka-maxresdefault.jpg?1640156802" },

  { title: "Hidden Village", url: "https://ravindushamalka.artstation.com/projects/mz898E", category: "environment",
    image: "https://cdnb.artstation.com/p/assets/images/images/044/463/195/medium/ravindu-shamalka-poster-7.jpg?1640086248",
    large: "https://cdnb.artstation.com/p/assets/images/images/044/463/195/large/ravindu-shamalka-poster-7.jpg?1640086248" },

  { title: "Industrial", url: "https://ravindushamalka.artstation.com/projects/lRDq8k", category: "3d",
    image: "https://cdna.artstation.com/p/assets/images/images/044/458/082/medium/ravindu-shamalka-5.jpg?1640070095",
    large: "https://cdna.artstation.com/p/assets/images/images/044/458/082/large/ravindu-shamalka-5.jpg?1640070095" },

  { title: "Cannon speed modelling", url: "https://ravindushamalka.artstation.com/projects/033L6K", category: "vehicle",
    image: "https://cdnb.artstation.com/p/assets/videos/images/043/972/557/large/ravindu-shamalka-maxresdefault.jpg?1638781390" },

  { title: "Hidden Temple", url: "https://ravindushamalka.artstation.com/projects/OmmxyJ", category: "environment",
    image: "https://cdnb.artstation.com/p/assets/images/images/043/945/377/medium/ravindu-shamalka-1.jpg?1638704221",
    large: "https://cdnb.artstation.com/p/assets/images/images/043/945/377/large/ravindu-shamalka-1.jpg?1638704221" },

  { title: "Warehouse", url: "https://ravindushamalka.artstation.com/projects/lRRZ1Y", category: "environment",
    image: "https://cdnb.artstation.com/p/assets/images/images/043/945/245/medium/ravindu-shamalka-1.jpg?1638703742",
    large: "https://cdnb.artstation.com/p/assets/images/images/043/945/245/large/ravindu-shamalka-1.jpg?1638703742" },

  { title: "Ancient temple", url: "https://ravindushamalka.artstation.com/projects/033eYE", category: "environment",
    image: "https://cdna.artstation.com/p/assets/images/images/043/945/138/medium/ravindu-shamalka-16.jpg?1638703405",
    large: "https://cdna.artstation.com/p/assets/images/images/043/945/138/large/ravindu-shamalka-16.jpg?1638703405" },

  { title: "Hidden Rain Village", url: "https://ravindushamalka.artstation.com/projects/VyyDrN", category: "environment",
    image: "https://cdnb.artstation.com/p/assets/images/images/043/944/985/medium/ravindu-shamalka-1.jpg?1638702857",
    large: "https://cdnb.artstation.com/p/assets/images/images/043/944/985/large/ravindu-shamalka-1.jpg?1638702857" },

  { title: "Global Warming", url: "https://ravindushamalka.artstation.com/projects/8werZ6", category: "environment",
    image: "https://cdnb.artstation.com/p/assets/videos/images/043/543/449/large/ravindu-shamalka-maxresdefault.jpg?1637589112" },

  { title: "Short film", url: "https://ravindushamalka.artstation.com/projects/o2A9Qm", category: "animation",
    image: "https://cdnb.artstation.com/p/assets/videos/images/043/542/979/large/ravindu-shamalka-maxresdefault.jpg?1637588239" },

  { title: "Lantern", url: "https://ravindushamalka.artstation.com/projects/5XlRaw", category: "3d",
    image: "https://cdnb.artstation.com/p/assets/images/images/036/532/407/medium/ravindu-shamalka-chinese11.jpg?1617907446",
    large: "https://cdnb.artstation.com/p/assets/images/images/036/532/407/large/ravindu-shamalka-chinese11.jpg?1617907446" },

  { title: "Godzilla", url: "https://ravindushamalka.artstation.com/projects/48Levk", category: "character",
    image: "https://cdna.artstation.com/p/assets/images/images/036/532/358/medium/ravindu-shamalka-screenshot-2021-04-07-235933.jpg?1617907351",
    large: "https://cdna.artstation.com/p/assets/images/images/036/532/358/large/ravindu-shamalka-screenshot-2021-04-07-235933.jpg?1617907351" },

  { title: "The Weeknd", url: "https://ravindushamalka.artstation.com/projects/Ye6PqX", category: "character",
    image: "https://cdna.artstation.com/p/assets/images/images/033/999/460/medium/ravindu-shamalka-1.jpg?1611135032",
    large: "https://cdna.artstation.com/p/assets/images/images/033/999/460/large/ravindu-shamalka-1.jpg?1611135032" },

  { title: "Space pod", url: "https://ravindushamalka.artstation.com/projects/d8Rl21", category: "vehicle",
    image: "https://cdnb.artstation.com/p/assets/videos/images/033/771/637/large/ravindu-shamalka-maxresdefault.jpg?1610528359" },

  { title: "Predator", url: "https://ravindushamalka.artstation.com/projects/rAd4QE", category: "character",
    image: "https://cdnb.artstation.com/p/assets/videos/images/033/770/705/large/ravindu-shamalka-maxresdefault.jpg?1610524730" },

  { title: "Statue", url: "https://ravindushamalka.artstation.com/projects/oAlA24", category: "3d",
    image: "https://cdnb.artstation.com/p/assets/images/images/033/733/165/medium/ravindu-shamalka-4.jpg?1610435690",
    large: "https://cdnb.artstation.com/p/assets/images/images/033/733/165/large/ravindu-shamalka-4.jpg?1610435690" },

  { title: "City", url: "https://ravindushamalka.artstation.com/projects/oAlOnB", category: "environment",
    image: "https://cdna.artstation.com/p/assets/videos/images/033/614/998/large/ravindu-shamalka-maxresdefault.jpg?1610099603" },

  { title: "Living room", url: "https://ravindushamalka.artstation.com/projects/d8ROzW", category: "environment",
    image: "https://cdna.artstation.com/p/assets/images/images/033/614/898/medium/ravindu-shamalka-2.jpg?1610099248",
    large: "https://cdna.artstation.com/p/assets/images/images/033/614/898/large/ravindu-shamalka-2.jpg?1610099248" },

  { title: "Deforestation", url: "https://ravindushamalka.artstation.com/projects/oAZEE4", category: "environment",
    image: "https://cdnb.artstation.com/p/assets/videos/images/031/075/977/large/ravindu-shamalka-maxresdefault.jpg?1602531217" },

  { title: "Recycle bottle", url: "https://ravindushamalka.artstation.com/projects/q9Zrka", category: "3d",
    image: "https://cdna.artstation.com/p/assets/videos/images/031/075/788/large/ravindu-shamalka-hqdefault.jpg?1602530800" },

  { title: "Ecological", url: "https://ravindushamalka.artstation.com/projects/bKJywE", category: "environment",
    image: "https://cdna.artstation.com/p/assets/videos/images/031/075/242/large/ravindu-shamalka-hqdefault.jpg?1602529633" },

  { title: "Tentacles", url: "https://ravindushamalka.artstation.com/projects/3dLXno", category: "character",
    image: "https://cdna.artstation.com/p/assets/videos/images/031/074/428/large/ravindu-shamalka-maxresdefault.jpg?1602527378" },

  { title: "City backstreet", url: "https://ravindushamalka.artstation.com/projects/L38lYR", category: "environment",
    image: "https://cdnb.artstation.com/p/assets/videos/images/030/940/379/large/ravindu-shamalka-maxresdefault.jpg?1602102103" },

  { title: "Sci-fi aircraft", url: "https://ravindushamalka.artstation.com/projects/kDaLv6", category: "vehicle",
    image: "https://cdna.artstation.com/p/assets/videos/images/030/940/310/large/ravindu-shamalka-hqdefault.jpg?1602101922" },

  { title: "3D render image", url: "https://ravindushamalka.artstation.com/projects/Poyqrr", category: "3d",
    image: "https://cdnb.artstation.com/p/assets/images/images/030/909/711/medium/ravindu-shamalka-111.jpg?1602015893",
    large: "https://cdnb.artstation.com/p/assets/images/images/030/909/711/large/ravindu-shamalka-111.jpg?1602015893" },

  { title: "Light house", url: "https://ravindushamalka.artstation.com/projects/lxNZeO", category: "environment",
    image: "https://cdnb.artstation.com/p/assets/images/images/030/909/503/medium/ravindu-shamalka-1.jpg?1602015375",
    large: "https://cdnb.artstation.com/p/assets/images/images/030/909/503/large/ravindu-shamalka-1.jpg?1602015375" },

  { title: "Old shed", url: "https://ravindushamalka.artstation.com/projects/Aqy2Yq", category: "environment",
    image: "https://cdnb.artstation.com/p/assets/videos/images/030/909/461/large/ravindu-shamalka-hqdefault.jpg?1602015286" },

  { title: "3D model", url: "https://ravindushamalka.artstation.com/projects/xJO334", category: "3d",
    image: "https://cdna.artstation.com/p/assets/images/images/029/827/912/medium/ravindu-shamalka-1-1.jpg?1598777381",
    large: "https://cdna.artstation.com/p/assets/images/images/029/827/912/large/ravindu-shamalka-1-1.jpg?1598777381" },

  { title: "3D model", url: "https://ravindushamalka.artstation.com/projects/YePGGP", category: "3d",
    image: "https://cdnb.artstation.com/p/assets/images/images/029/827/869/medium/ravindu-shamalka-5.jpg?1598777260",
    large: "https://cdnb.artstation.com/p/assets/images/images/029/827/869/large/ravindu-shamalka-5.jpg?1598777260" },

  { title: "Backstreet", url: "https://ravindushamalka.artstation.com/projects/9my8Eq", category: "environment",
    image: "https://cdna.artstation.com/p/assets/images/images/029/827/816/medium/ravindu-shamalka-1.jpg?1598777047",
    large: "https://cdna.artstation.com/p/assets/images/images/029/827/816/large/ravindu-shamalka-1.jpg?1598777047" },

  { title: "Environment", url: "https://ravindushamalka.artstation.com/projects/9mEJwR", category: "environment",
    image: "https://cdna.artstation.com/p/assets/videos/images/029/069/528/large/ravindu-shamalka-maxresdefault.jpg?1596373926" },

  { title: "Hunger strike", url: "https://ravindushamalka.artstation.com/projects/lxDe5V", category: "character",
    image: "https://cdna.artstation.com/p/assets/videos/images/029/011/458/large/ravindu-shamalka-maxresdefault.jpg?1596184585" }
];
