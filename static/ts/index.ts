declare const metron: any;
declare const Chronoline: any;
declare const DAY_IN_MILLISECONDS: any;
declare const $: any;

const events = [
    {
        dates: [new Date(2019, 0, 1), new Date(2019, 0, 4)],
        title: "Robert Pastor",
        pos: "Manager",
        group: "Staff Experience",
        attrs: {
            fill: "#96b8f7",
            stroke: "#96b8f7",
            text: "Manager"
        }
    },
    {
        dates: [new Date(2019, 0, 28), new Date(2019, 1, 22)],
        title: "Robert Pastor",
        pos: "Manager",
        group: "Student Experience",
        attrs: {
            fill: "#a696f7",
            stroke: "#a696f7",
            text: "Manager"
        }
    },
    {
        dates: [new Date(2019, 1, 25), new Date(2019, 2, 22)],
        title: "Robert Pastor",
        pos: "Manager",
        group: "Faculty Experience",
        attrs: {
            fill: "#96e0f7",
            stroke: "#96e0f7",
            text: "Manager"
        }
    },
    {
        dates: [new Date(2019, 2, 25), new Date(2019, 3, 19)],
        title: "Robert Pastor",
        pos: "Manager",
        group: "Faculty Experience",
        attrs: {
            fill: "#96e0f7",
            stroke: "#96e0f7"
        }
    },
    {
        dates: [new Date(2019, 3, 22), new Date(2019, 4, 17)],
        title: "Robert Pastor",
        pos: "Manager",
        group: "Faculty Experience",
        attrs: {
            fill: "#96e0f7",
            stroke: "#96e0f7"
        }
    },
    {
        dates: [new Date(2019, 4, 20), new Date(2019, 5, 14)],
        title: "Robert Pastor",
        pos: "Manager",
        group: "Supporting Applications",
        attrs: {
            fill: "#3a8773",
            stroke: "#3a8773",
            text: "Manager"
        }
    },
    {
        dates: [new Date(2019, 5, 17), new Date(2019, 6, 12)],
        title: "Robert Pastor",
        pos: "Manager",
        group: "Supporting Applications",
        attrs: {
            fill: "#3a8773",
            stroke: "#3a8773"
        }
    },
    {
        dates: [new Date(2019, 6, 15), new Date(2019, 7, 9)],
        title: "Robert Pastor",
        pos: "Manager",
        group: "Supporting Applications",
        attrs: {
            fill: "#3a8773",
            stroke: "#3a8773"
        }
    },
    {
        dates: [new Date(2019, 12, 2), new Date(2019, 12, 20)],
        title: "Robert Pastor",
        pos: "Manager",
        group: "Admissions",
        attrs: {
            fill: "#96f7d7",
            stroke: "#96f7d7",
            text: "Manager"
        }
    },
    {
        dates: [new Date(2019, 0, 1), new Date(2019, 4, 17)],
        title: "Michael Szul",
        pos: "Principal Engineer",
        group: "Faculty Experience",
        attrs: {
            fill: "#96e0f7",
            stroke: "#96e0f7",
            text: "Principal Engineer"
        }
    },
    {
        dates: [new Date(2019, 0, 7), new Date(2019, 3, 15)],
        title: "Michael Szul",
        pos: "Principal Engineer",
        group: "Staff Experience",
        attrs: {
            fill: "#96b8f7",
            stroke: "#96b8f7",
            text: "Principal Engineer"
        }
    },
    {
        dates: [new Date(2019, 5, 3), new Date(2019, 5, 14)],
        title: "Michael Szul",
        pos: "Principal Engineer",
        group: "Staff Experience",
        attrs: {
            fill: "#96b8f7",
            stroke: "#96b8f7",
            text: "Principal Engineer"
        }
    },
    {
        dates: [new Date(2019, 5, 17), new Date(2019, 7, 16)],
        title: "Michael Szul",
        pos: "Principal Engineer",
        group: "Staff Experience",
        attrs: {
            fill: "#96b8f7",
            stroke: "#96b8f7"
        }
    },
    {
        dates: [new Date(2019, 0, 1), new Date(2019, 3, 31)],
        title: "Ashish Pathak",
        pos: "Web Developer",
        group: "Clinical Skills/Clinical Conditions",
        attrs: {
            fill: "#d796f7",
            stroke: "#d796f7",
            text: "Web Developer"
        }
    },
    {
        dates: [new Date(2019, 5, 17), new Date(2019, 7, 16)],
        title: "Ashish Pathak",
        pos: "Web Developer",
        group: "Staff Experience",
        attrs: {
            fill: "#96b8f7",
            stroke: "#96b8f7",
            text: "Web Developer"
        }
    },
    {
        dates: [new Date(2019, 0, 1), new Date(2019, 0, 31)],
        title: "Ethan Preston",
        pos: "Engineer",
        group: "Student Experience",
        attrs: {
            fill: "#a696f7",
            stroke: "#a696f7",
            text: "Engineer"
        }
    },
    {
        dates: [new Date(2019, 0, 1), new Date(2019, 1, 15)],
        title: "Ethan Preston",
        pos: "Engineer",
        group: "Faculty Experience",
        attrs: {
            fill: "#96e0f7",
            stroke: "#96e0f7",
            text: "Engineer"
        }
    },
    {
        dates: [new Date(2019, 0, 1), new Date(2019, 2, 15)],
        title: "Ethan Preston",
        pos: "Engineer",
        group: "Clinical Skills/Clinical Conditions",
        attrs: {
            fill: "#d796f7",
            stroke: "#d796f7",
            text: "Engineer"
        }
    },
    {
        dates: [new Date(2019, 5, 17), new Date(2019, 7, 16)],
        title: "Ethan Preston",
        pos: "Engineer",
        group: "Staff Experience",
        attrs: {
            fill: "#96b8f7",
            stroke: "#96b8f7",
            text: "Engineer"
        }
    },
    {
        dates: [new Date(2019, 1, 18), new Date(2019, 5, 3)],
        title: "Sara Elizabeth",
        pos: "User Experience Analyst",
        group: "Student Experience",
        attrs: {
            fill: "#a696f7",
            stroke: "#a696f7",
            text: "User Experience Analyst"
        }
    },
    {
        dates: [new Date(2019, 3, 15), new Date(2019, 7, 26)],
        title: "Sara Elizabeth",
        pos: "User Experience Analyst",
        group: "Staff Experience",
        attrs: {
            fill: "#96b8f7",
            stroke: "#96b8f7",
            text: "User Experience Analyst"
        }
    },
    {
        dates: [new Date(2019, 4, 20), new Date(2019, 9, 7)],
        title: "Sara Elizabeth",
        pos: "User Experience Analyst",
        group: "Faculty Experience",
        attrs: {
            fill: "#96e0f7",
            stroke: "#96e0f7",
            text: "User Experience Analyst"
        }
    },
    {
        dates: [new Date(2019, 10, 18), new Date(2020, 3, 17)],
        title: "Sara Elizabeth",
        pos: "User Experience Analyst",
        group: "Faculty Experience",
        attrs: {
            fill: "#96e0f7",
            stroke: "#96e0f7",
            text: "User Experience Analyst"
        }
    },
    {
        dates: [new Date(2019, 0, 1), new Date(2019, 0, 15)],
        title: "Heather Nostrant",
        pos: "Business Systems Analyst",
        group: "Clinical Skills/Clinical Conditions",
        attrs: {
            fill: "#d796f7",
            stroke: "#d796f7",
            text: "Business Systems Analyst"
        }
    },
    {
        dates: [new Date(2019, 0, 28), new Date(2019, 1, 22)],
        title: "Heather Nostrant",
        pos: "Business Systems Analyst",
        group: "Faculty Experience",
        attrs: {
            fill: "#96e0f7",
            stroke: "#96e0f7",
            text: "Business Systems Analyst"
        }
    },
    {
        dates: [new Date(2019, 1, 25), new Date(2019, 2, 22)],
        title: "Heather Nostrant",
        pos: "Business Systems Analyst",
        group: "Faculty Experience",
        attrs: {
            fill: "#96e0f7",
            stroke: "#96e0f7"
        }
    },
    {
        dates: [new Date(2019, 2, 25), new Date(2019, 3, 19)],
        title: "Heather Nostrant",
        pos: "Business Systems Analyst",
        group: "Faculty Experience",
        attrs: {
            fill: "#96e0f7",
            stroke: "#96e0f7"
        }
    },
    {
        dates: [new Date(2019, 3, 22), new Date(2019, 4, 17)],
        title: "Heather Nostrant",
        pos: "Business Systems Analyst",
        group: "Faculty Experience",
        attrs: {
            fill: "#96e0f7",
            stroke: "#96e0f7"
        }
    },
    {
        dates: [new Date(2019, 4, 20), new Date(2019, 5, 14)],
        title: "Heather Nostrant",
        pos: "Business Systems Analyst",
        group: "Supporting Applications",
        attrs: {
            fill: "#3a8773",
            stroke: "#3a8773",
            text: "Business Systems Analyst"
        }
    },
    {
        dates: [new Date(2019, 5, 17), new Date(2019, 6, 12)],
        title: "Heather Nostrant",
        pos: "Business Systems Analyst",
        group: "Supporting Applications",
        attrs: {
            fill: "#3a8773",
            stroke: "#3a8773"
        }
    },
    {
        dates: [new Date(2019, 6, 15), new Date(2019, 7, 9)],
        title: "Heather Nostrant",
        pos: "Business Systems Analyst",
        group: "Supporting Applications",
        attrs: {
            fill: "#3a8773",
            stroke: "#3a8773"
        }
    },
    {
        dates: [new Date(2019, 0, 1), new Date(2019, 5, 28)],
        title: "Martin Orth",
        pos: "Senior Engineer #2",
        group: "Faculty Experience",
        attrs: {
            fill: "#96e0f7",
            stroke: "#96e0f7",
            text: "Senior Engineer #2"
        }
    },
    {
        dates: [new Date(2019, 6, 1), new Date(2019, 7, 30)],
        title: "Martin Orth",
        pos: "Senior Engineer #2",
        group: "Faculty Experience",
        attrs: {
            fill: "#96e0f7",
            stroke: "#96e0f7"
        }
    },
    {
        dates: [new Date(2019, 5, 17), new Date(2019, 7, 16)],
        title: "Martin Orth",
        pos: "Senior Engineer #2",
        group: "Staff Experience",
        attrs: {
            fill: "#96b8f7",
            stroke: "#96b8f7",
            text: "Senior Engineer #2"
        }
    },
    {
        dates: [new Date(2019, 0, 1), new Date(2019, 1, 1)],
        title: "Tom Lynch",
        pos: "Senior Engineer #1",
        group: "Financial Aid",
        attrs: {
            fill: "#f796c8",
            stroke: "#f796c8",
            text: "Senior Engineer #1"
        }
    },
    {
        dates: [new Date(2019, 1, 1), new Date(2019, 4, 17)],
        title: "Tom Lynch",
        pos: "Senior Engineer #1",
        group: "Faculty Experience",
        attrs: {
            fill: "#96e0f7",
            stroke: "#96e0f7",
            text: "Senior Engineer #1"
        }
    },
    {
        dates: [new Date(2019, 5, 17), new Date(2019, 10, 15)],
        title: "Tom Lynch",
        pos: "Senior Engineer #1",
        group: "Faculty Experience",
        attrs: {
            fill: "#96e0f7",
            stroke: "#96e0f7",
            text: "Senior Engineer #1"
        }
    },
    {
        dates: [new Date(2019, 0, 1), new Date(2019, 6, 1)],
        title: "Cameron Beers",
        pos: "Consulting Web Developer",
        group: "Student Experience",
        attrs: {
            fill: "#a696f7",
            stroke: "#a696f7",
            text: "Consulting Web Developer"
        }
    },
    {
        dates: [new Date(2019, 4, 1), new Date(2019, 11, 31)],
        title: "Temp. QA Tester",
        pos: "Temp. QA Tester",
        group: "Faculty Experience",
        attrs: {
            fill: "#96e0f7",
            stroke: "#96e0f7",
            text: "Temp. QA Tester"
        }
    }
];

function createTimeline() {
    new Chronoline($("#timeline")[0], events, {
        animated: true,
        defaultStartDate: new Date(2019, 0, 1),
        draggable: true,
        hashInterval: function(date) {
        return date.getDate() === 1;
        },
        labelInterval: function(date) {
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        if(w <= 600) {
            return (date.getDate() === 1 && (date.getMonth() + 1) % 3 === 0);
        }
        else {
            return date.getDate() === 1;
        }
        },
        eventLabels: {
        "font-size": 12,
        fill: "#000",
        "text-anchor": "start"
        },
        labelFormat: "%b %Y",
        markToday: true,
        scrollLeft: function(date) {
            return new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());
        },
        scrollRight: function(date) {
            return new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());
        },
        subLabel: null,
        subSubLabel: null,
        timelinePadding: DAY_IN_MILLISECONDS * 366 / 4,
        tooltips: false,
        visibleSpan: DAY_IN_MILLISECONDS * 366,
        fitVisibleSpan: false,
        eventHeight: 20,
        sortEvents: function(a, b) {
        a = a.pos;
        b = b.pos;
        if(a < b) {
            return -1;
        }
        if(a > b) {
            return 1;
        }
        return 0;
        },
        processEventNodes: function(events, eventRows, rowLastPxs) {
        events.reverse();
        var people = [[]];
        var row = 0;
        var person = events[row].title;
        for(var i = 0; i < events.length; i++) {
            if(person !== events[i].title) {
                person = events[i].title;
                row++;
                people.push([]);
            }
            people[row].push(events[i]);
        }
        var next = 0;
        for(var j = 0; j < people.length; j++) {
            var proj = people[j][0].group;
            for(var k = 0; k < people[j].length; k++) {
                if(proj !== people[j][k].group) {
                    proj = people[j][k].group
                    eventRows.push([]);
                    next++;
                }
                eventRows[next].push(people[j][k]);
            }
            eventRows.push([]);
            next++;
        }
        }
    });
}

window.onresize = function() {
    document.querySelector("#timeline").innerHTML = "";
    createTimeline();
};

metron.onready(function() {
    createTimeline();
}, "lightray.app");
