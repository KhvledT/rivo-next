export interface Place {
  id: string;
  name: string;
  image: string;
  capacity: number;
  isAvailable: boolean;
}

export interface Branch {
  id: string;
  slug: string;
  name: string;
  address: string;
  city: string;
  openingHours: string;
  phone: string;
  image: string;
  images: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  places: Place[];
}

export const branches: Branch[] = [
  {
    id: '1',
    name: 'Rivo Hay-Elgamaa',
    slug: 'rivo-hay-elgamaa',
    address: 'Hay Elgamaa, Mansoura Qism 2, El Mansoura 1, Dakahlia Governorate 7650104',
    city: 'Mansoura',
    openingHours: '7:00 AM - 2:00 AM',
    phone: '+201009859330',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=800&h=600&fit=crop',
    ],
    coordinates: { 
      lat: 31.0375854819539, 
      lng: 31.362445502187633 },
    places: [
      { id: 'p1', name: 'Window Seat A', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop', capacity: 2, isAvailable: true },
      { id: 'p2', name: 'Cozy Corner', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop', capacity: 4, isAvailable: true },
      { id: 'p3', name: 'Garden View', image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=300&fit=crop', capacity: 6, isAvailable: false },
      { id: 'p4', name: 'Private Booth', image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=300&fit=crop', capacity: 4, isAvailable: true },
      { id: 'p5', name: 'Bar Seating', image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=400&h=300&fit=crop', capacity: 3, isAvailable: false },
    ],
  },
  {
    id: '2',
    name: 'Rivo Al-Teraa',
    slug: 'rivo-al-teraa',
    address: 'Al Teraa St, Mansoura Qism 2, El Mansoura, Dakahlia Governorate',
    city: 'Mansoura',
    openingHours: '7:00 AM - 2:00 AM',
    phone: '+201009859330',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&h=600&fit=crop',
    ],
    coordinates: { 
      lat: 31.034619134174903, 
      lng: 31.358359468457646 },
    places: [
      { id: 'p6', name: 'Terrace Suite', image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=300&fit=crop', capacity: 8, isAvailable: true },
      { id: 'p7', name: 'River View', image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=400&h=300&fit=crop', capacity: 2, isAvailable: true },
      { id: 'p8', name: 'Indoor Lounge', image: 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=400&h=300&fit=crop', capacity: 6, isAvailable: true },
      { id: 'p9', name: 'Study Nook', image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=300&fit=crop', capacity: 1, isAvailable: false },
    ],
  },
];

export const getBranchBySlug = (slug: string): Branch | undefined => {
  return branches.find(b => b.slug === slug);
};

export const getAvailablePlacesCount = (branch: Branch): number => {
  return branch.places.filter(p => p.isAvailable).length;
};

export const getTotalPlacesCount = (branch: Branch): number => {
  return branch.places.length;
};
