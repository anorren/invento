# Responsive-Design-Regeln für Invento

Invento soll als responsive Web-App gestaltet werden. Die Oberfläche passt sich automatisch an die verfügbare Bildschirmbreite an und wird nicht als separate iPhone-, iPad- oder Desktop-Version gepflegt.

## Zielgeräte

Die App soll mindestens für diese Ansichten sinnvoll nutzbar sein:

- Desktop / Webseite: ca. 1280 x 900 px
- iPad / Tablet: ca. 820 x 1180 px
- iPhone Max: ca. 430 x 932 px
- iPhone normal: ca. 390 x 844 px

## Grundprinzip

Die Desktop-Ansicht ist die Arbeitsansicht für schnelles Erfassen und Bearbeiten von Inventar. Sie darf mehrere Bereiche nebeneinander zeigen:

- linker Menübereich mit Inventar-Liste
- Hauptbereich mit Produktdaten und Foto
- rechter Bereich mit Checkliste, QR-Code-Vorschau und Hinweisen

Auf Tablet- und Smartphone-Größen sollen diese Bereiche nicht gequetscht werden. Stattdessen werden sie untereinander oder in weniger Spalten angeordnet.

## Aktuelle Breakpoints

Die App nutzt derzeit CSS-Media-Queries für:

- bis 1180 px Breite: Tablet-/schmalere Desktop-Ansicht
- bis 820 px Breite: Mobile Ansicht

Diese Werte können später angepasst werden, wenn echte Tests auf iPad oder iPhone zeigen, dass andere Schwellen angenehmer sind.

## Designvorgaben

- Keine eigene sichtbare Umschaltleiste in der App für Geräteansichten.
- Responsive Verhalten wird über CSS geregelt.
- Der Codex-Browser kann zum Testen auf Desktop-, iPad- oder iPhone-Abmessungen gestellt werden.
- Bedienelemente müssen auf kleinen Bildschirmen gut lesbar und antippbar bleiben.
- Texte dürfen nicht aus Buttons, Karten oder Formularfeldern herauslaufen.
- Wichtige Arbeitsaktionen müssen auch in der Mobile-Ansicht ohne horizontales Scrollen erreichbar sein.

## Testnotiz

Beim Testen soll jeweils geprüft werden:

- Startseite
- Produkt hinzufügen
- vorhandene Produkte bearbeiten
- QR-Code-Vorschau
- Speichern / nächstes Gerät
- Rückkehr zur Startseite
