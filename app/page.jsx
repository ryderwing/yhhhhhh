 "use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ALIASES = ["1844refresh", "1844slitcope", "EMP", "Bloodiedccloth", "glitchward", "darkven", "Bloody", "Disapointed", "Homicide", "Warranted", "Pedro", "Pedrosfiy", "Executive", "Judaical", "Jinx", "Paparazz", "Jewscarve", "Narcan", "Demonology", "Notable", "Territorial", "Mournful", "Korpse", "foundedfather", "OG", "Scared", "Mounted", "Apollo", "Founed", "Abandoned", "Aborted", "Wagoner", "Consiousness", "braindead", "chadlite", "Bon", "Cross", "CPD", "reincarnated", "Trigger", "Alive", "Pills", "Percs", "housefire", "DeathToAll", "DarkSoilder", "Hanged", "Suicide", "KilledTeens", "BurnJews", "Demonic", "FallenStudent", "Decade", "NaziSoilder", "SchoolShooting", "ThreatFul", "SlitWrists", "Slits", "FedSS", "Attempted", "Cultured"];

const profile = {
  name: "1844 slitcope",
  description: "im cpu",
  pfp: "/assets/pfp.png",
  aliases: ALIASES,
  links: [
    { label: "Discord", href: "https://discord.gg/XvsPrJPNMX" },
    { label: "guns.lol", href: "https://guns.lol/cpu_" },
  ],
  music: {
    title: "ghost party",
    artist: "overtonight",
    file: "/assets/music.mp3",
  },
};

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [tab, setTab] = useState("about");
  const [playing, setPlaying] = useState(false);
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState("");
  const audioRef = useRef(null);

  useEffect(() => {
    const key = "1844slitcope-view-counted";
    let stored = Number(localStorage.getItem("1844slitcope-views") || "0");
    if (!localStorage.getItem(key)) {
      stored += 1;
      localStorage.setItem("1844slitcope-views", String(stored));
      localStorage.setItem(key, "1");
    }
    setViews(stored);
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (audio.paused) {
        await audio.play();
        setPlaying(true);
        setError("");
      } else {
        audio.pause();
        setPlaying(false);
      }
    } catch {
      setError("Click play to start the music.");
    }
  };

  const seek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const value = Number(e.target.value);
    audio.currentTime = value;
    setCurrent(value);
  };

  const format = (seconds) => {
    if (!Number.isFinite(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const tabs = ["about", "aliases", "links"];

  return (
    <main className="page">
      <div className="noise" />
      <div className="grid" />
      <div className="orb orbOne" />
      <div className="orb orbTwo" />

      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.section key="gate" className="gate" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,scale:1.04,filter:"blur(12px)"}}>
            <motion.div className="gateLine" initial={{width:0}} animate={{width:130}} transition={{duration:1}} />
            <motion.h1 initial={{y:15,opacity:0}} animate={{y:0,opacity:1}}>1844<span>slitcope</span></motion.h1>
            <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.35}}>im cpu</motion.p>
            <motion.button className="enter" onClick={()=>setEntered(true)} whileHover={{scale:1.04}} whileTap={{scale:.97}}>ENTER</motion.button>
          </motion.section>
        ) : (
          <motion.section key="profile" className="profileWrap" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}}>
            <header className="topbar">
              <span className="brand">1844<span>slitcope</span></span>
              <span className="status"><i /> online</span>
            </header>

            <div className="profileCard">
              <div className="hero">
                <motion.div className="pfpRing" animate={{rotate:360}} transition={{duration:18,repeat:Infinity,ease:"linear"}}>
                  <div className="ringInner" />
                </motion.div>
                <img
                  src={profile.pfp}
                  className="pfp"
                  alt="1844 slitcope profile picture"
                  onError={(e)=>{ e.currentTarget.style.opacity="0"; }}
                />
              </div>

              <motion.h2 initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>{profile.name}</motion.h2>
              <p className="desc">{profile.description}</p>

              <div className="stats">
                <div><strong>{views ?? "—"}</strong><span>views</span></div>
                <div><strong>{profile.aliases.length}</strong><span>aliases</span></div>
              </div>

              <nav className="tabs">
                {tabs.map(item=><button key={item} className={tab===item?"active":""} onClick={()=>setTab(item)}>{item}</button>)}
              </nav>

              <div className="content">
                <AnimatePresence mode="wait">
                  <motion.div key={tab} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.2}}>
                    {tab==="about" && (
                      <div className="section">
                        <span className="label">ABOUT</span>
                        <p className="aboutText">im cpu<br/><span>building random stuff & breaking things.</span></p>
                      </div>
                    )}

                    {tab==="aliases" && (
                      <div className="section">
                        <span className="label">ALIASES</span>
                        <div className="aliasList">
                          {profile.aliases.map((alias,i)=>(
                            <motion.div className="alias" key={`${alias}-${i}`} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*.018}}>
                              <span>{alias}</span><b>{i+1}</b>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {tab==="links" && (
                      <div className="section">
                        <span className="label">LINKS</span>
                        <div className="links">
                          {profile.links.map(link=>(
                            <a key={link.label} href={link.href} target="_blank" rel="noreferrer"><span>{link.label}</span><b>↗</b></a>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="music">
                <audio
                  ref={audioRef}
                  preload="metadata"
                  src={profile.music.file}
                  onLoadedMetadata={(e)=>setDuration(e.currentTarget.duration)}
                  onTimeUpdate={(e)=>setCurrent(e.currentTarget.currentTime)}
                  onPlay={()=>setPlaying(true)}
                  onPause={()=>setPlaying(false)}
                  onEnded={()=>{setPlaying(false);setCurrent(0)}}
                  onError={()=>setError("music.mp3 could not be loaded. Make sure it is in public/assets/.")}
                />
                <button className="play" onClick={toggleMusic}>{playing ? "Ⅱ" : "▶"}</button>
                <div className="track">
                  <strong>{profile.music.title}</strong>
                  <span>{profile.music.artist}</span>
                  <div className="progressRow">
                    <span>{format(current)}</span>
                    <input type="range" min="0" max={duration || 0} step="0.01" value={Math.min(current,duration||0)} onChange={seek} disabled={!duration}/>
                    <span>{format(duration)}</span>
                  </div>
                </div>
                <div className={`bars ${playing ? "live" : ""}`}>
                  {Array.from({length:14}).map((_,i)=><i key={i} style={{animationDelay:`${i*45}ms`}} />)}
                </div>
              </div>
              {error && <div className="musicError">{error}</div>}
            </div>

            <footer>1844 slitcope · hosted on Vercel</footer>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}