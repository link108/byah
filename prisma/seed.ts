import { db } from "../src/lib/db";

// From the trip's brewery list. Idempotent (upsert by name) so re-running is safe.
const breweries = [
  "Anderson Valley Brewing",
  "Alvarado Street Brewing",
  "Bear Republic Brewing",
  "Berryessa Brewing",
  "Cooperage Brewing",
  "Cuver",
  "Del Cielio Brewing",
  "Drake's Brewing",
  "Eel River Brewing",
  "Fog Belt Brewing",
  "Fort Point Brewery",
  "Gilman Brewing",
  "Ghost Town Brewing",
  "HenHouse Brewing",
  "Hiveworks Mead Co.",
  "Hop Oast Pub and Brewery",
  "Humbolt Brewing",
  "Kelsey Creek Brewing",
  "Laughing Monk Brewing",
  "Moonlight Brewing",
  "Nitty's Cider",
  "Northspur Brewing",
  "Old Caz Brewing",
  "Original Pattern Brewing",
  "Parliament Brewing",
  "Rockaway Brewing",
  "Russian River Brewing",
  "Stumptown Brewery",
  "Underberg",
  "WolfHouse Brewing"
];

// From the trip's BBQ team list. NOTE: "Sonoma County Firefighters" and
// "Sonoma County Firefighters BBQ" both appear in the source list - kept as
// two distinct teams rather than guessing one is a typo for the other.
// Easy to merge later (delete one row) if it turns out to be a dupe.
const bbqTeams = [
  "2 Fatt Jacks BBQ",
  "Barron Air BBQ",
  "Bear Republic and Drakes Brewing",
  "Bo Daddy",
  "Bushgen's Boys' BBQ",
  "Corner Project Ales and Eats",
  "Cousin Woods' Carnivores",
  "Elecrified Pumacorns",
  "Fogbelt Brewing",
  "Four Brothers Smokin",
  "Ginochio's Kitchen",
  "The Mad Scientists",
  "The Master Basters",
  "Moonlight Brewing",
  "Payne's BBQ",
  "Sonoma County Firefighters",
  "Smokin' Daddy's Catering",
  "Sonoma County Firefighters BBQ",
  "Wolfhouse Brewing"
];

const defaultFoodLabels = ["Ribs", "Wings"];

async function main() {
  for (const name of breweries) {
    await db.brewery.upsert({ where: { name }, update: {}, create: { name } });
  }
  console.log(`Seeded ${breweries.length} breweries.`);

  for (const name of bbqTeams) {
    const team = await db.bbqTeam.upsert({ where: { name }, update: {}, create: { name } });
    for (const label of defaultFoodLabels) {
      await db.foodItem.upsert({
        where: { teamId_label: { teamId: team.id, label } },
        update: {},
        create: { teamId: team.id, label }
      });
    }
  }
  console.log(`Seeded ${bbqTeams.length} BBQ teams with default Ribs/Wings items.`);
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await db.$disconnect();
    process.exit(1);
  });
