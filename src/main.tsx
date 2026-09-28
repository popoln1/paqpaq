import React from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

type Product = {
  id:number; name:string; artist:string; region:string; price:number; tag?:string;
  image:string; colors:string[]; description:string;
};

const products:Product[] = [
  {id:1,name:'Méli-Mélo #01',artist:'PAQPAQ Studio',region:'France',price:15.9,tag:'BEST-SELLER',image:'linear-gradient(135deg,#111 0 24%,#f2cf32 24% 47%,#e74b32 47% 69%,#f4efe7 69%)',colors:['#111','#e74b32','#f2cf32'],description:'Un assortiment surprise de créations graphiques PAQPAQ.'},
  {id:2,name:'Face à face',artist:'Camille R.',region:'Bordeaux · Gironde',price:6.9,image:'linear-gradient(145deg,#e9d8bf 0 36%,#173d75 36% 61%,#df4b38 61% 78%,#171717 78%)',colors:['#173d75','#df4b38','#e9d8bf'],description:'Une composition graphique inspirée du portrait et du mouvement.'},
  {id:3,name:'Énergie brute',artist:'Léo M.',region:'Lyon · Rhône',price:6.9,image:'linear-gradient(125deg,#151515 0 31%,#f1d43c 31% 51%,#df3e36 51% 71%,#1976a9 71%)',colors:['#151515','#f1d43c','#df3e36'],description:'Couleurs franches, formes libres et énergie urbaine.'},
  {id:4,name:'Botanique #02',artist:'Nina P.',region:'Paris · Île-de-France',price:6.9,image:'linear-gradient(140deg,#eee5cf 0 40%,#76945a 40% 58%,#d58a9a 58% 73%,#202d24 73%)',colors:['#76945a','#d58a9a','#eee5cf'],description:'Une interprétation contemporaine du végétal.'},
  {id:5,name:'Rouge Signal',artist:'Alex B.',region:'Marseille · Bouches-du-Rhône',price:6.9,image:'linear-gradient(120deg,#e64b32 0 42%,#f4efe7 42% 58%,#111 58% 77%,#e7cf3d 77%)',colors:['#e64b32','#111','#e7cf3d'],description:'Un objet graphique vif et minimal.'},
  {id:6,name:'Bleu Nuit',artist:'Sam D.',region:'Nantes · Loire-Atlantique',price:6.9,image:'linear-gradient(135deg,#142d4f 0 35%,#f0d13b 35% 52%,#f4efe7 52% 72%,#d94b38 72%)',colors:['#142d4f','#f0d13b','#d94b38'],description:'Contrastes nocturnes et formes géométriques.'},
  {id:7,name:'Formes #04',artist:'Emma L.',region:'Toulouse · Haute-Garonne',price:6.9,image:'linear-gradient(145deg,#f4efe7 0 27%,#e84a32 27% 49%,#202020 49% 67%,#6f8f5c 67%)',colors:['#e84a32','#202020','#6f8f5c'],description:'Un jeu de formes et de matières pensé pour le format poche.'},
  {id:8,name:'Pop Pocket',artist:'PAQPAQ Studio',region:'France',price:6.9,image:'linear-gradient(125deg,#f2cf32 0 29%,#1976a9 29% 49%,#e74b32 49% 72%,#111 72%)',colors:['#f2cf32','#1976a9','#e74b32'],description:'Une création pop conçue pour accompagner tous les jours.'}
];

const euro=(n:number)=>n.toFixed(2).replace('.',',')+' €';

function ProductVisual({p,large=false}:{p:Product;large?:boolean}){
  return <div className={large?'product-visual large':'product-visual'} style={{background:p.image}}>
    <span className="visual-logo">PAQPAQ</span>
    <span className="visual-number">0{p.id}</span>
    <span className="visual-art">ART<br/>IN<br/>POCKET</span>
  </div>
}

function ProductCard({p,onOpen}:{p:Product;onOpen:(p:Product)=>void}){
  return <article className="product-card" onClick={()=>onOpen(p)}>
    <div className="product-media">
      {p.tag&&<span className="badge">{p.tag}</span>}
      <ProductVisual p={p}/>
      <button className="quick-add" onClick={e=>{e.stopPropagation();onOpen(p)}}>Voir le produit</button>
    </div>
    <div className="product-meta">
      <div><h3>{p.name}</h3><p>{p.artist}</p></div><strong>{euro(p.price)}</strong>
    </div>
  </article>
}

function App(){
  const [selected,setSelected]=React.useState<Product|null>(null);
  const [cart,setCart]=React.useState<{product:Product;qty:number}[]>([]);
  const [search,setSearch]=React.useState(false);
  const [query,setQuery]=React.useState('');
  const [cartOpen,setCartOpen]=React.useState(false);
  const [menu,setMenu]=React.useState(false);

  const add=(p:Product)=>{
    setCart(items=>items.some(x=>x.product.id===p.id)
      ? items.map(x=>x.product.id===p.id?{...x,qty:x.qty+1}:x)
      : [...items,{product:p,qty:1}]);
  };
  const change=(id:number,delta:number)=>setCart(items=>items.map(x=>x.product.id===id?{...x,qty:Math.max(0,x.qty+delta)}:x).filter(x=>x.qty>0));
  const count=cart.reduce((n,x)=>n+x.qty,0);
  const total=cart.reduce((n,x)=>n+x.product.price*x.qty,0);
  const filtered=products.filter(p=>(p.name+' '+p.artist+' '+p.region).toLowerCase().includes(query.toLowerCase()));

  return <div className="app">
    <div className="announcement">LIVRAISON OFFERTE DÈS 35 € · COLLECTION 01 DISPONIBLE</div>
    <header className="nav">
      <button className="mobile-menu" onClick={()=>setMenu(!menu)}>☰</button>
      <a className="logo" href="#">PAQPAQ<span>®</span></a>
      <nav className={menu?'open':''}>
        <a href="#shop" onClick={()=>setMenu(false)}>SHOP</a>
        <a href="#collections" onClick={()=>setMenu(false)}>COLLECTIONS</a>
        <a href="#discover" onClick={()=>setMenu(false)}>DÉCOUVRIR</a>
        <a href="#create" onClick={()=>setMenu(false)}>CRÉER</a>
        <a href="#about" onClick={()=>setMenu(false)}>À PROPOS</a>
      </nav>
      <div className="nav-actions">
        <button onClick={()=>setSearch(true)} aria-label="Rechercher">⌕</button>
        <button onClick={()=>setCartOpen(true)} className="cart-button">PANIER <span>{count}</span></button>
      </div>
    </header>

    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">OBJETS GRAPHIQUES · MADE IN FRANCE</span>
          <h1>DE L’ART<br/><i>DANS VOTRE POCHE.</i></h1>
          <p>Des étuis cartonnés réutilisables, imaginés avec des artistes et pensés comme de petits objets de collection.</p>
          <a href="#shop" className="button">Shopper la collection</a>
          <div className="hero-note"><span>01</span> COLLECTION 01 · 8 CRÉATIONS</div>
        </div>
        <div className="hero-stage">
          <div className="hero-card back"></div><div className="hero-card mid"></div>
          <div className="hero-card front"><span>PAQPAQ</span><b>01</b><small>ART<br/>IN<br/>POCKET</small></div>
          <div className="hero-caption">PORTABLE<br/>ART OBJECT</div>
        </div>
      </section>

      <section id="shop" className="section shop-section">
        <div className="section-title"><div><span className="eyebrow">SHOP</span><h2>Les favoris du moment</h2></div><a href="#all">Voir toute la collection →</a></div>
        <div className="grid">{products.slice(0,4).map(p=><ProductCard key={p.id} p={p} onOpen={setSelected}/>)}</div>
      </section>

      <section id="collections" className="collections section">
        <div className="section-title"><div><span className="eyebrow">COLLECTIONS</span><h2>Choisissez votre univers.</h2></div></div>
        <div className="collection-grid">
          <a href="#shop" className="collection-card red"><span>01</span><h3>Graphique</h3><small>Formes · couleurs · contrastes</small></a>
          <a href="#shop" className="collection-card yellow"><span>02</span><h3>Pop & street</h3><small>Énergie · lignes · caractère</small></a>
          <a href="#shop" className="collection-card black"><span>03</span><h3>Minimal</h3><small>Simple · brut · contemporain</small></a>
        </div>
      </section>

      <section className="feature section">
        <div className="feature-copy"><span className="eyebrow">MÉLI-MÉLO</span><h2>Vous choisissez le nombre.<br/><i>Nous choisissons l’art.</i></h2><p>Un assortiment surprise de créations PAQPAQ. Parfait pour découvrir plusieurs artistes sans avoir à choisir.</p><div className="chips"><span>3 · 6,90 €</span><span>6 · 10,90 €</span><span>9 + 1 · 15,90 €</span><span>20 · 27,90 €</span></div><button className="button light">Choisir mon Méli-Mélo</button></div>
        <div className="stack">{products.slice(0,4).map((p,i)=><div key={p.id} className="stack-item" style={{background:p.image,transform:'rotate('+((i-1.5)*6)+'deg) translate('+(i*12)+'px,'+(i*-7)+'px)'}}><span>PAQPAQ</span></div>)}</div>
      </section>

      <section id="discover" className="discover section">
        <div className="discover-inner"><div><span className="eyebrow">DÉCOUVRIR</span><h2>Des artistes<br/>partout en France.</h2><p>Découvrez qui se cache derrière chaque création. Par région, département ou style.</p><a className="button dark" href="#shop">Explorer les artistes</a></div><div className="map-art"><span>FRANCE</span><i></i><i></i><i></i><i></i></div></div>
      </section>

      <section id="create" className="create section"><span className="eyebrow">CRÉER SON PAQPAQ</span><h2>Votre art.<br/><i>Notre étui.</i></h2><p>Artistes, créateurs, bars, hôtels, festivals ou marques : imaginez votre série PAQPAQ.</p><a className="button" href="#">Commencer une création →</a></section>
    </main>

    <footer id="about"><div><div className="logo">PAQPAQ<span>®</span></div><p>De l’art dans votre poche.</p></div><div className="footer-links"><a href="#">FAQ</a><a href="#">Livraison</a><a href="#">Contact</a><a href="#">Instagram</a></div><small>© 2026 PAQPAQ</small></footer>

    {selected&&<div className="overlay" onClick={()=>setSelected(null)}><div className="product-drawer" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}>×</button><div className="drawer-grid"><ProductVisual p={selected} large/><div className="drawer-info"><span className="eyebrow">{selected.artist}</span><h2>{selected.name}</h2><p className="region">{selected.region}</p><p>{selected.description}</p><div className="drawer-price">{euro(selected.price)}</div><button className="button dark full" onClick={()=>{add(selected);setSelected(null);setCartOpen(true)}}>Ajouter au panier</button><small className="shipping">Expédition sous 2 à 4 jours ouvrés</small></div></div></div></div>}

    {cartOpen&&<div className="overlay" onClick={()=>setCartOpen(false)}><aside className="cart-drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><div><span className="eyebrow">PANIER</span><h2>Votre sélection</h2></div><button className="close" onClick={()=>setCartOpen(false)}>×</button></div>{!cart.length?<div className="empty"><p>Votre panier est vide.</p><button className="button" onClick={()=>{setCartOpen(false);document.getElementById('shop')?.scrollIntoView()}}>Découvrir le shop</button></div>:<><div className="cart-list">{cart.map(x=><div className="cart-line" key={x.product.id}><div className="cart-thumb" style={{background:x.product.image}}></div><div className="cart-line-info"><strong>{x.product.name}</strong><small>{x.product.artist}</small><div className="qty"><button onClick={()=>change(x.product.id,-1)}>−</button><span>{x.qty}</span><button onClick={()=>change(x.product.id,1)}>+</button></div></div><b>{euro(x.product.price*x.qty)}</b></div>)}</div><div className="cart-total"><span>Sous-total</span><strong>{euro(total)}</strong></div><button className="button dark full">Passer commande</button><small className="cart-note">Paiement et checkout Shopify seront branchés à l’étape suivante.</small></>}</aside></div>}

    {search&&<div className="overlay search-overlay" onClick={()=>setSearch(false)}><div className="search-box" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSearch(false)}>×</button><span className="eyebrow">RECHERCHE</span><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Artiste, création, région..." />{query&&<div className="results">{filtered.map(p=><button key={p.id} onClick={()=>{setSelected(p);setSearch(false)}}><span>{p.name}</span><small>{p.artist} · {p.region}</small></button>)}{!filtered.length&&<p>Aucun résultat.</p>}</div>}</div></div>}
  </div>
}
createRoot(document.getElementById('root')!).render(<App/>);
