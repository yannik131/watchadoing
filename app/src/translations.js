export default {
  en: {
    introduction: {
      title: "Welcome",
      subtitle: "Watch in real time how bubbles are added and grow!",
      explanation: "After granting access to your location, click on the location markers to see the bubbles.",
      popular: "The bigger the bubble, the more popular whatever is inside it! You can (dis)like and add bubbles only at your location.",
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
      loading: "Loading data.."
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
    }
  },
  de: {
    introduction: {
      title: "Willkommen",
      subtitle: "Schaue in Echtzeit zu, wie Blasen dazukommen und wachsen!",
      explanation: "Gib Deinen Standort frei und klicke auf einen Standortmarker, um die Blasen zu sehen.",
      popular: "Je größer die Blase, desto mehr Leute mögen, was drin steht! Du kannst Blasen nur an deinem Standort (dis)liken und hinzufügen.",
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
      loading: "Hole Daten.."
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
    }
  },
};