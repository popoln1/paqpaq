import React from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

type Pack={id:number;qty:number;price:number;label:string;sub:string;accent:string;pattern:string;free?:string};

const packs:Pack[]=[
  {id:1,qty:3,price:12,label:'3 ÉTUIS',sub:'3 créations uniques',accent:'#e84b36',pattern:'small'},
  {id:2,qty:6,price:22,label:'6 ÉTUIS',sub:'6 créations uniques',accent:'#e6ce3b',pattern:'medium'},
  {id:3,qty:10,price:30,label:'10 ÉTUIS',sub:'9 + 1 offert',accent:'#1d78a6',pattern:'bundle',free:'+1'},
  {id:4,qty:20,price:55,label:'20 ÉTUIS',sub:'20 créations uniques',accent:'#111',pattern:'large'},
  {id:5,qty:50,price:120,label:'50 ÉTUIS',sub:'50 créations uniques',accent:'#e84b36',pattern:'xl'},
  {id:6,qty:100,price:200,label:'100 ÉTUIS',sub:'100 créations uniques',accent:'#111',pattern:'mass'}
];

const euro=(n:number)=>n.toFixed(2).replace('.',',')+' €';

function MiniSleeve({i=0}:{i?:number}){
  const colors=['#e84b36','#1d78a6','#e6ce3b','#111','#6f8f5c','#d58a9a'];
  return <span className="mini-sleeve" style={{background:'linear-gradient(145deg,'+colors[i%colors.length]+' 0 48%,#f5f2eb 48% 66%,'+colors[(i+2)%colors.length]+' 66%)',transform:'rotate('+((i%5-2)*4)+'deg)'}}/>;
}

function PackArt({pack,hero=false}:{pack:Pack;hero?:boolean}){
  if(hero)return <div className="hero-products"><MiniSleeve i={1}/><MiniSleeve i={3}/><MiniSleeve i={0}/></div>;
  const count=pack.pattern==='small'?3:pack.pattern==='medium'?6:pack.pattern==='bundle'?10:pack.pattern==='large'?18:pack.pattern==='xl'?27:38;
  return <div className={'pack-art '+pack.pattern}>
    <div className="pack-stack">{Array.from({length:count},(_,i)=><MiniSleeve key={i} i={i}/>)}</div>
    {pack.free&&<b className="free-badge">{pack.free}</b>}
  </div>
}

function ProductCard({pack,onAdd}:{pack:Pack;onAdd:(p:Pack)=>void}){
  return <article className="pack-card">
    <div className="pack-image"><PackArt pack={pack}/></div>
    <div className="pack-info"><div><h3>{pack.label}</h3><p>{pack.sub}</p></div><strong>{euro(pack.price)}</strong></div>
    <button className="add-button" onClick={()=>onAdd(pack)}>AJOUTER AU PANIER <span>→</span></button>
  </article>
}

function App(){
  const [cart,setCart]=React.useState<{pack:Pack;qty:number}[]>([]);
  const [cartOpen,setCartOpen]=React.useState(false);
  const [searchOpen,setSearchOpen]=React.useState(false);
  const [query,setQuery]=React.useState('');
  const [menu,setMenu]=React.useState(false);

  const add=(pack:Pack)=>{
    setCart(items=>items.some(x=>x.pack.id===pack.id)
      ?items.map(x=>x.pack.id===pack.id?{...x,qty:x.qty+1}:x)
      :[...items,{pack,qty:1}]);
    setCartOpen(true);
  };
  const change=(id:number,delta:number)=>setCart(items=>items.map(x=>x.pack.id===id?{...x,qty:Math.max(0,x.qty+delta)}:x).filter(x=>x.qty>0));
  const count=cart.reduce((n,x)=>n+x.qty,0);
  const total=cart.reduce((n,x)=>n+x.pack.price*x.qty,0);
  const results=packs.filter(p=>(p.label+' '+p.sub).toLowerCase().includes(query.toLowerCase()));

  return <div className="app">
    <header className="nav">
      <button className="mobile-menu" onClick={()=>setMenu(!menu)}>☰</button>
      <a className="logo" href="#">PAQPAQ<span>®</span></a>
      <nav className={menu?'open':''}>
        <a href="#packs" onClick={()=>setMenu(false)}>SHOP</a>
        <a href="#packs" onClick={()=>setMenu(false)}>LES PACKS</a>
        <a href="#about" onClick={()=>setMenu(false)}>À PROPOS</a>
      </nav>
      <div className="nav-actions">
        <button onClick={()=>setSearchOpen(true)} aria-label="Rechercher">⌕</button>
        <button className="cart-button" onClick={()=>setCartOpen(true)}>PANIER <span>{count}</span></button>
      </div>
    </header>

    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">DES ÉTUIS. DES ARTISTES. UNE SEULE COMMUNAUTÉ.</span>
          <h1>CHOISISSEZ<br/>VOTRE PACK</h1>
          <p>Plus vous achetez, plus vous économisez.<br/>Trouvez le pack qui vous correspond et recevez vos étuis directement chez vous.</p>
          <a className="hero-button" href="#packs">DÉCOUVRIR LES ÉTUIS <span>→</span></a>
        </div>
        <div className="hero-art">
          <PackArt pack={packs[0]} hero/>
          <div className="hero-doodle">PETITS ÉTUIS<br/>GRANDES<br/>ÉMOTIONS <b>♡</b></div>
          <i className="scribble s1">╲╱</i><i className="scribble s2">✦</i>
        </div>
      </section>

      <section id="packs" className="packs-section">
        <div className="section-label"><h2>LES PACKS LES MOINS CHERS</h2><span>PETITS PRIX, GRAND PLAISIR</span></div>
        <div className="pack-grid">{packs.slice(0,3).map(p=><ProductCard key={p.id} pack={p} onAdd={add}/>)}</div>

        <div className="section-label second"><h2>LES PACKS LES PLUS CHERS</h2><span>PLUS DE CRÉATIONS, PLUS D'ÉCONOMIES</span></div>
        <div className="pack-grid">{packs.slice(3).map(p=><ProductCard key={p.id} pack={p} onAdd={add}/>)}</div>
      </section>

      <section className="trust">
        <div><b>♧</b><strong>LIVRAISON RAPIDE</strong><small>3 à 5 jours ouvrés</small></div>
        <div><b>◇</b><strong>PAIEMENT SÉCURISÉ</strong><small>100% fiable</small></div>
        <div><b>♢</b><strong>DES ARTISTES ENGAGÉS</strong><small>Création française</small></div>
        <div><b>♡</b><strong>UNE COMMUNAUTÉ PASSIONNÉE</strong><small>Rejoignez l'aventure</small></div>
      </section>
    </main>

    <footer id="about">
      <div className="footer-brand"><div className="logo">PAQPAQ<span>®</span></div><p>Des étuis. Des artistes.<br/>Une seule communauté.</p><small>© 2026 PAQPAQ. Tous droits réservés.</small></div>
      <div className="footer-links"><a href="#">FAQ</a><a href="#">Livraison</a><a href="#">Retours</a><a href="#">Contact</a></div>
      <div className="social"><span>◎</span><span>♪</span><span>▶</span></div>
      <div className="newsletter"><strong>RESTEZ INFORMÉ</strong><div><input placeholder="Votre email"/><button>→</button></div></div>
    </footer>

    {cartOpen&&<div className="overlay" onClick={()=>setCartOpen(false)}><aside className="cart-drawer" onClick={e=>e.stopPropagation()}>
      <div className="drawer-head"><div><span className="eyebrow">PANIER</span><h2>Votre sélection</h2></div><button className="close" onClick={()=>setCartOpen(false)}>×</button></div>
      {!cart.length?<div className="empty"><p>Votre panier est vide.</p><button className="hero-button" onClick={()=>{setCartOpen(false);document.getElementById('packs')?.scrollIntoView()}}>Découvrir les packs</button></div>:
      <><div className="cart-list">{cart.map(x=><div className="cart-line" key={x.pack.id}><div className="cart-mini"><PackArt pack={x.pack}/></div><div className="cart-line-info"><strong>{x.pack.label}</strong><small>{x.pack.sub}</small><div className="qty"><button onClick={()=>change(x.pack.id,-1)}>−</button><span>{x.qty}</span><button onClick={()=>change(x.pack.id,1)}>+</button></div></div><b>{euro(x.pack.price*x.qty)}</b></div>)}</div><div className="cart-total"><span>Sous-total</span><strong>{euro(total)}</strong></div><button className="checkout">PASSER COMMANDE →</button><small className="cart-note">Le paiement Shopify sera connecté ensuite.</small></>}
    </aside></div>}

    {searchOpen&&<div className="overlay search-overlay" onClick={()=>setSearchOpen(false)}><div className="search-box" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSearchOpen(false)}>×</button><span className="eyebrow">RECHERCHE</span><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Rechercher un pack..." />{query&&<div className="results">{results.map(p=><button key={p.id} onClick={()=>{setSearchOpen(false);add(p)}}><span>{p.label}</span><small>{p.sub} · {euro(p.price)}</small></button>)}{!results.length&&<p>Aucun résultat.</p>}</div>}</div></div>}
  </div>
}
createRoot(document.getElementById('root')!).render(<App/>);
