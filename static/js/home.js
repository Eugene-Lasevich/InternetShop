const logos = document.querySelectorAll('.partner-logo')

for(let index = 0; index < logos.length; index++)
{
    const logo  = logos[index];
    logo.addEventListener('mousemove', startRotate);
    logo.addEventListener('mouseout', stopRotate);

}

function startRotate(event)
{
    const halfHeight = this.offsetHeight/2;
    this.style.transform = 'rotateX('+-(event.offsetY - halfHeight)/3+'deg) rotateY('+ (event.offsetX - halfHeight)/3+'deg)'
}

function  stopRotate(event)
{
    this.style.transform='rotate(0)'
}