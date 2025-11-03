const cron = require("node-cron");
const Contribution = require("../models/Contribution");

// Run every day at midnight
cron.schedule("0 0 * * *", async () => {
  console.log("Running automated contribution job...");

  const today = new Date();

  // Find contributions that are due today or past due
  const contributions = await Contribution.find({
    nextContributionDate: { $lte: today },
    status: "pending",
  });

  for (let c of contributions) {
    // Here you can implement payment/bank API integration
    // For now, we just mark them as paid
    c.status = "paid";

    // Schedule next contribution based on frequency
    if (c.frequency === "daily") {
      c.nextContributionDate.setDate(c.nextContributionDate.getDate() + 1);
    } else if (c.frequency === "weekly") {
      c.nextContributionDate.setDate(c.nextContributionDate.getDate() + 7);
    } else if (c.frequency === "monthly") {
      c.nextContributionDate.setMonth(c.nextContributionDate.getMonth() + 1);
    }

    await c.save();
    console.log(`Processed contribution for user ${c.userId}`);
  }
});
