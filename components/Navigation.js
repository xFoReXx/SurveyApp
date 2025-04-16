import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { logoutUser } from '../firebase/auth';
import useTheme from '../hooks/useTheme';
import { FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image'

export default function Navigation() {
	const router = useRouter();
	const { theme } = useTheme();
	const [isOpen, setIsOpen] = useState(false);

	const handleLogout = async () => {
		try {
			await logoutUser();
			router.push('/');
			setIsOpen(false); // Zamknij menu po wylogowaniu
		} catch (error) {
			console.error('Logout error:', error);
		}
	};

	return (
		<nav className={`main-nav ${theme}`}>
			<div className="nav-logo">
				<Link href="/dashboard" onClick={() => setIsOpen(false)}>
					<Image className="navlogo"
					src="/logo.png"
					width={140}
					height={32}
					alt="Logo"
					/>
				</Link>
			</div>

			{/* Ikona burgera */}
			<button className="burger-menu" onClick={() => setIsOpen(!isOpen)}>
				{isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
			</button>

			{/* Linki nawigacyjne */}
			<ul className={`nav-links ${isOpen ? 'open' : ''}`}>
				<li>
					<Link href="/dashboard" onClick={() => setIsOpen(false)}>
						<span className={router.pathname === '/dashboard' ? 'active' : ''}>Ankiety</span>
					</Link>
				</li>
				<li>
					<Link href="/create-survey" onClick={() => setIsOpen(false)}>
						<span className={router.pathname === '/create-survey' ? 'active' : ''}>Stwórz ankietę</span>
					</Link>
				</li>
				<li>
					<Link href="/settings" onClick={() => setIsOpen(false)}>
						<span className={router.pathname === '/settings' ? 'active' : ''}>Ustawienia</span>
					</Link>
				</li>
				<li>
					<Link href="/profile" onClick={() => setIsOpen(false)}>
						<span className={router.pathname === '/profile' ? 'active' : ''}>Profil</span>
					</Link>
				</li>
				<li>
					<button onClick={handleLogout} className="logout-btn">
						Wyloguj
					</button>
				</li>
			</ul>
		</nav>
	);
}
