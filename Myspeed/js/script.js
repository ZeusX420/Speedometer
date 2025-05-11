let speed = 0;
let maxSpeed = 0;
let fuelLevel = 100;
let engineHealth = 1000;

window.addEventListener('message', (event) => {
    const data = event.data;
    
    if (data.type === "updateSpeedometer") {
        speed = data.speed || 0;
        maxSpeed = data.maxSpeed || 200;
        fuelLevel = data.fuelLevel || 100;
        engineHealth = data.engineHealth || 1000;
        
        updateSpeedometer();
    } else if (data.type === "setVisible") {
        document.querySelector('.speedometer-container').style.display = 
            data.visible ? "flex" : "none";
    }
});

function updateSpeedometer() {
    const speedElement = document.getElementById("speed-value");
    const progressBar = document.getElementById("speed-progress-bar");
    
    
    speedElement.textContent = Math.round(speed);
    
    
    const speedProgress = Math.min(100, (speed / maxSpeed) * 100);
    progressBar.style.width = `${speedProgress}%`;
    
    
    document.getElementById("fuel-fill").style.width = `${fuelLevel}%`;
    
    
    const healthPercent = Math.max(0, Math.min(100, (engineHealth / 1000) * 100));
    document.getElementById("health-fill").style.width = `${healthPercent}%`;
    
    
    speedElement.classList.remove("normal", "warning", "danger");
    progressBar.classList.remove("normal", "warning", "danger");
    
    if (speed < 100) {
        speedElement.classList.add("normal");
        progressBar.classList.add("normal");
    } else if (speed < 150) {
        speedElement.classList.add("warning");
        progressBar.classList.add("warning");
    } else {
        speedElement.classList.add("danger");
        progressBar.classList.add("danger");
        speedElement.classList.add("high-speed");
    }
    
    
    if (fuelLevel < 20) {
        document.getElementById("fuel-fill").style.background = "linear-gradient(90deg, #ff0000, #ff5555)";
    }
    
    
    if (healthPercent < 30) {
        document.getElementById("health-fill").style.background = "linear-gradient(90deg, #ff0000, #ff3333)";
    }
}