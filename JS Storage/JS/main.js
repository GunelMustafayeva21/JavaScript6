//Local, session, cookie(for username) storage tutuma gore
//Tab baglananda local storage qalir session silinir

//localStorage.setItem("a", 10);
//console.log(localStorage.getItem("a"));
//localStorage.removeItem("a");
//localStorage.clear();

//sessionStorage.setItem("b", "salam");
//console.log(sessionStorage.getItem("b"));

//document.cookie="username=Gunel; expires=Sun, 22 May 2022 00:00:00 UTC";
//expire-deki tarixi kecenden sonra oz-ozune silinir 
//console.log(document.cookie);

//aspect-ratio:1/1;
//object-fit:cover;

let addToFavs=document.querySelectorAll("#products .product-item span.bi");

for(let item of addToFavs){
    item.addEventListener("click", ()=>{

        if(localStorage.getItem("Favourites")===null){
            localStorage.setItem("Favourites","[]");
        } 
        let Favourites=JSON.parse(localStorage.getItem("Favourites"));

        let existingProduct=Favourites.find(x=>{
            return  x.id==item.parentNode.getAttribute("data-id");
         })

        if(existingProduct)
        {
          existingProduct.count++;
          alert("Product is already exist in basket. Amount of product is increased!")
        }
        else
        {
            let product={
                id:          item.parentNode.getAttribute("data-id"),
                image:       item.parentNode.querySelector("img").getAttribute("src"),
                description: item.parentNode.querySelector("h5").innerText,
                price:       item.parentNode.querySelector("p").innerText,
                count:       1
            }
    
            Favourites.push(product);
            alert("Product is added to basket!");
        }

        localStorage.setItem("Favourites", JSON.stringify(Favourites));
})}