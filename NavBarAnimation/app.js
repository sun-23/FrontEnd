const sections = document.querySelectorAll('section');
const bubble = document.querySelector('.bubble');
const gradients = [
    'linear-gradient(to right top, #f46b45, #eea849)',
    'linear-gradient(to right top, #005c97, #363795)',
    'linear-gradient(to right top, #e53935, #e35d5b)'
];

const options = {
    threshold: 0.5 // if 50% do navCheck and color of a tag and bubble is smoote
}

// IntersectionObserver ไม่รองรับ arrow function
let observer = new IntersectionObserver(navCheck, options);

// entries คือ สิ่งที่ตรวจจับทั้งหมด entry คือ สิ่งที่ตรวจจับ 1 อย่าง
function navCheck(entries){
    entries.forEach(entry => {
        //console.log(entry.target)
        //console.log(entry.boundingClientRect)

        const className = entry.target.className;
        //console.log(className);

        // ${} not working
        const data = '[data-page-name=' + className + ']';
        const activeAnchor = document.querySelector(data);
        const coords = activeAnchor.getBoundingClientRect();
        const gradientIndex = entry.target.getAttribute('data-index');

        //styles
        const directions = {
            height: coords.height,
            width: coords.width,
            top: coords.top,
            left: coords.left,
            background: gradients[gradientIndex],
            color: 'white',
        };
        console.log(coords);

        //if the target in entries
        if(entry.isIntersecting){
            //select a tag target and change color
            const className = entry.target.className;
            const data = '[data-page-name=' + className + ']';
            const activeAnchorTarget = document.querySelector(data);
            activeAnchorTarget.style.setProperty('color', directions.color);

            // set bubble style
            bubble.style.setProperty('left', directions.left + 'px');
            bubble.style.setProperty('top', directions.top + 'px');
            bubble.style.setProperty('height', directions.height + 'px');
            bubble.style.setProperty('width', directions.width + 'px');
            bubble.style.setProperty('background', directions.background);
        }else{
            // a tag is not target color is black
            activeAnchor.style.setProperty('color', 'black');
        }

    })
}

// ให้ตรวจจับ section ทั้งหมด
sections.forEach(section => {
    observer.observe(section);
})