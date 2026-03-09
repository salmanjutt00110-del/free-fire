import { Flame, Twitter, Youtube, Instagram, MessageCircle, Mail, ChevronRight, Apple, Play, Gamepad2 } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    game: [
      { label: 'About', href: '#about' },
      { label: 'Characters', href: '#characters' },
      { label: 'Weapons', href: '#weapons' },
      { label: 'Game Modes', href: '#modes' },
    ],
    community: [
      { label: 'Leaderboard', href: '#stats' },
      { label: 'Tournaments', href: '#' },
      { label: 'Events', href: '#' },
      { label: 'News', href: '#' },
    ],
    support: [
      { label: 'Help Center', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'Bug Report', href: '#' },
      { label: 'Feedback', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'EULA', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: MessageCircle, href: '#', label: 'Discord' },
  ];

  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="section-padding py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
              {/* Brand Column */}
              <div className="col-span-2 md:col-span-3 lg:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#f6e194] to-[#e7885a] flex items-center justify-center">
                      <Flame className="w-7 h-7 text-black" />
                    </div>
                    <div className="absolute inset-0 w-12 h-12 rounded-lg bg-[#f6e194] blur-xl opacity-50" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-gradient-gold font-['Teko'] tracking-wider">
                      SHANI
                    </span>
                    <span className="text-xs text-white/50 tracking-widest -mt-1">
                      FREE FIRE
                    </span>
                  </div>
                </div>

                <p className="text-white/60 text-sm mb-6 max-w-sm">
                  The ultimate battle royale experience. Join millions of players worldwide 
                  in intense 10-minute matches where only the strongest survive.
                </p>

                {/* Social Links */}
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-white/60 hover:text-[#f6e194] hover:border-[#f6e194]/50 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Game Links */}
              <div>
                <h4 className="text-white font-bold font-['Teko'] text-lg mb-4">Game</h4>
                <ul className="space-y-3">
                  {footerLinks.game.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-white/60 hover:text-[#f6e194] transition-colors text-sm flex items-center gap-1 group"
                      >
                        <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Community Links */}
              <div>
                <h4 className="text-white font-bold font-['Teko'] text-lg mb-4">Community</h4>
                <ul className="space-y-3">
                  {footerLinks.community.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-white/60 hover:text-[#f6e194] transition-colors text-sm flex items-center gap-1 group"
                      >
                        <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support Links */}
              <div>
                <h4 className="text-white font-bold font-['Teko'] text-lg mb-4">Support</h4>
                <ul className="space-y-3">
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-white/60 hover:text-[#f6e194] transition-colors text-sm flex items-center gap-1 group"
                      >
                        <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h4 className="text-white font-bold font-['Teko'] text-lg mb-4">Legal</h4>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-white/60 hover:text-[#f6e194] transition-colors text-sm flex items-center gap-1 group"
                      >
                        <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-white font-bold font-['Teko'] text-xl mb-1">
                    Stay in the Loop
                  </h4>
                  <p className="text-white/50 text-sm">
                    Get the latest updates, events, and exclusive rewards.
                  </p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#f6e194]/50 transition-colors"
                    />
                  </div>
                  <button className="btn-primary py-3 px-6">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="section-padding py-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/40 text-sm text-center md:text-left">
                © 2024 Shani Free Fire. All rights reserved. 
                <span className="hidden md:inline"> • </span>
                <br className="md:hidden" />
                Made with passion for gamers worldwide.
              </p>
              <div className="flex items-center gap-6">
                <span className="text-white/40 text-sm">Available on:</span>
                <div className="flex gap-4">
                  <Apple className="w-5 h-5 text-white/40" />
                  <Play className="w-5 h-5 text-white/40" />
                  <Gamepad2 className="w-5 h-5 text-white/40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
