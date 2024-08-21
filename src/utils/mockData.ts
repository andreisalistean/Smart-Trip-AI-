import { TripData } from 'store/types';

export const mockTrips: TripData[] = [
    {
        id: '1',
        startDate: '2023-08-01',
        endDate: '2023-08-10',
        country: 'France',
        description:
            'A great stay in Paris without feeling you are in the city!',
        reviews: [
            {
                id: '1',
                authorName: 'JohnDoe',
                text: 'Amazing trip!',
                rating: 5,
            },
            {
                id: '2',
                authorName: 'JaneSmith',
                text: 'Loved every moment!',
                rating: 4.9,
            },
        ],
        days: [
            {
                cities: [
                    {
                        latitude: '48.8566',
                        longitude: '2.3522',
                        name: 'Paris',
                        activities: [
                            {
                                id: '1',
                                name: 'Eiffel Tower',
                                description: 'Visit the iconic tower.',
                                locationName: 'Eiffel Tower',
                                locationLongitude: '2.2945',
                                locationLatitude: '48.8584',
                                isComplete: false,
                                image: '../assets/images/san.jpg',
                            },
                            {
                                id: '2',
                                name: 'Louvre Museum',
                                description: 'Explore the art museum.',
                                locationName: 'Louvre Museum',
                                locationLongitude: '2.3364',
                                locationLatitude: '48.8606',
                                isComplete: false,
                                image: '../assets/images/san.jpg',
                            },
                        ],
                    },
                ],
            },
        ],
        image: '../assets/images/paris.jpg',
        budget: 100,
    },
    {
        id: '2',
        startDate: '2023-09-01',
        endDate: '2023-09-07',
        country: 'Maldives',
        description: 'A beautiful retreat in the Maldives!',
        reviews: [
            {
                id: '3',
                authorName: 'AliceW',
                text: 'Paradise on Earth!',
                rating: 5,
            },
            {
                id: '4',
                authorName: 'BobB',
                text: 'Absolutely stunning.',
                rating: 4.8,
            },
        ],
        days: [
            {
                cities: [
                    {
                        latitude: '3.2028',
                        longitude: '73.2207',
                        name: 'Malé',
                        activities: [
                            {
                                id: '3',
                                name: 'Beach Relaxation',
                                description: 'Relax on the beautiful beaches.',
                                locationName: 'Malé Beach',
                                locationLongitude: '73.5109',
                                locationLatitude: '4.1755',
                                isComplete: false,
                                image: '../assets/images/san.jpg',
                            },
                            {
                                id: '4',
                                name: 'Snorkeling',
                                description: 'Explore underwater life.',
                                locationName: 'Coral Reef',
                                locationLongitude: '73.5097',
                                locationLatitude: '4.1915',
                                isComplete: false,
                                image: '../assets/images/san.jpg',
                            },
                        ],
                    },
                ],
            },
        ],
        image: '../assets/images/maldives.jpg',
        budget: 100,
    },
    {
        id: '3',
        startDate: '2023-07-15',
        endDate: '2023-07-25',
        country: 'Indonesia',
        description: 'Enjoy the serene beaches of Bali.',
        reviews: [
            {
                id: '5',
                authorName: 'ChrisP',
                text: 'Fantastic trip!',
                rating: 4.8,
            },
            {
                id: '6',
                authorName: 'DanaK',
                text: 'Loved the beaches.',
                rating: 4.7,
            },
        ],
        days: [
            {
                cities: [
                    {
                        latitude: '-8.3405',
                        longitude: '115.0920',
                        name: 'Bali',
                        activities: [
                            {
                                id: '5',
                                name: 'Beach Walk',
                                description:
                                    'Walk along the beautiful beaches.',
                                locationName: 'Kuta Beach',
                                locationLongitude: '115.1681',
                                locationLatitude: '-8.7171',
                                isComplete: false,
                                image: '../assets/images/san.jpg',
                            },
                            {
                                id: '6',
                                name: 'Temple Visit',
                                description: 'Visit ancient temples.',
                                locationName: 'Uluwatu Temple',
                                locationLongitude: '115.0848',
                                locationLatitude: '-8.8277',
                                isComplete: false,
                                image: '../assets/images/san.jpg',
                            },
                        ],
                    },
                ],
            },
        ],
        image: '../assets/images/bali.jpg',
        budget: 100,
    },
    {
        id: '4',
        startDate: '2023-06-10',
        endDate: '2023-06-20',
        country: 'Greece',
        description:
            'Experience the stunning sunsets and white-washed buildings of Santorini!',
        reviews: [
            {
                id: '7',
                authorName: 'EveM',
                text: 'Breathtaking views!',
                rating: 4.9,
            },
            {
                id: '8',
                authorName: 'FrankL',
                text: 'Loved the architecture.',
                rating: 4.8,
            },
        ],
        days: [
            {
                cities: [
                    {
                        latitude: '36.3932',
                        longitude: '25.4615',
                        name: 'Santorini',
                        activities: [
                            {
                                id: '7',
                                name: 'Sunset View',
                                description: 'Watch the stunning sunset.',
                                locationName: 'Oia',
                                locationLongitude: '25.3753',
                                locationLatitude: '36.4610',
                                isComplete: false,
                                image: '../assets/images/san.jpg',
                            },
                            {
                                id: '8',
                                name: 'Beach Day',
                                description: 'Relax on the beaches.',
                                locationName: 'Kamari Beach',
                                locationLongitude: '25.4838',
                                locationLatitude: '36.3721',
                                isComplete: false,
                                image: '../assets/images/san.jpg',
                            },
                        ],
                    },
                ],
            },
        ],
        image: '../assets/images/san.jpg',
        budget: 100,
    },
    {
        id: '5',
        startDate: '2023-05-01',
        endDate: '2023-05-10',
        country: 'Japan',
        description:
            'Immerse yourself in the rich culture and beautiful temples of Kyoto.',
        reviews: [
            {
                id: '9',
                authorName: 'GeorgeP',
                text: 'Amazing cultural experience.',
                rating: 4.7,
            },
            {
                id: '10',
                authorName: 'HannahB',
                text: 'Loved the temples.',
                rating: 4.6,
            },
        ],
        days: [
            {
                cities: [
                    {
                        latitude: '35.0116',
                        longitude: '135.7681',
                        name: 'Kyoto',
                        activities: [
                            {
                                id: '9',
                                name: 'Temple Tour',
                                description: 'Visit famous temples.',
                                locationName: 'Kinkaku-ji',
                                locationLongitude: '135.7292',
                                locationLatitude: '35.0394',
                                isComplete: false,
                                image: '../assets/images/san.jpg',
                            },
                            {
                                id: '10',
                                name: 'Garden Walk',
                                description: 'Walk through beautiful gardens.',
                                locationName: 'Arashiyama Bamboo Grove',
                                locationLongitude: '135.6702',
                                locationLatitude: '35.0096',
                                isComplete: false,
                                image: '../assets/',
                            },
                        ],
                    },
                ],
            },
        ],
        image: '../assets/images/kyoto.jpg',
        budget: 100,
    },
];

export const mockRecommendation: TripData[] = [
    {
        id: '1',
        startDate: '2023-08-01',
        endDate: '2023-08-10',
        country: 'France',
        description:
            'A great stay in Paris without feeling you are in the city!',
        reviews: [
            {
                id: '1',
                authorName: 'JohnDoe',
                text: 'Amazing trip!',
                rating: 5,
            },
            {
                id: '2',
                authorName: 'JaneSmith',
                text: 'Loved every moment!',
                rating: 4.9,
            },
        ],
        days: [
            {
                cities: [
                    {
                        latitude: '48.8566',
                        longitude: '2.3522',
                        name: 'Paris',
                        activities: [
                            {
                                id: '1',
                                name: 'Eiffel Tower',
                                description: 'Visit the iconic tower.',
                                locationName: 'Eiffel Tower',
                                locationLongitude: '2.2945',
                                locationLatitude: '48.8584',
                                isComplete: false,
                                image: '../assets/images/san.jpg',
                            },
                            {
                                id: '2',
                                name: 'Louvre Museum',
                                description: 'Explore the art museum.',
                                locationName: 'Louvre Museum',
                                locationLongitude: '2.3364',
                                locationLatitude: '48.8606',
                                isComplete: false,
                                image: '../assets/images/san.jpg',
                            },
                        ],
                    },
                ],
            },
        ],
        image: '../assets/images/paris.jpg',
        budget: 100,
    },
    {
        id: '2',
        startDate: '2023-09-01',
        endDate: '2023-09-07',
        country: 'Maldives',
        description: 'A beautiful retreat in the Maldives!',
        reviews: [
            {
                id: '3',
                authorName: 'AliceW',
                text: 'Paradise on Earth!',
                rating: 5,
            },
            {
                id: '4',
                authorName: 'BobB',
                text: 'Absolutely stunning.',
                rating: 4.8,
            },
        ],
        days: [
            {
                cities: [
                    {
                        latitude: '3.2028',
                        longitude: '73.2207',
                        name: 'Malé',
                        activities: [
                            {
                                id: '3',
                                name: 'Beach Relaxation',
                                description: 'Relax on the beautiful beaches.',
                                locationName: 'Malé Beach',
                                locationLongitude: '73.5109',
                                locationLatitude: '4.1755',
                                isComplete: false,
                                image: '../assets/images/san.jpg',
                            },
                            {
                                id: '4',
                                name: 'Snorkeling',
                                description: 'Explore underwater life.',
                                locationName: 'Coral Reef',
                                locationLongitude: '73.5097',
                                locationLatitude: '4.1915',
                                isComplete: false,
                                image: '../assets/images/san.jpg',
                            },
                        ],
                    },
                ],
            },
        ],
        image: '../assets/images/maldives.jpg',
        budget: 100,
    },
];
