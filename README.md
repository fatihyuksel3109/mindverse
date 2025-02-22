# MindVerse (Dream Teller App) (MVP)

MindVerse is an AI-powered mobile app that interprets your dreams. The app uses GPT-4 (or similar) to provide detailed dream interpretations and supports multiple languages. It includes features like dark mode and local storage of dream history.

## Tech Stack

### Frontend:
- **React Native (Expo)**: Framework for building the mobile app.
  - **Expo** is used for ease of setup, faster development cycles, and native capabilities (such as push notifications, camera access, etc.).
- **React Navigation**: Navigation library for managing screen transitions.
- **Axios**: HTTP client for making API requests to the OpenAI API (or other AI services).
- **i18next** & **expo-localization**: For supporting multiple languages in the UI and the AI dream interpretation.
- **React Native Paper**: UI library for ready-made components (e.g., buttons, cards, text inputs) with Material Design.
- **React Native AsyncStorage**: Used for storing recent dreams locally.

### Backend:
- **OpenAI GPT-4 (or Claude API)**: For generating dream interpretations based on the input text.
  - OpenAI's API is used to process the dream text and return an AI-generated interpretation.

### Additional Libraries:
- **React Native Dark Mode**: Automatically or manually toggle dark mode in the app.

## Features

### 1. **User Input for Dreams**
- **Dream Description**: Users can type in their dream using a text input field.
- **Language Selection**: Users can select their preferred language (English, French, Turkish, etc.).
  - Language selection affects both the app UI and the dream interpretation.

### 2. **AI-Powered Dream Interpretation**
- **Detailed Responses**: The app uses AI to provide a detailed interpretation of the dream description.
  - The AI model (GPT-4 or Claude) is asked to analyze the text and provide a meaningful interpretation.
  - The interpretation will vary based on the dream content and the language chosen.

### 3. **Multi-Language Support**
- The app supports multiple languages using **i18next** and **expo-localization**.
  - Translated UI strings are loaded dynamically based on the user's selected language.

### 4. **Dark Mode**
- The app includes **dark mode**, either following the system settings or through manual user toggling.
- The UI adjusts to dark and light themes using **React Native Paper** components and Expo's theme handling.

### 5. **Dream History**
- **Local Storage**: The app stores the last 3-5 dream interpretations in **AsyncStorage** for quick access to recent dreams.
- Users can view the history of interpreted dreams without needing to re-enter them.

---

## Screens

### 1. **Home Screen**
- **Text Input**: A text field where users can type in their dream description.
- **Language Selector**: Dropdown or button options to select the preferred language.
- **Interpret Dream Button**: Button to send the dream description to the AI model for interpretation.

### 2. **Interpretation Screen**
- **AI Response**: Displays the AI-generated dream interpretation.
- **Save Button**: Option to save the interpretation to the user's dream history.
- **Back Button**: Navigate back to the home screen.
  
### 3. **Dream History Screen**
- **List of Saved Dreams**: Display the list of saved dream interpretations.
- **View Details**: Click on any dream to see the interpretation again.
- **Delete Option**: Remove a dream from history.

### 4. **Settings Screen**
- **Dark Mode Toggle**: Switch between light and dark mode.
- **Language Selector**: Choose the language for UI and AI interpretation.

---

## Setting Up the Project

### 1. **Clone the Repository**
```sh
git clone https://github.com/fatihyuksel3109/mindverse.git
cd mindverse
```

### 2. **Install Dependencies**
```sh
npm install
```

### 3. **Set Up API Keys**
- Create an `.env` file in the root directory with the following content:
```env
EXPO_PUBLIC_OPENAI_API_KEY=your_api_key
```

### 4. **Run the App**
```sh
npm start
```
This will start the development server, and you can open the app using the Expo Go app on your mobile device or an Android/iOS simulator.

---

## Future Enhancements
- **Voice Input**: Allow users to speak their dreams instead of typing them.
- **User Profiles**: Integrate Firebase for user authentication and dream history across devices.
- **More Detailed Analysis**: Improve the AI's ability to provide more detailed and personalized dream interpretations.
- **Dream Sharing**: Add options to share dream interpretations on social media.

---

## Contributing

Feel free to fork the repository and submit pull requests! If you find any bugs or have feature suggestions, please open an issue.
