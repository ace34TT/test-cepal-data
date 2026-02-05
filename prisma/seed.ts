process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { PrismaClient, Prisma } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('--- 🚀 Début du seed (Aiven + Adapter) ---');

  const productsPath = path.resolve(process.cwd(), 'prisma/data/products.json');
  const detailsPath = path.resolve(process.cwd(), 'prisma/data/product_details.json');

  const productsList = JSON.parse(fs.readFileSync(productsPath, 'utf-8')).data;
  const detailsMap = JSON.parse(fs.readFileSync(detailsPath, 'utf-8')).data;

  try {
    await prisma.frame.deleteMany({});
    console.log('🗑️  Table nettoyée.');
  } catch (e) {
    console.warn('⚠️  Table déjà vide.');
  }

  // Insertion
  for (const item of productsList) {
    const detail = detailsMap[item.id];
    const basePrice = typeof item.price === 'string' ? parseFloat(item.price) : item.price;

    await prisma.frame.create({
      data: {
        id: item.id,
        name: item.name || "Modèle sans nom",
        brand: item.brand,
        description: detail?.description || "",
        price: Math.max(0, basePrice),
        currency: item.currency || "MGA",
        thumbnail: item.thumbnail || "",
        isAvailable: item.isAvailable !== "false",
        materials: detail?.materials || [],
        dimensions: detail?.dimensions || Prisma.JsonNull,
        configurations: detail?.configurations || Prisma.JsonNull,
        threeD: detail?.threeD || Prisma.JsonNull
      }
    });
    console.log(`✅ Importé : ${item.id}`);
  }

  console.log('--- ✨ Terminé ! ---');
}

main()
    .catch((e) => {
      console.error('❌ Erreur:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
      await pool.end();
    });