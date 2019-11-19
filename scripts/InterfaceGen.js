var person = {};
var people = [];
var allPersons = [];
var perIdx = 0;
var personCount = 0
person.timeline = []
var DB = GOTDB
//console.log(DB)
var runReqs =
function(person, pick, eventType) {
    var meetsReqs = true
    if ("requires" in pick) {
        for (req in pick.requires) {
            for (type in pick.requires[req]) {
                if (type == "is") {
                    if (pick.requires[req][type].constructor === Array) {
                        for (idx in pick.requires[req][type]) {
                            if (pick.requires[req][type][idx] != person[req]
                            && person[req] != "[Random]") {
                                meetsReqs = false
                                break;
                            }
                        }
                    } else {
                        if (pick.requires[req][type] != person[req]
                        && person[req] != "[Random]") {
                            meetsReqs = false
                            break;
                        }
                    }
                } else if (type == "not") {
                    if (pick.requires[req][type].constructor === Array) {
                        for (idx in pick.requires[req][type]) {
                            if (pick.requires[req][type][idx] == person[req]
                            && person[req] != "[Random]") {
                                meetsReqs = false
                                break;
                            }
                        }
                    } else {
                        if (pick.requires[req][type] == person[req]
                        && person[req] != "[Random]") {
                            meetsReqs = false
                            break;
                        }
                    }
                } else if (type == "under") {
                    if (pick.requires[req][type] < person[req]
                    && person[req] != "[Random]") {
                        meetsReqs = false
                        break;
                    }
                } else if (type == "above") {
                    if (pick.requires[req][type] < person[req]
                    && person[req] != "[Random]") {
                        meetsReqs = false
                        break;
                    }
                } else {
                    meetsReqs = false
                    break;
                }
            }
            if (!meetsReqs) {
                break;
            }
        }
    }
    for (i in person.timeline) {
        //console.log("timeline: " + person.timeline[i]["event"] + " pick "
//        + pick["event"])
        if (person.timeline[i]["event"] === pick["event"]) {
            meetsReqs = false
        }
    }
    if (meetsReqs) {
        if ("effect" in pick) {
            applyEffect(person, pick)
        }
        return pick
    } else return eventType(person)
};
var applyEffect =
function(person, pick) {
    //console.log("effect: " + JSON.stringify(pick["effect"]))
    for (eff in pick.effect) {
        var start = person[eff]
        var str = pick.effect[eff]
        var type = ["+", "-", "=", "$"].indexOf(str[0])
        //console.log(type)
        if (type == 0) {
            person[eff] = Number(person[eff]) + Number(str.slice(1))
            if (person[eff] > 100) {
                person[eff] = 100
            } else if (person[eff] < 0) {
                person[eff] = 0
            }
        } else if (type == 1) {
            person[eff] = Number(person[eff]) - Number(str.slice(1))
            if (person[eff] > 100) {
                person[eff] = 100
            } else if (person[eff] < 0) {
                person[eff] = 0
            }
        } else if (type == 2) {
            person[eff] = str.slice(1)
        } else if (type == 3) {
            person[eff] = str.slice(1)
        }
        var end = person[eff]
        var line
        if (start < 25 && end > 25) {
            person.timeline.push({
                "event":"More " + eff,
                "era":pick.era,
                "line":"I became more " + eff + " in my "
                + pick.era.toLowerCase() + " years."})
        } else if (start < 75 && end > 75) {
            person.timeline.push({
                "event":"More " + eff,
                "era":pick.era,
                "line":"I became more " + eff + " in my "
                + pick.era.toLowerCase() + " years."})
        } else if (start > 25 && end < 25) {
            person.timeline.push({
                "event":"Less " + eff,
                "era":pick.era,
                "line":"I became less " + eff + " in my "
                + pick.era.toLowerCase() + " years."})
        } else if (start > 75 && end < 75) {
            person.timeline.push({
                "event":"Less " + eff,
                "era":pick.era,
                "line":"I became less " + eff + " in my "
                + pick.era.toLowerCase() + " years."})
        }
        //console.log(eff + person[eff])
    };
};
var chEvent = function(person) {
    var events = DB.childEvents
    var pick = events[Math.floor(Math.random() * events.length)]
    pick.era = "Child"
    return runReqs(person, pick, chEvent)
};
var adEvent = function(person) {
    var events = DB.adoleEvents
    var pick = events[Math.floor(Math.random() * events.length)]
    pick.era = "Adolescent"
    return runReqs(person, pick, adEvent)
};
var yaEvent = function(person) {
    var events = DB.yngAdEvents
    var pick = events[Math.floor(Math.random() * events.length)]
    pick.era = "Young Adult"
    return runReqs(person, pick, yaEvent)
};
var maEvent = function(person) {
    var events = DB.midAdEvents
    var pick = events[Math.floor(Math.random() * events.length)]
    pick.era = "Mid-Adult"
    return runReqs(person, pick, maEvent)
};
var elEvent = function(person) {
    var events = DB.elderEvents
    var pick = events[Math.floor(Math.random() * events.length)]
    pick.era = "Elder"
    return runReqs(person, pick, elEvent)
};

var addEvents =
function(person) {
    
    if (person.job == "[Random]") {
        person.job = DB.jobs[Math.floor(Math.random() * DB.jobs.length)]
    
    if (person.region == "[Random]" || person.region == null)
        person.region =
        DB.regions[Math.floor(Math.random() * DB.regions.length)]
    if (person.region != "North of the Wall") addHouse(person)
    if (person.social == "[Random]")
        person.social =
        DB.classes[Math.floor(Math.random() * DB.classes.length)]
    person.timeline.push(chEvent(person))
    person.timeline.push(chEvent(person))
    if (person.age != "Child") {
        person.timeline.push(adEvent(person));
        person.timeline.push(adEvent(person));
        person.timeline.push(adEvent(person));
    } else return


    if (person.age != "Adolescent") {
        person.timeline.push(yaEvent(person));
        person.timeline.push(yaEvent(person));
        person.timeline.push(yaEvent(person));
    } else return 

//
    
    
    }
    if (person.age != "Young Adult") {
        person.timeline.push(maEvent(person));
        person.timeline.push(maEvent(person));
        person.timeline.push(maEvent(person));
    } else return



    if (person.age != "Middle-age Adult") {
        person.timeline.push(elEvent(person));
        person.timeline.push(elEvent(person));
        person.timeline.push(elEvent(person));
    } else return



}
var rand = ["[Random]"];

var formObj =
function() {
    input = [];
    for(var i = 0; i < 36; i++){
        input[i] = "v";
    } 
    for(var i = 0; i <= 3; i++){
        input[i] = "$"
    }
    for(var i = 13; i <= 15; i++){
        input[i] = "$"
    }
    for(var i = 31; i <= 35; i++){
        input[i] = "$"
    }
    hackObj = $.extend({}, {"num":personCount});
    formIdx = hackObj.num
    //console.log("FORMOBJ!" + formIdx)
    // $("form > div").remove();
    $('#form')
    .jsonForm(
    {
        "schema":{
            "test":{"type":"string"},
            "people":{
                "type":"array",
                "items":{
                    "type":"object",
                    "title":"Person",
                    "properties":{
                        "firstName":{"title":"First Name", "type":"string"},
                        "lastName":{"title":"Last Name", "type":"string"},
                        "social":{"title":"Social Class", "type":"string",
                            "enum":rand.concat(DB.classes)},
                        "region":{"title":"Region", "type":"string",
                            "enum":rand.concat(DB.regions)},
                        "job":{"title":"Job", "type":"string",
                            "enum":rand.concat(DB.jobs)},
                        "age":{"title":"Age Category", "type":"string",
                            "enum":rand.concat(DB.ages)},
                        "variance":{"title":"variance", "minimum":0,
                            "type":"range", "maximum":100},
                        "perceptive":{"title":"perceptive", "minimum":0,
                            "type":"range", "maximum":100},
                        "creative":{"title":"creative", "minimum":0,
                            "type":"range", "maximum":100},
                        "intelligent":{"title":"inteligent", "minimum":0,
                            "type":"range", "maximum":100},
                        "organized":{"title":"organized", "minimum":0,
                            "type":"range", "maximum":100},
                        "diligent":{"title":"diligent", "minimum":0,
                            "type":"range", "maximum":100},
                        "reliable":{"title":"reliable", "minimum":0,
                            "type":"range", "maximum":100},
                        "energetic":{"title":"energetic", "minimum":0,
                            "type":"range", "maximum":100},
                        "assertive":{"title":"assertive", "minimum":0,
                            "type":"range", "maximum":100},
                        "popular":{"title":"popular", "minimum":0,
                            "type":"range", "maximum":100},
                        "gentle":{"title":"gentle", "minimum":0,
                            "type":"range", "maximum":100},
                        "trusting":{"title":"trusting", "minimum":0,
                            "type":"range", "maximum":100},
                        "generous":{"title":"generous", "minimum":0,
                            "type":"range", "maximum":100},
                        "content":{"title":"content", "minimum":0,
                            "type":"range", "maximum":100},
                        "emotional":{"title":"emotional", "minimum":0,
                            "type":"range", "maximum":100},
                        "brave":{"title":"brave", "minimum":0, "type":"range",
                            "maximum":100},
                        "tall":{"title":"tall", "minimum":0, "type":"range",
                            "maximum":100},
                        "large":{"title":"large", "minimum":0, "type":"range",
                            "maximum":100},
                        "hairy":{"title":"hairy", "minimum":0, "type":"range",
                            "maximum":100},
                        "dirty":{"title":"dirty", "minimum":0, "type":"range",
                            "maximum":100},
                        "sick":{"title":"sick", "minimum":0, "type":"range",
                            "maximum":100},
                        "agile":{"title":"agile", "minimum":0, "type":"range",
                            "maximum":100},
                        "beautiful":{"title":"beautiful", "minimum":0,
                            "type":"range", "maximum":100},
                        "muscular":{"title":"muscular", "minimum":0,
                            "type":"range", "maximum":100},
                 //       "hair color":{"title":"hair color", "type":"string",
                //            "enum":rand.concat(DB["hair colors"])},
                        "eye color":{"title":"eye color", "type":"string",
                            "enum":rand.concat(DB["eye colors"])},
                        "injury":{"title":"injury", "type":"string",
                            "enum":rand.concat(DB.injuries)},
                        "childTone":{"title":"Childhood", "type":"string",
                            "enum":["[Random]", "Positive", "Negative"]},
                        "adoleTone":{"title":"Adolescence", "type":"string",
                            "enum":["[Random]", "Positive", "Negative"]},
                        "yngAdTone":{"title":"Young Adulthood",
                            "type":"string",
                            "enum":["[Random]", "Positive", "Negative"]},
                        "midAdTone":{"title":"Mid-Life", "type":"string",
                            "enum":["[Random]", "Positive", "Negative"]},
                        "elderTone":{"title":"Elder Years", "type":"string",
                            "enum":["[Random]", "Positive", "Negative"]}}}}},
        // "value":{"people[].firstName":person.firstName,
        // "lastName":person.lastName,
        // "people[].job":person.job, "region":person.region, "age":person.age,
        // "people[].social":person.social, "childTone":person.childTone,
        // "people[].adoleTone":person.adoleTone, "yngAdTone":person.yngAdTone,
        // "people[].midAdTone":person.midAdTone, "elderTone":person.elderTone,
        // "people[].injury":person.injury, "eye color":person["eye color"],
        // "people[].hair color":person["hair color"]},
        "form":[
            {
                "type":"tabarray",
                "items":{
                    "type":"section",
                    "items":[
                        {
                            "type":"fieldset",
                            "title":"Basics",
                            "expandable":true,
                            "items":["people[].age", /*"people[].job",*/
                                "people[].region", "people[].social"]},
                        {
                            "type":"fieldset",
                            "title":"Traits",
                            "expandable":true,
                            "items":[
                                {"key":"people[].variance", "description":"50",
                                    "onChange":function(evt) {
                                        input[4] = evt.target.valueAsNumber
                                        func(evt)
                                    }},
                                {"key":"people[].large", "description":"50",
                                    "onChange":function(evt) {
                                        input[5] = evt.target.valueAsNumber
                                        func(evt)
                                    }},
                                {"key":"people[].tall", "description":"50",
                                    "onChange":function(evt) {
                                        input[6] = evt.target.valueAsNumber
                                        func(evt)
                                    }},
                                {"key":"people[].hairy", "description":"50",
                                    "onChange":function(evt) {
                                        input[7] = evt.target.valueAsNumber
                                        func(evt)
                                    }},
                                {"key":"people[].sick", "description":"50",
                                    "onChange":function(evt) {
                                        input[8] = evt.target.valueAsNumber
                                        func(evt)
                                    }},
                                {"key":"people[].dirty", "description":"50",
                                    "onChange":function(evt) {
                                        input[9] = evt.target.valueAsNumber
                                        func(evt)
                                    }},
                                {"key":"people[].agile", "description":"50",
                                    "onChange":function(evt) {
                                        input[10] = evt.target.valueAsNumber
                                        func(evt)
                                    }},
                                {"key":"people[].muscular", "description":"50",
                                    "onChange":function(evt) {
                                        input[11] = evt.target.valueAsNumber
                                        func(evt)
                                    }},
                                {"key":"people[].beautiful",
                                    "description":"50",
                                    "onChange":function(evt) {
                                        input[12] = evt.target.valueAsNumber
                                        func(evt)
                                    }},
                    //            "people[].hair color",
                                "people[].eye color",
                                "people[].injury",
                                {"key":"people[].perceptive",
                                    "description":"50",
                                    "onChange":function(evt) {
                                        input[16] = evt.target.valueAsNumber
                                        func(evt)
                                    }},
                                {"key":"people[].creative", "description":"50",
                                    "onChange":function(evt) {
                                        input[17] = evt.target.valueAsNumber
                                        func(evt)
                                    }},
                                {"key":"people[].intelligent",
                                    "description":"50",
                                    "onChange":function(evt) {
                                        input[18] = evt.target.valueAsNumber
                                        func(evt)
                                    }},
                                {"key":"people[].organized",
                                    "description":"50",
                                    "onChange":function(evt) {
                                        input[19] = evt.target.valueAsNumber
                                        func(evt)
                                    }},
                                {"key":"people[].diligent", "description":"50",
                                    "onChange":function(evt) {
                                        input[20] = evt.target.valueAsNumber
                                        func(evt)
                                    }},
                                {"key":"people[].reliable", "description":"50",
                                    "onChange":function(evt) {
                                        input[21] = evt.target.valueAsNumber
                                        func(evt)
                                    }},
                                {"key":"people[].energetic",
                                    "description":"50",
                                    "onChange":function(evt) {
                                        input[22] = evt.target.valueAsNumber
                                        func(evt)
                                    }},
                                {"key":"people[].assertive",
                                    "description":"50",
                                    "onChange":function(evt) {
                                        input[23] = evt.target.valueAsNumber
                                        func(evt)
                                    }},
                                {"key":"people[].popular", "description":"50",
                                    "onChange":function(evt) {
                                        input[24] = evt.target.valueAsNumber
                                        func(evt)
                                    }},
                                {"key":"people[].gentle", "description":"50",
                                    "onChange":function(evt) {
                                        input[25] = evt.target.valueAsNumber
                                        func(evt)
                                    }},
                                {"key":"people[].trusting", "description":"50",
                                    "onChange":function(evt) {
                                        input[26] = evt.target.valueAsNumber
                                        func(evt)
                                    }},
                                {"key":"people[].generous", "description":"50",
                                    "onChange":function(evt) {
                                        input[27] = evt.target.valueAsNumber
                                        func(evt)
                                    }},
                                {"key":"people[].content", "description":"50",
                                    "onChange":function(evt) {
                                        input[28] = evt.target.valueAsNumber
                                        func(evt)
                                    }},
                                {"key":"people[].emotional",
                                    "description":"50",
                                    "onChange":function(evt) {
                                        input[29] = evt.target.valueAsNumber
                                        func(evt)
                                    }},
                                {"key":"people[].brave", "description":"50",
                                    "onChange":function(evt) {
                                        input[30] = evt.target.valueAsNumber
                                        console.log(evt)
                                        func(evt)
                                        console.log(evt)
                                    }}]},
                        {
                            "type":"fieldset",
                            "title":"Eras",
                            "expandable":true,
                            "items":["people[].childTone",
                                "people[].adoleTone", "people[].yngAdTone",
                                "people[].midAdTone", "people[].elderTone"]}]}},
            {"type":"actions", "items":[{"type":"submit", "title":"Saver"}]}],
        "onSubmitValid":function(values) {
            //console.log(JSON.stringify(values))
            //console.log(values)
            people = values["people"]
            //people[0].region ="[Random]"
           // people[0].region = DB.regions[Math.floor(Math.random() * DB.regions.length)]
            people[0].job = "[Random]"
            people[0]['hair color'] = "[Random]"
            peo = people[0]
            var encodeArr = ["The Reach", "The Westerlands", "The North", "The Riverlands", "The Vale of Arryn", "The Stormlands", "The Crownlands", "The Iron Islands", "Dorne", "[Random]", "blacksmith", "farmer", "fisherman", "guard", "knight", "merchant", "mentor", "poor", "commoner", "rich", "noble", "child", "adolescent", "young adult", "mid-life", "elder", "Positive", "Negative", "yellow", "black", "brown", "white", "blue", "green", "gray", "arm missing", "leg missing", "face scar", "limp", "none"];
            for(var x in encodeArr){
                if(encodeArr[x] == peo.region){
                    input[2] = x;
                }
                if(encodeArr[x] == peo.age){
                    input[0] = x;
                }
                if(encodeArr[x] == peo.social){
                    input[3] = x;
                }
                if(encodeArr[x] == peo.job){
                    input[1] = x;
                }
                if(encodeArr[x] == peo.childTone){
                    input[31] = x;
                }
                if(encodeArr[x] == peo.adoleTone){
                    input[32] = x;
                }
                if(encodeArr[x] == peo.yngAdTone){
                    input[33] = x;
                }
                if(encodeArr[x] == peo.midAdTone){
                    input[34] = x;
                }
                if(encodeArr[x] == peo.elderTone){
                    input[35] = x;
                }
                if(encodeArr[x] == peo['hair color']){
                    input[13] = x;
                }
                if(encodeArr[x] == peo['eye color']){
                    input[14] = x;
                }
                if(encodeArr[x] == peo.injury){
                    input[15] = x;
                }
            }
            
            console.log(people)
            for(var i in input){
                if(input[i] == 100){
                    input[i] = "x";
                }
            }
            input[36] == peo.firstName;
            input[37] == peo.lastName;
            
            for (idx in people) {
                person = people[idx]
                applyVariance(person)
                person.index = idx
                person.plot = []
                if (person.gender == null) {
                    person.gender =
                    DB.gender[Math.floor(Math.random() * DB.gender.length)]
                }
                if (person.firstName == null)
                    if (person.gender == "male") {
                        person.firstName =
                        DB.names.male[Math.floor(Math.random()
                        * DB.names.male.length)]
                    } else {
                        person.firstName =
                        DB.names.female[Math.floor(Math.random()
                        * DB.names.female.length)]
                    }
                if (person.lastName == null)
                    person.lastName =
                    DB.names.last[Math.floor(Math.random()
                    * DB.names.last.length)]
                if (person.age == "[Random]")
                    person.age =
                    DB.ages[Math.floor(Math.random() * DB.ages.length)]
                //console.log(person)
                person.marriage = "none"
                person.timeline = []
                addEvents(person);
                eventStr = cleanPrintEvents(person)
            }
            inputStr = input.join(' ');
            //inputStr.replace(",", "lol");
/*
            // Encode the String
            var encodedString = btoa(inputStr);
            console.log(encodedString); // Outputs: "SGVsbG8gV29ybGQh"

            // Decode the String
            var decodedString = atob(encodedString);
            console.log(decodedString); // Outputs: "Hello World!"
  */          
            $('#res').html(
            '<p>YOUR NPC SEED:'
            + inputStr
            + "<br> Hello "
            + " "
            + person.firstName
            + " "
            + person.lastName
            + ", "
            + person.age
            + " "
            + person.social
            + " "
            + person.gender
            + " "
            + ((["Young Adult", "Middle-age Adult", "Elder"]
            .indexOf(person.age) > -1) ? person.job : "person") + " from "
            + person.region + "<br>Timeline: " + eventStr + '</p>'
            + "<br>Inform code below:<br>");
            // fillPlot();
            
            $("#inform").html(printInform(people))
        }})
};


var weighted_select = function(items, n) {
    "Used for weighted random selection, data much be in the form [Prob, Val...]"
    total = 0.0;
    i = 0
    results = []
    // overcomplicated in case of future exclusion logic being in third+
    // location of item array
    for (w in items) {
        total += items[i]["selectWeight"] | 1
        i += 1
    }
    i = 0
    w = items[i]["selectWeight"] | 1
    v = items[i]
    while (n > 0) {
        x = total * (random.random())
        while (x > w) {
            x -= w
            i += 1
            w = items[i]["selectWeight"] | 1
            v = items[i]
        }
        i = 0
        results.push(v)
        n -= 1
    }
    return results
};
var doCorrelations = function(person, age) {
    for (var i = 0; i < person.corr.age.length; i++) {
        if (random.random() <= person.corr.age[item].chance) {
            addItem(person, person.corr.age[item], "timeline")
        }
    }
};
var addItem = function(person, item, location) {
    person.location.push(item)
    if (item.corr) {
        for (var i = 0; i < item.corr.length; i++) {
            for (var j = 0; j < item.corr[i].length; i++) {
                person.corr[i].push(item.corr[i][j])
            }
        }
    }
};
var addHouse =
function(person) {
    //console.log(person.region)
    person.house =
    DB.houses[person.region][Math.floor(Math.random()
    * DB.houses[person.region].length)]
};
var func = function(evt) {
    var value = $(evt.target).val();
    person.age = value
    $(evt.target.nextSibling).html(value.toString())
};
var personId = function(person) {
    var id = "", val;
    for (trait in person) {
        val = person[trait]
        if (!$.isNumeric(val)) {
            continue;
        }
        id += val
    };
    //console.log(id)
    return id
};
var applyVariance = function(values) {
    for (trait in values) {
        org = values[trait]
        if (trait == "variance") {
            continue;
        }
        if (!$.isNumeric(org)) {
            continue;
        }
        var rand = Math.floor(Math.random() * values["variance"]);
        var sign = (Math.floor(Math.random() * 2) == 0) ? -1 : 1;
        var temp = (org - sign * rand);
        if (temp > 100) temp = 100
        else if (temp < 0) temp = 0
        values[trait] = temp;
    };
};
var printInform =
function(people) {
    inform =
    'NPCAgency by Grant Pickett begins here.<br><br>'
    + 'Include Conversation Rules by Eric Eve.<br>'
    + 'Instead of asking someone about something:<br>'
    + 'follow the unknown quizzing rule of the noun.<br>'
    + 'Instead of telling someone about something:<br>'
    + 'follow the unknown informing rule of the noun.<br>'
    + 'Clothing is a kind of thing. Clothing is wearable.<br>'
    +'childhood is a familiar subject.<br>' 
    +'adolescence is a familiar subject.<br>' 
    +'young adulthood is a familiar subject.<br>' 
    +'mid-life is a familiar subject.<br>' 
    +'elder years is a familiar subject.<br>' 
    +'home is a familiar subject.<br>' 
    +'others is a familiar subject.<br>' 
    +'job is a familiar subject.<br>' 
    
    for (per in people) {
        person = people[per]
        localStorage.setItem('myStorage', JSON.stringify(people[per]));
        var obj = JSON.parse(localStorage.getItem('myStorage'));
        //console.log(obj)
        person.mood = DB.moods[Math.floor(Math.random() * DB.moods.length)]
        //console.log("inform loop:" + JSON.stringify(people[per]))
        inform +=
        '<br>ComplexNPC'
        + person.index
        + ' is a ' + person.gender+' person.<br>'
        + 'The printed name of ComplexNPC'
        + person.index
        + ' is "'
        + person.firstName
        + " "
        + person.lastName
        + '".<br>'
        + 'Understand "'
        + person.firstName
        + " "
        + person.lastName
        + '" and "'
        + person.firstName
        + '" as ComplexNPC'
        + person.index
        + '. <br>'
        + 'The description is '
        + parse(person,formDescription(person))
        + ".<br>"
        + 'The quizzing table is the Table of ComplexNPC'
        + person.index
        + ' Answers.<br>'
        + 'The informing table is the Table of ComplexNPC'
        + person.index
        + ' Remarks.<br>'
        + 'The unknown quizzing rule is the ComplexNPC'
        + person.index
        + ' default-quiz-response rule. <br>'
        + 'The unknown informing rule is the ComplexNPC'
        + person.index
        + ' default-inform-response rule. <br>'
        + 'This is the ComplexNPC'
        + person.index
        + ' default-quiz-response rule: <br>'
        + 'show the next response from the Table of ComplexNPC'
        + person.index
        + ' Default Quiz Responses. <br>'
        + 'This is the ComplexNPC'
        + person.index
        + ' default-inform-response rule: <br>'
        + 'show the next response from the Table of ComplexNPC'
        + person.index
        + ' Default Inform Responses. <br>'
        + '<br>Table of ComplexNPC'
        + person.index
        + ' Remarks<br>'
        + 'subject&Tab;response rule&Tab;response&Tab;table&Tab;suggest<br>'
        + 'ComplexNPC'
        + person.index
        + '&Tab;ComplexNPC'
        + person.index
        + ' tell-self rule&Tab;--&Tab;-1<br><br>'
        + 'Table of ComplexNPC'
        + person.index
        + ' Default Quiz Responses<br>'
        + 'response<br>'
        + '"The traveller looks annoyed by your question, for some reason, and declines to answer."<br><br>'
        + 'This is the ComplexNPC'
        + person.index
        + ' ask-self rule:<br>'
        + 'say "I am feeling '
        + person.mood
        + ' today, thanks for asking."<br>'
        + 'This is the ComplexNPC'
        + person.index
        + ' tell-self rule:<br>'
        + 'say "I know about myself already."<br>'
        + formSubjects(person)
        + "<br>"
        + '<br>'
        + 'After saying hello to ComplexNPC'
        + person.index
        + ' :<br>'
        + 'say "' + addGreeting(person)+'";<br>'// addGreeting
        + 'if the greeting type is explicit, follow the standard list suggested topics rule.<br>'
        + 'After saying goodbye to ComplexNPC' + person.index
        + ' when the farewell type is explicit:<br>' + 'say "Farewell".<br>';
    }
    inform += 'NPCAgency ends here.';
    return inform
    
};
var addFirstGreeting =
function(person) {
    return DB.greetings[Math.floor(Math.random() * DB.greetings.length)]
    + " I'm "+ person.firstName + " " + person.lastName + ". " + DB.greetings2[Math.floor(Math.random() * DB.greetings2.length)];
};
var addGreeting =
function(person) {
    var first = DB.greetings[Math.floor(Math.random() * DB.greetings.length)];
    if(first != null){
        var point = ". "
    }else{
        var point = ""
    }
    return first + point
    + DB.greetings2[Math.floor(Math.random() * DB.greetings2.length)];
};
var cleanPrintEvents =
function(person) {
    var str = "<br>"
    for (item in person.timeline) {
        str +=
        person.timeline[item]["era"] + ": " + person.timeline[item]["event"]
        + "<br>"
    }
    return str
};
var formSubjects =
function(person) {
    var ageIndex = DB.ages.indexOf(person.age)
    var child = [], adole = [], yngAd = [], midAd = [], elder = [];
    for (event in person.timeline) {
        if (person.timeline[event]["era"] == "Child") {
            child.push(person.timeline[event])
        } else if (person.timeline[event]["era"] == "Adolescent") {
            adole.push(person.timeline[event])
        } else if (person.timeline[event]["era"] == "Young Adult") {
            yngAd.push(person.timeline[event])
        } else if (person.timeline[event]["era"] == "Mid-Adult") {
            midAd.push(person.timeline[event])
        } else if (person.timeline[event]["era"] == "Elder") {
            elder.push(person.timeline[event])
        }
    }
    others = ""
    start = "Table of ComplexNPC" + person.index + " ";
    inform =
    '<br><br>Table of ComplexNPC' + person.index + ' Default Inform Responses<br>'
    + 'response<br>' + '"Sounds Interesting."<br><br>'
    if (person.job && person.job != "[Random]") {
        inform += '<br>Table of ComplexNPC'
        + person.index + ' job<br>' + 'response<br>'
        + parse(person, '"I am a {get() job}."<br>')
    }
    if (people.length > 1) {
        inform += '<br><br>Table of ComplexNPC'
        + person.index + ' others<br>' + 'response<br>' + fillOthers(person)
        + '"That is about it."<br>'
    }
    /*
     * if(person.plot) { inform +='<br>plot is a familiar subject.<br>' + '<br>Table
     * of ComplexNPC' + person.index + ' plot<br>' + 'response<br>' +
     * fillPlotLines(person) + '<br>' }
     */
    /*
     * inform += '<br>life is a familiar subject.<br>' + '<br>Table of
     * ComplexNPC' + person.index + ' life<br>' + 'response<br>' + '"You can
     * ask me about different times in my life.[convnode CNPC0-life-node]"<br>'
     */
    inform +='<br><br>Table of ComplexNPC'
    + person.index + ' home<br>' + 'response<br>' + '"I am from '
    + DB["cities"][Math.floor(Math.random() * DB["cities"].length)]
    + person.region + '"<br>'
    inform +=
    '"I was born in '
    + (280 - Math.floor(Math.random() * (DB.ages.indexOf(person.age) + 1) * 15))
    + ' to a ' + person.social + ' family."<br>';
    if (person.region != "North of the Wall") {
        inform +=
        '"I live in the lands of the ' + person.house.rank + ' House '
        + person.house.name + '"<br>'
        inform += '"Our sigil is ' + person.house.sigil + '"<br>'
    }
    inform += '"' + DB.regionLines[person.region] + '[quiz home to -1]"<br>'
    inform += '<br>Table of ComplexNPC'
    + person.index + ' childhood<br>' + 'response<br>'
    for (event in child) {
        inform += '"' + parse(person, child[event]["line"]) + '"<br>'
    }
    if (child.length > 0) 
        inform += '"That is about it."<br>'
    if (adole.length > 0) {
        inform +='<br><br>Table of ComplexNPC' + person.index + ' adolescence<br>'
        + 'response<br>'
        others += " adolscence"
    }
    for (event in adole) {
        inform += '"' + parse(person, adole[event]["line"]) + '"<br>'
    }
    if (adole.length > 0) 
        inform += '"That is about it."<br>'
    if (yngAd.length > 0) {
        person.hobby =
        DB["hobbies"][Math.floor(Math.random() * DB["hobbies"].length)]
        inform += '<br><br>Table of ComplexNPC' + person.index + ' young adulthood<br>'
        + 'response<br>' + '"I became interested in ' + person.hobby + '."<br>'
        others += " young adulthood"
    }
    for (event in yngAd) {
        inform += '"' + parse(person, yngAd[event]["line"]) + '"<br>'
    }
    if (yngAd.length > 0) 
        inform += '"That is about it."<br>'
    if (midAd.length > 0) {
        inform += '<br><br>Table of ComplexNPC'
        + person.index + ' mid-life<br>' + 'response<br>'
        others += " mid-life"
    }
    for (event in midAd) {
        inform += '"' + parse(person, midAd[event]["line"]) + '"<br>'
    }
    if (midAd.length > 0) 
        inform += '"That is about it."<br>'
    if (elder.length > 0) {
        inform += '<br><br>Table of ComplexNPC' + person.index + ' elder years<br>'
        + 'response<br>'
        others += " elder years"
    }
    for (event in elder) {
        inform += '"' + parse(person, elder[event]["line"]) + '"<br>'
    }
    if (elder.length > 0) 
        inform += '"That is about it."<br>'
    /* console.log("PLOT" +person.plot.nodes[0]) */
    /*
     * for(node in person.plot.nodes){ if(person.plot.nodes[node]) { inform+=
     * buildNode(person, person.plot.nodes[node]) } }
     */

    /*
     * if(person.plot){ inform+= 'plot&Tab;--&Tab;Table of ComplexNPC' +
     * person.index+ ' plot&Tab;9<br>' }
     * 
     * inform+= 'life&Tab;--&Tab;Table of ComplexNPC' + person.index + '
     * life&Tab;9<br>'
     */
    
    
        /*
         * inform += '<br>The CNPC' + person.index + '-life-node-r is a
         * rulebook.' + 'The CNPC' + person.index + '-life-node is a
         * Conversation Node. The suggestions are "Do you want to know about my
         * childhood ' + others + ' or are you asking in general?" The node rule
         * is the CNPC' + person.index + '-life-node-r rules.' + 'Understand
         * "childhood" as "['+person.index +'childx]".<br>' inform
         * +=person.index +'spcing is an action applying to nothing.' + 'Check
         * '+person.index +'spcing when the current convnode is not the
         * null-node (this is the Special Topic '+person.index +' rule):'+
         * "abide by the node rule of the current convnode." inform +=
         * 'Understand "['+person.index +'childx]" as '+person.index +'spcing
         * when the current convnode is the CNPC' + person.index + '-life-node.<br>'
         * if (adole.length > 0) inform += 'Understand "adolescence" as
         * "['+person.index +'adolex]".<br> ' + 'Understand "['+person.index
         * +'adolex]" as '+person.index +'spcing when the cur`rent convnode is
         * the CNPC' + person.index + '-life-node.' if (yngAd.length > 0) inform +=
         * 'Understand "young adult" as "['+person.index +'yngAdx]". <br>' +
         * 'Understand "['+person.index +'yngAdx]" as '+person.index +'spcing
         * when the current convnode is the CNPC' + person.index + '-life-node.<br>'
         * if (midAd.length > 0) inform += 'Understand "middle adulthood" as
         * "['+person.index +'midAdx]". <br>' + 'Understand "['+person.index
         * +'midAdx]" as '+person.index +'spcing when the current convnode is
         * the CNPC' + person.index + '-life-node.<br>' if (elder.length > 0)
         * inform += 'Understand "ancient" as "['+person.index +'elderx]". <br>' +
         * 'Understand "['+person.index +'elderx]" as '+person.index +'spcing
         * when the current convnode is the CNPC' + person.index + '-life-node.<br>'
         * inform += '<br>A CNPC' + person.index + "-life-node-r rule when
         * "+person.index +"spcing:<br>" + "if the player's command " +
         * 'matches "['+person.index +'childx]" begin;<br>' + 'show the next
         * response from the Table of ComplexNPC' + person.index + ' childhood;<br>' +
         * 'say "[convnode null-node]";<br>' + 'rule succeeds;<br>' if
         * (adole.length > 0) { inform += 'end if;<br>' + "if the player's
         * command matches " + '"['+person.index +'adolex]" begin;<br>' +
         * 'show the next response from the Table of ComplexNPC' + person.index + '
         * adolescence;<br>' + 'say "[convnode null-node]";<br>' + 'rule
         * succeeds;<br>' } if (yngAd.length > 0) { inform += 'end if;<br>' +
         * "if the player's command matches " + '"['+person.index +'yngADx]"
         * begin;<br>' + 'show the next response from the Table of ComplexNPC' +
         * person.index + ' young adulthood;<br>' + 'say "[convnode
         * null-node]";<br>' + 'rule succeeds;<br>' } if (midAd.length > 0) {
         * inform += 'end if;<br>' + "if the player's command matches" + '
         * "['+person.index +'midADx]" begin;<br>' + 'show the next response
         * from the Table of ComplexNPC' + person.index + ' mid-life;<br>' +
         * 'say "[convnode null-node]";<br>' + 'rule succeeds;<br>' } if
         * (elder.length > 0) { inform += 'end if;' + "if the player's command
         * matches " + '"['+person.index +'elderx]" begin;<br>' + 'show the
         * next response from the Table of ComplexNPC' + person.index + ' elder
         * years;<br>' + 'say "[convnode null-node]";<br>' + 'rule succeeds;<br>' }
         * person.mood = DB.moods[Math.floor(Math.random() * DB.moods.length)]
         * inform += 'end if.<br>' + 'The last CNPC' + person.index +
         * '-life-node-r rule:<br>' + 'say "In general? I would say I feel ' +
         * person.mood + '";<br>' + 'rule succeeds.<br>'
         */
    return inform;
}
var buildNode =
function(person, node) {
    //console.log("NODE" + node.name)
    nodeName = "ComplexNPC" + person.index + node.name
    inform =
    "<br>The " + nodeName + "-r is a rulebook. The " + nodeName
    + " is a Conversation Node. " + 'The suggestions are "' + node.suggestion
    + '". ' + "The node rule is the " + nodeName + "-r rules. "
    for (sub in node.understand)
        for (word in node.understand[sub]) {
            for (syn in node.understand[sub][word])
                inform +=
                'Understand "' + node.understand[sub][word][syn] + '" as "'
                + word + '". <br>'
            inform +=
            'Understand "' + word
            + '" as Xspcing when the current convnode is the ' + nodeName
            + ". <br>"
            inform +=
            'A ' + nodeName + '-r rule when Xspcing:<br>'
            + "if the player's command matches " + '"' + word + '" begin;<br> '
            + "show the next response from the Table of ComplexNPC"
            + person.index + " " + word.substring(1, word.length - 1)
            + "; <br> " + 'say "[convnode null-node]";<br> '
            + 'rule succeeds;<br> ' + 'end if. <br><br>'
            inform +=
            'Table of Table Types (continued)<br>'
            + 'tabname&Tab;index&Tab;tabtype<br>' + 'Table of ComplexNPC'
            + person.index + ' ax&Tab;0&Tab;stop-list<br>'
            + 'Table of ComplexNPC' + person.index
            + ' bx&Tab;0&Tab;stop-list<br><br>'
            inform +=
            word.substring(1, word.length - 1) + ' is a subject.<br>'
            + '<br>Table of ComplexNPC' + person.index + " "
            + word.substring(1, word.length - 1) + ' <br>' + 'response<br>'
            for (line in DB.subjects[word.substring(1, word.length - 1)])
                inform +=
                '"'
                + parse(person,
                DB.subjects[word.substring(1, word.length - 1)][line])
                + '"<br>'
            inform += "<br><br>"
        }
    inform +=
    "The last " + nodeName + "-r rule: " + 'say "That was not'
    + node.suggestion + '"; ' + "rule succeeds. "
    return inform
};
var parse =
function(person, line) {
    //console.log("Parse " + line)
    var regex = /{.+?}/, repl = ""
    var group = regex.exec(line);
    if (group != null) {
        method = group[0].split(' ')
        if (method[0] == "{rand()") {
            repl =
            str(random.randrange(int(method[1]), int(method[2].slice(0, -1))))
        }
        if (method[0] == "{get()") {
            method.shift()
            code = "person"
            method[method.length - 1] = method[method.length - 1].slice(0, -1)
            for (word in method) {
                code += '["' + method[word] + '"]'
            }
            //console.log("Parse get code " + code)
            repl = eval(code)
            //console.log("Parse get replacement " + repl)
        }
        line = line.replace(regex, repl)
    }
    //console.log("Parse End" + line)
    return line;
};

var fillOthers =
function(person, all, ix) {
    var iz = 0;
    var str = ""
    var info = ""
    usedTraits = []
    for (per in all) {
        if (all[per].index != person.index) {
            if(all[per].aCommunity == person.aCommunity){
                person.dialog[ix].line.push({
                    "name": all[per].firstName,
                    "line": new Array(),
                })
                info = all[per].firstName + " is a " + all[per].job + " from " +all[per].city
                person.dialog[ix].line[iz].line.push(info)
                
                if(all[per].age == "adult" || all[per].age == "adolescent"){
                    info = all[per].firstName + " is an " + all[per].age
                }else if(all[per].age == "elder"){
                    info = all[per].firstName + " is an " + all[per].age + " person"
                }else if(all[per].age == "mid-life"){
                    info = all[per].firstName + " is a " + all[per].age + " person"
                }else{
                    info = all[per].firstName + " is a " + all[per].age
                }
                person.dialog[ix].line[iz].line.push(info)
                
                info = all[per].firstName + " is a " + all[per].gender
                person.dialog[ix].line[iz].line.push(info)
                
                for (i = 0; i < 15; i++) {
                    keys = Object.keys(all[per])
                    randKey = keys[Math.floor(Math.random() * keys.length)]
                    var trait = all[per][randKey]
                    //console.log("TTT:" + randKey + trait)
                    if (DB.physicalTraits.indexOf(randKey) > -1) {
                        if (usedTraits.indexOf(randKey) == -1) {
                            var not =
                            (trait > 75) ? "" : (trait < 25) ? "not "
                            : "somewhat "
                            str = all[per].firstName + " is " + not + randKey
                            usedTraits.push(randKey)
                            person.dialog[ix].line[iz].line.push(str)
                            
                            
                        }
                    }
                }
                iz++
            }
        }
        usedTraits = []
        
    }
    
    //return str
};

/* original for inform
var fillOthers =
function(person, people) {
    var str = ""
    usedTraits = []
    for (per in people) {
        if (people[per].index != person.index) {
            for (i = 0; i < 3; i++) {
                keys = Object.keys(people[per])
                randKey = keys[Math.floor(Math.random() * keys.length)]
                var trait = people[per][randKey]
                //console.log("TTT:" + randKey + trait)
                if (DB.mentalTraits.indexOf(randKey) > -1) {
                    if (usedTraits.indexOf(randKey) == -1) {
                        var not =
                        (trait > 75) ? "" : (trait < 25) ? "not "
                        : "somewhat "
                        str +=
                        '"' + people[per].firstName + " is " + not + randKey
                        + '"<br>'
                        usedTraits.push(randKey)
                    }
                }
            }
        }
        usedTraits = []
    }
    return str
};*/
var fillPlot =
function() {
    startP = people[0]
    //console.log(people.length)
    if (people.length == 1) {
        //console.log("solot")
        startP.plot =
        DB["solo-plots"][Math.floor(Math.random() * DB["solo-plots"].length)]
    } else {
        //console.log("multiplot" + people[1])
        startP.plot =
        DB["multi-plots"][Math.floor(Math.random() * DB["multi-plots"].length)]
        otherP = people[1]
        otherP.plot = startP.plot.other
    }
};
var fillPlotLines = function(person) {
    inform = ""
    for (line in person.plot.lines) {
        parseLine = parse(person, person.plot.lines[line])
        inform += '"' + parseLine + '"<br>'
    }
    return inform
};
var formDescription =
function(person) {
    str =
    "This person is wearing " + DB.clothes[person.job] + " "
    + DB.clothes[person.social] + " ";
    for (val in person) {
        if (DB.physicalTraits.indexOf(val) > -1) {
            if (val == "variance") {
                continue;
            }
            if (person[val] > 75) {
                str += "This person is " + val + ". "
            }
            if (person[val] < 25) {
                str += "This person is not " + val + ". "
            }
        }
    }
    return '"' + str + '"'
};

formObj()
var filename = ""
// Load a JSON document
var setNpcTraits = function(region){
    person = {  
   "people":[  
      {  
         "age":"[Random]",
         "job":"[Random]",
         "region":region,
         "social":"[Random]",
         "variance":"50",
         "large":"50",
         "tall":"50",
         "hairy":"50",
         "sick":"50",
         "dirty":"50",
         "agile":"50",
         "muscular":"50",
         "beautiful":"50",
         "hair color":"[Random]",
         "eye color":"[Random]",
         "injury":"[Random]",
         "perceptive":"50",
         "creative":"50",
         "intelligent":"50",
         "organized":"50",
         "diligent":"50",
         "reliable":"50",
         "energetic":"50",
         "assertive":"50",
         "popular":"50",
         "gentle":"50",
         "trusting":"50",
         "generous":"50",
         "content":"50",
         "emotional":"50",
         "brave":"50",
         "childTone":"[Random]",
         "adoleTone":"[Random]",
         "yngAdTone":"[Random]",
         "midAdTone":"[Random]",
         "elderTone":"[Random]"
      }
   ]
}
    generateNpc(person);
}

var regionCount = 0;

var generateNpc = function(values){
    people = values["people"]
            for (idx in people) {
                person = people[idx]
                applyVariance(person)
                person.index = perIdx
                perIdx++
                person.plot = []
                if (person.gender == null) {
                    person.gender =
                    DB.gender[Math.floor(Math.random() * DB.gender.length)]
                }
                if (person.firstName == null)
                    if (person.gender == "male") {
                        person.firstName =
                        DB.names.male[Math.floor(Math.random()
                        * DB.names.male.length)]
                    } else {
                        person.firstName =
                        DB.names.female[Math.floor(Math.random()
                        * DB.names.female.length)]
                    }
                if (person.lastName == null)
                    person.lastName =
                    DB.names.last[Math.floor(Math.random()
                    * DB.names.last.length)]
                if (person.age == "[Random]")
                    person.age =
                    DB.ages[Math.floor(Math.random() * DB.ages.length)]
                //console.log(person)
                person.marriage = "none"
                person.timeline = []
                addEvents(person);
                eventStr = cleanPrintEvents(person)
            }
            $('#res').html(
            '<p>Hello '
            + person.firstName
            + " "
            + person.lastName
            + ", "
            + person.age
            + " "
            + person.social
            + " "
            + person.gender
            + " "
            + ((["Young Adult", "Middle-age Adult", "Elder"]
            .indexOf(person.age) > -1) ? person.job : "person") + " from "
            + person.region + "<br>Timeline: " + eventStr + '</p>');
            // fillPlot();
            $("#inform").html(printInform(people))
    
    
    var city = DB["cities2"][Math.floor(Math.random() * DB["cities2"].length)]
    person.city = city + person.region
    if(this.oldRegion == null || this.oldRegion == person.region){
        person.regNo = regionCount;
    }else if(this.oldRegion != null && this.oldRegion != person.region){
        regionCount++;
        person.regNo = regionCount;
    }
    allPersons.push(person);
    this.oldRegion = person.region;
        
}


var createGroups = function(){

    
    //housemates
    for(ix = 0; ix < allPersons.length - 1; ix++){
        var treffer = 0;
        this.houseName1 = allPersons[ix].house.name;
        this.length = allPersons.length - ix;
        for(iy = 1; iy < this.length; iy++){
            this.houseName2 = allPersons[ix + iy].house.name;
            if(this.houseName1 == this.houseName2){
                treffer++;
                if(allPersons[ix].aHousemateIndex == null){
                    allPersons[ix].aHousemateIndex = [];
                }
                if(allPersons[ix + iy].aHousemateIndex == null){
                    allPersons[ix + iy].aHousemateIndex = [];
                }
                if(allPersons[ix].aHousemateIndex.length > 0){
                    for(iz in allPersons[ix].aHousemateIndex){
                    this.mate = allPersons[ix].aHousemateIndex[iz];
                    if(this.mate == ix + iy){
                        break;
                    }else if(iz == allPersons[ix].aHousemateIndex.length - 1){
                        allPersons[ix].aHousemateIndex.push(ix + iy);
                    }
                    }
                }else{
                    allPersons[ix].aHousemateIndex.push(ix + iy);
                }
                if(allPersons[ix + iy].aHousemateIndex.length > 0){
                    for(io in allPersons[ix + iy].aHousemateIndex){
                    this.mate = allPersons[ix + iy].aHousemateIndex[io];
                    if(this.mate == ix){
                        break;
                    }else if(io == allPersons[ix + iy].aHousemateIndex.length - 1){
                        allPersons[ix + iy].aHousemateIndex.push(ix);
                    }
                    }
                }else{
                    allPersons[ix + iy].aHousemateIndex.push(ix);
                }
                
            }
        }
    }
    
    //community
    for(var idx in allPersons){
        /*
        if(allPersons[idx].region == "The Reach"){this.region = "Reach"} 
        else if(allPersons[idx].region == "The Westerlands"){this.region = "Westerlands"}
        else if(allPersons[idx].region == "The North"){this.region = "North"}
        else if(allPersons[idx].region == "The Riverlands"){this.region = "Riverlands"}
        else if(allPersons[idx].region == "The Vale of Arryn"){this.region = "Vale"}
        else if(allPersons[idx].region == "The Stormlands"){this.region = "Stormlands"}
        else if(allPersons[idx].region == "The Crownlands"){this.region = "Crownlands"}
        else if(allPersons[idx].region == "The Iron Islands"){this.region = "Iron"}
        else if(allPersons[idx].region == "Dorne"){this.region = "Dorne"}
        
        if(allPersons[idx].age == "Young Adult"){this.age = "Youngadult"}
        else if(allPersons[idx].age == "Mid-life"){this.age = "Midlife"}
        else{this.age = allPersons[idx].age}
        
        
        if(allPersons[idx].social == "poor"){this.social = "Poor"}
        else if(allPersons[idx].social == "commoner"){this.social = "Commoner"}
        else if(allPersons[idx].social == "rich"){this.social = "Rich"}
        else if(allPersons[idx].social == "noble"){this.social = "Noble"}
        */
        
        //Community region abhängig von menge an regionen
        /*
        if(allPersons.length <= 30){
            if(allPersons[idx].region == "The North" || allPersons[idx].region == "The Riverlands" || allPersons[idx].region == "The Vale of Arryn" || allPersons[idx].region == "The Crownlands"){
                this.region = "north"
            }else{
                this.region = "south"
            }
        }else if(allPersons.length > 30 && allPersons.length <=80){
            if(allPersons[idx].region == "The North" || allPersons[idx].region == "The Riverlands" || allPersons[idx].region == "The Vale of Arryn"){
                this.region = "north"
            }else if(allPersons[idx].region == "The Westerlands" || allPersons[idx].region == "The Crownlands" || allPersons[idx].region == "The Iron Islands"){
                this.region = "mid"
            }else{
                this.region = "south"
            }
        }else{
            this.region = allPersons[idx].region
        }
        */
        this.region = allPersons[idx].region
        
        if(allPersons[idx].age == "child" || allPersons[idx].age == "adolescent"){
            this.age = "young";
        }else{
            this.age = "old";
        }
        
        //for short or tall sprite
        allPersons[idx].sprite = this.age;
        
        if(allPersons[idx].social == "commoner" || allPersons[idx].social == "rich"){
            this.social = "normal";
        }else{
            this.social = allPersons[idx].social;
        }
        
        allPersons[idx].aCommunity = this.region + "|" +  this.age + "|" + this.social;
    }
    
    //counts communitys
    this.coms = [];
    for
        (var idxa = 0; idxa < allPersons.length - 1; idxa++){
        this.Community1 = allPersons[idxa].aCommunity;
        for(var idxb = 1; idxb < allPersons.length - idxa; idxb++){
            this.thisCommunity2 = allPersons[idxa + idxb].aCommunity;
            if(this.Community1 == this.thisCommunity2){
                for(var idxc = 0; idxc <= this.coms.length; idxc++){                    
                    if(this.coms[idxc] == this.Community1){ 
                        break;
                    }else if(idxc == this.coms.length){
                        this.coms.push(this.Community1)
                        break;
                    }
                }
            }
        }
    }

    console.log(allPersons);
    generateDialogs();
}

var generateDialogs = function(){
    for(var idxd in allPersons){
        var ix = 0;
        person = allPersons[idxd]
        
        
        //removing useless person timelines. like elder if person is adult
        var age = person.age
        if(age == "child"){
            age = 0;
        }else if(age == "adolescent"){
            age = 1;
        }else if(age == "young adult"){
            age = 2;
        }else if(age == "mid-life"){
            age = 3;
        }else{
            age = 4;
        }
        for(var idy = 0; idy < person.timeline.length; idy++){
            var era = person.timeline[idy].era
            if(era == "Child"){
            era = 0;
            }else if(era == "Adolescent"){
                era = 1;
            }else if(era == "Young Adult"){
                era = 2;
            }else if(era == "Mid-Adult"){
                era = 3;
            }else{
                era = 4;
            }
            if(era > age){

                person.timeline.splice(idy, 1)
                idy--;
                
            }
        }
        
        
        
        person.dialog = [];
        
        person.dialog.push({
            "ask": "first greeting",
            "line": addFirstGreeting(person),
        })
        ix++ 
        
        person.dialog.push({
            "ask": "greeting",
            "line": addGreeting(person),
        })
        ix++
        
        if(person.gender == "male"){
            var itself = "himself";
        }else{
            var itself = "herself";
        }
        person.dialog.push({
            "ask": itself,
            "line": "I am feeling " + DB.moods[Math.floor(Math.random() * DB.moods.length)] + " today, thanks for asking",
        })
        ix++
        
        person.dialog.push({
            "ask": "home",
            "line": new Array(),
            /*"I am from " + DB["cities"][Math.floor(Math.random() * DB["cities"].length)] + person.region;
                    "I was born in " + (280 - Math.floor(Math.random() * (DB.ages.indexOf(person.age) + 1) * 15)) + " to a " + person.social + " family."*/
        }) 
        person.dialog[ix].line.push("I am from " + DB["cities"][Math.floor(Math.random() * DB["cities"].length)] + person.region)
        person.dialog[ix].line.push("I was born in " + (280 - Math.floor(Math.random() * (DB.ages.indexOf(person.age) + 1) * 15)) + " to a " + person.social + " family.")
        if(person.regin != "North of the Wall"){
            person.dialog[ix].line.push("I live in the lands of the " + person.house.rank + " House " + person.house.name)
            
            person.dialog[ix].line.push("Our sigil is " + person.house.sigil)
        }
        person.dialog[ix].line.push(DB.regionLines[person.region])
        ix++
        
        person.dialog.push({
            ask: "job",
            line: "I am a " + person.job,
        })
        ix++
        
        var ageIndex = DB.ages.indexOf(person.age)
        var child = [], adole = [], yngAd = [], midAd = [], elder = [];
        for (event in person.timeline) {
            if (person.timeline[event]["era"] == "Child") {
                child.push(person.timeline[event])
            } else if (person.timeline[event]["era"] == "Adolescent") {
                adole.push(person.timeline[event])
            } else if (person.timeline[event]["era"] == "Young Adult") {
                yngAd.push(person.timeline[event])
            } else if (person.timeline[event]["era"] == "Mid-Adult") {
                midAd.push(person.timeline[event])
            } else if (person.timeline[event]["era"] == "Elder") {
                elder.push(person.timeline[event])
            }
        }
        
        if(child.length > 0){
            person.dialog.push({
                "ask": "childhood",
                "line": new Array(),
            })
            for (event in child) {
                person.dialog[ix].line.push(parse(person, child[event]["line"]))
            }
           /* if (child.length > 0){
                person.dialog[ix].line.push("That is about it")
            }*/
            ix++
        }
        
        if(adole.length > 0){
            person.dialog.push({
            "ask": "adolscene",
            "line": new Array(),
            })
            for (event in adole) {
                person.dialog[ix].line.push(parse(person, adole[event]["line"]))
            }
          /*  if (adole.length > 0){
                person.dialog[ix].line.push("That is about it")
            }*/
            ix++
        }
        
        if(yngAd.length > 0){
            person.dialog.push({
            "ask": "young adulthood",
            "line": new Array(),
            })
            person.hobby = DB["hobbies"][Math.floor(Math.random() * DB["hobbies"].length)]
            person.dialog[ix].line.push("I became interested in " + person.hobby)
            for (event in yngAd) {
                person.dialog[ix].line.push(parse(person, yngAd[event]["line"]))
            }
          /*  if (yngAd.length > 0){
                person.dialog[ix].line.push("That is about it")
            }*/
            ix++
        }
        
        if(midAd.length > 0){
            person.dialog.push({
            "ask": "mid-life",
            "line": new Array(),
            })
            for (event in midAd) {
                person.dialog[ix].line.push(parse(person, midAd[event]["line"]))
            }
         /*   if (midAd.length > 0){
                person.dialog[ix].line.push("That is about it")
            }*/
            ix++
        }
        
        if(elder.length > 0){
            person.dialog.push({
            "ask": "elder years",
            "line": new Array(),
            })
            for (event in elder) {
                person.dialog[ix].line.push(parse(person, elder[event]["line"]))
            }
          /*  if (elder.length > 0){
                person.dialog[ix].line.push("That is about it")
            }*/
            ix++
        }
        
        
        if(allPersons.length > 1){
            person.dialog.push({
                ask: "others",
                line: new Array(),
            })
            fillOthers(person, allPersons, ix)
            ix++
        }
        
        
        person.dialog.push({
            ask: "yourself",
            line: new Array(),
        })
        fillYourself(person, ix)
        ix++

        /*
        person.dialog.push({
            "ask": bla,
            "line": bla,
        })
        person.dialog.push({
            "ask": bla,
            "line": bla,
        })
        */
    }
}

var fillYourself = function(person, ix){
    person.trait = []
    var muchArr = ["I am not ", "I am not quite ", "I am barely creative ", "I am ", "I am well ", "I am moderate ", "I am super ", "I am magnificent ", "I am outstanding "]
    var traArr = ["not ", "not quite ", "barely  ", "", "well ", "moderate ", "super ", "magnificent ", "outstanding "]
    var creative = person.creative;
    if(creative < 33){
        var rnd = Math.floor((Math.random() * 2) + 0);
        creative = muchArr[rnd] + "creative";
        person.trait.push(traArr[rnd] + "creative");
        }else if(creative > 32 && creative < 66){
            var rnd = Math.floor((Math.random() * 2) + 0);
            creative = muchArr[rnd + 3] + "creative";
            person.trait.push(traArr[rnd + 3] + "creative");
        }else{
            var rnd = Math.floor((Math.random() * 2) + 0);
            creative = muchArr[rnd + 6] + "creative";
            person.trait.push(traArr[rnd + 6] + "creative");
        }
    person.dialog[ix].line.push(creative)
    
    var diligent = person.diligent;
    if(diligent < 33){
        var rnd = Math.floor((Math.random() * 2) + 0);
        diligent = muchArr[rnd] + "diligent";
        person.trait.push(traArr[rnd] + "diligent");
        }else if(diligent > 32 && diligent < 66){
            var rnd = Math.floor((Math.random() * 2) + 0);
            diligent = muchArr[rnd + 3] + "diligent";
            person.trait.push(traArr[rnd + 3] + "diligent");
        }else{
            var rnd = Math.floor((Math.random() * 2) + 0);
            diligent = muchArr[rnd + 6] + "diligent";
            person.trait.push(traArr[rnd + 6] + "diligent");
        }
    person.dialog[ix].line.push(diligent)
    
    var reliable = person.reliable;
    if(reliable < 33){
        var rnd = Math.floor((Math.random() * 2) + 0);
        reliable = muchArr[rnd] + "reliable";
        person.trait.push(traArr[rnd] + "reliable");
        }else if(reliable > 32 && reliable < 66){
            var rnd = Math.floor((Math.random() * 2) + 0);
            reliable = muchArr[rnd + 3] + "reliable";
            person.trait.push(traArr[rnd + 3] + "reliable");
        }else{
            var rnd = Math.floor((Math.random() * 2) + 0);
            reliable = muchArr[rnd + 6] + "reliable";
            person.trait.push(traArr[rnd + 6] + "reliable");
        }
    person.dialog[ix].line.push(reliable)
    
    var organized = person.organized;
    if(organized < 33){
        var rnd = Math.floor((Math.random() * 2) + 0);
        organized = muchArr[rnd] + "organized";
        person.trait.push(traArr[rnd] + "organized");
        }else if(organized > 32 && organized < 66){
            var rnd = Math.floor((Math.random() * 2) + 0);
            organized = muchArr[rnd + 3] + "organized";
            person.trait.push(traArr[rnd + 3] + "organized");
        }else{
            var rnd = Math.floor((Math.random() * 2) + 0);
            organized = muchArr[rnd + 6] + "organized";
            person.trait.push(traArr[rnd + 6] + "organized");
        }
    person.dialog[ix].line.push(organized)
    
    var trusting = person.trusting;
    if(trusting < 33){
        var rnd = Math.floor((Math.random() * 2) + 0);
        trusting = muchArr[rnd] + "trusting";
        person.trait.push(traArr[rnd] + "trusting");
        }else if(trusting > 32 && trusting < 66){
            var rnd = Math.floor((Math.random() * 2) + 0);
            trusting = muchArr[rnd + 3] + "trusting";
            person.trait.push(traArr[rnd + 3] + "trusting");
        }else{
            var rnd = Math.floor((Math.random() * 2) + 0);
            trusting = muchArr[rnd + 6] + "trusting";
            person.trait.push(traArr[rnd + 6] + "trusting");
        }
    person.dialog[ix].line.push(trusting)
    
    var hobby = person.hobby + " is my hobby"
    person.trait.push("hobby: " + person.hobby);
    person.dialog[ix].line.push(hobby)
    
    person.traitInfo = [];
    person.kinBool = false;
}
/*
            person.timeline.push({
                "event":"More " + eff,
                "era":pick.era,
                "line":"I became more " + eff + " in my "
                + pick.era.toLowerCase() + " years."})
                */
/*
FileReaderJS.setupInput(document.getElementById('loadDocument'), {
    readAsDefault:'Text', on:{load:function(event, file) {
        json = event.target.result
        person = JSON && JSON.parse(json) || $.parseJSON(json);
        formObj();
    }}});
// Save a JSON document
/*
document.getElementById('saveDocument').onclick = function() {
    var json = JSON.stringify(people)
    var blob = new Blob([json], {type:'application/json;charset=utf-8'});
    if (filename) {
        saveAs(blob, filename);
    } else {
        saveAs(blob, 'document.json');
    }
};
document.getElementById('saveInform').onclick = function() {
    var inform = $('#inform').html().replace(/<br\s*\/?>/ig, "\r\n")
    if (inform.length <= 0) return



    var blob = new Blob([inform], {type:'text/plain;charset=utf-8'});
    if (filename) {
        saveAs(blob, filename);
    } else {
        saveAs(blob, 'document.i7x');
    }
};
*/