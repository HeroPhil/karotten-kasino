# Lessons Learned
Sachen die uns während des Arbeitens am Projekt aufgefallen sind

## Allgemein
* AWS ist für Einsteiger sehr unübersichtlich. In zukünftigen Projekten vielleicht lieber "leichtere" Dienste (wie Github pages).
* ESlint fördert die Struktur und Korrektheit des gesamten Projektes
* node scripts ermöglichen leichtes benutzen der verschiedenen CLI Tools
* CORS kann einen in den Wahnsinntreiben. Das Konzept ist dabei eigentlich simpel und kann leicht beherrscht werden.
* SSL Zertifikate können durch verschiedene Stellen (teils aus kostenfrei) bezogen werden. 

## Backend
* lobby / room management schwer selbst zu implementieren, deutlich einfacher mit beispielsweise socket.io
* Validierung von Anfragen sollte im Backend stattfinden, da das frontend beim client leicht manipuliert werden kann
* TypeScript Datentypen bieten nur Sicherheit während der Designtime. Während der laufzeit läuft JavaScript. Und wir alle wissen ja was JavaScript von Datentypen hält... 

## Frontend
* Die Angular UI Component Library PrimeNG erlaubt schnelles und einfaches Einbinden von Themes. Außerdem können eigene Themes in einem Builder erstellt werden.
* Angular ist teilweise sehr unübersichtlich und man benötigt etwas Zeit, um in der Masse an Dateien klarzukommen. Klar strukturierte Ordner sowie einzelne Komponenten und Module helfen und schaffen einen Überblick.
* Angular benötigt das Wissen und Beherrschen vieler verschiedener Sprachen (html, css, ts, ...).
* Angular hat viele Versionen die teilweise unterschiedliche Syntax nutzen, dies macht recherche nach Fehlern oft zeitaufwendig.
* Gutes Design ist nicht immer einfach.
* Funktionen wie doppelte curly braces etc. vereinfachen die Entwicklung in Verbindung mit Java-/TypeScript.

---

## Würden wir das Projekt wieder so implementieren?
### Ja, denn
* socket.io ist ein super tool zum managen von client Gruppen
* Angular baut auf bereits bekannten Sprachen (html, css, ts, etc.) auf.
* Node.js hat viele packages im repo, sodass für quasi alles was dabei ist.

### Nein, denn
* AWS ist und bleibt unübersichtlich und nicht besonders preiswert.
* Angular macht kein Spaß in der Entwicklung. Es fühlt sich teils sehr umständlich an, ist schwer zu debuggen und erfordert das überwinden einer steilen Lernkurve.
 
