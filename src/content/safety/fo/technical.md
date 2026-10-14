---
updated: "Seinast dagført: 14. oktober 2026"
---

## 1. Yvirlit

KINND er gjørt til nakrar av teimum viðkvæmastu dátunum, ein familja hevur. Henda síðan greiðir frá, í tøkniligum smálutum, hvussu appin og okkara innanhýsis stýrisskipan verja tær. Stytta útgávan er á [Trygd og privatlív](/fo/safety/).

## 2. Bronglan í goymslu

Viðkvæmt innihald verður bronglað, áðrenn tað verður skrivað í goymsluna, við AES-256-GCM. Hetta er váttað bronglan: hon varnast eisini, um nakar hevur fingist við dáturnar.

| Dátur | Bronglan | Lykil |
| --- | --- | --- |
| Myndir og video | AES-256-GCM | Egin lykil til hvørja fílu, læstur við einum høvuðslykli |
| Boð | AES-256-GCM, teig fyri teig | Ein innihaldslykil, sum KINND hevur, bundin at hvørjum teigi |
| Heilsuupplýsingar | AES-256-GCM, teig fyri teig | Ein innihaldslykil, sum KINND hevur, bundin at hvørjum teigi |
| Kalendari, uppgávur, listar og upplýsingar um barnið | AES-256-GCM, teig fyri teig | Ein innihaldslykil, sum KINND hevur, bundin at hvørjum teigi |

Tøkniligir teigar, so sum ID, dagfestingar og leiklutir, eru ikki bronglaðir, so appin kann skipa og kanna atgongd. Av tí at KINND hevur lyklarnar, er hetta ikki enda-til-enda-bronglan (sí brot 14).

## 3. Bronglan undir sending

Øll ferðsla millum tína eind og KINND brúkar TLS 1.3. Kagarnir fáa boð um altíð at knýta seg í samband gjøgnum HTTPS (HSTS).

## 4. Lyklastýring

Bronglanarlyklar verða goymdir burtur frá teimum dátum, teir verja. Eitt avrit av dátugrunninum ella av goymdu miðlunum einsamalt kann ikki avbronglast.

## 5. Innritan og setur

- Innritan í tveimum stigum er kravd, tá ið tú ritar inn við loyniorði, og kann ikki sløkkjast.
- Innritan við loyniorði krevur altíð eina 6-sifraða eingangskodu, senda við telduposti ella SMS. Ein koda er galdandi í 10 minuttir og loyvir 5 royndum.
- Ritar tú inn við Google ella Microsoft, verjir innritanin hjá teimum kontu tína.
- Loyniorð verða ongantíð goymd í lesiligum líki. Vit goyma eitt bcrypt-hash.
- Setur enda eftir 90 dagar uttan virksemi. Velur tú ikki at verða verandi innritað/ur, endar setan, tá ið tú letur kagan aftur.

## 6. Atgongd inni í appini

- Atgongd verður givin fyri hvørt barn og fyri hvønn leiklut. Hvør vaksin sær bert tað, sum sambandið við barnið loyvir.
- Atgongd verður kannað í appini og aftur í dátugrunninum.
- Foreldur bjóða hinum foreldrinum og familjulimum, og kunnu taka ein familjulim burtur nær sum helst.
- Bodnir familjulimir síggja bert tað, sum er deilt við tey. Heilsuupplýsingar eru sjónligar fyri foreldrum, og fyri øðrum vaksnum bert, um eitt foreldur gevur teimum atgongd.
- Strikan av eini kontu verður váttað gjøgnum eitt leinki, sent við telduposti, sum er galdandi í 24 tímar.
- Dátur hjá einum barni verða bert strikaðar, tá ið øll foreldrini eru samd. Tær kunnu endurskapast í 30 dagar, síðan verða tær strikaðar endaliga.

## 7. Myndir, video og staðseting

- Upprunafílur verða goymdar bronglaðar, sum tær vóru lagdar upp, so tær kunnu takast niður í fullari góðsku.
- Staðseting í metadátunum hjá eini mynd (EXIF) verður innsiglað við einum serstøkum lykli, sum bert okkara stýrisskipan kann lata upp. Hon verður bert brúkt í kanningum av misnýtslu.
- Staðsetingardátur verða strikaðar úr hvørjum avriti, sum aðrir familjulimir taka niður. Tann, sum legði eina mynd upp, kann taka sína egnu upprunafílu niður óbroytta.

## 8. Hvar dátur verða goymdar

Allar dátur, eisini trygdaravrit, verða goymdar í ES, hjá Hetzner í Týsklandi. Trygdaravrit eru bronglað á sama hátt sum virknar dátur og verða goymd í 90 dagar.

## 9. Goymslutíð og strikan

| Dátur | Goymt í |
| --- | --- |
| Títt innihald | Til tú strikar tað ella kontu tína |
| Trygdaravrit | 90 dagar |
| Tøkniligar dátur (IP-adressur, upplýsingar um eindir, innritanarsøga) | 1 ár, fyri at finna og boða frá misnýtslu |
| Økið hjá einum barni, eftir at ein hald endar uttan gjald | Fjalt, síðan strikað 90 dagar eftir, at haldið er útgingið. Kontan hjá tær verður verandi. Vit geva boð 90, 60 og 7 dagar frammanundan. |

## 10. Stýrisskipanin

- Toymið hjá okkum arbeiðir í eini serstakari stýrisskipan, ikki í appini.
- Starvsfólk rita inn við fleirstigs samgildi, og atgongd er grundað á leiklutir. Hvør leiklutur sær bert tað, hann hevur brúk fyri.
- Hvørt innlit í eitt mál, eina ávaring ella miðlar verður skrásett, hvør, hvat og nær, og eftirkannað.

## 11. Abuse Central

Abuse Central er ein samansett skipan av útloysarum og mynstrum, sum ansar eftir misnýtslu alt samdøgrið við tøkniligum signalum. Hon leitar eftir:

- Óvanligum innritanum og royndum at taka yvir eina kontu
- Kontum stovnaðum fyri at náa einum ávísum barni
- Royndum at fáa atgongd, sum onkur ikki skal hava
- Svikum á brúkarakontum

Tá ið ein útloysari fer í gongd:

1. **Ávaring.** Abuse Central setur eina ávaring í gongd fyri málið.
2. **Eftirkanning.** Ein persónur í toyminum hjá okkum kannar tøkniligu upplýsingarnar. Hvørt innlit verður eftirkannað.
3. **Kanning.** Er grundarlag fyri tí, verður málið kannað eftir somu mannagongdum sum hjá donsku myndugleikunum.
4. **Onnur eftirkanning.** Ein annar kannari á hægri stigi góðkennir, áðrenn eitt mál verður fráboðað, ein konta verður bannað, ella atgongdin hjá einum foreldri verður tikin burtur.
5. **Handan.** Váttað ólóglig mál verða latin løgregluni og fylgd, til tey eru avgreidd.

## 12. Samstarv við myndugleikarnar

Í einum váttaðum ólógligum máli lata vit tær upplýsingar, sum løgreglan hevur brúk fyri: kontuupplýsingar, upplýsingar um eindir, IP-adressur og viðkomandi miðlar. Vit fylgja hvørjum máli, til tað er avgreitt. Vit lata ikki dátur uttan eitt váttað mál ella eina løgfrøðiliga áheitan.

## 13. Tænastur, vit brúka

| Tænasta | Til hvat | Hvat hon fær |
| --- | --- | --- |
| Hetzner (Týskland) | Hýsing og goymsla | Goymdu dáturnar, bronglaðar sum lýst omanfyri |
| QuickPay | Kortgjald | Gjaldsupplýsingar. KINND goymir ongantíð full kortnummur. |
| Brevo | Teldupostur og SMS | Navn, teldupostadressa, telefonnummar |
| Google og Microsoft | Innritan, um tú velur tað | Tína innritan hjá teimum |
| Push-tænastur hjá kagum | Fráboðanir á tíni eind | Eina bronglaða fráboðan |
| Have I Been Pwned | At kanna, at eitt nýtt loyniorð ikki er lekt | Teir fyrstu 5 teknini í einum hash av loyniorðinum, ongantíð loyniorðið |

## 14. Hvat vit ikki gera

- Vit brúka ikki enda-til-enda-bronglan. Tað er hetta, sum ger, at vit kunnu varnast misnýtslu og hjálpa tær at fáa kontu tína aftur.
- Vit vísa ikki lýsingar.
- Vit selja ikki og deila ikki familjudátur til marknaðarføring.
- Vit taka ikki støðu í familjuósemjum.

## 15. Boða frá einum trygdartrupulleika

Hevur tú funnið ein veikleika, ella stúrir tú fyri eini kontu? Skriva til <support@kinnd.eu>.
