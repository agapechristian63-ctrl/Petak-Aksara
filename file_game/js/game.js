/** 
 * LOGIKA GAME PETHAK AKSARA JAWA
 */

let turn = 0;
let isMoving = false;
let propertyState = {};
let gameInterval = null;
let currentJailQuestion = null;
let pendingPropertyChoice = null;
let pendingChallengeChoice = null;
let pendingDanaUmumAction = null;
let lastSpinChallengeIndex = -1;
let introPopupShown = false;
const popupSeenByPlayer = {
    property: new Set(),
    danaUmum: new Set(),
    challenge: new Set(),
    freeParking: new Set(),
    pajakBaca: new Set()
};
const START_BONUS = 150;
const START_POSITION = 0;

function hasPassedStart(previousPos, nextPos) {
    return previousPos !== START_POSITION && nextPos === START_POSITION;
}

function shouldReceiveStartBonus(hasCrossedStart, finalPos) {
    return hasCrossedStart && finalPos !== START_POSITION;
}

function getPopupPlayerId(playerId = turn) {
    const resolvedValue = playerId && typeof playerId === 'object' && 'id' in playerId ? playerId.id : playerId;
    const numericId = Number(resolvedValue);

    if (Number.isInteger(numericId) && players.some((player) => player.id === numericId)) {
        return numericId;
    }

    const fallbackId = Number.isInteger(turn) ? turn : 0;
    return players.some((player) => player.id === fallbackId) ? fallbackId : 0;
}

function shouldShowPopup(type, playerId = turn, contextId = null) {
    if (type === 'intro') {
        return !introPopupShown;
    }

    const normalizedPlayerId = getPopupPlayerId(playerId);
    const bucket = popupSeenByPlayer[type];
    if (!bucket) return true;

    const key = type === 'property' && contextId !== null && contextId !== undefined
        ? `${type}:${normalizedPlayerId}:${contextId}`
        : `${type}:${normalizedPlayerId}`;

    return !bucket.has(key);
}

function markPopupSeen(type, playerId = turn, contextId = null) {
    if (type === 'intro') {
        introPopupShown = true;
        return;
    }

    const normalizedPlayerId = getPopupPlayerId(playerId);
    if (!popupSeenByPlayer[type]) {
        popupSeenByPlayer[type] = new Set();
    }

    const key = type === 'property' && contextId !== null && contextId !== undefined
        ? `${type}:${normalizedPlayerId}:${contextId}`
        : `${type}:${normalizedPlayerId}`;

    popupSeenByPlayer[type].add(key);
}

function resolveAssetPath(path) {
    if (!path) return path;
    return path.startsWith('assets/') ? `../${path}` : path;
}

function getJailPosition() {
    const jailIndex = boardData.findIndex((board) => board.name === 'PENJARA');
    if (jailIndex !== -1) return jailIndex;

    return boardData.findIndex((board) => board.type === 'jail_spot');
}

function consumeInventoryCard(player, cardType) {
    if (!Array.isArray(player.inventory)) return false;

    const cardIndex = player.inventory.findIndex((card) => {
        return card === cardType || card?.type === cardType;
    });
    if (cardIndex === -1) return false;

    player.inventory.splice(cardIndex, 1);
    return true;
}

function useFreeMovementCard(player) {
    return consumeInventoryCard(player, 'bebas_gerak');
}

function isDanaUmumJailCard(card) {
    return card.action === 'jail' || String(card.text || '').includes('Mlebu penjara');
}

const leftPopupSeen = new Set();

function getLeftPopupKey(type, contextId = null) {
    return String(type);
}

function shouldShowLeftTip(type, contextId = null) {
    return !leftPopupSeen.has(getLeftPopupKey(type, contextId));
}

function markLeftTipSeen(type, contextId = null) {
    leftPopupSeen.add(getLeftPopupKey(type, contextId));
}

function showLeftTip(type, notes, contextId = null) {
    if (!shouldShowLeftTip(type, contextId)) {
        return false;
    }

    setLeftPopupNotes(notes);
    openLeftPopup();
    markLeftTipSeen(type, contextId);
    return true;
}

function openLeftPopup() {
    const popup = document.getElementById('left-popup');
    if (popup) {
        popup.classList.add('is-visible');
    }
}

function closeLeftPopup() {
    const popup = document.getElementById('left-popup');
    if (popup) {
        popup.classList.remove('is-visible');
    }
}

function openRightAssetsPopup() {
    const popup = document.getElementById('right-assets-popup');
    if (popup) {
        popup.classList.add('is-visible');
    }
}

function closeRightAssetsPopup() {
    const popup = document.getElementById('right-assets-popup');
    if (popup) {
        popup.classList.remove('is-visible');
    }
}

function toggleRightAssetsPopup() {
    const popup = document.getElementById('right-assets-popup');
    if (popup) {
        popup.classList.toggle('is-visible');
    }
}

function findBoardByAsset(assetName) {
    if (!assetName) return null;

    const byName = boardData.find((item) => item.name === assetName);
    if (byName) return byName;

    const numericId = Number(assetName);
    if (!Number.isNaN(numericId)) {
        return boardData.find((item) => item.id === numericId) || null;
    }

    return null;
}

function getPropertySellValue(board) {
    if (!board || board.type !== 'property') return 0;

    if (board.sell !== undefined) {
        return Math.max(1, board.sell);
    }

    if (board.sellPrice !== undefined) {
        return Math.max(1, board.sellPrice);
    }

    if (PROPERTY_SELL_OVERRIDES[board.id] !== undefined) {
        return Math.max(1, PROPERTY_SELL_OVERRIDES[board.id]);
    }

    return Math.max(1, Math.floor((board.price || 0) * PROPERTY_SELL_RATIO));
}

function renderOwnedAssets() {
    const container = document.getElementById('right-assets-content');
    if (!container) return;

    const markup = players.map((player) => {
        const assets = player.ownedProperties || [];
        const assetList = assets.length
            ? assets.map(asset => {
                const board = findBoardByAsset(asset);
                const assetPos = board ? boardData.findIndex((item) => item.name === asset) : -1;
                const isOwnedByActivePlayer = player.id === turn;
                const sellValue = assetPos >= 0 ? getPropertySellValue(board) : 0;
                return `
                    <div class="flex items-center justify-between gap-2 rounded-lg bg-white/10 px-2 py-1">
                        <span class="asset-pill asset-clickable" onclick="showAssetCardPopup('${asset.replace(/'/g, "\\'")}')">🏠 ${asset}</span>
                        <div class="flex items-center gap-1">
                            <button class="rounded bg-sky-500/90 px-2 py-1 text-[10px] font-bold text-white hover:bg-sky-600 ${isOwnedByActivePlayer ? '' : 'opacity-70'}" onclick="showAssetCardPopup('${asset.replace(/'/g, "\\'")}')">
                                Kartu
                            </button>
                            <button class="rounded bg-red-500/90 px-2 py-1 text-[10px] font-bold text-white hover:bg-red-600 ${isOwnedByActivePlayer ? '' : 'opacity-70'}" onclick="sellProperty('${asset.replace(/'/g, "\\'")}', ${player.id})">
                                Jual${sellValue > 0 ? ` ${sellValue} Koin` : ''}
                            </button>
                        </div>
                    </div>
                `;
            }).join('')
            : '<div class="asset-empty">Dereng wonten aset</div>';

        return `
            <div class="asset-player-card">
                <div class="flex items-center gap-2 mb-2">
                    <span class="w-2.5 h-2.5 rounded-full" style="background:${player.color}"></span>
                    <span class="font-bold uppercase text-[10px]">${player.name}</span>
                </div>
                <div class="space-y-1">${assetList}</div>
            </div>
        `;
    }).join('');

    container.innerHTML = markup;
}

function sellProperty(assetName, playerId = turn) {
    const player = players[playerId];
    if (!player) return;
    if (player.id !== turn) {
        window.alert('Hanya pemain yang sedang giliran yang bisa menjual properti.');
        return;
    }

    const assetIndex = (player.ownedProperties || []).indexOf(assetName);
    if (assetIndex === -1) return;

    const board = findBoardByAsset(assetName);
    if (!board || board.type !== 'property') return;

    const sellValue = getPropertySellValue(board);
    const confirmSell = window.confirm(`Jual ${assetName} seharga ${sellValue} koin?`);
    if (!confirmSell) return;

    const pos = boardData.findIndex((item) => item.name === assetName);
    if (pos !== -1) {
        const currentOwner = propertyState[pos]?.owner;
        if (currentOwner === playerId) {
            delete propertyState[pos];
            const tag = document.getElementById(`tag-${pos}`);
            if (tag) {
                tag.style.backgroundColor = '';
            }
            const cell = document.getElementById(`cell-${pos}`);
            if (cell) {
                cell.style.backgroundColor = '';
            }
        }
    }

    player.money += sellValue;
    player.ownedProperties.splice(assetIndex, 1);
    renderOwnedAssets();
    updateUI();
}

function setLeftPopupNotes(notes) {
    const container = document.getElementById('left-popup-notes');
    if (!container) return;
    container.innerHTML = notes.map(note => `
        <div class="bg-amber-900/90 border border-amber-500 p-3 rounded-xl text-[11px] leading-relaxed">
            ${note}
        </div>
    `).join('');
}

function closeGameModal() {
    const modal = document.getElementById('game-modal');
    const inner = document.getElementById('modal-inner');
    if (inner) {
        inner.classList.remove('asset-card-modal');
    }
    if (modal) {
        modal.style.display = 'none';
    }
}

function showAssetCardPopup(assetName) {
    const board = findBoardByAsset(assetName);
    if (!board) return;

    const inner = document.getElementById('modal-inner');
    if (inner) {
        inner.classList.add('asset-card-modal');
    }

    const frontImage = resolveAssetPath(board.frontImage || board.image || '');
    const backImage = resolveAssetPath(board.backImage || board.image || '');
    const fallbackFront = !frontImage ? 'Gambar depan kartu belum tersedia di config.' : '';
    const fallbackBack = !backImage ? 'Gambar belakang kartu belum tersedia di config.' : '';

    inner.innerHTML = `
        <div class="asset-card-wrapper">
            <div class="flip-card mx-auto" onclick="toggleAssetCardFlip()">
                <div class="flip-card-inner" id="asset-card-inner">
                    <div class="flip-card-front">
                        ${frontImage ? `<img src="${frontImage}" alt="${board.name} - depan" class="asset-card-image">` : `<div class="asset-card-empty">${fallbackFront}</div>`}
                    </div>
                    <div class="flip-card-back">
                        ${backImage ? `<img src="${backImage}" alt="${board.name} - belakang" class="asset-card-image">` : `<div class="asset-card-empty">${fallbackBack}</div>`}
                    </div>
                </div>
            </div>
        </div>
        <button class="asset-close-btn" onclick="closeGameModal()">Tutup</button>
    `;

    document.getElementById('game-modal').style.display = 'flex';
}

function toggleAssetCardFlip() {
    const cardInner = document.getElementById('asset-card-inner');
    if (cardInner) {
        cardInner.classList.toggle('is-flipped');
    }
}

function init() {
    const grid = document.getElementById('grid');
    let propertyImageIndex = 0;

    boardData.forEach((board, i) => {
        const coord = pathCoords[i];
        const cell = document.createElement('div');
        cell.id = `cell-${i}`; 
        cell.className = 'petak';
        cell.style.gridColumn = coord.x; 
        cell.style.gridRow = coord.y;
        
        const usesPropertyImage = board.type === 'property' || board.type === 'pajak-baca';
        const fallbackImage = usesPropertyImage && propertyImageAssets[propertyImageIndex]
            ? propertyImageAssets[propertyImageIndex]
            : null;

        if (board.image || fallbackImage) {
            const imagePath = resolveAssetPath(board.image || fallbackImage);
            cell.classList.add('petak-image-cell');
            cell.style.backgroundImage = `url("${imagePath}")`;
            cell.innerHTML = `<div class="owner-tag" id="tag-${i}"></div>`;
        } else if (board.type === 'property') {
            const aksara = aksaraMap[board.name] || "";
            cell.innerHTML = `
                <div class="aksara-label">${aksara}</div>
                <div class="name-label">${board.name}</div>
                <div class="price-label">${board.price} Koin</div>
                <div class="owner-tag" id="tag-${i}"></div>
            `;
        } else {
            cell.innerHTML = `<div class="font-bold text-[0.6rem] uppercase text-amber-900">${board.name}</div>`;
        }

        if (usesPropertyImage) {
            propertyImageIndex++;
        }
        grid.appendChild(cell);
    });

    const container = document.getElementById('pion-container');
    players.forEach(p => {
        const pEl = document.createElement('div');
        pEl.id = `pion-${p.id}`; 
        pEl.className = 'pion'; 
        pEl.style.color = p.color;

        if (p.image) {
            pEl.classList.add('has-image');
            pEl.innerHTML = `<img src="${resolveAssetPath(p.image)}" alt="${p.name}" class="pion-image-element">`;
        } else {
            pEl.innerHTML = `<div class="pion-visual"><div class="pawn-head"></div><div class="pawn-body"></div></div>`;
        }

        container.appendChild(pEl);
    });

    document.addEventListener('mousemove', (e) => {
        const spotlight = document.getElementById('spotlight');
        if (spotlight) {
            spotlight.style.setProperty('--x', e.clientX + 'px');
            spotlight.style.setProperty('--y', e.clientY + 'px');
        }
    });

    updateUI();
    renderOwnedAssets();

    if (shouldShowPopup('intro')) {
        openRightAssetsPopup();
        setLeftPopupNotes([
            'Kocok dadu kangge mlampah. wangsuli tantangan aksara jawi ing saben petak kangge mertahanaken posisi lan menangaken dolanan!',
            'Saben pamain badhe angsal 700 koin ing wiwitan dolanan'
        ]);
        openLeftPopup();
        markPopupSeen('intro');
    }

    requestAnimationFrame(() => setTimeout(updatePions, 500));
}

function updatePions() {
    const grid = document.getElementById('grid');
    if (!grid) return;
    const cellWidth = grid.offsetWidth / 9;
    const cellHeight = grid.offsetHeight / 9;
    const offsets = [{dx:-6,dy:-6},{dx:6,dy:-6},{dx:-6,dy:6},{dx:6,dy:6}];

    players.forEach((p, idx) => {
        const el = document.getElementById(`pion-${p.id}`);
        const coord = pathCoords[p.pos];
        const targetX = (coord.x - 1) * cellWidth + (cellWidth / 2) + offsets[idx].dx;
        const targetY = (coord.y - 1) * cellHeight + (cellHeight / 2) + offsets[idx].dy;
        el.style.left = `${targetX}px`;
        el.style.top = `${targetY}px`;
    });
}

function updateUI() {
    const list = document.getElementById('player-list');
    list.innerHTML = ''; 
    players.forEach(p => {
        const card = document.createElement('div');
        card.className = `player-card ${turn === p.id ? 'active' : ''}`;
        card.innerHTML = `
            <div class="flex justify-between items-center mb-1">
                <span class="font-bold uppercase text-[10px]">${p.name}</span>
                <div class="w-3 h-3 rounded-full" style="background:${p.color}"></div>
            </div>
            <div class="text-xl font-mono font-bold text-amber-400">${p.money} Koin</div>
        `;
        list.appendChild(card);
    });
    renderOwnedAssets();
}

async function rollDice() {
    if(isMoving) return;
    isMoving = true;
    document.getElementById('roll-btn').disabled = true;
    
    const dice = Math.floor(Math.random() * 6) + 1;
    const overlay = document.getElementById('dice-overlay');
    const cube = document.getElementById('dice-cube');
    
    overlay.style.display = 'flex';
    cube.classList.add('is-rolling');

    setTimeout(() => {
        cube.classList.remove('is-rolling');
        const rotations = { 1: {x:0,y:0}, 2: {x:0,y:-90}, 3: {x:-90,y:0}, 4: {x:90,y:0}, 5: {x:0,y:90}, 6: {x:0,y:180} };
        cube.style.transform = `rotateX(${rotations[dice].x + 720}deg) rotateY(${rotations[dice].y + 720}deg)`;

        setTimeout(async () => {
            overlay.style.display = 'none';
            cube.style.transform = '';
            
            const p = players[turn];
            let hasCrossedStart = false;
            for(let i=0; i<dice; i++) {
                const previousPos = p.pos;
                p.pos = (p.pos + 1) % boardData.length;

                if (hasPassedStart(previousPos, p.pos)) {
                    hasCrossedStart = true;
                }

                updatePions();
                await new Promise(r => setTimeout(r, 200));
            }

            if (shouldReceiveStartBonus(hasCrossedStart, p.pos)) {
                p.money += START_BONUS;
            }

            handleLanding(p.pos);
        }, 1300);
    }, 600);
}

function showFreeParkingChoice() {
    const inner = document.getElementById('modal-inner');
    const p = players[turn];

    inner.innerHTML = `
        <div class="mb-2 text-amber-600 font-bold uppercase text-xs tracking-widest">Bebas Parkir</div>
        <div class="text-5xl mb-4">🅿️</div>
        <h2 class="text-2xl font-bold mb-2">Pilih Petak Tujuan</h2>
        <p class="text-sm text-slate-600 mb-4">${p.name} Saged milih petak ingkang panjenengan kersaaken kanthi logika monopoli.</p>
        <div class="max-h-[50vh] overflow-y-auto space-y-2 pr-1">
            ${boardData.map((board, idx) => `
                <button class="w-full text-left p-3 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 transition-colors" onclick="moveToTile(${idx})">
                    <div class="font-semibold text-sm">${board.name}</div>
                    <div class="text-[11px] text-slate-500">${board.type === 'property' ? `Properti • ${board.price} Koin` : board.type === 'card' ? 'Tantangan' : board.type === 'dana-umum' ? 'Dana Umum' : 'Spesial'}</div>
                </button>
            `).join('')}
        </div>
    `;

    document.getElementById('game-modal').style.display = 'flex';
}

function moveToTile(targetPos) {
    const p = players[turn];
    p.pos = targetPos;
    updatePions();
    document.getElementById('game-modal').style.display = 'none';
    handleLanding(targetPos);
}

function handleLanding(pos) {
    const board = boardData[pos];
    if (!board) {
        setTimeout(nextTurn, 500);
        return;
    }

    updatePions();

    if (board.id === 17 || board.name === 'BEBAS PARKIR') {
        showFreeParkingChoice();
        return;
    }

    if (board.type === 'pajak-baca') {
        startPajakBacaQuestion(pos);
        return;
    }

    if (board.type === 'jail_spot') {
        const p = players[turn];
        if (useFreeMovementCard(p)) {
            p.inJail = false;
            p.jailTurns = 0;

            const inner = document.getElementById('modal-inner');
            inner.innerHTML = `
                <div class="text-5xl mb-4">🔓</div>
                <h2 class="text-2xl font-bold mb-2">Panjenengan sampun bebas!</h2>
                <p class="text-gray-600 text-sm mb-6">Panjenengan saged nglajengaken dolanan malih amargi panjenengan ngagungani kartu bebas gerak.</p>
                <button class="w-full p-4 bg-amber-600 text-white rounded-xl font-bold shadow-lg hover:bg-amber-700 transition-colors" onclick="lanjutSetelahBebasGerak()">LAJENGAKEN</button>
            `;
            document.getElementById('game-modal').style.display = 'flex';
            updateUI();
            return;
        }

        if (!p.hasJailFreeCard) {
            p.inJail = true;
            p.jailTurns = JAIL_TURNS;
            p.pos = pos; // Tetap di lokasi penjara untuk visual
            updatePions();
            setTimeout(() => tampilkanPilihanPenjara(p), 600);
            return;
        }
    }

    if (board.type === 'card') {
        // TANTANGAN khusus: tampilkan spin wheel untuk pilih soal dari pool 8 soal
        startChallengeWheel(pos);
        return;
    }

    if(board.type === 'property') {
        const state = propertyState[pos];
        if(!state) showPropertyDecision(pos);
        else {
            if(state.owner !== turn) {
                const owner = players[state.owner];
                const p = players[turn];
                p.money -= board.rent;
                owner.money += board.rent;
            }
            nextTurn();
        }
    } else if (board.type === 'dana-umum') {
        startDanaUmum(pos);
    } else {
        setTimeout(nextTurn, 500);
    }
}

function lanjutSetelahBebasGerak() {
    document.getElementById('game-modal').style.display = 'none';
    document.getElementById('roll-btn').disabled = false;
    isMoving = false;
    updateUI();
}

function showPropertyDecision(pos) {
    const board = boardData[pos];
    const inner = document.getElementById('modal-inner');

    inner.innerHTML = `
        <div class="mb-2 text-amber-600 font-bold uppercase text-xs tracking-widest">Petak: ${board.name}</div>
        <div class="text-5xl mb-4">🏠</div>
        <h2 class="text-2xl font-bold mb-2">Tumbas utawi Nglangkungi?</h2>
        <p class="text-gray-600 mb-6">rega properti iki yaiku <strong>${board.price} Koin</strong>.</p>
        <button class="w-full p-4 bg-green-600 text-white rounded-xl font-bold shadow-lg hover:bg-green-700 transition-colors mb-3" onclick="startPropertyQuestion(${pos})">TUMBAS</button>
        <button class="w-full p-4 bg-gray-100 text-gray-500 rounded-xl font-bold hover:bg-gray-200 transition-colors" onclick="nextTurn()">NGLANGKUNGI</button>
    `;

    document.getElementById('game-modal').style.display = 'flex';
    showLeftTip('property-tip', [
        'Pamain saged tumbas petak ingkang dipunlangkungi kanthi mangsuli pitakon lan migunakaken koin kanggo tumbas petak.'
    ]);
}

function startPajakBacaQuestion(pos) {
    const board = boardData[pos];
    const playerId = turn;

    if (!shouldShowPopup('pajakBaca', playerId)) {
        const randomIdx = Math.floor(Math.random() * board.questions.length);
        const soal = board.questions[randomIdx];
        const timeLeft = board.timer || 120;
        pendingPropertyChoice = { pos, question: soal.q, timer: timeLeft };
        beginPajakBacaTimer();
        return;
    }

    markPopupSeen('pajakBaca', playerId);
    const randomIdx = Math.floor(Math.random() * board.questions.length);
    const soal = board.questions[randomIdx];
    const timeLeft = board.timer || 120;
    pendingPropertyChoice = { pos, question: soal.q, timer: timeLeft };

    renderPajakBacaPreStart();
    document.getElementById('game-modal').style.display = 'flex';
    showLeftTip('pajak-baca-tip', [
        'Pajak Baca: pamain badhe maos aksara Jawa lan ngantos instruksi guru sasampunipun rampung maos.'
    ]);
}

function renderPajakBacaPreStart() {
    const board = boardData[pendingPropertyChoice.pos];
    const inner = document.getElementById('modal-inner');
    inner.innerHTML = `
        <div class="mb-2 text-amber-600 font-bold uppercase text-xs tracking-widest">Petak: ${board.name}</div>
        <div class="text-5xl mb-4">📘</div>
        <h2 class="text-2xl font-bold mb-3">Pajak Baca</h2>
        <div class="bg-amber-50 p-6 rounded-2xl border-2 border-dashed border-amber-200 mb-6">
            <p class="text-lg italic text-amber-900">"${pendingPropertyChoice.question}"</p>
        </div>
        <button class="w-full p-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-colors" onclick="beginPajakBacaTimer()">MIWITI MACA</button>
    `;
}

function beginPajakBacaTimer() {
    if (gameInterval) clearInterval(gameInterval);
    let timeLeft = pendingPropertyChoice.timer || 120;
    const inner = document.getElementById('modal-inner');

    const updateTimerModal = () => {
        inner.innerHTML = `
            <div class="mb-2 text-amber-600 font-bold uppercase text-xs tracking-widest">Pajak Baca</div>
            <div class="timer-ring" id="tax-read-timer">${timeLeft}</div>
            <h2 class="text-2xl font-bold mb-3">Wacanen Aksara Jawa</h2>
            <div class="bg-amber-50 p-6 rounded-2xl border-2 border-dashed border-amber-200 mb-6">
                <p class="text-lg italic text-amber-900">"${pendingPropertyChoice.question}"</p>
                <p class="mt-4 text-sm text-slate-600">Pencet Rampung Maca menawi sampun rampung sadèrèngipun wekdal entek.</p>
            </div>
            <button class="w-full p-4 bg-amber-600 text-white rounded-xl font-bold shadow-lg hover:bg-amber-700 transition-colors" onclick="finishPajakBacaEarly()">RAMPUNG MACA</button>
        `;
    };

    updateTimerModal();
    gameInterval = setInterval(() => {
        timeLeft--;
        const display = document.getElementById('tax-read-timer');
        if (display) display.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            gameInterval = null;
            renderPajakBacaReview();
        }
    }, 1000);
}

function finishPajakBacaEarly() {
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
    }
    renderPajakBacaReview();
}

function renderPajakBacaReview() {
    const board = boardData[pendingPropertyChoice.pos];
    const inner = document.getElementById('modal-inner');

    inner.innerHTML = `
        <div class="mb-2 text-amber-600 font-bold uppercase text-xs tracking-widest">Pajak Baca</div>
        <div class="text-5xl mb-4">✅❌</div>
        <h2 class="text-2xl font-bold mb-3">Rampungaken Maos</h2>
        <div class="bg-amber-50 p-6 rounded-2xl border-2 border-dashed border-amber-200 mb-4">
            <p class="text-lg italic text-amber-900">"${pendingPropertyChoice.question}"</p>
            <p class="mt-4 text-sm text-slate-600">Guru saged langsung ngevaluasi maosane kanthi tombol ing ngandhap punika.</p>
        </div>
        <div class="grid grid-cols-2 gap-3">
            <button class="w-full p-4 bg-green-600 text-white rounded-xl font-bold shadow-lg hover:bg-green-700 transition-colors" onclick="answerPajakBacaQuestion(true)">LERES</button>
            <button class="w-full p-4 bg-red-600 text-white rounded-xl font-bold shadow-lg hover:bg-red-700 transition-colors" onclick="answerPajakBacaQuestion(false)">LEPAT</button>
        </div>
    `;
}

function answerPajakBacaQuestion(isCorrect) {
    if (gameInterval) { clearInterval(gameInterval); gameInterval = null; }
    const p = players[turn];
    p.money = Number(p.money) || 0;
    const choice = pendingPropertyChoice;
    pendingPropertyChoice = null;

    const inner = document.getElementById('modal-inner');

    if (isCorrect) {
        // Jawaban benar: tidak ada perubahan koin (tidak dikurangi maupun ditambah)
        updateUI();
        inner.innerHTML = `
            <div class="text-5xl mb-4">✅</div>
            <h2 class="text-2xl font-bold mb-2">Kasil Maos!</h2>
            <p class="text-gray-600 mb-4">Ora ana potongan koin. Tetep aman.</p>
            <p class="font-bold text-green-600">Saldo sapunika: ${p.money} Koin</p>
        `;
    } else {
        // Jawaban salah: kurangi 100 koin
        p.money = Number(p.money) - 100;
        updateUI();
        inner.innerHTML = `
            <div class="text-5xl mb-4">❌</div>
            <h2 class="text-2xl font-bold mb-2">Durung Kasil</h2>
            <p class="text-gray-600 mb-4">Pemain dikurangi <strong>100 Koin</strong> amarga durung bisa maca.</p>
            <p class="font-bold text-red-600">Saldo sapunika: ${p.money} Koin</p>
        `;
    }

    setTimeout(() => {
        renderOwnedAssets();
        openRightAssetsPopup();
        nextTurn();
    }, 1500);
}

function startPropertyQuestion(pos) {
    const board = boardData[pos];
    const questions = board.questions;
    const randomIdx = Math.floor(Math.random() * questions.length);
    const soal = questions[randomIdx];

    let timeLeft = board.timer || DEFAULT_TIMER;
    pendingPropertyChoice = { pos, question: soal.q, answer: soal.a };

    const inner = document.getElementById('modal-inner');

    const updateModalContent = (time) => {
        inner.innerHTML = `
            <div class="mb-2 text-amber-600 font-bold uppercase text-xs tracking-widest">Petak: ${board.name}</div>
            <div class="timer-ring" id="timer-display">${time}</div>
            <h2 class="text-2xl font-bold mb-4">Tantangan Aksara</h2>
            <div class="bg-amber-50 p-6 rounded-2xl border-2 border-dashed border-amber-200 mb-6">
                <p class="text-lg italic text-amber-900">"${soal.q}"</p>
            </div>
            <button class="w-full p-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-colors" onclick="prepareAnswerCheck()">PRIKSA WANGSULAN</button>
        `;
    };

    updateModalContent(timeLeft);
    document.getElementById('game-modal').style.display = 'flex';

    if(gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(() => {
        timeLeft--;
        const display = document.getElementById('timer-display');
        if(display) display.innerText = timeLeft;

        if(timeLeft <= 0) {
            clearInterval(gameInterval);
            gameInterval = null;
            pendingPropertyChoice = null;
            inner.innerHTML = `
                <div class="text-5xl mb-4">⏰</div>
                <h2 class="text-2xl font-bold mb-2">Wektu Entèk!</h2>
                <p class="text-gray-600 mb-6">Boten saged mangsuli nalika wekdalipun sampun telas</p>
                <button class="w-full p-4 bg-amber-600 text-white rounded-xl font-bold" onclick="nextTurn()">terusake</button>
            `;
        }
    }, 1000);
}

function prepareAnswerCheck() {
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
    }
    const inner = document.getElementById('modal-inner');
    const board = boardData[pendingPropertyChoice.pos];
    const answerText = pendingPropertyChoice.answer || 'Ora kasedhiya';

    inner.innerHTML = `
        <div class="mb-2 text-amber-600 font-bold uppercase text-xs tracking-widest">Petak: ${board.name}</div>
        <div class="text-5xl mb-4">✍️</div>
        <h2 class="text-2xl font-bold mb-3">Priksa Wangsulan</h2>
        <div class="bg-amber-50 p-6 rounded-2xl border-2 border-dashed border-amber-200 mb-4">
            <p class="text-lg italic text-amber-900">Wangsulan ingkang leres:</p>
            <p class="mt-3 text-base font-semibold text-slate-800">${answerText}</p>
        </div>
        <div class="grid grid-cols-2 gap-3">
            <button class="w-full p-4 bg-green-600 text-white rounded-xl font-bold shadow-lg hover:bg-green-700 transition-colors" onclick="answerPropertyQuestion(true)">LERES</button>
            <button class="w-full p-4 bg-red-600 text-white rounded-xl font-bold shadow-lg hover:bg-red-700 transition-colors" onclick="answerPropertyQuestion(false)">LEPAT</button>
        </div>
    `;
}

function answerPropertyQuestion(isCorrect) {
    if(gameInterval) clearInterval(gameInterval);

    const p = players[turn];
    const choice = pendingPropertyChoice;
    pendingPropertyChoice = null;

    if (!choice) {
        nextTurn();
        return;
    }

    const board = boardData[choice.pos];

    if (isCorrect) {
        if (p.money >= board.price) {
            p.money -= board.price;
            p.ownedProperties = p.ownedProperties || [];
            if (!p.ownedProperties.includes(board.name)) {
                p.ownedProperties.push(board.name);
            }
            propertyState[choice.pos] = { owner: turn };
            const cell = document.getElementById(`cell-${choice.pos}`);
            if (cell) cell.style.backgroundColor = 'rgba(251, 191, 36, 0.1)';
            const tag = document.getElementById(`tag-${choice.pos}`);
            if (tag) tag.style.backgroundColor = p.color;

            renderOwnedAssets();
            openRightAssetsPopup();
            const inner = document.getElementById('modal-inner');
            inner.innerHTML = `
                <div class="text-5xl mb-4">✅</div>
                <h2 class="text-2xl font-bold mb-2">Jawaban Leres!</h2>
                <p class="text-gray-600 mb-4">Properti ${board.name} Sapunika Gadhahipun Sampeyan</p>
                <p class="font-bold text-green-600">Sisa koin: ${p.money}</p>
            `;
            setTimeout(nextTurn, 1500);
        } else {
            const inner = document.getElementById('modal-inner');
            inner.innerHTML = `
                <div class="text-5xl mb-4">⚠️</div>
                <h2 class="text-2xl font-bold mb-2">Koin Mboten Cekap</h2>
                <p class="text-gray-600 mb-4">Sampeyan Mboten Saged Tumbas Properti Puniki</p>
            `;
            setTimeout(nextTurn, 1500);
        }
    } else {
        const inner = document.getElementById('modal-inner');
        inner.innerHTML = `
            <div class="text-5xl mb-4">❌</div>
            <h2 class="text-2xl font-bold mb-2">Wangsulan Lepat</h2>
            <p class="text-gray-600 mb-4">Sampeyan Mboten Sios Tumbas Properti Puniki</p>
        `;
        setTimeout(nextTurn, 1500);
    }
}

// --------- Spin-wheel Tantangan (8 soal) ---------
function startChallengeWheel(pos) {
    const board = boardData[pos];
    const playerId = turn;

    if (!shouldShowPopup('challenge', playerId)) {
        const randomIdx = Math.floor(Math.random() * spinChallengeQuestions.length);
        const question = spinChallengeQuestions[randomIdx];
        startChallengeQuestion(pos, question, randomIdx + 1);
        return;
    }

    markPopupSeen('challenge', playerId);
    const inner = document.getElementById('modal-inner');

    inner.innerHTML = `
        <div class="mb-2 text-amber-600 font-bold uppercase text-xs tracking-widest">Petak: ${board.name}</div>
        <div class="text-5xl mb-3">🎡</div>
        <h2 class="text-2xl font-bold mb-3">Putar Roda Tantangan</h2>
        <p class="text-sm text-slate-600 mb-3">Rodha puniki gadhah 8 nomor. Puter kangge nemtukaken soal ingkang muncul</p>
        <div class="spin-wheel relative">
            <div class="spin-indicator"></div>
            <div class="wheel" id="spin-wheel-svg" style="transition: transform 4s cubic-bezier(.17,.67,.34,1);">
                ${[...Array(8)].map((_,i)=>`<div class="wheel-segment" data-label="${i+1}"><span class="segment-number">${i+1}</span></div>`).join('')}
            </div>
        </div>
        <div class="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800">
            Nomer ingkang muncul badhe dipuntampilaken wekdal soal dipunwiwiti
        </div>
        <div class="mt-4">
            <button class="w-full p-3 bg-amber-600 text-white rounded-xl font-bold" id="spin-btn" onclick="performSpin(${pos})">PUTER</button>
        </div>
    `;

    document.getElementById('game-modal').style.display = 'flex';
    showLeftTip('challenge-tip', ["Puter rodha kangge nemtokaken pitakenan tantangan. Wonten kemungkinan wolu pitakenan."]);
}

function getNextChallengeIndex() {
    const total = spinChallengeQuestions.length;
    if (total <= 1) return 0;

    let nextIndex = Math.floor(Math.random() * total);
    let attempts = 0;
    while (nextIndex === lastSpinChallengeIndex && attempts < total) {
        nextIndex = Math.floor(Math.random() * total);
        attempts++;
    }

    lastSpinChallengeIndex = nextIndex;
    return nextIndex;
}

function performSpin(pos) {
    const wheel = document.getElementById('spin-wheel-svg');
    const spinBtn = document.getElementById('spin-btn');
    if (!wheel || !spinBtn) return;
    spinBtn.disabled = true;

    const segments = 8;
    const chosen = getNextChallengeIndex();
    const segmentAngle = 360 / segments;
    const randomOffset = (segmentAngle / 2); // land near center of segment
    const rotations = 4; // full spins
    const finalDeg = rotations * 360 + (360 - (chosen * segmentAngle) - (segmentAngle/2));

    wheel.style.transform = `rotate(${finalDeg}deg)`;

    // wait for the transition to finish (approx 4s)
    setTimeout(() => {
        onSpinComplete(chosen, pos);
    }, 4200);
}

function onSpinComplete(index, pos) {
    const question = spinChallengeQuestions[index % spinChallengeQuestions.length];
    const wheel = document.getElementById('spin-wheel-svg');
    if (wheel) {
        Array.from(wheel.children).forEach(c => c.classList.remove('selected'));
        const seg = wheel.children[index];
        if (seg) seg.classList.add('selected');
    }
    startChallengeQuestion(pos, question, index + 1);
}

function startChallengeQuestion(pos, soal, selectedNumber = 1) {
    if(gameInterval) clearInterval(gameInterval);
    let timeLeft = DEFAULT_TIMER || 30;
    pendingChallengeChoice = {
        pos,
        question: soal.q,
        answer: soal.a,
        selectedNumber,
        reward: soal.reward || 0,
        penalty: soal.penalty || 0,
        action: soal.action || null,
        effect: soal.effect || 0,
        mode: soal.mode || null
    };

    const inner = document.getElementById('modal-inner');
    const updateModal = (t) => {
        inner.innerHTML = `
            <div class="mb-2 text-amber-600 font-bold uppercase text-xs tracking-widest">Tantangan</div>
            <div class="timer-ring" id="challenge-timer">${t}</div>
            <h2 class="text-2xl font-bold mb-3">Wangsuli Tantangan</h2>
            <div class="mb-3 rounded-2xl border border-amber-200 bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-800">
                Nomor asiling puteran: <span class="text-lg">${selectedNumber}</span>
            </div>
            <div class="bg-amber-50 p-6 rounded-2xl border-2 border-dashed border-amber-200 mb-6">
                <p class="text-lg italic text-amber-900">"${soal.q}"</p>
            </div>
            <div class="grid grid-cols-2 gap-3">
                <button class="w-full p-4 bg-green-600 text-white rounded-xl font-bold shadow-lg hover:bg-green-700 transition-colors" onclick="answerChallengeQuestion(true)">LERES</button>
                <button class="w-full p-4 bg-red-600 text-white rounded-xl font-bold shadow-lg hover:bg-red-700 transition-colors" onclick="answerChallengeQuestion(false)">LEPAT</button>
            </div>
        `;
    };

    updateModal(timeLeft);
    document.getElementById('game-modal').style.display = 'flex';

    gameInterval = setInterval(() => {
        timeLeft--;
        const d = document.getElementById('challenge-timer');
        if (d) d.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            gameInterval = null;
            pendingChallengeChoice = null;
            const inner2 = document.getElementById('modal-inner');
            inner2.innerHTML = `
                <div class="text-5xl mb-4">⏰</div>
                <h2 class="text-2xl font-bold mb-2">Wektu Entek!</h2>
                <p class="text-gray-600 mb-6">Panjenengan dhereng mangsuli nalika wekdal sampun entek.</p>
                <button class="w-full p-4 bg-amber-600 text-white rounded-xl font-bold" onclick="nextTurn()">LAJENGAKEN</button>
            `;
        }
    }, 1000);
}

function answerChallengeQuestion(isCorrect) {
    if (gameInterval) { clearInterval(gameInterval); gameInterval = null; }
    const choice = pendingChallengeChoice;
    pendingChallengeChoice = null;
    if (!choice) { nextTurn(); return; }

    const p = players[turn];

    if (isCorrect) {
        if (choice.action === 'money') {
            p.money += Number(choice.effect || 0);
        } else if (choice.action === 'move') {
            applyCardEffect(p, { action: 'move', effect: Number(choice.effect || 0) });
        } else if (choice.action === 'swap') {
            applyCardEffect(p, { action: 'swap', mode: choice.mode });
        } else if (choice.action === 'skip_turn') {
            applyCardEffect(p, { action: 'skip_turn', effect: Number(choice.effect || 0) });
        } else if (choice.action === 'move_to_start') {
            applyCardEffect(p, { action: 'move_to_start' });
        } else if (choice.action === 'jail') {
            applyCardEffect(p, { action: 'jail' });
        } else if (choice.reward > 0) {
            p.money += choice.reward;
        }
    } else if (choice.penalty > 0) {
        p.money = Math.max(0, p.money - choice.penalty);
    }

    const inner = document.getElementById('modal-inner');
    let effectMessage = '';

    if (isCorrect) {
        if (choice.action === 'money') {
            effectMessage = `<p class="mt-3 text-sm font-semibold text-green-700">Efek: tambah ${Number(choice.effect || 0)} koin.</p>`;
        } else if (choice.action === 'move') {
            const steps = Number(choice.effect || 0);
            effectMessage = `<p class="mt-3 text-sm font-semibold text-amber-700">Efek: ${steps >= 0 ? 'maju' : 'mundur'} ${Math.abs(steps)} langkah.</p>`;
        } else if (choice.action === 'swap') {
            effectMessage = `<p class="mt-3 text-sm font-semibold text-amber-700">Ijol panggenan kaliyan pemain sanesipun.</p>`;
        } else if (choice.action === 'skip_turn') {
            effectMessage = `<p class="mt-3 text-sm font-semibold text-amber-700">Nilaraken setunggal giliran.</p>`;
        } else if (choice.action === 'move_to_start') {
            effectMessage = `<p class="mt-3 text-sm font-semibold text-amber-700">Balik ning awal!</p>`;
        } else if (choice.action === 'jail') {
            effectMessage = `<p class="mt-3 text-sm font-semibold text-amber-700">Mlebu Kunjara.</p>`;
        } else if (choice.reward > 0) {
            effectMessage = `<p class="mt-3 text-sm font-semibold text-green-700">Tambah ${choice.reward} koin.</p>`;
        }
    }

    inner.innerHTML = `
        <div class="text-5xl mb-4">${isCorrect ? '✅' : '❌'}</div>
        <h2 class="text-2xl font-bold mb-3">${isCorrect ? 'Wangsulan Sampeyan Leres' : 'Wangsulan Sampeyan Lepet'}</h2>
        <div class="bg-amber-50 p-6 rounded-2xl border-2 border-dashed border-amber-200 mb-4">
            <p class="text-lg italic text-amber-900">Wangsulan Ingkang Leres</p>
            <p class="mt-3 text-base font-semibold text-slate-800">${choice.answer}</p>
            ${effectMessage}
        </div>
        <button class="w-full p-4 bg-amber-600 text-white rounded-xl font-bold" onclick="nextTurn()">LAJENGAKEN</button>
    `;
    updateUI();
}

function applyCardEffect(player, card) {
    if (card.action === 'move') {
        const steps = Number(card.effect || 0);
        player.pos = (player.pos + steps + boardData.length) % boardData.length;
        updatePions();
        return true;
    }

    if (card.action === 'move_to_start') {
        player.pos = 0;
        updatePions();
        return true;
    }

    if (card.action === 'swap') {
        const others = players.filter((candidate) => candidate.id !== player.id);
        let target = null;

        if (card.mode === 'closest') {
            target = others.reduce((best, candidate) => {
                if (!best) return candidate;
                const currentDistance = Math.abs(candidate.pos - player.pos);
                const bestDistance = Math.abs(best.pos - player.pos);
                return currentDistance < bestDistance ? candidate : best;
            }, null);
        } else {
            target = others.reduce((best, candidate) => {
                if (!best) return candidate;
                const currentDistance = Math.abs(candidate.pos - player.pos);
                const bestDistance = Math.abs(best.pos - player.pos);
                return currentDistance > bestDistance ? candidate : best;
            }, null);
        }

        if (target) {
            const tempPos = player.pos;
            player.pos = target.pos;
            target.pos = tempPos;
            updatePions();
        }
        return true;
    }

    if (card.action === 'skip_turn') {
        player.skipTurn = (player.skipTurn || 0) + (Number(card.effect) || 0);
        return true;
    }

    if (card.action === 'jail') {
        player.inJail = true;
        player.jailTurns = JAIL_TURNS;
        return true;
    }

    return false;
}

function startDanaUmum(pos) {
    const board = boardData[pos];
    if (!board.cards || board.cards.length === 0) {
        setTimeout(nextTurn, 500);
        return;
    }

    const randomIdx = Math.floor(Math.random() * board.cards.length);
    const card = board.cards[randomIdx];
    const p = players[turn];
    const sendsPlayerToJail = isDanaUmumJailCard(card);

    pendingDanaUmumAction = sendsPlayerToJail
        ? { playerId: p.id, action: 'jail' }
        : null;

    let subText = "";

    if (card.action === "money") {
        p.money += card.effect;
        if (p.money < 0) p.money = 0;

        if (card.effect >= 0) {
            subText = `<p class="text-xl font-mono font-bold mt-3 text-green-600">+ ${card.effect} Koin</p>`;
        } else {
            subText = `<p class="text-xl font-mono font-bold mt-3 text-red-600">- ${Math.abs(card.effect)} Koin</p>`;
        }
    } else if (card.action === "keep") {
        if (!p.inventory) p.inventory = [];
        p.inventory.push(card.type);
        subText = `<p class="text-sm font-bold mt-3 text-amber-700">💼 Kartu disimpen ing kantong pemain</p>`;
    } else {
        const applied = applyCardEffect(p, card);
        if (applied) {
            subText = `<p class="text-sm font-bold mt-3 text-amber-700">⚙️ Efek kartu sampun diproses</p>`;
        }
    }

    const inner = document.getElementById('modal-inner');
    inner.innerHTML = `
        <div class="mb-2 text-amber-600 font-bold uppercase text-xs tracking-widest">Petak: ${board.name}</div>
        <div class="text-5xl mb-4">📜</div>
        <h2 class="text-2xl font-bold mb-4 font-[Cinzel]">Dana Umum</h2>
        <div class="bg-amber-50 p-6 rounded-2xl border-2 border-dashed border-amber-200 mb-6">
            <p class="text-lg italic text-amber-900">"${card.text}"</p>
            ${subText}
        </div>
        <button class="w-full p-4 bg-amber-600 text-white rounded-xl font-bold shadow-lg hover:bg-amber-700 transition-colors" 
                onclick="selesaikanDanaUmum()">Pendhet  &  Lajengaken</button>
    `;

    document.getElementById('game-modal').style.display = 'flex';
    showLeftTip('dana-umum-tip', [
        'Pemain ingkang ngidak petak dana umum badhe pikantuk kasempatan kangge nambah utawi ngirangi koin'
    ]);

    updateUI();
}

function selesaikanDanaUmum() {
    const pendingAction = pendingDanaUmumAction;
    pendingDanaUmumAction = null;
    const player = players[turn];

    if (!player || !pendingAction || pendingAction.playerId !== player.id) {
        nextTurn();
        return;
    }

    const jailPosition = getJailPosition();
    if (pendingAction.action === 'jail' && jailPosition !== -1) {
        player.pos = jailPosition;
        player.inJail = true;
        player.jailTurns = JAIL_TURNS;
        updatePions();
        updateUI();
        tampilkanPilihanPenjara(player);
        return;
    }

    nextTurn();
}

function nextTurn() {
    if(gameInterval) clearInterval(gameInterval);
    document.getElementById('game-modal').style.display = 'none';

    turn = (turn + 1) % players.length;
    isMoving = false;

    const p = players[turn];
    if ((p.skipTurn || 0) > 0) {
        p.skipTurn--;
        turn = (turn + 1) % players.length;
        const nextPlayer = players[turn];
        if (nextPlayer && nextPlayer.inJail) {
            document.getElementById('roll-btn').disabled = true;
            updateUI();
            setTimeout(() => {
                tampilkanPilihanPenjara(nextPlayer);
            }, 400);
            return;
        }
        document.getElementById('roll-btn').disabled = false;
        updateUI();
        return;
    }

    if (p.inJail) {
        document.getElementById('roll-btn').disabled = true;
        updateUI();
        setTimeout(() => {
            tampilkanPilihanPenjara(p);
        }, 400);
        return;
    }

    document.getElementById('roll-btn').disabled = false;
    updateUI();
}

function tampilkanPilihanPenjara(player) {
    const inner = document.getElementById('modal-inner');
    if (player.jailTurns === undefined || player.jailTurns <= 0) {
        player.jailTurns = JAIL_TURNS;
    }

    inner.innerHTML = `
        <div class="mb-2 text-red-600 font-bold uppercase text-xs tracking-widest">Mlebu Kunjara</div>
        <div class="text-5xl mb-4">⛓️</div>
        <h2 class="text-2xl font-bold mb-2 font-[Cinzel]">Mlebu Kunjara!</h2>
        <p class="text-sm text-gray-600 mb-4">Sisa giliran kunjara: <strong>${player.jailTurns}</strong></p>
        <div class="bg-amber-50 p-4 rounded-xl border border-amber-200 mb-6 text-sm text-amber-900 italic">
            Sampeyan ora bisa ngocok dadu lan transaksi sajroning tahanan.
        </div>
        <button class="w-full p-4 bg-red-600 text-white rounded-xl font-bold shadow-lg hover:bg-red-700 transition-colors mb-3" onclick="bayarDendaPenjara()">BAYAR DENDA (${JAIL_FINE} Koin)</button>
        <button class="w-full p-4 bg-gray-500 text-white rounded-xl font-bold hover:bg-gray-600 transition-colors" onclick="tungguGiliranPenjara()">TUNGGU 2 GILIRAN</button>
    `;

    document.getElementById('game-modal').style.display = 'flex';
    showLeftTip('jail-tip', [
        'Pemain ingkang wonten ing kunjara saged milih mbayar denda utawi ngentosi 2 giliran.'
    ]);
}

function bayarDendaPenjara() {
    const p = players[turn];
    if (p.money >= JAIL_FINE) {
        p.money -= JAIL_FINE;
        p.inJail = false;
        p.jailTurns = 0;

        const inner = document.getElementById('modal-inner');
        inner.innerHTML = `
            <div class="text-5xl mb-4">🔓</div>
            <h2 class="text-2xl font-bold mb-2">Sampun Bebas!</h2>
            <p class="text-gray-600 text-sm">Dhendhanipun sampun dipunbayar. Panjenengan saged nglajengaken dolanan punika.</p>
        `;
        setTimeout(() => {
            document.getElementById('game-modal').style.display = 'none';
            document.getElementById('roll-btn').disabled = false;
            isMoving = false;
            updateUI();
        }, 1500);
    } else {
        alert("Yatra panjenengan mboten cekap kangge mbayar dhendha!");
    }
}

function tungguGiliranPenjara() {
    const p = players[turn];
    p.jailTurns--;
    if (p.jailTurns <= 0) {
        p.inJail = false;
        const inner = document.getElementById('modal-inner');
        inner.innerHTML = `
            <div class="text-5xl mb-4">🕊️</div>
            <h2 class="text-2xl font-bold mb-2">Masa Hukuman Sampun Paripurna!</h2>
            <p class="text-gray-600 text-sm">Sampeyan bebas saiki. Panjenengan saged nglajengaken dolanan punika.</p>
        `;
        setTimeout(nextTurn, 1500);
    } else {
        const inner = document.getElementById('modal-inner');
        inner.innerHTML = `
            <div class="text-5xl mb-4">⏳</div>
            <h2 class="text-2xl font-bold mb-2">Tunggu Giliran</h2>
            <p class="text-gray-600 text-sm">Sesaning giliranipun tahanan: <strong>${p.jailTurns}</strong>.</p>
        `;
        setTimeout(nextTurn, 1500);
    }
}

function goBack() {
    window.location.href = '../index.html';
}

function showScoreboard() {
    const sortedPlayers = [...players].sort((a, b) => b.money - a.money);
    const rows = sortedPlayers.map((p, idx) => {
        return `
            <div class="mb-3 rounded-2xl border border-amber-300/20 bg-amber-950/20 p-3 text-left">
                <div class="text-sm uppercase tracking-[0.18em] text-amber-300 font-semibold">Peringkat ${idx + 1}</div>
                <div class="text-lg font-bold text-white">${p.name}</div>
            </div>
        `;
    }).join('');

    const inner = document.getElementById('modal-inner');
    const modal = document.getElementById('game-modal');
    inner.innerHTML = `
        <div class="mb-3 text-amber-500 font-bold uppercase text-xs tracking-[0.24em]">Daftar Peringkat</div>
        <div class="text-4xl mb-3 text-amber-300">🏆</div>
        <div class="scoreboard-list space-y-2 mb-4">
            ${rows}
        </div>
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button class="w-full p-3 bg-slate-800 text-amber-200 rounded-xl font-bold hover:bg-slate-700 transition-colors" onclick="closeScoreboard()">Balik</button>
            <button class="w-full p-3 bg-amber-600 text-slate-950 rounded-xl font-bold hover:bg-amber-500 transition-colors" onclick="restartGame()">Miwiti Maneh</button>
        </div>
    `;
    const content = modal.querySelector('.modal-content');
    if (content) {
        content.classList.add('scoreboard-modal');
    }

    document.getElementById('game-modal').style.display = 'flex';
    document.getElementById('roll-btn').disabled = true;
}

function closeScoreboard() {
    const modal = document.getElementById('game-modal');
    const content = modal.querySelector('.modal-content');
    if (content) {
        content.classList.remove('scoreboard-modal');
    }
    modal.style.display = 'none';
    document.getElementById('roll-btn').disabled = false;
}

function restartGame() {
    window.location.reload();
}

window.addEventListener('resize', updatePions);
window.onload = init;
