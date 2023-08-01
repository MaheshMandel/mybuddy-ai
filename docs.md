<!-- to start local db Server -->
npx prisma studio 

<!-- To run a Script -->
node scripts/seed.ts

npx prisma db push
npx prisma generate