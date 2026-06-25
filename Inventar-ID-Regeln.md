# Inventar-ID-Regeln

Diese Datei beschreibt die aktuelle Regel für automatisch erzeugte Inventar-IDs in der Invento Inventarsoftware.

Die Liste ist bewusst als erweiterbares Glossar gedacht. Wenn neue Kategorien, Gerätearten oder Kurznamen dazukommen, können sie hier ergänzt und anschließend in der App-Logik gespiegelt werden.

## Grundformat

```text
<Bereich>-<Kategorie>-<Modellkurzname>-<laufende Nummer>
```

Beispiele:

```text
AT-MIC-SM58-001
AT-MIX-MG10XU-001
LT-PAR-EUROLITE-001
LT-MH-PHANTOM50-001
```

## Bereiche

| Kürzel | Bedeutung |
|---|---|
| AT | Audio-/Tontechnik |
| LT | Lichttechnik |

## Kategorien

| Kategorie | Kürzel | Bereich |
|---|---:|---|
| Mikrofone | MIC | AT |
| Mixer | MIX | AT |
| Lautsprecher | SPK | AT |
| Funkanlagen | WLS | AT |
| Kopfhörer | HPH | AT |
| Recorder | REC | AT |
| Stative | STD | AT |
| DI-Boxen | DIB | AT |
| Kabel | CBL | AT |
| LED PAR | PAR | LT |
| Moving Heads | MH | LT |
| DMX / Steuerung | DMX | LT |
| Zubehör | ACC | AT |

## Hersteller und Produkt/Modell

Hersteller/Firma und Produkt/Modell werden getrennt erfasst.

Beispiel:

| Feld | Wert |
|---|---|
| Hersteller / Firma | Shure |
| Produkt / Modell | SM58 |
| Ergebnis-ID | AT-MIC-SM58-001 |

Der Hersteller wird auf dem Etikett angezeigt, ist aber normalerweise nicht Bestandteil der Inventar-ID. Die ID soll vor allem die technische Gruppe und das Modell abbilden. Wenn kein brauchbares Modell vorhanden ist, kann der Hersteller als Fallback für den Kurznamen verwendet werden.

## Modellkurzname

Der Modellkurzname wird automatisch aus dem Feld `Produkt / Modell` gebildet:

1. Sonderzeichen, Leerzeichen und Umlaute werden bereinigt.
2. Wenn ein Modellcode mit Ziffern vorkommt, wird dieser bevorzugt.
3. Häufige Hersteller- und Füllwörter werden ignoriert.
4. Wenn kein Modellcode erkannt wird, werden die ersten sinnvollen Namensbestandteile verwendet.
5. Der Kurzname wird auf maximal 12 Zeichen begrenzt.

Beispiele:

| Hersteller | Produkt / Modell | Modellkurzname |
|---|---|---:|
| Shure | SM58 | SM58 |
| Yamaha | MG10XU | MG10XU |
| JBL | EON615 | EON615 |
| Showtec | Phantom 50 | PHANTOM50 |
| Eurolite | LED PAR RGB | PAR |

## Anschaffung

Zusätzlich können Stammdaten zur Anschaffung gepflegt werden:

| Feld | Zweck |
|---|---|
| Anschaffungsjahr | Grobe zeitliche Einordnung, Alter des Geräts, Ersatzplanung |
| Kosten | Anschaffungskosten oder geschätzter Wiederbeschaffungswert |

Diese Felder sind bewusst **nicht** Bestandteil der Inventar-ID, weil sie die Identität eines Geräts nicht stabil beschreiben.

## Laufende Nummer

Die laufende Nummer ist dreistellig und wird innerhalb derselben Kombination aus Bereich, Kategorie und Produktkurzname hochgezählt.

Beispiele:

```text
AT-MIC-SM58-001
AT-MIC-SM58-002
AT-MIC-SM58-003
```

## Stabilitätsregel

Bei neuen Produkten darf die ID live aus Hersteller, Produkt/Modell und Kategorie entstehen.

Sobald ein Produkt gespeichert ist, sollte seine Inventar-ID dauerhaft stabil bleiben. Spätere Korrekturen an Hersteller oder Modell sollten die historische Inventar-ID nicht automatisch rückwirkend ändern, außer man entscheidet sich bewusst für eine Umbenennung.

## QR-Code-Regel

Der QR-Code enthält die automatisch erzeugte Inventar-ID.

Das Etikett zeigt zusätzlich lesbar:

- Inventar-ID
- Hersteller / Firma
- Produkt / Modell
- Kategorie
- Standort
