let currentpage=0;
let size=10;
let scrollable=document.querySelector("#container")
let ApiUrl='https://api.instantwebtools.net/v1/passenger'
let isScrollable=true
const getdata=()=>{
    document.querySelector('#container').innerHTML+=`<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`
    fetch(`${ApiUrl}?page=${currentpage}&size=${size}`)
    .then(res=>res.json())
    .then(data=>{
        render(data.data,currentpage)
        currentpage++;
        isScrollable=true
    })
}


scrollable.addEventListener('scroll',(e)=>{
    let target=e.target
    
    const {scrollHeight,offsetHeight,scrollTop}=target
    if ((offsetHeight+scrollTop)>= scrollHeight*0.90){
        if(isScrollable){
            // console.log("it near bottom");
            getdata()
            isScrollable=false
        }
    }

})
const render=(data,currentpage)=>{
    
    if(data){
        document.querySelector('#Num').innerText=currentpage+1
        let tmp="";
        data.forEach(item=>{
            // console.log(item);
            tmp+=
            `
            <div class="content">
            <div class="title">
                <img src="${item.airline[0].logo}" alt="${item.airline[0].name}"> 
                <h2>:</h2>
                <h2>${item.airline[0].name}</h2>
            </div>
            <div class="bodyContent">
                <p>😍: ${item.name}</p>
            </div>
           </div>
            `
        })
        document.querySelector('#container').innerHTML+=tmp
        document.querySelector('.lds-ellipsis').remove()
    }
}

window.addEventListener('load',(e)=>{
    getdata()
})