"use client";

import {
  useCallback,
  useState,
} from 'react';

import useLoginModal from 'app/hooks/useLoginModal';
import useRegisterModal from 'app/hooks/useRegisterModal';
import useRentModal from 'app/hooks/useRentModal';
import { SafeUser } from 'app/types';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import {
  IconBrandAirbnb,
  IconCalendarCheck,
  IconHeart,
  IconHomeCheck,
  IconLogout,
  IconMenu,
  IconRoute,
  IconUser,
  IconUserPlus,
} from '@tabler/icons-react';

import Avatar from '../Avatar';
import Container from '../Container';
import Divider from '../Divider';
import Categories from './Categories';
import Logo from './Logo';
import Menu from './Menu';
import Search from './Search';

interface HeaderProps {
  currentUser?: SafeUser | null;
}

const Header = ({ currentUser }: HeaderProps) => {
  const [isOPen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOPen);
  }, [isOPen]);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="fixed z-10 w-full border-b-[1px] bg-white py-[10px] shadow-sm">
      <Container>
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
          <Logo />

          <Search />

          <div className="flex flex-row items-center gap-3">
            <div
              onClick={onRent}
              className="hidden cursor-pointer rounded-md px-4 py-2 text-sm font-semibold transition hover:bg-neutral-100 md:block"
            >
              Airbnb Your Home
            </div>
            <div
              className="flex cursor-pointer flex-row items-center gap-3 rounded-md border-[1px] p-[9px] transition hover:shadow-md md:px-2 md:py-[4px]"
              onClick={toggleOpen}
            >
              <IconMenu size={16} className="text-slate-600" />
              <Avatar src={currentUser?.image} />
            </div>
          </div>
        </div>
      </Container>

      <Categories />

      {isOPen && (
        <div className="absolute right-3 top-14 w-[180px] overflow-hidden rounded-md border-[1px] bg-white text-xs shadow-md">
          <Menu.Group>
            {currentUser ? (
              <>
                <Menu.Item
                  onClick={() => router.push("/trips")}
                  label="My Trips"
                  leftIcon={IconRoute}
                />
                <Menu.Item
                  onClick={() => router.push("/favorites")}
                  label="My Favorites"
                  leftIcon={IconHeart}
                />
                <Menu.Item
                  onClick={() => router.push("/reservations")}
                  label="My Reservation"
                  leftIcon={IconCalendarCheck}
                />
                <Menu.Item
                  onClick={() => router.push("/properties")}
                  label="My Properties"
                  leftIcon={IconHomeCheck}
                />
                <Menu.Item
                  onClick={rentModal.onOpen}
                  label="Airbnb My Home"
                  leftIcon={IconBrandAirbnb}
                />
                <Divider />
                <Menu.Item
                  onClick={() => signOut()}
                  label="Logout"
                  leftIcon={IconLogout}
                />
              </>
            ) : (
              <>
                <Menu.Item
                  onClick={loginModal.onOpen}
                  label="Login"
                  leftIcon={IconUser}
                />
                <Menu.Item
                  onClick={registerModal.onOpen}
                  label="Create Account"
                  leftIcon={IconUserPlus}
                />
              </>
            )}
          </Menu.Group>
        </div>
      )}
    </div>
  );
};

export default Header;
