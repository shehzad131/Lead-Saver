
let leads = []
const inputEl = document.getElementById("inputEl")
const savebtn = document.getElementById("savebtn")
const dltbtn = document.getElementById("dltbtn")
const tabBtn = document.getElementById("tabBtn")
const savedLeads = document.getElementById("savedLeads")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("leads"))
//we are not reassigning them so const is used
if (leadsFromLocalStorage) {
    leads = leadsFromLocalStorage
    render(leads)
} /*what done in above steps is that we logged out the data in 
localstorage first then loaded it into the array leads and printed it
now whatever we save will comes only under the previous data.
the previous data is not getting replaced  */

savebtn.addEventListener("click", function(){
    if(inputEl.value !== ""){
        leads.push(inputEl.value)
        inputEl.value = ""

        localStorage.setItem("leads", JSON.stringify(leads))
        /*let x = localStorage.getItem("leads")
        let y = JSON.parse(localStorage.getItem("leads"))
        console.log(typeof x);
        console.log(typeof y);*/
        render(leads);
    }
})

dltbtn.addEventListener("dblclick", function(){
    localStorage.clear()
    leads = []
    render(leads)
})

tabBtn.addEventListener("click", function(){
    let queryOptions = { active: true, lastFocusedWindow: true }
    chrome.tabs.query(queryOptions, function(tabs){
    leads.push(tabs[0].url)
    localStorage.setItem("leads", JSON.stringify(leads))
    render(leads)    
    })
})

function render(lds) {
    /*savedLeads.textContent = "" -- instead of this, new variable
    list items was created. so we dont have to load html multiple
    times.*/
    listItems = ""
    for (let i = 0; i < lds.length; i++) {
        /*listItems += "<li><a href = '" + leads[i] + "' target='_blank'>"
         + leads[i] + "</a></li>" */
        listItems += 
            `<li>
                <a href="${lds[i]}" target= "_blank">${lds[i]}</a>
            </li>
            `
    }
    savedLeads.innerHTML = listItems

}