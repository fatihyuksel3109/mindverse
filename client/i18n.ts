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
        error: 'Error interpreting dream. Please try again.',
        credits: 'Remaining Interpretations: {{count}}',
        subscribe: 'Subscribe for More',
        minLength: 'Please enter at least {{count}} characters to interpret your dream.',
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
        loadFailed: 'Failed to load profile',
        credits: 'Remaining Interpretations: {{count}}',
        subscribe: 'Subscribe',
      },
      subscribe: {
        title: 'Subscribe for More Interpretations',
        buy: 'Buy Now',
      },
      subscription: {
        single: "1 Interpretation",
        pack10: "10 Interpretations",
        pack20: "20 Interpretations",
      },      
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
        error: 'Erreur lors de l\'interprétation. Veuillez réessayer.',
        credits: 'Interprétations restantes : {{count}}',
        subscribe: 'Abonnez-vous pour plus',
        minLength: 'Veuillez entrer au moins {{count}} caractères pour interpréter votre rêve.',
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
        loadFailed: 'Échec du chargement du profil',
        credits: 'Interprétations restantes : {{count}}',
        subscribe: 'S’abonner',
      },
      subscribe: {
        title: 'Abonnez-vous pour plus d’interprétations',
        buy: 'Acheter maintenant',
      },
      subscription: {
        single: "1 Interprétation",
        pack10: "10 Interprétations",
        pack20: "20 Interprétations",
      },      
    }
  },
  tr: {
    translation: {
      tabs: {
        home: '',
        history: 'Geçmiş',
        settings: 'Ayarlar',
        profile: 'Profil',
        subscribe: 'Abone Ol',
      },
      home: {
        title: 'MindVerse',
        subtitle: 'Rüyanızı anlatın',
        placeholder: 'Rüyanızı buraya yazın...',
        interpret: 'Rüyayı Yorumla',
        interpretation: 'Rüyanızın Yorumu',
        loading: 'Rüyanız yorumlanıyor...',
        error: 'Rüya yorumlanırken hata oluştu. Lütfen tekrar deneyin.',
        credits: 'Kalan Kredi: {{count}}',
        subscribe: 'Daha Fazla İçin Abone Ol',
        minLength: 'Rüyanızı yorumlamak için lütfen en az {{count}} karakter girin.',
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
        loadFailed: 'Profil yüklenemedi',
        credits: 'Kalan Kredi: {{count}}',
        subscribe: 'Abone Ol',
      },
      subscribe: {
        title: 'Daha Fazla Tabir İçin Abone Ol',
        buy: 'Şimdi Satın Al',
      },
      subscription: {
        single: "1 Rüya Yorumu",
        pack10: "10 Rüya Yorumu",
        pack20: "20 Rüya Yorumu",
      },      
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
        error: 'Fehler bei der Interpretation. Bitte versuchen Sie es erneut.',
        credits: 'Verbleibende Deutungen: {{count}}',
        subscribe: 'Abonnieren für mehr',
        minLength: 'Bitte geben Sie mindestens {{count}} Zeichen ein, um Ihren Traum zu deuten.',
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
        loadFailed: 'Fehler beim Laden des Profils',
        credits: 'Verbleibende Deutungen: {{count}}',
        subscribe: 'Abonnieren',
      },
      subscribe: {
        title: 'Abonnieren für weitere Deutungen',
        buy: 'Jetzt kaufen',
      },
      subscription: {
        single: "1 Traumdeutung",
        pack10: "10 Traumdeutungen",
        pack20: "20 Traumdeutungen",
      },      
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
        error: 'خطأ في تفسير الحلم. يرجى المحاولة مرة أخرى.',
        credits: 'عدد التفسيرات المتبقية: {{count}}',
        subscribe: 'اشترك للمزيد',
        minLength: 'يرجى إدخال ما لا يقل عن {{count}} حرفًا لتفسير حلمك.',
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
        loadFailed: 'فشل تحميل الملف الشخصي',
        credits: 'عدد التفسيرات المتبقية: {{count}}',
        subscribe: 'اشترك',
      },
      subscribe: {
        title: 'اشترك للحصول على المزيد من التفسيرات',
        buy: 'اشتر الآن',
      },
      subscription: {
        single: "تفسير حلم واحد",
        pack10: "10 تفسيرات أحلام",
        pack20: "20 تفسيرات أحلام",
      },      
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