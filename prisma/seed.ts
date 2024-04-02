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

async function main() {
  for (const cat of catBreeds) {
    const catSlug = slugify(cat, { replacement: '-', lower: true, trim: true });
    await client.breed.upsert({
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
  }

  for (const dog of dogBreeds) {
    const dogSlug = slugify(dog, { replacement: '-', lower: true, trim: true });
    await client.breed.upsert({
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
  }
}

main()
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await client.$disconnect();
    process.exit(1);
  });
