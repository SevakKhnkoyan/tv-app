import { motion } from 'framer-motion';
import tvIcon from '../assets/icons/Group 54.png';
import homeIcon from '../assets/icons/Group 46.png';
import videoIcon from '../assets/icons/Group 56.png';
import genresIcon from '../assets/icons/Group 53.png';
import watchLaterIcon from '../assets/icons/Group 47.png';
import searchIcon from '../assets/icons/ICON - Search.png';
import profileImage from '../assets/SeongGihun.png';

type MenuItem = { key: string; icon?: string; label: string };

type SidebarMenuProps = {
  selectedMenuItem: string;
  onSelectMenuItem: (key: string) => void;
};

const menuItems: MenuItem[] = [
  { key: 'search', icon: searchIcon, label: 'Search' },
  { key: 'home', icon: homeIcon, label: 'Home' },
  { key: 'tvShows', icon: tvIcon, label: 'TV Shows' },
  { key: 'movies', icon: videoIcon, label: 'Movies' },
  { key: 'genres', icon: genresIcon, label: 'Genres' },
  { key: 'watchLater', icon: watchLaterIcon, label: 'Watch Later' },
];

const bottomItems: MenuItem[] = [
  { key: 'lanfuange', label: 'Language' },
  { key: 'getHelp', label: 'Get Help' },
  { key: 'exit', label: 'Exit' },
];

export default function SidebarMenu({selectedMenuItem, onSelectMenuItem}: SidebarMenuProps) {
  return (
    <motion.aside
      className="
        group/sidebar
        fixed left-0 top-0 h-full
        bg-black text-white
        overflow-x-hidden 
        overflow-y-auto
        [scrollbar-width:none]
        [-ms-overflow-style:none]
        [&::-webkit-scrollbar]:hidden
      "
      initial={{ width: 130 }}
      whileHover={{
        width: 350,
        background: 'linear-gradient(to right, rgba(0,0,0,1) 130px, rgba(0,0,0,0.8) 100%)'
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex h-full px-9 py-14 flex-col justify-between">
        <div>
          <div className="flex items-center gap-4 opacity-0 transition-opacity group-hover/sidebar:opacity-100">
            <img
              src={profileImage}
              alt="Profile"
              className="h-20 w-20 rounded-full object-cover"
            />
            <span className="whitespace-nowrap font-bold text-2xl text-[#F1F1F1]">
              Daniel
            </span>
          </div>
          <ul className="mt-8 flex flex-col gap-6">
            {menuItems.map((item) => {
              const isActive = selectedMenuItem === item.key;
              return (
                <li
                  key={item.key}
                  onClick={() => onSelectMenuItem(item.key)}
                  className={`
                    group/menu-item 
                    flex items-center 
                    gap-14 p-4
                    cursor-pointer
                    ${isActive
                      ? 'bg-[#3B486D] group-hover/sidebar:rounded-xl rounded-full'
                      : 'hover:bg-[#3B486D] rounded-xl'}
                  `}
                >
                  <img
                    src={item.icon}
                    alt=""
                    className="
                      h-6 w-6 
                      filter grayscale 
                      opacity-80 scale-100 
                      transition duration-200 ease-in-out 
                      group-hover/menu-item:grayscale-0 
                      group-hover/menu-item:opacity-100 
                      group-hover/menu-item:scale-110
                    "
                  />
                  <span
                    className="
                      whitespace-nowrap
                      text-2xl
                      filter grayscale 
                      opacity-80
                      group-hover/menu-item:grayscale-0 
                      group-hover/menu-item:opacity-100 
                      group-hover/menu-item:font-bold
                    "
                  >
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <ul className="mt-8 flex flex-col">
          {bottomItems.map((item) => (
            <li
              key={item.key}
              className="
                group/bottom-item
                flex items-center
                gap-4 px-4 py-2
                cursor-pointer
                hover:bg-[#3B486D]
              "
            >
              <span
                className="
                  whitespace-nowrap
                  uppercase
                  tracking-[4px]
                  text-gray-400
                  opacity-0 transition-opacity
                  group-hover/sidebar:opacity-100
                  group-hover/bottom-item:text-white
                  group-hover/bottom-item:font-bold
                "
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.aside>
  );
}
