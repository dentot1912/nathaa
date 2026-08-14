export interface MemoryPhoto {
  id: string;
  url: string;
  caption: string;
  date: string;
  location?: string;
  tag: string;
  secretNote?: string;
  sticker?: string;
  rotation?: number;
}

export interface MemoryCategory {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  color: {
    primary: string;
    secondary: string;
    bg: string;
    border: string;
    tagBg: string;
    accent: string;
    bowColor: string;
  };
  iconEmoji: string;
  description: string;
  photos: MemoryPhoto[];
}

export const INITIAL_MEMORIES: MemoryCategory[] = [
  {
    id: "hello-kitty-main",
    title: "Mount Awu",
    subtitle: "Momen manis & ceria bersama Nathaaa tercinta",
    coverImage: "/assets/mount/banner.png",
    color: {
      primary: "from-rose-500 to-pink-500",
      secondary: "bg-rose-50 text-rose-700",
      bg: "bg-gradient-to-br from-rose-50 via-pink-50 to-red-50",
      border: "border-rose-300 hover:border-rose-500",
      tagBg: "bg-rose-100 text-rose-700",
      accent: "#f43f5e",
      bowColor: "#e11d48",
    },
    iconEmoji: "🎀",
    description: "“ Menyimpan momen indah kita di tempat yang penuh kenangan ”",
    photos: [
      {
        id: "hk-banner",
        url: "/assets/mount/banner.png",
        caption: "Hello Kitty Special Moments 🌟",
        date: "01 Nov 2024",
        location: "Mount Awu",
        tag: "Special",
        sticker: "🎀",
        secretNote: "Momen sederhana ini ternyata bisa jadi kenangan yang begitu berarti kalau dilewati bareng kamu. 💗",
        rotation: -2,
      },
      {
        id: "hk-1",
        url: "/assets/mount/img1.png",
        caption: "Sweet Smile & Cute Poses 🌸",
        date: "14 Feb 2024",
        location: "Mount Awu",
        tag: "Cute Look",
        sticker: "🍓",
        secretNote: "Tempatnya mungkin indah, tapi rasanya jadi jauh lebih spesial karena ada kamu di sini. 🌷",
        rotation: 2.5,
      },
      {
        id: "hk-2",
        url: "/assets/mount/img2.png",
        caption: "Cozy Afternoon Tea 🫖🍰",
        date: "28 Feb 2024",
        location: "Mount Awu",
        tag: "Tea Time",
        sticker: "🍰",
        secretNote: "Salah satu momen yang pengen banget diingat terus, karena hari ini kita sama-sama bahagia. 🤍",
        rotation: -1.8,
      },
      {
        id: "hk-3",
        url: "/assets/mount/img3.png",
        caption: "Bermain Bersama Mimmy 👭",
        date: "10 Mar 2024",
        location: "Mount Awu",
        tag: "Sisters",
        sticker: "🌷",
        secretNote: "Di tengah perjalanan dan banyak cerita, selalu ada momen kecil yang bikin kita tersenyum sendiri. ✨",
        rotation: 3,
      },
      {
        id: "hk-4",
        url: "/assets/mount/img4.png",
        caption: "Breezy Morning Walk 🍃",
        date: "05 Apr 2024",
        location: "Mount Awu",
        tag: "Adventure",
        sticker: "🌿",
        secretNote: "Capeknya perjalanan langsung terasa worth it karena bisa menikmati semuanya bareng kamu. 🏔️💗",
        rotation: -2.2,
      },
      {
        id: "hk-5",
        url: "/assets/mount/img5.png",
        caption: "Momen Emas di Puncak Bukit ✨",
        date: "20 Apr 2024",
        location: "Mount Awu",
        tag: "Golden View",
        sticker: "✨",
        secretNote: "Pemandangan sebagus ini rasanya kurang lengkap kalau nggak dibagi sama orang yang spesial. 🌄",
        rotation: 2.8,
      },
      {
        id: "hk-6",
        url: "/assets/mount/img6.png",
        caption: "Menikmati Indahnya Alam 🌲",
        date: "12 Mei 2024",
        location: "Mount Awu",
        tag: "Nature",
        sticker: "🌲",
        secretNote: "Bukan cuma tentang tempat yang kita datangi, tapi tentang siapa yang menemani sepanjang perjalanan. 🫶",
        rotation: -1.5,
      },
      {
        id: "hk-7",
        url: "/assets/mount/img7.png",
        caption: "Senja Merah Muda 🌅",
        date: "25 Mei 2024",
        location: "Mount Awu",
        tag: "Sunset",
        sticker: "💖",
        secretNote: "Semoga suatu hari nanti kita bisa kembali ke sini dan membuat lebih banyak cerita lagi. 🌿",
        rotation: 1.9,
      },
      {
        id: "hk-8",
        url: "/assets/mount/img8.png",
        caption: "Misty Mountain Peaks ☁️",
        date: "02 Jun 2024",
        location: "Mount Awu",
        tag: "Scenic",
        sticker: "☁️",
        secretNote: "Ada beberapa momen yang nggak perlu banyak kata, cukup disimpan sebagai kenangan yang manis. ☁️",
        rotation: -2,
      },
      {
        id: "hk-9",
        url: "/assets/mount/img9.png",
        caption: "Jalur Pendakian Impian 🥾",
        date: "18 Jun 2024",
        location: "Mount Awu",
        tag: "Trekking",
        sticker: "🌸",
        secretNote: "Setiap langkah hari ini punya cerita sendiri, dan semuanya jadi lebih menyenangkan karena ada Nathaaa. 💕",
        rotation: 2.5,
      }
    ],
  },
];
