export default {
  en: {
    introduction: {
      title: "Welcome!",
      subtitle: "Watch in real time how bubbles are added and grow!",
      explanation: "After granting access to your location, click on the location markers to see the bubbles.",
      popular: "The bigger the bubble, the more popular whatever is inside it! You can like and add bubbles only at your location.",
      grantLocation: "If you don't want to or can't use your current location, you can type in a city here:",
      addressPlaceholder: "City or address",
      button: {
        go: "Let's go!",
        sendAddress: "Send address",
        gettingLocation: "Getting location.."
      },
      error: {
        locationDenied: "You denied access to your location. This app won't work without your location! You can type it in manually, though."
      }
    },
    addActivity: {
      title: "Add bubble",
      subtitle: "Watcha doing in {location}?",
      inputPlaceholder: "Reading, movies, ...",
      add: 'Add',
      cancel: 'Cancel',
      error: {
        emptyDescription: "Empty descriptions are not supported.",
        lengthExceeded: "Maximum length of {maxLength} characters exceeded.",
        duplicate: "There's a bubble with the same description in your area."
      }
    },
    home: {
      add: "Add",
      center: "Center",
      loading: "Loading data..",
      zoom: {
        cities: 'Cities',
        counties: 'Counties',
        states: 'States',
        countries: 'Countries'
      },
      zoomLevel: 'Zoom level'
    },
    location: {
      error: {
        badCoordinates: "Could not determine location from coordinates. Please type in a city manually.",
        unavailable: "The server seems to be offline, maybe for maintenance. Please try again later.",
        notFound: "The address could not be found.",
        missingComponent: "Could not determine city or state from the given location. Please type in another address manually.",
        geocodingFail: "Could not geocode this location. Please type in another address manually."
      },
      determined: "Determined location: {location}. Proceed if this is correct :)"
    },
    bubble: {
      like: 'Yes!',
      dislike: 'No!',
      reset: 'Okay.'
    },
    tutorial: {
      next: "Next",
      close: "Close",
      text1: "If you click on the marker of a location, the bubbles appear and you can see in real time how others add bubbles and change their size by liking them.",
      text2: "Click on the plus to zoom in on your location and add a bubble. The other button centers the map on your location.",
      text3: "There are 4 zoom levels: Countries, states, counties and cities. Bubbles are summed up over all cities within the selected location. Click on a bubble to see where it got the most likes!",
      text4: "After clicking on one of the blue markers, the name of the selected location is shown here. You can add and like bubbles only in the city you specified earlier.  Have fun!"
    }
  },
  de: {
    introduction: {
      title: "Willkommen!",
      subtitle: "Schaue in Echtzeit zu, wie Blasen dazukommen und wachsen!",
      explanation: "Gib Deinen Standort frei und klicke auf einen Standortmarker, um die Blasen zu sehen.",
      popular: "Je größer die Blase, desto mehr Leute mögen, was drin steht! Du kannst Blasen nur an deinem Standort liken und hinzufügen.",
      grantLocation: "Falls Du deinen Standort nicht freigeben möchtest, kannst du hier eine Stadt eingeben:",
      addressPlaceholder: "Stadt oder Adresse",
      button: {
        go: "Los geht's!",
        sendAddress: "Absenden",
        gettingLocation: "Bestimme Standort.."
      },
      error: {
        locationDenied: "Du hast Deinen Standort nicht freigegeben. Ohne Deinen Standort geht's nicht! Du kannst aber eine Stadt manuell eintippen."
      }
    },
    addActivity: {
      title: "Blubbern",
      subtitle: "Was ist los in {location}?",
      inputPlaceholder: "Lesen, Filme, ...",
      add: 'Blubb!',
      cancel: 'Zurück',
      error: {
        emptyDescription: "Leere Beschreibungen gehen nicht.",
        lengthExceeded: "Maximallänge von {maxLength} Zeichen überschritten.",
        duplicate: "Es gibt schon eine Blase mit diesem Text in dieser Stadt."
      }
    },
    home: {
      add: "Blubb!",
      center: "",
      loading: "Hole Daten..",
      zoom: {
        cities: 'Städte',
        counties: 'Landkreise',
        states: 'Bundesländer',
        countries: 'Länder'
      },
      zoomLevel: 'Zoom-Level'
    },
    location: {
      error: {
        badCoordinates: "Konnte keinen Standort aus diesen Koordinaten ermitteln. Bitte gib eine Stadt manuell ein.",
        unavailable: "Der Server antwortet gerade nicht, vielleicht läuft da ein Update. Versuch's später nochmal.",
        notFound: "Die Adresse konnte nicht gefunden werden.",
        missingComponent: "Konnte Stadt oder Bundesland nicht ermitteln. Bitte gib eine andere Stadt ein.",
        geocodingFail: "Openstreetmap kann mit der eingegeben Adresse bzw. deinem Standort nichts anfangen. Bitte gib manuell eine Stadt ein."
      },
      determined: "Ermittelter Standort: {location}. Wenn das passt, kannst du weitermachen :)"
    },
    bubble: {
      like: 'Ja!',
      dislike: 'Nein!',
      reset: 'Okay.'
    },
    tutorial: {
      next: "Nächste",
      close: "Fertig",
      text1: "Wenn Du auf einen Marker klickst, werden die Blasen angezeigt und Du kannst in Echtzeit verfolgen, wie andere neue Blasen hinzufügen und ihre Größe durch Likes ändern.",
      text2: "Klicke auf das Plus, um in deinen Standort zu zoomen und eine Blase hinzuzufügen. Der andere Button zentriert die Karte auf deinen Standort.",
      text3: "Es gibt 4 Zoomstufen: Länder, Bundesländer, Landkreise und Städte. Blasen werden über alle Städte innerhalb des ausgewählten Standorts aufsummiert. Klick auf eine Blase, um zu sehen wo sie die meisten Likes hat!",
      text4: "Nach Klicken auf einen der blauen Marker wird der Name des ausgewählten Ortes hier angezeigt. Blasen können nur in deinem angegeben Ort geliked werden. Viel Spaß!"
    }
  },
};