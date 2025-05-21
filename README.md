# FitnessApp

**Cross-platform mobile fitness tracking app** built with **Angular**, **Ionic**, and **Capacitor**. Supports both Android and iOS platforms.

---

## 🚀 Features (Planned / In Progress)

* [x] User registration and authentication
* [x] Workout session tracking
* [ ] Daily/weekly activity dashboard
* [ ] Integration with device sensors (steps, heart rate, GPS)
* [x] Cross-platform sync (Android/iOS)
* [x] Dark mode support

---

## 📦 Tech Stack

* **Frontend**: Angular 16 + Ionic 7
* **Mobile Runtime**: Capacitor
* **Languages**: TypeScript, SCSS, HTML, Swift, Java
* **Testing**: Karma, Jasmine (configured)

---

## 🛠️ Getting Started

### Prerequisites

* Node.js >= 18
* Ionic CLI: `npm install -g @ionic/cli`
* Android Studio / Xcode for native builds

### Installation

```bash
git clone https://github.com/swift102/FitnessApp.git
cd FitnessApp
npm install
```

### Run in Browser (Dev)

```bash
ionic serve
```

### Run on Android/iOS

```bash
ionic build
npx cap sync
npx cap open android   # or ios
```

---

## 📁 Folder Structure

* `src/` - Main Angular application
* `android/` - Native Android platform code
* `ios/` - Native iOS platform code
* `.vscode/` - Editor settings
* `capacitor.config.ts` - Capacitor config

---

## ✅ Scripts

| Command                    | Description                       |
| -------------------------- | --------------------------------- |
| `ionic serve`              | Launch dev server                 |
| `ionic build`              | Compile Angular app               |
| `npx cap sync`             | Sync web code to native platforms |
| `npx cap open android/ios` | Open native IDE                   |
| `npm test`                 | Run unit tests                    |

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Contributions

Issues, PRs, and feedback are welcome!

---

## 📬 Contact

Feel free to reach out via GitHub Issues or Discussions.
