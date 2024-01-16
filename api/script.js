const fileinput = document.querySelector(".file-input");
const filteroption = document.querySelectorAll(".filter button");
const filterName = document.querySelector(".filter-info .name");
const filtervalue = document.querySelector(".filter-info .value");
const filterslider = document.querySelector(".filter input");
const previewImg = document.querySelector(".preview-image img");
const chooseimg = document.querySelector(".choose-img");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;

const applyfilter = ()=>{
    previewImg.style.filter = `brightness(${brightness})  saturate(${saturation}) invert(${inversion}) grayscale(${grayscale})` ;
}

const loadimage = ()=>{
    let file = fileinput.files[0];
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", ()=>{
        document.querySelector(".container").classList.remove("disable")
    })
}
filteroption.forEach(option =>{
    option.addEventListener("click", ()=>{
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerHTML= option.innerText;

        if(option.id === "brightness"){
            filterslider.max= 400;
            filterslider.value = brightness;
            filtervalue.innerHTML = `${brightness}%`;
        }else if(option.id === "saturation"){
            filterslider.max= 400;
            filterslider.value = saturation;
            filtervalue.innerHTML = `${saturation}%`;
        }else if(option.id === "inversion"){
            filterslider.max= 100;
            filterslider.value = inversion;
            filtervalue.innerHTML = `${inversion}%`;
        }else{
            filterslider.max= 100;
            filterslider.value = grayscale;
            filtervalue.innerHTML = `${grayscale}%`;
        }
    })
})

const updatefilter = ()=>{
    filtervalue.innerHTML = `${filterslider.value}%`;
    const selectedfilter = document.querySelector(".filter .active");
    if(selectedfilter.id === "brightness"){
        brightness = filterslider.value;
    }else if(selectedfilter.id === "saturation"){
        saturation = filterslider.value;
    }else if(selectedfilter.id === "inversion"){
        inversion = filterslider.value;
    }else{
        grayscale = filterslider.value;
    }
    applyfilter();
}

fileinput.addEventListener("change", loadimage);
filterslider.addEventListener("input", updatefilter);
chooseimg.addEventListener("click", ()=> fileinput.click());