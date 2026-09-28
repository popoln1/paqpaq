import React from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

type Product={name:string;artist:string;region:string;price:string;tag?:string;image:string;colors:string[]};
const products:Product[]=[
{name:'Méli-Mélo #01',artist:'PAQPAQ Studio',region:'France',price:'15,90 €',tag:'BEST-SELLER',image:'linear-gradient(135deg,#111 0 24%,#f2cf32 24% 47%,#e74b32 47% 69%,#f4efe7 69%)',colors:['#111','#e74b32','#f2cf32']},
{name:'Face à face',artist:'Camille R.',region:'Bordeaux · Gironde',price:'6,90 €',image:'linear-gradient(145deg,#e9d8bf 0 36%,#173d75 36% 61%,#df4b38 61% 78%,#171717 78%)',colors:['#173d75','#df4b38','#e9d8bf']},
{name:'Énergie brute',artist:'Léo M.',region:'Lyon · Rhône',price:'6,90 €',image:'linear-gradient(125deg,#151515 0 31%,#f1d43c 31% 51%,#df3e36 51% 71%,#1976a9 71%)',colors:['#151515','#f1d43c','#df3e36']},
{name:'Botanique #02',artist:'Nina P.',region:'Paris · Île-de-France',price:'6,90 €',image:'linear-gradient(140deg,#eee5cf 0 40%,#76945a 40% 58%,#d58a9a 58% 73%,#202d24 73%)',colors:['#76945a','#d58a9a','#eee5cf']}
];

function ProductCard({p,onOpen}:{p:Product;onOpen:(p:Product)=>void}){
return <article className="product-card" onClick={()=>onOpen(p)}>
<div className="sleeve" style={{background:p.image}}><span className="mini-logo">PAQPAQ</span><span className="sleeve-mark">ART</span></div>
<div className="product-info"><div><span className="eyebrow">{p.tag||'COLLECTION'}</span><h3>{p.name}</h3><p>{p.artist} · {p.region}</p></div><strong>{p.price}</strong></div>
<div className="hover-panel"><span>{p.artist}</span><small>{p.region}</small><div className="mini-row">{[0,1,2,3,4].map(i=><i key={i} style={{background:p.colors[i%p.colors.length]}}/>)}</div><button>Voir la collection →</button></div>
</article>
}

function App(){
const [sheet,setSheet]=React.useState<Product|null>(null);
return <div className="app">
<header className="nav"><a className="logo" href="#">PAQPAQ<span>®</span></a><nav><a href="#shop">SHOP</a><a href="#discover">DÉCOUVRIR</a><a href="#create">CRÉER SON PAQPAQ</a><a href="#about">À PROPOS</a></nav><div className="nav-actions"><button>⌕</button><button>PANIER <b>0</b></button></div></header>
<main>
<section className="hero"><div className="hero-copy"><p className="eyebrow">PAQPAQ · COLLECTION 01</p><h1>DE L’ART<br/><em>DANS VOTRE POCHE.</em></h1><p className="lead">Des étuis cartonnés réutilisables, imprimés avec des créations d’artistes.</p><a className="button" href="#shop">Découvrir la collection</a></div><div className="hero-art"><div className="hero-sleeve"><span>PAQPAQ</span><strong>01</strong><i>ART<br/>IN<br/>POCKET</i></div><div className="scribble">PORTABLE<br/>ART OBJECT</div></div></section>
<section id="shop" className="section"><div className="section-head"><div><span className="eyebrow">SHOP</span><h2>Les créations du moment</h2></div><a href="#">Voir tout →</a></div><div className="grid">{products.map(p=><ProductCard key={p.name} p={p} onOpen={setSheet}/>)}</div></section>
<section className="mix section"><div><span className="eyebrow">MÉLI-MÉLO</span><h2>Vous choisissez le nombre.<br/><em>Nous choisissons l’art.</em></h2><p>Un assortiment surprise de créations PAQPAQ. Idéal pour offrir, collectionner ou simplement découvrir.</p><div className="chips"><span>3 · 6,90 €</span><span>6 · 10,90 €</span><span>9 + 1 · 15,90 €</span><span>20 · 27,90 €</span></div><button className="button dark">Choisir mon Méli-Mélo</button></div><div className="stack">{products.map((p,i)=><div key={p.name} className="stack-card" style={{background:p.image,transform:'rotate('+(i-1.5)*5+'deg) translate('+(i*9)+'px,'+(i*-5)+'px)'}}><span>PAQPAQ</span></div>)}</div></section>
<section id="discover" className="discover section"><div className="section-head"><div><span className="eyebrow">DÉCOUVRIR</span><h2>Des artistes partout en France.</h2></div><button>Explorer</button></div><div className="map"><div className="map-copy"><h3>Qui a créé votre PAQPAQ ?</h3><p>Explorez les artistes par région, département ou style. Chaque création possède son propre identifiant.</p><div className="filters"><button>Régions</button><button>Départements</button><button>Styles</button></div></div><div className="france-shape">FRANCE<div className="dot d1"/><div className="dot d2"/><div className="dot d3"/><div className="dot d4"/></div></div></section>
<section id="create" className="create section"><span className="eyebrow">CRÉER SON PAQPAQ</span><h2>Votre art.<br/><em>Notre étui.</em></h2><p>Artistes, créateurs, bars, hôtels, festivals ou marques : imaginez votre série PAQPAQ et donnez-lui une place dans la poche des gens.</p><a className="button" href="#">Commencer une création →</a></section>
</main>
<footer id="about"><div className="logo">PAQPAQ<span>®</span></div><p>De l’art dans votre poche.</p><small>© 2026 PAQPAQ · France</small></footer>
{sheet&&<div className="sheet-backdrop" onClick={()=>setSheet(null)}><div className="sheet" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSheet(null)}>×</button><div className="sheet-art" style={{background:sheet.image}}/><span className="eyebrow">{sheet.artist}</span><h2>{sheet.name}</h2><p>{sheet.region}</p><button className="button dark">Ajouter au panier · {sheet.price}</button></div></div>}
</div>}
createRoot(document.getElementById('root')!).render(<App/>);