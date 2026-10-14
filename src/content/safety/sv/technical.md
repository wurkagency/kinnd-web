---
updated: "Senast uppdaterad: 14 oktober 2026"
---

## 1. Översikt

KINND är byggt för några av de mest känsliga uppgifter en familj har. Den här sidan förklarar, i tekniska detaljer, hur appen och vårt interna administrationssystem skyddar dem. För den korta versionen, se [Säkerhet och integritet](/sv/safety/).

## 2. Kryptering vid lagring

Känsligt innehåll krypteras innan det skrivs till lagringen, med AES-256-GCM. Det är autentiserad kryptering: den upptäcker också om data har manipulerats.

| Data | Kryptering | Nyckel |
| --- | --- | --- |
| Bilder och videor | AES-256-GCM | En egen nyckel per fil, låst med en huvudnyckel |
| Meddelanden | AES-256-GCM, fält för fält | En innehållsnyckel som KINND har, knuten till varje fält |
| Hälsouppgifter | AES-256-GCM, fält för fält | En innehållsnyckel som KINND har, knuten till varje fält |
| Kalender, uppgifter, listor och uppgifter om barnet | AES-256-GCM, fält för fält | En innehållsnyckel som KINND har, knuten till varje fält |

Tekniska fält som id, datum och roller krypteras inte, så att appen kan sortera och kontrollera åtkomst. Eftersom KINND har nycklarna är detta inte end-to-end-kryptering (se avsnitt 14).

## 3. Kryptering vid överföring

All trafik mellan din enhet och KINND använder TLS 1.3. Webbläsare uppmanas att alltid ansluta via HTTPS (HSTS).

## 4. Nyckelhantering

Krypteringsnycklar lagras skilt från de data de skyddar. En kopia av bara databasen eller de lagrade mediefilerna kan inte dekrypteras.

## 5. Inloggning och sessioner

- Inloggning i två steg är obligatorisk när du loggar in med lösenord och kan inte stängas av.
- Loggar du in med lösenord behövs alltid en 6-siffrig engångskod, som skickas via e-post eller sms. En kod gäller i 10 minuter och tillåter 5 försök.
- Loggar du in med Google eller Microsoft skyddar deras inloggning ditt konto.
- Lösenord lagras aldrig i läsbar form. Vi lagrar en bcrypt-hash.
- Sessioner upphör efter 90 dagar utan aktivitet. Väljer du inte att förbli inloggad upphör sessionen när du stänger webbläsaren.

## 6. Åtkomst i appen

- Åtkomst ges per barn och per roll. Varje vuxen ser bara det som deras relation till barnet tillåter.
- Åtkomst kontrolleras i appen och en gång till i databasen.
- Föräldrar bjuder in den andra föräldern och familjemedlemmar, och kan när som helst ta bort en familjemedlem.
- Inbjudna familjemedlemmar ser bara det som delas med dem. Hälsouppgifter syns för föräldrar, och för andra vuxna bara om en förälder ger dem åtkomst.
- Radering av ett konto bekräftas via en länk som skickas med e-post och gäller i 24 timmar.
- Ett barns data raderas bara när alla föräldrar är överens. De kan återställas i 30 dagar, sedan raderas de permanent.

## 7. Bilder, videor och plats

- Original lagras krypterade, så som de laddades upp, så att de kan laddas ner i full kvalitet.
- Plats i en bilds metadata (EXIF) förseglas med en separat nyckel som bara vårt administrationssystem kan öppna. Den används bara vid utredningar av missbruk.
- Platsdata tas bort från varje kopia som andra familjemedlemmar laddar ner. Den som laddade upp en bild kan ladda ner sitt eget original oförändrat.

## 8. Var data lagras

Alla data, även säkerhetskopior, lagras inom EU, hos Hetzner i Tyskland. Säkerhetskopior krypteras på samma sätt som aktuella data och sparas i 90 dagar.

## 9. Lagringstid och radering

| Data | Sparas i |
| --- | --- |
| Ditt innehåll | Tills du raderar det eller ditt konto |
| Säkerhetskopior | 90 dagar |
| Tekniska data (IP-adresser, enhetsinformation, inloggningshistorik) | 1 år, för att upptäcka och anmäla missbruk |
| Ett barns utrymme efter att ett abonnemang upphört utan betalning | Döljs och raderas sedan 90 dagar efter att abonnemanget löpt ut. Ditt konto finns kvar. Vi meddelar dig 90, 60 och 7 dagar innan. |

## 10. Administrationssystemet

- Vårt team arbetar i ett separat administrationssystem, inte i appen.
- Medarbetare loggar in med flerfaktorsautentisering, och åtkomsten är rollbaserad. Varje roll ser bara det den behöver.
- Varje visning av ett ärende, ett larm eller media loggas med vem, vad och när, och granskas.

## 11. Abuse Central

Abuse Central är ett avancerat system av utlösare och mönster som håller utkik efter missbruk dygnet runt, med hjälp av tekniska signaler. Det letar efter:

- Ovanliga inloggningar och försök att ta över ett konto
- Konton som skapats för att nå ett visst barn
- Försök att få åtkomst som någon inte borde ha
- Bedrägerier mot användarkonton

När en utlösare slår till:

1. **Larm.** Abuse Central skapar ett larm för ärendet.
2. **Granskning.** En person i vårt team granskar de tekniska detaljerna. Varje visning granskas.
3. **Utredning.** Finns det skäl utreds ärendet enligt samma rutiner som de danska myndigheterna följer.
4. **Andra granskning.** Ytterligare en erfaren granskare godkänner innan ett ärende anmäls, ett konto stängs av eller en förälders åtkomst tas bort.
5. **Överlämning.** Bekräftade olagliga fall lämnas till polisen och följs tills de är avslutade.

## 12. Samarbete med myndigheterna

I ett bekräftat olagligt fall lämnar vi över den information polisen behöver: kontouppgifter, enhetsinformation, IP-adresser och relevanta mediefiler. Vi följer varje ärende tills det är avslutat. Vi lämnar inte ut data utan ett bekräftat fall eller en rättslig begäran.

## 13. Tjänster vi använder

| Tjänst | Till vad | Vad den får |
| --- | --- | --- |
| Hetzner (Tyskland) | Drift och lagring | De lagrade data, krypterade som beskrivs ovan |
| QuickPay | Kortbetalningar | Betalningsuppgifter. KINND sparar aldrig fullständiga kortnummer. |
| Brevo | E-post och sms | Namn, e-postadress, telefonnummer |
| Google och Microsoft | Inloggning, om du väljer det | Din inloggning hos dem |
| Webbläsarnas push-tjänster | Notiser på din enhet | En krypterad notis |
| Have I Been Pwned | Kontroll av att ett nytt lösenord inte har läckt | De första 5 tecknen i en hash av lösenordet, aldrig själva lösenordet |

## 14. Det här gör vi inte

- Vi använder inte end-to-end-kryptering. Det är det som gör att vi kan upptäcka missbruk och hjälpa dig att återfå ditt konto.
- Vi visar inte reklam.
- Vi säljer eller delar inte familjers data för marknadsföring.
- Vi tar inte ställning i familjekonflikter.

## 15. Rapportera ett säkerhetsproblem

Har du hittat en sårbarhet, eller är du orolig för ett konto? Skriv till <support@kinnd.eu>.
