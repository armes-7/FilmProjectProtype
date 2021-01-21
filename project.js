const form=document.getElementById("film-form");
const titleElement=document.getElementById("title");
const directorElement=document.getElementById("director");
const urlElement=document.getElementById("url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");
// UI Objesini Başlatma
const ui= new UI();

//storage obj üreticem
const storage = new Storage();

//Şimdi Tüm Eventleri yüklemek için biz bir fonksiyon yazıcaz
eventListeners();
function eventListeners(){
 form.addEventListener("submit",addFilm);
 document.addEventListener("DOMContentLoaded",function(){
     let films = storage.getFilmsFromStorage();
     ui.loadAllFilms(films);
 });

 cardbody.addEventListener("click",deleteFilm);
 clear.addEventListener("click",clearAllFilms);

}
function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url =urlElement.value;

//Şimdi biz burda 3'nün dolu olma durumunu kontrol etmek istiyoruz
     if(title===""|| director===""||url===""){
         ui.displayMessages("Tüm alanları doldurun....","danger");

         
     }
      else{
          
          // şimdi yeni bir film burda oluşturduk
          const newFilm = new Film(title,director,url);
          ui.addFilmToUI(newFilm);//Bu fond-ksiyon sayesinde arayüze film eklicez
          storage.addFilmToStorage(newFilm);//storage film ekleme
          ui.displayMessages("Film başarı ile eklendi...","success")


      }
      ui.clearInput(titleElement,urlElement,directorElement);

    e.preventDefault();
}
 function deleteFilm(e){

    if(e.target.id=="delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)
        ui.displayMessages("silme işlemi başarılı.....","success");
        
    }
 }
 function clearAllFilms(){
     if(confirm("Emin misiniz ?")){

        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();

     }
    
 }
