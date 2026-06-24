// ─── Firebase Config ──────────────────────────────────────────────────────────
// Using CDN compat SDK (firebase-app-compat, firebase-auth-compat, firebase-firestore-compat)
// These must be loaded via <script> tags BEFORE this file.
const firebaseConfig = {
  apiKey: "AIzaSyCaCZedH7kwA66X5eWQ5tvOV4Y5iKvCoVs",
  authDomain: "databasegr6.firebaseapp.com",
  projectId: "databasegr6",
  storageBucket: "databasegr6.firebasestorage.app",
  messagingSenderId: "958998111095",
  appId: "1:958998111095:web:f10a671b38e7779450f772",
  measurementId: "G-QRGHLKRJ4W"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ─── Auth Guard ───────────────────────────────────────────────────────────────
// Call on every page load. Redirects to login if no user is signed in.
// Returns a Promise that resolves with the current user when authenticated.
function authGuard() {
  return new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        location.href = 'đăng nhập.html';
      } else {
        resolve(user);
      }
    });
  });
}

// ─── Bottom Navigation ────────────────────────────────────────────────────────
// activePage: 'home' | 'rewards' | 'map' | 'profile'
function renderNav(activePage) {
  const nav = document.getElementById('bottom-nav');
  if (!nav) return;

  const pages = [
    { key: 'home',    href: 'trang chủ.html',           icon: 'home',             label: 'Trang chủ' },
    { key: 'rewards', href: 'tích điểm.html',            icon: 'stars',            label: 'Tích điểm' },
    { key: 'map',     href: 'bản đồ chỉ đường.html',     icon: 'map',              label: 'Bản đồ'    },
    { key: 'profile', href: 'profile.html',              icon: 'person',           label: 'Hồ sơ'     },
  ];

  nav.innerHTML = pages.map(p => {
    const active = p.key === activePage;
    return `
      <a href="${p.href}" class="flex flex-col items-center gap-0.5 px-4 py-2 ${active ? 'text-primary' : 'text-gray-400'} transition-colors">
        <span class="material-symbols-rounded text-[26px] ${active ? 'fill-1' : ''}">${p.icon}</span>
        <span class="text-[10px] font-semibold">${p.label}</span>
      </a>`;
  }).join('');
}

// ─── Traffic Level ────────────────────────────────────────────────────────────
// Returns busyness data for a given hour (0–23).
// Reflects realistic Vietnamese bubble tea shop traffic patterns.
function getTrafficLevel(hour) {
  const curves = [
    // hour: [percent, level]       level: 'empty' | 'moderate' | 'busy'
    [0,  5,  'empty'],
    [1,  5,  'empty'],
    [2,  5,  'empty'],
    [3,  5,  'empty'],
    [4,  5,  'empty'],
    [5,  8,  'empty'],
    [6, 15,  'empty'],
    [7, 20,  'empty'],
    [8, 25,  'empty'],
    [9, 30,  'empty'],
    [10, 40, 'empty'],
    [11, 60, 'moderate'],
    [12, 85, 'busy'],
    [13, 90, 'busy'],
    [14, 75, 'busy'],
    [15, 55, 'moderate'],
    [16, 50, 'moderate'],
    [17, 65, 'moderate'],
    [18, 80, 'busy'],
    [19, 88, 'busy'],
    [20, 75, 'busy'],
    [21, 50, 'moderate'],
    [22, 30, 'empty'],
    [23, 10, 'empty'],
  ];

  const [, percent, level] = curves[Math.min(hour, 23)];

  const meta = {
    empty:    { label: 'Vắng khách',    color: '#16a34a', bg: 'bg-green-100',  text: 'text-green-700',  dot: 'bg-green-500',  emoji: '😊' },
    moderate: { label: 'Vừa phải',      color: '#d97706', bg: 'bg-amber-100',  text: 'text-amber-700',  dot: 'bg-amber-400',  emoji: '🕐' },
    busy:     { label: 'Đông đúc',      color: '#dc2626', bg: 'bg-red-100',    text: 'text-red-700',    dot: 'bg-red-500',    emoji: '🔥' },
  }[level];

  return { level, percent, ...meta };
}

// ─── Vietnamese Accent Normalization ──────────────────────────────────────────
// Strips diacritics so "xuan thuy" matches "Xuân Thủy".
function normalizeVietnamese(str) {
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

// ─── Date Formatter ───────────────────────────────────────────────────────────
// Returns DD/MM/YYYY string from a Date object or Firestore Timestamp.
function formatDate(value) {
  const d = value?.toDate ? value.toDate() : new Date(value);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Relative time: "2 giờ trước", "hôm qua", etc.
function timeAgo(value) {
  const d = value?.toDate ? value.toDate() : new Date(value);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)   return 'Vừa xong';
  if (mins < 60)  return `${mins} phút trước`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)   return `${hrs} giờ trước`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return 'Hôm qua';
  return `${days} ngày trước`;
}

// ─── Toast Notifications ──────────────────────────────────────────────────────
// type: 'success' | 'error' | 'info'
function showToast(message, type = 'info') {
  const colors = {
    success: 'bg-green-600',
    error:   'bg-red-600',
    info:    'bg-gray-800',
  };
  const icons = {
    success: 'check_circle',
    error:   'error',
    info:    'info',
  };

  const el = document.createElement('div');
  el.className = `fixed top-4 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-2 px-4 py-3 rounded-full text-white text-sm font-semibold shadow-lg ${colors[type]} toast-enter`;
  el.innerHTML = `<span class="material-symbols-rounded text-[18px]">${icons[type]}</span>${message}`;
  document.body.appendChild(el);

  setTimeout(() => { el.classList.add('toast-exit'); }, 2500);
  setTimeout(() => el.remove(), 3000);
}

// ─── Referral Code Generator ──────────────────────────────────────────────────
// Produces a deterministic 6-char uppercase code from uid.
function generateReferralCode(uid) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    const charCode = uid.charCodeAt(i % uid.length) + i * 7;
    code += chars[charCode % chars.length];
  }
  return code;
}

// ─── Notification Helpers ─────────────────────────────────────────────────────
// Creates a notification document for the current user.
async function createNotification(uid, { title, body, type }) {
  await db.collection('notifications').add({
    userId: uid,
    title,
    body,
    type,
    read: false,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

// Loads unread notification count and updates the bell badge.
async function refreshNotificationBadge(uid) {
  try {
    // Single where clause only — no composite index needed; filter read=false client-side
    const snap = await db.collection('notifications')
      .where('userId', '==', uid)
      .get();
    const count = snap.docs.filter(d => !d.data().read).length;
    document.querySelectorAll('.notif-badge').forEach(el => {
      el.textContent = count;
      el.classList.toggle('hidden', count === 0);
    });
    return count;
  } catch (_) {
    return 0;
  }
}

// Checks conditions and creates notifications if warranted.
// Uses localStorage to track what was already sent today — avoids composite-index queries.
async function checkAndCreateNotifications(uid, userData) {
  try {
    const today  = new Date().toISOString().split('T')[0];
    const hour   = new Date().getHours();
    const sentKey = `mgx_notif_${uid}_${today}`;
    const sent   = JSON.parse(localStorage.getItem(sentKey) || '{}');

    // Streak reminder (evening only)
    if (hour >= 18 && !sent.streak_reminder) {
      const visitDates = userData.visitDates || [];
      if (!visitDates.includes(today)) {
        await createNotification(uid, {
          title: '🔥 Đừng để mất chuỗi!',
          body: `Bạn chưa ghé Mixue hôm nay. Còn ${24 - hour} giờ để giữ chuỗi ${userData.streak || 0} ngày!`,
          type: 'streak_reminder',
        });
        sent.streak_reminder = true;
      }
    }

    // Voucher expiry — single where, filter client-side
    if (!sent.voucher_expiry) {
      const threeDaysMs = Date.now() + 3 * 86400000;
      const snap = await db.collection('vouchers').where('userId', '==', uid).get();
      const expiring = snap.docs.filter(d => {
        const v = d.data();
        if (v.used) return false;
        const ts = v.expiresAt?.toDate?.() || new Date(v.expiresAt);
        return ts.getTime() <= threeDaysMs;
      });
      if (expiring.length > 0) {
        await createNotification(uid, {
          title: '🎁 Voucher sắp hết hạn!',
          body: `Bạn có ${expiring.length} voucher sẽ hết hạn trong 3 ngày. Dùng ngay kẻo tiếc!`,
          type: 'voucher_expiry',
        });
        sent.voucher_expiry = true;
      }
    }

    // Store quiet alert
    if (!sent.store_quiet && userData.notificationPrefs) {
      const traffic = getTrafficLevel(hour);
      if (traffic.level === 'empty') {
        const storeNames = {
          'xuan-thuy': 'Mixue Xuân Thủy', 'kim-ma': 'Mixue Kim Mã',
          'hang-bong': 'Mixue Hàng Bông', 'tay-son': 'Mixue Tây Sơn',
          'le-van-luong': 'Mixue Lê Văn Lương', 'minh-khai': 'Mixue Minh Khai',
          'nguyen-trai': 'Mixue Nguyễn Trãi',
        };
        const enabledStore = Object.entries(userData.notificationPrefs).find(([,v]) => v);
        if (enabledStore) {
          await createNotification(uid, {
            title: '😊 Cửa hàng đang vắng!',
            body: `${storeNames[enabledStore[0]] || enabledStore[0]} đang rất vắng. Ghé ngay để nhận x2 Snow Coins!`,
            type: 'store_quiet',
          });
          sent.store_quiet = true;
        }
      }
    }

    localStorage.setItem(sentKey, JSON.stringify(sent));
  } catch (_) {}
}

// ─── Notification Drawer ──────────────────────────────────────────────────────
// Injects and wires up the notification drawer. Call after authGuard resolves.
async function initNotificationDrawer(uid) {
  // Inject drawer HTML if not present
  if (!document.getElementById('notif-drawer')) {
    const drawer = document.createElement('div');
    drawer.id = 'notif-drawer';
    drawer.className = 'fixed inset-x-0 top-0 z-[150] bg-white shadow-2xl rounded-b-3xl transform -translate-y-full transition-transform duration-300 max-h-[80vh] overflow-y-auto';
    drawer.innerHTML = `
      <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white">
        <h2 class="font-bold text-lg text-gray-900">Thông báo</h2>
        <div class="flex items-center gap-3">
          <button id="notif-mark-read" class="text-xs text-primary font-semibold">Đánh dấu đã đọc</button>
          <button id="notif-close" class="material-symbols-rounded text-gray-500">close</button>
        </div>
      </div>
      <div id="notif-list" class="divide-y divide-gray-50 min-h-[100px]">
        <div class="flex items-center justify-center py-10 text-gray-400 text-sm">Đang tải...</div>
      </div>`;
    document.body.appendChild(drawer);

    document.getElementById('notif-close').onclick = closeNotifDrawer;
    document.getElementById('notif-mark-read').onclick = async () => {
      // Single where clause — no composite index needed; mark all as read
      const snap = await db.collection('notifications').where('userId', '==', uid).get();
      const batch = db.batch();
      snap.forEach(d => { if (!d.data().read) batch.update(d.ref, { read: true }); });
      await batch.commit();
      loadNotifications(uid);
      refreshNotificationBadge(uid);
    };
  }

  // Wire bell buttons
  document.querySelectorAll('.notif-bell').forEach(btn => {
    btn.onclick = () => toggleNotifDrawer(uid);
  });

  await refreshNotificationBadge(uid);
}

function toggleNotifDrawer(uid) {
  const drawer = document.getElementById('notif-drawer');
  if (!drawer) return;
  const isOpen = !drawer.classList.contains('-translate-y-full');
  if (isOpen) {
    closeNotifDrawer();
  } else {
    drawer.classList.remove('-translate-y-full');
    loadNotifications(uid);
  }
}

function closeNotifDrawer() {
  const drawer = document.getElementById('notif-drawer');
  if (drawer) drawer.classList.add('-translate-y-full');
}

async function loadNotifications(uid) {
  const list = document.getElementById('notif-list');
  if (!list) return;

  // Single where only — sort client-side to avoid composite index requirement
  const snap = await db.collection('notifications')
    .where('userId', '==', uid)
    .get();

  const sorted = snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0))
    .slice(0, 20);

  if (!sorted.length) {
    list.innerHTML = `<div class="flex flex-col items-center justify-center py-10 text-gray-400 text-sm gap-2">
      <span class="material-symbols-rounded text-4xl">notifications_off</span>Chưa có thông báo nào
    </div>`;
    return;
  }

  list.innerHTML = sorted.map(n => {
    const ago = n.createdAt ? timeAgo(n.createdAt) : '';
    return `<div class="flex gap-3 px-5 py-4 ${n.read ? 'bg-white' : 'bg-blue-50'}">
      <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-lg">${n.title.split(' ')[0]}</div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-semibold text-gray-900">${n.title.replace(/^.\s/, '')}</p>
        <p class="text-xs text-gray-500 mt-0.5">${n.body}</p>
        <p class="text-[10px] text-gray-400 mt-1">${ago}</p>
      </div>
    </div>`;
  }).join('');

  refreshNotificationBadge(uid);
}

// ─── Local Coins Cache (localStorage) ────────────────────────────────────────
// Stores snowCoins in localStorage so every page reads the latest value
// even when Firestore is slow, offline, or returns stale cached data.
function _coinsKey(uid) { return `mgx_sc_${uid}`; }
function _getLocalCoins(uid) {
  try {
    const v = localStorage.getItem(_coinsKey(uid));
    return v !== null ? parseInt(v, 10) : undefined;
  } catch (_) { return undefined; }
}
function _setLocalCoins(uid, coins) {
  try { localStorage.setItem(_coinsKey(uid), String(coins)); } catch (_) {}
}

// ─── Firestore Helpers ────────────────────────────────────────────────────────
async function getUserData(uid) {
  try {
    const doc = await db.collection('users').doc(uid).get();
    if (doc.exists) {
      const data = doc.data();
      // Prefer the locally-tracked coins (written by awardCoins/deductCoins)
      // over whatever Firestore returns — guards against stale reads after writes.
      const localCoins = _getLocalCoins(uid);
      if (localCoins !== undefined) data.snowCoins = localCoins;
      else _setLocalCoins(uid, data.snowCoins || 0); // first load — seed the local cache
      return data;
    }
    // Doc doesn't exist on server yet — return zeros with the local coin count
    const localCoins = _getLocalCoins(uid);
    return localCoins !== undefined ? { snowCoins: localCoins } : null;
  } catch (e) {
    console.warn('[Mixue GO] Firestore read failed:', e.code || e.message);
    // Return minimal object so pages can still render with local coins
    const localCoins = _getLocalCoins(uid);
    return localCoins !== undefined ? { snowCoins: localCoins } : null;
  }
}

async function updateUserData(uid, fields) {
  await db.collection('users').doc(uid).set(fields, { merge: true });
}

// Award Snow Coins and write a transaction record
async function awardCoins(uid, amount, description) {
  const batch = db.batch();
  batch.set(db.collection('users').doc(uid),
    { snowCoins: firebase.firestore.FieldValue.increment(amount) }, { merge: true });
  batch.set(db.collection('transactions').doc(), {
    userId: uid, type: 'earn', amount, description,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
  await batch.commit();
  // Immediately update the local coin cache so every page sees the new total
  _setLocalCoins(uid, (_getLocalCoins(uid) || 0) + amount);
}

// Deduct Snow Coins and write a transaction record
async function deductCoins(uid, amount, description) {
  // Always read current balance from Firestore for accuracy
  let current;
  try {
    const snap = await db.collection('users').doc(uid).get();
    current = snap.data()?.snowCoins ?? 0;
    _setLocalCoins(uid, current); // sync local cache with Firestore
  } catch (_) {
    current = _getLocalCoins(uid) ?? 0;
  }
  if (current < amount) throw new Error('Không đủ Snow Coins');

  const batch = db.batch();
  batch.set(db.collection('users').doc(uid),
    { snowCoins: firebase.firestore.FieldValue.increment(-amount) }, { merge: true });
  batch.set(db.collection('transactions').doc(), {
    userId: uid, type: 'redeem', amount, description,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
  await batch.commit();
  _setLocalCoins(uid, current - amount);
}

// Record a store visit (updates streak + visitDates)
async function recordVisit(uid) {
  const today = new Date().toISOString().split('T')[0];
  let data = {};
  try {
    const snap = await db.collection('users').doc(uid).get();
    data = snap.data() || {};
  } catch (_) {}

  const visitDates = data.visitDates || [];
  if (visitDates.includes(today)) return; // already visited today

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().split('T')[0];
  const newStreak = visitDates.includes(yStr) ? (data.streak || 0) + 1 : 1;

  await db.collection('users').doc(uid).set({
    visitDates: firebase.firestore.FieldValue.arrayUnion(today),
    streak: newStreak,
    lastVisitDate: firebase.firestore.FieldValue.serverTimestamp(),
  }, { merge: true });

  if (newStreak % 7 === 0) {
    await awardCoins(uid, 50, `Thưởng chuỗi ${newStreak} ngày 🔥`);
  }
  return newStreak;
}
