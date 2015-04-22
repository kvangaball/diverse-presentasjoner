var kategori = {
    identitet: {
        id: "Identifikasjon",
        farge: "#123524",
        pri: 1
    },
    kommunikasjon: {
        id: "Sikker kommunikasjon",
        forklaring: "Kunne kommunisere sammen uten at man kan bli avlyttet eller at meldingene kan bli forandret på",
        farge: "#555555",
        pri: 2
    },
    beskyttelse: {
        id: "Beskyttelse",
        forklaring: "Beskytte ting og tang mot folk som ikke har tilgang, eller som ønsker å gjøre ting som er farlig eller skadelig",
        farge: "#483C32",
        pri: 4
    },
    internett: {
        id: "Internett er vanskelig",
        forklaring: "Fordi hele verden er der, så er internett ekstra vanskelig",
        farge: "#191970",
        pri: 5
    },
    flyogslikt: {
        id: "Fly er spesielt",
        forklaring: "Fly flyr og derfor er det forskjellig fra buss",
        farge: "#8c00e1",
        pri: 2
    }
}

var rants = [
    {
        navn: "Brukernavn og passord",
        rant: "Jeg husker ikke passordet mitt",
        kategori: kategori.identitet,
        problem: "Jeg må være sikker på at du er du",
        losning: "Et navn og en delt hemmelighet",
        issues: [
        "Passordet må være langt for å være bra",
        "Dårlige passord kan gjettes",
        "Mindre dårlige passord kan knekkes",
        "Passordene gjenbrukes over alt",
        "Passorddatabaser blir jevnlig hacket"],
        bottomline: "Funker brukbart om du stoler på brukerne dine, og ikke trenger enormt høy sikkerhet",
        terningkast: 4
    },
    {
        navn: "2 - faktor autentisering",
        kategori: kategori.identitet,
        rant: "Yikes. Noen har hacka gmailen og facebooken min",
        problem: "Brukernavn + Passord er en ganske så svak sikkerhetsmekanisme",
        losning: "Brukernavn + Passord + ENGANGSPASSORD",
        issues: [
        "Du må alltid kunne få tak et nytt engangspassord",
        "Distribusjon av engangspassord er komplisert",
        "Passer ikke i alle kontekster"],
        bottomline: "Veldig effektivt så lenge du får tak i engangspassordet",
        terningkast: 6
    },
    {
        ignore: true,
        navn: "BankId - Dongle",
        kategori: kategori.identitet,
        rant: "AAAAAArgh, jeg må inn i nettbanken for å overføre penger, og har glemt BankID-greia mi",
        problem: "Hvordan lage engangspassord enkelt, sikkert og pålitelig",
        losning: "En liten dings som genererer engangspassord og som du kan ha i lomma",
        issues: ["Ganske kostbart", "Veldig glembart", "Erstatning krever ganske lang tid"],
        bottomline: "Funker når du har den!",
        alternativer: ['BankID på mobil', 'Lapp med koder', 'App', "SMS"],
        terningkast: 4
    },
    {
        navn: "Fingeravtrykksleser",
        kategori: kategori.identitet,
        problem: "Tasting av langt brukernavn og passord er ikke så kult når du skal åpne ei dør, eller når du skal låse opp telefonen",
        rant: "Jeg gidder ikke huske passord, brukernavn eller noe som helst",
        losning: "Ta bilde av fingeren din",
        issues: ["Bare så bra som sensoren er", "Relativt kostbart", "Brukbart bare der du har en sensor", "Du kan ikke bytte 'passord' "],
        bottomline: "Funker bra der du skal ha tilgang til en ting eller et sted",
        terningkast: 4
    },
    {
        ignore: true,
        navn: "Password-Manager",
        kategori: kategori.identitet,
        rant: "Jeg blir GAAAAL av å lage sykt bra passord alltid",
        problem: "Alle websider spør om et nytt passord",
        losning: "Lagre alle passord hos en leverandør som tilbyr tjenester for generering og bruk av disse",
        issues: ["Alt på ett sted", "Helt avhengig av at leverandøren leverer", "Screwed om leverandøren blir hacket eller nede", "Klønete å bruke ute av nettleseren"],
        bottomline: "Skyver på problemet med passord, og man legger potensielt veldig mye tillit hos en 3.part",
        alternativer: ["Resett passord hver gang", "SSO", "Bugmenot"],
        terningkast: 3
    },
    {
        navn: "SSO og innlogging med f.eks Facebook eller Google",
        rant: "Aaaargh, jeg orker ikke lage enda et brukernavn og passord for dette nettstedet",
        problem: "Alle websider spør om et nytt passord",
        kategori: kategori.identitet,
        losning: "La en tiltrodd 3.part håndterer håndtere innloggingen",
        issues: ["Alle nettsteder i ett passord...", "Stoler du på google?", "Stoler yahoo eller microsoft eller apple på google?"],
        bottomline: "Veldig hendig. Og kan være veldig bra sikkerhetsmessig. Forutsatt at  3.parten gjør jobben sin, og at man bruker 2-faktor auth",
        terningkast: 5
    },
    {
        navn: "SSL/TLS",
        rant: "Hva betyr den derre hengelåsen??",
        kategori: kategori.kommunikasjon,
        problem: "Det er i utangspunktet veeeldig enkelt å avlytte og tukle med kommunikasjon på Internett",
        losning: "Lag KRYPTO-magi som kan brukes av praktisk talt all kommunikasjon på internett. Pålitelige 3.parter og masse røverspråk",
        issues: ["Må bygges inn i alle browsere og applikasjoner som skal bruke det", "Krever solide 3.parter"],
        bottomline: "JA. Det funker steinbra og du vet kanskje ikke at det er i bruk en gang.",
        terningkast: [6, 6]
    },
    {
        ignore: true,
        navn: "VPN",
        rant: "Jeg får ikke tilgang til $common når jeg sitter hjemme",
        kategori: kategori.kommunikasjon,
        problem: "Det er dyrt og vanskelig å få alt til å fungere sikkert over internett (f.eks nettverksdisker)",
        losning: "KRYPTO-magi fra din PC din til kontor-nettverket, slik at ting funker omtrent som det gjør på Skur39",
        issues: ["Krever en del båndbredde", "Litt styr å sette opp", "Krever gode identitetsløsninger for å være årntli sikkert (f.eks RSA-dongle)"],
        bottomline: "En ganske bra sikkerhetsmekanisme som er veldig fleksibel",
        terningkast: 6
    },
    {
        navn: "WiFi",
        rant: "WiFi-passordet er sykt vanskelig",
        kategori: kategori.kommunikasjon,
        problem: "Du vil gjerne kunne bruke trådløst nettverk uten at alle kan avlytte det",
        losning: "Krypto-magi på all trådløs kommunikasjon med et delt passord",
        issues: [
        "Passordet må være langt for å være ordentlig bra", 
        "Kan hackes likevel avhengig av protokoll (WEP)", 
        "Det deles ved hjelp av en lapp"],
        bottomline: "Til og med et dårlig passord på WiFi gir betydelig økt sikkerhet",
        terningkast: 5
    },
    {
        navn: "BankID Java-applet",
        rant: "Føkkings JAVA",
        kategori: kategori.kommunikasjon,
        problem: "Hvordan lage et superdupert sikkerhetsopplegg som brukbart på alle norske banker sitt nettsted. Og slikt.",
        losning: "Vi lager en JAVA-applet som kjører på alle browsere. Yeah!",
        issues: [
            "Java fungerer ikke på iPad",
            "Java fungerer ikke på iPhone",
            "Java fungerer ikke på Android",
            "Java fungerer ikke spesielt bra på Mac",
            "Java har i det siste fått masse sikkerhetsgreier som er brukerfiendlige så de holder",
            "Java må oppdateres jevnlig på alle maskiner som har det installert",
            "Java blir ikke oppdatert jevnlig",
            "Java installerer Ask-toolbar når det blir oppdatert...."
        ],
        bottomline: "I 2004 var det fett. Men nå er 2015.",
        terningkast: 1
    },
   {
        ignore: true,
        navn: "SPAM-filter",
        rant: "Hvorfor kommer ikke den helsikes mailen frem",
        kategori: kategori.internett,
        problem: "Det er gratis å sende en epost. Så da sender noen veeeldig mye epost",
        losning: "Stopp epost som du ikke vil ha",
        issues: [
            "Det er vanskelig å vite hva du ikke vil ha",
            "Spammere blir flinkere og flinkere til å jukse seg forbi filterne",
            "Våpenkappløp mellom SPAM-filterene og Spammerne",
            "Kommer ikke spam-en din gjennom? Send mer spam!"
            ],
        bottomline: "Gmail får aldri spam.. Så det går an. Men internett lider.",
        terningkast: 3
    },
    {
        navn: "Captcha",
        rant: "Det finnes så utrolig mange falske profiler på Twitter",
        kategori: kategori.internett,
        problem: "Noen synes det er gøy å automatisk legge inn falske brukere på internett (og andre steder)",
        losning: "Mennesker er bra på å gjenkjenne mønster, så vi bruker et bilde og får bruker til å si hva det inneholder",
        issues: [
        "Datamaskiner blir kjappere og kjappere",
        "Mennesker kan leies for en billig penge",
        "Mønstrene blir må da bli vanskeligere og vanskeligere",
        "UFATTELIG irriterende når du har bomma mer enn en gang"
        ],
        bottomline: "Det har en effekt, men er syyykt irriterende",
        terningkast: 2
    },
    {
        navn: "Filtrerende Web-Proxy",
        rant: "Jeg klikka på en link på twitter og så står det bare [Blocked by proxy: Social media]",
        problem: "Våre ansatte surfer mye på sider som har XXX i navnet",
        kategori: kategori.internett,
        losning: "Send all internettrafikk gjennom en mellomtjener som kan luke vekk alt som er farlig, uønsket, uproduktivt eller smakløst",
        issues: ["Falske positiver", "Kan fort misbrukes av overivrige administratorer", "Personvernmessig litt betenkelig"],
        bottomline: "Til en viss grad, men får deg til å føle deg som en forbryter",
        terningkast: 2
    },
    {
        navn: "Brannmur",
        rant: "Argh, jeg får ikke BitTorrent til å fungere",
        kategori: kategori.internett,
        problem: "Bare det som skal være tilgjengelig på internett bør være det",
        losning: "La spesial-software eller hardware kontrollere all nettverkstrafikk",
        issues: [
            "Noen brannmurer stopper litt i overkant mye",
            "Gode muligheter for galskap om man har brannmurer på sentraliserte steder",
            "Gode muligheter for galskap om feil fyr administrerer brannmureren"
        ],
        bottomline: "Om den står på en fornuftig plass, gir en brannmur bra beskyttelse mot mye rart. Og du merker ikke at den er der",
        terningkast: 5
    },
    {
        navn: "Virtuell desktop",
        rant: "Hvorfor føles det som om jeg jobber med sirup på tastaturet???",
        kategori: kategori.beskyttelse,
        problem: "Du skal kunne bruke PCen fra hvor som helst, f.eks en tynn og billig pc. Og det skal samtidig være supersikkert.",
        losning: "Lag en Supersikker virtuell PC som du kan logge på og fjernstyre fra _nesten_ hvor som helst",
        issues: [
        "Vil så og si alltid oppleves som tregere enn en vanlig PC", 
        "Blir ikke bedre enn nettverket det brukes over", 
        "IT-avdelinger liker å låse ned ting", 
        "Kommer nesten alltid i tillegg til en PC"],
        bottomline: "Til sitt bruk. Men brukes ofte til helt andre ting.",
        terningkast: [2, 5]
    },
    {
        navn: "Antivirus",
        rant: "Herre min hatt. Datan er blir så syyyykt treg - sikkert antivirus",
        problem: "Noen lager spesialprogramvare for styre eller ødelegge din PC",
        kategori: kategori.beskyttelse,
        losning: "Et program som overvåker alt som skjer på maskina",
        issues: [
            "Krever en god del ressurser",
            "Vanskelig å kjenne igjen virus-aktig aktivitet",
            "Noen av problemene kan løses på andre måter enn antivirus",
            "Må være _kontinuerlig_ oppdatert",
            "Våpenkappløp"],
        bottomline: "Kan være effektivt, men er ikke alltid helt nødvendig",
        terningkast: 4
    },
    {
        navn: "Auto-oppdatering",
        rant: "Aaargh. Det passer ikke å oppdatere JAVA akkurat nå.",
        kategori: kategori.beskyttelse,
        problem: "All programvare har sikkerhetsproblemer som oppdages etter release",
        losning: "Bygg inn oppdatering i softwaren, slik at feilfikser enkelt kan rulles ut",
        issues: [
            "Må gjøres enkelt nok til at det blir gjort, og helst fullautomatisk",
            "Kan ikke alltid gjøres _helt_ i bakgrunnen (restart nå?? *stønn*)",
            "Brukes ofte til oppdateringer som forandrer funksjonalitet - som man kanskje ikke ønsker",],
        bottomline: "Kanskje den beste mekanismen for å unngå virus",
        terningkast: 6
    },
    {
        navn: "Admin-konto",
        rant: "Helsike. Jeg får ikke installert Spotify på kontorpcen",
        kategori: kategori.beskyttelse,
        problem: "At ting blir installert uten at man legger merke til det",
        losning: "Du må ha Administrator-rettigheter på din bruker for å få innstallere programmer (og evt gjøre andre potensielt skadelige ting)",
        issues: [
            "Begrenser brukeren (tildels veldig) om man ikke har admin",
            "De med admin bruker det hele tiden (f.eks Windows)",
            ],
        bottomline: "Kan være effektivt, men da er det klønete",
        terningkast: 3
    },
    {
        navn: "Admin-eskalering",
        rant: "Ja. Jeg vil faktisk installere Spotify. Ikke mas!",
        kategori: kategori.beskyttelse,
        problem: "Bare sikkerhetsnerder kjører uten admin",
        losning: "Be bruker om å godkjenne at man bruker Admin",
        issues: [
            "Blir gjort automatisk om man må eskalere for ofte",
            "Gir ikke så god beskyttelse om man eskaleres sjelden",
            "Noen av problemene kan løses på andre måter enn antivirus",
            "Må være _kontinuerlig_ oppdatert"],
        bottomline: "Et bra kompromiss mellom årntli admin-konto og å kjøre alt med alle rettigheter",
        terningkast: 5
    },
    {
        navn: "Væskeforbudet",
        rant: "Vann koster 70 kr på Gardermoen!!!",
        kategori: kategori.flyogslikt,
        problem: "Noen putta en gang ei bombe i ei colaflaske",
        losning: "Forby all væske gjennom sikkerhetskontroll",
        issues: [
            "Shampo", "Barnemat", "MME", "Deodorant", "Vin"
        ],
        bottomline: "Sikkerhetsteater av beste sort. Koster enormt mye.",
        terningkast: 1
    },
    {
        navn: "Mobil og slikt i fly",
        rant: "Hvorfor i herrens navn må jeg skru av kindlen under takeoff???",
        kategori: kategori.flyogslikt,
        problem: "Fly har mye sensitiv elektronikk som kan bli påvirket av radiosendere",
        losning: "Forby alle radiosendere som ikke er godkjent",
        issues: ["Veldig få husker å skru av mobilen sin"],
        bottomline: "Sikkerhetsregel som blir glatt ignorert. Jobbe med herding i stedet?",
        terningkast: 1
    }
];

/*


 {
 navn: "Bankid på mobil",
 rant: "Mista telefonen",
 kategori: kategori.identitet,
 losning: "",
 issues: ["Yep"],
 bottomline: "",
 terningkast: 5
 },

 # Du har blitt logget ut fra pcen din


 ### Hva er greia?


 */
