import '@formatjs/intl-pluralrules'
import '@formatjs/intl-pluralrules/locale-data/en'
import '@formatjs/intl-pluralrules/locale-data/fr'
import '@formatjs/intl-pluralrules/locale-data/tr'
import '@formatjs/intl-pluralrules/locale-data/de'
import '@formatjs/intl-pluralrules/locale-data/ar'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

const resources = {
  en: {
    translation: {
      tabs: {
        home: '',
        history: 'History',
        settings: 'Settings',
        profile: 'Profile'
      },
      home: {
        title: 'MindVerse',
        subtitle: 'Tell us your dream',
        placeholder: 'Describe your dream here...',
        interpret: 'Interpret Dream',
        interpretation: "Interpretation of your dream",
        loading: 'Interpreting your dream...',
        error: 'Error interpreting dream. Please try again.'
      },
      history: {
        title: 'Dream History',
        empty: 'No dreams saved yet',
        delete: 'Delete'
      },
      settings: {
        title: 'Settings',
        darkMode: 'Dark Mode',
        language: 'Language',
        about: 'About MindVerse'
      },
      profile: {
        title: 'Profile',
        email: 'Email',
        joined: 'Joined',
        signOut: 'Sign Out',
        loading: 'Loading...',
        networkError: 'Network error',
        loadFailed: 'Failed to load profile'
      }
    }
  },
  fr: {
    translation: {
      tabs: {
        home: '',
        history: 'Historique',
        settings: 'Paramètres',
        profile: 'Profil'
      },
      home: {
        title: 'MindVerse',
        subtitle: 'Racontez votre rêve',
        placeholder: 'Décrivez votre rêve ici...',
        interpret: 'Interpréter le Rêve',
        interpretation: 'Interprétation de votre rêve',
        loading: 'Interprétation de votre rêve...',
        error: 'Erreur lors de l\'interprétation. Veuillez réessayer.'
      },
      history: {
        title: 'Historique des Rêves',
        empty: 'Aucun rêve enregistré',
        delete: 'Supprimer'
      },
      settings: {
        title: 'Paramètres',
        darkMode: 'Mode Sombre',
        language: 'Langue',
        about: 'À propos de MindVerse'
      },
      profile: {
        title: 'Profil',
        email: 'Email',
        joined: 'Inscrit le',
        signOut: 'Se Déconnecter',
        loading: 'Chargement...',
        networkError: 'Erreur réseau',
        loadFailed: 'Échec du chargement du profil'
      }
    }
  },
  tr: {
    translation: {
      tabs: {
        home: '',
        history: 'Geçmiş',
        settings: 'Ayarlar',
        profile: 'Profil'
      },
      home: {
        title: 'MindVerse',
        subtitle: 'Rüyanızı anlatın',
        placeholder: 'Rüyanızı buraya yazın...',
        interpret: 'Rüyayı Yorumla',
        interpretation: 'Rüyanızın Yorumu',
        loading: 'Rüyanız yorumlanıyor...',
        error: 'Rüya yorumlanırken hata oluştu. Lütfen tekrar deneyin.'
      },
      history: {
        title: 'Rüya Geçmişi',
        empty: 'Henüz kaydedilmiş rüya yok',
        delete: 'Sil'
      },
      settings: {
        title: 'Ayarlar',
        darkMode: 'Karanlık Mod',
        language: 'Dil',
        about: 'MindVerse Hakkında'
      },
      profile: {
        title: 'Profil',
        email: 'E-posta',
        joined: 'Katılma Tarihi',
        signOut: 'Çıkış Yap',
        loading: 'Yükleniyor...',
        networkError: 'Ağ hatası',
        loadFailed: 'Profil yüklenemedi'
      }
    }
  },
  de: {
    translation: {
      tabs: {
        home: '',
        history: 'Verlauf',
        settings: 'Einstellungen',
        profile: 'Profil'
      },
      home: {
        title: 'MindVerse',
        subtitle: 'Erzählen Sie uns Ihren Traum',
        placeholder: 'Beschreiben Sie Ihren Traum hier...',
        interpret: 'Traum Interpretieren',
        interpretation: 'Deutung Ihres Traums',
        loading: 'Ihr Traum wird interpretiert...',
        error: 'Fehler bei der Interpretation. Bitte versuchen Sie es erneut.'
      },
      history: {
        title: 'Traumverlauf',
        empty: 'Noch keine Träume gespeichert',
        delete: 'Löschen'
      },
      settings: {
        title: 'Einstellungen',
        darkMode: 'Dunkelmodus',
        language: 'Sprache',
        about: 'Über MindVerse'
      },
      profile: {
        title: 'Profil',
        email: 'E-Mail',
        joined: 'Beigetreten am',
        signOut: 'Abmelden',
        loading: 'Wird geladen...',
        networkError: 'Netzwerkfehler',
        loadFailed: 'Fehler beim Laden des Profils'
      }
    }
  },
  ar: {
    translation: {
      tabs: {
        home: '',
        history: 'السجل',
        settings: 'الإعدادات',
        profile: 'الملف الشخصي'
      },
      home: {
        title: 'مايندفيرس',
        subtitle: 'أخبرنا عن حلمك',
        placeholder: 'صف حلمك هنا...',
        interpret: 'تفسير الحلم',
        interpretation: "تفسير حلمك",
        loading: 'جاري تفسير حلمك...',
        error: 'خطأ في تفسير الحلم. يرجى المحاولة مرة أخرى.'
      },
      history: {
        title: 'سجل الأحلام',
        empty: 'لا توجد أحلام محفوظة',
        delete: 'حذف'
      },
      settings: {
        title: 'الإعدادات',
        darkMode: 'الوضع الداكن',
        language: 'اللغة',
        about: 'حول مايندفيرس'
      },
      profile: {
        title: 'الملف الشخصي',
        email: 'البريد الإلكتروني',
        joined: 'تاريخ الانضمام',
        signOut: 'تسجيل الخروج',
        loading: 'جاري التحميل...',
        networkError: 'خطأ في الشبكة',
        loadFailed: 'فشل تحميل الملف الشخصي'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: Localization.locale,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;