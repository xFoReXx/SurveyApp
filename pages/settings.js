// pages/settings.js
import useTheme from '../hooks/useTheme';

export default function Settings() {
	const { theme, toggleTheme } = useTheme();

	return (
		<div className="settings-container">
			<h1>Ustawienia</h1>

			<div className="settings-card">
				<h2>Motyw</h2>
				<div className="settings-item">
					<label htmlFor="theme-toggle">Ciemny</label>
					<div className="toggle-switch">
						<input id="theme-toggle" type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
						<span className="toggle-slider"></span>
					</div>
				</div>
			</div>
		</div>
	);
}
