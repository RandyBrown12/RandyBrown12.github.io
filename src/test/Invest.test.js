const takeHomePay = require("./takeHomePay")
const debtList = require("../controller/debtList")

    test('Calculation take home pay', () => {
        expect(takeHomePay(40, 7.25, "Hour", "Week", false).incomeBeforeTax).toBe(290.00);
        expect(takeHomePay(40, 7.25, "Hour", "Week", false).incomeAfterTax).toBe(229.68);
        expect(takeHomePay(null, 290, "Week", "Month", false).incomeBeforeTax).toBe(1260.12);
        expect(takeHomePay(null, 290, "Week", "Month", false).incomeAfterTax).toBe(998.02);
        expect(takeHomePay(null, 70000, "Year", "Biweek", false).incomeBeforeTax).toBe(2684.93);
        expect(takeHomePay(null, 70000, "Year", "Biweek", false).incomeAfterTax).toBe(1921.38);
        expect(takeHomePay(15, 900, "Hour", "Biweek", true).incomeBeforeTax).toBe(27000);
        expect(takeHomePay(15, 900, "Hour", "Biweek", true).incomeAfterTax).toBe(16532.70);
    });

    test('Check for null in take home pay', () => {
        expect(takeHomePay(900, 150, "Hour", "Week", false)).toBe(null);
        expect(takeHomePay(NaN, 150, "Hour", "Week", false)).toBe(null);
        expect(takeHomePay(150, null, "Hour", "Week", false)).toBe(null);
        expect(takeHomePay(-55, NaN, "Year", "Biweek", false)).toBe(null);
        expect(takeHomePay(-99, -99, "Hour", "Week", false)).toBe(null);
        expect(takeHomePay(null, null, "Hour", "Week", false)).toBe(null);
        expect(takeHomePay("NaN", "NaN", "Hour", "Year", false)).toBe(null);
        expect(takeHomePay("180", "170", "Hour", "Week", false)).toBe(null);
        expect(takeHomePay(40, 7.25, "Test", "Test", false)).toBe(null);
    });

    test('Calculate debt list', () => {
        expect(debtList(60000, []))
    })