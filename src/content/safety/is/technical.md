---
updated: "Síðast uppfært: 14. október 2026"
---

## 1. Yfirlit

KINND er byggt fyrir einhver viðkvæmustu gögn sem fjölskylda á. Þessi síða útskýrir í tæknilegum smáatriðum hvernig appið og innra stjórnkerfið okkar vernda þau. Styttri útgáfu finnurðu á [Öryggi og persónuvernd](/is/safety/).

## 2. Dulkóðun í geymslu

Viðkvæmt efni er dulkóðað með AES-256-GCM áður en það er skrifað í geymslu. Þetta er sannvottuð dulkóðun: hún greinir líka ef átt hefur verið við gögnin.

| Gögn | Dulkóðun | Lykill |
| --- | --- | --- |
| Myndir og myndbönd | AES-256-GCM | Eigin lykill fyrir hverja skrá, læstur með aðallykli |
| Skilaboð | AES-256-GCM, reit fyrir reit | Efnislykill í vörslu KINND, bundinn hverjum reit |
| Heilsufarsupplýsingar | AES-256-GCM, reit fyrir reit | Efnislykill í vörslu KINND, bundinn hverjum reit |
| Dagatal, verkefni, listar og upplýsingar um barn | AES-256-GCM, reit fyrir reit | Efnislykill í vörslu KINND, bundinn hverjum reit |

Tæknilegir reitir eins og auðkenni, dagsetningar og hlutverk eru ekki dulkóðaðir, svo appið geti raðað og athugað aðgang. Þar sem KINND geymir lyklana er þetta ekki enda-til-enda dulkóðun (sjá kafla 14).

## 3. Dulkóðun á leiðinni

Öll umferð milli tækisins þíns og KINND notar TLS 1.3. Vöfrum er sagt að tengjast alltaf um HTTPS (HSTS).

## 4. Lyklaumsýsla

Dulkóðunarlyklar eru geymdir aðskildir frá gögnunum sem þeir vernda. Ekki er hægt að afkóða afrit af gagnagrunninum eða geymdum miðlum eitt og sér.

## 5. Innskráning og lotur

- Tveggja þrepa innskráning er skylda þegar þú skráir þig inn með lykilorði og ekki er hægt að slökkva á henni.
- Innskráning með lykilorði krefst alltaf 6 stafa einnota kóða sem er sendur með tölvupósti eða SMS. Kóði gildir í 10 mínútur og leyfir 5 tilraunir.
- Ef þú skráir þig inn með Google eða Microsoft verndar innskráning þeirra reikninginn þinn.
- Lykilorð eru aldrei geymd á læsilegu formi. Við geymum bcrypt-tætigildi.
- Lotur renna út eftir 90 daga án virkni. Ef þú velur ekki að vera áfram innskráð(ur) lýkur lotunni þegar þú lokar vafranum.

## 6. Aðgangur í appinu

- Aðgangur er veittur fyrir hvert barn og eftir hlutverki. Hver fullorðinn sér aðeins það sem tengsl hans við barnið leyfa.
- Aðgangur er athugaður í appinu og aftur í gagnagrunninum.
- Foreldrar bjóða hinu foreldrinu og fjölskyldumeðlimum og geta fjarlægt fjölskyldumeðlim hvenær sem er.
- Fjölskyldumeðlimir sem er boðið sjá aðeins það sem er deilt með þeim. Heilsufarsupplýsingar eru sýnilegar foreldrum, og öðrum fullorðnum aðeins ef foreldri veitir þeim aðgang.
- Eyðing reiknings er staðfest með hlekk sem er sendur með tölvupósti og gildir í 24 klukkustundir.
- Gögnum barns er aðeins eytt þegar allir foreldrar eru sammála. Hægt er að endurheimta þau í 30 daga, síðan er þeim eytt varanlega.

## 7. Myndir, myndbönd og staðsetning

- Frumrit eru geymd dulkóðuð, eins og þeim var hlaðið upp, svo hægt sé að sækja þau í fullum gæðum.
- Staðsetning í lýsigögnum myndar (EXIF) er innsigluð með sérstökum lykli sem aðeins stjórnkerfið okkar getur opnað. Hún er aðeins notuð við rannsóknir á misnotkun.
- Staðsetningargögn eru fjarlægð úr hverju afriti sem aðrir fjölskyldumeðlimir sækja. Sá sem hlóð upp mynd getur sótt eigið frumrit óbreytt.

## 8. Hvar gögn eru geymd

Öll gögn, þar á meðal afrit, eru geymd innan ESB, hjá Hetzner í Þýskalandi. Afrit eru dulkóðuð á sama hátt og virk gögn og geymd í 90 daga.

## 9. Varðveisla og eyðing

| Gögn | Geymd í |
| --- | --- |
| Efnið þitt | Þar til þú eyðir því eða reikningnum þínum |
| Afrit | 90 daga |
| Tæknileg gögn (IP-tölur, upplýsingar um tæki, innskráningarsaga) | 1 ár, til að greina og tilkynna misnotkun |
| Svæði barns eftir að áskrift lýkur án greiðslu | Falið, síðan eytt 90 dögum eftir að áskriftin rennur út. Reikningurinn þinn er áfram til. Við látum vita 90, 60 og 7 dögum áður. |

## 10. Stjórnkerfið

- Teymið okkar vinnur í sérstöku stjórnkerfi, ekki í appinu.
- Starfsfólk skráir sig inn með fjölþátta auðkenningu og aðgangur fer eftir hlutverkum. Hvert hlutverk sér aðeins það sem það þarf.
- Hver skoðun á máli, viðvörun eða miðli er skráð, hver, hvað og hvenær, og endurskoðuð.

## 11. Abuse Central

Abuse Central er flókið kerfi kveikja og mynstra sem fylgist með misnotkun allan sólarhringinn og notar tæknileg merki. Það leitar að:

- Óvenjulegum innskráningum og tilraunum til að taka yfir reikning
- Reikningum sem eru stofnaðir til að ná til tiltekins barns
- Tilraunum til að fá aðgang sem viðkomandi á ekki að hafa
- Svikum á notendareikningum

Þegar kveikja fer í gang:

1. **Viðvörun.** Abuse Central gefur út viðvörun um mál.
2. **Yfirferð.** Manneskja í teyminu okkar fer yfir tæknilegu upplýsingarnar. Hver skoðun er endurskoðuð.
3. **Rannsókn.** Ef ástæða er til er málið rannsakað samkvæmt sömu verklagsreglum og dönsk yfirvöld fylgja.
4. **Önnur yfirferð.** Annar, reyndari starfsmaður samþykkir áður en mál er tilkynnt, reikningi er lokað eða aðgangur foreldris er fjarlægður.
5. **Afhending.** Staðfest ólögleg mál eru afhent lögreglu og fylgt eftir þar til þeim er lokað.

## 12. Samstarf við yfirvöld

Í staðfestu ólöglegu máli afhendum við þær upplýsingar sem lögreglan þarf: reikningsupplýsingar, upplýsingar um tæki, IP-tölur og viðeigandi miðla. Við fylgjum hverju máli þar til því er lokað. Við afhendum ekki gögn án staðfests máls eða lagalegrar beiðni.

## 13. Þjónustur sem við notum

| Þjónusta | Til hvers | Hvað hún fær |
| --- | --- | --- |
| Hetzner (Þýskalandi) | Hýsing og geymsla | Geymdu gögnin, dulkóðuð eins og lýst er hér að ofan |
| QuickPay | Kortagreiðslur | Greiðsluupplýsingar. KINND geymir aldrei full kortanúmer. |
| Brevo | Tölvupóstur og SMS | Nafn, netfang, símanúmer |
| Google og Microsoft | Innskráning, ef þú velur hana | Innskráningu þína hjá þeim |
| Tilkynningaþjónustur vafra | Tilkynningar í tækinu þínu | Dulkóðaða tilkynningu |
| Have I Been Pwned | Að athuga að nýtt lykilorð hafi ekki lekið | Fyrstu 5 stafina í tætigildi lykilorðsins, aldrei lykilorðið |

## 14. Það sem við gerum ekki

- Við notum ekki enda-til-enda dulkóðun. Það er þetta sem gerir okkur kleift að greina misnotkun og hjálpa þér að endurheimta reikninginn þinn.
- Við birtum ekki auglýsingar.
- Við seljum hvorki né deilum gögnum fjölskyldna í markaðsskyni.
- Við tökum ekki afstöðu í fjölskyldudeilum.

## 15. Tilkynna öryggisvandamál

Fannstu veikleika, eða hefurðu áhyggjur af reikningi? Skrifaðu á <support@kinnd.eu>.
