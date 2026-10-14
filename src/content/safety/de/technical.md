---
updated: "Zuletzt aktualisiert: 14. Oktober 2026"
---

## 1. Überblick

KINND ist für einige der sensibelsten Daten gebaut, die eine Familie hat. Diese Seite erklärt im technischen Detail, wie die App und unser internes Verwaltungssystem sie schützen. Die Kurzfassung findest du unter [Sicherheit und Datenschutz](/de/safety/).

## 2. Verschlüsselung beim Speichern

Sensible Inhalte werden verschlüsselt, bevor sie gespeichert werden, mit AES-256-GCM. Das ist authentifizierte Verschlüsselung: Sie erkennt auch, wenn Daten manipuliert wurden.

| Daten | Verschlüsselung | Schlüssel |
| --- | --- | --- |
| Fotos und Videos | AES-256-GCM | Ein eigener Schlüssel pro Datei, gesichert mit einem Hauptschlüssel |
| Nachrichten | AES-256-GCM, Feld für Feld | Ein Inhaltsschlüssel, den KINND verwahrt, an jedes Feld gebunden |
| Gesundheitsinfos | AES-256-GCM, Feld für Feld | Ein Inhaltsschlüssel, den KINND verwahrt, an jedes Feld gebunden |
| Kalender, Aufgaben, Listen und Angaben zum Kind | AES-256-GCM, Feld für Feld | Ein Inhaltsschlüssel, den KINND verwahrt, an jedes Feld gebunden |

Technische Felder wie IDs, Daten und Rollen werden nicht verschlüsselt, damit die App sortieren und den Zugang prüfen kann. Weil KINND die Schlüssel verwahrt, ist das keine Ende-zu-Ende-Verschlüsselung (siehe Abschnitt 14).

## 3. Verschlüsselung bei der Übertragung

Der gesamte Datenverkehr zwischen deinem Gerät und KINND nutzt TLS 1.3. Browser werden angewiesen, sich immer über HTTPS zu verbinden (HSTS).

## 4. Schlüsselverwaltung

Die Schlüssel werden getrennt von den Daten aufbewahrt, die sie schützen. Eine Kopie der Datenbank oder der gespeicherten Medien allein kann nicht entschlüsselt werden.

## 5. Anmeldung und Sitzungen

- Die Anmeldung in zwei Schritten ist Pflicht, wenn du dich mit Passwort anmeldest, und kann nicht ausgeschaltet werden.
- Wer sich mit Passwort anmeldet, braucht immer einen 6-stelligen Einmalcode, per E-Mail oder SMS. Ein Code gilt 10 Minuten und erlaubt 5 Versuche.
- Wenn du dich mit Google oder Microsoft anmeldest, schützt deren Anmeldung dein Konto.
- Passwörter werden nie lesbar gespeichert. Wir speichern einen bcrypt-Hash.
- Sitzungen enden nach 90 Tagen ohne Aktivität. Wenn du nicht wählst, angemeldet zu bleiben, endet die Sitzung, sobald du den Browser schließt.

## 6. Zugang in der App

- Zugang wird pro Kind und pro Rolle vergeben. Jeder Erwachsene sieht nur, was seine Beziehung zum Kind erlaubt.
- Der Zugang wird in der App geprüft und noch einmal in der Datenbank.
- Eltern laden den anderen Elternteil und Familienmitglieder ein und können ein Familienmitglied jederzeit entfernen.
- Eingeladene Familienmitglieder sehen nur, was mit ihnen geteilt wird. Gesundheitsinfos sehen die Eltern, andere Erwachsene nur, wenn ein Elternteil ihnen Zugang gibt.
- Das Löschen eines Kontos wird über einen Link per E-Mail bestätigt, der 24 Stunden gilt.
- Die Daten eines Kindes werden nur gelöscht, wenn alle Eltern zustimmen. Sie können 30 Tage lang wiederhergestellt werden, danach werden sie endgültig gelöscht.

## 7. Fotos, Videos und Standort

- Originale werden verschlüsselt gespeichert, so wie sie hochgeladen wurden, damit sie in voller Qualität heruntergeladen werden können.
- Der Standort in den Metadaten eines Fotos (EXIF) wird mit einem eigenen Schlüssel verschlossen, den nur unser Verwaltungssystem öffnen kann. Er wird nur bei Untersuchungen von Missbrauch genutzt.
- Standortdaten werden aus jeder Kopie entfernt, die andere Familienmitglieder herunterladen. Wer ein Foto hochgeladen hat, kann das eigene Original unverändert herunterladen.

## 8. Wo Daten gespeichert werden

Alle Daten, auch Backups, werden in der EU gespeichert, bei Hetzner in Deutschland. Backups sind genauso verschlüsselt wie die laufenden Daten und werden 90 Tage aufbewahrt.

## 9. Aufbewahrung und Löschung

| Daten | Aufbewahrt für |
| --- | --- |
| Deine Inhalte | Bis du sie oder dein Konto löschst |
| Backups | 90 Tage |
| Technische Daten (IP-Adressen, Geräteinformationen, Anmeldeverlauf) | 1 Jahr, um Missbrauch zu erkennen und zu melden |
| Der Bereich eines Kindes, nachdem ein Abo ohne Zahlung endet | Ausgeblendet, dann 90 Tage nach Ablauf des Abos gelöscht. Dein Konto bleibt bestehen. Wir benachrichtigen dich 90, 60 und 7 Tage vorher. |

## 10. Das Verwaltungssystem

- Unser Team arbeitet in einem eigenen Verwaltungssystem, nicht in der App.
- Mitarbeitende melden sich mit Multi-Faktor-Authentifizierung an, und der Zugang richtet sich nach der Rolle. Jede Rolle sieht nur, was sie braucht.
- Jeder Blick auf einen Fall, einen Alarm oder Medien wird mit wer, was und wann protokolliert und geprüft.

## 11. Abuse Central

Abuse Central ist ein komplexes System aus Auslösern und Mustern, das rund um die Uhr auf Missbrauch achtet, mit technischen Signalen. Es sucht nach:

- Ungewöhnlichen Anmeldungen und Versuchen, ein Konto zu übernehmen
- Konten, die angelegt werden, um an ein bestimmtes Kind heranzukommen
- Versuchen, sich Zugang zu verschaffen, der einem nicht zusteht
- Betrug mit Nutzerkonten

Wenn ein Auslöser anschlägt:

1. **Alarm.** Abuse Central löst einen Fallalarm aus.
2. **Prüfung.** Ein Mensch in unserem Team prüft die technischen Details. Jeder Blick wird protokolliert und geprüft.
3. **Untersuchung.** Gibt es Gründe, wird der Fall nach denselben Vorgaben untersucht, denen auch die dänischen Behörden folgen.
4. **Zweite Prüfung.** Eine zweite, erfahrene Prüfperson muss zustimmen, bevor ein Fall gemeldet, ein Konto gesperrt oder einem Elternteil der Zugang entzogen wird.
5. **Übergabe.** Bestätigte illegale Fälle werden der Polizei übergeben und verfolgt, bis sie abgeschlossen sind.

## 12. Zusammenarbeit mit den Behörden

In einem bestätigten illegalen Fall übergeben wir die Informationen, die die Polizei braucht: Kontodaten, Geräteinformationen, IP-Adressen und die betreffenden Medien. Wir verfolgen jeden Fall, bis er abgeschlossen ist. Ohne bestätigten Fall oder rechtliche Anfrage geben wir keine Daten heraus.

## 13. Dienste, die wir nutzen

| Dienst | Wofür | Was er erhält |
| --- | --- | --- |
| Hetzner (Deutschland) | Hosting und Speicher | Die gespeicherten Daten, verschlüsselt wie oben beschrieben |
| QuickPay | Kartenzahlungen | Zahlungsdaten. KINND speichert nie vollständige Kartennummern. |
| Brevo | E-Mail und SMS | Name, E-Mail-Adresse, Telefonnummer |
| Google und Microsoft | Anmeldung, wenn du sie wählst | Deine Anmeldung bei ihnen |
| Push-Dienste der Browser | Benachrichtigungen auf deinem Gerät | Eine verschlüsselte Benachrichtigung |
| Have I Been Pwned | Prüfen, dass ein neues Passwort nicht geleakt wurde | Die ersten 5 Zeichen eines Hashs des Passworts, nie das Passwort |

## 14. Was wir nicht tun

- Wir nutzen keine Ende-zu-Ende-Verschlüsselung. Dadurch können wir Missbrauch erkennen und dir helfen, dein Konto wiederherzustellen.
- Wir zeigen keine Werbung.
- Wir verkaufen oder teilen keine Familiendaten für Marketing.
- Wir ergreifen in Familienkonflikten keine Partei.

## 15. Ein Sicherheitsproblem melden

Hast du eine Schwachstelle gefunden oder machst du dir Sorgen wegen eines Kontos? Schreib an <support@kinnd.eu>.
