# Zksync Gitcoin Tax Helper 

Generate cointracker compatible csvs for your zksync transactions.

## Table of Contents
  - [About The Project](#about-the-project)
  - [Getting Started](#getting-started)
      - [Requirements](#requirements)
      - [Installation](#installation)
  - [Pico DAO](#pico-dao)
      - [How it Works](#how-it-works)
  - [Concepts](#concepts)

<!-- about the project -->
## About The Project
Zksync Tax helper is a commandline tool to help you generate a csv of your transactions for taxes. Ideally you should be able to import this into a service like cointracker.io. This will generate a cointracker import v4 compatible CSV.

## Fair Warning Alpha Software. Not a Tax Professional.
No guarantees that everything will be collected as a tax professional would collect it. Verify the numbers look right. That said use at your own risk, discretion. I am not a tax professional. The DAO and people writing this software are also not tax professionals.

## Supported Currently
Generates a csv of your transfer transactions across time. 

## Getting Started
### Requirements
```
nodejs v15.x.x or greater
# I recommend using nvm
# https://github.com/nvm-sh/nvm
# example usage: nvm use v15.0.1 
```
### Installation
```
npm install -g zksync-tax-helper 
zktax-csv --help
```
- Grab all your transactions 
```
zktax-csv -a 0x8deDeA15234d555ee9110e2C0446438D4185e8b7 > output.csv
```

## Concepts 
This will pull the data using the [zk-sync sdk](https://docs.zksync.io/api/sdk/js/). Retrieve the transactions and them put them in the cointracker format. 

which is [here](./cointracker_csv_import_v4)

## Pico DAO
This project is supported by a new concept, called a Pico DAO.  A Pico DAO is a short lived
DAO that's focus and duration is to achieve a short term goal. A DAO treasury is funded, and at the end of the "sprint" the funds are split by the participants based on impact. 

For the next 2 weeks until 04/19/2022 the Pico DAO for the Zsync Tax Helper will be active.
Ultimately the goal is to improve the code in this repo and generate some net good and experiment with short term focused collaborative decision making. 

### How it works
Any contribution to the project that gets merged, makes you a member of the DAO. Being a member gets you a cut of the DAO treasury funds.
0. Must use a git account with some history
1. Make a PR 
2. The PR gets reviewed by DAO members
3. If the PR is approved , it gets merged in
4. You become a DAO member when a PR you make is merged in
4. Rinse repeat. 
5. When the deadline elapses each DAO member votes on the impact of each merged PR to the project 
6. We tabulate each member's impact and split the treasury up accordingly , 10% goes to project dependency of our choice.
7. The DAO is resolved 

### How to Measure Impact?
Measuring impact is quite subjective period. Let's use the power of crowds and an incentive to find
a proxy for an accurate view. The DAO members review each PR's impact at the end of the sprint, and reward the median rating for the PR to the member that created the PR. Each member reviewing also gets a bonus point for being the most accurate, and a negative point for not reviewing at all. 

This results in incentives to participate and incentives to consider more thoughtfully. The ratings themsleves are kept hidden from participants until final process. We then reveal what everyone rated
to apply social pressure in the evaluation process.

Finally if there is a general consensus on the results of the vote, we ratify and apply the split based on total points percentage. 


### Process
1. Rate a merged PR from 1-10 (least impact - most impact)
2. We then evaluate how close you got to the median
3. If you are the closest then you receive a bonus point for impact.
4. After all the voting period all merged PRs have been reviewed
5. The ratings are revealed, if there is general consensus, the results are applied
and the funds split by total points percentage

### In practice
Let's find out make a PR and let's go. If something doesn't work with this process we'll create an issue and try and quickly adjust through rough consensus.

## Roadmap
See the [open issues](https://github.com/zcstarr/zksync-tax-helper/issues) for a list of proposed features (and known issues).

## Contributing
PRs/fixes and issues are all welcome. Feel free to contribute, when you contribute you can be opted into the DAO
and elgible for the experiment. There are no issues too big or too small. 

## Donation 
If you're interested in this Pico DAO concept or If you're having a good time using this, as much as you can with taxes. Drop whatever you feel like giving here: `0x8deDeA15234d555ee9110e2C0446438D4185e8b7`

Funds will go to the DAO experiment treasury until 4/20/2022

## License

Apache License 2.0
