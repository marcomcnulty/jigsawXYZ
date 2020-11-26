const _ = require("lodash");
const dayjs = require("dayjs");

const data = [
  {
    id: 1,
    amount: 100,
    merchant: "Tescos Ltd",
    category: "food",
    paymentDate: "2019-01-27T14:24:48.960Z",
  },
  {
    id: 2,
    amount: 20,
    merchant: "TFL London",
    category: "transport",
    paymentDate: "2019-02-27T14:24:48.960Z",
  },
  {
    id: 3,
    amount: 30,
    merchant: "London Bus",
    category: "transport",
    paymentDate: "2019-02-28T14:24:48.960Z",
  },
  {
    id: 4,
    amount: 90,
    merchant: "H&M",
    category: "shopping",
    paymentDate: "2019-02-20T14:24:48.960Z",
  },
  {
    id: 5,
    amount: 10,
    merchant: "M&S",
    category: "Grocery",
    paymentDate: "2019-02-24T14:24:48.960Z",
  },
  {
    id: 6,
    amount: 11,
    merchant: "Cineworld",
    category: "Entertainment",
    paymentDate: "2019-02-27T14:24:48.960Z",
  },
];

class Account {
  constructor(name, transactionHistory) {
    this.name = name;
    this.transactionHistory = this.copyTransactions(transactionHistory);
  }

  copyTransactions(transactions) {
    return _.cloneDeep(transactions);
  }

  formatDate(date) {
    return dayjs(date).format("DD/MM/YYYY");
  }

  groupTransactions(val) {
    return val === "paymentDate"
      ? _.groupBy(this.transactionHistory, x => this.formatDate(x[val]))
      : _.groupBy(this.transactionHistory, x => x[val]);
  }

  getTransactionsTotalNumber(val) {
    return val.length;
  }

  getTransactionsTotalValue(val) {
    return val.map(x => x.amount).reduce((a, b) => a + b);
  }

  calculateTransactionInsights(x) {
    return {
      totalNumber: this.getTransactionsTotalNumber(x),
      totalValue: this.getTransactionsTotalValue(x),
      averageValue:
        this.getTransactionsTotalValue(x) / this.getTransactionsTotalNumber(x),
    };
  }

  getTransactionInsights(val) {
    const transactions = this.groupTransactions(val);
    const insights = _.cloneDeep(transactions);

    for (let key in transactions) {
      insights[key] = this.calculateTransactionInsights(insights[key]);
    }

    return insights;
  }

  displaySpendingByCategory() {
    return this.getTransactionInsights("category");
  }

  displaySpendingByDay() {
    return this.getTransactionInsights("paymentDate");
  }
}

const acc1 = new Account("Marco", data);

console.log(acc1.displaySpendingByDay());
console.log(acc1.displaySpendingByCategory());
