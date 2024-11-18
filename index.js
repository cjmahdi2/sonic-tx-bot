import { account } from "./account.js";
import { proxyList } from "./proxy_list.js";
import { Solana } from "./src/core/solana.js";
import { Helper } from "./src/utils/helper.js";
import logger from "./src/utils/logger.js";

async function operation(acc, proxy) {
  const solana = new Solana(acc, proxy);
  try {
    await solana.connectWallet();
    await solana.checkBalance();
    if (solana.balance < 0.01) {
      throw Error("You need at least 0.01 SOL To Use This BOT");
    }
    await solana.connect();
    await Helper.delay(500, acc, `Getting Wallet Balance Information`, solana);
    await solana.getRewardInfo();
    await solana.getDailyTx();
    await solana.checkIn();
    await Helper.delay(500, acc, `Starting Mass Tx`, solana);

    if (100 - solana.dailyTx.total_transactions > 0) {
      while (solana.dailyTx.total_transactions <= 100) {
        await solana.sendSolToAddress(acc);
        const randWait = Helper.random(1000, 3000);
        await Helper.delay(randWait, acc, "Delaying before do next tx", solana);
      }
    }

    await solana.getDailyTx();

    const claimableStage = [];
    if (solana.dailyTx.total_transactions >= 10) {
      claimableStage.push(1);
    }
    if (solana.dailyTx.total_transactions >= 50) {
      claimableStage.push(2);
    }
    if (solana.dailyTx.total_transactions >= 100) {
      claimableStage.push(3);
    }

    for (const stage of claimableStage) {
      await solana.claimTxMilestone(stage);
    }

    await solana.getRewardInfo();
    await Helper.delay(
      500,
      acc,
      `Opening ${solana.reward.ring_monitor} Mystery box`,
      solana
    );

    while (solana.reward.ring_monitor != 0) {
      await solana.claimMysteryBox().catch(async (err) => {
        if (err.message.includes("custom program error")) {
          await Helper.delay(
            3000,
            acc,
            `Error while claiming mystery box, possible Sonic program error, skipping open box`,
            solana
          );
        }
      });
      await solana.getRewardInfo();
    }

    await Helper.delay(
      60000 * 60 * 24,
      acc,
      `Account Processing Complete, Delaying for 24 H`,
      solana
    );
  } catch (error) {
    let msg = error.message;
    if (msg.includes("<!DOCTYPE html>")) {
      msg = msg.split("<!DOCTYPE html>")[0];
    }
    await Helper.delay(
      500,
      acc,
      `Error ${msg}, Retrying using Account ${
        account.indexOf(acc) + 1
      } after 10 Second...`,
      solana
    );

    logger.info(`Retrying using Account ${account.indexOf(acc) + 1}...`);
    logger.error(error);
    await Helper.delay(10000);
    await operation(acc, proxy);
  }
}

process.on("unhandledRejection", (reason) => {
  throw Error("Unhandled Exception : " + reason);
});

async function startBot() {
  return new Promise(async (resolve, reject) => {
    try {
      logger.info(`BOT STARTED`);
      if (account.length == 0)
        throw Error("Please input your account first on account.js file");

      if (proxyList.length != account.length && proxyList.length != 0)
        throw Error(
          `You Have ${account.length} Accounts But Provide ${proxyList.length}`
        );

      const batchSize = 25; // تعداد حساب‌هایی که هم‌زمان پردازش می‌شود
      let batchIndex = 0;

      while (batchIndex < account.length) {
        const batch = account.slice(batchIndex, batchIndex + batchSize);
        const batchPromises = [];

        // برای هر حساب در این batch یک عملیات آغاز می‌شود
        for (const acc of batch) {
          const accIdx = account.indexOf(acc);
          const proxy = proxyList[accIdx];
          batchPromises.push(operation(acc, proxy)); // فراخوانی عملیات برای هر حساب
        }

        // صبر می‌کنیم تا عملیات‌های این batch کامل شوند
        await Promise.all(batchPromises);

        // برو به batch بعدی
        batchIndex += batchSize;

        // اگر نیاز دارید که بین هر batch کمی تاخیر بیافتد (مثلا برای جلوگیری از فشار روی سرور)
        await Helper.delay(1000); // تاخیر 1 ثانیه بین batchها
      }

      resolve();
    } catch (error) {
      logger.info(`BOT STOPPED`);
      logger.error(JSON.stringify(error));
      reject(error);
    }
  });
}

// محاسبه زمان تا ساعت ۴ صبح
function getTimeToNextRun() {
  const now = new Date();
  const targetHour = 4; // ساعت هدف ۴ صبح
  const targetTime = new Date(now.setHours(targetHour, 0, 0, 0)); // تنظیم ساعت به ۴ صبح امروز

  if (now > targetTime) {
    // اگر الان از ۴ صبح گذشته، باید ۴ صبح روز بعد را محاسبه کنیم
    targetTime.setDate(targetTime.getDate() + 1);
  }

  return targetTime - now; // زمان باقی‌مانده به میلی‌ثانیه
}

// اجرای کد به طور خودکار هر روز ساعت ۴ صبح
async function scheduleDailyRun() {
  try {
    // محاسبه زمان باقی‌مانده تا ۴ صبح
    const timeToNextRun = getTimeToNextRun();
    console.log(`Next run will be in: ${timeToNextRun / 1000 / 60 / 60} hours`);

    // صبر کردن تا رسیدن به ساعت ۴ صبح
    setTimeout(async () => {
      await startBot(); // اجرای کد اصلی
      scheduleDailyRun(); // برنامه‌ریزی اجرای مجدد روز بعد
    }, timeToNextRun); // زمان‌بندی اجرای بعدی
  } catch (error) {
    console.log("Error scheduling next run:", error);
  }
}

(async () => {
  try {
    logger.clear();
    logger.info("");
    logger.info("Application Started");
    console.log("EVM TX DEPLOYER BOT");
    console.log();
    console.log("By : Widiskel");
    console.log("Follow On : https://github.com/Widiskel");
    console.log("Join Channel : https://t.me/skeldrophunt");
    console.log("Dont forget to run git pull to keep up to date");
    console.log();
    console.log();
    Helper.showSkelLogo();
    await scheduleDailyRun(); // شروع برنامه‌ریزی اجرای روزانه
  } catch (error) {
    console.log("Error during executing bot:", error);
    await scheduleDailyRun(); // شروع دوباره برنامه‌ریزی در صورت خطا
  }
})();
