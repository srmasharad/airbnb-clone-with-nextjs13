import './globals.css';

import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

import { getCurrentUser } from './actions/getCurrentUser';
import Header from './components/header/Header';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import RentModal from './components/modals/RentModal';
import SearchModal from './components/modals/SearchModal';
import ToasterProvider from './providers/ToasterProvider';
import { SafeUser } from './types';

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en" className={`${nunito.className}`}>
      <body>
        <ToasterProvider />
        <Header currentUser={currentUser as SafeUser} />
        <LoginModal />
        <RegisterModal />
        <RentModal />
        <SearchModal />
        <div className="py-20">{children}</div>
      </body>
    </html>
  );
}
