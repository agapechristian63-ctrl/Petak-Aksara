/** 
 * KONFIGURASI GAME PETHAK AKSARA JAWA
 */

const DEFAULT_TIMER = 15; // Waktu standar jika petak tidak punya config timer
const JAIL_TURNS = 2;
const JAIL_FINE = 100;
const PROPERTY_SELL_RATIO = 0.5; // Persentase harga jual aset dari harga beli
const PROPERTY_SELL_OVERRIDES = {
    // Contoh override per petak jika ingin nilai khusus:
    // 2: 30,
    // 3: 60
};
const jailChallengeQuestions = [
    { q: "Aksara Jawa ꦭ dibaca sebagai?", a: "la" },
    { q: "Aksara Jawa ꦤ dibaca sebagai?", a: "na" },
    { q: "Aksara Jawa ꦏ dibaca sebagai?", a: "ka" }
];

// Pool 8 soal untuk fitur spin-wheel tantangan
const spinChallengeQuestions = [
    { q: "Tulisen tembung “rumah” nganggo aksara Jawa.", a: "ꦫꦸꦩꦃ", action: "money", effect: 50 },
    { q: "Tulisen tembung “lanang” nganggo aksara Jawa.", a: "ꦭꦤꦁ", action: "move", effect: 2 },
    { q: "Tulisen tembung “lunga” nganggo aksara Jawa.", a: "ꦭꦸꦔ", action: "move", effect: -3 },
    { q: "Tulisen tembung “janaka” nganggo aksara Jawa.", a: "ꦗꦤꦏ", action: "swap", mode: "closest" },
    { q: "Tulis tembung “Yanti” nganggo aksara murda sing bener.", a: "ꦪꦤ꧀ꦠꦶ", penalty: 50 },
    { q: "Tulisen tembung “zakat” nganggo aksara murda sing bener.", a: "ꦗꦏꦠ꧀", action: "skip_turn", effect: 1 },
    { q: "Tulisein tembung “lemah” nganggo aksara Jawa lengkap karo sandhangan swara.", a: "ꦭꦼꦩꦃ", action: "move_to_start" },
    { q: "Kowe nampa tamu saka luar kutha. Tulis ucapan sambutan pendek nganggo aksara Jawa.", a: "ꦱꦭꦩꦠ", action: "jail" }
];

const pathCoords = [
    {x:9, y:9}, {x:8, y:9}, {x:7, y:9}, {x:6, y:9}, {x:5, y:9}, {x:4, y:9}, {x:3, y:9}, {x:2, y:9}, {x:1, y:9}, // 0-8 (Bawah)
    {x:1, y:8}, {x:1, y:7}, {x:1, y:6}, {x:1, y:5}, {x:1, y:4}, {x:1, y:3}, {x:1, y:2}, // 9-15 (Kiri)
    {x:1, y:1}, {x:2, y:1}, {x:3, y:1}, {x:4, y:1}, {x:5, y:1}, {x:6, y:1}, {x:7, y:1}, {x:8, y:1}, {x:9, y:1}, // 16-24 (Atas)
    {x:9, y:2}, {x:9, y:3}, {x:9, y:4}, {x:9, y:5}, {x:9, y:6}, {x:9, y:7}, {x:9, y:8}  // 25-31 (Kanan)
];

const propertyImageAssets = [
    "assets/petak/Cenil.png",
    "assets/petak/Sate.png",
    "assets/petak/Dawet.png",
    "assets/petak/Wajik.png",
    "assets/petak/Dhalang.png",
    "assets/petak/Rawon.png",
    "assets/petak/Gudeg.png",
    "assets/petak/Ngarsa Dalem.png",
    "assets/petak/Batik.png",
    "assets/petak/Nyai.png",
    "assets/petak/Thiwul.png",
    "assets/petak/Prambanan.png",
    "assets/petak/Hawu.png",
    "assets/petak/Pajak Baca.png",
    "assets/petak/Lawang Sewu.png",
    "assets/petak/Yogyakarta.png",
    "assets/petak/Mangut Lele.png",
    "assets/petak/Jaranan.png",
    "assets/petak/Tumpeng.png",
    "assets/petak/Nandur.png",
    "assets/petak/Kraton.png",
    "assets/petak/Start.png",
    "assets/petak/Bebas Parkir.png",
    "assets/petak/Tantangan.png"
];

// Daftar gambar kartu terpusat agar mudah di-update tanpa perlu mengedit tiap boardData satu per satu.
const cardImageAssets = [
    { id: 2, name: "Cenil (Ca)", frontImage: "assets/kartu/Kartu_page-0001.jpg", backImage: "assets/kartu/Kartu_page-0002.jpg" },
    { id: 3, name: "Sate (Sa)", frontImage: "assets/kartu/Kartu_page-0003.jpg", backImage: "assets/kartu/Kartu_page-0004.jpg" },
    { id: 5, name: "Dawet (Da)", frontImage: "assets/kartu/Kartu_page-0005.jpg", backImage: "assets/kartu/Kartu_page-0006.jpg" },
    { id: 7, name: "Wajik (Wa)", frontImage: "assets/kartu/Kartu_page-0007.jpg", backImage: "assets/kartu/Kartu_page-0008.jpg" },
    { id: 8, name: "Dhalang (Dha)", frontImage: "assets/kartu/Kartu_page-0009.jpg", backImage: "assets/kartu/Kartu_page-0010.jpg" },
    { id: 10, name: "Rawon (Ra)", frontImage: "assets/kartu/Kartu_page-0011.jpg", backImage: "assets/kartu/Kartu_page-0012.jpg" },
    { id: 11, name: "Gudeg (Ga)", frontImage: "assets/kartu/Kartu_page-0013.jpg", backImage: "assets/kartu/Kartu_page-0014.jpg" },
    { id: 13, name: "Ngarsa Dalem (Nga)", frontImage: "assets/kartu/Kartu_page-0015.jpg", backImage: "assets/kartu/Kartu_page-0016.jpg" },
    { id: 14, name: "Batik (Ba)", frontImage: "assets/kartu/Kartu_page-0017.jpg", backImage: "assets/kartu/Kartu_page-0018.jpg" },
    { id: 15, name: "Nyai (Nya)", frontImage: "assets/kartu/Kartu_page-0019.jpg", backImage: "assets/kartu/Kartu_page-0020.jpg" },
    { id: 16, name: "Thiwul (Tha)", frontImage: "assets/kartu/Kartu_page-0021.jpg", backImage: "assets/kartu/Kartu_page-0022.jpg" },
    { id: 19, name: "Prambanan (Pa)", frontImage: "assets/kartu/Kartu_page-0023.jpg", backImage: "assets/kartu/Kartu_page-0024.jpg" },
    { id: 20, name: "Hawu (Ha)", frontImage: "assets/kartu/Kartu_page-0025.jpg", backImage: "assets/kartu/Kartu_page-0026.jpg" },
    { id: 22, name: "Lawang Sewu (La)", frontImage: "assets/kartu/Kartu_page-0027.jpg", backImage: "assets/kartu/Kartu_page-0028.jpg" },
    { id: 23, name: "Yogyakarta (Ya)", frontImage: "assets/kartu/Kartu_page-0029.jpg", backImage: "assets/kartu/Kartu_page-0030.jpg" },
    { id: 26, name: "Mangut (Ma)", frontImage: "assets/kartu/Kartu_page-0031.jpg", backImage: "assets/kartu/Kartu_page-0032.jpg" },
    { id: 27, name: "Jaranan (Ja)", frontImage: "assets/kartu/Kartu_page-0033.jpg", backImage: "assets/kartu/Kartu_page-0034.jpg" },
    { id: 29, name: "Tumpeng (Ta)", frontImage: "assets/kartu/Kartu_page-0035.jpg", backImage: "assets/kartu/Kartu_page-0036.jpg" },
    { id: 31, name: "Nandur (Na)", frontImage: "assets/kartu/Kartu_page-0037.jpg", backImage: "assets/kartu/Kartu_page-0038.jpg" },
    { id: 32, name: "Kraton (Ka)", frontImage: "assets/kartu/Kartu_page-0039.jpg", backImage: "assets/kartu/Kartu_page-0040.jpg" }
];

function applyCardImageAssets(boardConfig, cardAssets) {
    const cardAssetMap = new Map();

    cardAssets.forEach((asset) => {
        if (!asset) return;
        if (asset.id !== undefined) cardAssetMap.set(asset.id, asset);
        if (asset.name) cardAssetMap.set(asset.name, asset);
    });

    boardConfig.forEach((tile) => {
        if (tile.type !== "property") return;

        const assetConfig = cardAssetMap.get(tile.id) || cardAssetMap.get(tile.name);
        if (!assetConfig) return;

        tile.frontImage = assetConfig.frontImage || tile.frontImage || "";
        tile.backImage = assetConfig.backImage || tile.backImage || "";
    });
}

// DATA PETAK DENGAN DAFTAR SOAL DAN CONFIG WAKTU CUSTOM
// Untuk kartu popup depan/belakang, cukup update daftar di cardImageAssets di atas.
// BoardData tetap bisa punya override khusus jika diperlukan.
const boardData = [
    { id: 1,  name: "START", type: "special", image: "assets/petak/Start.png", frontImage: "assets/kartu/cenil_depan.jpeg" },

    { id: 2,  name: "Cenil (Ca)", type: "property", frontImage: "assets/kartu/Cenil.png", backImage: "assets/kartu/Cenil (2).png", price: 50, rent: 25, timer: 90, sell: 50, questions: [
        { q: "Delengen aksara ing ngisor iki lan wangsulana: “Apa aksara iki nulis tembung ‘ta’ kanthi bener?” Tulisan: ꦠ", a: "Wangsulan wonten ing guru" },
        { q: "Tembung 'buku, kutu, lan suku' nganggo aksara Jawa bakal diwiwiti nganggo aksara apa? Tulisen aksara kasebut.", a: "Wangsulan wonten ing guru" },
        { q: "Ana siswa nulis tembung “nana” nganggo aksara Jawa kaya ngene: ꦤꦲꦤꦲ Apa kuwi bener? Yen salah, sing endi sing kudu diganti?", a: "Wangsulan wonten ing guru" },
        { q: "Tembung “pari, gamelan, lan sapi ” yen ditulis nganggo aksara Jawa, bakal diwiwiti nganggo aksara apa wae? Tulisen aksara kasebut.", a: "Wangsulan wonten ing guru" },
        { q: "Delengen tulisan aksara Jawa iki: ꦗꦺꦴꦤ Apa tembung kuwi nulis tembung “joni” kanthi bener? Yen ora bener, endi sing kudu diganti?", a: "Wangsulan wonten ing guru" },
        { q: "Saka tembung “tuku geguritan, lan rebo”, carakan apa wae sing kudu ditulis kanggo tembung kwi supaya bener?", a: "Wangsulan wonten ing guru" },
        { q: "Tulisen carakan sing digunakake kanggo nulis suku kata “du” ing tembung “duwit”!", a: "Wangsulan wonten ing guru" },
        { q: "Tembung “pitik, guru, lan solo” diwiwiti nganggo aksara apa? Tulisen aksara kasebut!", a: "Wangsulan wonten ing guru" },
        { q: "Tembung “dolanan” lan “menyang” diwiwiti nganggo aksara apa? Tulisen aksara kasebut!", a: "Wangsulan wonten ing guru" },
        { q: "Delengen tulisan aksara Jawa iki = ꦥꦏ꧀ Apa kuwi nulis tembung “pak” kanthi bener? Jelaskna.", a: "Wangsulan wonten ing guru" },
        { q: "Tembung “lantai” lan “keris” diwiwiti nganggo aksara apa? Tulisen!", a: "Wangsulan wonten ing guru" },
        { q: "Ing tembung “ꦩꦤ꧀ꦢꦶꦏ꧀” (mandik), Aksara apa sing dipasangake kanggo suku kata “ndi”? Tulisen pasangane!", a: "Wangsulan wonten ing guru" },
        { q: "Ing tembung “sendok”, aksara apa sing dipasangake kanggo “ndo”? Tulisen!", a: "Wangsulan wonten ing guru" },
        { q: "Ing tembung “ꦆꦤ꧀ꦢꦢꦺꦴꦤꦺꦱꦶꦄ” (indhonesia / “ꦲꦤ꧀ꦢꦺꦴꦤꦺꦱꦶꦪ” indonesia), Sebutna 3 pasangan sing digunakake beserta suku katane!", a: "Wangsulan wonten ing guru" },
        { q: "Tembung “lunga” lan “mangan” yen ditulis nganggo aksara Jawa, diwiwiti nganggo carakan apa? Tulisen aksara kasebut!", a: "Wangsulan wonten ing guru" }
    ]},
    
    { id: 3,  name: "Sate (Sa)", type: "property", frontImage: "assets/kartu/Sate.png", backImage: "assets/kartu/Sate (2).png", price: 100, rent: 50, timer: 60, sell: 75, questions: [
        { q: "Wacanen aksara iki “ꦏꦕ”!", a: "Wangsulan wonten ing guru" },
        { q: "Wacanen aksara iki “ꦩꦠ”!", a: "Wangsulan wonten ing guru" },
        { q: "Wacanen aksara iki “ꦭꦫ”!", a: "Wangsulan wonten ing guru" },
        { q: "Wacanen aksara iki “ꦧꦱ”!", a: "Wangsulan wonten ing guru" },
        { q: "Wacanen aksara iki “ꦧꦠ”!", a: "Wangsulan wonten ing guru" },
        { q: "Wacanen aksara iki “ꦚꦠ”!", a: "Wangsulan wonten ing guru" },
        { q: "Wacanen aksara iki “ꦩꦕ”!", a: "Wangsulan wonten ing guru" },
        { q: "Wacanen aksara iki “ꦥꦢ”!", a: "Wangsulan wonten ing guru" },
        { q: "Wacanen aksara iki “ꦗꦒ”!", a: "Wangsulan wonten ing guru" },
        { q: "Wacanen aksara iki “ꦢꦠ”!", a: "Wangsulan wonten ing guru" },
        { q: "Wacanen aksara iki “ꦏꦭꦝ”!", a: "Wangsulan wonten ing guru" },
        { q: "Wacanen aksara iki “ꦩꦢꦫ”!", a: "Wangsulan wonten ing guru" },
        { q: "Wacanen aksara iki “ꦏꦮꦠ”!", a: "Wangsulan wonten ing guru" },
        { q: "Wacanen aksara iki “ꦮꦢꦏ”!", a: "Wangsulan wonten ing guru" },
        { q: "Wacanen aksara iki “ꦩꦢꦏ”!", a: "Wangsulan wonten ing guru" },
        { q: "Wacanen aksara iki “ꦧꦭꦢ”!", a: "Wangsulan wonten ing guru" },
        { q: "Wacanen aksara iki “ꦤꦒꦢ”!", a: "Wangsulan wonten ing guru" }
    ]},

{
    name: "Dana Umum",
    type: "dana-umum",
    image: "assets/petak/Dana Umum.png",
    cards: [
        { text: "Angsal koin 5 perak", effect: 5, action: "money" },
        { text: "Angsal 3 koin 100 perak", effect: 300, action: "money" },
        { text: "Kartu niki saget disimpen dingge bebas pajak 1 kali.", action: "keep", type: "bebas_pajak" },
        { text: "Kartu niki saget disimpen dingge bebas penjara 1 kali", action: "keep", type: "bebas_penjara" },
        { text: "Balekke dhuwit ing bank 50 perak", effect: -50, action: "money" },
        { text: "JEGAGIK!!!!! Angsal 1000 perak", effect: 1000, action: "money" },
        { text: "Balekke dhuwit ing bank 100 perak", effect: -100, action: "money" },
        { text: "SUKUR!!!! Belekke dhuwit bank 1000 perak", effect: -1000, action: "money" },
        { text: "Angsal 2 koin 50 perak", effect: 100, action: "money" },
        { text: "Angsal 1 koin 500 perak", effect: 500, action: "money" },
        { text: "Bayar pajeg menyang bank 200 perak", effect: -200, action: "money" },
        { text: "Bayar sewa papan 150 perak", effect: -150, action: "money" },
        { text: "Angsal bonus 250 perak", effect: 250, action: "money" },
        { text: "JACKPOT!!!!! Angsal 1500 perak", effect: 1500, action: "money" },
        { text: "SUKUR!!!! Balekke dhuwit ing bank 500 perak", effect: -500, action: "money" },
        { text: "Kartu niki saget disimpen dingge bebas mundur 1 kali", action: "keep", type: "bebas_mundur" },
        { text: "Angsal 300 perak", effect: 300, action: "money" },
        { text: "Oleh warisan saka simbah, angsal 700 perak", effect: 700, action: "money" },
        { text: "Dagangan laris manis, angsal 400 perak", effect: 400, action: "money" },
        { text: "Dagangan rugi, balekke 350 perak ing bank", effect: -350, action: "money" },
        { text: "Mlebu penjara, bayar biaya 250 perak", effect: -250, action: "money" }, // Logika masuk penjara bisa dikembangkan nanti jika sistem penjara aktif
        { text: "Oleh hadiah undian pasar, angsal 800 perak", effect: 800, action: "money" },
        { text: "Angsal bonus 300 perak", effect: 300, action: "money" },
        { text: "Bayar utang neng bank 350 perak", effect: -350, action: "money" },
        { text: "Angsal 50 perak", effect: 50, action: "money" },
        { text: "Angsal 2 koin 5 perak", effect: 10, action: "money" },
        { text: "Bayar 50 perak neng bank", effect: -50, action: "money" },
        { text: "Kartu niki saget disimpen dingge bebas utang 100 perak", action: "keep", type: "potong_utang_100" },
        { text: "Kartu niki saget dingge bayar utang 5 perak", effect: -5, action: "money" },
        { text: "Bayar utang 150 perak neng bank", effect: -150, action: "money" },
        { text: "Angsal 100 perak ditambah bayar pajak 50 perak", effect: 50, action: "money" }, // Bersih dapat 50
        { text: "Angsal 300 perak ditambah bayar utang neng bank 250 perak", effect: 50, action: "money" }, // Bersih dapat 50
        { text: "Angsal 1000 perak ditambah bayar utang neng bank 500 perak", effect: 500, action: "money" }, // Bersih dapat 500
        { text: "Kartu iki saget dingge bebas gerak 1 kali", action: "keep", type: "bebas_gerak" },
        { text: "Angsal 2 koin 100 perak", effect: 200, action: "money" },
        { text: "Angsal 3 koin 5 perak", effect: 15, action: "money" }
    ]},

    { id: 5,  name: "Dawet (Da)", type: "property", frontImage: "assets/kartu/Dawet.png", backImage: "assets/kartu/Dawet (2).png", price: 150, rent: 75, timer: 120, sell: 125, questions: [
        { q: "Tulisna aksara Jawa saka tembung 'tulung, banyu, lan wedang '!", a: "Wangsulan wonten ing guru" },
        { q: "Tulisna aksara Jawa saka tembung “lurik, beras, lan wulangan”!", a: "Wangsulan wonten ing guru" },
        { q: "Tulisna aksara Jawa saka tembung “wedhi, iwak, gedhang” !", a: "Wangsulan wonten ing guru" },
        { q: "Tulis nganggo aksara Jawa: “esuk, kupat, lan gamelan”! Gatekna sandhangane!", a: "Wangsulan wonten ing guru" },
        { q: "Tembung “gaweyan, adhus, lan mulih” ditulis nganggo aksara Jawa kaya apa? Tulisen kanthi lengkap!", a: "Wangsulan wonten ing guru" },
        { q: "Tulisna tembung “prasaja, sregep, lan kridha” nganggo aksara Jawa!", a: "Wangsulan wonten ing guru" },
        { q: "Tulis tembung “dhalang, kawruh, suket” nganggo aksara Jawa!", a: "Wangsulan wonten ing guru" },
        { q: "Tulisna tembung “kabudayan, sinau, sawijining, kawruh, adat” nganggo aksara Jawa, lengkap karo sandhangane!", a: "Wangsulan wonten ing guru" },
        { q: "Tulisen nganggo aksara Jawa tembung “pambagya, bebrayan, kawula” nganggo sandhangan swara sing cocok!", a: "Wangsulan wonten ing guru" },
        { q: "Tulis nganggo aksara Jawa tembung “pangapurane, kaluwarga,tindak” kanthi lengkap lan bener!", a: "Wangsulan wonten ing guru" },
        { q: "Tulisna tembung “pisang, garwane, lan dalan” nganggo aksara Jawa!", a: "Wangsulan wonten ing guru" },
        { q: "Tulis nganggo aksara Jawa tembung “mangan, jamu, lan pari”!", a: "Wangsulan wonten ing guru" },
        { q: "Tulisen nganggo aksara Jawa tembung “adi, guru, lan tembung”!", a: "Wangsulan wonten ing guru" },
        { q: "Tulis tembung “warung, nulis, lan krupuk” nganggo aksara Jawa!", a: "Wangsulan wonten ing guru" },
        { q: "Tulisna tembung “mbakyu, cilik, lan wingi” nganggo aksara Jawa kanthi bener!", a: "Wangsulan wonten ing guru" },
        { q: "Tulisen aksara Jawa saka tembung “gedhe, wetan, lan sinau”!", a: "Wangsulan wonten ing guru" },
        { q: "Tulis nganggo aksara Jawa tembung “tanduran, banyune, lan omahe” kanthi lengkap", a: "Wangsulan wonten ing guru" }
    ]},

    { id: 6,  name: "TANTANGAN", type: "card", image: "assets/petak/Tantangan.png" },

    { id: 7,  name: "Wajik (Wa)", type: "property", frontImage: "assets/kartu/Wajik.png", backImage: "assets/kartu/Wajik (2).png", price: 200, rent: 100, timer: 110, sell: 175, questions: [
        { q: "Tulisna ukara 'Bapak tuku roti' nganggo aksara Jawa!", a: "Wangsulan wonten ing guru" },
        { q: "Tulis ukara 'Ibu masak sayur' nganggo pasangan aksara!", a: "Wangsulan wonten ing guru" },
        { q: "Tulisen ukara “Rama lunga pasar” nganggo aksara Jawa!", a: "Wangsulan wonten ing guru" },
        { q: "Tulisna ukara “Adi mangan sega” nganggo aksara Jawa lan pasangan sing bener!", a: "Wangsulan wonten ing guru" },
        { q: "Tulisen ukara “Sari nyapu latar” nganggo aksara Jawa!", a: "Wangsulan wonten ing guru" },
        { q: "Tulisna ukara “Eka ngethok pari” nganggo aksara Jawa lan pasangan!", a: "Wangsulan wonten ing guru" },
        { q: "Gawenana tulisan aksara Jawa saka ukara “Wulan nyiram kembang”!", a: "Wangsulan wonten ing guru" },
        { q: "Tulis ukara “Toni masak sayur” nganggo pasangan aksara Jawa!", a: "Wangsulan wonten ing guru" },
        { q: "Tulisen nganggo aksara Jawa “Budi mangan sega”!", a: "Wangsulan wonten ing guru" },
        { q: "Gawenen tulisan aksara Jawa saka ukara “Siti ngresiki kamar”!", a: "Wangsulan wonten ing guru" },
        { q: "Tulisna ukara “Eka ngethok pari” nganggo aksara Jawa lan pasangan!", a: "Wangsulan wonten ing guru" },
        { q: "Gawenana tulisan aksara Jawa saka ukara “Wulan nyiram kembang”!", a: "Wangsulan wonten ing guru" },
        { q: "Gawenen tulisan aksara Jawa saka ukara 'Deni ngethok godhong' kanthi pasangan sing bener!", a: "Wangsulan wonten ing guru" },
        { q: "Tulisna ukara 'Dedi nggawa oleh-oleh' nganggo aksara Jawa. Pasangan apa wae sing digunakake kanggo nulis ukara kasebut?", a: "Wangsulan wonten ing guru" },
        { q: "Tulisna nganggo aksara Jawa: 'Nina ngresiki pawon.' Tulisen nganggo pasangan sing bener!", a: "Wangsulan wonten ing guru" },
        { q: "Gawenana tulisan aksara Jawa saka ukara 'Riko nyambut gawe.' Tulisen nganggo pasangan sing bener!", a: "Wangsulan wonten ing guru" }
    ]},
    
    { id: 8,  name: "Dhalang (Dha)", type: "property", frontImage: "assets/kartu/Dhalang.png", backImage: "assets/kartu/Dhalang (2).png", price: 250, rent: 125, timer: 120, sell: 225, questions: [
        { q: "Sebutna telu aksara murda!", a: "Wangsulan wonten ing guru" },
        { q: "Apa fungsi utama aksara murda ing tulisan aksara Jawa? (Terangna nganggo aksara jawa.)", a: "Wangsulan wonten ing guru" },
        { q: "Tembung “Surabaya” kalebu jeneng kutha. Aksara murda apa wae sing kudune digunakake kanggo nulis tembung kasebut?", a: "Wangsulan wonten ing guru" },
        { q: "Tulisen jeneng “Bagas Nugroho” nganggo aksara Jawa, lan gunakna aksara murda sing trep!", a: "Wangsulan wonten ing guru" },
        { q: "Saka tembung “Yogyakarta, bujangga, Agus, pasar, lan Solo” endi wae sing kudu ditulis nganggo aksara murda? Tulisen tembung kasebut nganggo aksara Jawa!", a: "Wangsulan wonten ing guru" },
        { q: "Ing ukara: “Pak Budi guru ing SMA Negeri 1 Salatiga”, tembung apa wae sing kudu ditulis nganggo aksara murda? Sebutna lan tulisen!", a: "Wangsulan wonten ing guru" },
        { q: "Tulisen kalimat “Rina lan Damar mangkat menyang Magelang” nganggo aksara Jawa. Gunakna aksara murda sing trep!", a: "Wangsulan wonten ing guru" },
        { q: "Tembung “Jaka Pranata” kalebu jeneng wong. Tembung endi wae sing kudu ditulis nganggo aksara murda?", a: "Wangsulan wonten ing guru" },
        { q: "Ing ukara “Rini lunga bareng Pak Darto menyang Yogya dina Minggu” endi wae tembung sing kudu nganggo aksara murda? Tulis tembung kasebut nganggo aksara Jawa, lan sebutna aksara murda sing digunakake.", a: "Wangsulan wonten ing guru" },
        { q: "Surabaya, tari, Rita, buku, lan Dedi, endi wae sing kudu ditulis nganggo aksara murda? Tulis tembung kasebut nganggo aksara Jawa, lan tulis aksara murda sing digunakake.", a: "Wangsulan wonten ing guru" },
        { q: "Delengen ukara iki: “Bu Raras tindak menyang pasar karo Pak Joko.” Tembung endi wae sing bisa ditulis nganggo aksara murda? Terangna sebab-sebabe!", a: "Wangsulan wonten ing guru" },
        { q: "Tembung “Dokter Andika sekolah ing Semarang.” Endi wae sing nampa aksara murda? Tulisen kanthi aksara Jawa!", a: "Wangsulan wonten ing guru" },
        { q: "Banjurna daftar iki nganggo aksara murda yen perlu: “bambang, rita, buku, madiun, catur, surya” — endi wae sing nampa aksara murda lan kenapa?", a: "Wangsulan wonten ing guru" },
        { q: "Nggunakake aksara murda, tulisen tembung “Gita lan Cahya mlebu sekolah Wates”.", a: "Wangsulan wonten ing guru" },
        { q: "Coba tulisen tembung iki nganggo aksara Jawa lan gunakna aksara murda sing pas: “Raka lan Dina mangkat menyang Kudus dina Rebo.”", a: "Wangsulan wonten ing guru" },
        { q: "Endi wae tembung sing kudu ditulis nganggo aksara murda saka ukara iki: “Pak Darman guru ing SMP Negeri 2 Klaten”? Jelaskna alasane!", a: "Wangsulan wonten ing guru" },
        { q: "Delengen ukara iki: “Bapak Aditya sekolah ing SMK Negeri 1 Kudus.” a) Sebutna tembung sing kudu ditulis nganggo aksara murda. b) Tulisen tembung kasebut nganggo aksara Jawa.", a: "Wangsulan wonten ing guru" }
    ]},

    { id: 9,  name: "PENJARA", type: "jail_spot", image: "assets/petak/Penjoro-1.png" },

    { id: 10, name: "Rawon (Ra)", type: "property", frontImage: "assets/kartu/Rawon.png", backImage: "assets/kartu/Rawon (2).png", price: 300, rent: 150, timer: 80, sell: 275, questions: [
        { q: "Tulisen ukara “Ani adus esuk” nganggo aksara Jawa sing trep!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen ukara “Dina mangan sate” nganggo aksara Jawa lengkap!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen tembung 'Bapak lan ibu tindak menyang kantor' dadi aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Tembung “Rina dolan omah mbah” ditulis nganggo aksara Jawa kepriye?", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen ukara “Tono dolan menyang kali” nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen ukara “Eka numpak pit” nganggo aksara Jawa lengkap!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisna ukara “Budi sinau saben dina” nganggo aksara Jawa sing trep!", a: "Wangsulan wonten ing Guru" },
        { q: "Ukara “Sari tuku kembang” ditulis nganggo aksara Jawa kepriye?", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisna ukara “Lina masak sega” nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisna ukara “Riko mlaku menyang pasar” nganggo aksara Jawa kanthi trep!", a: "Wangsulan wonten ing Guru" },
        { q: "Ukara “Riko lan Dini dolan menyang taman” kudu ditulis nganggo aksara Jawa kepriye?", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen nganggo aksara Jawa: “Eka lan Rini nonton wayang kulit”.", a: "Wangsulan wonten ing Guru" },
        { q: "Ukara “Gilang nggawa buku anyar” kudu ditulis nganggo aksara Jawa kepriye?", a: "Wangsulan wonten ing Guru" },
        { q: "Tembung “Lia masak sayur ing pawon” ditulis nganggo aksara Jawa kepriye?", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen kalimat “Wira adus sadurunge sekolah” nganggo aksara Jawa lengkap!", a: "Wangsulan wonten ing Guru" },
        { q: "Ukara “Bambang nggambar omah lan wit” ditulis nganggo aksara Jawa kepriye?", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen ukara “Rudi ngumbah motor ing ngarep omah” nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" }
    ]},

    { id: 11, name: "Gudeg (Ga)", type: "property", frontImage: "assets/kartu/Gudeg.png", backImage: "assets/kartu/Gudeg (2).png", price: 350, rent: 175, timer: 150, sell: 325, questions: [
        { q: "Tulisen aksara iki dadi aksara latin! ꧋ꦒꦸꦤꦠ ꦲꦁꦏꦺꦴꦭꦺꦴꦁ ꦥꦺꦴꦏ꧀꧈", a: "Wangsulan wonten ing Guru" },
        { q: "Wacanen lan ubah aksara Jawa iki dadi teks Latin kanthi bener! ꧋ꦧꦪꦸ ꦱꦼꦤꦼꦁ ꦏꦸꦕꦶꦁ꧉", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen aksara iki dadi aksara latin! ꧋ꦏꦸꦛꦶꦏꦸꦁꦲꦶꦁꦱꦶꦭꦸꦁꦒꦸꦃ꧉", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen aksara iki dadi aksara latin kanthi bener! ꧋ꦧꦸꦢꦶ ꦭꦁꦩꦱꦏ꧉", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen aksara iki dadi aksara latin kanthi bener! ꧋ꦭꦫꦱ꧀ ꦭꦁꦲꦢꦸꦱ꧀꧉", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen aksara iki dadi aksara latin sing bener! ꧋ꦗꦺꦴꦏꦺꦴ ꦭꦁꦩꦔꦤ꧀꧉", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen aksara iki dadi aksara latin sing bener! ꧋ꦢꦶꦤꦶ ꦭꦁꦥꦶꦠꦸꦠ꧀꧉", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen aksara iki dadi aksara latin sing bener! ꧋ꦫꦏ ꦭꦁꦩꦺꦴꦫꦺ꧉", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen aksara iki dadi aksara latin sing bener! ꧋ꦲꦤ꧀ꦠꦺꦴ ꦭꦁꦱꦶꦫꦩ꧉", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen aksara iki dadi aksara latin sing bener! ꧋ꦮꦮꦤ꧀ ꦭꦁꦲꦶꦏ꧀ꦭꦶ꧉", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen aksara iki dadi aksara latin sing bener! ꧋ꦱꦶꦩ꧀ꦧꦃ ꦭꦒꦶ ꦄꦢꦸꦱ꧀꧉", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen aksara iki dadi aksara latin sing bener! ꧋ꦩ꧀ꦧꦏ꧀ ꦄꦤꦶ ꦭꦒꦶ ꦩꦱꦏ꧀꧉", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen aksara iki dadi aksara latin sing bener! ꧋ꦩ꧀ꦧꦱ꧀ ꦧꦪꦸ ꦭꦒꦶ ꦭꦸꦔ ꦠꦸꦏꦸ ꦥꦺꦤ꧀ꦠꦺꦴꦭ꧀꧉", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen aksara iki dadi aksara latin sing bener! ꧋ꦥꦏ꧀ ꦮꦶꦢꦢ ꦤꦸꦩ꧀ꦥꦏ꧀ ꦩꦺꦧꦶꦭ꧀꧉", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen aksara iki dadi aksara latin sing bener! ꧋ꦧꦸ ꦱꦶꦠ ꦭꦒꦶ ꦤꦺꦁ ꦥꦱꦂ꧉", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen aksara iki dadi aksara latin sing bener! ꧋ꦥꦏ꧀ ꦱꦸꦥꦂꦶ ꦤꦸꦩ꧀ꦥꦏ꧀ ꦩꦺꦴꦠꦂ ꦲꦚꦂ꧉", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen aksara iki dadi aksara latin sing bener! ꧋ꦧꦸ ꦭꦶꦭꦶ ꦭꦤ꧀ ꦱꦶꦠꦶ ꦭꦒꦶ ꦩꦱꦏ꧀ ꦧꦫꦼꦁ꧉", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen aksara iki dadi aksara latin sing bener! ꧋ꦭꦶꦱ ꦩꦔ꧀ꦏꦠ꧀ ꦱꦼꦏꦲꦭ꧀ꦲ꧀꧉", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen aksara iki dadi aksara latin sing bener! ꧋ꦧꦸꦢꦶ ꦠꦸꦏꦸ ꦏꦿꦸꦥꦸꦏ꧀ ꦏꦿꦺꦕꦺꦏ꧀꧉", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen aksara iki dadi aksara latin sing bener! ꧋ꦩ꧀ꦱ꧀ ꦲꦤ꧀ꦢꦶ ꦭꦒꦶ ꦄꦗꦂ ꦤꦸꦩ꧀ꦥꦏ꧀ ꦩꦺꦧꦶꦭ꧀꧉", a: "Wangsulan wonten ing Guru" }
    ]},

    {
    name: "Dana Umum",
    type: "dana-umum",
    image: "assets/petak/Dana Umum.png",
    cards: [
        { text: "Angsal koin 5 perak", effect: 5, action: "money" },
        { text: "Angsal 3 koin 100 perak", effect: 300, action: "money" },
        { text: "Kartu niki saget disimpen dingge bebas pajak 1 kali.", action: "keep", type: "bebas_pajak" },
        { text: "Kartu niki saget disimpen dingge bebas penjara 1 kali", action: "keep", type: "bebas_penjara" },
        { text: "Balekke dhuwit ing bank 50 perak", effect: -50, action: "money" },
        { text: "JEGAGIK!!!!! Angsal 1000 perak", effect: 1000, action: "money" },
        { text: "Balekke dhuwit ing bank 100 perak", effect: -100, action: "money" },
        { text: "SUKUR!!!! Belekke dhuwit bank 1000 perak", effect: -1000, action: "money" },
        { text: "Angsal 2 koin 50 perak", effect: 100, action: "money" },
        { text: "Angsal 1 koin 500 perak", effect: 500, action: "money" },
        { text: "Bayar pajeg menyang bank 200 perak", effect: -200, action: "money" },
        { text: "Bayar sewa papan 150 perak", effect: -150, action: "money" },
        { text: "Angsal bonus 250 perak", effect: 250, action: "money" },
        { text: "JACKPOT!!!!! Angsal 1500 perak", effect: 1500, action: "money" },
        { text: "SUKUR!!!! Balekke dhuwit ing bank 500 perak", effect: -500, action: "money" },
        { text: "Kartu niki saget disimpen dingge bebas mundur 1 kali", action: "keep", type: "bebas_mundur" },
        { text: "Angsal 300 perak", effect: 300, action: "money" },
        { text: "Oleh warisan saka simbah, angsal 700 perak", effect: 700, action: "money" },
        { text: "Dagangan laris manis, angsal 400 perak", effect: 400, action: "money" },
        { text: "Dagangan rugi, balekke 350 perak ing bank", effect: -350, action: "money" },
        { text: "Mlebu penjara, bayar biaya 250 perak", effect: -250, action: "money" }, // Logika masuk penjara bisa dikembangkan nanti jika sistem penjara aktif
        { text: "Oleh hadiah undian pasar, angsal 800 perak", effect: 800, action: "money" },
        { text: "Angsal bonus 300 perak", effect: 300, action: "money" },
        { text: "Bayar utang neng bank 350 perak", effect: -350, action: "money" },
        { text: "Angsal 50 perak", effect: 50, action: "money" },
        { text: "Angsal 2 koin 5 perak", effect: 10, action: "money" },
        { text: "Bayar 50 perak neng bank", effect: -50, action: "money" },
        { text: "Kartu niki saget disimpen dingge bebas utang 100 perak", action: "keep", type: "potong_utang_100" },
        { text: "Kartu niki saget dingge bayar utang 5 perak", effect: -5, action: "money" },
        { text: "Bayar utang 150 perak neng bank", effect: -150, action: "money" },
        { text: "Angsal 100 perak ditambah bayar pajak 50 perak", effect: 50, action: "money" }, // Bersih dapat 50
        { text: "Angsal 300 perak ditambah bayar utang neng bank 250 perak", effect: 50, action: "money" }, // Bersih dapat 50
        { text: "Angsal 1000 perak ditambah bayar utang neng bank 500 perak", effect: 500, action: "money" }, // Bersih dapat 500
        { text: "Kartu iki saget dingge bebas gerak 1 kali", action: "keep", type: "bebas_gerak" },
        { text: "Angsal 2 koin 100 perak", effect: 200, action: "money" },
        { text: "Angsal 3 koin 5 perak", effect: 15, action: "money" }
    ]},

    { id: 13, name: "Ngarsa Dalem (Nga)", type: "property", frontImage: "assets/kartu/Ngemplak.png", backImage: "assets/kartu/Ngemplak (2).png", price: 400, rent: 200, timer: 110, sell: 375, questions: [
        { q: "Tulis angka 3 lan 7 nganggo aksara Jawa.", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen angka ꧑꧙꧔꧕ nganggo angka Latin biasa!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulis angka 2024 nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulis angka 1998 nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulis angka 6, 8, lan 9 nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen angka 1945 nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen angka 1898 nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen 8 + 9 = 17 nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen angka 1775 nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen angka 301 nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen angka 8 nganggo aksara Jawa lan lafalé nganggo aksara Latin!", a: "Wangsulan wonten ing Guru" },
        { q: "Angka 45 ditulis nganggo aksara Jawa kepriye? Tulis bacaané nganggo aksara Latin!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen angka 103 nganggo aksara Jawa, banjur tulisen bacaané nganggo tembung Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Angka 3.021 ditulis nganggo aksara Jawa kepriye? Apa tembung bacaané?", a: "Wangsulan wonten ing Guru" },
        { q: "Tulis angka 87 nganggo aksara Jawa, banjur tulis tembung jawané!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulis angka 345 nganggo aksara Jawa, banjur wenehi tembung bacaané!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen angka 56 nganggo aksara Jawa, banjur tulisen bacaané nganggo tembung Jawa!", a: "Wangsulan wonten ing Guru" }
    ]},

    { id: 14, name: "Batik (Ba)", type: "property", frontImage: "assets/kartu/Batik.png", backImage: "assets/kartu/Batik (2).png", price: 450, rent: 275, timer: 110, sell: 425, questions: [
        { q: "Tembung “krama” ditulis nganggo sandhangan wyanjana apa kanggo aksara “ra”?", a: "Wangsulan wonten ing Guru" },
        { q: "Apa jenengé sandhangan wyanjana kang digunakaké kanggo nulis aksara “nya” ing tembung “kanya”?", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen tembung “prasaja” nganggo aksara Jawa lan sandhangan wyanjana sing bener!", a: "Wangsulan wonten ing Guru" },
        { q: "Tembung “bangsa” nganggo sandhangan wyanjana apa kanggoo aksara “sa”?", a: "Wangsulan wonten ing Guru" },
        { q: "Tembung “tresna” migunakake sandhangan wyanjana apa kanggo akssara “na”? Tulisen jenenge nganggo aksara Jawa.", a: "Wangsulan wonten ing Guru" },
        { q: "Tembung “seneng” ditulis nganggo sandhangan wyanjana apa kanggo aksara “nga”?", a: "Wangsulan wonten ing Guru" },
        { q: "Apa sandhangan wyanjana kang digunakake kanggo nulis aksara “ma” ing tembung “karma”?", a: "Wangsulan wonten ing Guru" },
        { q: "Sandhangan wyanjana apa kang digunaake kanggo nulis aksara “ca” ing tembung “bocah”", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen tembung “panganan” nganggo aksara Jawa lan tulise sandhangan wyanjana sing pas!", a: "Wangsulan wonten ing Guru" },
        { q: "Sandhangan wyanjana apa kang cocok kanggo nulis aksara “ba” ing tembung “mbakyu”?", a: "Wangsulan wonten ing Guru" },
        { q: "Tembung “ndalu” nganggo sandhangan wyanjana apa kanggo aksara “da”?", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen tembung “ngramut” nganggo aksara Jawa lan sebutna sandhangan wyanjana sing digunakake!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen tembung “kridha” nganggo aksara Jawa, banjur jenengna sandhangan wyanjana kang digunakaké kanggo aksara “ra”!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulis tembung “mbebayani” nganggo aksara Jawa, banjur sandhangan wyanjana apa kang digunakaké kanggo aksara “ba”?", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen tembung “srawung” nganggo aksara Jawa, banjur sandhangan wyanjana apa kang dipakai kanggo aksara “ra”?", a: "Wangsulan wonten ing Guru" },
        { q: "Tulis tembung “ngguyu” nganggo aksara Jawa, banjur apa sandhangan wyanjana kang digunakaké kanggo aksara “ga”?", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen tembung “tresna” nganggo aksara Jawa, banjur apa sandhangan wyanjana kanggo aksara “na”?", a: "Wangsulan wonten ing Guru" }
    ]},

    { id: 15, name: "Nyai (Nya)", type: "property", frontImage: "assets/kartu/Nyai.png", backImage: "assets/kartu/Nyai (2).png", price: 500, rent: 250, timer: 90, sell: 475, questions: [
        { q: "Tulis tembung 'luhur' nganggo aksara Jawa.", a: "Wangsulan wonten ing Guru" },
        { q: "Tembung “siti” nganggo sandhangan swara apa kanggo aksara “sa”?", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen tembung “lemah” nganggo aksara Jawa lan sandhangan swara sing bener!", a: "Wangsulan wonten ing Guru" },
        { q: "Tembung “kutha” digawe nganggo aksara Jawa lan sandhangan swara apa wae?", a: "Wangsulan wonten ing Guru" },
        { q: "Aksara apa wae lan sandhangan apa wae sing digunakake kanggo nulis tembung “bapak”?", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen tembung “wedang” nganggo aksara Jawa lan sandhangan swara sing trep!", a: "Wangsulan wonten ing Guru" },
        { q: "Tembung “dhewe” nganggo sandhangan swara apa kanggo vokal “e” sing pungkasan?", a: "Wangsulan wonten ing Guru" },
        { q: "Tembung “kulo” diwiwiti aksara apa lan nganggo sandhangan swara apa?", a: "Wangsulan wonten ing Guru" },
        { q: "Sandhangan swara apa sing cocog kanggo nulis vokal “u” ing tembung “gunung”?", a: "Wangsulan wonten ing Guru" },
        { q: "Apa jenenge sandhangan swara kang dipasangan ing aksara “ba” kanggo mbentuk tembung “beda”?", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen tembung “mulih” nganggo aksara Jawa, lan sebutna sandhangan swara kanggo vokal “u”!", a: "Wangsulan wonten ing Guru" },
        { q: "Apa jenenge sandhangan swara kanggo vokal “o” ing tembung “roso”? Tulisen tembungé nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Tembung “mangan” nganggo sandhangan swara apa? Tulis tembungé nganggo aksara Jawa lengkap!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen tembung “kuping” nganggo aksara Jawa, banjur sandhangan swara apa sing ana ing kono", a: "Wangsulan wonten ing Guru" },
        { q: "Apa jeneng sandhangan swara kanggo vokal “i” ing tembung “dadi siji”? Tulisen tembung kasebut nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen tembung “kebon” nganggo aksara Jawa lan sandhangan swara kanggo vokal “e” lan “o”!", a: "Wangsulan wonten ing Guru" },
        { q: "Apa sandhangan swara kanggo vokal “u” ing tembung “luhur”? Tulis tembungé nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" }
    ]},

    { id: 16, name: "Thiwul (Tha)", type: "property", frontImage: "assets/kartu/Thiwul.png", backImage: "assets/kartu/Thiwul (2).png", price: 550, rent: 275, timer: 125, sell: 525, questions: [
        { q: "Aksara rekan apa sing digunakaké kanggo nulis tembung “khilafah, vaksin, lan filsafat”?", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen tembung “zakat, faqih, faktor ” nganggo aksara Jawa nganggo aksara rekan sing pas!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulis tembung 'khazanah, zaman, fisika ' nganggo aksara rekan.", a: "Wangsulan wonten ing Guru" },
        { q: "Aksara rekan apa wae sing digunakake untuk nulis tembung “zakat, laboratorium, lan vonis”?", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen tembung “zona, laboratorium, lan klinik” nganggo aksara rekan sing cocok.", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen tembung “universitas, klasik, lan akses ” nganggo aksara Jawa lan ganggo aksara rekan.", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen tembung “software” lan “hardware” nganggo aksara Jawa lan aksara rekan sing cocok.", a: "Wangsulan wonten ing Guru" },
        { q: "Apa aksara rekan sing digunakake kanggo nulis suku kata “spon” lan “sor” ing tembung “sponsor”? Tulisen nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen tembung “program” nganggo aksara Jawa lan gunakake aksara rekan sing trep!", a: "Wangsulan wonten ing Guru" },
        { q: "Tembung “khusus” perlu tembung aksara rekan apa kanggo nulis “kh”?", a: "Wangsulan wonten ing Guru" },
        { q: "Tembung “musikalisasi” perlu aksara rekan apa kanggo nulis suku kata “mu”? Tulisen nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Tembung “klasifikasi” perlu aksara rekan apa untuk nulis suku kata “kla”? Tulisen nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen tembung “monitor” nganggo aksara Jawa lengkap karo aksara rekan!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen tembung “profil” nganggo aksara Jawa lan aksara rekan sing pas! Sabanjure, tulisen suku kata sing nganggo aksara rekan!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen tembung “organisasi” nganggo aksara Jawa lan aksara rekan sing trep!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen tembung “dokumen” nganggo aksara Jawa lan aksara rekan sing bener! Sebutna aksara rekan sing muncul ing tembung kuwi!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen tembung “motivasi” nganggo aksara Jawa lan aksara rekan sing pas! Jelaskna aksara rekan sing ana!", a: "Wangsulan wonten ing Guru" }
    ]},

    { id: 17, name: "BEBAS PARKIR", type: "special", image: "assets/petak/Bebas Parkir.png" },

    { id: 18, name: "TANTANGAN", type: "card", image: "assets/petak/Tantangan.png" },

    { id: 19, name: "Prambanan (Pa)", type: "property", frontImage: "assets/kartu/Prambanan.png", backImage: "assets/kartu/Prambanan (2).png", price: 600, rent: 300, timer: 130, sell: 575, questions: [
        { q: "Gambar: Wit gedhe godhonge ijo. Tulisen frasa deskriptif saka gambar!", a: "Wangsulan wonten ing Guru" },
        { q: "Gambar: Manuk mabur ing langit. Tulisen frasa deskriptif saka gambar iki!", a: "Wangsulan wonten ing Guru" },
        { q: "Gambar: Manuk dara mabur loro-loro. Tulisen farasa deskriptif saka gambar ing ngarep!", a: "Wangsulan wonten ing Guru" },
        { q: "Gambar: Bendera abang putih ngibar. Tulisen frasa deskriptif saka gambar iki!", a: "Wangsulan wonten ing Guru" },
        { q: "Gambar: Anak wadon nganggo rok biru. Tulisen frasa deskriptif saka gambar!", a: "Wangsulan wonten ing Guru" },
        { q: "Gambar: Anak sekolah nganggo seragam putih. Tulisen frasa deskriptif saka gambar iki!", a: "Wangsulan wonten ing Guru" },
        { q: "Gambar: Manuk dara mabur loro-loro. Tulisen frasa deskriptif saka gambar iki!", a: "Wangsulan wonten ing Guru" },
        { q: "Gambar: Lintang padhang ing langit. Tulisen frasa deskriptif saka gambar!", a: "Wangsulan wonten ing Guru" },
        { q: "Gambar: Kembang abang kuncup. Tulisen frasa deskriptif saka gambar!", a: "Wangsulan wonten ing Guru" },
        { q: "Gambar: Bocah maca buku ing meja. Tulisen frasa deskriptif saka gambar!", a: "Wangsulan wonten ing Guru" },
        { q: "Gambar: Jaran putih mlaku ing padang rumput. Tulisen frasa deskriptif saka gambar iki nganggo aksara Jawa! Terangna sandhangan wyanjana sing ana ing tembung “putih”!", a: "Wangsulan wonten ing Guru" },
        { q: "Gambar: Kali jernih mili ing alas. Tulisen frasa deskriptif saka gambar iki nganggo aksara Jawa! Sebutna sandhangan wyanjana sing ana ing tembung “jernih”!", a: "Wangsulan wonten ing Guru" },
        { q: "Gambar: Manuk pipit cilik mabur ing awan. Tulisen frasa deskriptif saka gambar iki nganggo aksara Jawa! Sebutna tembung sing nggunakake aksara rekan, yen ana!", a: "Wangsulan wonten ing Guru" },
        { q: "Gambar: Segara amba lan ombak gedhe. Tulisen frasa deskriptif saka gambar iki nganggo aksara Jawa! Sebutna tembung sing ngemot sandhangan wyanjana!", a: "Wangsulan wonten ing Guru" },
        { q: "Gambar: Kembang mawar abang mekar ing kebon. Tulisen frasa deskriptif saka gambar iki nganggo aksara Jawa! Sebutna sandhangan wyanjana sing digunakake ing tembung “mekar”!", a: "Wangsulan wonten ing Guru" }
    ]},

    { id: 20, name: "Hawu (Ha)", type: "property", frontImage: "assets/kartu/Hawu.png", backImage: "assets/kartu/Hawu (2).png", price: 650, rent: 325, timer: 110, sell: 625, questions: [
        { q: "Tulisen kalimat aksara Jawa undangan kanggo kanca supaya teka ing acara ulang tahunmu dina Minggu esuk.", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen kalimat permintaan tulung marang kanca supaya mbantu ngresiki kelas nganggo aksara Jawa.", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen kalimat ucapan matur nuwun kanggo guru sing wis paring piwulang.", a: "Wangsulan wonten ing Guru" },
        { q: "Gawenen ukara undhangan kanggo ngajak kanca dolan menyang museum ing dina Rebo. Tulisen nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Gawenen ukara ucapan sugeng tanggap warsa kanggo kanca, banjur tulisen nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen nganggo aksara Jawa: Sugeng rawuh wonten ing griya!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen nganggo aksara Jawa: Mugi tansah pinaringan sehat!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen nganggo aksara Jawa: Tulung dipun aturi lungguh!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen nganggo aksara Jawa: Wilujeng tindak dhateng sekolah!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen nganggo aksara Jawa: Kula nyuwun rawuhe panjenengan!", a: "Wangsulan wonten ing Guru" },
        { q: "Gawenen kalimat ucapan matur nuwun marang wong tuwa sing wis nulungi, banjur tulisen nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Gawenen kalimat ucapan sugeng dalu kanggo kanca lan tulisen nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Sebutna aksara Jawa sing digunakake kanggo tembung “dalú”!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen kalimat “Mugi tansah pinaringan kabegjan!” nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen tembung alus utawa krama ing kalimat kasebut! Tulisen nganggo aksara Jawa.", a: "Wangsulan wonten ing Guru" },
        { q: "Gawenen kalimat ucapan matur nuwun kanggo guru sing wis maringi piwulang nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Sebutna aksara Jawa sing digunakake kanggo tembung “matur”!", a: "Wangsulan wonten ing Guru" },
        { q: "Tulisen kalimat “Kula nyuwun pangapunten dhumateng panjenengan!” nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Terangna kenapa kalimat iki nganggo basa krama ing konteks sopan santun!", a: "Wangsulan wonten ing Guru" },
        { q: "Gawenen kalimat undangan marang kanca supaya rawuh ing pesta perpisahan dina Jemuwah sore nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Sebutna sandhangan swara sing ana ing kalimatmu!", a: "Wangsulan wonten ing Guru" },
        { q: "Gawenen kalimat ucapan selamat ulang tahun kanggo adik nganggo aksara Jawa!", a: "Wangsulan wonten ing Guru" },
        { q: "Sebutna sandhangan wyanjana sing ana ing tembung “selamat”!", a: "Wangsulan wonten ing Guru" }
    ]},
    
    { id: 21, name: "PAJAK BACA", type: "pajak-baca", image: "assets/petak/Pajak Baca.png", timer: 120, questions: [
        { q: "ꦈꦁꦒꦃꦈꦁꦒꦸꦃꦆꦁꦱꦼꦏꦺꦴꦭꦃ꧈ꦆꦁꦱꦼꦏꦺꦴꦭꦃꦏꦶꦠꦏꦸꦢꦸꦚꦼꦠꦿꦥꦏꦺꦠꦠꦏꦿꦩꦱꦸꦥꦪꦏꦼꦫꦸꦏꦸꦤꦤ꧀ꦠꦼꦠꦼꦥ꧀ꦏꦲꦺꦱ꧀ꦠꦺꦴꦏꦏꦺ꧈ꦪꦼꦤ꧀ꦏꦼꦠꦼꦩꦸꦧꦥꦏ꧀ꦈꦠꦮꦆꦧꦸꦒꦸꦫꦸ꧈ꦏꦶꦠꦏꦸꦢꦸꦩꦼꦤꦼꦲꦶꦱꦭꦩ꧀ꦭꦤ꧀ꦚꦸꦁꦏꦼꦩꦶꦏꦤ꧀ꦛꦶꦱꦺꦴꦥꦤ꧀꧈ꦏꦶꦠꦈꦒꦏꦸꦢꦸꦔꦗꦼꦤꦶꦏꦚ꧀ꦕꦏꦚ꧀ꦕꦭꦤ꧀ꦎꦫꦎꦭꦺꦃꦔꦼꦕꦺꦈꦠꦮꦔꦶꦤ꧈ꦪꦼꦤ꧀ꦄꦤꦏꦚ꧀ꦕꦱꦶꦁꦧꦸꦠꦸꦃꦥꦶꦠꦸꦭꦸꦔꦤ꧀꧈ꦏꦶꦠꦏꦸꦢꦸꦒꦼꦭꦼꦩ꧀ꦤꦸꦭꦸꦔꦶꦏꦤ꧀ꦛꦶꦠꦸꦭꦸꦱ꧀꧈ꦩꦼꦤꦮꦏꦧꦺꦃꦮꦂꦒꦱꦼꦏꦺꦴꦭꦃꦤ꧀ꦢꦸꦮꦼꦤꦶꦈꦁꦒꦃꦈꦁꦒꦸꦃꦱꦶꦁꦧꦼꦕꦶꦏ꧀꧈ꦱ꧀ꦮꦱꦤꦱꦼꦏꦺꦴꦭꦃꦧꦏꦭ꧀ꦫꦸꦏꦸꦤ꧀꧈ꦠꦼꦤ꧀ꦠꦿꦼꦩ꧀꧈ꦚꦩꦤ꧀꧈ꦭꦤ꧀ꦚꦼꦤꦼꦁꦔꦏꦺ꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦫꦼꦱꦶꦏ꧀ꦫꦼꦱꦶꦏ꧀ꦏꦼꦭꦱ꧀꧈ꦱꦢꦸꦫꦸꦔꦺꦥꦼꦭꦗꦫꦤ꧀ꦢꦶꦮꦶꦮꦶꦠꦶ꧈ꦥꦫꦱꦶꦱ꧀ꦮꦥꦝꦫꦼꦱꦶꦏ꧀ꦫꦼꦱꦶꦏ꧀ꦏꦼꦭꦱ꧀꧈ꦄꦤꦱꦶꦁꦚꦥꦸꦭꦤ꧀ꦠꦻ꧈ꦔꦼꦭꦥ꧀ꦩꦼꦗ꧈ꦭꦤ꧀ꦩ꧀ꦧꦸꦮꦁꦱꦩ꧀ꦥꦃꦆꦁꦥꦁꦒꦺꦴꦤ꧀ꦤꦤꦺ꧈ꦏꦼꦭꦱ꧀ꦱꦶꦁꦫꦼꦱꦶꦏ꧀ꦤ꧀ꦢꦢꦺꦏꦏꦺꦱꦶꦤꦻꦴꦭꦸꦮꦶꦃꦚꦩꦤ꧀ꦭꦤ꧀ꦱꦼꦲꦠ꧀꧈ꦪꦼꦤ꧀ꦏꦼꦭꦱ꧀ꦫꦼꦱꦶꦏ꧀꧈ꦱꦶꦱ꧀ꦮꦢꦢꦶꦭꦸꦮꦶꦃꦱꦼꦩꦔꦠ꧀ꦄꦁꦒꦺꦴꦤꦺꦱꦶꦤꦻꦴ꧈ꦩꦸꦭ꧈ꦏꦶꦠꦏꦸꦢꦸꦠꦤ꧀ꦱꦃꦚ꧀ꦗꦒꦏꦧꦼꦂꦱꦶꦲꦤ꧀ꦏꦼꦭꦱ꧀ꦱꦧꦼꦤ꧀ꦢꦶꦤ꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦠꦼꦏꦸꦤ꧀ꦱꦶꦤꦻꦴ꧈ꦱꦶꦱ꧀ꦮꦏꦸꦢꦸꦱꦶꦤꦻꦴꦏꦤ꧀ꦛꦶꦱꦿꦼꦒꦼꦥ꧀ꦭꦤ꧀ꦠꦼꦩꦼꦤ꧀꧈ꦤꦭꦶꦏꦒꦸꦫꦸꦤꦼꦫꦁꦏꦏꦺꦥꦼꦭꦗꦫꦤ꧀꧈ꦱꦶꦱ꧀ꦮꦎꦫꦏꦼꦤꦫꦩꦺꦝꦺꦮꦺꦈꦠꦮꦔꦺꦴꦧꦿꦺꦴꦭ꧀ꦏꦫꦺꦴꦏꦚ꧀ꕕ꧈ꦪꦼꦤ꧀ꦄꦤꦩꦠꦼꦫꦶꦱꦶꦁꦢꦸꦫꦸꦁꦢꦶꦩꦁꦔꦼꦂꦠꦼꦤꦶ꧈ꦱꦶꦱ꧀ꦮꦏꦸꦢꦸꦮꦤꦶꦠꦏꦺꦴꦤ꧀ꦩꦫꦁꦒꦸꦫꦸ꧈ꦱꦶꦤꦻꦴꦏꦤ꧀ꦛꦶꦠꦼꦏꦸꦤ꧀ꦧꦏꦭ꧀ꦤꦩ꧀ꦧꦃꦏꦮꦿꦸꦃꦭꦤ꧀ꦤ꧀ꦒꦮꦺꦏꦶꦠꦭꦸꦮꦶꦃꦥꦶꦤ꧀ꦠꦼꦂ꧈ꦏꦤ꧀ꦛꦶꦩꦁꦏꦺꦴꦤꦺꦴ꧈ꦏꦶꦠꦧꦶꦱꦤ꧀ꦒꦪꦸꦃꦥꦿꦼꦱ꧀ꦠꦱꦶꦱꦶꦁꦄꦥꦶꦏ꧀꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦱꦺꦴꦥꦤ꧀ꦱꦤ꧀ꦠꦸꦤ꧀ꦆꦁꦱꦼꦏꦺꦴꦭꦃ꧈ꦱꦺꦴꦥꦤ꧀ꦱꦤ꧀ꦠꦸꦤ꧀ꦆꦁꦱꦼꦏꦺꦴꦭꦃꦆꦏꦸꦥꦼꦤ꧀ꦠꦶꦁꦧꦔꦼꦠ꧀꧈ꦪꦼꦤ꧀ꦏꦼꦠꦼꦩꦸꦧꦥꦏ꧀ꦈꦠꦮꦆꦧꦸꦒꦸꦫꦸ꧈ꦏꦶꦠꦏꦸꦢꦸꦩꦼꦤꦼꦲꦶꦱꦭꦩ꧀ꦏꦤ꧀ꦛꦶꦫꦩꦃ꧈ꦏꦶꦠꦏꦸꦢꦸꦩꦶꦒꦸꦤꦏꦏꦺꦧꦱꦗꦮꦏꦿꦩꦤꦭꦶꦏꦩꦠꦸꦂꦩꦫꦁꦒꦸꦫꦸ꧈ꦏꦶꦠꦈꦒꦏꦸꦢꦸꦔꦗꦼꦤꦶꦭꦤ꧀ꦔꦸꦂꦩꦠꦶꦏꦚ꧀ꦕꦏꦚ꧀ꦕ꧈ꦄꦗꦔꦤ꧀ꦠꦶꦔꦼꦕꦺ꧈ꦔꦶꦤ꧈ꦈꦠꦮꦒꦮꦺꦭꦫꦄꦠꦶꦤꦺꦏꦚ꧀ꦕ꧈ꦪꦼꦤ꧀ꦏꦧꦺꦃꦱꦶꦱ꧀ꦮꦤ꧀ꦢꦸꦮꦼꦤꦶꦱꦺꦴꦥꦤ꧀ꦱꦤ꧀ꦠꦸꦤ꧀ꦱꦶꦁꦧꦼꦕꦶꦏ꧀꧈ꦱꦼꦏꦺꦴꦭꦃꦧꦏꦭ꧀ꦢꦢꦶꦥꦁꦒꦺꦴꦤ꧀ꦤꦤ꧀ꦱꦶꦁꦫꦸꦏꦸꦤ꧀ꦭꦤ꧀ꦚꦼꦤꦼꦁꦔꦏꦺ꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦢꦶꦱꦶꦥ꧀ꦭꦶꦤ꧀ꦆꦁꦱꦼꦏꦺꦴꦭꦃ꧈ꦱꦧꦼꦤ꧀ꦱꦶꦱ꧀ꦮꦏꦸꦢꦸꦢꦶꦱꦶꦥ꧀ꦭꦶꦤ꧀ꦤꦭꦶꦏꦄꦤꦆꦁꦱꦼꦏꦺꦴꦭꦃ꧈ꦏꦶꦠꦏꦸꦢꦸꦠꦼꦏꦠꦼꦥꦠ꧀ꦮꦼꦏ꧀ꦠꦸꦭꦤ꧀ꦩꦼꦭꦸꦥꦼꦭꦗꦫꦤ꧀ꦏꦤ꧀ꦛꦶꦠꦼꦂꦠꦶꦧ꧀꧈ꦠꦸꦒꦱ꧀ꦱꦏꦒꦸꦫꦸꦏꦸꦢꦸꦢꦶꦏꦼꦂꦗꦏꦏꦺꦏꦤ꧀ꦛꦶꦠꦁꦒꦸꦁꦗꦮꦧ꧀꧈ꦥꦼꦫꦠꦸꦫꦤ꧀ꦱꦼꦏꦺꦴꦭꦃꦈꦒꦏꦸꦢꦸꦢꦶꦠꦸꦫꦸꦠꦶꦱꦸꦥꦪꦎꦫꦏꦼꦤꦥꦻꦴꦏꦸꦩꦤ꧀꧈ꦪꦼꦤ꧀ꦱꦶꦱ꧀ꦮꦢꦶꦱꦶꦥ꧀ꦭꦶꦤ꧀꧈ꦱꦶꦤꦻꦴꦧꦏꦭ꧀ꦭꦸꦮꦶꦃꦭꦚ꧀ꦕꦂꦭꦤ꧀ꦄꦱꦶꦭꦺꦭꦸꦮꦶꦃꦄꦥꦶꦏ꧀꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦠꦁꦒꦸꦁꦗꦮꦧ꧀ꦩꦶꦤꦁꦏꦱꦶꦱ꧀ꦮ꧈ꦱꦧꦼꦤ꧀ꦱꦶꦱ꧀ꦮꦤ꧀ꦢꦸꦮꦼꦤꦶꦠꦁꦒꦸꦁꦗꦮꦧ꧀ꦆꦁꦱꦼꦏꦺꦴꦭꦃ꧈ꦠꦸꦒꦱ꧀ꦱꦏꦒꦸꦫꦸꦏꦸꦢꦸꦢꦶꦏꦼꦂꦗꦏꦏꦺꦏꦤ꧀ꦛꦶꦠꦼꦩꦼꦤ꧀ꦭꦤ꧀ꦠꦼꦥꦠ꧀ꦮꦼꦏ꧀ꦠꦸ꧈ꦧꦸꦏꦸꦭꦤ꧀ꦥꦶꦫꦤ꧀ꦠꦶꦱꦶꦤꦻꦴꦏꦸꦢꦸꦢꦶꦒꦮꦱꦧꦼꦤ꧀ꦢꦶꦤ꧈ꦪꦼꦤ꧀ꦚꦶꦭꦶꦃꦧꦫꦁꦱꦏꦏꦚ꧀ꦕ꧈ꦏꦸꦢꦸꦢꦶꦗꦒꦭꦤ꧀ꦢꦶꦧꦭꦼꦏꦏꦺ꧈ꦱꦶꦱ꧀ꦮꦱꦶꦁꦠꦁꦒꦸꦁꦗꦮꦧ꧀ꦧꦏꦭ꧀ꦢꦶꦥꦼꦂꦕꦪꦢꦺꦤꦶꦁꦒꦸꦫꦸꦭꦤ꧀ꦏꦚ꧀ꦕꦏꦚ꧀ꦕꦤꦺ꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦒꦸꦪꦸꦧ꧀ꦫꦸꦏꦸꦤ꧀ꦏꦫꦺꦴꦏꦚ꧀ꦕ꧈ꦆꦁꦱꦼꦏꦺꦴꦭꦃ꧈ꦏꦶꦠꦏꦸꦢꦸꦈꦫꦶꦥ꧀ꦫꦸꦏꦸꦤ꧀ꦏꦫꦺꦴꦏꦚ꧀ꦕꦏꦚ꧀ꦕ꧈ꦪꦼꦤ꧀ꦄꦤꦏꦚ꧀ꦕꦱꦶꦁꦤꦤ꧀ꦢꦁꦏꦼꦱꦸꦱꦲꦤ꧀꧈ꦏꦶꦠꦏꦸꦢꦸꦒꦼꦭꦼꦩ꧀ꦤꦸꦭꦸꦔꦶ꧈ꦤꦭꦶꦏꦏꦼꦂꦗꦏꦼꦭꦺꦴꦩ꧀ꦥꦺꦴꦏ꧀꧈ꦱꦧꦼꦤ꧀ꦱꦶꦱ꧀ꦮꦏꦸꦢꦸꦒꦼꦭꦼꦩ꧀ꦏꦼꦂꦗꦧꦫꦼꦁ꧈ꦎꦫꦏꦼꦤꦥꦢꦸꦢꦺꦴꦤ꧀ꦈꦠꦮꦫꦼꦧꦸꦠꦤ꧀꧈ꦪꦼꦤ꧀ꦄꦤꦧꦼꦢꦥꦤꦼꦩꦸ꧈ꦏꦸꦢꦸꦢꦶꦫꦼꦩ꧀ꦧꦸꦒ꧀ꦏꦤ꧀ꦛꦶꦧꦼꦕꦶꦏ꧀꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦠꦼꦂꦠꦶꦧ꧀ꦤꦭꦶꦏꦈꦥꦕꦫ꧈ꦤꦭꦶꦏꦈꦥꦕꦫꦧꦼꦤ꧀ꦢꦺꦫ꧈ꦱꦶꦱ꧀ꦮꦏꦸꦢꦸꦠꦼꦂꦠꦶꦧ꧀ꦭꦤ꧀ꦢꦶꦱꦶꦥ꧀ꦭꦶꦤ꧀꧈ꦏꦧꦺꦃꦥꦼꦱꦼꦂꦠꦏꦸꦢꦸꦔꦢꦼꦒ꧀ꦏꦤ꧀ꦛꦶꦱꦶꦏꦥ꧀ꦱꦼꦩ꧀ꦥꦸꦂꦤ꧈ꦎꦫꦏꦼꦤꦔꦺꦴꦧꦿꦺꦴꦭ꧀ꦈꦠꦮꦒꦸꦪꦺꦴꦤ꧀ꦝꦺꦮꦺ꧈ꦭꦒꦸꦆꦤ꧀ꦢꦺꦴꦤꦼꦱꦶꦪꦫꦪꦏꦸꦢꦸꦢꦶꦚꦚꦼꦏꦏꦺꦏꦤ꧀ꦛꦶꦑꦶꦢ꧀ꦩꦠ꧀꧈ꦈꦥꦕꦫꦩꦸꦭꦁꦏꦶꦠꦱꦸꦥꦪꦠꦿꦼꦱ꧀ꦤꦩꦫꦁꦠꦤꦃꦄꦮꦶꦂ꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦠꦠꦏꦿꦩꦆꦁꦥꦼꦂꦥꦸꦱ꧀ꦠꦏꦄꦤ꧀꧈ꦤꦭꦶꦏꦄꦤꦆꦁꦥꦼꦂꦥꦸꦱ꧀ꦠꦏꦄꦤ꧀꧈ꦱꦶꦱ꧀ꦮꦏꦸꦢꦸꦚ꧀ꦗꦒꦏꦠꦼꦤ꧀ꦠꦿꦼꦩꦤ꧀꧈ꦎꦫꦏꦼꦤꦫꦩꦺꦈꦠꦮꦩ꧀ꦭꦪꦸꦩ꧀ꦭꦪꦸ꧈ꦧꦸꦏꦸꦱꦶꦁꦢꦶꦗꦸꦥꦸꦏ꧀ꦏꦸꦢꦸꦢꦶꦧꦭꦼꦏꦏꦺꦆꦁꦥꦁꦒꦺꦴꦤ꧀ꦤꦤꦺ꧈ꦪꦼꦤ꧀ꦚꦶꦭꦶꦃꦧꦸꦏꦸ꧈ꦏꦸꦢꦸꦢꦶꦗꦒꦱꦸꦥꦪꦎꦫꦫꦸꦱꦏ꧀꧈ꦥꦼꦂꦥꦸꦱ꧀ꦠꦏꦄꦤ꧀ꦩꦶꦤꦁꦏꦥꦁꦒꦺꦴꦤ꧀ꦤꦤ꧀ꦏꦁꦒꦺꦴꦤꦩ꧀ꦧꦃꦏꦮꦿꦸꦃ꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦚ꧀ꦗꦒꦥ꦳ꦱꦶꦭꦶꦠꦱ꧀ꦱꦼꦏꦺꦴꦭꦃ꧈ꦱꦼꦏꦺꦴꦭꦃꦤ꧀ꦢꦸꦮꦼꦤꦶꦄꦏꦺꦃꦥ꦳ꦱꦶꦭꦶꦠꦱ꧀ꦱꦶꦁꦩꦶꦒꦸꦤꦶꦏꦁꦒꦺꦴꦱꦶꦤꦻꦴ꧈ꦩꦼꦗ꧈ꦏꦸꦂꦱꦶ꧈ꦥꦥꦤ꧀ꦠꦸꦭꦶꦱ꧀꧈ꦭꦤ꧀ꦧꦸꦏꦸꦏꦸꦢꦸꦢꦶꦗꦒꦏꦤ꧀ꦛꦶꦧꦼꦕꦶꦏ꧀꧈ꦎꦫꦏꦼꦤꦚꦺꦴꦫꦺꦠ꧀ꦚꦺꦴꦫꦺꦠ꧀ꦠꦼꦩ꧀ꦧꦺꦴꦏ꧀ꦈꦠꦮꦔ꧀ꦫꦸꦱꦏ꧀ꦧꦫꦁ꧈ꦪꦼꦤ꧀ꦥ꦳ꦱꦶꦭꦶꦠꦱ꧀ꦢꦶꦗꦒ꧈ꦏꦧꦺꦃꦱꦶꦱ꧀ꦮꦧꦶꦱꦔ꧀ꦒꦸꦤꦏꦏꦺꦏꦤ꧀ꦛꦶꦚꦩꦤ꧀꧈ꦚ꧀ꦗꦒꦥ꦳ꦱꦶꦭꦶꦠꦱ꧀ꦱꦼꦏꦺꦴꦭꦃꦩꦶꦤꦁꦏꦮꦸꦗꦸꦢ꧀ꦠꦁꦒꦸꦁꦗꦮꦧ꧀ꦏꦶꦠ꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦠꦼꦥꦱ꧀ꦭꦶꦫꦩꦫꦁꦏꦚ꧀ꦕ꧈ꦱꦧꦼꦤ꧀ꦱꦶꦱ꧀ꦮꦏꦸꦢꦸꦤ꧀ꦢꦸꦮꦼꦤꦶꦫꦱꦠꦼꦥꦱ꧀ꦭꦶꦫꦩꦫꦁꦏꦚ꧀ꦕꦏꦚ꧀ꦕꦤꦺ꧈ꦪꦼꦤ꧀ꦄꦤꦏꦚ꧀ꦕꦱꦶꦁꦭꦒꦶꦱꦸꦱꦃ꧈ꦏꦶꦠꦏꦸꦢꦸꦒꦼꦭꦼꦩ꧀ꦩꦼꦤꦼꦲꦶꦥꦔ꧀ꦭꦶꦥꦸꦂꦭꦤ꧀ꦥꦶꦠꦸꦭꦸꦔꦤ꧀꧈ꦎꦫꦩꦸꦁꦩꦶꦏꦶꦂꦏꦼꦥꦼꦤ꧀ꦠꦶꦔꦤ꧀ꦝꦺꦮꦺ꧈ꦤꦔꦶꦁꦈꦒꦏꦸꦢꦸꦔ꧀ꦒꦠꦼꦏꦏꦺꦮꦺꦴꦁꦭꦶꦪ꧈ꦏꦤ꧀ꦛꦶꦠꦼꦥꦱ꧀ꦭꦶꦫ꧈ꦥꦱꦼꦢꦸꦭꦸꦫꦤ꧀ꦄꦤ꧀ꦠꦫꦤꦺꦏꦚ꧀ꦕꦧꦏꦭ꧀ꦱꦪꦫꦏꦼꦠ꧀ꦭꦤ꧀ꦲꦂꦩꦺꦴꦤꦶꦱ꧀꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦠꦼꦂꦠꦶꦧ꧀ꦤꦭꦶꦏꦱꦶꦤꦻꦴ꧈ꦤꦭꦶꦏꦥꦼꦭꦗꦫꦤ꧀ꦭꦸꦩꦏꦸ꧈ꦱꦶꦱ꧀ꦮꦏꦸꦢꦸꦭꦸꦁꦒꦸꦃꦏꦤ꧀ꦛꦶꦠꦼꦂꦠꦶꦧ꧀꧈ꦎꦫꦏꦼꦤꦫꦩꦺꦝꦺꦮꦺꦈꦠꦮꦔ꧀ꦒꦁꦒꦸꦏꦚ꧀ꦕꦭꦶꦪꦤꦺ꧈ꦩꦼꦤꦮꦒꦸꦫꦸꦭꦒꦶꦤꦼꦫꦁꦏꦏꦺ꧈ꦱꦶꦱ꧀ꦮꦏꦸꦢꦸꦔ꧀ꦫꦸꦔꦺꦴꦏꦏꦺꦏꦤ꧀ꦛꦶꦠꦼꦤꦤꦤ꧀꧈ꦱꦶꦏꦥ꧀ꦠꦼꦂꦠꦶꦧ꧀ꦧꦏꦭ꧀ꦤ꧀ꦢꦢꦺꦏꦏꦺꦥꦼꦭꦗꦫꦤ꧀ꦭꦸꦮꦶꃧꦒꦩ꧀ꦥꦁꦢꦶꦩꦁꦔꦼꦂꦠꦼꦤꦶ꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦫꦗꦶꦤ꧀ꦩꦕꦧꦸꦏꦸ꧈ꦩꦕꦧꦸꦏꦸꦆꦏꦸꦏꦒꦶꦪꦠꦤ꧀ꦱꦶꦁꦩꦶꦒꦸꦤꦶ꧈ꦏꦤ꧀ꦛꦶꦩꦕꦧꦸꦏꦸ꧈ꦏꦮꦿꦸꦃꦏꦶꦠꦧꦏꦭ꧀ꦱꦪꦄꦏꦺꦃ꧈ꦱꦶꦱ꧀ꦮꦏꦸꦢꦸꦩ꧀ꦧꦸꦢꦶꦢꦪꦱꦼꦤꦼꦁꦩꦕꦱꦸꦥꦪꦢꦢꦶꦮꦺꦴꦁꦱꦶꦁꦥꦶꦤ꧀ꦠꦼꦂꦭꦤ꧀ꦮꦶꦕꦏ꧀ꦱꦤ꧈ꦧꦸꦏꦸꦧꦶꦱꦢꦢꦶꦗꦼꦤ꧀ꦝꦺꦭꦏꦁꦒꦺꦴꦩꦁꦔꦼꦂꦠꦼꦤꦶꦢꦺꦴꦚ꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦲꦼꦩꦠ꧀ꦥꦁꦒꦸꦤꦄꦤ꧀ꦧꦚꦸ꧈ꦧꦚꦸꦩꦶꦤꦁꦏꦏꦧꦸꦠꦸꦃꦲꦤ꧀ꦱꦶꦁꦥꦼꦤ꧀ꦠꦶꦁꦠꦸꦩꦿꦥ꧀ꦈꦫꦶꦥ꧀꧈ꦩꦸꦭ꧈ꦏꦶꦠꦏꦸꦢꦸꦔ꧀ꦒꦸꦤꦏꦏꦺꦧꦚꦸꦏꦤ꧀ꦛꦶꦆꦫꦶꦠ꧀ꦭꦤ꧀ꦎꦫꦧꦺꦴꦫꦺꦴꦱ꧀꧈ꦱꦮꦶꦱꦺꦔ꧀ꦒꦸꦤꦏꦏꦺꦏꦿꦤ꧀ꦧꦚꦸ꧈ꦏꦸꦢꦸꦢꦶꦠꦸꦠꦸꦥ꧀ꦏꦤ꧀ꦛꦶꦫꦥꦼꦠ꧀꧈ꦪꦼꦤ꧀ꦏꦧꦺꦃꦮꦺꦴꦁꦒꦼꦭꦼꦩ꧀ꦔꦶꦫꦶꦠ꧀ꦧꦚꦸ꧈ꦱꦸꦩ꧀ꦧꦼꦂꦧꦚꦸꦧꦏꦭ꧀ꦠꦼꦠꦼꦥ꧀ꦭꦼꦱ꧀ꦠꦫꦶ꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦚ꧀ꦗꦒꦏꦄꦺꦤ꧀ꦢꦲꦤ꧀ꦱꦼꦏꦺꦴꦭꦃ꧈ꦱꦼꦏꦺꦴꦭꦃꦱꦶꦁꦫꦼꦱꦶꦏ꧀ꦭꦤ꧀ꦄꦺꦤ꧀ꦢꦃꦤ꧀ꦢꦢꦺꦏꦏꦺꦥꦫꦱꦶꦱ꧀ꦮꦭꦸꦮꦶꦃꦱꦼꦤꦼꦁꦱꦶꦤꦻꦴ꧈ꦏꦼꦩ꧀ꦧꦁꦭꦤ꧀ꦮꦶꦠ꧀ꦮꦶꦠ꧀ꦠꦤ꧀ꦆꦁꦭꦶꦁꦏꦸꦁꦔꦤ꧀ꦱꦼꦏꦺꦴꦭꦃꦏꦸꦢꦸꦢꦶꦫꦸꦩꦠ꧀ꦏꦤ꧀ꦛꦶꦧꦼꦕꦶꦏ꧀꧈ꦱꦩ꧀ꦥꦃꦏꦸꦢꦸꦢꦶꦧꦸꦮꦁꦆꦁꦥꦁꦒꦺꦴꦤ꧀ꦤꦤꦺ꧈ꦏꦤ꧀ꦛꦶꦩꦁꦏꦺꦴꦤꦺꦴ꧈ꦱꦼꦏꦺꦴꦭꦃꦧꦏꦭ꧀ꦏꦠꦺꦴꦤ꧀ꦄꦱ꧀ꦫꦶꦭꦤ꧀ꦚꦩꦤ꧀꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦱꦼꦤꦼꦁꦒꦺꦴꦠꦺꦴꦁꦫꦺꦴꦪꦺꦴꦁ꧈ꦒꦺꦴꦠꦺꦴꦁꦫꦺꦴꦪꦺꦴꦁꦩꦶꦤꦁꦏꦥꦏꦸꦭꦶꦤꦤ꧀ꦱꦶꦁꦧꦼꦕꦶꦏ꧀꧈ꦤꦭꦶꦏꦄꦤꦏꦼꦂꦗꦧꦏ꧀ꦠꦶ꧈ꦏꦧꦺꦃꦱꦶꦱ꧀ꦮꦏꦸꦢꦸꦒꦼꦭꦼꦩ꧀ꦩꦼꦭꦸ꧈ꦏꦤ꧀ꦛꦶꦒꦺꦴꦠꦺꦴꦁꦫꦺꦴꦪꦺꦴꦁ꧈ꦥꦏꦂꦪꦤ꧀ꦱꦶꦁꦄꦧꦺꦴꦠ꧀ꦧꦏꦭ꧀ꦢꦢꦶꦭꦸꦮꦶꦃꦄꦼꦤ꧀ꦛꦼꦁ꧈ꦱꦶꦏꦥ꧀ꦆꦏꦸꦈꦒꦧꦶꦱꦤꦸꦮꦸꦲꦏꦺꦫꦱꦥꦱꦼꦢꦸꦭꦸꦫꦤ꧀꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦠꦄꦠ꧀ꦩꦫꦁꦒꦸꦫꦸ꧈ꦒꦸꦫꦸꦆꦏꦸꦮꦺꦴꦁꦱꦶꦁꦩꦼꦤꦼꦲꦶꦏꦮꦿꦸꦃꦩꦫꦁꦥꦫꦱꦶꦱ꧀ꦮ꧈ꦩꦸꦭ꧈ꦱꦶꦱ꧀ꦮꦏꦸꦢꦸꦔꦗꦼꦤꦶꦭꦤ꧀ꦩꦤꦸꦠ꧀ꦩꦫꦁꦥꦶꦠꦸꦠꦸꦂꦫꦺꦒꦸꦫꦸ꧈ꦪꦼꦤ꧀ꦒꦸꦫꦸꦩꦼꦤꦼꦲꦶꦠꦸꦒꦱ꧀꧈ꦏꦸꦢꦸꦢꦶꦏꦼꦂꦗꦏꦏꦺꦏꦤ꧀ꦛꦶꦠꦁꦒꦸꦁꦗꦮꦧ꧀꧈ꦱꦶꦱ꧀ꦮꦱꦶꦁꦠꦄꦠ꧀ꦩꦫꦁꦒꦸꦫꦸꦧꦏꦭ꧀ꦭꦸꦮꦶꦃꦒꦩ꧀ꦥꦁꦤ꧀ꦒꦪꦸꦃꦏꦱꦶꦭ꧀꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦠꦁꦒꦸꦁꦗꦮꦧ꧀ꦤꦭꦶꦏꦥꦶꦏꦼꦠ꧀꧈ꦱꦶꦱ꧀ꦮꦱꦶꦁꦎꦭꦺꦃꦠꦸꦒꦱ꧀ꦥꦶꦏꦼꦠ꧀ꦏꦸꦢꦸꦤꦶꦤ꧀ꦢꦏꦏꦺꦏꦼꦮꦗꦶꦧꦤꦺꦏꦤ꧀ꦛꦶꦧꦼꦕꦶꦏ꧀꧈ꦏꦼꦭꦱ꧀ꦏꦸꦢꦸꦢꦶꦱꦥꦸꦭꦤ꧀ꦢꦶꦫꦼꦱꦶꦏꦶꦱꦢꦸꦫꦸꦔꦺꦥꦼꦭꦗꦫꦤ꧀ꦢꦶꦮꦶꦮꦶꦠꦶ꧈ꦱꦩ꧀ꦥꦃꦱꦶꦁꦄꦤꦆꦁꦏꦼꦭꦱ꧀ꦏꦸꦢꦸꦢꦶꦧꦸꦮꦁꦆꦁꦥꦥꦤ꧀ꦱꦩ꧀ꦥꦃ꧈ꦏꦤ꧀ꦛꦶꦠꦁꦒꦸꦁꦗꦮꦧ꧀꧈ꦭꦶꦁꦏꦸꦁꦔꦤ꧀ꦏꦼꦭꦱ꧀ꦧꦏꦭ꧀ꦠꦼꦠꦼꦥ꧀ꦫꦼꦱꦶꦏ꧀꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦩꦶꦒꦸꦤꦏꦏꦺꦧꦱꦱꦶꦁꦄꦥꦶꦏ꧀꧈ꦤꦭꦶꦏꦒꦸꦤꦼꦩꦤ꧀ꦏꦫꦺꦴꦮꦺꦴꦁꦭꦶꦪ꧈ꦏꦶꦠꦏꦸꦢꦸꦩꦶꦒꦸꦤꦏꦏꦺꦠꦼꦩ꧀ꦧꦸꦁꦱꦶꦁꦱꦺꦴꦥꦤ꧀꧈ꦄꦗꦔꦸꦕꦥ꧀ꦠꦼꦩ꧀ꦧꦸꦁꦏꦱꦂꦈꦠꦮꦚꦶꦁꦒꦸꦁꦄꦠꦶꦤꦺꦮꦺꦴꦁꦭꦶꦪ꧈ꦠꦼꦩ꧀ꦧꦸꦁꦱꦶꦁꦧꦼꦕꦶꦏ꧀ꦧꦏꦭ꧀ꦤ꧀ꦢꦢꦺꦏꦏꦺꦥꦱꦼꦢꦸꦭꦸꦫꦤ꧀ꦭꦸꦮꦶꦃꦫꦸꦏꦸꦤ꧀꧈ꦩꦸꦭ꧈ꦏꦶꦠꦏꦸꦢꦸꦠꦤ꧀ꦱꦃꦚ꧀ꦗꦒꦭꦛꦶ꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦮꦤꦶꦠꦏꦺꦴꦤ꧀ꦤꦭꦶꦏꦎꦫꦔꦼꦂꦠꦶ꧈ꦤꦭꦶꦏꦄꦤꦥꦼꦭꦗꦫꦤ꧀ꦱꦶꦁꦢꦸꦫꦸꦁꦢꦶꦩꦁꦔꦼꦂꦠꦼꦤꦶ꧈ꦱꦶꦱ꧀ꦮꦏꦸꦢꦸꦮꦤꦶꦠꦏꦺꦴꦤ꧀ꦩꦫꦁꦒꦸꦫꦸ꧈ꦠꦏꦺꦴꦤ꧀ꦢꦸꦢꦸꦠꦤ꧀ꦝꦪꦼꦤ꧀ꦮꦺꦴꦁꦆꦏꦸꦧꦺꦴꦝꦺꦴ꧈ꦤꦔꦶꦁꦠꦤ꧀ꦝꦏꦼꦥꦼꦔꦶꦤ꧀ꦔꦼꦂꦠꦶ꧈ꦒꦸꦫꦸꦩꦼꦱ꧀ꦛꦶꦒꦼꦭꦼꦩ꧀ꦩꦼꦤꦼꦲꦶꦥꦤ꧀ꦗꦼꦭꦱꦤ꧀꧈ꦏꦤ꧀ꦛꦶꦠꦏꦺꦴꦤ꧀꧈ꦏꦮꦿꦸꦃꦏꦶꦠꦧꦏꦭ꧀ꦱꦪꦠꦩ꧀ꦧꦃ꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦔꦺꦴꦂꦩꦠꦶꦥꦼꦤ꧀ꦢꦥꦠ꧀ꦏꦚ꧀ꦕ꧈ꦤꦭꦶꦏꦫꦼꦩ꧀ꦧꦸꦒꦤ꧀ꦏꦼꦭꦺꦴꦩ꧀ꦥꦺꦴꦏ꧀꧈ꦱꦧꦼꦤ꧀ꦱꦶꦱ꧀ꦮꦤ꧀ꦢꦸꦮꦼꦤꦶꦲꦏ꧀ꦏꦁꦒꦺꦴꦔꦤ꧀ꦝꦂꦏꦏꦺꦥꦤꦼꦩꦸꦤꦺ꧈ꦏꦶꦠꦏꦸꦢꦸꦒꦼꦭꦼꦩ꧀ꦔ꧀ꦫꦸꦔꦺꦴꦏꦏꦺꦭꦤ꧀ꦔꦗꦼꦤꦶꦥꦤꦼꦩꦸꦱꦏꦏꦚ꧀ꦕꦭꦶꦪꦤꦺ꧈ꦱꦤꦗꦤ꧀ꦧꦼꦢꦥꦤꦼꦩꦸ꧈ꦎꦫꦏꦼꦤꦥꦢꦸꦢꦺꦴꦤ꧀꧈ꦩꦸꦱ꧀ꦪꦮꦫꦃꦏꦸꦢꦸꦢꦶꦭꦏꦺꦴꦤꦶꦏꦤ꧀ꦛꦶꦠꦼꦤ꧀ꦠꦿꦼꦩ꧀꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦫꦗꦶꦤ꧀ꦤ꧀ꦭꦏꦺꦴꦤꦶꦆꦧꦢꦃ꧈ꦱꦭꦶꦪꦤꦺꦱꦶꦤꦻꦴ꧈ꦱꦶꦱ꧀ꦮꦈꦒꦏꦸꦢꦸꦫꦗꦶꦤ꧀ꦤꦶꦤ꧀ꦢꦏꦏꦺꦆꦧꦢꦃꦩꦶꦠꦸꦫꦸꦠ꧀ꦄꦒꦩꦭꦤ꧀ꦏꦥꦼꦂꦕꦪꦄꦤꦺꦝꦺꦮꦺꦝꦺꦮꦺ꧈ꦏꦤ꧀ꦛꦶꦆꦧꦢꦃ꧈ꦄꦠꦶꦧꦏꦭ꧀ꦭꦸꦮꦶꦃꦠꦼꦤ꧀ꦠꦿꦼꦩ꧀ꦭꦤ꧀ꦈꦫꦶꦥ꧀ꦢꦢꦶꦭꦸꦮꦶꦃꦧꦼꦕꦶꦏ꧀꧈ꦆꦧꦢꦃꦈꦒꦩꦸꦭꦁꦏꦶꦠꦱꦸꦥꦪꦠꦤ꧀ꦱꦃꦠꦸꦩꦶꦤ꧀ꦢꦏ꧀ꦧꦼꦕꦶꦏ꧀ꦩꦫꦁꦱꦥꦝꦥꦝ꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦚ꧀ꦗꦒꦏꦼꦱꦼꦲꦠꦤ꧀ꦄꦮꦏ꧀꧈ꦄꦮꦏ꧀ꦱꦶꦁꦱꦼꦲꦠ꧀ꦥꦼꦤ꧀ꦠꦶꦁꦏꦁꦒꦺꦴꦱꦶꦤꦻꦴ꧈ꦱꦶꦱ꧀ꦮꦏꦸꦢꦸꦩꦔꦤ꧀ꦥꦔꦤꦤ꧀ꦱꦶꦁꦱꦼꦲꦠ꧀ꦭꦤ꧀ꦎꦭꦃꦫꦒꦏꦤ꧀ꦛꦶꦠꦼꦫꦠꦸꦂ꧈ꦈꦒꦏꦸꦢꦸꦕꦸꦏꦸꦥ꧀ꦔꦱꦺꦴꦱꦸꦥꦪꦄꦮꦏ꧀ꦠꦼꦠꦼꦥ꧀ꦱꦼꦒꦼꦂ꧈ꦪꦼꦤ꧀ꦱꦼꦲꦠ꧀꧈ꦱꦶꦤꦻꦴꦧꦏꦭ꧀ꦭꦸꦮꦶꦃꦱꦼꦩꦔꦠ꧀꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦎꦫꦩ꧀ꦧꦸꦮꦁꦱꦩ꧀ꦥꦃꦱꦼꦩ꧀ꦧꦫꦁꦔꦤ꧀꧈ꦩ꧀ꦧꦸꦮꦁꦱꦩ꧀ꦥꦃꦱꦼꦩ꧀ꦧꦫꦁꦔꦤ꧀ꦧꦶꦱꦚꦭꦫꦶꦭꦶꦁꦏꦸꦁꦔꦤ꧀ꦢꦢꦶꦫꦼꦒꦼꦢ꧀꧈ꦩꦸꦭ꧈ꦱꦩ꧀ꦥꦃꦏꦸꦢꦸꦢꦶꦧꦸꦮꦁꦆꦁꦥꦥꦤ꧀ꦱꦶꦁꦮꦶꦱ꧀ꦢꦶꦱꦼꦝꦶꦪꦏꦏꦺ꧈ꦭꦶꦁꦏꦸꦁꦔꦤ꧀ꦱꦶꦁꦫꦼꦱꦶꦏ꧀ꦧꦏꦭ꧀ꦚ꧀ꦗꦒꦏꦼꦱꦼꦲꦠꦤ꧀ꦏꦧꦺꦃꦮꦂꦒꦱꦼꦏꦺꦴꦭꦃ꧈ꦏꦧꦼꦂꦱꦶꦲꦤ꧀ꦆꦏꦸꦢꦢꦶꦠꦁꦒꦸꦁꦗꦮꦧ꧀ꦧꦼꦧꦫꦼꦁꦔꦤ꧀꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦱꦼꦤꦼꦁꦤꦤ꧀ꦢꦸꦂꦮꦶꦠ꧀꧈ꦮꦶꦠ꧀ꦮꦶꦠ꧀ꦠꦤ꧀ꦧꦶꦱꦤ꧀ꦢꦢꦺꦏꦏꦺꦲꦮꦭꦸꦮꦶꦃꦱꦼꦒꦼꦂ꧈ꦱꦶꦱ꧀ꦮꦧꦶꦱꦩꦼꦭꦸꦤꦤ꧀ꦢꦸꦂꦭꦤ꧀ꦔ꧀ꦫꦮꦠ꧀ꦮꦶꦠ꧀ꦆꦁꦭꦶꦁꦏꦸꦁꦔꦤ꧀ꦱꦼꦏꦺꦴꦭꦃ꧈ꦏꦤ꧀ꦛꦶꦄꦏꦺꦃꦮꦶꦠ꧀꧈ꦱꦼꦏꦺꦴꦭꦃꦧꦏꦭ꧀ꦭꦸꦮꦶꦃꦠꦼꦢꦸꦃꦭꦤ꧀ꦄꦱ꧀ꦫꦶ꧈ꦠꦸꦩꦶꦤ꧀ꦢꦏ꧀ꦆꦏꦸꦈꦒꦩꦶꦤꦁꦏꦮꦸꦗꦸꦢ꧀ꦠꦿꦼꦱ꧀ꦤꦩꦫꦁꦄꦭꦩ꧀꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦔ꧀ꦭꦸꦲꦸꦫꦏꦺꦏꦼꦗꦸꦗꦸꦫꦤ꧀꧈ꦏꦼꦗꦸꦗꦸꦫꦤ꧀ꦆꦏꦸꦱꦶꦥꦠ꧀ꦱꦶꦁꦏꦸꦢꦸꦢꦶꦢꦸꦮꦼꦤꦶꦱꦧꦼꦤ꧀ꦮꦺꦴꦁ꧈ꦤꦭꦶꦏꦈꦗꦶꦪꦤ꧀꧈ꦱꦶꦱ꧀ꦮꦎꦫꦏꦼꦤꦚꦺꦴꦤ꧀ꦠꦼꦏ꧀ꦈꦠꦮꦠꦸꦩꦶꦤ꧀ꦢꦏ꧀ꦕꦸꦫꦁ꧈ꦮꦺꦴꦁꦱꦶꦁꦗꦸꦗꦸꦂꦧꦏꦭ꧀ꦢꦶꦥꦼꦂꦕꦪꦢꦺꦤꦶꦁꦮꦺꦴꦁꦭꦶꦪ꧈ꦏꦼꦗꦸꦗꦸꦫꦤ꧀ꦧꦶꦱꦤ꧀ꦢꦢꦺꦏꦏꦺꦈꦫꦶꦥ꧀ꦭꦸꦮꦶꦃꦠꦼꦤ꧀ꦠꦿꦼꦩ꧀꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦩꦶꦒꦸꦤꦏꦏꦺꦮꦼꦏ꧀ꦠꦸꦏꦤ꧀ꦛꦶꦧꦼꦕꦶꦏ꧀꧈ꦮꦼꦏ꧀ꦠꦸꦆꦏꦸꦭꦫꦁꦫꦼꦒꦤꦺ꧈ꦱꦶꦱ꧀ꦮꦏꦸꦢꦸꦧꦶꦱꦩ꧀ꦧꦒꦶꦮꦼꦏ꧀ꦠꦸꦄꦤ꧀ꦠꦫꦤꦺꦱꦶꦤꦻꦴ꧈ꦢꦺꦴꦭꦤ꧀ꦤꦤ꧀꧈ꦭꦤ꧀ꦔꦱꦺꦴ꧈ꦄꦗꦔꦤ꧀ꦠꦶꦏꦼꦱꦸꦮꦼꦤ꧀ꦢꦺꦴꦭꦤ꧀ꦤꦤ꧀ꦔꦤ꧀ꦠꦶꦭꦭꦶꦱꦶꦤꦻꦴ꧈ꦏꦤ꧀ꦛꦶꦔꦠꦸꦂꦮꦼꦏ꧀ꦠꦸꦏꦤ꧀ꦛꦶꦧꦼꦕꦶꦏ꧀꧈ꦏꦧꦺꦃꦥꦏꦂꦪꦤ꧀ꦧꦶꦱꦫꦩ꧀ꦥꦸꦁꦏꦤ꧀ꦛꦶꦠꦼꦂꦠꦶꦧ꧀꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦠꦿꦼꦱ꧀ꦤꦩꦫꦁꦭꦶꦁꦏꦸꦁꦔꦤ꧀꧈ꦭꦶꦁꦏꦸꦁꦔꦤ꧀ꦱꦶꦁꦫꦼꦱꦶꦏ꧀ꦭꦤ꧀ꦱꦼꦲꦠ꧀ꦏꦸꦢꦸꦢꦶꦗꦒꦧꦼꦧꦫꦼꦁꦔꦤ꧀꧈ꦏꦶꦠꦏꦸꦢꦸꦒꦼꦭꦼꦩ꧀ꦔ꧀ꦫꦼꦱꦶꦏꦶꦭꦶꦁꦏꦸꦁꦔꦤ꧀ꦭꦤ꧀ꦎꦫꦔ꧀ꦫꦸꦱꦏ꧀ꦠꦤ꧀ꦢꦸꦫꦤ꧀꧈ꦠꦿꦼꦱ꧀ꦤꦩꦫꦁꦭꦶꦁꦏꦸꦁꦔꦤ꧀ꦩꦶꦤꦁꦏꦱꦭꦃꦱꦶꦗꦶꦮꦸꦗꦸꦢ꧀ꦫꦱꦱ꧀ꦪꦸꦏꦸꦂꦩꦫꦁꦒꦸꦱ꧀ꦠꦶꦄꦭ꧀ꦭꦃ꧈ꦏꦤ꧀ꦛꦶꦩꦁꦏꦺꦴꦤꦺꦴ꧈ꦈꦫꦶꦥ꧀ꦧꦏꦭ꧀ꦭꦸꦮꦶꦃꦚꦩꦤ꧀꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦄꦗꦒꦩ꧀ꦥꦁꦥꦸꦠꦸꦱ꧀ꦄꦱ꧈ꦤꦭꦶꦏꦤꦼꦩꦺꦴꦤꦶꦏꦱꦸꦭꦶꦠꦤ꧀꧈ꦱꦶꦱ꧀ꦮꦎꦫꦏꦼꦤꦒꦩ꧀ꦥꦁꦚꦼꦫꦃ꧈ꦏꦧꦺꦃꦩꦱꦭꦃꦩꦼꦱ꧀ꦛꦶꦧꦶꦱꦢꦶꦫꦩ꧀ꦥꦸꦔꦶꦪꦼꦤ꧀ꦒꦼꦭꦼꦩ꧀ꦈꦱꦲꦭꦤ꧀ꦱꦧꦂ꧈ꦏꦼꦒꦒꦭꦤ꧀ꦧꦶꦱꦢꦢꦶꦥꦔꦭꦩꦤ꧀ꦏꦁꦒꦺꦴꦭꦸꦮꦶꦃꦧꦼꦕꦶꦏ꧀ꦩꦤꦺꦃ꧈ꦱꦼꦩꦔꦠ꧀ꦭꦤ꧀ꦠꦼꦏꦢ꧀ꦱꦶꦁꦏꦸꦮꦠ꧀ꦧꦏꦭ꧀ꦤꦸꦤ꧀ꦠꦸꦤ꧀ꦩꦫꦁꦏꦱꦶꦭ꧀꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." },
        { q: "ꦱꦼꦤꦼꦁꦤꦸꦢꦸꦲꦏꦺꦏꦮꦿꦸꦃ꧈ꦪꦼꦤ꧀ꦮꦶꦱ꧀ꦩꦁꦔꦼꦂꦠꦼꦤꦶꦥꦼꦭꦗꦫꦤ꧀꧈ꦱꦶꦱ꧀ꦮꦧꦶꦱꦤꦸꦭꦸꦔꦶꦏꦚ꧀ꦕꦱꦶꦁꦢꦸꦫꦸꦁꦥꦲꦩ꧀꧈ꦤꦸꦢꦸꦲꦏꦺꦏꦮꦿꦸꦃꦩꦫꦁꦮꦺꦴꦁꦭꦶꦪꦆꦏꦸꦠꦸꦩꦶꦤ꧀ꦢꦏ꧀ꦱꦶꦁꦧꦼꦕꦶꦏ꧀꧈ꦏꦤ꧀ꦛꦶꦱꦶꦤꦻꦴꦧꦼꦧꦫꦼꦁꦔꦤ꧀꧈ꦏꦧꦺꦃꦱꦶꦱ꧀ꦮꦧꦶꦱꦩꦗꦸꦭꦤ꧀ꦤ꧀ꦒꦪꦸꦃꦥꦿꦼꦱ꧀ꦠꦱꦶꦱꦶꦁꦄꦥꦶꦏ꧀꧈ꦥꦱꦼꦢꦸꦭꦸꦫꦤ꧀ꦈꦒꦧꦏꦭ꧀ꦱꦪꦫꦏꦼꦠ꧀꧈", a: "Wacanen Tulisan Iki!", note: "Maca Sampun Purna." }

    ]},

    { id: 22, name: "Lawang Sewu (La)", type: "property", frontImage: "assets/kartu/Lawang Sewu.png", backImage: "assets/kartu/Lawang Sewu (2).png", price: 700, rent: 350, timer: 180, sell: 675, questions: [
        { q: "Wacanen pethilan geguritan iki: ꦱꦸꦒꦼꦁ ꦲꦼꦤ꧀ꦗꦶꦁ, ꦥꦤꦶꦁ ꦮꦸꦁ ꦏꦺꦴꦤꦺꦴ, ꦱꦼꦤꦸ ꦏꦺꦴꦩ꧀ꦧꦺ Tegesna isi saka geguritan kasebut.", a: "wangsulan wonten ing guru" },
        { q: "Wacanen lan tegese pethilan geguritan iki: ꦏꦸꦭꦺꦴ ꦲꦶꦤꦸꦁ ꦩꦸꦁꦏ, ꦧꦺꦴꦫꦁꦏꦸ ꦒꦼꦤ꧀ꦏ, ꦱꦼꦒꦶꦃ ꦏꦸꦤ꧀ꦢꦸ ꦏꦸꦭꦺꦴ Tegesna isi saka pethilan geguritan kasebut", a: "wangsulan wonten ing guru" },
        { q: "ꦧꦱꦶꦪꦤ꧀ꦲꦺꦴꦤꦸꦁꦱꦶꦫꦸꦁ ꦲꦤꦶꦁꦧꦺꦴꦤ꧀ꦝꦺꦴꦒꦸꦁꦥꦤ꧀ꦱꦶ ꦥꦶꦪꦁꦭꦩꦁꦏꦸꦠ꧀ꦠꦺꦴ ꦲꦶꦁ ꦥꦸꦁꦏꦺꦴ ꦏꦿꦁ Pethilan geguritan iki ngandhut piwulang apa?", a: "wangsulan wonten ing guru" },
        { q: "ꦲꦏ꧀ꦱꦫ ꦲꦶꦁꦱꦭ꧀ ꦧꦭꦸꦮꦤ꧀ ꦒꦿꦁꦠ Tegesé apa lan maksudé piye?", a: "wangsulan wonten ing guru" },
        { q: "Wacanen geguritan iki lan kepiye tegese? ꦲꦶꦤꦶꦁꦥꦸꦠ꧀ꦥꦸꦠ꧀ꦭꦺꦴꦏ꧀ꦏ ꦧꦸꦩꦺꦴꦢꦶꦩꦺꦃꦱꦺꦴꦤ ꦲꦶꦁꦩꦺꦴꦢꦺꦴꦭꦺꦴꦤ꧀ꦠꦺꦴ Apa piwulang kang bisa dijupuk saka geguritan kasebut?", a: "wangsulan wonten ing guru" },
        { q: "Wacanen lan tegese geguritan iki: ꦧꦸꦮꦶ ꦩꦁꦏꦺꦴ ꦧꦺꦴꦠꦺꦴ ꦧꦶꦤꦶꦏ ꦏꦤ꧀ꦝꦶ ꦥꦸꦤ꧀ꦱꦶ ꦏꦸꦁꦩꦶꦁ ꦥꦿꦺꦩꦺꦴ ꦩꦺꦴꦫꦤ꧀ Apa pesen moral saka geguritan kuwi?", a: "wangsulan wonten ing guru" },
        { q: "Geguritan: ꦱꦸꦒꦼꦁ ꦲꦼꦤ꧀ꦗꦶꦁ ꦥꦤꦶꦁ ꦮꦸꦁ ꦏꦺꦴꦤꦺꦴ ꦱꦼꦤꦸ ꦏꦺꦴꦩ꧀ꦧꦺ Takonan: Tegesna isi saka geguritan kasebut.", a: "wangsulan wonten ing guru" },
        { q: "ꦏꦸꦭꦺꦴ ꦲꦶꦤꦸꦁ ꦩꦸꦁꦏ ꦧꦺꦴꦫꦁꦏꦸ ꦒꦼꦤ꧀ꦏ ꦱꦼꦒꦶꦃ ꦏꦸꦤ꧀ꦢꦸ ꦏꦸꦭꦺꦴ Takonan: Tegesna isi saka geguritan kasebut!", a: "wangsulan wonten ing guru" },
        { q: "ꦏꦿꦆꦢꦲꦶꦁ ꦲꦸꦁꦏꦺꦴ ꦥꦿꦶꦠꦺꦴ ꦮꦶꦱꦶꦁ ꦲꦸꦁꦏꦺꦴ ꦥꦶꦪꦁ ꦲꦤꦶꦁ ꦏꦸꦤ꧀ꦝꦺꦴ ꦒꦺꦴꦠꦺꦴꦁ Takonan: Apa piwulang kang ana ing geguritan kasebut?", a: "wangsulan wonten ing guru" },
        { q: "ꦧꦶꦤ꧀ꦱꦤ꧀ ꦲꦸꦤꦸꦁ ꦩꦸꦠꦺ ꦲꦤꦶꦁ ꦱꦶꦤꦸꦁ ꦥꦼꦭꦺꦴꦤ ꦏꦺꦴꦤꦺꦴ ꦲꦸꦤꦏ꧀ꦛꦶ Takonan: Apa makna saka geguritan iki?", a: "wangsulan wonten ing guru" },
        { q: "Wacanen lan tegese geguritan iki: ꦧꦸꦮꦶ ꦩꦁꦏꦺꦴ ꦧꦺꦴꦠꦺꦴ ꦧꦶꦤꦶꦏ ꦏꦤ꧀ꦝꦶ ꦥꦸꦤ꧀ꦱꦶ ꦏꦸꦁꦩꦶꦁ ꦥꦿꦺꦩꦺꦴ ꦩꦺꦴꦫꦤ꧀ Apa pesen moral saka geguritan kuwi?", a: "wangsulan wonten ing guru" },
        { q: "Wacanen geguritan iki lan wenehana panemu panjenengan: ꦏꦸꦤꦺꦴ ꦲꦸꦱꦶꦁ ꦮꦶꦤ꧀ꦠꦼꦔꦤ꧀ ꦏꦁꦏꦺꦴꦫꦤ꧀ ꦏꦸꦤ꧀ꦛꦁꦏꦸ ꦩꦺꦴꦤ꧀ꦛꦺꦤ꧀ꦝꦺꦴꦤ ꦏꦸꦤ꧀ꦢꦺꦴ Apa tegese lan gunane kawruh ing geguritan kasebut?", a: "wangsulan wonten ing guru" },
        { q: "ꦲꦸꦩꦸꦤ꧀ ꦏꦸꦩ꧀ꦧꦺꦴ ꦏꦿꦶꦤ꧀ꦠ ꦥꦸꦤꦶꦁ ꦩꦺꦴꦤ꧀ꦝ ꦲꦁꦏꦺꦴ ꦲꦁꦒꦶꦤ꧀ ꦥꦸꦩꦺꦴꦫꦺꦴ Takonan: Apa pesen moral sing ana ing geguritan kuwi?", a: "wangsulan wonten ing guru" },
        { q: "Geguritan: ꦲꦶꦁꦒꦺꦴ ꦱꦶꦤꦶ ꦏꦸꦤ꧀ꦢꦸ ꦏꦿꦶꦢꦃ ꦲꦤ꧀ꦝꦶꦤ꧀ ꦏꦸꦛ ꦥꦸꦤꦸꦁ ꦮꦺꦴꦤ꧀ꦢꦺꦴ ꦥꦼꦠꦺ Takonan: Apa isi geguritan iki?", a: "wangsulan wonten ing guru" },
        { q: "ꦧꦁꦗꦤ꧀ ꦲꦤ꧀ꦝꦶꦏꦁ ꦲꦁꦏ ꦏꦶꦤꦸꦁ ꦧꦸꦫꦁ ꦮꦶꦤꦺꦴ ꦧꦼꦤꦶ ꦲꦺꦴꦤ꧀ꦱꦶꦭ꧀ ꦥꦺꦴꦤ Takonan: Tegesna geguritan kuwi piye?", a: "wangsulan wonten ing guru" },
        { q: "ꦲꦶꦁ ꦩꦸꦁꦏ ꦲꦤꦶ ꦥꦸꦠꦶ ꦏꦺꦴꦤꦺꦴ ꦏꦿꦁ ꦒꦺꦴꦠꦼꦁ ꦥꦸꦤꦸꦁ ꦩꦶꦁꦏꦁ ꦱꦤ꧀ꦝꦺꦴ Takonan: Apa pesen moral saka geguritan iki?", a: "wangsulan wonten ing guru" }
    ]},

    { id: 23, name: "Yogyakarta (Ya)", type: "property", frontImage: "assets/kartu/Yk.png", backImage: "assets/kartu/Yk (2).png", price: 750, rent: 375, timer: 180, sell: 725, questions: [
        { q: "Gawenen ukara panjelasan adhedhasar tembung “buku, maca, lan sore” ! Tulisen nganggo aksara Jawa.", a: "wangsulan wonten ing guru" },
        { q: "Gawenen ukara panjelasan adhedhasar tembung “sepeda, numpak, lan sekolah” ! Tulisen nganggo aksara Jawa.", a: "wangsulan wonten ing guru" },
        { q: "Gawenen ukara panjelasan adhedhasar tembung “pasar, tuku, lan lunga” ! Tulisen nganggo aksara Jawa.", a: "wangsulan wonten ing guru" },
        { q: "Gawenen ukara saka tembung “kanca, dolanan, lan lapangan” ! Tulisen nganggo aksara Jawa.", a: "wangsulan wonten ing guru" },
        { q: "Gunakna tembung “kursi lan kucing” kanggo nyusun ukara cekak! Tulis ukaramuu nganggo aksara Jawa.", a: "wangsulan wonten ing guru" },
        { q: "Susun ukara prasaja saka tembung “mlaku, dalan, lan wengi”! Tulisen nganggo aksara Jawa.", a: "wangsulan wonten ing guru" },
        { q: "Gawenen ukara adhedhasar tembung “lungguh, kursi, lan kelas”! Tulisen nganggo aksara Jawa.", a: "wangsulan wonten ing guru" },
        { q: "Gunakna tembung “wedang, ngombe, lan warung” kanggo nyusun ukara! Tulisen nganggo aksara Jawa.", a: "wangsulan wonten ing guru" },
        { q: "Tulisen ukara prasaja sing ngandhut tembung “guru, ajar, laln kelas” nganggo aksara Jawa.", a: "wangsulan wonten ing guru" },
        { q: "Cipta ukara cekak saka tembung “awan, panas, lan langit”", a: "wangsulan wonten ing guru" },
        { q: "Gawenen ukara prasaja saka tembung “ibu, masak, lan pawon”! Tulisen nganggo aksara Jawa!", a: "wangsulan wonten ing guru" },
        { q: "Tulisen ukara prasaja sing ngandhut tembung “guru, sinau, lan kelas”! Tulisen nganggo aksara Jawa!", a: "wangsulan wonten ing guru" },
        { q: "Cipta ukara cekak saka tembung “awan, udan, lan omah”! Tulisen nganggo aksara Jawa!", a: "wangsulan wonten ing guru" },
        { q: "Gawenen ukara prasaja saka tembung “adek, dolan, lan sore”! Tulisen ukara kasebut nganggo aksara Jawa!", a: "wangsulan wonten ing guru" },
        { q: "Gunakna tembung “pitik lan wedang” kanggo nyusun ukara prasaja! Tulisen nganggo aksara Jawa!", a: "wangsulan wonten ing guru" },
        { q: "Gawenen ukara saka tembung “bapak, nyopir, lan mobil”! Tulisen nganggo aksara Jawa!", a: "wangsulan wonten ing guru" },
        { q: "Susun ukara adhedhasar tembung “kanca, maca, lan perpustakaan”! Tulisen nganggo aksara Jawa!", a: "wangsulan wonten ing guru" }
    ]},

    {
    name: "Dana Umum",
    type: "dana-umum",
    image: "assets/petak/Dana Umum.png",
    cards: [
        { text: "Angsal koin 5 perak", effect: 5, action: "money" },
        { text: "Angsal 3 koin 100 perak", effect: 300, action: "money" },
        { text: "Kartu niki saget disimpen dingge bebas pajak 1 kali.", action: "keep", type: "bebas_pajak" },
        { text: "Kartu niki saget disimpen dingge bebas penjara 1 kali", action: "keep", type: "bebas_penjara" },
        { text: "Balekke dhuwit ing bank 50 perak", effect: -50, action: "money" },
        { text: "JEGAGIK!!!!! Angsal 1000 perak", effect: 1000, action: "money" },
        { text: "Balekke dhuwit ing bank 100 perak", effect: -100, action: "money" },
        { text: "SUKUR!!!! Belekke dhuwit bank 1000 perak", effect: -1000, action: "money" },
        { text: "Angsal 2 koin 50 perak", effect: 100, action: "money" },
        { text: "Angsal 1 koin 500 perak", effect: 500, action: "money" },
        { text: "Bayar pajeg menyang bank 200 perak", effect: -200, action: "money" },
        { text: "Bayar sewa papan 150 perak", effect: -150, action: "money" },
        { text: "Angsal bonus 250 perak", effect: 250, action: "money" },
        { text: "JACKPOT!!!!! Angsal 1500 perak", effect: 1500, action: "money" },
        { text: "SUKUR!!!! Balekke dhuwit ing bank 500 perak", effect: -500, action: "money" },
        { text: "Kartu niki saget disimpen dingge bebas mundur 1 kali", action: "keep", type: "bebas_mundur" },
        { text: "Angsal 300 perak", effect: 300, action: "money" },
        { text: "Oleh warisan saka simbah, angsal 700 perak", effect: 700, action: "money" },
        { text: "Dagangan laris manis, angsal 400 perak", effect: 400, action: "money" },
        { text: "Dagangan rugi, balekke 350 perak ing bank", effect: -350, action: "money" },
        { text: "Mlebu penjara, bayar biaya 250 perak", effect: -250, action: "money" }, // Logika masuk penjara bisa dikembangkan nanti jika sistem penjara aktif
        { text: "Oleh hadiah undian pasar, angsal 800 perak", effect: 800, action: "money" },
        { text: "Angsal bonus 300 perak", effect: 300, action: "money" },
        { text: "Bayar utang neng bank 350 perak", effect: -350, action: "money" },
        { text: "Angsal 50 perak", effect: 50, action: "money" },
        { text: "Angsal 2 koin 5 perak", effect: 10, action: "money" },
        { text: "Bayar 50 perak neng bank", effect: -50, action: "money" },
        { text: "Kartu niki saget disimpen dingge bebas utang 100 perak", action: "keep", type: "potong_utang_100" },
        { text: "Kartu niki saget dingge bayar utang 5 perak", effect: -5, action: "money" },
        { text: "Bayar utang 150 perak neng bank", effect: -150, action: "money" },
        { text: "Angsal 100 perak ditambah bayar pajak 50 perak", effect: 50, action: "money" }, // Bersih dapat 50
        { text: "Angsal 300 perak ditambah bayar utang neng bank 250 perak", effect: 50, action: "money" }, // Bersih dapat 50
        { text: "Angsal 1000 perak ditambah bayar utang neng bank 500 perak", effect: 500, action: "money" }, // Bersih dapat 500
        { text: "Kartu iki saget dingge bebas gerak 1 kali", action: "keep", type: "bebas_gerak" },
        { text: "Angsal 2 koin 100 perak", effect: 200, action: "money" },
        { text: "Angsal 3 koin 5 perak", effect: 15, action: "money" }
    ]},
    
    { id: 25, name: "MASUK PENJARA", type: "jail_spot", image: "assets/petak/Penjoro-2.png" },

    { id: 26, name: "Mangut (Ma)", type: "property", frontImage: "assets/kartu/Mangut Lele.png", backImage: "assets/kartu/Mangut Lele (2).png", price: 800, rent: 400, timer: 150, sell: 775, questions: [
        { q: "Susun tembung iki dadi ukara sing ceceg = ꦧꦸꦏꦸ – ꦄꦏꦸ – ꦩꦕ", a: "wangsulan wonten ing guru" },
        { q: "Susun tembung iki dadi ukara sing ceceg = ꦄꦢꦶꦏ꧀ – ꦩꦁꦒꦤ꧀ – ꦱꦺꦒ", a: "wangsulan wonten ing guru" },
        { q: "Susun tembung iki dadi ukara sing ceceg = ꦱꦼꦤꦼꦁ – ꦏꦸꦭꦺꦴ – ꦆꦒꦺ", a: "wangsulan wonten ing guru" },
        { q: "Susun tembung iki dadi ukara sing ceceg = ꦠꦸꦏꦸ - ꦄꦏꦸ - ꦗꦗꦤ꧀", a: "wangsulan wonten ing guru" },
        { q: "Susun tembung iki dadi ukara sing ceceg = ꦱꦶꦤꦻꦴ – ꦧꦱ ꦗꦮ – ꦄꦏꦸ", a: "wangsulan wonten ing guru" },
        { q: "Susun tembung iki dadi ukara sing trep = ꦭꦸꦁꦒ –ꦫꦩ – ꦥꦱꦂ – ꦩꦶꦁꦒꦸ– ꦢꦶꦤ", a: "wangsulan wonten ing guru" },
        { q: "Susun tembung ikii dadi ukara sing bener = ꦒꦸꦫꦸ – ꦏ꧀ꦭꦱ꧀ – ꦥꦏ꧀ – ꦭꦶꦩ – ꦩꦸꦭꦁ", a: "wangsulan wonten ing guru" },
        { q: "Susun tembung iki dadi ukara sing trep = ꦠꦸꦏꦸ / ꦧꦸꦢꦶ / ꦧꦪꦼꦩ꧀ / ꦤꦼꦁ / ꦥꦱꦂ", a: "wangsulan wonten ing guru" },
        { q: "Susun tembung iki dadi ukara sing trep = ꦄꦒꦸꦱ꧀ / ꦤ꧀ꦢꦸꦮꦺ / ꦲꦶꦮꦏ꧀ / ꦲꦚꦂ", a: "wangsulan wonten ing guru" },
        { q: "Susun tembung iki dadi ukara sing trep = ꦏꦿꦸꦥꦸꦏ꧀ / ꦱꦸꦱꦶ / ꦠꦸꦏꦸ", a: "wangsulan wonten ing guru" },
        { q: "Susun tembung iki dadi ukara sing trep = ꦩꦱꦏ꧀ / ꦧꦪꦼꦩ꧀ / ꦱꦶꦩ꧀ꦧꦃ / ꦱꦪꦸꦂ", a: "wangsulan wonten ing guru" },
        { q: "Susun tembung iki dadi ukara sing trep = ꦩꦺꦴꦧꦶꦭ꧀ / ꦠꦸꦏꦸ / ꦢꦶꦏ / ꦲꦚꦂ", a: "wangsulan wonten ing guru" },
        { q: "Susun tembung iki dadi ukara sing trep = ꦢꦭꦤ꧀ / ꦗꦭꦸ / ꦄꦱꦼꦥ꧀ / ꦭꦤ꧀ / ꦭꦒꦶ", a: "wangsulan wonten ing guru" },
        { q: "Susun tembung iki dadi ukara sing trep = ꦧꦤꦸ / ꦩꦺꦴꦠꦎꦫ / ꦲꦗꦂ", a: "wangsulan wonten ing guru" },
        { q: "Susun tembung iki dadi ukara sing trep= ꦤꦶꦤꦄ / ꦭꦤ꧀ / ꦩꦱꦏ꧀ / ꦧꦸ ꦤꦶꦱ꧀ / ꦧꦫꦺꦁ", a: "wangsulan wonten ing guru" }
    ]},

    { id: 27, name: "Jaranan (Ja)", type: "property", frontImage: "assets/kartu/Jaran.png", backImage: "assets/kartu/Jaran (2).png", price: 850, rent: 425, timer: 180, sell: 825, questions: [
        { q: "Ana ing kirab ... , para peserta nganggo ... tradisional lan ndudut ... kepang. (Tulisen ukara kasebut nganggo aksara Jawa lan isenana titik titik nganggo tembung sing cocog!)", a: "wangsulan wonten ing guru" },
        { q: "Simbahku kerep nyritakake ... rakyat sing isine dongeng lan ... nalika wengi teka (Tulisen ukara kasebut nganggo aksara Jawa lan isenana titik titik nganggo tembung sing cocog!)", a: "wangsulan wonten ing guru" },
        { q: "Aku lan kanca-kancaku padha melu gotong ... kanggo adicara bersih ... ing ... desa. (Tulisen ukara kasebut nganggo aksara Jawa lan isenana titik titik nganggo tembung sing cocog!)", a: "wangsulan wonten ing guru" },
        { q: "Kanggo nyambut tamu saka luar kutha, para warga nyiapake ... khas daerah. (Tulisen ukara kasebut nganggo aksara Jawa lan isenana titik titik nganggo tembung sing cocog!)", a: "wangsulan wonten ing guru" },
        { q: "Nalika acara mitoni, wong tuwa biasane nyiapake pincuk isi ... abang lan ... pasar kanggo tetamu. (Tulisen ukara kasebut nganggo aksara Jawa lan isenana titik titik nganggo tembung sing cocog!)", a: "wangsulan wonten ing guru" },
        { q: "Nalika upacara adat wiwit tandur, para ... padha nggawa ... menyang sawah.(Tulisen ukara kasebut nganggo aksara Jawa lan isenana titik-titik nganggo tembung sing cocog!)", a: "wangsulan wonten ing guru" },
        { q: "Warga padha bebarengan nyiapake ... kanggo perayaan ...... Maulud ing ... . (Tulisen ukara kasebut nganggo aksara Jawa lan isenana titik titik nganggo tembung sing cocog!)", a: "wangsulan wonten ing guru" },
        { q: "Simbahe nggawa ... lan ... saka alas kanggo sesaji ruwatan. (Tulisen ukara kasebut nganggo aksara Jawa lan isenana titik-titik nganggo tembung sing cocog!)", a: "wangsulan wonten ing guru" },
        { q: "Nalika pesta rakyat, bocah-bocah padha dolanan ... lan ... ing alun-alun. (Tulisen ukara kasebut nganggo aksara Jawa lan isenana titik titik nganggo tembung sing cocog)", a: "wangsulan wonten ing guru" },
        { q: "Upacara adat biasane diiringi ... nganggo ... adat, lan dipandhegani dening ... . (Tulisen ukara kasebut nganggo aksara Jawa lan isenana titik titik nganggo tembung sing cocog).", a: "wangsulan wonten ing guru" },
        { q: "Apa tembung kang cocok kanggo ngisi ukara iki? “Simbahe nggawa … saka kebon kanggo adang ing pawon.”", a: "wangsulan wonten ing guru" },
        { q: "Tulisna nganggo aksara Jawa lan isi bagian kosong ing ukara iki: “Mbakyu masak … lan … kanggo riyaya.”", a: "wangsulan wonten ing guru" },
        { q: "Lengkapi ukara iki nganggo jeneng adicara Jawa: “Warga desa padha nglumpuk ing balai desa kanggo … saben wulan Sura.”", a: "wangsulan wonten ing guru" },
        { q: "Nalika panen raya, petani padha syukuran nganggo … lan do’a bareng. Tulisen tembung sing cocog nganggo aksara Jawa!", a: "wangsulan wonten ing guru" },
        { q: "Simbah tansah ngudari crita … kang isine piwulang urip lan kabecikan. Tulisen tembung sing cocog nganggo aksara Jawa!", a: "wangsulan wonten ing guru" },
        { q: "Ing acara mantenan, penganten nganggo blangkon lan ... adat Jawa. Tulisen tembung sing cocog nganggo aksara Jawa!", a: "wangsulan wonten ing guru" },
        { q: "Ing pawon Jawa, simbah isih masak nganggo … lan anglo. Tulisen tembung sing cocog nganggo aksara Jawa!", a: "wangsulan wonten ing guru" }
    ]},

    { id: 28, name: "TANTANGAN", type: "card", image: "assets/petak/Tantangan.png" },
    
    { id: 29, name: "Tumpeng (Ta)", type: "property", frontImage: "assets/kartu/Tumpeng.png", backImage: "assets/kartu/Tumpeng (2).png", price: 900, rent: 450, timer: 180, sell: 875, questions: [
        { q: "ꦢꦿꦸꦥꦢꦶ ꦢꦿꦸꦥꦢꦶ ꦲꦶꦏꦸ ꦒꦂꦮꦤꦺ ꦥꦫ ꦥꦤ꧀ꦝꦮ ꦈꦠꦩꦤꦺ ꦪꦸꦢꦶꦱ꧀ꦠꦶꦫꦄ ꦝꦺꦮꦺꦏꦼ ꦮꦤꦶꦠ ꦏꦁꦏꦁ ꦱꦺꦠꦾ ꦱꦧꦂ ꦭꦤ꧀ ꦮꦤꦶ . ꦢꦿꦸꦥꦢꦶ ꦲꦱꦿꦶꦁ ꦔꦢꦺꦥꦶ ꦕꦺꦴꦧꦲꦤ꧀ ꦤꦔ꧀ꦒꦶꦁ ꦠꦤ꧀ꦱꦃ ꦩ꧀ꦧꦺꦭ ꦏꦄꦢꦶꦭꦤ꧀ . Apa isi ukara ing nduwur iki?", a: "wangsulan wonten ing guru" },
        { q: "ꦄꦧꦶꦩꦚꦸ ꦄꦧꦶꦩꦚꦸ ꦲꦶꦏꦸ ꦥꦸꦠꦿꦤꦺ ꦄꦫ꧀ꦗꦸꦤ ꦭꦤ꧀ ꦝꦺꦮꦶ ꦱꦸꦧꦢꦿ . ꦝꦺꦮꦺꦏꦼ ꦒꦒꦃ ꦭꦤ꧀ ꦮꦤꦶ ꦩ꧀ꦭꦼꦧꦸ ꦕꦏꦿꦧꦾꦸꦲ . ꦄꦧꦶꦩꦚꦸ ꦒꦸꦒꦸꦂ ꦏꦤ꧀ꦠꦶ ꦒꦒꦃ ꦧꦼꦫꦤꦶ Apa isi ukara iki?", a: "wangsulan wonten ing guru" },
        { q: "ꦱꦿꦶꦏꦤ꧀ꦝꦶ ꦆꦏꦸ ꦥꦿꦗꦸꦫꦶꦠ꧀ ꦮꦤꦶꦠ ꦏꦁ ꦒꦒꦃ ꦭꦤ꧀ ꦲꦭ꧀ꦭꦶ ꦩꦼꦩꦤꦃ . ꦝꦺꦮꦺꦏꦼ ꦧꦺꦴ ꦗꦤꦺ ꦄꦫ꧀ꦗꦸꦤ ꦭꦤ꧀ ꦏꦼꦫꦼꦥ꧀ ꦩꦼꦭꦸ ꦥꦼꦫꦁ . ꦱꦿꦶꦏꦤ꧀ꦝꦶ ꦢꦶꦏꦼꦤꦭ꧀ ꦮꦤꦶ ꦭꦤ꧀ ꦠꦿꦩ꧀ꦥꦶꦭ꧀ Apa isi ukara ing nduwur?", a: "wangsulan wonten ing guru" }
    ]},

   {
    id: 30,
    name: "Dana Umum",
    type: "dana-umum",
    image: "assets/petak/Dana Umum.png",
    cards: [
        { text: "Angsal koin 5 perak", effect: 5, action: "money" },
        { text: "Angsal 3 koin 100 perak", effect: 300, action: "money" },
        { text: "Kartu niki saget disimpen dingge bebas pajak 1 kali.", action: "keep", type: "bebas_pajak" },
        { text: "Kartu niki saget disimpen dingge bebas penjara 1 kali", action: "keep", type: "bebas_penjara" },
        { text: "Balekke dhuwit ing bank 50 perak", effect: -50, action: "money" },
        { text: "JEGAGIK!!!!! Angsal 1000 perak", effect: 1000, action: "money" },
        { text: "Balekke dhuwit ing bank 100 perak", effect: -100, action: "money" },
        { text: "SUKUR!!!! Belekke dhuwit bank 1000 perak", effect: -1000, action: "money" },
        { text: "Angsal 2 koin 50 perak", effect: 100, action: "money" },
        { text: "Angsal 1 koin 500 perak", effect: 500, action: "money" },
        { text: "Bayar pajeg menyang bank 200 perak", effect: -200, action: "money" },
        { text: "Bayar sewa papan 150 perak", effect: -150, action: "money" },
        { text: "Angsal bonus 250 perak", effect: 250, action: "money" },
        { text: "JACKPOT!!!!! Angsal 1500 perak", effect: 1500, action: "money" },
        { text: "SUKUR!!!! Balekke dhuwit ing bank 500 perak", effect: -500, action: "money" },
        { text: "Kartu niki saget disimpen dingge bebas mundur 1 kali", action: "keep", type: "bebas_mundur" },
        { text: "Angsal 300 perak", effect: 300, action: "money" },
        { text: "Oleh warisan saka simbah, angsal 700 perak", effect: 700, action: "money" },
        { text: "Dagangan laris manis, angsal 400 perak", effect: 400, action: "money" },
        { text: "Dagangan rugi, balekke 350 perak ing bank", effect: -350, action: "money" },
        { text: "Mlebu penjara, bayar biaya 250 perak", effect: -250, action: "money" }, // Logika masuk penjara bisa dikembangkan nanti jika sistem penjara aktif
        { text: "Oleh hadiah undian pasar, angsal 800 perak", effect: 800, action: "money" },
        { text: "Angsal bonus 300 perak", effect: 300, action: "money" },
        { text: "Bayar utang neng bank 350 perak", effect: -350, action: "money" },
        { text: "Angsal 50 perak", effect: 50, action: "money" },
        { text: "Angsal 2 koin 5 perak", effect: 10, action: "money" },
        { text: "Bayar 50 perak neng bank", effect: -50, action: "money" },
        { text: "Kartu niki saget disimpen dingge bebas utang 100 perak", action: "keep", type: "potong_utang_100" },
        { text: "Kartu niki saget dingge bayar utang 5 perak", effect: -5, action: "money" },
        { text: "Bayar utang 150 perak neng bank", effect: -150, action: "money" },
        { text: "Angsal 100 perak ditambah bayar pajak 50 perak", effect: 50, action: "money" }, // Bersih dapat 50
        { text: "Angsal 300 perak ditambah bayar utang neng bank 250 perak", effect: 50, action: "money" }, // Bersih dapat 50
        { text: "Angsal 1000 perak ditambah bayar utang neng bank 500 perak", effect: 500, action: "money" }, // Bersih dapat 500
        { text: "Kartu iki saget dingge bebas gerak 1 kali", action: "keep", type: "bebas_gerak" },
        { text: "Angsal 2 koin 100 perak", effect: 200, action: "money" },
        { text: "Angsal 3 koin 5 perak", effect: 15, action: "money" }
    ]},

    { id: 31, name: "Nandur (Na)", type: "property", frontImage: "assets/kartu/Nandur.png", backImage: "assets/kartu/Nandur (2).png", price: 950, rent: 475, timer: 240, sell: 925, questions: [
        { q: "Tulisen cerkak ing ngisor nganggo aksara Jawa! “Dina iki aku mlebu sekolah anyar. Aku nemu kanca anyar, guru-gurune apik lan ndhukung aku.”", a: "wangsulan wonten ing guru" },
        { q: "Tulisen cerkak ing ngisor nganggo aksara Jawa! “Bocah saben dinten nulungi simbah: maringi dhaharan, nyapu, lan ndherek simbah mlaku-mlaku. Simbah rumangsa seneng amarga anak putune sregep lan sayang.”", a: "wangsulan wonten ing guru" },
        { q: "Tulisen cerkak ing ngisor nganggo aksara Jawa! “Aku lan kancaku dolan menyang alas golek kayu. Ana kewan-kewan ing kono, lan kita kudu ngati-ati.”", a: "wangsulan wonten ing guru" },
        { q: "Tulisen cerkak iki nganggo aksara Jawa! “Aku lan Rudi nggawe layangan saka kertas lan pring. Sawise rampung, layangane mabur dhuwur. Aku seneng banget dolanan bareng.”", a: "wangsulan wonten ing guru" },
        { q: "Tulisen cerkak iki nganggo aksara Jawa! “Dina Minggu esuk aku sepedaan karo kancaku. Dalane adhem lan sepi. Aku krasa seneng lan awak dadi sehat.”", a: "wangsulan wonten ing guru" },
        { q: "Tulisen cerkak ing ngisor nganggo aksara Jawa! “Dina Minggu awan, aku sinau masak karo ibu. Aku ngiris sayuran lan nyampur bumbu. Masakanku dadi sayur asem sing enak.”", a: "wangsulan wonten ing guru" },
        { q: "Tulisen dialog ing ngisor iki nganggo aksara Jawa! “Ratri sowan dhateng eyang. Eyang paring wedang jahe. Ratri matur nuwun kanthi andhap asor.”", a: "wangsulan wonten ing guru" },
        { q: "Gantos ukara ing ngandhap iki nganggo aksara Jawa lan krama inggil! “Aku nyuguhake teh kanggo bapakku. Bapakku ngendika matur nuwun.”", a: "wangsulan wonten ing guru" },
        { q: "Wujuden teks cekak iki nganggo aksara Jawa krama inggil! “Sasi wingi, ibu tindak pasar bebarengan karo aku. Ibu mundhut sayuran, aku nggembol tas belanjaan.”", a: "wangsulan wonten ing guru" },
        { q: "Tulisen crita cekak ing ngandhap nganggo aksara Jawa kanthi unggah-ungguh krama! “Saben enjing, Rama tangi luwih rumiyin. Rama nglempakne klambi lan nyiapake sarapan.”", a: "wangsulan wonten ing guru" },
        { q: "Tulisen teks cekak ing ngandhap iki nganggo aksara Jawa lan gunakna krama inggil sing trep! “Aku lan adhikku sowan menyang omahe mbah. Mbah nyuguhake jajan lan nyritakake dongeng.”", a: "wangsulan wonten ing guru" },
        { q: "Wujuden teks ing ngisor iki nganggo aksara Jawa, nganggo unggah-ungguh basa krama inggil! “Nalika dina Minggu, bapak mlaku-mlaku ing taman kutha. Bapak seneng ndeleng kembang mekar.”", a: "wangsulan wonten ing guru" },
        { q: "Gawaa ukara ing ngandhap iki menyang tulisan aksara Jawa lan krama inggil sing bener! “Kula lan ibu tindak dhateng pasar. Ibu mundhut woh-wohan lan sayuran.”", a: "wangsulan wonten ing guru" },
        { q: "Tulisen crita cekak ing ngandhap nganggo aksara Jawa lan basa krama inggil kanthi tepat! “Saben enjing, simbah nyapu latar lan nyiram kembang. Aku nulungi simbah saben dina.”", a: "wangsulan wonten ing guru" },
        { q: "Wujuden teks iki nganggo aksara Jawa lan krama inggil sing bener! “Ibu paring piwulang dhateng kula supados tansah tumindak sae lan ngajeni tiyang sepuh.”", a: "wangsulan wonten ing guru" },
        { q: "Tulisen tembung iki nganggo aksara Jawa lan gunakna krama inggil sing pas! “Nalika libur, kula ngunjungi museum kaliyan bapak. Bapak nerangake sejarah patung-patung ing kana.”", a: "wangsulan wonten ing guru" },
        { q: "Tulis teks ing ngandhap nganggo aksara Jawa lan krama inggil sing bener! “Nalika mangsa panen, simbah ngajak kula menyang sawah. Kula nderek mbantu panen pari.”", a: "wangsulan wonten ing guru" }
    ]},

    { id: 32, name: "Kraton (Ka)", type: "property", frontImage: "assets/kartu/Kraton.png", backImage: "assets/kartu/Kraton (2).png", price: 1000, rent: 500, timer: 140, sell: 975, questions: [     
        { q: "ꦏꦸꦩꦸ ꦏꦭꦺꦴ ꦏꦸꦛꦭ꧀ ꦩꦼꦁꦱ꧀ ꦏꦸꦫꦸꦁ ꦏꦼꦩ꧀ꦧꦸ ꦏꦸꦛꦭ꧀. ꦱꦭꦸꦩ꧀ ꦱꦺꦴꦤ꧀ꦝꦶ ꦧꦼꦤ꧀ꦝꦶ ꦲꦏ꧀ꦱꦫ.", a: "wangsulan wonten ing guru" },
        { q: "ꦢꦶꦤ꧀ꦠꦼꦁ ꦲꦺꦴꦤ꧀ꦢꦶꦏ꧀ ꦥꦼꦤ꧀ꦠꦺꦴꦤ꧀ ꦥꦶꦤ꧀ ꦱꦏ꧀ꦱꦺꦴ. ꦥꦸꦤ꧀ ꦏꦼꦮꦶꦁ ꦱꦭꦺꦴꦁ ꦲꦏ꧀ꦱꦫ “ꦥꦼꦤ꧀ꦠꦺꦴꦤ꧀”.", a: "wangsulan wonten ing guru" },
        { q: "ꦠꦶꦠꦶ ꦲꦶꦤ꧀ꦠꦸꦁ ꦧꦶꦠꦼꦁ ꦏꦺꦴ ꦥꦸꦁ ꦏꦼꦠꦸ ꦥꦤ꧀ꦠꦶꦱꦺꦴ. ꦲꦶꦤ꧀ꦠꦸꦁ ꦒꦺꦴꦏ ꦲꦏ꧀ꦱꦫ ꦏꦼꦠꦸ.", a: "wangsulan wonten ing guru" },
        { q: "ꦲꦶꦤ꧀ꦠꦸꦁ ꦩꦼꦤ꧀ꦝꦶ ꦥꦤ꧀ꦝꦶ ꦧꦺꦴꦏ ꦠꦼꦩ꧀ꦧꦸꦁ ꦩꦼꦤ꧀ꦝꦶ. ꦱꦭꦸꦩ꧀ ꦱꦺꦴꦤ꧀ꦝꦶ ꦧꦺꦴꦏ ꦧꦺꦴꦏ ꦧꦼꦤ꧀ꦝꦶ ꦧꦭꦸꦁ ꦧꦭꦶ.", a: "wangsulan wonten ing guru" },
        { q: "ꦱꦶꦩꦺꦴ ꦥꦸꦱ꧀ꦱꦶ ꦲꦶꦤ꧀ꦠꦸꦁ ꦧꦁꦏꦼꦔꦺꦴ ꦥꦼꦠ꧀ꦠꦼꦒꦼ ꦏꦭꦺꦴ. ꦲꦶꦤ꧀ꦠꦸꦁ ꦒꦺꦴꦏ ꦏꦭꦺꦴ ꦤꦸꦱꦶ.", a: "wangsulan wonten ing guru" },
        { q: "ꦏꦸꦩꦸ ꦧꦱ ꦩꦼꦔꦼꦒꦶ ꦩꦸꦠꦸꦫꦸ ꦏꦺꦴ ꦩꦠꦶ. ꦲꦶꦤ꧀ꦠꦸꦁ ꦏꦺꦴ ꦲꦏ꧀ꦱꦫ ꦩꦸꦠꦸꦫꦸ.", a: "wangsulan wonten ing guru" },
        { q: "ꦧꦺꦏ꧀ ꦢꦸꦮꦶ ꦥꦶꦠꦼꦁ ꦩꦼꦠꦤ꧀ ꦮꦸꦤ꧀ꦏꦺꦴ. ꦲꦶꦤ꧀ꦠꦸꦁ ꦧꦺꦏ꧀ ꦲꦏ꧀ꦱꦫ ꦥꦶꦠꦼꦁ.", a: "wangsulan wonten ing guru" },
        { q: "ꦏꦶꦪꦁ ꦤꦺꦴꦱ ꦧꦼꦭꦼꦔꦸ ꦤꦶꦏꦺ ꦤꦶꦁꦔꦼ ꦮꦤ꧀ꦝꦺꦴ. ꦲꦶꦤ꧀ꦠꦸꦁ ꦲꦏ꧀ꦱꦫ ꦧꦼꦭꦼꦔꦸ.", a: "wangsulan wonten ing guru" },
        { q: "ꦮꦸꦤꦸ ꦥꦶꦠꦺꦴꦤ꧀ ꦱꦸꦤꦺꦁ ꦏꦶꦠ꧀ꦠꦸ ꦥꦏ꧀ꦱꦺꦴ. ꦏꦭꦩꦶꦠ꧀ ꦏꦱꦶꦏ꧀ ꦲꦏ꧀ꦱꦫ ꦥꦶꦠꧺꦤ꧀.", a: "wangsulan wonten ing guru" },
        { q: "ꦕꦩꦼꦁ ꦲꦶꦁꦥꦺꦴꦠ꧀ꦱꦺꦴꦏꦭ꧀ ꦏꦸꦭꦺꦴꦤ꧀ꦏꦼꦤ꧀ꦝꦶꦁ ꦏꦼꦭꦺꦴꦤ꧀. ꦲꦶꦏ꧀ꦱꦺꦴꦫꦺꦴꦤ꧀ \"ꦲꦶꦁꦥꦺꦴꦠ꧀\".", a: "wangsulan wonten ing guru" }
    ]
}
];

applyCardImageAssets(boardData, cardImageAssets);

function handleBebasParkir(player, boardConfig, callbackMove) {
    console.log(`${player.name} mendarat di Bebas Parkir! Silakan pilih petak tujuan.`);

    const boardElement = document.getElementById("board") || document.body;
    const overlay = document.createElement("div");
    overlay.id = "parking-overlay";
    overlay.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center; z-index:9999;";

    const modal = document.createElement("div");
    modal.style.cssText = "background:white; padding:20px; border-radius:8px; max-height:80vh; overflow-y:auto; width:400px;";
    modal.innerHTML = `<h3>Pilih Petak Tujuan Bebas Parkir</h3><p>Klik salah satu petak di bawah ini:</p>`;

    const listContainer = document.createElement("div");
    listContainer.style.cssText = "display:flex; flex-direction:column; gap:8px; margin-top:10px;";

    boardConfig.forEach((tile) => {
        const btn = document.createElement("button");
        btn.innerText = `[ID: ${tile.id}] ${tile.name} (${tile.type})`;
        btn.style.cssText = "padding: 10px; cursor: pointer; text-align: left; border: 1px solid #ccc; background: #f9f9f9; border-radius: 4px;";

        btn.onclick = () => {
            document.body.removeChild(overlay);
            console.log(`Pemain berpindah ke petak ID: ${tile.id} (${tile.name})`);

            if (typeof callbackMove === "function") {
                callbackMove(tile.id);
            }
        };

        listContainer.appendChild(btn);
    });

    modal.appendChild(listContainer);
    overlay.appendChild(modal);
    boardElement.appendChild(overlay);
}

function onPlayerLandOnTile(player, currentTileId, boardConfig) {
    if (currentTileId === 17) {
        handleBebasParkir(player, boardConfig, (selectedId) => {
            player.position = selectedId;
            triggerTileAction(player, selectedId, boardConfig);
        });
    }
}

const aksaraMap = {
    "Cenil (Ca)": "ꦕ", "Sate (Sa)": "ꦱ", "Dawet (Da)": "ꦣ", "Wajik (Wa)": "ꦮ",
    "Dhalang (Dha)": "ꦝ", "Rawon (Ra)": "ꦫ", "Gudeg (Ga)": "ꦒ", "Ngarsa Dalem (Nga)": "ꦔ",
    "Batik (Ba)": "ꦧ", "Nyai (Nya)": "ꦚ", "Thiwul (Tha)": "ꦛ", "Prambanan (Pa)": "ꦥ",
    "Hanacaraka (Ha)": "ꦲ", "Lali Gadis (La)": "ꦭ", "Yogyakarta (Ya)": "ꦪ", "Mangut (Ma)": "ꦩ",
    "Jaran (Ja)": "ꦗ", "Tumpeng (Ta)": "ꦠ", "Nandur (Na)": "ꦤ", "Kraton (Ka)": "ꦏ"
};

// Tambahkan path gambar pion di sini, misalnya: "assets/pion/bagong.png"
let players = [
    { id: 0, name: "Bagong", color: "#ff0000", pos: 0, money: 700, ownedProperties: [], image: "assets/pion/bagong.png" },
    { id: 1, name: "Petruk", color: "#0a0eee", pos: 0, money: 700, ownedProperties: [], image: "assets/pion/petruk.png" },
    { id: 2, name: "Gareng", color: "#00dd25", pos: 0, money: 700, ownedProperties: [], image: "assets/pion/gareng.png" },
    { id: 3, name: "Semar", color: "#b453a4", pos: 0, money: 700, ownedProperties: [], image: "assets/pion/semar.png" }
];
 