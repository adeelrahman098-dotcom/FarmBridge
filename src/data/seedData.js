export const INITIAL_USERS = [
  // 8 FARMERS
  {
    id: 'user_farmer_1',
    name: 'Rahim Uddin',
    phone: '+880 1712-345678',
    email: 'rahim.bogura@farmbridge.bd',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
    verificationStatus: 'verified',
    createdAt: '2026-08-10',
    profile: {
      farmName: 'Barendra Green Agro',
      district: 'Bogura',
      upazila: 'Shibganj',
      address: 'Village: Gopinathpur, Shibganj, Bogura',
      bio: 'Cultivating premium winter vegetables and red potatoes for over 18 years using organic compost.',
      rating: 4.9,
      totalSalesCount: 142,
      responseRate: '98%'
    }
  },
  {
    id: 'user_farmer_2',
    name: 'Matiur Rahman',
    phone: '+880 1823-456789',
    email: 'matiur.rajshahi@farmbridge.bd',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    verificationStatus: 'verified',
    createdAt: '2026-08-14',
    profile: {
      farmName: 'Padma Valley Orchards',
      district: 'Rajshahi',
      upazila: 'Charghat',
      address: 'Sarda Bazar Road, Charghat, Rajshahi',
      bio: 'Leading supplier of export-grade Fazli, Amrapali, and Gopalbhog mangoes straight from the orchard.',
      rating: 4.8,
      totalSalesCount: 96,
      responseRate: '95%'
    }
  },
  {
    id: 'user_farmer_3',
    name: 'Sufia Begum',
    phone: '+880 1934-567890',
    email: 'sufia.jashore@farmbridge.bd',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    verificationStatus: 'verified',
    createdAt: '2026-08-20',
    profile: {
      farmName: 'Kapotakkho Organic Dairy & Poultry',
      district: 'Jashore',
      upazila: 'Monirampur',
      address: 'Rohita Union, Monirampur, Jashore',
      bio: 'Grass-fed desi cow raw milk, pure ghee, and organic country chicken eggs.',
      rating: 4.95,
      totalSalesCount: 215,
      responseRate: '99%'
    }
  },
  {
    id: 'user_farmer_4',
    name: 'Abul Kashem',
    phone: '+880 1645-678901',
    email: 'kashem.dinajpur@farmbridge.bd',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    verificationStatus: 'verified',
    createdAt: '2026-09-02',
    profile: {
      farmName: 'Himalayan Breeze Grain Mill & Farms',
      district: 'Dinajpur',
      upazila: 'Birol',
      address: 'Mangalpur Road, Birol, Dinajpur',
      bio: 'Direct producer of aromatic Chinigura and premium Katari Bhog / Miniket aromatic rice.',
      rating: 4.7,
      totalSalesCount: 88,
      responseRate: '92%'
    }
  },
  {
    id: 'user_farmer_5',
    name: 'Golam Mostafa',
    phone: '+880 1756-789012',
    email: 'mostafa.cumilla@farmbridge.bd',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    verificationStatus: 'verified',
    createdAt: '2026-09-12',
    profile: {
      farmName: 'Gomti Riverbank Agro',
      district: 'Cumilla',
      upazila: 'Daudkandi',
      address: 'Gouripur, Daudkandi, Cumilla',
      bio: 'Year-round fresh tomatoes, green chilies, and crisp cucumbers cultivated along river silt.',
      rating: 4.6,
      totalSalesCount: 64,
      responseRate: '88%'
    }
  },
  {
    id: 'user_farmer_6',
    name: 'Faruk Hossain',
    phone: '+880 1867-890123',
    email: 'faruk.rangpur@farmbridge.bd',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    verificationStatus: 'verified',
    createdAt: '2026-09-18',
    profile: {
      farmName: 'Teesta Valley Golden Spices',
      district: 'Rangpur',
      upazila: 'Mithapukur',
      address: 'Ranipukur Bazar, Mithapukur, Rangpur',
      bio: 'Direct farm pungent ginger, high-curcumin turmeric, and cold-pressed mustard oil.',
      rating: 4.85,
      totalSalesCount: 110,
      responseRate: '96%'
    }
  },
  {
    id: 'user_farmer_7',
    name: 'Kamal Mia',
    phone: '+880 1978-901234',
    email: 'kamal.mymensingh@farmbridge.bd',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    verificationStatus: 'pending',
    createdAt: '2026-10-01',
    profile: {
      farmName: 'Brahmaputra Agro Greens',
      district: 'Mymensingh',
      upazila: 'Trishal',
      address: 'Boilor Union, Trishal, Mymensingh',
      bio: 'Cauliflower, cabbage, and seasonal gourd specialist. Verification documents under review.',
      rating: 4.5,
      totalSalesCount: 22,
      responseRate: '85%'
    }
  },
  {
    id: 'user_farmer_8',
    name: 'Delwar Hossain',
    phone: '+880 1689-012345',
    email: 'delwar.khulna@farmbridge.bd',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
    verificationStatus: 'verified',
    createdAt: '2026-10-15',
    profile: {
      farmName: 'Sundarban Frontier Farms',
      district: 'Khulna',
      upazila: 'Dumuria',
      address: 'Chuknagar, Dumuria, Khulna',
      bio: 'Saline-tolerant bitter gourd, pointed gourd (potol), and winter melons.',
      rating: 4.75,
      totalSalesCount: 51,
      responseRate: '94%'
    }
  },

  // 5 BUYERS
  {
    id: 'user_buyer_1',
    name: 'Anika Tabassum',
    phone: '+880 1711-223344',
    email: 'anika.dhaka@shwapnofresh.com',
    role: 'buyer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    verificationStatus: 'verified',
    createdAt: '2026-08-05',
    profile: {
      businessName: 'Bengal Fresh Retail & Supermarket Chain',
      district: 'Dhaka',
      deliveryAddress: 'Plot 42, Road 11, Banani C/A, Dhaka-1213',
      purchaseCategory: 'Wholesale Supermarket Distribution'
    }
  },
  {
    id: 'user_buyer_2',
    name: 'Tanvir Ahmed',
    phone: '+880 1822-334455',
    email: 'tanvir@rajdhaniaarot.com',
    role: 'buyer',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    verificationStatus: 'verified',
    createdAt: '2026-08-18',
    profile: {
      businessName: 'Kawran Bazar Aarot Wholesale Consortium',
      district: 'Dhaka',
      deliveryAddress: 'Shed #14, Kawran Bazar Wholesale Market, Dhaka',
      purchaseCategory: 'Bulk Agricultural Wholesale'
    }
  },
  {
    id: 'user_buyer_3',
    name: 'Nasrin Akhter',
    phone: '+880 1933-445566',
    email: 'nasrin@chattogramagrohub.com',
    role: 'buyer',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    verificationStatus: 'verified',
    createdAt: '2026-09-01',
    profile: {
      businessName: 'Port City Food Processors Ltd',
      district: 'Chattogram',
      deliveryAddress: 'Agrabad Commercial Area, Chattogram-4100',
      purchaseCategory: 'Food Processing & Canning'
    }
  },
  {
    id: 'user_buyer_4',
    name: 'Zubair Hossain',
    phone: '+880 1644-556677',
    email: 'zubair@greenkitchenbd.com',
    role: 'buyer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    verificationStatus: 'verified',
    createdAt: '2026-09-15',
    profile: {
      businessName: 'Green Kitchen Restaurant Network',
      district: 'Dhaka',
      deliveryAddress: 'Sector 3, Uttara Model Town, Dhaka',
      purchaseCategory: 'Horeca / Restaurants'
    }
  },
  {
    id: 'user_buyer_5',
    name: 'Sadia Sultana',
    phone: '+880 1755-667788',
    email: 'sadia@organicliving.bd',
    role: 'buyer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    verificationStatus: 'verified',
    createdAt: '2026-10-10',
    profile: {
      businessName: 'Organic Living Family Co-op',
      district: 'Gazipur',
      deliveryAddress: 'Joydebpur Road, Gazipur Sadar',
      purchaseCategory: 'Consumer Community Bulk'
    }
  },

  // 3 TRANSPORT PARTNERS
  {
    id: 'user_transport_1',
    name: 'Rafiqul Islam',
    phone: '+880 1718-990011',
    email: 'rafiq.cargo@greenroadtrans.bd',
    role: 'transport',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    verificationStatus: 'verified',
    createdAt: '2026-08-01',
    profile: {
      companyName: 'Barendra Highway Cold & Dry Logistics',
      vehicleType: 'Covered Van (7 Ton)',
      capacity: '7,000 kg',
      serviceAreas: ['Bogura', 'Rangpur', 'Rajshahi', 'Dhaka', 'Gazipur'],
      registrationNumber: 'DHAKA-METRO-TA-14-8921',
      rating: 4.9,
      completedTrips: 184
    }
  },
  {
    id: 'user_transport_2',
    name: 'Selim Reza',
    phone: '+880 1829-001122',
    email: 'selim@padmalogistics.bd',
    role: 'transport',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    verificationStatus: 'verified',
    createdAt: '2026-08-25',
    profile: {
      companyName: 'Padma Express Cargo Fleet',
      vehicleType: 'Pickup Truck (3 Ton)',
      capacity: '3,000 kg',
      serviceAreas: ['Jashore', 'Khulna', 'Faridpur', 'Dhaka'],
      registrationNumber: 'KHULNA-METRO-MA-11-4402',
      rating: 4.8,
      completedTrips: 142
    }
  },
  {
    id: 'user_transport_3',
    name: 'Shahidul Alam',
    phone: '+880 1930-112233',
    email: 'shahidul@easternspeed.bd',
    role: 'transport',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    verificationStatus: 'pending',
    createdAt: '2026-10-08',
    profile: {
      companyName: 'Eastern Corridor Fast Freight',
      vehicleType: 'Open Bed Truck (5 Ton)',
      capacity: '5,000 kg',
      serviceAreas: ['Cumilla', 'Chattogram', 'Dhaka', 'Mymensingh'],
      registrationNumber: 'CHATTA-METRO-TA-21-7734',
      rating: 4.6,
      completedTrips: 45
    }
  },

  // 1 ADMINISTRATOR
  {
    id: 'user_admin_1',
    name: 'Kabir Chowdhury',
    phone: '+880 1700-112233',
    email: 'admin@farmbridge.com.bd',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    verificationStatus: 'verified',
    createdAt: '2026-07-01',
    profile: {
      roleTitle: 'Head of Marketplace Operations',
      department: 'Platform Governance & Safety'
    }
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod_1',
    farmerId: 'user_farmer_1',
    name: 'Bogura Red Diamond Potatoes (আলু)',
    category: 'vegetables',
    description: 'Crisp, starchy red potatoes grown in the nutrient-dense fertile soils of Bogura. Perfect for culinary processing and commercial kitchens. Graded and washed.',
    price: 32, // BDT per kg
    unit: 'kg',
    quantity: 12000,
    minOrderQuantity: 500,
    harvestDate: '2026-11-05',
    availabilityDate: 'Immediate',
    district: 'Bogura',
    address: 'Shibganj Cold Storage Yard, Bogura',
    images: [
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508747703725-719777637510?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'active',
    featured: true,
    createdAt: '2026-11-06'
  },
  {
    id: 'prod_2',
    farmerId: 'user_farmer_1',
    name: 'Shibganj Winter Cauliflower (ফুলকপি)',
    category: 'vegetables',
    description: 'Snow-white, tightly packed heads fresh from the field with pesticide-free IPM (Integrated Pest Management) methods. Harvested before sunrise for maximum freshness.',
    price: 35,
    unit: 'piece',
    quantity: 3500,
    minOrderQuantity: 200,
    harvestDate: '2026-11-12',
    availabilityDate: 'Immediate',
    district: 'Bogura',
    address: 'Gopinathpur Field #3, Shibganj, Bogura',
    images: [
      'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'active',
    featured: true,
    createdAt: '2026-11-12'
  },
  {
    id: 'prod_3',
    farmerId: 'user_farmer_2',
    name: 'Rajshahi Premium Fazli Mango (আম)',
    category: 'fruits',
    description: 'Late-season giant sweet Fazli mangoes from heritage Charghat orchards. Handpicked, chemical-free, wrapped in fruit protection bags.',
    price: 3200,
    unit: 'maund', // 40 kg
    quantity: 150,
    minOrderQuantity: 5,
    harvestDate: '2026-10-25',
    availabilityDate: 'In Stock',
    district: 'Rajshahi',
    address: 'Sarda Orchard Gate, Charghat, Rajshahi',
    images: [
      'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'active',
    featured: true,
    createdAt: '2026-10-28'
  },
  {
    id: 'prod_4',
    farmerId: 'user_farmer_4',
    name: 'Dinajpur Fragrant Chinigura Aromatic Rice (চিনিগুঁড়া চাল)',
    category: 'grains',
    description: 'Old-crop aged premium aromatic Chinigura rice. Unmatched aroma and tender fluffy texture, ideal for royal biryani, polao, and festive cooking.',
    price: 135,
    unit: 'kg',
    quantity: 8500,
    minOrderQuantity: 250,
    harvestDate: '2026-10-15',
    availabilityDate: 'Immediate',
    district: 'Dinajpur',
    address: 'Birol Milling Depot, Dinajpur',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'active',
    featured: true,
    createdAt: '2026-10-18'
  },
  {
    id: 'prod_5',
    farmerId: 'user_farmer_3',
    name: 'Kapotakkho Farm Grass-Fed Raw Cow Milk (খাঁটি দুধ)',
    category: 'dairy_poultry',
    description: 'Pure, unadulterated chilled raw cow milk from free-range indigenous Red Chittagong & Shahiwal cows. Tested for zero antibiotics or preservatives.',
    price: 78,
    unit: 'liter',
    quantity: 1200,
    minOrderQuantity: 50,
    harvestDate: '2026-11-15',
    availabilityDate: 'Daily Fresh Morning Supply',
    district: 'Jashore',
    address: 'Monirampur Dairy Center, Jashore',
    images: [
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'active',
    featured: true,
    createdAt: '2026-11-15'
  },
  {
    id: 'prod_6',
    farmerId: 'user_farmer_3',
    name: 'Organic Free-Range Desi Chicken Eggs (দেশি মুরগির ডিম)',
    category: 'dairy_poultry',
    description: 'Golden-yolk eggs from naturally foraged country chickens. Packed in reinforced paper crates with zero breakage.',
    price: 165,
    unit: 'dozen',
    quantity: 600,
    minOrderQuantity: 30,
    harvestDate: '2026-11-14',
    availabilityDate: 'Immediate',
    district: 'Jashore',
    address: 'Rohita Farm Shed, Monirampur, Jashore',
    images: [
      'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'active',
    featured: false,
    createdAt: '2026-11-14'
  },
  {
    id: 'prod_7',
    farmerId: 'user_farmer_6',
    name: 'Mithapukur Hot Pungent Red Chili (শুকনা মরিচ)',
    category: 'spices',
    description: 'Sun-dried high-pungency red chili from Rangpur. Intense natural red color and deep fiery aroma, ideal for spice processors.',
    price: 360,
    unit: 'kg',
    quantity: 2500,
    minOrderQuantity: 100,
    harvestDate: '2026-10-20',
    availabilityDate: 'Immediate',
    district: 'Rangpur',
    address: 'Ranipukur Drying Yard, Mithapukur, Rangpur',
    images: [
      'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'active',
    featured: true,
    createdAt: '2026-10-22'
  },
  {
    id: 'prod_8',
    farmerId: 'user_farmer_6',
    name: 'Teesta Valley Raw Ginger (আদা)',
    category: 'spices',
    description: 'Freshly uprooted plumpy organic ginger. Cleaned of heavy dirt, aromatic rhizomes packed in ventilated sacks.',
    price: 180,
    unit: 'kg',
    quantity: 4000,
    minOrderQuantity: 200,
    harvestDate: '2026-11-08',
    availabilityDate: 'Immediate',
    district: 'Rangpur',
    address: 'Mithapukur Agro Hub, Rangpur',
    images: [
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'active',
    featured: false,
    createdAt: '2026-11-09'
  },
  {
    id: 'prod_9',
    farmerId: 'user_farmer_5',
    name: 'Gomti Valley Field Tomatoes (টমেটো)',
    category: 'vegetables',
    description: 'Firm, ripe hybrid tomatoes with excellent shelf-life. Graded for wholesale transport without squishing.',
    price: 65,
    unit: 'kg',
    quantity: 6000,
    minOrderQuantity: 300,
    harvestDate: '2026-11-13',
    availabilityDate: 'Immediate',
    district: 'Cumilla',
    address: 'Gouripur Highway Center, Daudkandi, Cumilla',
    images: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'active',
    featured: true,
    createdAt: '2026-11-13'
  },
  {
    id: 'prod_10',
    farmerId: 'user_farmer_5',
    name: 'Daudkandi Long Purple Eggplant (বেগুন)',
    category: 'vegetables',
    description: 'Glossy long violet eggplants, tender pulp, seed-free, straight from alluvial beds.',
    price: 45,
    unit: 'kg',
    quantity: 3200,
    minOrderQuantity: 150,
    harvestDate: '2026-11-14',
    availabilityDate: 'Immediate',
    district: 'Cumilla',
    address: 'Daudkandi Ghat, Cumilla',
    images: [
      'https://images.unsplash.com/photo-1615485290176-59187ec9e338?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'active',
    featured: false,
    createdAt: '2026-11-14'
  },
  {
    id: 'prod_11',
    farmerId: 'user_farmer_4',
    name: 'Premium Miniket Super-Polished Rice (মিনিকেট চাল)',
    category: 'grains',
    description: 'Slender, long grain non-sticky rice. Machine sorted with zero impurities or discolored kernels.',
    price: 74,
    unit: 'kg',
    quantity: 15000,
    minOrderQuantity: 500,
    harvestDate: '2026-10-30',
    availabilityDate: 'Immediate',
    district: 'Dinajpur',
    address: 'Birol Grain Depot, Dinajpur',
    images: [
      'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'active',
    featured: false,
    createdAt: '2026-11-01'
  },
  {
    id: 'prod_12',
    farmerId: 'user_farmer_6',
    name: 'Cold-Pressed Pure Yellow Mustard Oil (সরিষার তেল)',
    category: 'cash_crops',
    description: 'Traditional wooden expeller (ঘানি ভাঙা) cold-pressed pungent mustard seed oil. 100% natural, unfiltered aroma.',
    price: 260,
    unit: 'liter',
    quantity: 800,
    minOrderQuantity: 40,
    harvestDate: '2026-11-01',
    availabilityDate: 'Bottled in 5L Cans',
    district: 'Rangpur',
    address: 'Ranipukur Cold Press Unit, Rangpur',
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'active',
    featured: true,
    createdAt: '2026-11-03'
  },
  {
    id: 'prod_13',
    farmerId: 'user_farmer_8',
    name: 'Dumuria Crisp Pointed Gourd (পটল)',
    category: 'vegetables',
    description: 'Grade-A fresh pointed gourds (Potol). Freshly plucked every morning, bright green color and tender skin.',
    price: 48,
    unit: 'kg',
    quantity: 2200,
    minOrderQuantity: 100,
    harvestDate: '2026-11-15',
    availabilityDate: 'Immediate',
    district: 'Khulna',
    address: 'Chuknagar Market Yard, Dumuria, Khulna',
    images: [
      'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'active',
    featured: false,
    createdAt: '2026-11-15'
  },
  {
    id: 'prod_14',
    farmerId: 'user_farmer_1',
    name: 'Heritage Golden Jute Fiber (পাট - তোষা)',
    category: 'cash_crops',
    description: 'Cleaned, sun-cured Golden Tosha jute fiber. Grade-A tensile strength suitable for rope, burlap packaging, and textile blending.',
    price: 3600,
    unit: 'maund',
    quantity: 250,
    minOrderQuantity: 10,
    harvestDate: '2026-09-30',
    availabilityDate: 'Warehoused',
    district: 'Bogura',
    address: 'Shibganj Jute Warehouse, Bogura',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'active',
    featured: false,
    createdAt: '2026-10-05'
  },
  {
    id: 'prod_15',
    farmerId: 'user_farmer_2',
    name: 'Rajshahi Sweet Guava - Thai-7 (পেয়ারা)',
    category: 'fruits',
    description: 'Crispy crunchy Thai-7 guavas, bagged on branches to protect from fruit flies. High Vitamin C and consistent sweetness.',
    price: 70,
    unit: 'kg',
    quantity: 3800,
    minOrderQuantity: 200,
    harvestDate: '2026-11-10',
    availabilityDate: 'Immediate',
    district: 'Rajshahi',
    address: 'Charghat Fruit Depot, Rajshahi',
    images: [
      'https://images.unsplash.com/photo-1536511135899-7157a91722e1?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'active',
    featured: false,
    createdAt: '2026-11-10'
  },
  {
    id: 'prod_16',
    farmerId: 'user_farmer_7',
    name: 'Trishal Fresh Bottle Gourd (লাউ)',
    category: 'vegetables',
    description: 'Plump tender bottle gourds harvested fresh. Thin skin and sweet watery flesh.',
    price: 40,
    unit: 'piece',
    quantity: 1800,
    minOrderQuantity: 80,
    harvestDate: '2026-11-13',
    availabilityDate: 'Immediate',
    district: 'Mymensingh',
    address: 'Boilor Farm, Trishal, Mymensingh',
    images: [
      'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'paused',
    featured: false,
    createdAt: '2026-11-13'
  }
];

export const INITIAL_OFFERS = [
  {
    id: 'offer_101',
    productId: 'prod_1',
    farmerId: 'user_farmer_1',
    buyerId: 'user_buyer_1',
    quantity: 3000,
    unit: 'kg',
    offeredUnitPrice: 28, // Listed at 32
    originalListingPrice: 32,
    requestedDeliveryDate: '2026-11-20',
    note: 'We need 3,000 kg red potatoes for our Banani central warehouse. If quality matches, we will reorder weekly.',
    status: 'pending',
    history: [
      {
        byRole: 'buyer',
        byName: 'Anika Tabassum (Bengal Fresh)',
        price: 28,
        quantity: 3000,
        note: 'Initial offer of ৳28/kg for 3,000 kg bulk.',
        timestamp: '2026-11-16T14:30:00'
      }
    ],
    createdAt: '2026-11-16T14:30:00'
  },
  {
    id: 'offer_102',
    productId: 'prod_4',
    farmerId: 'user_farmer_4',
    buyerId: 'user_buyer_4',
    quantity: 1000,
    unit: 'kg',
    offeredUnitPrice: 125, // Farmer countered with 130
    counterUnitPrice: 130,
    originalListingPrice: 135,
    requestedDeliveryDate: '2026-11-22',
    note: 'Required for our Uttara fine-dining branch winter weddings.',
    counterNote: 'We can do ৳130/kg since this is aged old-crop aromatic chinigura. Includes high quality burlap sacks.',
    status: 'countered',
    history: [
      {
        byRole: 'buyer',
        byName: 'Zubair Hossain (Green Kitchen)',
        price: 125,
        quantity: 1000,
        note: 'Offer ৳125/kg for 1000 kg.',
        timestamp: '2026-11-15T11:00:00'
      },
      {
        byRole: 'farmer',
        byName: 'Abul Kashem (Himalayan Breeze)',
        price: 130,
        quantity: 1000,
        note: 'Counteroffer ৳130/kg with sacks included.',
        timestamp: '2026-11-15T15:20:00'
      }
    ],
    createdAt: '2026-11-15T11:00:00'
  },
  {
    id: 'offer_103',
    productId: 'prod_9',
    farmerId: 'user_farmer_5',
    buyerId: 'user_buyer_2',
    quantity: 2000,
    unit: 'kg',
    offeredUnitPrice: 62,
    originalListingPrice: 65,
    requestedDeliveryDate: '2026-11-18',
    note: 'Kawran Bazar early morning dropoff required.',
    status: 'accepted',
    history: [
      {
        byRole: 'buyer',
        byName: 'Tanvir Ahmed (Kawran Bazar)',
        price: 62,
        quantity: 2000,
        note: 'Offer ৳62/kg for 2,000 kg.',
        timestamp: '2026-11-14T09:10:00'
      },
      {
        byRole: 'farmer',
        byName: 'Golam Mostafa',
        price: 62,
        quantity: 2000,
        note: 'Accepted. Preparing harvest immediately.',
        timestamp: '2026-11-14T11:00:00'
      }
    ],
    createdAt: '2026-11-14T09:10:00'
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ord_501',
    offerId: 'offer_103',
    productId: 'prod_9',
    productName: 'Gomti Valley Field Tomatoes (টমেটো)',
    farmerId: 'user_farmer_5',
    farmerName: 'Golam Mostafa',
    buyerId: 'user_buyer_2',
    buyerName: 'Tanvir Ahmed (Kawran Bazar)',
    quantity: 2000,
    unit: 'kg',
    unitPrice: 62,
    subtotal: 124000,
    deliveryFee: 4500,
    total: 128500,
    orderStatus: 'in_transit', // Lifecycle progress
    paymentStatus: 'cash_on_delivery',
    pickupAddress: 'Gouripur Highway Center, Daudkandi, Cumilla',
    deliveryAddress: 'Shed #14, Kawran Bazar Wholesale Market, Dhaka',
    deliveryId: 'del_701',
    timeline: [
      { status: 'confirmed', label: 'Order Confirmed', time: '14 Nov, 11:00 AM', note: 'Offer accepted' },
      { status: 'preparing', label: 'Harvested & Boxed', time: '15 Nov, 08:30 AM', note: 'Graded in plastic crates' },
      { status: 'pickup_scheduled', label: 'Transport Assigned', time: '15 Nov, 02:00 PM', note: 'Van dispatched' },
      { status: 'picked_up', label: 'Loaded at Daudkandi', time: '16 Nov, 06:15 AM', note: 'Driver Rafiqul loaded 2,000 kg' },
      { status: 'in_transit', label: 'Crossing Meghna Bridge', time: '16 Nov, 01:30 PM', note: 'En route to Dhaka' }
    ],
    createdAt: '2026-11-14T11:00:00'
  },
  {
    id: 'ord_502',
    offerId: 'offer_old_2',
    productId: 'prod_7',
    productName: 'Mithapukur Hot Pungent Red Chili (শুকনা মরিচ)',
    farmerId: 'user_farmer_6',
    farmerName: 'Faruk Hossain',
    buyerId: 'user_buyer_3',
    buyerName: 'Port City Food Processors Ltd',
    quantity: 500,
    unit: 'kg',
    unitPrice: 350,
    subtotal: 175000,
    deliveryFee: 8000,
    total: 183000,
    orderStatus: 'completed',
    paymentStatus: 'paid',
    pickupAddress: 'Ranipukur Drying Yard, Mithapukur, Rangpur',
    deliveryAddress: 'Agrabad Commercial Area, Chattogram-4100',
    deliveryId: 'del_702',
    timeline: [
      { status: 'confirmed', label: 'Order Confirmed', time: '08 Nov, 10:00 AM' },
      { status: 'preparing', label: 'Packing in Moisture-Proof Sacks', time: '09 Nov, 11:30 AM' },
      { status: 'pickup_scheduled', label: 'Transport Assigned', time: '09 Nov, 04:00 PM' },
      { status: 'picked_up', label: 'Picked Up', time: '10 Nov, 09:00 AM' },
      { status: 'in_transit', label: 'In Transit', time: '10 Nov, 03:00 PM' },
      { status: 'delivered', label: 'Delivered at Chattogram Depot', time: '11 Nov, 05:45 PM' },
      { status: 'completed', label: 'Goods Inspected & Completed', time: '12 Nov, 10:15 AM' }
    ],
    createdAt: '2026-11-08T10:00:00'
  },
  {
    id: 'ord_503',
    offerId: 'offer_old_3',
    productId: 'prod_5',
    productName: 'Kapotakkho Farm Grass-Fed Raw Cow Milk (খাঁটি দুধ)',
    farmerId: 'user_farmer_3',
    farmerName: 'Sufia Begum',
    buyerId: 'user_buyer_5',
    buyerName: 'Organic Living Family Co-op',
    quantity: 300,
    unit: 'liter',
    unitPrice: 75,
    subtotal: 22500,
    deliveryFee: 1500,
    total: 24000,
    orderStatus: 'preparing',
    paymentStatus: 'pending',
    pickupAddress: 'Monirampur Dairy Center, Jashore',
    deliveryAddress: 'Joydebpur Road, Gazipur Sadar',
    deliveryId: 'del_703',
    timeline: [
      { status: 'confirmed', label: 'Order Confirmed', time: '16 Nov, 09:00 AM', note: 'Offer accepted' },
      { status: 'preparing', label: 'Chilling in bulk milk tanks', time: '16 Nov, 02:00 PM', note: 'Packaging in stainless cans' }
    ],
    createdAt: '2026-11-16T09:00:00'
  }
];

export const INITIAL_DELIVERIES = [
  {
    id: 'del_701',
    orderId: 'ord_501',
    transportPartnerId: 'user_transport_1',
    driverName: 'Rafiqul Islam (Barendra Highway Cold Logistics)',
    driverPhone: '+880 1718-990011',
    vehicle: 'Covered Van (7 Ton) - DHAKA-METRO-TA-14-8921',
    pickupAddress: 'Gouripur Highway Center, Daudkandi, Cumilla',
    dropoffAddress: 'Shed #14, Kawran Bazar Wholesale Market, Dhaka',
    pickupDate: '2026-11-16',
    cargoDescription: '2,000 kg Fresh Tomatoes (Cratered)',
    fee: 4500,
    status: 'in_transit',
    instructions: 'Handle with care; maintain ventilation slits open.'
  },
  {
    id: 'del_702',
    orderId: 'ord_502',
    transportPartnerId: 'user_transport_1',
    driverName: 'Rafiqul Islam',
    driverPhone: '+880 1718-990011',
    vehicle: 'Covered Van (7 Ton)',
    pickupAddress: 'Ranipukur Drying Yard, Rangpur',
    dropoffAddress: 'Agrabad Commercial Area, Chattogram',
    pickupDate: '2026-11-10',
    cargoDescription: '500 kg Sun-Dried Red Chili in sacks',
    fee: 8000,
    status: 'delivered',
    instructions: 'Protect strictly against rain or water moisture.'
  },
  {
    id: 'del_703',
    orderId: 'ord_503',
    transportPartnerId: null, // Available open job!
    driverName: null,
    vehicle: null,
    pickupAddress: 'Monirampur Dairy Center, Jashore',
    dropoffAddress: 'Joydebpur Road, Gazipur Sadar',
    pickupDate: '2026-11-17',
    cargoDescription: '300 L Chilled Cow Milk in 10 insulated cans',
    fee: 1800,
    status: 'available',
    instructions: 'Needs quick insulated transport before noon.'
  }
];

export const INITIAL_CONVERSATIONS = [
  {
    id: 'conv_1',
    productId: 'prod_1',
    productName: 'Bogura Red Diamond Potatoes (আলু)',
    participants: ['user_buyer_1', 'user_farmer_1'],
    messages: [
      {
        id: 'msg_1',
        senderId: 'user_buyer_1',
        senderName: 'Anika Tabassum',
        text: 'Assalamu Alaikum Rahim Bhai. We are looking for regular weekly delivery of red potatoes to our Banani distribution hub. Are these graded properly?',
        timestamp: '2026-11-16T14:15:00'
      },
      {
        id: 'msg_2',
        senderId: 'user_farmer_1',
        senderName: 'Rahim Uddin',
        text: 'Walaikum Assalam Anika Apa! Yes, all potatoes are machine-graded into 50mm+ sizes, free from cuts or rot. Clean and stored in modern climate-controlled yard.',
        timestamp: '2026-11-16T14:22:00'
      },
      {
        id: 'msg_3',
        senderId: 'user_buyer_1',
        senderName: 'Anika Tabassum',
        text: 'Great. I have just submitted an offer for 3,000 kg at ৳28/kg. Please check and let us know.',
        timestamp: '2026-11-16T14:31:00'
      }
    ],
    updatedAt: '2026-11-16T14:31:00'
  },
  {
    id: 'conv_2',
    productId: 'prod_4',
    productName: 'Dinajpur Fragrant Chinigura Aromatic Rice',
    participants: ['user_buyer_4', 'user_farmer_4'],
    messages: [
      {
        id: 'msg_4',
        senderId: 'user_buyer_4',
        senderName: 'Zubair Hossain',
        text: 'Kashem Bhai, is this genuine Katari/Chinigura from Birol soil? Any mixing with fine hybrid rice?',
        timestamp: '2026-11-15T10:45:00'
      },
      {
        id: 'msg_5',
        senderId: 'user_farmer_4',
        senderName: 'Abul Kashem',
        text: 'Zubair Bhai, 100% pure authentic Birol Chinigura. You can test a sample anytime. We provide certified packaging.',
        timestamp: '2026-11-15T10:55:00'
      }
    ],
    updatedAt: '2026-11-15T10:55:00'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif_1',
    userId: 'user_farmer_1',
    type: 'offer_received',
    title: 'New Offer Received!',
    message: 'Anika Tabassum offered ৳28/kg for 3,000 kg Bogura Red Diamond Potatoes.',
    link: '/farmer/offers',
    isRead: false,
    createdAt: '2026-11-16T14:30:00'
  },
  {
    id: 'notif_2',
    userId: 'user_buyer_4',
    type: 'counteroffer_received',
    title: 'Counteroffer from Farmer',
    message: 'Abul Kashem countered your offer on Chinigura Rice at ৳130/kg.',
    link: '/buyer/offers',
    isRead: false,
    createdAt: '2026-11-15T15:20:00'
  },
  {
    id: 'notif_3',
    userId: 'user_transport_1',
    type: 'job_assigned',
    title: 'Delivery Job In-Transit',
    message: 'Cargo for Order #ord_501 (Tomatoes 2,000 kg) is currently in transit to Dhaka.',
    link: '/transport/active',
    isRead: true,
    createdAt: '2026-11-16T06:15:00'
  },
  {
    id: 'notif_4',
    userId: 'user_buyer_2',
    type: 'order_status',
    title: 'Shipment On The Move',
    message: 'Your tomato delivery #ord_501 has crossed Meghna Bridge and is heading to Kawran Bazar.',
    link: '/buyer/orders',
    isRead: false,
    createdAt: '2026-11-16T13:30:00'
  }
];

export const INITIAL_COMPLAINTS = [
  {
    id: 'comp_801',
    submittedBy: 'user_buyer_1',
    submitterName: 'Anika Tabassum',
    relatedOrderId: 'ord_502',
    category: 'Packaging Delay',
    description: 'Burlap packaging arrived slightly wet on the outer layer during heavy rain last month. Transport partner compensated promptly, but logging for record.',
    status: 'resolved',
    resolutionNote: 'Resolved amicably. Transport partner provided moisture-proof canvas sheets for all subsequent orders.',
    createdAt: '2026-11-13'
  },
  {
    id: 'comp_802',
    submittedBy: 'user_farmer_7',
    submitterName: 'Kamal Mia',
    relatedOrderId: null,
    category: 'Account Verification Delay',
    description: 'Submitted NID and Land Tax documentation 15 days ago for Mymensingh farm. Still waiting for verified green badge.',
    status: 'pending',
    resolutionNote: null,
    createdAt: '2026-11-14'
  }
];
