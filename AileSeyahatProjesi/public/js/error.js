document.getElementById('yeniKullanici_ID').addEventListener('submit', function (event) {
  const girdivalue = document.getElementById('girdi1').getAttribute.value;
  const girdiName = document.getElementById('girdi1').getAttribute.name;
  const girdi2 = document.getElementById('girdi2').getAttribute.name;

  console.log(girdivalue);
  console.log(girdiName);
  console.log(girdi2);

  if (girdi1 === '' || girdi2 === '') {
    event.preventDefault();

    console.log("Merhasdas");

    document.getElementById('isimGir').innerHTML = 'Hata! Lütfen tüm alanları doldurunuz..';
  }
});