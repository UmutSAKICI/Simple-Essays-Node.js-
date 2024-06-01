import express, { response } from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const veritabani = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "AileSeyehatiProjesi",
  password: "12345",
  port: 5432
});
veritabani.connect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

async function AileBilgileriSorgulama() {
  const veriTabaniSorgusu = await veritabani.query("SELECT * FROM aileuyeleri ORDER BY id ASC");

  let veriTabanindanGelenKisiler = [];

  veriTabaniSorgusu.rows.forEach(kisiler => {
    veriTabanindanGelenKisiler.push(kisiler);
  });
  return veriTabanindanGelenKisiler;
}

const veriTabaniSorgusu = await AileBilgileriSorgulama();

app.get("/", async (req, res) => {
  res.render("index.ejs", { VTGK: veriTabaniSorgusu, isimMesaji: "İsim", kisiMesaji: "Kişiyi Seçiniz" });
});

app.post("/YeniKullanici", async (req, res) => {
  const kIsim = req.body["kIsim"];
  const kYas = req.body["kYas"];

  try {
    if (kIsim === '' || kYas === '') {
      res.render("index.ejs", { VTGK: veriTabaniSorgusu, isimMesaji: "Hata! Lütfen verileri tam giriniz...", kisiMesaji: "Kişiyi Seçiniz" });
    } else {
      await veritabani.query("INSERT INTO aileuyeleri (isim, yas) VALUES ($1, $2)",
        [kIsim, kYas]);

      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/KullaniciBilgisiDegistir", async (req, res) => {
  const id = req.body.secenek;
  const degistirilecekKisi = req.body.adiDegistirilecekKisi;

  try {
    if (id === '' || degistirilecekKisi === '') {
      res.render("index.ejs", { VTGK: veriTabaniSorgusu, isimMesaji: "İsim", kisiMesaji: "Hata! Lütfen ismi tam giriniz!" });
    } else
      await veritabani.query("UPDATE aileuyeleri SET isim = $2 WHERE id = $1",
        [id, degistirilecekKisi]
      );
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log("Sunucu başlatıldı..");
});