import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  icon: string;
  title: string;
  description: string;
}

export const SidebarMenuItem = ({ to, icon, title, description }: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex justify-center items-center p-2 transition-colors hover:bg-gray-800/50 rounded-lg ${isActive ? 'bg-gray-800/50' : ''}`
      }
    >
      <i className={`${icon} text-2xl mr-2 text-cyan-400`}></i>
      <div className="flex flex-col grow">
        <span className="font-semibold text-lg">{title}</span>
        <span className="text-gray-400 text-sm">{description}</span>
      </div>
    </NavLink>
  );
};
