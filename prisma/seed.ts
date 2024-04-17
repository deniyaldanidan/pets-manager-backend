import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const client = new PrismaClient();
const catBreeds = [
  'Persian',
  'Siamese',
  'Maine Coon',
  'Ragdoll',
  'Sphynx',
  'Scottish Fold',
  'British Shorthair',
  'Abyssinian',
  'Bengal',
  'American Shorthair',
  'Birman',
  'Oriental Shorthair',
  'Russian Blue',
  'Burmese',
  'Exotic Shorthair',
  'Bombay',
  'American Curl',
  'American Bobtail',
  'Munchkin',
  'Selkirk Rex',
  'Devon Rex',
  'Cornish Rex',
  'Siberian Forest Cat',
  'Sphynx Cat',
  'Singapura',
  'Kurilian Bobtail',
  'Ocicat',
  'Himalayan',
];

const dogBreeds = [
  'Labrador Retriever',
  'French Bulldog',
  'Golden Retriever',
  'German Shepherd',
  'Poodle',
  'Beagle',
  'Dachshund',
  'German Shorthaired Pointer',
  'Yorkshire Terrier',
  'Miniature Schnauzer',
  'Chihuahua',
  'Pomeranian',
  'Pug',
  'Rottweiler',
  'Boston Terrier',
  'American Cocker Spaniel',
  'Pembroke Welsh Corgi',
  'Cavalier King Charles Spaniel',
  'Boxer',
  'Great Dane',
  'Bulldog',
  'Shih Tzu',
  ' Shetland Sheepdog',
  'Doberman Pinscher',
];

const userData = [
  {
    name: 'John Doe',
    username: 'johndoe123',
    email: 'johndoe@example.com',
    role: 'USER' as const,
    refresh: '',
    password: 'P@ssme1n',
  },
  {
    name: 'Jane Smith',
    username: 'janesmith456',
    email: 'janesmith@example.com',
    role: 'USER' as const,
    refresh: '',
    password: 'P@ssme1n',
  },
  {
    name: 'David Johnson',
    username: 'davidjohnson789',
    email: 'davidjohnson@example.com',
    role: 'USER' as const,
    refresh: '',
    password: 'P@ssme1n',
  },
  {
    name: 'Emily Brown',
    username: 'emilybrown123',
    email: 'emilybrown@example.com',
    role: 'USER' as const,
    refresh: '',
    password: 'P@ssme1n',
  },
  {
    name: 'Michael Wilson',
    username: 'michaelwilson456',
    email: 'michaelwilson@example.com',
    role: 'USER' as const,
    refresh: '',
    password: 'P@ssme1n',
  },
  {
    name: 'Sarah Martinez',
    username: 'sarahmartinez789',
    email: 'sarahmartinez@example.com',
    role: 'USER' as const,
    refresh: '',
    password: 'P@ssme1n',
  },
  {
    name: 'Robert Taylor',
    username: 'roberttaylor123',
    email: 'roberttaylor@example.com',
    role: 'USER' as const,
    refresh: '',
    password: 'P@ssme1n',
  },
  {
    name: 'Jessica Anderson',
    username: 'jessicaanderson456',
    email: 'jessicaanderson@example.com',
    role: 'USER' as const,
    refresh: '',
    password: 'P@ssme1n',
  },
  {
    name: 'William Thomas',
    username: 'williamthomas789',
    email: 'williamthomas@example.com',
    role: 'USER' as const,
    refresh: '',
    password: 'P@ssme1n',
  },
  {
    name: 'Olivia Garcia',
    username: 'oliviagarcia123',
    email: 'oliviagarcia@example.com',
    role: 'USER' as const,
    refresh: '',
    password: 'P@ssme1n',
  },
  {
    name: 'Daniel Miller',
    username: 'danielmiller456',
    email: 'danielmiller@example.com',
    role: 'USER' as const,
    refresh: '',
    password: 'P@ssme1n',
  },
  {
    name: 'Ava Rodriguez',
    username: 'avarodriguez789',
    email: 'avarodriguez@example.com',
    role: 'USER' as const,
    refresh: '',
    password: 'P@ssme1n',
  },
];

const pets = [
  {
    name: 'Maxie',
    type: 'DOG' as const,
    age: 'ADULTHOOD' as const,
    gender: 'MALE' as const,
    vaccinated: true,
    neutered: true,
    sprayed: false,
    shots_uptodate: true,
    reason: 'Owner relocation',
    info: 'Friendly with kids and other pets',
    state: 'Maharashtra',
    city: 'Mumbai',
    phone: '9876543210',
  },
  {
    name: 'Whiskers',
    type: 'CAT' as const,
    age: 'SENIOR' as const,
    gender: 'FEMALE' as const,
    vaccinated: true,
    neutered: false,
    sprayed: true,
    shots_uptodate: true,
    reason: "Previous owner's allergies",
    info: 'Loves cuddles and naps',
    state: 'Karnataka',
    city: 'Bangalore',
    phone: '9876543211',
  },
  {
    name: 'Buddy',
    type: 'DOG' as const,
    age: 'PUPPYHOOD' as const,
    gender: 'MALE' as const,
    vaccinated: true,
    neutered: false,
    sprayed: false,
    shots_uptodate: false,
    reason: 'Found as a stray',
    info: 'Playful and energetic',
    state: 'Delhi',
    city: 'New Delhi',
    phone: '9876543212',
  },
  {
    name: 'Mittens',
    type: 'CAT' as const,
    age: 'ADOLESCENCE' as const,
    gender: 'FEMALE' as const,
    vaccinated: true,
    neutered: true,
    sprayed: true,
    shots_uptodate: true,
    reason: "Owner's health issues",
    info: 'Enjoys chasing toys and sunbathing',
    state: 'Tamil Nadu',
    city: 'Chennai',
    phone: '9876543213',
  },
  {
    name: 'Sandy',
    type: 'DOG' as const,
    age: 'ADULTHOOD' as const,
    gender: 'MALE' as const,
    vaccinated: false,
    neutered: true,
    sprayed: false,
    shots_uptodate: false,
    reason: "Owner's new job",
    info: 'Trained in basic commands',
    state: 'Uttar Pradesh',
    city: 'Lucknow',
    phone: '9876543214',
  },
  {
    name: 'Luna',
    type: 'CAT' as const,
    age: 'ADULTHOOD' as const,
    gender: 'FEMALE' as const,
    vaccinated: true,
    neutered: true,
    sprayed: true,
    shots_uptodate: true,
    reason: "Owner's allergies",
    info: 'Affectionate and playful',
    state: 'Gujarat',
    city: 'Ahmedabad',
    phone: '9876543215',
  },
  {
    name: 'Charlie',
    type: 'DOG' as const,
    age: 'ADOLESCENCE' as const,
    gender: 'MALE' as const,
    vaccinated: true,
    neutered: true,
    sprayed: false,
    shots_uptodate: true,
    reason: 'Family moving abroad',
    info: 'Eager to learn new tricks',
    state: 'Rajasthan',
    city: 'Jaipur',
    phone: '9876543216',
  },
  {
    name: 'Snowball',
    type: 'CAT' as const,
    age: 'SENIOR' as const,
    gender: 'FEMALE' as const,
    vaccinated: true,
    neutered: true,
    sprayed: true,
    shots_uptodate: false,
    reason: 'Owner passed away',
    info: 'Loves lounging in sunny spots',
    state: 'Punjab',
    city: 'Chandigarh',
    phone: '9876543217',
  },
  {
    name: 'Rosie',
    type: 'DOG' as const,
    age: 'ADULTHOOD' as const,
    gender: 'MALE' as const,
    vaccinated: false,
    neutered: false,
    sprayed: false,
    shots_uptodate: false,
    reason: 'Owner unable to care for',
    info: 'Active and loves outdoor adventures',
    state: 'Uttarakhand',
    city: 'Dehradun',
    phone: '9876543218',
  },
  {
    name: 'Mannie',
    type: 'CAT' as const,
    age: 'PUPPYHOOD' as const,
    gender: 'FEMALE' as const,
    vaccinated: true,
    neutered: false,
    sprayed: false,
    shots_uptodate: true,
    reason: 'Rescued from the streets',
    info: 'Playful and loves cuddles',
    state: 'West Bengal',
    city: 'Kolkata',
    phone: '9876543219',
  },
  {
    name: 'Belina',
    type: 'DOG' as const,
    age: 'SENIOR' as const,
    gender: 'FEMALE' as const,
    vaccinated: true,
    neutered: true,
    sprayed: true,
    shots_uptodate: true,
    reason: "Owner's health issues",
    info: 'Calm and well-behaved',
    state: 'Kerala',
    city: 'Kochi',
    phone: '9876543220',
  },
  {
    name: 'Simba',
    type: 'CAT' as const,
    age: 'ADOLESCENCE' as const,
    gender: 'MALE' as const,
    vaccinated: true,
    neutered: true,
    sprayed: false,
    shots_uptodate: true,
    reason: "Owner's relocation",
    info: 'Playful and loves chasing toys',
    state: 'Madhya Pradesh',
    city: 'Bhopal',
    phone: '9876543221',
  },
  {
    name: 'Ronnie',
    type: 'DOG' as const,
    age: 'ADOLESCENCE' as const,
    gender: 'MALE' as const,
    vaccinated: true,
    neutered: false,
    sprayed: false,
    shots_uptodate: true,
    reason: 'Found as a stray',
    info: 'Friendly and energetic',
    state: 'Odisha',
    city: 'Bhubaneswar',
    phone: '9876543222',
  },
  {
    name: 'Laurie',
    type: 'CAT' as const,
    age: 'ADULTHOOD' as const,
    gender: 'MALE' as const,
    vaccinated: false,
    neutered: false,
    sprayed: true,
    shots_uptodate: false,
    reason: "Owner's financial difficulties",
    info: 'Independent and affectionate',
    state: 'Assam',
    city: 'Guwahati',
    phone: '9876543223',
  },
  {
    name: 'Daisy',
    type: 'DOG' as const,
    age: 'PUPPYHOOD' as const,
    gender: 'FEMALE' as const,
    vaccinated: true,
    neutered: true,
    sprayed: false,
    shots_uptodate: true,
    reason: "Owner's allergies",
    info: 'Lively and loves playing fetch',
    state: 'Andhra Pradesh',
    city: 'Hyderabad',
    phone: '9876543224',
  },
  {
    name: 'Missy',
    type: 'DOG' as const,
    age: 'ADOLESCENCE' as const,
    gender: 'MALE' as const,
    vaccinated: true,
    neutered: true,
    sprayed: false,
    shots_uptodate: true,
    reason: "Owner's relocation",
    info: 'Friendly and playful',
    state: 'Andhra Pradesh',
    city: 'Visakhapatnam',
    phone: '9876543225',
  },
  {
    name: 'Lovly',
    type: 'CAT' as const,
    age: 'ADULTHOOD' as const,
    gender: 'FEMALE' as const,
    vaccinated: true,
    neutered: true,
    sprayed: true,
    shots_uptodate: true,
    reason: "Owner's new apartment restrictions",
    info: 'Gentle and enjoys cuddles',
    state: 'Haryana',
    city: 'Gurgaon',
    phone: '9876543226',
  },
  {
    name: 'Sam',
    type: 'DOG' as const,
    age: 'ADULTHOOD' as const,
    gender: 'MALE' as const,
    vaccinated: true,
    neutered: true,
    sprayed: true,
    shots_uptodate: false,
    reason: "Owner's busy schedule",
    info: 'Well-trained and loyal',
    state: 'Puducherry',
    city: 'Pondicherry',
    phone: '9876543227',
  },
  {
    name: 'Sophie',
    type: 'CAT' as const,
    age: 'SENIOR' as const,
    gender: 'FEMALE' as const,
    vaccinated: true,
    neutered: true,
    sprayed: true,
    shots_uptodate: true,
    reason: "Owner's health concerns",
    info: 'Calm and affectionate',
    state: 'Goa',
    city: 'Panaji',
    phone: '9876543228',
  },
  {
    name: 'Rusty',
    type: 'DOG' as const,
    age: 'PUPPYHOOD' as const,
    gender: 'MALE' as const,
    vaccinated: true,
    neutered: false,
    sprayed: false,
    shots_uptodate: false,
    reason: 'Found abandoned',
    info: 'Energetic and loves outdoor play',
    state: 'Jharkhand',
    city: 'Ranchi',
    phone: '9876543229',
  },
];

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

async function main() {
  const createdUsers: (Omit<(typeof userData)[0], 'role'> & {
    id: string;
    role: 'USER' | 'ADMIN';
  })[] = [];

  type BreedType = {
    id: number;
    name: string;
    slug: string;
    type: 'CAT' | 'DOG';
  };

  const createdCATBreeds: BreedType[] = [];

  const createdDOGBreeds: BreedType[] = [];

  for (const cat of catBreeds) {
    const catSlug = slugify(cat, { replacement: '-', lower: true, trim: true });
    const newCatBreed = await client.breed.upsert({
      where: {
        slug: catSlug,
      },
      update: {},
      create: {
        name: cat,
        slug: catSlug,
        type: 'CAT',
      },
    });
    createdCATBreeds.push(newCatBreed);
  }

  for (const dog of dogBreeds) {
    const dogSlug = slugify(dog, { replacement: '-', lower: true, trim: true });
    const newDogBreed = await client.breed.upsert({
      where: {
        slug: dogSlug,
      },
      update: {},
      create: {
        name: dog,
        slug: dogSlug,
        type: 'DOG',
      },
    });
    createdDOGBreeds.push(newDogBreed);
  }

  for (const user of userData) {
    try {
      const newUser = await client.user.upsert({
        where: {
          username: user.username,
        },
        update: {},
        create: { ...user },
      });
      createdUsers.push(newUser);
    } catch (error) {
      console.log(error);
    }
  }

  // for (const pet of pets) {
  try {
    const petsInDB = await client.pet.findMany();
    if (petsInDB.length < 20) {
      const petsTransformed = pets.map((pet) => ({
        ...pet,
        breed_id:
          pet.type === 'CAT'
            ? createdCATBreeds[getRandomInt(1, catBreeds.length)].id
            : createdDOGBreeds[getRandomInt(1, dogBreeds.length)].id,
        user_id: createdUsers[getRandomInt(1, createdUsers.length)].id,
      }));
      await client.pet.createMany({ data: petsTransformed });
    }
  } catch (error) {
    console.log(error);
  }
}
// }

main()
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await client.$disconnect();
    process.exit(1);
  });
