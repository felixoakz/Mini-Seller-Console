import fs from 'fs';

// To use: run `node generateLeads.js` in your terminal.

const NUM_LEADS = 100;

const firstNames = ['John', 'Jane', 'Peter', 'Mary', 'David', 'Sarah', 'Michael', 'Emily', 'Chris', 'Laura'];
const lastNames = ['Doe', 'Smith', 'Jones', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];
const companies = ['Acme Inc.', 'Globex Corp.', 'Stark Industries', 'Wayne Enterprises', 'Cyberdyne Systems', 'Ollivander\'s Wand Shop', 'Gekko & Co', 'Monsters, Inc.', 'Buy n Large', 'Virtucon'];
const sources = ['Web Form', 'Referral', 'Cold Call', 'Partner', 'Advertisement', 'Event'];
const statuses = ['New', 'Contacted', 'Qualified', 'Unqualified', 'In Progress', 'Converted'];

const leads = [];

for (let i = 1; i <= NUM_LEADS; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];

    const lead = {
        id: i,
        name: `${firstName} ${lastName}`,
        company: company,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
        source: sources[Math.floor(Math.random() * sources.length)],
        score: Math.floor(Math.random() * 100) + 1,
        status: statuses[Math.floor(Math.random() * statuses.length)],
    };
    leads.push(lead);
}

fs.writeFileSync('public/leads.json', JSON.stringify(leads, null, 2));

console.log(`Successfully generated ${NUM_LEADS} leads and saved to public/leads.json`);
