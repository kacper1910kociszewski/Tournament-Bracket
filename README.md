# Tournament Bracket

A web application for managing tournament brackets, built with React and Firebase.

## 🏆 Features

- Create and manage tournament brackets
- Real-time updates with Firebase
- Modern UI with Material-UI components
- Responsive design

## 🚀 Quick Start (Web Application)

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Setup

Copy `.env.example` to `.env` and configure your Firebase credentials:

```bash
cp .env.example .env
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 📁 Project Structure

```
Tournament-Bracket/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts
│   ├── firebase/       # Firebase configuration
│   ├── pages/          # Page components
│   ├── services/       # API services
│   └── ...
├── public/             # Static assets
└── ...
```

## 🎙️ Audio Transcription System

This repository also includes an automated transcription system for Polish audio recordings using WhisperX.

**Key features:**
- Automated daily transcription at 20:00
- Polish language support
- Speaker diarization (identifies who spoke when)
- GPU acceleration (RTX 3060 support)
- Organized date-based archiving
- Comprehensive logging

### 📚 Full Documentation

For complete setup and usage instructions, see:
**[TRANSCRIPTION_README.md](./TRANSCRIPTION_README.md)**

### Quick Test

After setting up Python and dependencies:

```bash
python test_system.py
```

## 🛠 Technologies

### Web Application
- React 19
- Vite
- Material-UI (MUI)
- Firebase
- React Router

### Transcription System
- Python 3.10+
- WhisperX
- PyTorch
- HuggingFace Transformers

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

If you encounter any issues or have questions, please open an issue on GitHub.
