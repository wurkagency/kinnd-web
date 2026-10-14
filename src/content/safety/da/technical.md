---
updated: "Senest opdateret: 14. oktober 2026"
---

## 1. Overblik

KINND er bygget til nogle af de mest følsomme data, en familie har. Denne side forklarer med tekniske detaljer, hvordan appen og vores interne administrationssystem beskytter dem. Den korte version finder du under [Sikkerhed og privatliv](/da/safety/).

## 2. Kryptering, når data gemmes

Følsomt indhold krypteres med AES-256-GCM, før det skrives til lageret. Det er autentificeret kryptering: Den opdager også, hvis nogen har pillet ved dataene.

| Data | Kryptering | Nøgle |
| --- | --- | --- |
| Billeder og videoer | AES-256-GCM | Sin egen nøgle til hver fil, låst med en hovednøgle |
| Beskeder | AES-256-GCM, felt for felt | En indholdsnøgle, som KINND har, knyttet til hvert felt |
| Helbredsoplysninger | AES-256-GCM, felt for felt | En indholdsnøgle, som KINND har, knyttet til hvert felt |
| Kalender, opgaver, lister og oplysninger om barnet | AES-256-GCM, felt for felt | En indholdsnøgle, som KINND har, knyttet til hvert felt |

Tekniske felter som id'er, datoer og roller er ikke krypteret, så appen kan sortere og tjekke adgang. Fordi KINND har nøglerne, er dette ikke end-to-end-kryptering (se afsnit 14).

## 3. Kryptering, når data sendes

Al trafik mellem din enhed og KINND bruger TLS 1.3. Browsere får besked på altid at forbinde over HTTPS (HSTS).

## 4. Håndtering af nøgler

Krypteringsnøgler opbevares adskilt fra de data, de beskytter. En kopi af databasen eller de gemte medier alene kan ikke dekrypteres.

## 5. Login og sessioner

- Login i to trin er obligatorisk, når du logger ind med adgangskode, og kan ikke slås fra.
- Login med adgangskode kræver altid en 6-cifret engangskode, sendt på e-mail eller sms. En kode er gyldig i 10 minutter og giver 5 forsøg.
- Logger du ind med Google eller Microsoft, er det deres login, der beskytter din konto.
- Adgangskoder gemmes aldrig i læsbar form. Vi gemmer et bcrypt-hash.
- Sessioner udløber efter 90 dage uden aktivitet. Vælger du ikke at forblive logget ind, udløber sessionen, når du lukker browseren.

## 6. Adgang i appen

- Adgang gives pr. barn og pr. rolle. Hver voksen ser kun det, deres relation til barnet giver adgang til.
- Adgang tjekkes i appen og igen i databasen.
- Forældre inviterer den anden forælder og familiemedlemmer og kan fjerne et familiemedlem når som helst.
- Inviterede familiemedlemmer ser kun det, der deles med dem. Helbredsoplysninger kan ses af forældre og kun af andre voksne, hvis en forælder giver dem adgang.
- Sletning af en konto bekræftes via et link, der sendes på e-mail og er gyldigt i 24 timer.
- Et barns data slettes kun, når alle forældre er enige. De kan gendannes i 30 dage og slettes derefter permanent.

## 7. Billeder, videoer og lokation

- Originaler gemmes krypteret, som de blev uploadet, så de kan downloades i fuld kvalitet.
- Lokation i et billedes metadata (EXIF) forsegles med en separat nøgle, som kun vores administrationssystem kan åbne. Den bruges kun ved undersøgelser af misbrug.
- Lokationsdata fjernes fra hver kopi, som andre familiemedlemmer downloader. Den, der har uploadet et billede, kan downloade sin egen original uændret.

## 8. Hvor data opbevares

Alle data, også sikkerhedskopier, opbevares i EU hos Hetzner i Tyskland. Sikkerhedskopier krypteres på samme måde som de aktive data og gemmes i 90 dage.

## 9. Opbevaring og sletning

| Data | Gemmes i |
| --- | --- |
| Dit indhold | Indtil du sletter det eller din konto |
| Sikkerhedskopier | 90 dage |
| Tekniske data (IP-adresser, enhedsoplysninger, loginhistorik) | 1 år, for at opdage og anmelde misbrug |
| Et barns område, efter et abonnement er udløbet uden betaling | Skjules og slettes derefter 90 dage efter, at abonnementet er udløbet. Din konto bevares. Vi giver besked 90, 60 og 7 dage før. |

## 10. Administrationssystemet

- Vores team arbejder i et separat administrationssystem, ikke i appen.
- Medarbejdere logger ind med flerfaktorgodkendelse, og adgang er rollebaseret. Hver rolle ser kun det, den har brug for.
- Hvert opslag i en sag, en alarm eller et medie logges med hvem, hvad og hvornår, og kontrolleres.

## 11. Abuse Central

Abuse Central er et komplekst system af udløsere og mønstre, der holder øje med misbrug døgnet rundt ved hjælp af tekniske signaler. Det leder efter:

- Usædvanlige logins og forsøg på at overtage en konto
- Konti oprettet for at komme i kontakt med et bestemt barn
- Forsøg på at få adgang, man ikke skal have
- Svindel med brugerkonti

Når en udløser går i gang:

1. **Alarm.** Abuse Central opretter en alarm for sagen.
2. **Gennemgang.** En person i vores team gennemgår de tekniske detaljer. Hvert opslag bliver kontrolleret.
3. **Undersøgelse.** Er der grund til det, undersøges sagen efter de samme protokoller som de danske myndigheder bruger.
4. **Anden gennemgang.** En anden, erfaren medarbejder godkender, før en sag anmeldes, en konto udelukkes eller en forælders adgang fjernes.
5. **Overdragelse.** Bekræftede ulovlige sager overdrages til politiet og følges, til de er lukket.

## 12. Samarbejde med myndighederne

I en bekræftet ulovlig sag overdrager vi de oplysninger, politiet har brug for: kontooplysninger, enhedsoplysninger, IP-adresser og de relevante medier. Vi følger hver sag, til den er lukket. Vi overdrager ikke data uden en bekræftet sag eller en retlig anmodning.

## 13. Tjenester, vi bruger

| Tjeneste | Hvad til | Hvad den modtager |
| --- | --- | --- |
| Hetzner (Tyskland) | Hosting og lagring | De gemte data, krypteret som beskrevet ovenfor |
| QuickPay | Kortbetalinger | Betalingsoplysninger. KINND gemmer aldrig fulde kortnumre. |
| Brevo | E-mail og sms | Navn, e-mailadresse, telefonnummer |
| Google og Microsoft | Login, hvis du vælger det | Dit login hos dem |
| Browserens push-tjenester | Notifikationer på din enhed | En krypteret notifikation |
| Have I Been Pwned | Tjek af, at en ny adgangskode ikke er lækket | De første 5 tegn af et hash af adgangskoden, aldrig selve adgangskoden |

## 14. Det gør vi ikke

- Vi bruger ikke end-to-end-kryptering. Det er det, der gør, at vi kan opdage misbrug og hjælpe dig med at få din konto tilbage.
- Vi viser ikke reklamer.
- Vi sælger og deler ikke familiens data til markedsføring.
- Vi tager ikke parti i familiekonflikter.

## 15. Anmeld et sikkerhedsproblem

Har du fundet en sårbarhed, eller er du bekymret for en konto? Skriv til <support@kinnd.eu>.
