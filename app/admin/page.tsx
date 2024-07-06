"use client";
import Sidebar from '../admin/components/Sidebar';
import ContentArea from '../admin/components/ContentArea';

export default function AdminPanel() {
  return (
    <div className="flex h-screen"> 
      <Sidebar />
      <ContentArea />
    </div>
  );
}
