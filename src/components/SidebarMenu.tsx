import { motion } from 'framer-motion';
import { HomeOutlined, SearchOutlined, VideoCameraOutlined } from '@ant-design/icons';

const menuItems = [
  { icon: <SearchOutlined />, label: 'Search' },
  { icon: <HomeOutlined />, label: 'Home' },
  { icon: <VideoCameraOutlined />, label: 'Movies' },
];

export default function SidebarMenu() {
  return (
    <motion.aside
      className="fixed left-0 top-0 h-full bg-black text-white"
      initial={{ width: 60 }}
      whileHover={{ width: 200, backgroundColor: 'rgba(0,0,0,0.8)' }}
      transition={{ duration: 0.3 }}
    >
      <ul className="flex flex-col mt-8">
        {menuItems.map((item, i) => (
          <li key={i} className="flex items-center gap-4 px-4 py-2 hover:bg-gray-800">
            {item.icon}
            <span className="whitespace-nowrap">{item.label}</span>
          </li>
        ))}
      </ul>
    </motion.aside>
  );
}
