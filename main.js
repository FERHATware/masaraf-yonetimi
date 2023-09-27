// Masraf tablosunu seç
var masrafTablosu = document.getElementById("masraf-tablosu");

// Yeni satır ekle butonunu seç
var ekleButonu = document.getElementById("ekle-butonu");

// Excel olarak indir butonunu seç
var indirButonu = document.getElementById("indir-butonu");

// Toplam masraf etiketini seç
var toplamMasraf = document.getElementById("toplam-masraf");

// Masraf tipi için sabit seçenekleri tanımla
var masrafTipleri = ["Diğer", "Fazla mesai taksi", "Fazla mesai toplu taşıma"];

// KDV oranı için sabit seçenekleri tanımla
var kdvOranlari = ["seç",0.1, 0.18, 0.20];

// Yeni satır ekle butonuna tıklandığında çalışacak fonksiyonu tanımla
ekleButonu.onclick = function() {
    // Yeni bir tablo satırı oluştur
    var yeniSatir = masrafTablosu.insertRow();

    // Satırın sütunlarını oluştur
    var projeAdiSutunu = yeniSatir.insertCell();
    var faturaTarihiSutunu = yeniSatir.insertCell();
    var faturaNoSutunu = yeniSatir.insertCell();
    var faturaUnvaniSutunu = yeniSatir.insertCell();
    var masrafTipiSutunu = yeniSatir.insertCell();
    var aciklamaSutunu = yeniSatir.insertCell();
    var kdvHariçTutarSutunu = yeniSatir.insertCell();
    var kdvOraniSutunu = yeniSatir.insertCell();
    var kdvSutunu = yeniSatir.insertCell();
    var toplamSutunu = yeniSatir.insertCell();
    var islemSutunu = yeniSatir.insertCell();

    // Sütunlara giriş alanları ekle
    projeAdiSutunu.innerHTML = "<input type='text' class='proje-adi'>";
    faturaTarihiSutunu.innerHTML = "<input type='date' class='fatura-tarihi'>";
    faturaNoSutunu.innerHTML = "<input type='number' class='fatura-no'>";
    faturaUnvaniSutunu.innerHTML = "<input type='text' class='fatura-unvani'>";

    // Masraf tipi için seçim listesi oluştur
    var masrafTipiSecimListesi = document.createElement("select");
    masrafTipiSecimListesi.className = "masraf-tipi";
    // Seçim listesine sabit seçenekleri ekle
    for (var i = 0; i < masrafTipleri.length; i++) {
        var secenek = document.createElement("option");
        secenek.value = masrafTipleri[i];
        secenek.text = masrafTipleri[i];
        masrafTipiSecimListesi.appendChild(secenek);
    }
    // Masraf tipi sütununa seçim listesini ekle
    masrafTipiSutunu.appendChild(masrafTipiSecimListesi);

    aciklamaSutunu.innerHTML = "<input type='text' class='aciklama'>";
    kdvHariçTutarSutunu.innerHTML = "<input type='number' class='kdv-haric-tutar'>";

    // KDV oranı için seçim listesi oluştur
    var kdvOraniSecimListesi = document.createElement("select");
    kdvOraniSecimListesi.className = "kdv-orani";
    // Seçim listesine sabit seçenekleri ekle
    for (var i = 0; i < kdvOranlari.length; i++) {
        var secenek = document.createElement("option");
        secenek.value = kdvOranlari[i];
        secenek.text = kdvOranlari[i];
        kdvOraniSecimListesi.appendChild(secenek);
    }
    // KDV oranı sütununa seçim listesini ekle
    kdvOraniSutunu.appendChild(kdvOraniSecimListesi);

    // KDV ve toplam sütunlarına hesaplanacak değerleri göstermek için etiketler ekle
    kdvSutunu.innerHTML = "<label class='kdv'>0</label>";
    toplamSutunu.innerHTML = "<label class='toplam'>0</label>";

    // İşlem sütununa satırı silmek için bir buton ekle
    islemSutunu.innerHTML = "<button class='sil-butonu'>Sil</button>";

}

// Tablodaki veriler değiştiğinde çalışacak fonksiyonu tanımla
masrafTablosu.onchange = function() {
    // Tablodaki tüm satırları ve sütunları seç
    var satirlar = masrafTablosu.rows;
    var sutunlar = masrafTablosu.rows[0].cells;

    // Toplam masrafı hesaplamak için bir değişken tanımla
    var toplamMasrafDegeri = 0;

    // Tablodaki her satır için bir döngü oluştur (ilk satır başlık olduğu için atla)
    for (var i = 1; i < satirlar.length; i++) {
        // Satırın sütunlarını al
        var projeAdiSutunu = satirlar[i].cells[0];
        var faturaTarihiSutunu = satirlar[i].cells[1];
        var faturaNoSutunu = satirlar[i].cells[2];
        var faturaUnvaniSutunu = satirlar[i].cells[3];
        var masrafTipiSutunu = satirlar[i].cells[4];
        var aciklamaSutunu = satirlar[i].cells[5];
        var kdvHariçTutarSutunu = satirlar[i].cells[6];
        var kdvOraniSutunu = satirlar[i].cells[7];
        var kdvSutunu = satirlar[i].cells[8];
        var toplamSutunu = satirlar[i].cells[9];
        var islemSutunu = satirlar[i].cells[10];

        // Giriş alanlarından değerleri al
        var  = projeAdiSutunu.querySelector(".proje-adi").value;
        var faturaTarihiDegeri = faturaTarihiSutunu.querySelector(".fatura-tarihi").value;
        var faturaNoDegeri = faturaNoSutunu.querySelector(".fatura-no").value;
        var faturaUnvaniDegeri = faturaUnvaniSutunu.querySelector(".fatura-unvani").value;
        var masrafTipiDegeri = masrafTipiSutunu.querySelector(".masraf-tipi").value;
        var aciklamaDegeri = aciklamaSutunu.querySelector(".aciklama").value;
        var kdvHariçTutarDegeri = Number(kdvHariçTutarSutunu.querySelector(".kdv-haric-tutar").value);
    
        // Seçim listesinden KDV oranı değerini al
        var kdvOraniDegeri = Number(kdvOraniSutunu.querySelector(".kdv-orani").value);
    
        // KDV ve toplam sütunlarındaki etiketleri seç
        var kdvEtiketi = kdvSutunu.querySelector(".kdv");
        var toplamEtiketi = toplamSutunu.querySelector(".toplam");
    
        // KDV hariç tutar ile KDV oranını çarp ve sonucu KDV sütunundaki etikete yaz
        var kdvDegeri = kdvHariçTutarDegeri * kdvOraniDegeri;
        kdvEtiketi.textContent = kdvDegeri.toFixed(2);
    
        // KDV hariç tutar ile KDV'yi topla ve sonucu toplam sütunundaki etikete yaz
        var toplamDegeri = kdvHariçTutarDegeri + kdvDegeri;
        toplamEtiketi.textContent = toplamDegeri.toFixed(2);
    
        // Toplam masraf değerine bu satırın toplam değerini ekle
        toplamMasrafDegeri += toplamDegeri;
    
        // Sil butonunu seç
        var silButonu = islemSutunu.querySelector(".sil-butonu");
    
        // Sil butonuna tıklandığında çalışacak fonksiyonu tanımla
        silButonu.onclick = function() {
            // Bu satırı tablodan sil
            masrafTablosu.deleteRow(i);
            // Toplam masrafı güncelle
            toplamMasraf.textContent = "Toplam Masraf: " + (toplamMasrafDegeri - toplamDegeri).toFixed(2) + " TL";
        }
    }
    
    // Tüm satırları döngüden çıktıktan sonra, toplam masraf etiketini güncelle
    toplamMasraf.textContent = "Toplam Masraf: " + toplamMasrafDegeri.toFixed(2) + " TL";
}
    
    