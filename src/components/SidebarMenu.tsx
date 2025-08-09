import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import tvIcon from '../assets/icons/Group 54.png';
import homeIcon from '../assets/icons/Group 46.png';
import videoIcon from '../assets/icons/Group 56.png';
import genresIcon from '../assets/icons/Group 53.png';
import watchLaterIcon from '../assets/icons/Group 47.png';
import searchIcon from '../assets/icons/ICON - Search.png';

type MenuItem = { icon?: ReactNode; label: string };

const menuItems: MenuItem[] = [
  { icon: searchIcon, label: 'Search' },
  { icon: homeIcon, label: 'Home' },
  { icon: videoIcon, label: 'Movies' },
  { icon: tvIcon, label: 'TV Shows' },
  { icon: genresIcon, label: 'Genres' },
  { icon: watchLaterIcon, label: 'Watch Later' },
];

const bottomItems: MenuItem[] = [
  { label: 'Language' },
  { label: 'Get Help' },
  { label: 'Exit' },
];

export default function SidebarMenu() {
  return (
    <motion.aside
      className="group/sidebar fixed left-0 top-0 h-full bg-black text-white overflow-hidden"
      initial={{ width: 60 }}
      whileHover={{ width: 200, backgroundColor: 'rgba(0,0,0,0.8)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <div className="flex items-center gap-4 px-9 py-14 opacity-0 transition-opacity group-hover/sidebar:opacity-100">
            <img
              src="/src/assets/SeongGihun.png"
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="whitespace-nowrap">
              Daniel
            </span>
          </div>
          <ul className="mt-4 flex flex-col">
            {menuItems.map((item, i) => (
              <li
                key={i}
                className="group/menu-item flex items-center gap-4 px-4 py-2 hover:bg-gray-800"
              >
                {typeof item.icon === 'string' ? (
                  <img
                    src={item.icon}
                    alt=""
                    className="h-6 w-6 object-contain filter grayscale transition group-hover/menu-item:grayscale-0"
                  />
                ) : (
                  <span className="text-xl text-gray-400 transition group-hover/menu-item:text-white">
                    {item.icon}
                  </span>
                )}
                <span className="whitespace-nowrap opacity-0 transition-opacity group-hover/sidebar:opacity-100">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <ul className="mb-4 flex flex-col">
          {bottomItems.map((item, i) => (
            <li
              key={i}
              className="group/menu-item flex items-center gap-4 px-4 py-2 hover:bg-gray-800"
            >
              <span className="text-xl text-gray-400 transition group-hover/menu-item:text-white">
                {item.icon}
              </span>
              <span className="whitespace-nowrap opacity-0 transition-opacity group-hover/sidebar:opacity-100">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.aside>
  );
}
