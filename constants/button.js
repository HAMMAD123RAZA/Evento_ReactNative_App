// constants/button.js
import tailwind from 'twrnc';
import { Colors } from './Colors';

export const button = tailwind.style(
  `p-3 font-bold text-white`, 
  { backgroundColor: Colors.primary } 
);