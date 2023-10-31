"use client"

import Image from 'next/image';
import ApiRequest from './components/chat';
import Sidebar from './components/sidebar';
import CompactNavbar from './components/navbar'

export default function Home() {
  return (
    
    <main className="flex-layout">
      <body>
      <CompactNavbar/>
      
      <div className="flex-grow flex justify-center items-center">
      <Sidebar />
        <ApiRequest />

      </div>
      </body>
      
    </main>
  );
}




