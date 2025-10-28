# 🌳 JSON Tree Visualizer

A production-grade, interactive JSON visualization tool built with React, React Flow, and TailwindCSS. Transform complex JSON data into beautiful, explorable tree diagrams.

![JSON Tree Visualizer](https://via.placeholder.com/800x400?text=JSON+Tree+Visualizer)

## ✨ Features

### Core Functionality
- **📝 JSON Input & Validation** - Paste or type JSON with real-time validation and error handling
- **🌳 Interactive Tree Visualization** - Hierarchical node-based visualization using React Flow
- **🔍 Smart Search** - Search nodes by JSON path with automatic highlighting and centering
- **📋 Copy Path** - Click any node to copy its JSON path to clipboard
- **💾 Export as Image** - Download your tree visualization as a high-quality PNG
- **🌓 Dark/Light Mode** - Beautiful themes with persistent preference storage
- **🔔 Toast Notifications** - Elegant feedback for all user actions

### Node Types
- **🗂️ Object Nodes** - Blue gradient with database icon
- **📚 Array Nodes** - Green gradient with list icon
- **🔢 Primitive Nodes** - Amber gradient with hash icon

### Controls
- **🔍 Zoom In/Out** - Smooth zoom controls
- **🎯 Fit View** - Auto-fit the entire tree to viewport
- **🖱️ Pan & Navigate** - Drag to explore large JSON trees
- **⌨️ Keyboard Shortcuts** - Ctrl+Enter to visualize

## 🚀 Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **React Flow** - Interactive node-based visualization
- **TailwindCSS** - Styling and theming
- **Motion (Framer Motion)** - Smooth animations
- **Dagre** - Hierarchical graph layout
- **html-to-image** - Image export functionality
- **Lucide React** - Beautiful icons

## 📂 Project Structure

```
src/
├── App.tsx                      # Main application component
├── components/
│   ├── JsonInputPanel.tsx       # JSON input interface
│   ├── TreeCanvas.tsx           # React Flow visualization
│   ├── NodeRenderer.tsx         # Custom node component
│   ├── SearchBar.tsx            # Search functionality
│   ├── Toolbar.tsx              # Zoom and export controls
│   ├── ThemeToggle.tsx          # Dark/light mode switch
│   └── Toast.tsx                # Notification system
├── hooks/
│   ├── useTheme.ts              # Theme management
│   ├── useJsonParser.ts         # JSON parsing logic
│   ├── useToast.ts              # Toast notifications
│   └── useSearchNode.ts         # Search functionality
└── utils/
    ├── jsonToNodes.ts           # JSON to React Flow conversion
    ├── layoutHelper.ts          # Dagre layout algorithm
    ├── exportImage.ts           # Image export utility
    └── debounce.ts              # Debounce utility
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Install Dependencies

```bash
npm install react reactflow dagre motion lucide-react html-to-image
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

## 📖 Usage Guide

### Basic Usage

1. **Enter JSON**: Paste or type your JSON in the left panel
2. **Visualize**: Click the "Visualize" button or press `Ctrl+Enter`
3. **Explore**: Pan, zoom, and click nodes to interact with the tree
4. **Search**: Use the search bar to find specific nodes by path (e.g., `$.user.address.city`)
5. **Copy Paths**: Click any node to copy its JSON path to clipboard
6. **Export**: Use the download button to save the tree as an image

### Search Syntax

The search feature supports standard JSON path notation:

- Object properties: `$.user.name`
- Nested properties: `$.user.address.city`
- Array indices: `$.orders[0]`
- Nested arrays: `$.items[0].tags[1]`

### Keyboard Shortcuts

- `Ctrl + Enter` - Visualize JSON
- Mouse wheel - Zoom in/out
- Click + Drag - Pan canvas
- Click node - Copy path to clipboard

## 🎨 Customization

### Themes

The application automatically detects your system preference and persists your choice in localStorage. Toggle between light and dark modes using the sun/moon icon in the header.

### Node Colors

You can customize node colors by modifying the `NodeRenderer.tsx` component:

```tsx
// Object nodes - Blue
from-blue-500/20 to-blue-600/20

// Array nodes - Green  
from-green-500/20 to-green-600/20

// Primitive nodes - Amber
from-amber-500/20 to-amber-600/20
```

## 🧪 Example JSON

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "zipCode": "10001"
    }
  },
  "orders": [
    {
      "id": 101,
      "product": "Laptop",
      "price": 999.99,
      "quantity": 1
    }
  ],
  "premium": true
}
```

## 🚀 Performance

The application is optimized for large JSON structures:

- **Efficient Traversal**: O(n) complexity for JSON conversion
- **Memoized Transformations**: Prevents unnecessary re-renders
- **Debounced Search**: 250ms delay for smooth typing
- **Lazy Rendering**: React Flow's built-in virtualization
- **Tested with**: 1,000+ nodes without performance degradation

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **React Flow** - Powerful visualization library
- **Dagre** - Graph layout algorithm
- **TailwindCSS** - Utility-first CSS framework
- **Motion** - Animation library

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ by a senior full-stack frontend engineer
