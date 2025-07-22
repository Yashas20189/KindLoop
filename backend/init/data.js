const sampleItems = [
  {
    title: "Sturdy Study Table",
    description: "Spacious wooden table ideal for students and work-from-home setups. Lightly used and well-maintained.",
    image: {
      filename: "tableImage",
      url: "https://m.media-amazon.com/images/I/71Jl7hF+qqL.jpg",
    },
    location: "Bellandur",
    country: "India",
    type: "give"
  },
  {
    title: "Canon DSLR Camera",
    description: "Canon 700D available for weekend photography projects. Please handle with care.",
    image: {
      filename: "cameraImage",
      url: "https://images.unsplash.com/photo-1621958054700-7af166501105?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    location: "JP Nagar",
    country: "India",
    type: "lend"
  },
  {
    title: "Engineering Maths Book",
    description: "Requesting a copy of Engineering Mathematics - 1 by BS Grewal. Needed for 2 weeks.",
    image: {
      filename: "bookImage",
      url: "https://m.media-amazon.com/images/I/818E+8DPuFL._UF1000,1000_QL80_.jpg",
    },
    location: "RR Nagar",
    country: "India",
    type: "request"
  },
  {
    title: "Water Dispenser",
    description: "Giving away a working water dispenser. Great for hostels or PGs.",
    image: {
      filename: "dispenserImage",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPKfwu75_EpF0pwQ-OiKYI0sj-Uf-rNw4spg&s",
    },
    location: "KR Puram",
    country: "India",
    type: "give"
  },
  {
    title: "Projector (HD)",
    description: "Lending HD projector for presentations or weekend movie nights.",
    image: {
      filename: "projectorImage",
      url: "https://rentzeasy.com/assets/images/product-images/img1_16869099603600lumensprojectorhdwithclarity.webp",
    },
    location: "Whitefield",
    country: "India",
    type: "lend"
  },
  {
    title: "Umbrella",
    description: "Requesting an umbrella for 3 days due to unexpected rain forecast.",
    image: {
      filename: "umbrellaImage",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYI2LLXoeOaADPTYSVFycp34ZCQqC2gV6cIQ&s",
    },
    location: "HSR Layout",
    country: "India",
    type: "request"
  },
  {
    title: "Cycle - Hero Sprint",
    description: "Used mountain bike in good condition. Giving away to anyone who can make good use of it.",
    image: {
      filename: "cycleImage",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4VNBqK6yNAWSdSx5mL6wut5-GwnZijm3pfw&s",
    },
    location: "Koramangala",
    country: "India",
    type: "give"
  },
  {
    title: "Washing Machine (Portable)",
    description: "Lending my mini washing machine for a week. Ideal for 1–2 people.",
    image: {
      filename: "washingImage",
      url: "https://dmr-india.com/wp-content/uploads/2023/12/DMR-46-1218-Red-7-scaled.jpg",
    },
    location: "Indiranagar",
    country: "India",
    type: "lend"
  },
  {
    title: "Micro USB Charger",
    description: "Requesting a micro USB charger for temporary use. Mine is broken.",
    image: {
      filename: "chargerImage",
      url: "https://images.unsplash.com/photo-1731616103600-3fe7ccdc5a59?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    location: "BTM Layout",
    country: "India",
    type: "request"
  },
  {
    title: "Full-length Mirror",
    description: "Giving away a full-length mirror. One corner chipped but works perfectly.",
    image: {
      filename: "mirrorImage",
      url: "https://images.unsplash.com/photo-1667610342763-7618517d9651?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    location: "Banashankari",
    country: "India",
    type: "give"
  },
  // moreSampleItems appended below
  {
    title: "Floor Lamp",
    description: "Minimalistic floor lamp with warm lighting. Perfect for cozy corners or reading areas.",
    image: {
      filename: "lampImage",
      url: "https://m.media-amazon.com/images/I/61dbzs2JTdL.jpg"
    },
    location: "Hebbal",
    country: "India",
    type: "give"
  },
  {
    title: "Electric Kettle",
    description: "Offering an electric kettle in good condition. Useful for tea, coffee, and instant noodles.",
    image: {
      filename: "kettleImage",
      url: "https://m.media-amazon.com/images/I/619rqyjZ3jL.jpg"
    },
    location: "Yelahanka",
    country: "India",
    type: "give"
  },
  {
    title: "Laptop Stand",
    description: "Requesting a laptop stand for ergonomic desk setup. Needed for exam week.",
    image: {
      filename: "laptopStandImage",
      url: "https://m.media-amazon.com/images/I/71mvY8c3fKL.jpg"
    },
    location: "Electronic City",
    country: "India",
    type: "request"
  },
  {
    title: "Bean Bag",
    description: "Comfortable red bean bag available to lend for a few weeks. Great for chill zones.",
    image: {
      filename: "beanbagImage",
      url: "https://m.media-amazon.com/images/I/71-+DuHtd-L.jpg"
    },
    location: "Marathahalli",
    country: "India",
    type: "lend"
  },
  {
    title: "HDMI Cable",
    description: "Need an HDMI cable urgently for a one-day presentation. Will return safely.",
    image: {
      filename: "hdmiImage",
      url: "https://m.media-amazon.com/images/I/71RQAYULtML.jpg"
    },
    location: "Jayanagar",
    country: "India",
    type: "request"
  },
  {
    title: "Cooking Pot Set",
    description: "Giving away a 3-piece cooking pot set. Lightly used, good condition.",
    image: {
      filename: "potsImage",
      url: "https://m.media-amazon.com/images/I/61ToMnB-RmL.jpg"
    },
    location: "Basavanagudi",
    country: "India",
    type: "give"
  },
  {
    title: "Tripod Stand",
    description: "Lending a sturdy tripod stand for phones or DSLR. Great for photography or vlogging.",
    image: {
      filename: "tripodImage",
      url: "https://m.media-amazon.com/images/I/71-JsFjFVQL.jpg"
    },
    location: "MG Road",
    country: "India",
    type: "lend"
  },
  {
    title: "Formal Shoes (Size 9)",
    description: "Formal shoes in good condition. Giving away to someone who needs them for interviews.",
    image: {
      filename: "shoesImage",
      url: "https://m.media-amazon.com/images/I/71148WId8UL.jpg"
    },
    location: "Rajajinagar",
    country: "India",
    type: "give"
  },
  {
    title: "Casio Wrist Watch",
    description: "Requesting a wrist watch for a school play performance. Needed for just 2 days.",
    image: {
      filename: "watchImage",
      url: "https://m.media-amazon.com/images/I/71pD6vvlACL.jpg"
    },
    location: "Vijayanagar",
    country: "India",
    type: "request"
  },
  {
    title: "Yoga Mat",
    description: "Lending my yoga mat for 1 week. Clean and comfortable for daily stretching or workouts.",
    image: {
      filename: "yogaMatImage",
      url: "https://m.media-amazon.com/images/I/71SIWTPWnAL.jpg"
    },
    location: "Domlur",
    country: "India",
    type: "lend"
  }
];

 module.exports = { data: sampleItems };