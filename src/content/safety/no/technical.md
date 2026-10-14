---
updated: "Sist oppdatert: 14. oktober 2026"
---

## 1. Oversikt

KINND er bygget for noen av de mest sensitive dataene en familie har. Denne siden forklarer i teknisk detalj hvordan appen og det interne styringssystemet vårt beskytter dem. For den korte versjonen, se [Sikkerhet og personvern](/no/safety/).

## 2. Kryptering ved lagring

Sensitivt innhold krypteres med AES-256-GCM før det skrives til lagring. Dette er autentisert kryptering: den oppdager også om data har blitt manipulert.

| Data | Kryptering | Nøkkel |
| --- | --- | --- |
| Bilder og videoer | AES-256-GCM | En egen nøkkel per fil, låst med en hovednøkkel |
| Meldinger | AES-256-GCM, felt for felt | En innholdsnøkkel som KINND har, knyttet til hvert felt |
| Helseopplysninger | AES-256-GCM, felt for felt | En innholdsnøkkel som KINND har, knyttet til hvert felt |
| Kalender, oppgaver, lister og opplysninger om barnet | AES-256-GCM, felt for felt | En innholdsnøkkel som KINND har, knyttet til hvert felt |

Tekniske felt som ID-er, datoer og roller er ikke kryptert, slik at appen kan sortere og sjekke tilgang. Fordi KINND har nøklene, er dette ikke ende-til-ende-kryptering (se punkt 14).

## 3. Kryptering under overføring

All trafikk mellom enheten din og KINND bruker TLS 1.3. Nettlesere får beskjed om alltid å koble til over HTTPS (HSTS).

## 4. Nøkkelhåndtering

Krypteringsnøkler lagres adskilt fra dataene de beskytter. En kopi av databasen eller de lagrede mediene alene kan ikke dekrypteres.

## 5. Innlogging og økter

- Innlogging i to trinn er obligatorisk når du logger inn med passord, og kan ikke slås av.
- Innlogging med passord krever alltid en 6-sifret engangskode, sendt på e-post eller SMS. En kode er gyldig i 10 minutter og gir 5 forsøk.
- Logger du inn med Google eller Microsoft, er det deres innlogging som beskytter kontoen din.
- Passord lagres aldri i lesbar form. Vi lagrer en bcrypt-hash.
- Økter avsluttes etter 90 dager uten aktivitet. Velger du ikke å forbli innlogget, avsluttes økten når du lukker nettleseren.

## 6. Tilgang i appen

- Tilgang gis per barn og per rolle. Hver voksen ser bare det relasjonen deres til barnet tillater.
- Tilgang sjekkes i appen og på nytt i databasen.
- Foreldre inviterer den andre forelderen og familiemedlemmer, og kan fjerne et familiemedlem når som helst.
- Inviterte familiemedlemmer ser bare det som deles med dem. Helseopplysninger er synlige for foreldre, og for andre voksne bare hvis en forelder gir dem tilgang.
- Sletting av en konto bekreftes via en lenke sendt på e-post, gyldig i 24 timer.
- Et barns data slettes bare når alle foreldrene er enige. De kan gjenopprettes i 30 dager, deretter slettes de permanent.

## 7. Bilder, videoer og posisjon

- Originaler lagres kryptert, slik de ble lastet opp, så de kan lastes ned i full kvalitet.
- Posisjon i et bildes metadata (EXIF) forsegles med en egen nøkkel som bare styringssystemet vårt kan åpne. Den brukes bare i undersøkelser av misbruk.
- Posisjonsdata fjernes fra hver kopi som andre familiemedlemmer laster ned. Den som lastet opp et bilde, kan laste ned sin egen original uendret.

## 8. Hvor data lagres

Alle data, inkludert sikkerhetskopier, lagres i EU, hos Hetzner i Tyskland. Sikkerhetskopier krypteres på samme måte som data i bruk og lagres i 90 dager.

## 9. Lagring og sletting

| Data | Lagres i |
| --- | --- |
| Innholdet ditt | Til du sletter det eller kontoen din |
| Sikkerhetskopier | 90 dager |
| Tekniske data (IP-adresser, enhetsinformasjon, innloggingshistorikk) | 1 år, for å oppdage og rapportere misbruk |
| Et barns område etter at et abonnement avsluttes uten betaling | Skjules, og slettes deretter 90 dager etter at abonnementet utløper. Kontoen din beholdes. Vi varsler 90, 60 og 7 dager før. |

## 10. Styringssystemet

- Teamet vårt arbeider i et eget styringssystem, ikke i appen.
- Ansatte logger inn med flerfaktorautentisering, og tilgangen er rollebasert. Hver rolle ser bare det den trenger.
- Hvert innsyn i en sak, en alarm eller medier logges med hvem, hva og når, og kontrolleres.

## 11. Abuse Central

Abuse Central er et komplekst system av utløsere og mønstre som holder øye med misbruk døgnet rundt, ved hjelp av tekniske signaler. Det ser etter:

- Uvanlige innlogginger og forsøk på å overta en konto
- Kontoer opprettet for å komme i kontakt med et bestemt barn
- Forsøk på å få tilgang noen ikke skal ha
- Svindel på brukerkontoer

Når en utløser slår til:

1. **Alarm.** Abuse Central utløser en alarm for saken.
2. **Gjennomgang.** Et menneske i teamet vårt går gjennom de tekniske detaljene. Hvert innsyn kontrolleres.
3. **Undersøkelse.** Er det grunnlag, undersøkes saken etter de samme protokollene som danske myndigheter følger.
4. **Ny gjennomgang.** En annen, erfaren kontrollør godkjenner før en sak rapporteres, en konto utestenges eller en forelders tilgang fjernes.
5. **Overlevering.** Bekreftede ulovlige saker overleveres til politiet og følges til de er avsluttet.

## 12. Samarbeid med myndighetene

I en bekreftet ulovlig sak overleverer vi opplysningene politiet trenger: kontoopplysninger, enhetsinformasjon, IP-adresser og relevante medier. Vi følger hver sak til den er avsluttet. Vi overleverer ikke data uten en bekreftet sak eller en rettslig anmodning.

## 13. Tjenester vi bruker

| Tjeneste | Hva for | Hva den mottar |
| --- | --- | --- |
| Hetzner (Tyskland) | Drift og lagring | De lagrede dataene, kryptert som beskrevet ovenfor |
| QuickPay | Kortbetalinger | Betalingsopplysninger. KINND lagrer aldri fullstendige kortnumre. |
| Brevo | E-post og SMS | Navn, e-postadresse, telefonnummer |
| Google og Microsoft | Innlogging, hvis du velger det | Innloggingen din hos dem |
| Push-tjenester i nettleseren | Varsler på enheten din | Et kryptert varsel |
| Have I Been Pwned | Sjekke at et nytt passord ikke har lekket | De første 5 tegnene i en hash av passordet, aldri passordet |

## 14. Hva vi ikke gjør

- Vi bruker ikke ende-til-ende-kryptering. Det er dette som gjør at vi kan oppdage misbruk og hjelpe deg med å gjenopprette kontoen din.
- Vi viser ikke reklame.
- Vi selger eller deler ikke familiedata til markedsføring.
- Vi tar ikke parti i familiekonflikter.

## 15. Rapporter et sikkerhetsproblem

Har du funnet en sårbarhet, eller er du bekymret for en konto? Skriv til <support@kinnd.eu>.
