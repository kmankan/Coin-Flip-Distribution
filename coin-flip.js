const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));
const coin = ["H", "T"]
const trackOutcomes = {
  Heads: [],
  Tails: []
}

// Flip a coin n number of times and record how many H and T and %
// Assume equally likely outcomes in each flip
const flipCoins = (num) => {
  const result = [];
  for (let i = 0; i < num; i++ ) {
    let rand = coin[Math.floor(Math.random() * coin.length)]
    result.push(rand)
  }
  const numberOfHeads = result.filter(flip => flip === "H").length
  const proportionHeads = numberOfHeads/result.length
  const numberOfTails = result.filter(flip => flip === "T").length;
  const proportionTails = numberOfTails/result.length

  rl.close();

  return [proportionHeads, proportionTails]
}

// Do n coin flips above k number of times
const performExperiments = (n, k) => {
  for (let i = 0; i < k; i++) {
    const [proportionHeads, proportionTails] = flipCoins(n)
    trackOutcomes.Heads.push(proportionHeads)
    trackOutcomes.Tails.push(proportionTails)
  }

  const headsHalfTheTime = trackOutcomes.Heads.filter(outcome => outcome === 0.5).length
  console.log(`50% Heads on ${n} coin flips performed ${k} times`, trackOutcomes.Heads)
  console.log("Heads: ", headsHalfTheTime, `${headsHalfTheTime/k*100}%`)
}

const main = async() => {
  try {
    const askUserForNumberOfFlips = await prompt("how many coin flips? ");
    flipCoins(askUserForNumberOfFlips);
  } catch (e) {
    console.error("Unable to prompt", e);
  } finally {
    rl.close();
  }
};

performExperiments(process.argv[2], process.argv[3]);
//flipCoins(process.argv[2]);

