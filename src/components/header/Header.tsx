import { IGameData } from '@/types/home';
import Link from 'next/link';
import React, { useId, useState } from 'react';
import styles from '../../styles/Style.module.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BiSolidUser, BiSolidBookmarks, BiSolidDoorOpen } from 'react-icons/bi';
import { handleSearch } from '@/api/api';
import { useSession, signOut } from 'next-auth/react';
import LocaleSwitcher from '../switcher/LocaleSwitcher';

type Props = {};

const Header = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const user = useSession();
  const id = useId();

  async function wrapperHandleSearch(query: string) {
    await handleSearch(query, setIsLoading, setOptions);
  }

  const router = useRouter();
  const handleGameSelect = (selected: any) => {
    if (selected.length > 0) {
      const slug = selected[0].slug;
      router.push(`/games/${slug}`);
    }
  };

  return (
    <Navbar sticky="top" bg="dark" variant={'dark'} expand="lg">
      <Link href="/">
        <Image width={49} height={49} src="/logo.png" alt="logo" />
      </Link>
      <Nav className="me-auto">
        <AsyncTypeahead
          id="search-bar"
          isLoading={isLoading}
          labelKey="label"
          onSearch={wrapperHandleSearch}
          options={options}
          onChange={handleGameSelect}
          placeholder="Поиск игр..."
          renderMenuItemChildren={(option: any) => (
            <div
              className="render-option"
              onClick={() => window.scrollTo(0, 0)}
            >
              {option.poster ? (
                <Image
                  src={`${option.poster}`}
                  alt={`${option.name} poster`}
                  style={{ marginRight: '10px', height: '85px' }}
                  width={130}
                  height={100}
                />
              ) : (
                <Image
                  src={'/no-image.jpg'}
                  alt={`${option.name} poster`}
                  style={{ marginRight: '10px', height: '85px' }}
                  width={130}
                  height={100}
                />
              )}
              <div className="render-option-inf">
                <div>{option.label}</div>
                <div style={{ display: 'flex', marginTop: '10px' }}>
                  <span style={{ color: '#5A606B', padding: '3px 5px' }}>
                    {option.date ? option.date.slice(0, 4) : ''}
                  </span>
                  <span
                    style={{
                      color: 'white',
                      marginLeft: '20px',
                      backgroundColor: 'green',
                      padding: '3px 5px',
                    }}
                  >
                    {option.rating}
                  </span>
                </div>
              </div>
            </div>
          )}
        />
      </Nav>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Link
          style={{ color: 'gray', fontWeight: 'bold' }}
          onClick={() => window.scrollTo(0, 0)}
          href="/games"
        >
          Games
        </Link>
        {user?.data ? (
          <NavDropdown
            title={<BiSolidUser size={30} />}
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item>
              <Link
                style={{ color: 'gray' }}
                onClick={() => window.scrollTo(0, 0)}
                href="/profile"
              >
                <BiSolidBookmarks style={{ marginBottom: '3px' }} /> Collection
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item href="#action4">
              <Link
                href="#"
                style={{ color: 'gray' }}
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                <BiSolidDoorOpen style={{ marginBottom: '3px' }} /> Exit
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Link
            style={{ color: 'gray' }}
            onClick={() => window.scrollTo(0, 0)}
            href="/api/auth/signin`"
          >
            <BiSolidDoorOpen size={30} />
          </Link>
        )}
      </Navbar.Collapse>
      <LocaleSwitcher/>
    </Navbar>
  );
};

export default Header;
