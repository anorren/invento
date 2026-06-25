# Invento Inventarsoftware

Invento ist eine kleine Web-App fuer Audio- und Lichttechnik-Inventar.

## Standard-Workflow

1. Lokal mit Codex weiterentwickeln.
2. Aenderungen in ein eigenes GitHub-Repository pushen.
3. App ueber GitHub Pages online stellen.
4. Inventardaten in Supabase speichern.

## Supabase vorbereiten

1. In Supabase ein Projekt oeffnen.
2. Links im Menue auf `SQL Editor` gehen.
3. Den Inhalt aus `supabase-schema.sql` einfuegen.
4. `Run` ausfuehren.

Die Datei erstellt die Tabelle `inventory_items`, sinnvolle Indizes und einfache Row-Level-Security-Regeln fuer einen ersten Unterrichts-Prototyp.

## Supabase-Key eintragen

1. In Supabase unter `Project Settings` -> `API` diese Werte suchen:
   - Project URL
   - anon/public oder publishable key
2. Die Werte in `supabase-config.js` eintragen.

Wichtig: Den `service_role` key niemals in diese App eintragen.

`supabase-config.js` wird bei dieser statischen App mit veroeffentlicht. Das ist fuer den anon/public bzw. publishable key normal. Die Sicherheit entsteht nicht dadurch, dass dieser Key geheim bleibt, sondern durch Row-Level-Security-Regeln in Supabase.

## Lokale Entwicklung

Die App funktioniert auch ohne `supabase-config.js`. Dann nutzt sie weiter den lokalen Browser-Speicher.

Wenn `supabase-config.js` vorhanden ist und Supabase erreichbar ist, werden die Daten aus Supabase geladen und beim Speichern synchronisiert.

## GitHub und Hosting

Dieses Projekt sollte als eigenes Repository veroeffentlicht werden, nicht zusammen mit dem ganzen Obsidian-Vault.

Fuer den Anfang:

- GitHub speichert den Code.
- GitHub Pages hostet die Web-App.
- Supabase speichert die Inventardaten.

GitHub Pages braucht fuer diese statische Variante keinen geheimen Key und keine eigene Domain.

Aktivierung in GitHub:

1. Repository oeffnen.
2. `Settings` -> `Pages` oeffnen.
3. `Deploy from a branch` waehlen.
4. Branch `main` und Ordner `/root` waehlen.
5. Speichern und auf die GitHub-Pages-URL warten.

Die spaetere URL sieht ungefaehr so aus:

```text
https://DEIN-GITHUB-NAME.github.io/invento/
```
