import React from 'react';
import { Play, MoreVertical, Plus } from 'lucide-react';
import styles from '../styles/pages/Episode.module.css';

const SHOW_NOTES = `Professor Jiang Xueqin on hidden power networks, empire collapse, and who really controls the world.

He explains:
■ How America uses a three-pillar strategy to operate like a mafia boss over the entire global order
■ Three Predictions for the Future
■ What is geopolitics hidden power network
■ The real reason Trump's 2016 victory shocked the elite and what it revealed about MAGA's deeper roots
■ Why he believes Epstein and Trump were deliberately chosen as pawns by a hidden financial network

Chapters:
00:00 - Intro
03:30 - Why Trump's 2016 Win Shocked the Elite
08:15 - How Obama and Trump Fueled the MAGA Movement
12:06 - QAnon, 5D Chess & Hitler's Rise Parallels
18:52 - Jeffrey Epstein: The Mystery Behind His Power
23:44 - How Power Really Works: Occultists & Financiers
29:03 - Rabbi Schneerson, Chabad Lubavitch & Kabbalah
38:02 - Greater Israel Project: Milei, Netanyahu, Kushner
43:37 - The Secret WWII Rescue of Chabad Lubavitch
50:03 - Sabbatai Zevi & Jacob Frank: Redemption Through Sin
1:02:43 - Were Epstein and Trump Chosen as Pawns?
1:11:20 - Three Predictions for the Future
1:20:03 - Why Can't Anyone Defeat the US Militarily?
1:25:49 - America's 3-Pillar Strategy for Global Domination
1:31:05 - Which Global Alliance Is the Weakest Right Now?
1:36:24 - Warning Signs That an Empire Is in Decline
1:46:08 - Is Total Global Collapse Really Coming?
1:53:11 - The Biggest Lie in American Media
1:55:07 - Mapping Global Power: Who's In, Who's Out
2:02:15 - The Resource Curse: Why Oil-Rich Nations Stay Weak
2:04:06 - Which Country Will Use a Nuclear Weapon First?`;

const Episode = () => {
  return (
    <div className={styles.episodePage}>
      <div className={styles.leftColumn}>
        <div className={styles.podcastName}>Figuring Out With Raj Shamani</div>
        
        <img 
          src="https://images.unsplash.com/photo-1593697821252-0cbfabc39c10?w=640&h=360&fit=crop" 
          alt="Episode Thumbnail" 
          className={styles.coverImage} 
        />
        
        <div className={styles.metadata}>389K views • 19h ago • 2 hr 31 min</div>
        
        <h1 className={styles.title}>
          World Order Is a Lie:<br />
          The Next 50 Years<br />
          Will Change<br />
          Everything | Prof....
        </h1>
        
        <div className={styles.actionRow}>
          <button className={styles.iconBtn} aria-label="Add to queue">
            <Plus size={20} />
          </button>
          <button className={styles.playBtn} aria-label="Play episode">
            <Play size={32} fill="currentColor" />
          </button>
          <button className={styles.iconBtn} aria-label="More options">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>
      
      <div className={styles.rightColumn}>
        <div className={styles.showNotes}>
          {SHOW_NOTES}
        </div>
      </div>
    </div>
  );
};

export default Episode;
