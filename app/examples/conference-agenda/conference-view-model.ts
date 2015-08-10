import observable = require("data/observable");
function formatTime(time: Date) {
    var hour: number = time.getHours();
    var min: string = time.getMinutes() + "";
    return (hour <= 12 ? hour : hour - 12) + ":" + (min.length === 1 ? '0' + min : min) + (hour < 12 ? " AM" : " PM")
}

export class Session extends observable.Observable {
    constructor(
        public title: string,
        public start: Date,
        public end: Date,
        public room: string,
        public isFavourite: boolean) {
        super();
    }

    get range(): string {
        return formatTime(this.start) + " - " + formatTime(this.end);
    }

    public toggleFavourite() {
        this.set("isFavourite", !this.get("isFavourite"));
    }
}

// Schedule
var allSessions: Array<Session> = [
    // Day 1
    new Session("NativeScript Deep Dive 1",
        new Date(2015, 5, 3, 9, 30), new Date(2015, 5, 3, 12, 30), "room 1", true),
    new Session("Smart Design for Smartphones",
        new Date(2015, 5, 3, 9, 30), new Date(2015, 5, 3, 12, 30), "room 2", false),
    new Session("Build, Deploy, and Scale your Mobile Backend with Node.js and Modulus",
        new Date(2015, 5, 3, 9, 30), new Date(2015, 5, 3, 12, 30), "room 3", false),
    new Session("NativeScript Deep Dive 2",
        new Date(2015, 5, 3, 13, 30), new Date(2015, 5, 3, 16, 30), "room 1", true),
    new Session("Smart Design for Smartphones",
        new Date(2015, 5, 3, 13, 30), new Date(2015, 5, 3, 16, 30), "room 2", false),
    new Session("Responsive Apps with Telerik DevCraft",
        new Date(2015, 5, 3, 13, 30), new Date(2015, 5, 3, 16, 30), "room 3", false),

    // Day 2
    new Session("Telerik Keynote - Mobilizing and Modernizing",
        new Date(2015, 5, 4, 9, 30), new Date(2015, 5, 4, 12, 30), "room 1", true),

    new Session("A Lap Around NativeScript",
        new Date(2015, 5, 4, 10, 45), new Date(2015, 5, 4, 11, 30), "room 1", true),
    new Session("Kendo UI Building Blocks",
        new Date(2015, 5, 4, 10, 45), new Date(2015, 5, 4, 11, 30), "room 2", false),

    new Session("AngularJS 2.0",
        new Date(2015, 5, 4, 11, 45), new Date(2015, 5, 4, 12, 30), "room 1", true),
    new Session("Getting Started with ScreenBuilder",
        new Date(2015, 5, 4, 11, 45), new Date(2015, 5, 4, 12, 30), "room 2", false),

    new Session("NativeScript Extensibility",
        new Date(2015, 5, 4, 13, 30), new Date(2015, 5, 4, 14, 15), "room 1", true),
    new Session("AngularJS and Kendo UI ",
        new Date(2015, 5, 4, 13, 30), new Date(2015, 5, 4, 14, 15), "room 2", false),

    new Session("Building a CRM Portal in 45 Minutes",
        new Date(2015, 5, 4, 14, 30), new Date(2015, 5, 4, 15, 15), "room 1", false),
    new Session("JavaScript Beyond the Basics",
        new Date(2015, 5, 4, 14, 30), new Date(2015, 5, 4, 15, 15), "room 2", true),
        
    // Day 3
    new Session("Sitefinity Keynote",
        new Date(2015, 5, 5, 9, 30), new Date(2015, 5, 5, 12, 30), "room 1", true),

    new Session("Introduction to Mobile Testing & Device Cloud",
        new Date(2015, 5, 5, 10, 45), new Date(2015, 5, 5, 11, 30), "room 1", true),
    new Session("Using Kendo UI in SharePoint/Office 365",
        new Date(2015, 5, 5, 10, 45), new Date(2015, 5, 5, 11, 30), "room 2", false),

    new Session("Improving Applications with Telerik Analytics",
        new Date(2015, 5, 5, 11, 45), new Date(2015, 5, 5, 12, 30), "room 1", true),
    new Session("Building Offline Ready Mobile Apps",
        new Date(2015, 5, 5, 11, 45), new Date(2015, 5, 5, 12, 30), "room 2", false),

    new Session("Debugging with Fiddler",
        new Date(2015, 5, 5, 13, 30), new Date(2015, 5, 5, 14, 15), "room 1", true),
    new Session("Performance Tuning Your Mobile Web Apps",
        new Date(2015, 5, 5, 13, 30), new Date(2015, 5, 5, 14, 15), "room 2", false),

    new Session("Telerik Native Mobile UI for iOS and Android",
        new Date(2015, 5, 5, 14, 30), new Date(2015, 5, 5, 15, 15), "room 1", false),
    new Session("Advanced Kendo UI",
        new Date(2015, 5, 5, 14, 30), new Date(2015, 5, 5, 15, 15), "room 2", true),
];

export class ConferenceViewModel extends observable.Observable {
    public sessions: Array<Session>;

    private _selectedDay: number;
    public get selectedDay(): number {
        return this._selectedDay;
    }
    public set selectedDay(value: number) {
        if (this._selectedDay !== value) {
            this._selectedDay = value;
            this.filter();
        }
    }

    private _search: string;
    public get search(): string {
        return this._search;
    }
    public set search(value: string) {
        if (this._search !== value) {
            this._search = value;
            this.filter();
        }
    }

    private filter() {
        var day = this.selectedDay + 3;
        var textFilter = this.search ? this.search.toLocaleLowerCase() : this.search;

        var filteredSessions = allSessions.filter((session) => {
            return (session.start.getDate() === day) &&
                (!textFilter || session.title.toLocaleLowerCase().indexOf(textFilter) >= 0);
        });

        this.set("sessions", filteredSessions)
    }

    constructor() {
        super();
        this.selectedDay = 0;
        this.search = null;

        this.filter();
    }
}

export var instance = new ConferenceViewModel();
