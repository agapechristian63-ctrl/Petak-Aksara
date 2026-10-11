// ===============================================
// Konfigurasi Website: Pawiyatan Jawa
// Game Edukasi Budaya Jawa - Candrasangkala
// ===============================================

window.siteConfig = {
    // ========================================
    // 1. IDENTITAS WEBSITE
    // ========================================
    metadata: {
        title: "Pawiyatan Jawa - Gerbang Budaya & Game Edukasi",
        logoText: "ꦕ",
        brandName: "Candrasangkala",
        tagline: "Petak aksara jawa"
    },

    // ========================================
    // 2. NAVIGASI & TAUTAN UTAMA
    // ========================================
    navigation: {
        links: [
            { label: "Utama", href: "#home" },
            { label: "Bab", href: "#tentang" },
            { label: "Peraturan", href: "#peraturan" },
            { label: "Tim", href: "#credits" }
        ],
        button: {
            label: "Enggal Dolanan",
            href: "file_game/index.html"
        }
    },

    // ========================================
    // 3. KONFIGURASI BERANDA (HERO SECTION)
    // ========================================
    hero: {
        tag: "petak aksara jawa",
        title: "<span class='text-transparent bg-clip-text bg-gradient-to-r from-jawa-gold via-yellow-200 to-jawa-gold'>Candrasangkala</span>",
        subtitle: "Sinau Aksara Jawa luwih seru lan interaktif liwat Monopoli: Tata Strategi, Kumpulna Aset, Wasis Basane!",
        bgImage: "assets/bg/ilustrasi-hero.png",
        ctaPrimary: {
            label: "Enggal Dolanan",
            href: "file_game/index.html"
        },
        ctaSecondary: {
            label: "Mirsani Aturan",
            href: "#peraturan"
        },
        ctaTertiary: {
            label: "Sinau Dhisik",
            href: "file_sinau/index.html"
        }
    },

    // ========================================
    // 4. PILAR TANTANGAN KEBUDAYAAN
    // ========================================
    tentang: {
        title: "Bab Petak Aksara Jawa",
        items: [
            {
                title: "Latar Belakang",
                desc: "Medhia Monopoli dipundamel minangka solusi inovatif kanggé ngadhepi angele siswa nalika sinau Aksara Jawa liwat cara dolanan ingkang nyenengaken.",
                icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`,
                borderClass: "border-jawa-gold"
            },
            {
                title: "Tujuan",
                desc: "Dolanan menika nggadhahi tujuan kanggé nambah kompak, nglatih ketangkasan mangsuli pitakon, saha njembaraken penguasaan kosakata basa Jawi kagungane siswa.",
                icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`,
                borderClass: "border-jawa-accent"
            },
            {
                title: "Capaian Pembelajaran",
                desc: "Siswa dipun-ajap saged ngenali karakteristik wujud huruf dhasar nganti prigel maca, nulis ukara mawa pasangan, sarta mahami teks Aksara Jawi kanthi leres.",
                icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>`,
                borderClass: "border-jawa-primary"
            }
        ]
    },

    // ========================================
    // 5. PERATURAN & CARA BERMAIN
    // ========================================
    peraturan: {
        tagline: "Peraturan Pethak Aksara Jawa",
        title: "Peraturan & Cara Dolanan",
        steps: [
            {
                num: 1,
                title: "Tumbas Petak",
                desc: "1. menawa pemain milih kanggo nuku, mula pemain kudu mbayar karo koin jumbuh rega papan kasebut, banjur pemain njawab pitakon kang diwenehake dening pemandu jumbuh petak kang pengin dituku. <br>2. pitakon oleh didiskusikan bareng anggota klompok jroning wayah kang wis katemtokake ing saben asete. <br>3. klompok ngirimake 1 perwakilan kanggo oleh njawab pitakon karo memencet bel utawa nalika wayah durasi pengerjaan soal rampung. <br>4. tim oleh njawab kanthi lesan utawa nulisake wangsulan ing blabag. <br>5. pitakon katulis wajib diwangsuli migunakake aksara jawa jumbuh instruksi <br>6. menawa wangsulan bener, mula petak lahan wis resmi dadi duwene klompok. <br>7. kepemilikan lemah ditandhani karo tiang arupa wayang lan nduweni kertu aset."
            },
            {
                num: 2,
                title: "Ngedol Aset",
                desc: "1. klompok kang menjual asete, entuk bali sacacah koin jumbuh karo rega tukune <br>2. kertu aset dibalekake lan tiang wayang diilangi saka petak."
            },
            {
                num: 3,
                title: "mlebu petak tantangan",
                desc: "1. klompok kang mlebu njero petak tantangan mula arep didhawuhake kanggo muter spin wheel kang isi tantangan. <br>2. kasil saka puteran spin wheel arep nemtokake tantangan apa kang arep diolehi dening klompok kasebut. "
            },
            {
                num: 4,
                title: "mlebu menyang petak/tlatah lawan ",
                desc: "1. klompok kang mandheg ing tlatah duwene lawan arep dikenakake denda 50% rega petak kasebut. <br>2. klompok kang mung ngliwati lahan/tlatah lawan ora dikenakake denda apa wae. "
            },
            {
                num: 5,
                title: "mlebu menyang jroning kunjara ",
                desc: "1. klompok oleh mlebu njero kunjara menawa mendarat ing petak bertanda kunjara sarta entuk kasil spin wheel mlebu kunjara. <br>2. klompok kang mlebu kunjara ora oleh nguncal dadu lawase 2 puteran giliran sarta ora bisa nuku lahan utawane numuti transaksi lawase masa tahanan.f <br>3. klompok oleh metu saka kunjara karo nunggu 2 giliran, njawab siji soal mligi, utawane mbayar denda saakeh 100 koin. <br>4. sawise metu saka kunjara, klompok oleh nerusake giliran kaya kulina wektu gilirane teka."
            }
        ],
        ctaBox: {
            quote: "Urip iku Urup",
            translation: "urip iku mesthine menehi paedah utawa madhangi kauripan wong liya ing wataraning awake dhewe",
            btnLabel: "Enggal Dolanan",
            btnHref: "file_game/index.html"
        }
    },

    // ========================================
    // 6. KONFIGURASI CREDIT TIM
    // ========================================
    credits: {
        title: "tim ingkang ngembangaken",
        desc: "gangsal ingkang ndamel utami ingkang mbekta ide, desain, lan teknologi kangge ndugikaken pengalaman edukasi budaya jawi puniki",
        people: [
            {
                name: "Agape Christian Anugerah",
                role: "Coding & Desain Visual",
                bio: "Merancang tampilan antarmuka, Gaya Visual, dan Elemen ilustratif yang mendukung nuansa Budaya Jawa.",
                photo: "assets/credits/agape.webp"
            },
            {
                name: "Raphael Pio Agastya",
                role: "Coding & Desain Visual",
                bio: "Menyiapkan materi pembelajaran, Narasi Bahasa Jawa, Serta penguatan konsep budaya dalam tiap bagian permainan.",
                photo: "assets/credits/pio.webp"
            },
            {
                name: "Azizah Nafsah Syahrani",
                role: "Research & Content Development",
                bio: "Menyusun konsep penelitian, mengembangkan instrumen penelitian, menyusun materi pembelajaran, serta menganalisis hasil penelitian.",
                photo: "assets/credits/azizah.webp"
            },
            {
                name: "Fatiha Aisha Nareswari",
                role: "Research & Educational Media Developer",
                bio: "Mengembangkan konsep penelitian, menyusun instrumen penelitian, merancang media dan materi pembelajaran, serta menganalisis data penelitian untuk mendukung inovasi pendidikan.",
                photo: "assets/credits/aisha.webp"
            },
            {
                name: "Panji Prasetya Budi",
                role: "Guru Pendamping & Koordinator Tim",
                bio: "Membantu memastikan materi pembelajaran sesuai dengan kurikulum dan kebutuhan siswa, serta memberikan masukan untuk pengembangan game.",
                photo: "assets/credits/panji.webp"
            },
            {
                name: "Tarrangga Rizal Ramadhan",
                role: "Guru Pendamping & Koordinator Tim",
                bio: "Membantu memastikan materi pembelajaran sesuai dengan kurikulum dan kebutuhan siswa, serta memberikan masukan untuk pengembangan game.",
                photo: "assets/credits/rangga.webp"
            }
        ]
    },

    // ========================================
    // 6. KONFIGURASI FOOTER
    // ========================================
    footer: {
        about: "Sinau Aksara Jawa luwih seru lan interaktif liwat Monopoli: Tata Strategi, Kumpulna Aset, Wasis Basane!",
        quote: "Urip iku Urup.",
        quoteTranslation: "(urip iku mesthine menehi paedah utawa madhangi kauripan wong liya ing wataraning awake dhewe)",
        philosophicalFooter: "Candrasangkala"
    }
};
