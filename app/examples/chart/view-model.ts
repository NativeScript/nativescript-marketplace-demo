
export class CategoricalDataModel {
    constructor() {
        console.log("Creating model");
    }

    get categoricalSource() {
        console.log("Getting categorical source");
        return [
            { Category: "Greenings", Amount: 65.0 },
            { Category: "Perfecto", Amount: 62.0 },
            { Category: "FamilyStore", Amount: 55.0 },
            { Category: "Fresh&Green", Amount: 71.0 },
            { Category: "NearBy", Amount: 92.0 }
        ];
    }

    get categoricalSource2() {
        return [
            { Category: "Greenings", Amount: 5 },
            { Category: "Perfecto", Amount: 15 },
            { Category: "FamilyStore", Amount: 3 },
            { Category: "Fresh&Green", Amount: 45 },
            { Category: "NearBy", Amount: 10 }
        ];
    }

    get categoricalSource3() {
        return [
            { Category: "Greenings", Amount: 65 },
            { Category: "Perfecto", Amount: 56 },
            { Category: "FamilyStore", Amount: 89 },
            { Category: "Fresh&Green", Amount: 68 },
            { Category: "NearBy", Amount: 69 }
        ];
    }

    get areaSource() {
        return [
            { Category: "Greenings", Amount: 51 },
            { Category: "Perfecto", Amount: 81 },
            { Category: "FamilyStore", Amount: 89 },
            { Category: "Fresh&Green", Amount: 60 },
            { Category: "NearBy", Amount: 59 }
        ];
    }

    get areaSource2() {
        return [
            { Category: "Greenings", Amount: 60 },
            { Category: "Perfecto", Amount: 87 },
            { Category: "FamilyStore", Amount: 91 },
            { Category: "Fresh&Green", Amount: 95 },
            { Category: "NearBy", Amount: 89 }
        ];
    }

    get bubbleCategoricalSource() {
        return [
            { Country: "Germany", Amount: Math.random() * 10, Impact: 1 },
            { Country: "France", Amount: Math.random() * 10, Impact: 7 },
            { Country: "Bulgaria", Amount: Math.random() * 10, Impact: 10 },
            { Country: "Spain", Amount: Math.random() * 10, Impact: 3 },
            { Country: "USA", Amount: Math.random() * 10, Impact: 4 }
        ];
    }

    get pieSource() {
        return [
            { Country: "Germany", Amount: 40.0 },
            { Country: "France", Amount: 60.0 },
        ];
    }

    get pieSource2() {
        return [
            { Country: "Bulgaria", Amount: 40.0 },
            { Country: "Spain", Amount: 30.0 },
            { Country: "USA", Amount: 30.0 }
        ];
    }
}
