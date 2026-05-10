const propertyData = {
    godrej: {
        id: 'godrej',
        title: 'Godrej Properties',
        subtitle: 'Thane Extension',
        description: 'Luxury living with premium 1 & 2 BHK apartments starting from ₹49.99 Lakh',
        heroImage: '/images/godrej-hero.jpg',
        overviewImage: '/images/godrej-overview.jpg',
        locationImage: '/images/godrej-location.jpg',
        galleryImages: ['/images/godrej-gallery1.jpg', '/images/godrej-gallery2.jpg', '/images/godrej-gallery3.jpg'],
        details: {
            startingPrice: '₹49.99 Lakh',
            paymentPlan: '20:80',
            configurations: '1 & 2 BHK',
            size: 'Various Sizes'
        },
        about: {
            description: "Experience luxury living in Thane with Godrej Properties' premium residential development. Each apartment is designed with meticulous attention to detail, offering spacious interiors and modern amenities.",
            highlights: [
                { icon: 'home', title: 'Premium Interiors', description: 'Modern design with high-end finishes' },
                { icon: 'map-pin', title: 'Perfect Location', description: 'Prime Thane location with excellent connectivity' },
                { icon: 'gem', title: 'Exclusive Amenities', description: 'World-class facilities and services' }
            ]
        },
        amenities: [
            { icon: 'waves', title: 'Swimming Pool', description: 'Olympic-sized swimming pool with modern facilities' },
            { icon: 'dumbbell', title: 'Fitness Center', description: 'State-of-the-art gym with professional trainers' },
            { icon: 'tree-pine', title: 'Landscaped Gardens', description: 'Beautiful green spaces for relaxation' },
            { icon: 'shield-check', title: '24/7 Security', description: 'CCTV surveillance and trained security staff' },
            { icon: 'car-front', title: 'Parking', description: 'Dedicated parking spaces for residents' },
            { icon: 'gamepad-2', title: 'Recreation Area', description: "Kids' play area and entertainment zones" }
        ],
        locationAdvantages: [
            { icon: 'map-pin', text: '5 min from Metro Station' },
            { icon: 'route', text: 'Direct access to highways' },
            { icon: 'shopping-bag', text: 'Near shopping malls and restaurants' },
            { icon: 'hospital', text: 'Proximity to hospitals' },
            { icon: 'graduation-cap', text: 'Major schools nearby' }
        ],
        pricing: [
            {
                title: '1 BHK',
                price: '₹49.99 L',
                isPopular: false,
                features: ['Spacious living area', 'Modern kitchen', '1 Parking space', 'Premium finishes']
            },
            {
                title: '2 BHK',
                price: '₹69.99 L',
                isPopular: true,
                features: ['2 Spacious bedrooms', 'Modern kitchen', '2 Parking spaces', 'Premium finishes']
            }
        ],
        paymentPlanDetails: [
            '20% at Booking',
            '30% on Slab',
            '30% on Possession',
            '20% Post Possession'
        ]
    },
    oberoi: {
        id: 'oberoi',
        title: 'Oberoi Realty 360 North',
        subtitle: 'Sector 58, Gurgaon',
        description: 'Ultra-luxury living with exclusive 4 & 5 BHK apartments starting from ₹15 Crore',
        heroImage: '/images/oberoi-hero.jpg',
        overviewImage: '/images/oberoi-overview.jpg',
        locationImage: '/images/oberoi-location.jpg',
        galleryImages: ['/images/oberoi-gallery1.jpg', '/images/oberoi-gallery2.jpg', '/images/oberoi-gallery3.jpg'],
        details: {
            startingPrice: '₹15 Crore',
            configurations: '4 & 5 BHK',
            size: '5500 - 8500 Sq.ft'
        },
        about: {
            description: "Experience the pinnacle of luxury living at Oberoi Realty 360 North. This exclusive development features world-class architecture, premium interiors, and unparalleled amenities for the most discerning residents.",
            highlights: [
                { icon: 'crown', title: 'Ultra-Luxury Interiors', description: 'Finest materials and exclusive designs' },
                { icon: 'star', title: 'Prime Location', description: "India's most exclusive address in Gurgaon" },
                { icon: 'gem', title: 'World-Class Amenities', description: '5-star resort style facilities' }
            ]
        },
        amenities: [
            { icon: 'waves', title: 'Infinity Pool', description: 'Luxury infinity pool with resort-style ambiance' },
            { icon: 'sparkles', title: 'Spa & Wellness', description: 'Premium spa, sauna, and wellness center' },
            { icon: 'dumbbell', title: 'Luxury Gym', description: 'State-of-the-art fitness facilities' },
            { icon: 'utensils', title: 'Fine Dining', description: 'Multi-cuisine restaurant and bar' },
            { icon: 'shield-check', title: '24/7 Concierge', description: 'Dedicated concierge and security services' },
            { icon: 'smartphone', title: 'Smart Home', description: 'Fully automated smart home systems' }
        ],
        locationAdvantages: [
            { icon: 'building-2', text: 'Adjacent to corporate hubs' },
            { icon: 'route', text: 'Direct access to NH highways' },
            { icon: 'plane', text: '30 mins to IGI Airport' },
            { icon: 'shopping-bag', text: 'Near premium shopping destinations' },
            { icon: 'graduation-cap', text: 'International schools nearby' }
        ],
        pricing: [
            {
                title: '4 BHK',
                price: '₹15 Cr',
                isPopular: false,
                features: ['5500 Sq.ft', '4 Luxurious Bedrooms', '4 Parking spaces', 'Premium finishes']
            },
            {
                title: '5 BHK',
                price: '₹22 Cr',
                isPopular: true,
                features: ['8500 Sq.ft', '5 Luxurious Bedrooms', '5 Parking spaces', 'Premium finishes']
            }
        ],
        paymentPlanDetails: [
            'Customizable payment plans available',
            'Flexible booking options',
            'Special financing assistance'
        ]
    }
};

// Export for module usage, or attach to window for classic scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = propertyData;
} else {
    window.propertyData = propertyData;
}
