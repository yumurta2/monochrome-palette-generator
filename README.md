# Monochrome Palette Generator

Tek bir renk tonundan (hue) yola çıkarak **ayarlanabilir sayıda açıklık (lightness) kademesi** üreten, tarayıcıda çalışan hafif bir palet oluşturma aracı. Seçtiğin hue, saturation ve kart sayısına göre `%0`'dan `%100`'e kadar eşit aralıklarla monokrom bir gradyan palet çıkarır; herhangi bir kartın üstüne tıklayarak HEX kodunu panoya kopyalayabilirsin.

## Özellikler

- **Canlı önizleme:** Üç slider'dan birini oynattıkça kartlar anında yeniden render edilir.
- **Ayarlanabilir kademe sayısı:** 2 ile 51 arasında herhangi bir değer — dar bir palette (örn. 5 kademe) ton karar vermek kolay; geniş bir palette (örn. 51 kademe) pixel art shading için ince geçişler çıkarmak mümkün.
- **Light range + shift:** Palette'in hangi lightness dilimini kullanacağını kısıtla. Range genişliği belirler, shift de başlangıcı — sadece shadow'lar (0–50), sadece midtone'lar (25–75) veya sadece highlight'lar (50–100) için dar paletler üretebilirsin.
- **Monokrom palet:** Tek hue + tek saturation sabitlenir, yalnızca lightness değişir — bir tasarım sistemine uygun ton ölçeği çıkarmak için idealdir.
- **HSL ↔ OKLCH toggle:** Üst paneldeki toggle ile renk uzayı değişir; OKLCH perceptual uniform olduğu için aynı lightness değerindeki farklı hue'lar gözle tutarlı parlaklıkta algılanır.
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
- [culori](https://culorijs.org/) — OKLCH renk uzayı dönüşümleri ve gamut clamping
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
│   │   ├── oklchToHex.js           # OKLCH → HEX dönüşümü (culori ile)
│   │   ├── getContrastColor.js     # Lightness'a göre siyah/beyaz metin rengi
│   │   ├── generatePalette.js      # (h, s, steps, range, shift, mode) → {l, hex} çiftleri
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
│       ├── bindExport.js           # Export butonu listener'ını bağlar
│       └── bindModeToggle.js       # Color space toggle butonu (HSL ↔ OKLCH)
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

### v1.6.0

**Kazanım:** Chroma'yı L'ye göre eğri ile module eden **Chroma Curve** kontrolü. 4 seçenek arasında radio toggle: Linear / Parabolic / Bell (default) / Asymmetric.

**Neden çıkıldı (color theory):**

Önceki sürümlerde chroma her shade için sabitti: `(s/100) * 0.37`. Bu yaklaşımın iki gözle görünür sorunu vardı:

1. **clampChroma at high L:** Yüksek L'de (L > ~0.85) sRGB gamut'u sabit chroma'yı kaldıramaz; culori sessizce kırpar. Sonuç: paletin sondan bir önceki shade'i renkli, son shade ise neredeyse beyaz → ani identity kopması. Kullanıcı şikayet ediyordu: "en sağdaki ile bir öncesi arasındaki fark çok fazla".
2. **Constant chroma → midtone monotonluğu:** Tüm shade'ler aynı C+H ile geldiğinde, göz baskın renk sinyaline kilitlenip L farkını "aynı şeyin biraz farklı tonu" diye gruplayıp önemsizleştirir → "ortadan sağa renkler çok yakın" hissi.

Material 3, Radix Colors, Tailwind v4 tonal scale'leri **chroma'yı L boyunca değiştirir** — uçlarda chroma düşer, midtone'da tepe yapar. Bu hem clampChroma'nın devre dışı kalmasını sağlar (chroma zaten gamut içinde), hem de her shade'in hafifçe farklı identity kazanmasıyla midtone'lardaki monotonluk kırılır.

**Ne geldi:**

`Chroma Curve` radio grubu — 4 eğri formülü:

| Eğri | Formül `f(L)` | Karakter | Tipik kullanım |
|---|---|---|---|
| **Linear** | `1` | Sabit chroma (eski 1.5.x davranışı) | Geri uyumluluk, "flat" UI tonal scale |
| **Parabolic** | `4·L·(1-L)` | Keskin midtone tepe, hızlı düşüş | Vivid orta tonlar, kontrastlı palette |
| **Bell** (default) | `sin(π·L)` | Yumuşak omuzlu tepe | Genel amaç — illustration, UI, tasarım sistemleri |
| **Asymmetric** | `1 - (2L-1)⁴` | Flat-top (L=0.3-0.7 dolu), uçlarda hızlı düşüş | Design system tonal scale (50, 100, ..., 900) |

Effective chroma artık: `(s/100) · 0.37 · f(L)`. Sat slider'ı **PEAK** chroma'yı kontrol eder; uçlarda chroma doğal olarak azalır.

**Default değişikliği:** İlk açılışta `Bell` seçili gelir. v1.5.x'in sabit chroma davranışını geri almak için `Linear` seç. Karşılaştırma yaparken iki eğri arasında geçiş yap — son shade'in clampChroma kopması Bell'de kaybolur, midtone'lar daha "renkli" hissedilir.

**Export filename:** Curve kısaltması eklendi: `palette-{mode}-h{h}-s{s}-n{steps}-r{range}-o{shift}-c{lin|par|bel|asy}.png`.

**Bonus — v1.5.2 drift fix tamamlama:**

v1.5.2'de Range/Shift drift'i `bindInputs.js`'teki value-clamp'ı silerek "düzelttik" sandık ama [updateInputDisplay.js](src/input/updateInputDisplay.js) hâlâ her update'te `shiftInput.max = String(100 - range)` çalıştırıyordu. Bu satır slider'ın max attribute'unu mutate ediyor → browser thumb'ı otomatik kırpıyor → drift hâlâ gözle görünüyordu. Bu sürümle o satır da silindi. Range ve Shift artık **gerçekten** birbirinden bağımsız.

### v1.5.2

**Kazanım:** Light Range artık Light Shift'i etkilemiyor; her iki slider %2 step ile daha ince ayar.

**Neden çıkıldı:**
- 1.5.0/1.5.1'de Range değiştirildiğinde Shift'in `max`'i dinamik kırpılıyordu (`maxShift = 100 - range`). Yan etki: kullanıcı sadece Range'e dokunuyor sansa da Shift değeri sessizce aşağı kayıyordu — özellikle Range'i 80'den yukarı çekerken. Tek slider'a dokunup iki değerin birden değişmesi kafa karıştırıcı bir UX problemi.
- Eski step (`%5`) ışık penceresinin başlangıcını ve genişliğini ince ayarlamak için fazla kaba kalıyordu — özellikle dar steps (5–8) ile çalışırken.

**Ne geldi:**
- **Bağımsız Range/Shift:** [bindInputs.js](src/input/bindInputs.js)'teki auto-clamp kaldırıldı. Range ve Shift artık birbirine müdahale etmez.
- **Math safety:** Yeni özgürlük `shift + range > 100` durumunu mümkün kıldığı için [generatePalette.js](src/logic/generatePalette.js) çıktıdaki `L` değerlerini `[0, 100]` aralığına `Math.max/Math.min` ile kıstırıyor. Pencere 100'ü aşarsa en üstteki shade'ler saf beyaza (`#ffffff`) sıkışır — sessiz değer kayması yerine görünür sonuç.
- **Light Range step:** `%5 → %2`.
- **Light Shift step:** `%5 → %2`, default `%15 → %16` (step=2 ile uyumlu en yakın değer).

**Not:** v1.5.0'da bahsedilen "Shift slider'ının max'i range değişince dinamik güncellenir" davranışı artık yok — bu sürümle kaldırıldı.

### v1.5.1

**Kazanım:** Açılış değerleri yeniden ayarlandı.

| Slider | Önceki default | Yeni default |
|---|---|---|
| Hue | 180° | 180° |
| Saturation | 100% | **30%** |
| Light Steps | 21 | **8** |
| Light Range | 100% | **80%** |
| Light Shift | 0% | **15%** |

**Neden:** 1.5.0'daki default (sat=100, steps=21, range=100, shift=0) tüm özellikleri sergileyen bir "demo" konfigürasyonu sayılırdı ama gerçek kullanım için abartılıydı — 21 parlak cyan, neredeyse hepsi ayırt edilemez. Yeni default:
- **Sat 30%** → abartısız, UI'da kullanılabilir doygunluk.
- **Steps 8** → bir tasarım sistemi için makul bir ton skalası (typical design tokens: 50, 100, 200, ..., 900).
- **Range 80 + Shift 15** → pencere 15–95, saf siyah ve saf beyaz dışlanmış; uçlar temiz kalıyor, içerik okunabilir renklerle dolu.

### v1.5.0

**Kazanım:** Light range + light shift kontrolleri — paletin alt kümesini istediğin gibi kesip kaydırabilirsin.

**Neden çıkıldı:**
- Her palet 0–100 arası tüm lightness spektrumunu gezmek zorunda değildi. Bazı senaryolarda sadece midtone'lar (30–70 arası), bazılarında sadece shadow'lar (0–50), bazılarında sadece highlight'lar (60–100) lazım.
- Önceden bu kısıtlamayı yapmak için grid'den kartları elle silmek gerekiyordu. Artık tek slider'la palette'in hangi dilimini üreteceğini söylüyorsun.

**Ne geldi:**
- **Light Steps** (eski adıyla Generate Count) — sadece isim değişikliği, davranış aynı. "Steps" slider'ın ne yaptığını daha net anlatıyor.
- **Light Range** (0–100%, default 100) — üretilecek lightness penceresinin genişliği. 100'deyken tam 0–100 arası, 70'teyken 70 birimlik bir pencere.
- **Light Shift** (0–(100-range)%, default 0) — pencerenin nereden başlayacağı. Range 70 iken shift 0 → pencere 0–70; shift 30 → pencere 30–100.
- Shift slider'ının `max`'i range değişince dinamik güncellenir; shift eski değeri yeni max'ı aşarsa otomatik kırpılır.
- Export dosya adı: `palette-{mode}-h{h}-s{s}-n{steps}-r{range}-o{shift}.png` — her parametre isimde olduğu için aynı klasörde karışmaz.

**Matematik:**
```
lightness[i] = shift + (i * range) / (steps - 1)
```
Range=100 + shift=0 durumunda formül `(i * 100) / (steps - 1)` olur — yani 1.4.x davranışı bu kombinasyonda birebir korunur.

### v1.4.1

**Kazanım:** Açılış modu OKLCH.

**Neden:** Aracın asıl değer önerisi (aynı hue boyunca algısal olarak tutarlı ton ölçeği) OKLCH modunda kendini gösteriyor. HSL'le açılmak kullanıcıya önce "düzensiz" palet gösterip sonra toggle'la düzeltmesini beklemeye denk düşüyor — doğrudan OKLCH ile başlamak daha temiz bir ilk izlenim.

**Değişiklik:** `index.html` içindeki mode button artık `data-mode="oklch"` ile açılıyor, etiket `OKLCH`. HSL'e geçmek için tek tık.

### v1.4.0

**Kazanım:** HSL ↔ OKLCH renk uzayı toggle'ı.

**Neden çıkıldı:**
- HSL intuitif ama perceptual olarak tutarsız — aynı lightness değerindeki iki hue (örn. sarı ve mor) gözle farklı parlaklıkta görünür. Bu özellikle monokrom bir palette fark yaratıyor: HSL'de `L: 50%` sarı, 50% mor'dan algı olarak çok daha parlak.
- OKLCH perceptual uniform bir uzay; aynı `L` değerindeki farklı hue'lar gözle yaklaşık aynı parlaklıkta. Tasarım sistemi, UI theming, data viz gibi senaryolarda "tutarlı ton ölçeği" aramak buradan çok daha temiz çıkar.
- İki uzay arasında canlı karşılaştırma yapabilmek için toggle ekledik; aynı hue/saturation/count değerleriyle iki paleti de üst üste görmek hangi uzayın işe yaradığını hızlıca anlamanın yolu.

**Ne geldi:**
- Üst paneldeki **Color Space** toggle butonu (`HSL` ↔ `OKLCH`).
- Yeni `oklchToHex()` fonksiyonu — `culori` ile OKLCH → sRGB dönüşümü ve gamut clamping (gamut dışı renkler kırpılır).
- `generatePalette(h, s, count, mode)` modu alıp ilgili `toHex` fonksiyonunu seçer.
- Hue ve saturation slider gradyanları da moda göre dinamik — OKLCH seçiliyken slider'lar OKLCH renkleriyle boyanır. Böylece slider'ın üstündeki hissiyat da üretilen paletle tutarlı.
- Export dosya adı artık modu içeriyor: `palette-hsl-h180-s100-n21.png` vs `palette-oklch-h180-s100-n21.png` — iki uzayı aynı klasörde karıştırmadan saklayabilirsin.

**Teknik notlar:**
- `culori` dependency'si eklendi (~43 kB, gzip ~16 kB) — jimp'ten çok daha hafif.
- Saturation slider'ı her iki uzayda da `0-100` aralığında; OKLCH'te bu değer `(s/100) * 0.37` formülüyle chroma'ya maplenir. 0.37 üst sınırı sRGB gamut'undaki makul bir chroma tavanı.
- Mod seçimi DOM'da butonun `data-mode` attribute'unda tutuluyor; ayrı bir state store yok.

### v1.3.0

**Kazanım:** Kart görünümü sadeleşti; HEX yazısı kartın genişliğine göre otomatik ölçekleniyor.

**Neden çıkıldı:**
- 1.2.0'da gelen count slider'ı ile kart genişliği 2×'den 51×'e kadar dalgalanıyor. Sabit `0.9rem` font boyutu iki uçta da kötü sonuç veriyordu: dar kartlarda taşma, geniş kartlarda boşluk.
- `L: X%` label'ı bilgi olarak zayıftı — lightness zaten indeks + count'tan türetilebilir, kartta görünmesi görsel gürültü yaratıyordu. Asıl kıymetli bilgi HEX kodu.

**Ne geldi:**
- Kartlar sadece HEX gösterir (`L: X%` etiketi kaldırıldı).
- HEX tipografisi **CSS Container Queries** ile kartın fiziksel genişliğine orantılı: `container-type: inline-size` + `font-size: 22cqi`. Grid'de kaç sütun olduğundan bağımsız, kart ne kadar genişse yazı da orantılı büyür.
- `JetBrains Mono` (weight 300) Google Fonts'tan yüklendi — HEX gibi büyük boyutlarda gösterilen monospace metin için ince ve temiz duruyor.

**Dokunulmayanlar:** Logic katmanı, input slider davranışı, PNG export akışı hepsi aynı — yalnızca kart DOM'u ve CSS'i değişti.

### v1.2.1

**Kazanım:** GitHub Pages üzerinde çalışır hale geldi.

**Sorun:** Vite varsayılan olarak `base: '/'` ile build eder; `index.html` içindeki asset referansları `/assets/...` şeklinde mutlak olur. Proje `yumurta2.github.io/monochrome-palette-generator/` alt yolundan servis edildiğinde bu path'ler `yumurta2.github.io/assets/...` olarak çözümleniyor → 404. Sonuç: sayfa yükleniyor ama CSS ve JS düşmüyor, sadece çıplak HTML görünüyor.

**Ne geldi:**
- `vite.config.js` tekrar eklendi; tek satırlık `base: '/monochrome-palette-generator/'` ayarı. Build sonrası asset URL'leri `/monochrome-palette-generator/assets/...` olarak üretiliyor.
- `.github/workflows/deploy.yml` — her `main` push'unda `npm run build` çalıştırıp `dist/` klasörünü GitHub Pages'a otomatik deploy eden workflow.

**Kurulum notu:** İlk deploy için GitHub repo ayarlarında `Settings → Pages → Source → GitHub Actions` seçilmeli. Sonrasında push akışı kendi kendine yeter.

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
