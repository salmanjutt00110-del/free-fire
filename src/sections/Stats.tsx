import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, TrendingUp, Users, Star, Target, Zap, Award, Crown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: StatItem[] = [
  { icon: Users, value: 50, suffix: 'M+', label: 'Active Players', color: '#f6e194' },
  { icon: Trophy, value: 100, suffix: '+', label: 'Tournaments', color: '#fd5c57' },
  { icon: Target, value: 500, suffix: 'M+', label: 'Matches Played', color: '#4ade80' },
  { icon: Star, value: 4.8, suffix: '', label: 'App Rating', color: '#a855f7' },
];

const leaderboard = [
  { rank: 1, name: 'ShadowHunter', country: 'BR', kills: 15420, wins: 342, points: 9850 },
  { rank: 2, name: 'PhoenixRise', country: 'IN', kills: 14890, wins: 318, points: 9420 },
  { rank: 3, name: 'NightStalker', country: 'ID', kills: 14250, wins: 305, points: 9180 },
  { rank: 4, name: 'ThunderBolt', country: 'TH', kills: 13800, wins: 298, points: 8950 },
  { rank: 5, name: 'ViperX', country: 'PH', kills: 13500, wins: 290, points: 8820 },
];

const achievements = [
  { icon: Crown, title: 'Battle Royale Master', desc: 'Win 100 BR matches', progress: 87, total: 100 },
  { icon: Zap, title: 'Speed Demon', desc: 'Get 50 quick kills', progress: 42, total: 50 },
  { icon: Target, title: 'Sharpshooter', desc: '100 headshots', progress: 78, total: 100 },
  { icon: Award, title: 'Legendary Status', desc: 'Reach Grandmaster', progress: 1, total: 1 },
];

const AnimatedCounter = ({ value, suffix, isDecimal = false }: { value: number; suffix: string; isDecimal?: boolean }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const duration = 2000;
            const startTime = Date.now();
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeProgress = 1 - Math.pow(1 - progress, 3);
              setCount(easeProgress * value);
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            animate();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={counterRef} className="text-5xl lg:text-6xl font-bold font-['Teko']">
      {isDecimal ? count.toFixed(1) : Math.floor(count)}{suffix}
    </div>
  );
};

const Stats = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stats-header',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.stat-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.leaderboard-card',
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.leaderboard-card',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f6e194]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#fd5c57]/5 rounded-full blur-3xl" />

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="stats-header text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <TrendingUp className="w-4 h-4 text-[#f6e194]" />
              <span className="text-sm text-[#f6e194]">Global Statistics</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-bold font-['Teko'] mb-4">
              <span className="text-white">By The </span>
              <span className="text-gradient-gold">Numbers</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Join millions of players worldwide in the ultimate battle royale experience.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card glass-card rounded-2xl p-6 text-center group hover:bg-white/10 transition-all duration-300"
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon className="w-7 h-7 text-[#f6e194]" />
                </div>
                <AnimatedCounter 
                  value={stat.value} 
                  suffix={stat.suffix} 
                  isDecimal={stat.value % 1 !== 0}
                />
                <div className="text-sm text-white/50 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Leaderboard */}
            <div className="leaderboard-card glass-card rounded-3xl p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white font-['Teko']">Global Leaderboard</h3>
                  <p className="text-sm text-white/50">Top players this season</p>
                </div>
                <button className="text-sm text-[#f6e194] hover:underline">View All</button>
              </div>

              <div className="space-y-3">
                {leaderboard.map((player, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                      index === 0
                        ? 'bg-gradient-to-r from-[#f6e194]/20 to-transparent border border-[#f6e194]/30'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    {/* Rank */}
                    <div className="w-8 text-center">
                      {index === 0 ? (
                        <Crown className="w-6 h-6 text-[#f6e194] mx-auto" />
                      ) : (
                        <span className="text-lg font-bold text-white/50 font-['Teko']">
                          #{player.rank}
                        </span>
                      )}
                    </div>

                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f6e194] to-[#e7885a] flex items-center justify-center">
                      <span className="text-black font-bold text-sm">{player.name[0]}</span>
                    </div>

                    {/* Name & Country */}
                    <div className="flex-1">
                      <div className="font-bold text-white font-['Teko'] text-lg">{player.name}</div>
                      <div className="text-xs text-white/50">{player.country}</div>
                    </div>

                    {/* Stats */}
                    <div className="hidden sm:flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="text-white/50 text-xs">Kills</div>
                        <div className="font-bold text-white font-['Teko']">{player.kills.toLocaleString()}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white/50 text-xs">Wins</div>
                        <div className="font-bold text-white font-['Teko']">{player.wins}</div>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gradient-gold font-['Teko']">
                        {player.points.toLocaleString()}
                      </div>
                      <div className="text-xs text-white/50">PTS</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="glass-card rounded-3xl p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white font-['Teko']">Achievements</h3>
                  <p className="text-sm text-white/50">Track your progress</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gradient-gold font-['Teko']">847</div>
                  <div className="text-xs text-white/50">Total Points</div>
                </div>
              </div>

              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#f6e194]/20 to-[#e7885a]/20 flex items-center justify-center">
                        <achievement.icon className="w-5 h-5 text-[#f6e194]" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-white font-['Teko']">{achievement.title}</div>
                        <div className="text-xs text-white/50">{achievement.desc}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#f6e194]">
                          {achievement.progress}/{achievement.total}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#f6e194] to-[#e7885a] rounded-full transition-all duration-1000"
                        style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
