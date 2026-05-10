import { useState, useEffect, useRef } from "react";

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const MENU = [
  { id: 1, name: "Espresso", category: "Coffee", price: 120, img: "☕", desc: "Bold, rich single shot", stock: 50, ingredients: ["espresso beans", "water"] },
  { id: 2, name: "Cappuccino", category: "Coffee", price: 180, img: "🫖", desc: "Espresso with velvety foam", stock: 40, ingredients: ["espresso beans", "milk", "water"] },
  { id: 3, name: "Cold Brew", category: "Coffee", price: 220, img: "🧋", desc: "Steeped 12h, silky smooth", stock: 30, ingredients: ["espresso beans", "ice", "water"] },
  { id: 4, name: "Mocha Latte", category: "Coffee", price: 250, img: "🍫", desc: "Chocolate meets espresso", stock: 25, ingredients: ["espresso beans", "milk", "chocolate syrup"] },
  { id: 5, name: "Avocado Toast", category: "Food", price: 180, img: "🥑", desc: "Sourdough, avo, poached egg", stock: 20, ingredients: ["sourdough", "avocado", "eggs"] },
  { id: 6, name: "Croissant", category: "Food", price: 120, img: "🥐", desc: "Buttery, flaky, fresh baked", stock: 35, ingredients: ["flour", "butter", "yeast"] },
  { id: 7, name: "Blueberry Muffin", category: "Food", price: 90, img: "🫐", desc: "Bursting with wild blueberries", stock: 28, ingredients: ["flour", "blueberries", "butter", "eggs"] },
  { id: 8, name: "Filter Coffee Powder", category: "Powder", price: 350, img: "🫙", desc: "250g premium Arabica blend", stock: 60, ingredients: [] },
  { id: 9, name: "Espresso Blend 500g", category: "Powder", price: 650, img: "🫘", desc: "Dark roast, intense flavor", stock: 45, ingredients: [] },
  { id: 10, name: "Green Tea Latte", category: "Beverages", price: 200, img: "🍵", desc: "Ceremonial matcha, oat milk", stock: 22, ingredients: ["matcha", "oat milk"] },
  { id: 11, name: "Fresh Lime Soda", category: "Beverages", price: 100, img: "🍋", desc: "Zesty, chilled, refreshing", stock: 40, ingredients: ["lime", "soda water", "sugar"] },
];

const STORES = [
  { id: 1, name: "Koramangala", address: "80 Feet Road, Koramangala, Bangalore", lat: 12.9352, lng: 77.6245, distance: "1.2 km", open: true },
  { id: 2, name: "Indiranagar", address: "100 Feet Road, Indiranagar, Bangalore", lat: 12.9784, lng: 77.6408, distance: "3.4 km", open: true },
  { id: 3, name: "Mantri Mall", address: "Mantri Square Mall, Malleshwaram, Bangalore", lat: 13.0032, lng: 77.5710, distance: "5.1 km", open: false },
  { id: 4, name: "Whitefield", address: "ITPL Road, Whitefield, Bangalore", lat: 12.9698, lng: 77.7499, distance: "14.2 km", open: true },
];

const PROMOTIONS = [
  { id: 1, title: "Lunch Combo", desc: "Any coffee + snack at ₹249", icon: "🌮", time: "12–3 PM" },
  { id: 2, title: "Morning Boost", desc: "2nd espresso free before 10 AM", icon: "☀️", time: "7–10 AM" },
  { id: 3, title: "Birthday Special", desc: "Free cake slice on your birthday!", icon: "🎂", time: "All day" },
];

// ─── UTILS ───────────────────────────────────────────────────────────────────
const formatCurrency = (n) => `₹${n}`;
const timeOfDay = () => {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  return "evening";
};

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const clicking = useRef(false);
  const hovering = useRef(false);
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    const onDown = () => {
      clicking.current = true;
      if (dotRef.current) dotRef.current.style.transform += " scale(0.7)";
      if (ringRef.current) { ringRef.current.style.width = "20px"; ringRef.current.style.height = "20px"; ringRef.current.style.borderColor = "#c4722a"; }
    };
    const onUp = () => {
      clicking.current = false;
      if (ringRef.current) { ringRef.current.style.width = ""; ringRef.current.style.height = ""; ringRef.current.style.borderColor = ""; }
    };
    const onEnter = (e) => {
      if (e.target.matches("button, a, input, select, [style*='cursor: pointer'], .card")) {
        hovering.current = true;
        if (ringRef.current) { ringRef.current.style.width = "56px"; ringRef.current.style.height = "56px"; ringRef.current.style.borderColor = "#c4722a"; ringRef.current.style.background = "rgba(196,114,42,0.08)"; }
      }
    };
    const onLeave = (e) => {
      if (e.target.matches("button, a, input, select, [style*='cursor: pointer'], .card")) {
        hovering.current = false;
        if (ringRef.current) { ringRef.current.style.width = ""; ringRef.current.style.height = ""; ringRef.current.style.borderColor = ""; ringRef.current.style.background = ""; }
      }
    };

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    return () => {
      cancelAnimationFrame(raf.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div ref={dotRef} style={{
        position: "fixed", top: 0, left: 0, zIndex: 99999, pointerEvents: "none",
        width: 8, height: 8, borderRadius: "50%",
        background: "#c4722a",
        marginLeft: -4, marginTop: -4,
        transition: "transform 0.08s ease",
        mixBlendMode: "difference",
        willChange: "transform",
      }} />
      {/* Ring */}
      <div ref={ringRef} style={{
        position: "fixed", top: 0, left: 0, zIndex: 99998, pointerEvents: "none",
        width: 36, height: 36, borderRadius: "50%",
        border: "1.5px solid rgba(196,114,42,0.7)",
        background: "rgba(196,114,42,0.04)",
        marginLeft: -18, marginTop: -18,
        transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease",
        willChange: "transform",
        backdropFilter: "blur(1px)",
        boxShadow: "0 0 12px rgba(196,114,42,0.25), inset 0 0 8px rgba(196,114,42,0.05)",
      }} />
    </>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState(MENU);
  const [notification, setNotification] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  const showNotif = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
    showNotif(`${item.name} added to cart`);
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((c) => c.id !== id));
  const updateQty = (id, delta) => setCart((prev) =>
    prev.map((c) => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c)
  );

  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  const placeOrder = (storeId, mode) => {
    const order = {
      id: `ORD${Date.now()}`,
      items: [...cart],
      total: cartTotal,
      store: STORES.find((s) => s.id === storeId),
      mode,
      status: "Confirmed",
      time: new Date().toLocaleTimeString(),
    };
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    setPage("orders");
    showNotif("Order placed successfully! ☕");
  };

  const login = (userData) => {
    setUser(userData);
    setPage("home");
    showNotif(`Welcome back, ${userData.name}! Good ${timeOfDay()} ☕`);
  };

  const logout = () => { setUser(null); setPage("home"); };

  const nav = (p) => setPage(p);

  return (
    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", minHeight: "100vh", background: "#0f0a06", color: "#f5ede0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; cursor: none !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f0a06; }
        ::-webkit-scrollbar-thumb { background: #7c4a1e; border-radius: 3px; }
        body { overflow-x: hidden; }
        .dm { font-family: 'DM Sans', sans-serif; }
        .btn-primary {
          background: linear-gradient(135deg, #c4722a, #8b4513);
          color: #fff5eb;
          border: none;
          padding: 12px 28px;
          border-radius: 2px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(196,114,42,0.4); }
        .btn-ghost {
          background: transparent;
          color: #c4722a;
          border: 1px solid #c4722a;
          padding: 10px 24px;
          border-radius: 2px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s;
        }
        .btn-ghost:hover { background: #c4722a22; }
        .card {
          background: #1a1008;
          border: 1px solid #3a2010;
          border-radius: 4px;
          overflow: hidden;
          transition: all 0.3s;
        }
        .card:hover { border-color: #7c4a1e; transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.4); }
        .badge {
          background: #c4722a;
          color: white;
          font-size: 11px;
          font-family: 'DM Sans', sans-serif;
          padding: 2px 8px;
          border-radius: 20px;
          font-weight: 500;
        }
        .input {
          background: #1a1008;
          border: 1px solid #3a2010;
          color: #f5ede0;
          padding: 12px 16px;
          border-radius: 4px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          width: 100%;
          outline: none;
          transition: border-color 0.2s;
        }
        .input:focus { border-color: #c4722a; }
        .input::placeholder { color: #7c5a3a; }
        select.input { cursor: pointer; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.6; } }
        .animate-in { animation: fadeIn 0.4s ease both; }
        .grain {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.3;
        }
      `}</style>

      <CustomCursor />
      <div className="grain" />

      {/* TOP NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(15,10,6,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #2a1808", padding: "0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => nav("home")}>
            <span style={{ fontSize: 24 }}>☕</span>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 1, lineHeight: 1 }}>BREWNOVA</div>
              <div className="dm" style={{ fontSize: 9, letterSpacing: 3, color: "#7c5a3a", textTransform: "uppercase" }}>Coffee & Beyond</div>
            </div>
          </div>

          <div className="dm" style={{ display: "flex", gap: 4 }}>
            {[["home", "Home"], ["menu", "Menu"], ["stores", "Stores"], ["promotions", "Offers"]].map(([p, label]) => (
              <button key={p} onClick={() => nav(p)} style={{
                background: page === p ? "#c4722a22" : "transparent",
                color: page === p ? "#c4722a" : "#a08060",
                border: "none", padding: "8px 16px", borderRadius: 2, cursor: "pointer",
                fontSize: 13, letterSpacing: 0.5, fontFamily: "inherit",
                transition: "all 0.2s"
              }}>{label}</button>
            ))}
            {user && (
              <>
                <button onClick={() => nav("orders")} style={{ background: page === "orders" ? "#c4722a22" : "transparent", color: page === "orders" ? "#c4722a" : "#a08060", border: "none", padding: "8px 16px", borderRadius: 2, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>Orders</button>
                <button onClick={() => nav("inventory")} style={{ background: page === "inventory" ? "#c4722a22" : "transparent", color: page === "inventory" ? "#c4722a" : "#a08060", border: "none", padding: "8px 16px", borderRadius: 2, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>Inventory</button>
              </>
            )}
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button onClick={() => nav("cart")} style={{ position: "relative", background: "transparent", border: "1px solid #3a2010", padding: "8px 14px", borderRadius: 2, cursor: "pointer", color: "#f5ede0", fontSize: 16 }}>
              🛒
              {cartCount > 0 && <span className="badge" style={{ position: "absolute", top: -8, right: -8, fontSize: 10, padding: "1px 6px" }}>{cartCount}</span>}
            </button>
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="dm" style={{ fontSize: 13, color: "#c4722a" }}>Hi, {user.name.split(" ")[0]}</span>
                <button onClick={logout} className="btn-ghost" style={{ padding: "6px 14px", fontSize: 12 }}>Logout</button>
              </div>
            ) : (
              <button onClick={() => nav("login")} className="btn-primary" style={{ padding: "8px 20px", fontSize: 12 }}>Sign In</button>
            )}
          </div>
        </div>
      </nav>

      {/* NOTIFICATION */}
      {notification && (
        <div style={{
          position: "fixed", top: 80, right: 24, zIndex: 200,
          background: notification.type === "success" ? "#1a3a1a" : "#3a1a1a",
          border: `1px solid ${notification.type === "success" ? "#2d7a2d" : "#7a2d2d"}`,
          color: "#f5ede0", padding: "12px 20px", borderRadius: 4,
          fontFamily: "'DM Sans', sans-serif", fontSize: 14,
          animation: "slideIn 0.3s ease",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)"
        }}>
          {notification.msg}
        </div>
      )}

      {/* CHAT BOT */}
      <AIChatBot open={chatOpen} setOpen={setChatOpen} user={user} />

      {/* PAGES */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {page === "home" && <HomePage nav={nav} user={user} promotions={PROMOTIONS} tod={timeOfDay()} />}
        {page === "menu" && <MenuPage menu={inventory} addToCart={addToCart} nav={nav} />}
        {page === "stores" && <StoresPage stores={STORES} nav={nav} />}
        {page === "promotions" && <PromotionsPage promotions={PROMOTIONS} />}
        {page === "cart" && <CartPage cart={cart} removeFromCart={removeFromCart} updateQty={updateQty} cartTotal={cartTotal} stores={STORES} placeOrder={placeOrder} user={user} nav={nav} />}
        {page === "login" && <LoginPage login={login} nav={nav} />}
        {page === "orders" && <OrdersPage orders={orders} nav={nav} />}
        {page === "inventory" && <InventoryPage inventory={inventory} setInventory={setInventory} showNotif={showNotif} />}
      </div>

      {/* FAB Chat */}
      <button onClick={() => setChatOpen(true)} style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 150,
        width: 56, height: 56, borderRadius: "50%",
        background: "linear-gradient(135deg, #c4722a, #8b4513)",
        border: "none", cursor: "pointer", fontSize: 24,
        boxShadow: "0 8px 24px rgba(196,114,42,0.5)",
        transition: "transform 0.2s"
      }} title="AI Assistant">🤖</button>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ nav, user, promotions, tod }) {
  return (
    <div>
      {/* Hero */}
      <div style={{
        minHeight: "92vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "radial-gradient(ellipse at 30% 50%, #3d1c0622 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, #8b451322 0%, transparent 50%)",
        position: "relative", overflow: "hidden", padding: 24
      }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", border: "1px solid #2a1808", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", border: "1px solid #3a2010", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

        <div className="animate-in" style={{ textAlign: "center", maxWidth: 700, position: "relative" }}>
          <div className="dm" style={{ fontSize: 12, letterSpacing: 6, color: "#c4722a", textTransform: "uppercase", marginBottom: 24 }}>
            Good {tod} ☕ Premium Coffee Experience
          </div>
          <h1 style={{ fontSize: "clamp(48px, 8vw, 88px)", fontWeight: 700, lineHeight: 1.05, marginBottom: 24 }}>
            Crafted For<br />
            <em style={{ color: "#c4722a", fontStyle: "italic" }}>Coffee Lovers</em>
          </h1>
          <p className="dm" style={{ fontSize: 17, color: "#a08060", lineHeight: 1.7, marginBottom: 40, maxWidth: 480, margin: "0 auto 40px" }}>
            Order from your nearest store, pick up coffee powder, or get food delivered — all with AI-powered personalization.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => nav("menu")}>Explore Menu</button>
            <button className="btn-ghost" onClick={() => nav("stores")}>Find a Store</button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="dm" style={{ fontSize: 11, letterSpacing: 5, color: "#c4722a", textTransform: "uppercase", textAlign: "center", marginBottom: 16 }}>Why BrewNova</div>
        <h2 style={{ fontSize: 36, textAlign: "center", marginBottom: 56 }}>What Sets Us Apart</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {[
            { icon: "📍", title: "GPS Store Finder", desc: "Instantly locate the nearest BrewNova outlet and view live availability." },
            { icon: "🎯", title: "Smart Promotions", desc: "Personalized offers based on your location, time of day, and birthday." },
            { icon: "📦", title: "Inventory Tracking", desc: "Real-time stock management with recipe-based ingredient tracking." },
            { icon: "☕", title: "Coffee Powder Delivery", desc: "Order premium blends from any store and track via Google Maps." },
            { icon: "🔔", title: "Smart Notifications", desc: "Contextual nudges — lunch combos, evening specials, and more." },
            { icon: "🤖", title: "AI Assistant", desc: "Get personalized recommendations and help from our AI barista." },
          ].map((f, i) => (
            <div key={i} className="card animate-in" style={{ padding: 28, animationDelay: `${i * 0.08}s` }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 10 }}>{f.title}</div>
              <div className="dm" style={{ fontSize: 13, color: "#a08060", lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Promos strip */}
      <div style={{ background: "#1a1008", borderTop: "1px solid #2a1808", borderBottom: "1px solid #2a1808", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 24, overflowX: "auto", paddingBottom: 8 }}>
            {promotions.map((p) => (
              <div key={p.id} style={{ minWidth: 260, background: "linear-gradient(135deg, #2a1808, #1a1008)", border: "1px solid #3a2010", borderRadius: 4, padding: 24, flexShrink: 0 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{p.icon}</div>
                <div style={{ fontWeight: 600, marginBottom: 6 }}>{p.title}</div>
                <div className="dm" style={{ fontSize: 13, color: "#a08060", marginBottom: 8 }}>{p.desc}</div>
                <span className="badge">{p.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MENU PAGE ────────────────────────────────────────────────────────────────
function MenuPage({ menu, addToCart, nav }) {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const cats = ["All", "Coffee", "Food", "Beverages", "Powder"];
  const filtered = menu.filter((i) =>
    (cat === "All" || i.category === cat) &&
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
      <div className="dm" style={{ fontSize: 11, letterSpacing: 5, color: "#c4722a", textTransform: "uppercase", marginBottom: 8 }}>Our Menu</div>
      <h2 style={{ fontSize: 36, marginBottom: 32 }}>Every Sip, Every Bite</h2>

      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
        <input className="input" placeholder="Search menu..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ maxWidth: 260 }} />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={cat === c ? "btn-primary" : "btn-ghost"} style={{ padding: "8px 18px", fontSize: 12 }}>{c}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
        {filtered.map((item, i) => (
          <div key={item.id} className="card animate-in" style={{ animationDelay: `${i * 0.05}s` }}>
            <div style={{ background: "linear-gradient(135deg, #2a1808, #1a1008)", padding: "32px 0", textAlign: "center", fontSize: 56 }}>
              {item.img}
            </div>
            <div style={{ padding: "20px 20px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{item.name}</div>
                <span className="badge">{item.category}</span>
              </div>
              <div className="dm" style={{ fontSize: 13, color: "#a08060", marginBottom: 14, lineHeight: 1.5 }}>{item.desc}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#c4722a" }}>₹{item.price}</div>
                <div className="dm" style={{ fontSize: 11, color: item.stock > 10 ? "#4a9a4a" : "#9a4a4a" }}>
                  {item.stock > 10 ? `${item.stock} in stock` : item.stock > 0 ? "Low stock" : "Out of stock"}
                </div>
              </div>
              <button className="btn-primary" style={{ width: "100%", marginTop: 14 }} onClick={() => addToCart(item)} disabled={item.stock === 0}>
                {item.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="dm" style={{ textAlign: "center", color: "#7c5a3a", marginTop: 60, fontSize: 16 }}>No items found. Try a different search or category.</div>
      )}
    </div>
  );
}

// ─── STORES PAGE ──────────────────────────────────────────────────────────────
function StoresPage({ stores, nav }) {
  const [selected, setSelected] = useState(null);
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
      <div className="dm" style={{ fontSize: 11, letterSpacing: 5, color: "#c4722a", textTransform: "uppercase", marginBottom: 8 }}>Our Locations</div>
      <h2 style={{ fontSize: 36, marginBottom: 8 }}>Find Your Nearest Store</h2>
      <p className="dm" style={{ color: "#a08060", marginBottom: 36 }}>GPS-powered store discovery — we'll find what's closest to you.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
        {stores.map((store) => (
          <div key={store.id} className="card" style={{ padding: 24, cursor: "pointer", border: selected === store.id ? "1px solid #c4722a" : "1px solid #3a2010" }}
            onClick={() => setSelected(store.id === selected ? null : store.id)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ fontSize: 22, fontWeight: 600 }}>📍 {store.name}</div>
              <span style={{ background: store.open ? "#1a3a1a" : "#3a1a1a", color: store.open ? "#4a9a4a" : "#9a4a4a", fontSize: 11, padding: "3px 10px", borderRadius: 20, fontFamily: "'DM Sans',sans-serif" }}>
                {store.open ? "OPEN" : "CLOSED"}
              </span>
            </div>
            <div className="dm" style={{ fontSize: 13, color: "#a08060", marginBottom: 12 }}>{store.address}</div>
            <div className="dm" style={{ fontSize: 13, color: "#c4722a", marginBottom: 16 }}>📏 {store.distance} away</div>
            {selected === store.id && (
              <div style={{ borderTop: "1px solid #2a1808", paddingTop: 16, marginTop: 8 }}>
                <div className="dm" style={{ fontSize: 13, color: "#a08060", marginBottom: 12 }}>
                  🕐 Mon–Sat: 7AM – 10PM<br />
                  🕐 Sun: 8AM – 9PM<br />
                  📞 +91 98765 43210
                </div>
                <button className="btn-primary" style={{ width: "100%", fontSize: 12 }} onClick={() => nav("menu")}>Order from This Store</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Simulated map */}
      <div style={{ marginTop: 40, background: "#1a1008", border: "1px solid #3a2010", borderRadius: 4, height: 300, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
        <div style={{ fontSize: 48 }}>🗺️</div>
        <div className="dm" style={{ color: "#7c5a3a", fontSize: 14 }}>Interactive Google Maps Integration</div>
        <div className="dm" style={{ color: "#5c4a2a", fontSize: 12 }}>Stores plotted at coordinates with live distance calculation</div>
      </div>
    </div>
  );
}

// ─── PROMOTIONS PAGE ──────────────────────────────────────────────────────────
function PromotionsPage({ promotions }) {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
      <div className="dm" style={{ fontSize: 11, letterSpacing: 5, color: "#c4722a", textTransform: "uppercase", marginBottom: 8 }}>Exclusive Offers</div>
      <h2 style={{ fontSize: 36, marginBottom: 36 }}>Today's Promotions</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
        {[...promotions,
          { id: 4, title: "Evening Unwinder", desc: "Free cookie with any coffee after 5 PM", icon: "🌆", time: "5–8 PM" },
          { id: 5, title: "Weekend Brunch", desc: "Coffee + Avocado Toast combo at ₹299", icon: "🥞", time: "Sat–Sun 9–12" },
          { id: 6, title: "Loyalty Reward", desc: "Every 10th coffee is on us!", icon: "⭐", time: "Always" },
        ].map((p, i) => (
          <div key={p.id} className="card animate-in" style={{ padding: 32, animationDelay: `${i * 0.07}s` }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>{p.icon}</div>
            <h3 style={{ fontSize: 22, marginBottom: 10 }}>{p.title}</h3>
            <p className="dm" style={{ fontSize: 14, color: "#a08060", lineHeight: 1.6, marginBottom: 20 }}>{p.desc}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="badge">{p.time}</span>
              <button className="btn-ghost" style={{ padding: "6px 14px", fontSize: 11 }}>Claim</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CART PAGE ────────────────────────────────────────────────────────────────
function CartPage({ cart, removeFromCart, updateQty, cartTotal, stores, placeOrder, user, nav }) {
  const [storeId, setStoreId] = useState(1);
  const [mode, setMode] = useState("delivery");

  if (!user) return (
    <div style={{ maxWidth: 500, margin: "80px auto", textAlign: "center", padding: 24 }}>
      <div style={{ fontSize: 64, marginBottom: 24 }}>🔐</div>
      <h2 style={{ marginBottom: 16 }}>Sign in to order</h2>
      <p className="dm" style={{ color: "#a08060", marginBottom: 32 }}>Please log in to place your order and track deliveries.</p>
      <button className="btn-primary" onClick={() => nav("login")}>Sign In</button>
    </div>
  );

  if (cart.length === 0) return (
    <div style={{ maxWidth: 500, margin: "80px auto", textAlign: "center", padding: 24 }}>
      <div style={{ fontSize: 64, marginBottom: 24 }}>🛒</div>
      <h2 style={{ marginBottom: 16 }}>Your cart is empty</h2>
      <p className="dm" style={{ color: "#a08060", marginBottom: 32 }}>Add some delicious items from our menu!</p>
      <button className="btn-primary" onClick={() => nav("menu")}>Browse Menu</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
      <h2 style={{ fontSize: 36, marginBottom: 32 }}>Your Cart</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>
        <div>
          {cart.map((item) => (
            <div key={item.id} style={{ display: "flex", gap: 16, alignItems: "center", background: "#1a1008", border: "1px solid #3a2010", borderRadius: 4, padding: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 36 }}>{item.img}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.name}</div>
                <div className="dm" style={{ fontSize: 13, color: "#a08060" }}>{formatCurrency(item.price)} each</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => updateQty(item.id, -1)} style={{ background: "#2a1808", border: "1px solid #3a2010", color: "#f5ede0", width: 28, height: 28, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>−</button>
                <span className="dm" style={{ fontSize: 16, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)} style={{ background: "#2a1808", border: "1px solid #3a2010", color: "#f5ede0", width: 28, height: 28, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>+</button>
              </div>
              <div style={{ fontWeight: 700, color: "#c4722a", minWidth: 60, textAlign: "right" }}>{formatCurrency(item.price * item.qty)}</div>
              <button onClick={() => removeFromCart(item.id)} style={{ background: "transparent", border: "none", color: "#7c5a3a", cursor: "pointer", fontSize: 16 }}>✕</button>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: 28, alignSelf: "start" }}>
          <h3 style={{ fontSize: 20, marginBottom: 24 }}>Order Summary</h3>

          <div className="dm" style={{ fontSize: 13, color: "#a08060", marginBottom: 8 }}>Select Store</div>
          <select className="input" value={storeId} onChange={(e) => setStoreId(Number(e.target.value))} style={{ marginBottom: 16 }}>
            {stores.filter(s => s.open).map((s) => (
              <option key={s.id} value={s.id}>{s.name} — {s.distance}</option>
            ))}
          </select>

          <div className="dm" style={{ fontSize: 13, color: "#a08060", marginBottom: 8 }}>Delivery Mode</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            {["delivery", "pickup"].map((m) => (
              <button key={m} onClick={() => setMode(m)} className={mode === m ? "btn-primary" : "btn-ghost"} style={{ flex: 1, padding: "10px 0", fontSize: 12, textTransform: "capitalize" }}>
                {m === "delivery" ? "🚚 Delivery" : "🏪 Pickup"}
              </button>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #2a1808", paddingTop: 16, marginBottom: 24 }}>
            {cart.map((item) => (
              <div key={item.id} className="dm" style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#a08060", marginBottom: 6 }}>
                <span>{item.name} × {item.qty}</span>
                <span>{formatCurrency(item.price * item.qty)}</span>
              </div>
            ))}
            <div className="dm" style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#a08060", marginBottom: 6 }}>
              <span>Delivery fee</span><span>{mode === "delivery" ? "₹40" : "Free"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 700, color: "#c4722a", marginTop: 12 }}>
              <span>Total</span>
              <span>{formatCurrency(cartTotal + (mode === "delivery" ? 40 : 0))}</span>
            </div>
          </div>

          <button className="btn-primary" style={{ width: "100%" }} onClick={() => placeOrder(storeId, mode)}>
            Place Order — {formatCurrency(cartTotal + (mode === "delivery" ? 40 : 0))}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage({ login, nav }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", dob: "" });
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = () => {
    if (!form.email) return;
    login({ name: form.name || form.email.split("@")[0], email: form.email, phone: form.phone, dob: form.dob });
  };

  return (
    <div style={{ maxWidth: 420, margin: "64px auto", padding: "0 24px" }}>
      <div className="card" style={{ padding: 40 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>☕</div>
          <h2 style={{ fontSize: 24, marginBottom: 8 }}>{isRegister ? "Join BrewNova" : "Welcome Back"}</h2>
          <p className="dm" style={{ color: "#a08060", fontSize: 13 }}>{isRegister ? "Create your account" : "Sign in to your account"}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {isRegister && (
            <input className="input" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          )}
          <input className="input" placeholder="Email Address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="input" placeholder="Password" type="password" />
          {isRegister && (
            <>
              <input className="input" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <input className="input" placeholder="Date of Birth (for birthday offers!)" type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
            </>
          )}
          <button className="btn-primary" style={{ marginTop: 8 }} onClick={handleSubmit}>
            {isRegister ? "Create Account" : "Sign In"}
          </button>
        </div>

        <div className="dm" style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#7c5a3a" }}>
          {isRegister ? "Already have an account? " : "Don't have an account? "}
          <button onClick={() => setIsRegister(!isRegister)} style={{ background: "none", border: "none", color: "#c4722a", cursor: "pointer", fontFamily: "inherit", fontSize: 13 }}>
            {isRegister ? "Sign In" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ORDERS PAGE ──────────────────────────────────────────────────────────────
function OrdersPage({ orders, nav }) {
  if (orders.length === 0) return (
    <div style={{ maxWidth: 500, margin: "80px auto", textAlign: "center", padding: 24 }}>
      <div style={{ fontSize: 64, marginBottom: 24 }}>📋</div>
      <h2 style={{ marginBottom: 16 }}>No orders yet</h2>
      <p className="dm" style={{ color: "#a08060", marginBottom: 32 }}>Your order history will appear here.</p>
      <button className="btn-primary" onClick={() => nav("menu")}>Start Ordering</button>
    </div>
  );

  const statuses = ["Confirmed", "Preparing", "Ready", "On the way", "Delivered"];

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
      <h2 style={{ fontSize: 36, marginBottom: 32 }}>Your Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="card" style={{ marginBottom: 20, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
            <div>
              <div className="dm" style={{ fontSize: 12, color: "#7c5a3a", letterSpacing: 1, marginBottom: 4 }}>{order.id}</div>
              <div style={{ fontWeight: 600 }}>{order.store?.name} • {order.mode === "delivery" ? "🚚 Delivery" : "🏪 Pickup"}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#c4722a" }}>{formatCurrency(order.total)}</div>
              <div className="dm" style={{ fontSize: 12, color: "#7c5a3a" }}>{order.time}</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 4, marginBottom: 16, overflowX: "auto" }}>
            {statuses.map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: i === 0 ? "#c4722a" : "#3a2010", border: `2px solid ${i === 0 ? "#c4722a" : "#3a2010"}`, margin: "0 auto 4px" }} />
                  <div className="dm" style={{ fontSize: 10, color: i === 0 ? "#c4722a" : "#5c4a2a", whiteSpace: "nowrap" }}>{s}</div>
                </div>
                {i < statuses.length - 1 && <div style={{ width: 20, height: 2, background: "#2a1808", marginBottom: 14 }} />}
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #2a1808", paddingTop: 16 }}>
            {order.items.map((item) => (
              <div key={item.id} className="dm" style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#a08060", marginBottom: 4 }}>
                <span>{item.img} {item.name} × {item.qty}</span>
                <span>{formatCurrency(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── INVENTORY PAGE ───────────────────────────────────────────────────────────
function InventoryPage({ inventory, setInventory, showNotif }) {
  const updateStock = (id, delta) => {
    setInventory((prev) => prev.map((i) => i.id === id ? { ...i, stock: Math.max(0, i.stock + delta) } : i));
  };

  const lowStock = inventory.filter((i) => i.stock <= 10);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
      <div className="dm" style={{ fontSize: 11, letterSpacing: 5, color: "#c4722a", textTransform: "uppercase", marginBottom: 8 }}>Admin Panel</div>
      <h2 style={{ fontSize: 36, marginBottom: 8 }}>Inventory Management</h2>
      <p className="dm" style={{ color: "#a08060", marginBottom: 32 }}>Recipe-based ingredient tracking with real-time stock levels.</p>

      {lowStock.length > 0 && (
        <div style={{ background: "#3a1a0a", border: "1px solid #8b4513", borderRadius: 4, padding: 16, marginBottom: 24 }}>
          <div className="dm" style={{ fontSize: 13, color: "#e88a4a", fontWeight: 500 }}>
            ⚠️ Low Stock Alert: {lowStock.map((i) => i.name).join(", ")}
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {inventory.map((item) => (
          <div key={item.id} className="card" style={{ padding: 20, border: item.stock <= 10 ? "1px solid #8b4513" : "1px solid #3a2010" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 24 }}>{item.img}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</div>
                  <span className="badge" style={{ fontSize: 10 }}>{item.category}</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span className="dm" style={{ fontSize: 13, color: "#a08060" }}>Stock</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => updateStock(item.id, -5)} style={{ background: "#2a1808", border: "1px solid #3a2010", color: "#f5ede0", width: 28, height: 28, borderRadius: 2, cursor: "pointer" }}>−</button>
                <span style={{ fontSize: 18, fontWeight: 700, color: item.stock <= 10 ? "#e88a4a" : "#c4722a", minWidth: 32, textAlign: "center" }}>{item.stock}</span>
                <button onClick={() => updateStock(item.id, 5)} style={{ background: "#2a1808", border: "1px solid #3a2010", color: "#f5ede0", width: 28, height: 28, borderRadius: 2, cursor: "pointer" }}>+</button>
              </div>
            </div>

            {/* Stock bar */}
            <div style={{ background: "#2a1808", borderRadius: 2, height: 4, marginBottom: 10 }}>
              <div style={{ width: `${Math.min(100, (item.stock / 60) * 100)}%`, height: "100%", background: item.stock <= 10 ? "#e88a4a" : "#c4722a", borderRadius: 2, transition: "width 0.3s" }} />
            </div>

            {item.ingredients.length > 0 && (
              <div className="dm" style={{ fontSize: 11, color: "#5c4a2a" }}>
                🧪 {item.ingredients.join(", ")}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── AI CHAT BOT ──────────────────────────────────────────────────────────────
function AIChatBot({ open, setOpen, user }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: `Good ${(() => { const h = new Date().getHours(); return h < 12 ? "morning" : h < 17 ? "afternoon" : "evening"; })()}! I'm BrewBot, your AI barista. Ask me for recommendations, info about our menu, or anything coffee-related! ☕` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are BrewBot, a friendly AI barista for BrewNova Coffee Shop app. You help customers with: menu recommendations, coffee knowledge, promotions (morning combos, lunch deals, birthday specials), store locations in Bangalore (Koramangala, Indiranagar, Mantri Mall, Whitefield), ordering coffee powder, and general coffee advice. Keep responses concise and warm. Use occasional coffee emojis ☕🫖🍫. Current user: ${user?.name || "Guest"}.`,
          messages: [...history, { role: "user", content: userMsg }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map((c) => c.text || "").join("") || "Sorry, I couldn't process that. Please try again!";
      setMessages((prev) => [...prev, { role: "assistant", text }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Oops! Something went wrong. Please try again. ☕" }]);
    }
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div style={{
      position: "fixed", bottom: 96, right: 24, zIndex: 150,
      width: 360, height: 500,
      background: "#0f0a06", border: "1px solid #3a2010",
      borderRadius: 8, boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
      display: "flex", flexDirection: "column",
      animation: "fadeIn 0.2s ease"
    }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #2a1808", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#c4722a,#8b4513)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>☕</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>BrewBot</div>
            <div className="dm" style={{ fontSize: 11, color: "#4a9a4a" }}>● AI Barista Online</div>
          </div>
        </div>
        <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "#7c5a3a", cursor: "pointer", fontSize: 18 }}>✕</button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "80%", padding: "10px 14px", borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
              background: m.role === "user" ? "linear-gradient(135deg,#c4722a,#8b4513)" : "#1a1008",
              border: m.role === "assistant" ? "1px solid #2a1808" : "none",
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.5, color: "#f5ede0"
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex" }}>
            <div style={{ background: "#1a1008", border: "1px solid #2a1808", padding: "10px 16px", borderRadius: "12px 12px 12px 2px", animation: "pulse 1.2s infinite" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#7c5a3a" }}>BrewBot is typing...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ padding: 16, borderTop: "1px solid #2a1808", display: "flex", gap: 8 }}>
        <input
          className="input"
          placeholder="Ask BrewBot anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          style={{ flex: 1, padding: "10px 14px" }}
        />
        <button className="btn-primary" onClick={send} style={{ padding: "10px 16px", minWidth: 48 }} disabled={loading}>
          {loading ? "..." : "→"}
        </button>
      </div>
    </div>
  );
}
