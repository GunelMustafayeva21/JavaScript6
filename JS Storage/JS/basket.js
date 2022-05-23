
let tbody=document.querySelector("table tbody");
let button=document.querySelector(".remove");

if(localStorage.getItem("Favourites")===null || JSON.parse(localStorage.getItem("Favourites")).length==0)
{
    let tr= "<tr><td colspan='3' class='text-center fw-bold text-primary'>No items added</td></tr>";
    tbody.innerHTML+=tr;
    button.classList.add("d-none");
}
else{
    let Favourites=JSON.parse(localStorage.getItem("Favourites"));
    let Sum=0;
    for (const product of Favourites) {
        let tr=`
           <tr>
              <td><img src='${product.image}'></td>
              <td class="description">${product.description}</td>
              <td class="dollars">${product.price}*${product.count}</td>
           </tr>`
           tbody.innerHTML+=tr;
    let amount=product.price.replace("$", "");
    amount=parseInt(amount);
    Sum+=amount*product.count;
    }
    let total=`
           <tr>
              <td colspan="2" class="total text-end">Total:</td>
              <td class="dollars">${Sum}</td>
           </tr>`
        tbody.innerHTML+=total;
}
button.addEventListener("click", function (){
    localStorage.removeItem("Favourites");
    location.reload();
})