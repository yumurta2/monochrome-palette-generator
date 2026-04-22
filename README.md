# Monochrome Palette Generator

Tek bir renk tonundan (hue) yola çıkarak **ayarlanabilir sayıda açıklık (lightness) kademesi** üreten, tarayıcıda çalışan hafif bir palet oluşturma aracı. Seçtiğin hue, saturation ve kart sayısına göre `%0`'dan `%100`'e kadar eşit aralıklarla monokrom bir gradyan palet çıkarır; herhangi bir kartın üstüne tıklayarak HEX kodunu panoya kopyalayabilirsin.

## Özellikler

- **Canlı önizleme:** Üç slider'dan birini oynattıkça kartlar anında yeniden render edilir.
- **Ayarlanabilir kademe sayısı:** 2 ile 51 arasında herhangi bir değer — dar bir palette (örn. 5 kademe) ton karar vermek kolay; geniş bir palette (örn. 51 kademe) pixel art shading için ince geçişler çıkarmak mümkün.
- **Monokrom palet:** Tek hue + tek saturation sabitlenir, yalnızca lightness değişir — bir tasarım sistemine uygun ton ölçeği çıkarmak için idealdir.
- **HSL → HEX dönüşümü:** Renkler HSL ile üretilir, kartlarda HEX olarak gösterilir.
- **Tek tıkla kopyalama:** Karta tıkla → HEX kodu clipboard'a düşer, kart kısa süreli `Copied!` geri bildirimi verir.
- **PNG export:** Paleti tek piksel yüksekliğinde, `N` piksel genişliğinde PNG olarak indirir (her pikselde bir lightness kademesi).
- **Akıllı kontrast:** Lightness `%55`'in üstündeyse yazı siyah, altındaysa beyaz gösterilir — her kartta metin her zaman okunur.
- **Dinamik saturation kaydırıcısı:** Saturation slider'ının arka plan gradyanı seçili hue'ya göre güncellenir, ne seçtiğini görsel olarak hissedersin.

## Örnek

Aracın ürettiği monokrom paletin pratik kullanımı — aşağıdaki 9-slice sprite, **v1.0.0**'da üretilen bir HSL paletinin lightness kademeleri kullanılarak çizildi:

<img src="docs/examples/9slice-v1.0.0.png" alt="9-slice frame sprite (v1.0.0 palette)" width="192" />

Çerçevenin kenar ve köşelerindeki gölge/ışık geçişleri, tek hue boyunca artan lightness değerlerine denk gelir — bu yüzden tek ton üzerinden hacim hissi tutarlı çıkar.

## Teknoloji

- [Vite](https://vitejs.dev/) 8 — dev server ve bundler
- Vanilla JavaScript (ES modules)
- HTML + CSS + native `<canvas>` API (PNG export için)

## Kurulum

```bash
cd monochrome-palette-generator
npm install
```

## Çalıştırma

```bash
npm run dev       # geliştirme sunucusu
npm run build     # production build (dist/)
npm run preview   # build'i local'de önizle
```

Dev server ayağa kalktıktan sonra terminalde çıkan `localhost` adresini tarayıcında aç.

## Proje Yapısı

```
monochrome-palette-generator/
├── index.html
├── package.json
├── src/
│   ├── main.js                     # Giriş noktası; yalnızca barrel'lardan import eder
│   ├── style.css
│   ├── logics.js                   # logic/ barrel — main.js buradan çağırır
│   ├── renders.js                  # render/ barrel
│   ├── inputs.js                   # input/ barrel
│   ├── logic/
│   │   ├── hslToHex.js             # HSL → HEX dönüşümü
│   │   ├── getContrastColor.js     # Lightness'a göre siyah/beyaz metin rengi
│   │   ├── generatePalette.js      # (h, s) → 21 adımlık HEX dizisi
│   │   └── paletteToPng.js         # HEX dizisi → PNG Blob (canvas ile)
│   ├── render/
│   │   ├── renderPalette.js        # 21 kartı üretip DOM'a basar
│   │   ├── createColorCard.js      # Tek bir kart + tıklama davranışı
│   │   └── downloadBlob.js         # Blob'u tarayıcıdan dosya olarak indirtir
│   └── input/
│       ├── getElements.js          # DOM referanslarını toplar
│       ├── readInputs.js           # Slider değerlerini parse eder
│       ├── updateInputDisplay.js   # Label'ları ve saturation gradyanını günceller
│       ├── bindInputs.js           # Slider event listener'larını bağlar
│       └── bindExport.js           # Export butonu listener'ını bağlar
└── README.md
```

**İçe aktarma akışı:** Her alt klasördeki fonksiyon önce kendi barrel dosyasına (`logics.js` / `renders.js` / `inputs.js`) re-export edilir, `main.js` ise sadece bu üç barrel'dan import eder. Alt klasör yolları dışarıya sızmaz.

## Nasıl Çalışır

1. `getElements()` tüm DOM referanslarını tek bir nesnede toplar — [src/input/getElements.js:1](src/input/getElements.js#L1).
2. `bindInputs()` üç slider'a (`hue`, `saturation`, `count`) `input` event listener'ı bağlar; her değişiklikte `update()` callback'i tetiklenir — [src/input/bindInputs.js:1](src/input/bindInputs.js#L1).
3. `readInputs()` slider değerlerini integer olarak okur → `{ h, s, count }` — [src/input/readInputs.js:1](src/input/readInputs.js#L1).
4. `updateInputDisplay()` hue/sat/count label'larını günceller ve saturation slider'ının arka plan gradyanını seçili hue'ya göre yeniler — [src/input/updateInputDisplay.js:1](src/input/updateInputDisplay.js#L1).
5. `generatePalette(h, s, count)` `count` adet eşit aralıklı lightness değeri hesaplar ve her biri için `{ l, hex }` çifti döner — [src/logic/generatePalette.js:3](src/logic/generatePalette.js#L3).
6. `renderPalette()` `grid-template-columns`'u `repeat(count, 1fr)` olarak dinamik ayarlar, container'ı temizler ve palette'i dolaşarak `createColorCard()` çağırır — [src/render/renderPalette.js:3](src/render/renderPalette.js#L3).
7. `createColorCard(l, hex)` tek bir kart üretir; `getContrastColor()` ile metin rengini seçer, kopyalama davranışını bağlar — [src/render/createColorCard.js:3](src/render/createColorCard.js#L3).
8. **Export** butonuna basılınca `generatePalette()` hex dizisini üretir → `paletteToPng()` native `<canvas>` ile `N×1` PNG Blob döner → `downloadBlob()` `palette-h{h}-s{s}-n{count}.png` olarak indirtir — [src/main.js:16](src/main.js#L16).

## Kullanım İpuçları

- **Hue** kaydırıcısı `15°` aralıklarla hareket eder — renk tekerleğini 24 eşit parçaya böler.
- **Saturation** kaydırıcısı `5%` adımlarla değişir; `0`'a çekersen gri tonlamalı bir nötr ölçek elde edersin.
- **Generate Count** 2–51 arası seçilebilir; kademe sayısı arttıkça kartlar daralır, grid otomatik yeniden yerleşir.
- UI tam sayfa (viewport) yerleşimi kullanır, scroll yoktur — kartlar tek satırda grid olarak dizilir.

## Sürümler

### v1.2.0

**Kazanım:** Ayarlanabilir kademe sayısı + yeniden düzenlenmiş üst panel.

**Neden çıkıldı:**
- Sabit 21 kademe her senaryoya uymuyor: minimal bir UI tema paleti (5-7 ton) ile pixel art shading için gereken ince geçişler (40-50 ton) aynı aracın içinden çıkmalı.
- Slider'lar dikey yığılı olduğu için (1.1.0) ekranın üstünde gereksiz yer kaplıyordu; paletin kendisine daha fazla dikey alan lazım.

**Ne geldi:**
- **Generate Count** slider'ı (2–51, varsayılan 21) — kademe sayısını canlı ayarlar.
- Üst panel tek satırlı CSS grid'e (`2fr 2fr 1fr 1fr`) geçti; Hue ve Saturation geniş, Count ve Export butonu dar sütunlarda.
- `palette-h{h}-s{s}-n{count}.png` — export dosya adı artık kademe sayısını da içeriyor.

**Teknik değişiklikler:**
- `generatePalette(h, s, count)` artık `count`'a göre `0`'dan `100`'e eşit aralıklı lightness dizisi hesaplar ve `{ l, hex }` çiftleri döner. Önceki sabit `LIGHTNESS_STEPS` kaldırıldı.
- `renderPalette()` `grid-template-columns`'ü `repeat(count, 1fr)` olarak runtime'da ayarlar; CSS'teki sabit `repeat(21, 1fr)` kaldırıldı.
- `createColorCard()` imzası `(h, s, l)` yerine `(l, hex)` oldu — hex hesaplama `generatePalette()` içinde tek kaynakta, kart sadece DOM ile ilgileniyor.

### v1.1.1

**Kazanım:** 0 güvenlik uyarısı + çok daha hafif bundle.

**Neden çıkıldı:**
- 1.1.0 ile gelen `jimp` bağımlılığı, dolaylı olarak `elliptic` üzerinden aktif bir güvenlik uyarısı getiriyordu ([CVE-2025-14505](https://github.com/advisories/GHSA-848j-6mx2-7j84)).
- Advisory'nin `first_patched_version` alanı boş — yani `elliptic`'in hiçbir sürümü şu anda güvenli değil. Override ile düzelme ihtimali yok.
- `npm audit fix --force` önerisi `vite-plugin-node-polyfills`'i 0.2.0'a düşürmeye çalışıyor, fakat o sürüm Vite 8 ile uyumsuz (dependency optimization başarısız).

**Ne geldi:**
- `paletteToPng()` yeniden yazıldı: `jimp` yerine native `<canvas>` API'si kullanılıyor. 21×1 piksellik bir palet için canvas zaten fazlasıyla yeterli.
- `jimp` ve `vite-plugin-node-polyfills` bağımlılıkları tamamen kaldırıldı; `vite.config.js` de gereksiz kaldığı için silindi.

**Sayısal sonuçlar:**
- `npm audit`: 6 low severity → **0**
- Production bundle (gzip öncesi): **617 kB → 2.71 kB** (~227x küçülme)
- Dep graph: 225 paket → **16 paket**

### v1.1.0

**Kazanım:** PNG export.

**Neden çıkıldı:**
- Palet kartları sadece ekranda gösteriliyor, HEX kodlarını tek tek kopyalamak dış araçlara (Aseprite, Photoshop, Figma) aktarırken zayıf bir akış üretiyor.
- Pixel art / 9-slice gibi pipeline'larda paleti dosya olarak içe aktarmak çok daha hızlı; tek bir PNG satırı `Palette → Import` akışına birebir uyuyor.

**Ne geldi:**
- Arayüzde **Export PNG** butonu.
- Tıklandığında aktif `(h, s)` değerinden üretilen 21 renk, `21×1` piksellik bir PNG'ye yazılır ve `palette-h{h}-s{s}.png` olarak indirilir.
- Kod tarafında palet üretimi render'dan ayrıldı: `generatePalette()` tek kaynak haline geldi, hem ekran render'ı hem de export aynı diziyi kullanıyor.

**Teknik seçimler:**
- Tarayıcıda PNG üretimi için `jimp` tercih edildi.
- Jimp'in Node API bağımlılıkları (`Buffer`, `stream`) için `vite-plugin-node-polyfills` ve yeni `vite.config.js` eklendi.
- *Not:* Bu tercih 1.1.1'de güvenlik uyarısı nedeniyle canvas'a çevrildi.
