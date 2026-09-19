 "use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const profile = {
  name: "1844refrsh",
  description: "im cpu",
  pfp: "/assets/pfp.png",
  aliases: ["cpu", "1844", "refrsh"],
  links: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "Discord", href: "#" },
  ],
  music: {
    title: "Your Song",
    artist: "Your Artist",
    file: "/assets/music.mp3",
  },
};

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [tab, setTab] = useState("about");
  const [playing, setPlaying] = useState(false);
  const [views, setViews] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const key = "1844refrsh-view-counted";
    let stored = Number(localStorage.getItem("1844refrsh-views") || "0");
    if (!localStorage.getItem(key)) {
      stored += 1;
      localStorage.setItem("1844refrsh-views", String(stored));
      localStorage.setItem(key, "1");
    }
    setViews(stored);
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    try {
      if (playing) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setPlaying(!playing);
    } catch {
      setPlaying(false);
    }
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
          <motion.section
            key="gate"
            className="gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
          >
            <motion.div
              className="gateLine"
              initial={{ width: 0 }}
              animate={{ width: 130 }}
              transition={{ duration: 1 }}
            />
            <motion.h1 initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              1844<span>refrsh</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .35 }}>
              im cpu
            </motion.p>
            <motion.button
              className="enter"
              onClick={() => setEntered(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: .97 }}
            >
              ENTER
            </motion.button>
          </motion.section>
        ) : (
          <motion.section
            key="profile"
            className="profileWrap"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <header className="topbar">
              <span className="brand">1844<span>refrsh</span></span>
              <span className="status"><i /> online</span>
            </header>

            <div className="profileCard">
              <div className="hero">
                <motion.div
                  className="pfpRing"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                >
                  <div className="ringInner" />
                </motion.div>
                <motion.img
                  src={profile.pfp}
                  className="pfp"
                  alt="1844refrsh profile picture"
                  whileHover={{ scale: 1.04 }}
                />
              </div>

              <motion.h2 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                {profile.name}
              </motion.h2>
              <p className="desc">{profile.description}</p>

              <div className="stats">
                <div><strong>{views ?? "—"}</strong><span>views</span></div>
                <div><strong>{profile.aliases.length}</strong><span>aliases</span></div>
              </div>

              <nav className="tabs">
                {tabs.map((item) => (
                  <button
                    key={item}
                    className={tab === item ? "active" : ""}
                    onClick={() => setTab(item)}
                  >
                    {item}
                  </button>
                ))}
              </nav>

              <div className="content">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: .2 }}
                  >
                    {tab === "about" && (
                      <div className="section">
                        <span className="label">ABOUT</span>
                        <p className="aboutText">
                          im cpu<br />
                          <span>building random stuff & breaking things.</span>
                        </p>
                      </div>
                    )}

                    {tab === "aliases" && (
                      <div className="section">
                        <span className="label">ALIASES</span>
                        <div className="aliasList">
                          {profile.aliases.map((alias, i) => (
                            <motion.div
                              className="alias"
                              key={alias}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * .06 }}
                            >
                              <span>{alias}</span>
                              <b>0{i + 1}</b>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {tab === "links" && (
                      <div className="section">
                        <span className="label">LINKS</span>
                        <div className="links">
                          {profile.links.map((link) => (
                            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                              <span>{link.label}</span><b>↗</b>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="music">
                <audio ref={audioRef} src={profile.music.file} onEnded={() => setPlaying(false)} />
                <button className="play" onClick={toggleMusic}>{playing ? "Ⅱ" : "▶"}</button>
                <div className="track">
                  <strong>{profile.music.title}</strong>
                  <span>{profile.music.artist}</span>
                </div>
                <div className={`bars ${playing ? "live" : ""}`}>
                  {Array.from({ length: 14 }).map((_, i) => <i key={i} style={{ animationDelay: `${i * 45}ms` }} />)}
                </div>
              </div>
            </div>

            <footer>1844refrsh · hosted on Vercel</footer>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}