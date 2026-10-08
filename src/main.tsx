import React from 'react';
import {createRoot} from 'react-dom/client';
import heroImage from './assets/hero.png';
import pack3Image from './assets/pack-3.png';
import pack6Image from './assets/pack-6.png';
import pack10Image from './assets/pack-10.png';
import pack20Image from './assets/pack-20.png';
import pack50Image from './assets/pack-50.png';
import pack100Image from './assets/pack-100.png';
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
const unitPrice=(pack:Pack)=>pack.price/pack.qty;
const packBenefits:Record<number,string>={1:'Pour découvrir PAQPAQ',2:'Pour commencer une collection',3:'Le format le plus équilibré',4:'Pour avoir du choix',5:'Pour partager et offrir',6:'Pour faire le stock pour l’année'};

const packImages:Record<number,string>={
  1:pack3Image,
  2:pack6Image,
  3:pack10Image,
  4:pack20Image,
  5:pack50Image,
  6:pack100Image
};

function PackArt({pack,hero=false}:{pack:Pack;hero?:boolean}){
  if(hero)return <div className="hero-photo"><img src={heroImage} alt="Étuis PAQPAQ de démonstration"/></div>;
  return <div className="pack-art image-pack" aria-label={pack.label+' PAQPAQ'}>
    <img src={packImages[pack.id]} alt={pack.label+' PAQPAQ'}/>
    
  </div>;
}

const packDescriptions:Record<number,string[]> = {
  1:['Le pack idéal pour découvrir PAQPAQ.','3 étuis pour faire un premier essai.','Trois créations différentes à collectionner.','Un petit format, facile à offrir.','Parfait pour découvrir nos artistes.','Le pack le plus accessible.','Choisissez vos premiers PAQPAQ.'],
  2:['Le bon format pour commencer une collection.','6 étuis pour varier les créations.','Découvrez plusieurs univers artistiques.','Gardez vos préférés et partagez les autres.','Un format équilibré pour se faire plaisir.','Plus de créations, sans trop stocker.','Passez à 6 et laissez-vous surprendre.'],
  3:['Le pack pensé pour vraiment profiter de la collection.','10 étuis au total, dont 1 offert.','Plus de créations à découvrir et à partager.','Idéal pour varier les modèles au quotidien.','Un format généreux sans passer au gros stock.','9 étuis achetés, le 10e est offert.','Le choix naturel pour une collection complète.'],
  4:['Un pack pour ceux qui veulent avoir du choix.','20 étuis pour constituer une belle réserve.','Gardez-en pour vous et partagez autour de vous.','Idéal pour les soirées et les cadeaux.','Plus de créations, plus de possibilités.','Un format confortable pour plusieurs semaines.','Faites votre stock sans passer au maximum.'],
  5:['Un grand pack pour les vrais amateurs de PAQPAQ.','50 étuis pour constituer une belle collection.','Idéal pour offrir à vos proches ou amis.','Gardez vos favoris toujours à portée de main.','Un format pensé pour partager largement.','Plus de quantité, plus de variété.','Le stock généreux pour ne jamais manquer.'],
  6:['Le pack pour faire le plein pour l’année.','100 étuis pour constituer un vrai stock.','Idéal pour offrir régulièrement autour de vous.','Parfait pour les événements et les grandes occasions.','Découvrez une grande variété de créations.','Le format pensé pour les gros besoins.','Faites votre réserve et partagez PAQPAQ.']
};

function ProductCard({pack,onOpen}:{pack:Pack;onOpen:(p:Pack)=>void}){
  return <article className={pack.id===3?'pack-card featured-pack':'pack-card'} onClick={()=>onOpen(pack)} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==='Enter'||e.key===' ')onOpen(pack)}}>
    <div className="pack-image"><PackArt pack={pack}/></div>
    <div className="pack-info"><div><h3>{pack.label}{pack.free&&<small> (9 + 1 OFFERT)</small>}</h3><p>{pack.sub}</p></div><div className="pack-price"><strong>{euro(pack.price)}</strong><small>{euro(unitPrice(pack))} / étui</small></div></div>
    <button className="add-button" onClick={e=>{e.stopPropagation();onOpen(pack)}}>VOIR LE PACK <span>→</span></button>
  </article>
}

function ProductModal({pack,onClose,onAdd,onBuy}:{pack:Pack;onClose:()=>void;onAdd:(p:Pack)=>void;onBuy:(p:Pack)=>void}){
  return <div className="product-modal-overlay" onClick={onClose}>
    <section className="product-modal" onClick={e=>e.stopPropagation()} role="dialog" aria-modal="true" aria-label={pack.label}>
      <button className="product-modal-close" onClick={onClose} aria-label="Fermer">×</button>
      <div className="product-modal-image"><img src={packImages[pack.id]} alt={pack.label+' PAQPAQ'}/></div>
      <div className="product-modal-content">
        <span className="eyebrow">PAQPAQ · {pack.qty} ÉTUIS</span>
        <div className="product-modal-benefit">{packBenefits[pack.id]}{pack.free&&' · 1 offert'}</div>
        <h2>{pack.label}</h2>
        <div className="product-modal-price"><strong>{euro(pack.price)}</strong><span>{euro(unitPrice(pack))} / étui</span></div>
        <div className="product-modal-copy">{packDescriptions[pack.id].map((line,i)=><p key={i}>{line}</p>)}</div>
        <button className="product-modal-action" onClick={()=>onBuy(pack)}>ACHETER MAINTENANT <span>→</span></button>
        <button className="product-modal-secondary" onClick={()=>onAdd(pack)}>AJOUTER AU PANIER</button>
      </div>
    </section>
  </div>
}

function App(){
  const [cart,setCart]=React.useState<{pack:Pack;qty:number}[]>([]);
  const [cartOpen,setCartOpen]=React.useState(false);
  const [searchOpen,setSearchOpen]=React.useState(false);
  const [query,setQuery]=React.useState('');
  const [menu,setMenu]=React.useState(false);
  const [selectedPack,setSelectedPack]=React.useState<Pack|null>(null);
  const [checkoutOpen,setCheckoutOpen]=React.useState(false);
  const [toast,setToast]=React.useState('');

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
        <button className="cart-button" onClick={openCart}>PANIER <span>{count}</span></button>
      </div>
    </header>

    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">DES ÉTUIS. DES ARTISTES. UNE SEULE COMMUNAUTÉ.</span>
          <h1>CHOISISSEZ<br/>VOTRE PACK</h1>
          <p>Plus vous achetez, plus vous économisez.</p>
          <a className="hero-button" href="#packs">DÉCOUVRIR LES PACKS <span>→</span></a>
        </div>
        <div className="hero-art">
          <PackArt pack={packs[0]} hero/>
          <div className="hero-doodle">PETITS ÉTUIS<br/>GRANDES<br/>ÉMOTIONS <b>♡</b></div>
          <i className="scribble s1">╲╱</i><i className="scribble s2">✦</i>
        </div>
      </section>

      <section id="packs" className="packs-section">
        <div className="section-label"><h2>CHOISISSEZ VOTRE PACK</h2><span>3 À 100 ÉTUIS</span></div>
        <div className="pack-grid">{packs.slice(0,3).map(p=><ProductCard key={p.id} pack={p} onOpen={setSelectedPack}/>)}</div>
        <div className="pack-grid">{packs.slice(3).map(p=><ProductCard key={p.id} pack={p} onOpen={setSelectedPack}/>)}</div>
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

    {cartLoading&&<div className="cart-loading-overlay"><div className="cart-loading"><div className="paqpaq-loader"><span>P</span><span>A</span><span>Q</span><span>P</span><span>A</span><span>Q</span></div><small>OUVERTURE DU PANIER</small></div></div>}

    {cartOpen&&<div className="overlay" onClick={()=>setCartOpen(false)}><aside className="cart-drawer" onClick={e=>e.stopPropagation()}>
      <div className="drawer-head"><div><span className="eyebrow">PANIER</span><h2>Votre sélection</h2></div><button className="close" onClick={()=>setCartOpen(false)}>×</button></div>
      {!cart.length?<div className="empty"><p>Votre panier est vide.</p><button className="hero-button" onClick={()=>{setCartOpen(false);document.getElementById('packs')?.scrollIntoView()}}>Découvrir les packs</button></div>:
      <><div className="cart-list">{cart.map(x=><div className="cart-line" key={x.pack.id}><div className="cart-mini"><PackArt pack={x.pack}/></div><div className="cart-line-info"><strong>{x.pack.label}</strong><small>{x.pack.sub}</small><div className="qty"><button onClick={()=>change(x.pack.id,-1)}>−</button><span>{x.qty}</span><button onClick={()=>change(x.pack.id,1)}>+</button></div></div><b>{euro(x.pack.price*x.qty)}</b></div>)}</div><div className="cart-total"><span>Sous-total</span><strong>{euro(total)}</strong></div><button className="checkout" onClick={()=>{setCartOpen(false);setCheckoutOpen(true)}}>PASSER AU PAIEMENT →</button>
       <div className="cart-inspiration"><strong>PAQPAQ, c’est aussi une collection.</strong><span>Découvrez d’autres créations avant de finaliser.</span><div>{[1,3,6].map(id=><img key={id} src={packImages[id]} alt="" />)}</div></div></>}
    </aside></div>}

    {selectedPack&&<ProductModal pack={selectedPack} onClose={()=>setSelectedPack(null)} onAdd={p=>{setSelectedPack(null);add(p)}} onBuy={buyNow}/>}



    {checkoutOpen&&<div className="checkout-overlay">
      <section className="checkout-page" role="dialog" aria-modal="true" aria-label="Paiement">
        <div className="checkout-top"><button className="checkout-back" onClick={()=>setCheckoutOpen(false)}>← RETOUR</button><div className="logo">PAQPAQ<span>®</span></div><button className="close" onClick={()=>setCheckoutOpen(false)}>×</button></div>
        <div className="checkout-layout">
          <div className="checkout-summary">
            <span className="eyebrow">VOTRE COMMANDE</span><h2>Finalisez votre achat</h2>
            <div className="checkout-lines">{cart.map(x=><div className="checkout-line" key={x.pack.id}><div className="checkout-line-image"><img src={packImages[x.pack.id]} alt=""/></div><div><strong>{x.pack.label}</strong><small>{x.qty} pack{x.qty>1?'s':''} · {x.pack.qty*x.qty} étuis</small></div><b>{euro(x.pack.price*x.qty)}</b></div>)}</div>
            <div className="checkout-total"><span>Total</span><strong>{euro(total)}</strong></div>
          </div>
          <div className="checkout-form">
            <span className="eyebrow">PAIEMENT</span><h3>Vos informations</h3>
            <label>Email<input type="email" placeholder="vous@email.com"/></label>
            <label>Nom complet<input type="text" placeholder="Votre nom"/></label>
            <label>Adresse de livraison<input type="text" placeholder="Votre adresse"/></label>
            <button className="checkout-pay">CONTINUER VERS LE PAIEMENT <span>→</span></button>
            <small>Le paiement sécurisé sera connecté avec Shopify lors de la mise en ligne.</small>
          </div>
        </div>
      </section>
    </div>}

    {toast&&<div className="cart-toast">{toast}<button onClick={openCart}>VOIR LE PANIER</button></div>}

    {searchOpen&&<div className="overlay search-overlay" onClick={()=>setSearchOpen(false)}><div className="search-box" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSearchOpen(false)}>×</button><span className="eyebrow">RECHERCHE</span><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Rechercher un pack..." />{query&&<div className="results">{results.map(p=><button key={p.id} onClick={()=>{setSearchOpen(false);add(p)}}><span>{p.label}</span><small>{p.sub} · {euro(p.price)}</small></button>)}{!results.length&&<p>Aucun résultat.</p>}</div>}</div></div>}
  </div>
}
createRoot(document.getElementById('root')!).render(<App/>);
