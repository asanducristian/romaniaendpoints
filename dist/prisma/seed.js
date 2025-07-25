"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new client_1.PrismaClient();
const counties = [
    { name: 'Alba', code: 'AB' },
    { name: 'Arad', code: 'AR' },
    { name: 'Argeș', code: 'AG' },
    { name: 'Bacău', code: 'BC' },
    { name: 'Bihor', code: 'BH' },
    { name: 'Bistrița-Năsăud', code: 'BN' },
    { name: 'Botoșani', code: 'BT' },
    { name: 'Brașov', code: 'BV' },
    { name: 'Brăila', code: 'BR' },
    { name: 'Buzău', code: 'BZ' },
    { name: 'Caraș-Severin', code: 'CS' },
    { name: 'Călărași', code: 'CL' },
    { name: 'Cluj', code: 'CJ' },
    { name: 'Constanța', code: 'CT' },
    { name: 'Covasna', code: 'CV' },
    { name: 'Dâmbovița', code: 'DB' },
    { name: 'Dolj', code: 'DJ' },
    { name: 'Galați', code: 'GL' },
    { name: 'Giurgiu', code: 'GR' },
    { name: 'Gorj', code: 'GJ' },
    { name: 'Harghita', code: 'HR' },
    { name: 'Hunedoara', code: 'HD' },
    { name: 'Ialomița', code: 'IL' },
    { name: 'Iași', code: 'IS' },
    { name: 'Ilfov', code: 'IF' },
    { name: 'Maramureș', code: 'MM' },
    { name: 'Mehedinți', code: 'MH' },
    { name: 'Mureș', code: 'MS' },
    { name: 'Neamț', code: 'NT' },
    { name: 'Olt', code: 'OT' },
    { name: 'Prahova', code: 'PH' },
    { name: 'Satu Mare', code: 'SM' },
    { name: 'Sălaj', code: 'SJ' },
    { name: 'Sibiu', code: 'SB' },
    { name: 'Suceava', code: 'SV' },
    { name: 'Teleorman', code: 'TR' },
    { name: 'Timiș', code: 'TM' },
    { name: 'Tulcea', code: 'TL' },
    { name: 'Vaslui', code: 'VS' },
    { name: 'Vâlcea', code: 'VL' },
    { name: 'Vrancea', code: 'VN' },
    { name: 'București', code: 'B' },
];
async function seedPostalCodes() {
    console.log('Starting postal codes seed...');
    await prisma.postalCode.deleteMany();
    console.log('Cleared existing postal codes');
    const csvPath = path.join(__dirname, '..', 'csvs', 'postal_data.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split('\n');
    const dataLines = lines.slice(1).filter((line) => line.trim());
    console.log(`Found ${dataLines.length} postal code records to process`);
    let processedCount = 0;
    const batchSize = 1000;
    for (let i = 0; i < dataLines.length; i += batchSize) {
        const batch = dataLines.slice(i, i + batchSize);
        const postalCodes = [];
        for (const line of batch) {
            const columns = line.split(',');
            if (columns.length >= 5) {
                postalCodes.push({
                    code: columns[0].trim(),
                    county: columns[1].trim(),
                    locality: columns[2].trim(),
                    streetAddress: columns[3].trim(),
                    postalSubunit: columns[4].trim(),
                });
            }
        }
        if (postalCodes.length > 0) {
            await prisma.postalCode.createMany({
                data: postalCodes,
                skipDuplicates: true,
            });
            processedCount += postalCodes.length;
            console.log(`Processed ${processedCount}/${dataLines.length} postal codes`);
        }
    }
    console.log(`Seeded ${processedCount} postal codes successfully!`);
}
async function main() {
    console.log('Starting seed...');
    await prisma.county.deleteMany();
    console.log('Cleared existing counties');
    for (const county of counties) {
        await prisma.county.create({
            data: county,
        });
        console.log(`Created county: ${county.name} (${county.code})`);
    }
    console.log(`Seeded ${counties.length} counties successfully!`);
    await seedPostalCodes();
}
main()
    .catch((e) => {
    console.error('Error during seed:');
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map