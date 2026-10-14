---
updated: "Son güncelleme: 14 Ekim 2026"
---

## 1. Genel bakış

KINND, bir ailenin sahip olduğu en hassas verilerin bazıları için yapıldı. Bu sayfa, uygulamanın ve iç yönetim sistemimizin bu verileri nasıl koruduğunu teknik ayrıntılarıyla anlatır. Kısa özet için [Güvenlik ve gizlilik](/tr/safety/) sayfasına bak.

## 2. Saklanırken şifreleme

Hassas içerik, depolamaya yazılmadan önce AES-256-GCM ile şifrelenir. Bu, kimlik doğrulamalı bir şifrelemedir: verilerle oynanıp oynanmadığını da tespit eder.

| Veri | Şifreleme | Anahtar |
| --- | --- | --- |
| Fotoğraflar ve videolar | AES-256-GCM | Her dosyanın kendi anahtarı, bir ana anahtarla kilitlenir |
| Mesajlar | AES-256-GCM, alan alan | KINND'de tutulan, her alana bağlı bir içerik anahtarı |
| Sağlık bilgileri | AES-256-GCM, alan alan | KINND'de tutulan, her alana bağlı bir içerik anahtarı |
| Takvim, görevler, listeler ve çocuk bilgileri | AES-256-GCM, alan alan | KINND'de tutulan, her alana bağlı bir içerik anahtarı |

Kimlikler, tarihler ve roller gibi teknik alanlar şifrelenmez. Böylece uygulama sıralama yapabilir ve erişimi kontrol edebilir. Anahtarlar KINND'de tutulduğu için bu, uçtan uca şifreleme değildir (bkz. bölüm 14).

## 3. İletilirken şifreleme

Cihazınla KINND arasındaki tüm trafik TLS 1.3 kullanır. Tarayıcılara her zaman HTTPS üzerinden bağlanmaları söylenir (HSTS).

## 4. Anahtar yönetimi

Şifreleme anahtarları, korudukları verilerden ayrı saklanır. Veritabanının ya da saklanan medyanın tek başına bir kopyasının şifresi çözülemez.

## 5. Giriş ve oturumlar

- Parolayla girişte iki adımlı giriş zorunludur ve kapatılamaz.
- Parolayla giriş her zaman e-posta ya da SMS ile gönderilen 6 haneli, tek kullanımlık bir kod gerektirir. Bir kod 10 dakika geçerlidir ve 5 denemeye izin verir.
- Google ya da Microsoft ile giriş yaparsan, hesabını onların giriş sistemi korur.
- Parolalar asla okunabilir biçimde saklanmaz. Bir bcrypt özeti (hash) saklarız.
- Oturumlar 90 gün hareketsizlikten sonra sona erer. Oturumu açık tutmayı seçmezsen, tarayıcıyı kapattığında oturum sona erer.

## 6. Uygulama içinde erişim

- Erişim çocuk bazında ve rol bazında verilir. Her yetişkin yalnızca çocukla ilişkisinin izin verdiğini görür.
- Erişim uygulamada ve ardından veritabanında yeniden kontrol edilir.
- Ebeveynler diğer ebeveyni ve aile üyelerini davet eder ve bir aile üyesini istedikleri zaman çıkarabilir.
- Davet edilen aile üyeleri yalnızca kendileriyle paylaşılanı görür. Sağlık bilgilerini ebeveynler görür. Diğer yetişkinler ise yalnızca bir ebeveyn onlara erişim verirse görür.
- Hesap silme, e-postayla gönderilen ve 24 saat geçerli bir bağlantıyla onaylanır.
- Bir çocuğun verileri yalnızca tüm ebeveynler kabul ettiğinde silinir. Veriler 30 gün boyunca geri yüklenebilir, sonra kalıcı olarak silinir.

## 7. Fotoğraflar, videolar ve konum

- Orijinaller yüklendikleri haliyle şifreli olarak saklanır. Böylece tam kalitede indirilebilirler.
- Bir fotoğrafın meta verilerindeki (EXIF) konum, yalnızca yönetim sistemimizin açabildiği ayrı bir anahtarla mühürlenir. Yalnızca kötüye kullanım soruşturmalarında kullanılır.
- Diğer aile üyelerinin indirdiği her kopyadan konum verisi kaldırılır. Fotoğrafı yükleyen kişi kendi orijinalini değiştirilmemiş haliyle indirebilir.

## 8. Verilerin saklandığı yer

Yedekler dahil tüm veriler AB'de, Almanya'da Hetzner'de saklanır. Yedekler canlı verilerle aynı şekilde şifrelenir ve 90 gün saklanır.

## 9. Saklama ve silme

| Veri | Saklama süresi |
| --- | --- |
| İçeriğin | Sen onu ya da hesabını silene kadar |
| Yedekler | 90 gün |
| Teknik veriler (IP adresleri, cihaz bilgileri, giriş geçmişi) | 1 yıl, kötüye kullanımı tespit etmek ve bildirmek için |
| Abonelik ödeme yapılmadan sona erdikten sonra bir çocuğun alanı | Gizlenir, sonra abonelik bittikten 90 gün sonra silinir. Hesabın silinmez. 90, 60 ve 7 gün önceden haber veririz. |

## 10. Yönetim sistemi

- Ekibimiz uygulamada değil, ayrı bir yönetim sisteminde çalışır.
- Çalışanlar çok faktörlü kimlik doğrulamayla giriş yapar ve erişim role dayalıdır. Her rol yalnızca ihtiyaç duyduğunu görür.
- Bir vakanın, bir alarmın ya da medyanın her görüntülenmesi; kimin, neyi, ne zaman gördüğüyle birlikte kaydedilir ve denetlenir.

## 11. Abuse Central

Abuse Central, teknik sinyalleri kullanarak kötüye kullanıma karşı günün her saati tetikte olan karmaşık bir tetikleyici ve örüntü sistemidir. Şunları arar:

- Olağandışı girişler ve bir hesabı ele geçirme girişimleri
- Belirli bir çocuğa ulaşmak için açılan hesaplar
- Birinin sahip olmaması gereken erişimi elde etme girişimleri
- Kullanıcı hesaplarında dolandırıcılık

Bir tetikleyici devreye girdiğinde:

1. **Alarm.** Abuse Central bir vaka alarmı verir.
2. **İnceleme.** Ekibimizden bir kişi teknik ayrıntıları inceler. Her görüntüleme denetlenir.
3. **Soruşturma.** Gerekçe varsa vaka, Danimarka makamlarıyla aynı protokoller izlenerek soruşturulur.
4. **İkinci inceleme.** Bir vaka bildirilmeden, bir hesap yasaklanmadan ya da bir ebeveynin erişimi kaldırılmadan önce ikinci, kıdemli bir inceleyici onay verir.
5. **Teslim.** Doğrulanmış yasa dışı vakalar polise iletilir ve kapanana kadar takip edilir.

## 12. Yetkililerle çalışma

Doğrulanmış yasa dışı bir vakada polisin ihtiyaç duyduğu bilgileri teslim ederiz: hesap bilgileri, cihaz bilgileri, IP adresleri ve ilgili medya. Her vakayı kapanana kadar takip ederiz. Doğrulanmış bir vaka ya da yasal bir talep olmadan veri teslim etmeyiz.

## 13. Kullandığımız hizmetler

| Hizmet | Ne için | Ne alır |
| --- | --- | --- |
| Hetzner (Almanya) | Barındırma ve depolama | Saklanan veriler, yukarıda anlatıldığı gibi şifreli |
| QuickPay | Kartla ödemeler | Ödeme bilgileri. KINND tam kart numaralarını asla saklamaz. |
| Brevo | E-posta ve SMS | Ad, e-posta adresi, telefon numarası |
| Google ve Microsoft | Giriş, eğer bunu seçersen | Onlar üzerinden yaptığın giriş |
| Tarayıcı bildirim (push) hizmetleri | Cihazındaki bildirimler | Şifreli bir bildirim |
| Have I Been Pwned | Yeni bir parolanın sızdırılmadığını kontrol etmek | Parolanın özetinin (hash) ilk 5 karakteri, asla parolanın kendisi değil |

## 14. Yapmadıklarımız

- Uçtan uca şifreleme kullanmıyoruz. Kötüye kullanımı tespit etmemizi ve hesabını kurtarmana yardım etmemizi sağlayan budur.
- Reklam göstermiyoruz.
- Aile verilerini pazarlama için satmıyor ya da paylaşmıyoruz.
- Aile anlaşmazlıklarında taraf tutmuyoruz.

## 15. Bir güvenlik sorunu bildir

Bir güvenlik açığı mı buldun ya da bir hesap konusunda endişeli misin? <support@kinnd.eu> adresine yaz.
