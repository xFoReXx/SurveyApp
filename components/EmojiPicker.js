// components/EmojiPicker.js
export default function EmojiPicker({ emojis, selectedEmoji, onSelect }) {
    return (
      <div className="emoji-picker">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            type="button"
            className={`emoji-btn ${selectedEmoji === emoji ? 'selected' : ''}`}
            onClick={() => onSelect(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    );
  }