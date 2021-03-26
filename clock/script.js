const ticking = new Audio("/SFX/clock-tick.wav");
const setClock = () => {
    const currentDate = new Date();
    const secondDeg = currentDate.getSeconds()/60;
    const minuteDeg = (currentDate.getMinutes() + secondDeg)/60;
    const hourDeg = (currentDate.getHours() + minuteDeg)/12;
    
    ticking.play();
    setRotation("second", secondDeg*360);
    setRotation("minute", minuteDeg*360);
    setRotation("hour", hourDeg*360);
}

const setRotation = (hand, deg) => {
    document.querySelector(`[data-hand="${hand}"]`).style.transform = `rotate(${deg}deg)`;
}




setClock();
setInterval(setClock, 1000);