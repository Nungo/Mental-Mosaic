# Mental Mosaic 🧠✨

A modern mental health and wellness tracking application built with React and Tailwind CSS.

## Features

- **Mood Tracking**: Log your daily moods with detailed emotions and contributing factors
- **Journaling**: Express your thoughts and feelings with an intuitive journal interface
- **Dashboard**: Get an overview of your mental health journey with visual insights
- **Resources**: Access curated mental health resources and guides
- **Community**: Connect with others (coming soon)
- **Dark Mode**: Choose between light and dark themes for comfortable viewing

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS 3
- **Charts**: Chart.js + react-chartjs-2
- **Routing**: React Router DOM v6
- **Storage**: LocalStorage for data persistence

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Mental-Mosaic.git
cd Mental-Mosaic
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Mental-Mosaic/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Layout.jsx
│   │   ├── Modal.jsx
│   │   └── Notification.jsx
│   ├── context/          # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useLocalStorage.js
│   │   ├── useMoodData.js
│   │   └── useJournalData.js
│   ├── pages/            # Page components
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── MoodTracker.jsx
│   │   ├── Journal.jsx
│   │   ├── Community.jsx
│   │   ├── Resources.jsx
│   │   ├── Settings.jsx
│   │   ├── Privacy.jsx
│   │   └── Terms.jsx
│   ├── App.jsx           # Main app component with routing
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles with Tailwind
├── public/               # Static assets
├── old-files/            # Original HTML/CSS/JS files (archived)
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── package.json          # Dependencies and scripts
```

## Features in Detail

### Authentication
- Demo authentication system (use any email/password to login)
- User profile management
- Session persistence with localStorage

### Mood Tracking
- Quick mood check from dashboard
- Detailed mood entries with:
  - Mood selection (Great, Good, Okay, Low, Terrible)
  - Intensity rating (1-10)
  - Multiple emotions
  - Contributing factors
  - Notes
- Mood history with filtering
- Statistics and insights

### Journal
- Rich text entries with title and content
- Mood tagging (Positive, Neutral, Negative)
- Writing prompts for inspiration
- Search functionality
- Edit and delete entries
- Word count tracking

### Dashboard
- Welcome card with quick mood check
- Mood trends visualization (placeholder for Chart.js)
- Recent journal entries
- Recommended resources
- Clean, intuitive interface

### Settings
- Profile management
- Theme selection (Light/Dark mode)
- Notification preferences
- Data export/delete options

## Data Storage

Currently, all user data is stored locally in the browser using `localStorage`. This includes:
- User authentication data
- Mood entries
- Journal entries
- User preferences
- Theme settings

**Note**: Data is not synced across devices. Clearing browser data will remove all entries.

## Customization

### Changing Colors

Edit `tailwind.config.js` to customize the color palette:

```js
colors: {
  primary: '#5b87f9',
  secondary: '#6dcebd',
  accent: '#f9a65b',
  // Add more colors...
}
```

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/Sidebar.jsx`

## Future Enhancements

- [ ] Real backend API integration
- [ ] Data synchronization across devices
- [ ] Advanced mood analytics with Chart.js
- [ ] AI-powered insights
- [ ] Community features
- [ ] Mobile app version
- [ ] Data export (CSV, JSON)
- [ ] Reminders and notifications
- [ ] Multi-language support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Disclaimer

**Mental Mosaic is a self-help tool and is NOT a substitute for professional medical advice, diagnosis, or treatment.**

If you are experiencing a mental health crisis or emergency, please contact:
- National Suicide Prevention Lifeline: 988 (US)
- Crisis Text Line: Text "HELLO" to 741741
- Emergency Services: 911 (US)

## Support

For questions or support, please open an issue on GitHub or contact support@mentalmosaic.com

---

Made with ❤️ for mental wellness
