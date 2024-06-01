import express, { response } from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.get("/kullaniciListesi/:id", async (req, res) => {
  const kullanicilar = [
    {
      id: "1",
      isim: "Umut Sakıcı",
      yas: "21",
    },

    {
      id: "2",
      isim: "Nurten Sakıcı",
      yas: "54"
    }
  ]

  const kullaniciId = req.params.id;
  const kullanici = kullanicilar.find(kID => kID.id === kullaniciId);

  if (kullanici)
    res.json(kullanici);
  else
    res.send("<p>Böyle Bir Kullanıcı Yok!</p>")
});

app.listen(port, () => {
  console.log("Sunucu başlatıldı..");
});
