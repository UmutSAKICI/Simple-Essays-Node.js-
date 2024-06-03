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
app.use(bodyParser.json());

async function AileBilgileriSorgulama() {
  const veriTabaniSorgusu = await veritabani.query("SELECT * FROM aileuyeleri ORDER BY id ASC");

  let veriTabanindanGelenKisiler = [];

  veriTabaniSorgusu.rows.forEach(kisiler => {
    veriTabanindanGelenKisiler.push(kisiler);
  });
  return veriTabanindanGelenKisiler;
}


app.get("/", async (req, res) => {
  const veriTabaniSorgusu = await AileBilgileriSorgulama();

  res.render("index.ejs", { VTGK: veriTabaniSorgusu });
});

app.post("/YeniKullanici", async (req, res) => {
  const veriTabaniSorgusu = await AileBilgileriSorgulama();


  const kIsim = req.body["kIsim"];
  const kYas = req.body["kYas"];

  try {
    await veritabani.query("INSERT INTO aileuyeleri (isim, yas) VALUES ($1, $2)",
      [kIsim, kYas]);

    res.render("index.ejs", { VTGK: veriTabaniSorgusu });

  }
  catch (error) {
    console.log(error);
  }
});

app.post("/KullaniciBilgisiDegistir", async (req, res) => {

  const id = req.body.secenek;
  const degistirilecekKisi = req.body.adiDegistirilecekKisi;

  try {
    await veritabani.query("UPDATE aileuyeleri SET isim = $2 WHERE id = $1",
      [id, degistirilecekKisi]
    );

    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
});

app.post("/gezilenSehirFormu", async (req, res) => {
  const id = req.body.id;
  console.log("Seçilen değer:", id);

  try {
    const veriler = await veritabani.query(
      "SELECT a.isim, a.yas, g.gezilen_yerler FROM aileuyeleri a LEFT JOIN gezilen_yerler g ON a.id = g.id WHERE a.id = $1",
      [id]
    );
    let gezilen_yerler = [];

    veriler.rows.forEach(gelenVeriler => {
      gezilen_yerler.push(gelenVeriler);
    });

    res.json({ status: "Başarılı!", gezilen_yerler: gezilen_yerler });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log("Sunucu başlatıldı..");
});