import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import * as appModule from "application";

export class ReservationsViewModel extends Observable {

    constructor() {
        super();
        this.todayDate = formatDateWithDay(new Date());
        this.reservations = new ObservableArray<Reservation>();

        var today = formatDateWithYear(new Date());

        var reservation1 = Reservation.makeReservationWith(
            "Rachel Nabors", "359-555-1236", today, "20:00",
            3, "patio", 10, "in-person", false);
        this.reservations.push(reservation1);

        var reservation2 = Reservation.makeReservationWith(
            "Christian Heilmann", "359-555-1236", today, "20:30",
            4, "patio", 6, "in-person", false);
        this.reservations.push(reservation2);

        var reservation3 = Reservation.makeReservationWith(
            "Thomas Drake", "359-555-1236", today, "21:00",
            1, "patio", 4, "in-person", false);
        this.reservations.push(reservation3);

        var reservation4 = Reservation.makeReservationWith(
            "Aaron White", "359-555-1236", today, "21:00",
            2, "patio", 2, "in-person", false);
        this.reservations.push(reservation4);

        var reservation5 = Reservation.makeReservationWith(
            "Nancy Davolio", "359-555-1236", today, "21:45",
            4, "patio", 6, "in-person", false);
        this.reservations.push(reservation5);

        var options = new Array<String>();
        options.push("phone");
        options.push("in-person");
        options.push("online");
        options.push("other");
        this.originOptions = options;

        var tOptions = new Array<Number>();
        tOptions.push(1);
        tOptions.push(2);
        tOptions.push(3);
        tOptions.push(4);
        this.tableOptions = tOptions;

        var sOptions = new Array<String>();
        sOptions.push("1st floor");
        sOptions.push("2nd floor");
        sOptions.push("3rd floor");
        sOptions.push("Patio");
        this.sectionOptions = sOptions;

        appModule.getResources()["timeConverter"] = timeConverter;
        appModule.getResources()["ampmConverter"] = ampmConverter;
    }

    get isNew(): Boolean {
        return this.get("_isNew");
    }

    set isNew(value: Boolean) {
        this.set("_isNew", value);
    }

    get todayDate(): String {
        return this.get("_todayDate");
    }

    set todayDate(value: String) {
        this.set("_todayDate", value);
    }

    set reservations(value: ObservableArray<Reservation>) {
        this.set("_reservations", value);
    }

    get reservations(): ObservableArray<Reservation> {
        return this.get("_reservations");
    }

    set currentReservation(value: Reservation) {
        this.set("_currentReservation", value);
    }

    get currentReservation(): Reservation {
        return this.get("_currentReservation");
    }

    set sectionOptions(value: Array<String>) {
        this.set("_sectionOptions", value);
    }

    get sectionOptions(): Array<String> {
        return this.get("_sectionOptions");
    }

    set originOptions(value: Array<String>) {
        this.set("_originOptions", value);
    }

    get originOptions(): Array<String> {
        return this.get("_originOptions");
    }

    set tableOptions(value: Array<Number>) {
        this.set("_tableOptions", value);
    }

    get tableOptions(): Array<Number> {
        return this.get("_tableOptions");
    }
}

function formatDateWithDay(date: Date) {
    var day: number = date.getDate();
    var month: number = date.getMonth() + 1;
    var dateText = day < 10 ? "0" + day : day;
    var monthText = month < 10 ? "0" + month : month;
    var dayOfWeek: number = date.getDay();
    return dayText(dayOfWeek) + ", " + dateText + "." + monthText;
}

function formatDateWithYear(date: Date) {
    var day: number = date.getDate();
    var month: number = date.getMonth() + 1;
    var year: number = date.getFullYear();
    return year + "-" + month + "-" + day;
}

function dayText(day: number) {
    switch (day) {
        case 1: return "Mon";
        case 2: return "Tue";
        case 3: return "Wed";
        case 4: return "Thu";
        case 5: return "Fri";
        case 6: return "Sat";
        case 7: return "Sun";
    }
}

var timeConverter = function (value) {
    var valueParts = value.split(":");
    var hour = valueParts[0];
    var minute = valueParts[1];

    var hourValue = Number(hour);
    if (hourValue > 12) {
        hourValue -= 12;
    }
    if (hourValue == 0) {
        hourValue = 12;
    }

    return hourValue + ":" + minute;
}

var ampmConverter = function (value) {
    var valueParts = value.split(":");
    var hour = valueParts[0];
    var minute = valueParts[1];

    var hourValue = Number(hour);
    if (hourValue >= 12) {
        return "pm";
    }

    return "am";
}

export class Reservation {
    public name: string = "";
    public phone: string = "";
    public date: string = formatDateWithYear(new Date());
    public time: string = "20:00";
    public table: number = 1;
    public section: string = "patio";
    public guests: number = 1;
    public origin: string = "in-person";
    public cancelled: boolean = false;

    constructor() {
    }

    static makeReservationWith(name, phone, date, time, table, section, guests, origin, cancelled) {
        var r = new Reservation();
        r.name = name;
        r.phone = phone;
        r.date = date;
        r.time = time;
        r.table = table;
        r.section = section;
        r.guests = guests;
        r.origin = origin;
        r.cancelled = cancelled;
        return r;
    }
}